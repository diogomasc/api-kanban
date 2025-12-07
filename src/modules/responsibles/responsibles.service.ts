import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/database.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class ResponsiblesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createResponsibleDto: CreateResponsibleDto) {
    const [responsible] = await this.db
      .insert(schema.responsibles)
      .values(createResponsibleDto)
      .returning();
    return responsible;
  }

  async findAll() {
    return this.db.query.responsibles.findMany();
  }

  async findOne(id: string) {
    const responsible = await this.db.query.responsibles.findFirst({
      where: eq(schema.responsibles.id, id),
    });
    if (!responsible) throw new NotFoundException('Responsible not found');
    return responsible;
  }

  async update(id: string, createResponsibleDto: CreateResponsibleDto) {
    const [responsible] = await this.db
      .update(schema.responsibles)
      .set(createResponsibleDto)
      .where(eq(schema.responsibles.id, id))
      .returning();
    if (!responsible) throw new NotFoundException('Responsible not found');
    return responsible;
  }

  async remove(id: string) {
    const [responsible] = await this.db
      .delete(schema.responsibles)
      .where(eq(schema.responsibles.id, id))
      .returning();
    if (!responsible) throw new NotFoundException('Responsible not found');
    return responsible;
  }
}
