import { z } from 'zod';

export type CompanySchema = z.infer<typeof companySchema>;

const companySchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().url(),
  brandColor: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export default companySchema;
