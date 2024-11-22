import { z } from 'zod';

export type PagedRequestSchema = z.infer<typeof pagedRequestSchema>;

const pagedRequestSchema = z.object({
  cursor: z.number().optional(),
  take: z.number().optional(),
});

export default pagedRequestSchema;
