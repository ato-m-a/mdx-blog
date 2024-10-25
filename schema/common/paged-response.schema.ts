import { z } from 'zod';

export type PagedResponseSchema<T extends z.ZodRawShape> = z.infer<
  ReturnType<typeof pagedResponseSchema<T>>
>;

const pagedResponseSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  z.object({
    totalCount: z.number(),
    totalPage: z.number(),
    data: z.array(schema),
  });

export default pagedResponseSchema;
