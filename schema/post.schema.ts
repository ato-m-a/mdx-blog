import { z } from 'zod';

export type PostSchema = z.infer<typeof postSchema>;

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  categories: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export default postSchema;
