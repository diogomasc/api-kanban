import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateTagSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  boardId: z.string().uuid('Board ID must be a valid UUID'),
});

export class CreateTagDto extends createZodDto(CreateTagSchema) {}
