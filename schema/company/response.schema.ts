import { z } from 'zod';
import { companySchema } from '@/schema/company/base.schema';
import { experienceSchema } from '@/schema/experience/base.schema';

export type GetCareerResponseSchema = z.infer<typeof getCareerResponseSchema>;

export const getCareerResponseSchema = companySchema.extend({
  experiences: experienceSchema.array(),
});
