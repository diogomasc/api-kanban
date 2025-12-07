import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../../database/schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class BoardsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const [board] = await this.db
      .insert(schema.boards)
      .values(createBoardDto)
      .returning();
    return board;
  }

  async findAll() {
    return this.db.query.boards.findMany();
  }

  async findOne(id: string) {
    const board = await this.db.query.boards.findFirst({
      where: eq(schema.boards.id, id),
    });
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async update(id: string, createBoardDto: CreateBoardDto) {
    const [board] = await this.db
      .update(schema.boards)
      .set(createBoardDto)
      .where(eq(schema.boards.id, id))
      .returning();
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async remove(id: string) {
    const [board] = await this.db
      .delete(schema.boards)
      .where(eq(schema.boards.id, id))
      .returning();
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }
}
