import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateBoardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export class CreateBoardDto extends createZodDto(CreateBoardSchema) {}
