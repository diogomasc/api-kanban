import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreatePrioritySchema = z.object({
  value: z.number().int().min(0).max(10, 'Value must be between 0 and 10'),
  description: z.string().min(1, 'Description is required'),
  boardId: z.string().uuid('Board ID must be a valid UUID'),
});

export class CreatePriorityDto extends createZodDto(CreatePrioritySchema) { }
