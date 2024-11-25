import { z } from 'zod';
import categoryResponseSchema from '@/schema/category/category-response.schema';
import tagResponseSchema from '@/schema/tag/tag-response.schema';
export type PostResponseSchema = z.infer<typeof postResponseSchema>;

const postResponseSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().nullable(),
  content: z.string(),
  category: categoryResponseSchema,
  tags: z.array(tagResponseSchema),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export default postResponseSchema;
