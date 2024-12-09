import { z } from 'zod';
import { experienceSchema } from '@/schema/experience/base.schema';
import {
  EMPTY_NAME,
  EMPTY_DESCRIPTION,
  INVALID_URL,
  INVALID_HEX_COLOR,
} from '@/schema/company/constant';

export type GetCareerRequestSchema = z.infer<typeof getCareerRequestSchema>;
export type CreateCareerRequestSchema = z.infer<typeof createCareerRequestSchema>;
export type UpdateCareerRequestSchema = z.infer<typeof updateCareerRequestSchema>;

export const getCareerRequestSchema = z.object({
  id: z.number(),
});

export const deleteCareerRequestSchema = z.object({
  id: z.number(),
});

export const createCareerRequestSchema = z.object({
  name: z.string().min(1, EMPTY_NAME),
  description: z.string().min(1, EMPTY_DESCRIPTION),
  url: z.string().url(INVALID_URL),
  brandColor: z.string().refine((value) => /^#([0-9A-F]{6})$/i.test(value), {
    message: INVALID_HEX_COLOR,
  }),
  experiences: experienceSchema
    .omit({ createdAt: true, updatedAt: true })
    .partial({ id: true })
    .array(),
});

export const updateCareerRequestSchema = createCareerRequestSchema.extend({
  id: z.number(),
});
