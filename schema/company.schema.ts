import { z } from 'zod';
import timestampSchema from './common/timestamp.schema';

export type CompanySchema = z.infer<typeof companySchema>;

const companySchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().url(),
  brandColor: z.string(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema.nullable(),
});

export default companySchema;
