import { z } from 'zod';
import { createBase } from '@/schema/common/createBase';

export type CategorySchema = z.infer<typeof categorySchema>;

export const categorySchema = createBase({
  name: z.string(),
});
