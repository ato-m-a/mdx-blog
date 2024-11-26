import { z } from 'zod';

export type BaseSchema<T extends z.ZodRawShape> = z.ZodObject<
  {
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodNullable<z.ZodDate>;
  } & T
>;

export const createBase = <T extends z.ZodRawShape>(schema: T): BaseSchema<T> =>
  z.object({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    ...schema,
  });
