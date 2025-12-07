import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../../database/database.module'; // Intentionally using ../../../ if it works? No, I'll stick to ../../database/database.module which is correct relative to src/modules/tags
// src/modules/tags -> ../ (modules) -> ../ (src)
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { eq } from 'drizzle-orm';

// Fix import path to be safe
import { DATABASE_CONNECTION as DB_CONN } from '../../database/database.module';

@Injectable()
export class TagsService {
  constructor(
    @Inject(DB_CONN)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const [tag] = await this.db
      .insert(schema.tags)
      .values(createTagDto)
      .returning();
    return tag;
  }

  async findAll() {
    return this.db.query.tags.findMany();
  }

  async findOne(id: string) {
    const tag = await this.db.query.tags.findFirst({
      where: eq(schema.tags.id, id),
    });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async update(id: string, createTagDto: CreateTagDto) {
    const [tag] = await this.db
      .update(schema.tags)
      .set(createTagDto)
      .where(eq(schema.tags.id, id))
      .returning();
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async remove(id: string) {
    const [tag] = await this.db
      .delete(schema.tags)
      .where(eq(schema.tags.id, id))
      .returning();
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }
}
