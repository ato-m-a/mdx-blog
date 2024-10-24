import { z } from 'zod';
import companySchema from './company.schema';
import timestampSchema from './common/timestamp.schema';

export type ExperienceSchema = z.infer<typeof experienceSchema>;

const experienceSchema = z.object({
  id: z.number(),
  company: companySchema,
  position: z.string(),
  period: z.string(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema.nullable(),
});

export default experienceSchema;
