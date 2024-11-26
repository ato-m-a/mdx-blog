import { z } from 'zod';
import { createBase } from '@/schema/common/createBase';

export type CompanySchema = z.infer<typeof companySchema>;

export const companySchema = createBase({
  name: z.string(),
  url: z.string().url(),
  brandColor: z.string(),
  description: z.string(),
});
