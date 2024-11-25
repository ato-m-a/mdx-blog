import { z } from 'zod';
import pagedRequestSchema from '@/schema/common/paged-request.schema';

export type PostListRequestSchema = z.infer<typeof postListRequestSchema>;

const postListRequestSchema = pagedRequestSchema.extend({
  category: z.string().optional(),
  keyword: z.string().optional(),
  tag: z.string().optional(),
});

export default postListRequestSchema;
