import { z } from 'zod';

export type TimestampSchema = z.infer<typeof timestampSchema>;

const timestampSchema = z.string().datetime();

export default timestampSchema;
