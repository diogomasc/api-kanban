import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/database.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class DepartmentsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const [department] = await this.db
      .insert(schema.departments)
      .values(createDepartmentDto)
      .returning();
    return department;
  }

  async findAll() {
    return this.db.query.departments.findMany();
  }

  async findOne(id: string) {
    const department = await this.db.query.departments.findFirst({
      where: eq(schema.departments.id, id),
    });
    if (!department) throw new NotFoundException('Department not found');
    return department;
  }

  async update(id: string, createDepartmentDto: CreateDepartmentDto) {
    const [department] = await this.db
      .update(schema.departments)
      .set(createDepartmentDto)
      .where(eq(schema.departments.id, id))
      .returning();
    if (!department) throw new NotFoundException('Department not found');
    return department;
  }

  async remove(id: string) {
    const [department] = await this.db
      .delete(schema.departments)
      .where(eq(schema.departments.id, id))
      .returning();
    if (!department) throw new NotFoundException('Department not found');
    return department;
  }
}
