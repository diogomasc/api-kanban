import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateResponsibleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  departmentId: z.string().uuid('Department ID must be a valid UUID'),
});

export class CreateResponsibleDto extends createZodDto(CreateResponsibleSchema) {}
