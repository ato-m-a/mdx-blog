import { z } from 'zod';
import timestampSchema from './common/timestamp.schema';

export type PostSchema = z.infer<typeof postSchema>;

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  categories: z.array(z.string()),
  createdAt: timestampSchema,
  updatedAt: timestampSchema.nullable(),
});

export default postSchema;
