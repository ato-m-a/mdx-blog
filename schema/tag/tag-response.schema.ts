import { z } from 'zod';

export type GetTagResponseSchema = z.infer<typeof getTagResponseSchema>;

const getTagResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  postCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export default getTagResponseSchema;