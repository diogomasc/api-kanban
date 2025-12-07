import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/database.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class NotesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const { tagIds, responsibleIds, dueDate, ...noteData } = createNoteDto;

    const finalDueDate = dueDate ? new Date(dueDate) : null;

    return await this.db.transaction(async (tx) => {
      const [note] = await tx
        .insert(schema.notes)
        .values({
          ...noteData,
          dueDate: finalDueDate,
        })
        .returning();

      if (tagIds && tagIds.length > 0) {
        await tx.insert(schema.noteTags).values(
          tagIds.map((tagId) => ({
            noteId: note.id,
            tagId,
          })),
        );
      }

      if (responsibleIds && responsibleIds.length > 0) {
        await tx.insert(schema.noteResponsibles).values(
          responsibleIds.map((responsibleId) => ({
            noteId: note.id,
            responsibleId,
          })),
        );
      }

      return note;
    });
  }

  async findAll() {
    return this.db.query.notes.findMany({
      with: {
        tags: true,
        responsibles: true,
        priority: true,
        board: true,
      },
    });
  }

  async findOne(id: string) {
    const note = await this.db.query.notes.findFirst({
      where: eq(schema.notes.id, id),
      with: {
        tags: true,
        responsibles: true,
        priority: true,
      },
    });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async update(id: string, createNoteDto: CreateNoteDto) {
    const { tagIds, responsibleIds, dueDate, ...noteData } = createNoteDto;
    const finalDueDate = dueDate ? new Date(dueDate) : null;

    return await this.db.transaction(async (tx) => {
      const [note] = await tx
        .update(schema.notes)
        .set({ ...noteData, dueDate: finalDueDate })
        .where(eq(schema.notes.id, id))
        .returning();

      if (!note) throw new NotFoundException('Note not found');

      await tx.delete(schema.noteTags).where(eq(schema.noteTags.noteId, id));
      if (tagIds && tagIds.length > 0) {
        await tx.insert(schema.noteTags).values(
          tagIds.map((tagId) => ({
            noteId: note.id,
            tagId,
          })),
        );
      }

      await tx
        .delete(schema.noteResponsibles)
        .where(eq(schema.noteResponsibles.noteId, id));
      if (responsibleIds && responsibleIds.length > 0) {
        await tx.insert(schema.noteResponsibles).values(
          responsibleIds.map((responsibleId) => ({
            noteId: note.id,
            responsibleId,
          })),
        );
      }

      return note;
    });
  }

  async remove(id: string) {
    await this.db.delete(schema.noteTags).where(eq(schema.noteTags.noteId, id));
    await this.db
      .delete(schema.noteResponsibles)
      .where(eq(schema.noteResponsibles.noteId, id));

    const [note] = await this.db
      .delete(schema.notes)
      .where(eq(schema.notes.id, id))
      .returning();
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }
}
