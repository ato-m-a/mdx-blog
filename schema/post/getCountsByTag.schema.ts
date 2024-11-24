import { z } from 'zod';
import getTagResponseSchema from '@/schema/tag/tag-response.schema';

export type GetCountsByTagSchema = z.infer<typeof getCountsByTagSchema>;

const getCountsByTagSchema = z.object({
  totalCount: z.number(),
  tags: getTagResponseSchema.array(),
});

export default getCountsByTagSchema;