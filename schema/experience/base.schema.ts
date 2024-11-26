import { z } from 'zod';
import { createBase } from '@/schema/common/createBase';

export type ExperienceSchema = z.infer<typeof experienceSchema>;

export const experienceSchema = createBase({
  department: z.string(),
  position: z.string(),
  startDate: z.date(),
  content: z.string(),
  endDate: z.date().nullable(),
});
