import { z } from 'zod';

export type CategorySchema = z.infer<typeof categorySchema>;

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export default categorySchema;
