import { z } from 'zod';
import { tagSchema } from '@/schema/tag/base.schema';
import { postSchema } from '@/schema/post/base.schema';
import { pagedResponseSchema } from '@/schema/common/paged.schema';

export type TagCountResponseSchema = z.infer<typeof tagCountResponseSchema>;
export type GetCountsByTagResponseSchema = z.infer<typeof getCountsByTagResponseSchema>;
export type GetPostResponseSchema = z.infer<typeof getPostResponseSchema>;
export type GetPostsResponseSchema = z.infer<typeof getPostsResponseSchema>;

export const tagCountResponseSchema = tagSchema.extend({
  postCount: z.number(),
});

export const getCountsByTagResponseSchema = z.object({
  totalCount: z.number(),
  tags: z.array(tagCountResponseSchema),
});

export const getPostResponseSchema = postSchema.nullable();

export const getPostsResponseSchema = pagedResponseSchema(postSchema);
