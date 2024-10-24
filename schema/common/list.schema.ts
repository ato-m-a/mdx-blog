import { z } from 'zod';

export type ListSchema<T extends z.ZodRawShape> = z.infer<ReturnType<typeof listSchema<T>>>;

const listSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  z.object({
    totalCount: z.number(),
    totalPage: z.number(),
    data: z.array(schema),
  });

export default listSchema;
