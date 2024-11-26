import { z } from 'zod';
import { createBase } from '@/schema/common/createBase';

export type TagSchema = z.infer<typeof tagSchema>;

export const tagSchema = createBase({
  name: z.string(),
});
