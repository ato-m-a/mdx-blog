import { z } from 'zod';
import { pagedRequestSchema } from '@/schema/common/paged.schema';
import { EMPTY_TITLE, EMPTY_CONTENT, EMPTY_CATEGORY } from '@/schema/post/constant';

export type GetPostRequestSchema = z.infer<typeof getPostRequestSchema>;
export type GetPostsRequestSchema = z.infer<typeof getPostsRequestSchema>;
export type CreatePostRequestSchema = z.infer<typeof createPostRequestSchema>;
export type UpdatePostRequestSchema = z.infer<typeof updatePostRequestSchema>;
export type DeletePostRequestSchema = z.infer<typeof deletePostRequestSchema>;

export const getPostRequestSchema = z.object({
  slug: z.string().optional(),
  id: z.number().optional(),
});

export const getPostsRequestSchema = pagedRequestSchema.extend({
  category: z.string().optional(),
  keyword: z.string().optional(),
  tag: z.string().optional(),
});

export const createPostRequestSchema = z.object({
  title: z.string().min(1, EMPTY_TITLE),
  subtitle: z.string().optional(),
  content: z.string().min(1, EMPTY_CONTENT),
  category: z
    .string()
    .min(1, EMPTY_CATEGORY)
    .refine((value) => value !== '', { message: EMPTY_CATEGORY }),
  tags: z.array(z.string()).optional(),
});

export const updatePostRequestSchema = createPostRequestSchema.extend({
  id: z.number(),
});

export const deletePostRequestSchema = z.object({
  id: z.number(),
});
