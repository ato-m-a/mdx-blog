import { z } from 'zod';
import experienceSchema from '@/schema/experience.schema';
import companySchema from './company.schema';

export type CareerSchema = z.infer<typeof careerSchema>;

const careerSchema = companySchema.extend({
  experiences: experienceSchema.array(),
});

export default careerSchema;
