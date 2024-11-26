import { z } from 'zod';
import { createBase } from '@/schema/common/createBase';
import { categorySchema } from '@/schema/category/base.schema';
import { tagSchema } from '@/schema/tag/base.schema';

export type PostSchema = z.infer<typeof postSchema>;

export const postSchema = createBase({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().nullable(),
  content: z.string(),
  category: categorySchema,
  tags: z.array(tagSchema),
});
