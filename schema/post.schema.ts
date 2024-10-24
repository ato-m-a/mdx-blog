import { z } from 'zod';

export type PostSchema = z.infer<typeof postSchema>;

const postSchema = z.object({
  title: z.string(),
  publishDate: z.coerce.date(),
  categories: z.array(z.string()),
});

export default postSchema;
