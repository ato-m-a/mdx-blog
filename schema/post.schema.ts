import { z } from 'zod';
import timestampSchema from './common/timestamp.schema';

export type PostSchema = z.infer<typeof postSchema>;

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  categories: z.array(z.string()),
  createdAt: timestampSchema,
  updatedAt: timestampSchema.nullable(),
});

export default postSchema;
