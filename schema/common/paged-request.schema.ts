import { z } from 'zod';

export type PagedRequestSchema = z.infer<typeof pagedRequestSchema>;

const pagedRequestSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
});

export default pagedRequestSchema;
