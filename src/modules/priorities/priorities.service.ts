import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../../database/schema';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class PrioritiesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createPriorityDto: CreatePriorityDto) {
    const [priority] = await this.db
      .insert(schema.priorities)
      .values(createPriorityDto)
      .returning();
    return priority;
  }

  async findAll() {
    return this.db.query.priorities.findMany();
  }

  async findOne(id: string) {
    const priority = await this.db.query.priorities.findFirst({
      where: eq(schema.priorities.id, id),
    });
    if (!priority) throw new NotFoundException('Priority not found');
    return priority;
  }

  async update(id: string, createPriorityDto: CreatePriorityDto) {
    const [priority] = await this.db
      .update(schema.priorities)
      .set(createPriorityDto)
      .where(eq(schema.priorities.id, id))
      .returning();
    if (!priority) throw new NotFoundException('Priority not found');
    return priority;
  }

  async remove(id: string) {
    const [priority] = await this.db
      .delete(schema.priorities)
      .where(eq(schema.priorities.id, id))
      .returning();
    if (!priority) throw new NotFoundException('Priority not found');
    return priority;
  }
}
