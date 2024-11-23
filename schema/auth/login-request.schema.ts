import { z } from 'zod';

export type LoginRequestSchema = z.infer<typeof loginRequestSchema>;

const loginRequestSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

export default loginRequestSchema;
