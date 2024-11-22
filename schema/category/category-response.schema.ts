import { z } from 'zod';

export type CategoryResponseSchema = z.infer<typeof categoryResponseSchema>;

const categoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export default categoryResponseSchema;
