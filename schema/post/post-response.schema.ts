import { z } from 'zod';
import categoryResponseSchema from '@/schema/category/category-response.schema';

export type PostResponseSchema = z.infer<typeof postResponseSchema>;

const postResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().nullable(),
  content: z.string(),
  category: categoryResponseSchema,
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export default postResponseSchema;
