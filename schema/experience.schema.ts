import { z } from 'zod';

export type ExperienceSchema = z.infer<typeof experienceSchema>;

const experienceSchema = z.object({
  id: z.number(),
  department: z.string(),
  position: z.string(),
  startDate: z.date(),
  content: z.string(),
  endDate: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export default experienceSchema;
