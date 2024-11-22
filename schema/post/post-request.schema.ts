import { z } from 'zod';
import pagedRequestSchema from '@/schema/common/paged-request.schema';

export type PostRequestSchema = z.infer<typeof postRequestSchema>;

const postRequestSchema = pagedRequestSchema.extend({
  category: z.string().optional(),
  keyword: z.string().optional(),
  tag: z.string().optional(),
});

export default postRequestSchema;
