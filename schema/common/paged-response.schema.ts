import { z } from 'zod';

export type PagedResponseSchema<T extends z.ZodRawShape> = z.infer<
  ReturnType<typeof pagedResponseSchema<T>>
>;

const pagedResponseSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  z.object({
    nextCursor: z.number().optional(),
    data: schema.array(),
  });

export default pagedResponseSchema;
