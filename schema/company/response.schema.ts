import { z } from 'zod';
import { companySchema } from '@/schema/company/base.schema';
import { experienceSchema } from '@/schema/experience/base.schema';

export type GetCareersResponseSchema = z.infer<typeof getCareersResponseSchema>;

export const getCareersResponseSchema = companySchema.extend({
  experiences: experienceSchema.array(),
});
