import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateNoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  boardId: z.string().uuid('Board ID must be a valid UUID'),
  priorityId: z.string().uuid('Priority ID must be a valid UUID'),
  dueDate: z.string().datetime().optional(), // Expected ISO string
  // Arrays of UUIDs
  tagIds: z.array(z.string().uuid()).optional().default([]),
  responsibleIds: z.array(z.string().uuid()).optional().default([]),
});

export class CreateNoteDto extends createZodDto(CreateNoteSchema) {}
