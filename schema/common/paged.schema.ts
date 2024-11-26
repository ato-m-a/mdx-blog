import { z } from 'zod';

export type PagedRequestSchema = z.infer<typeof pagedRequestSchema>;
export type PagedResponseSchema<T extends z.ZodRawShape> = z.ZodObject<{
  nextCursor: z.ZodOptional<z.ZodNumber>;
  data: z.ZodArray<z.ZodObject<T>>;
}>;

export const pagedRequestSchema = z.object({
  cursor: z.number().optional(),
  take: z.number().optional(),
});

export const pagedResponseSchema = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
): PagedResponseSchema<T> =>
  z.object({
    nextCursor: z.number().optional(),
    data: z.array(schema),
  });
