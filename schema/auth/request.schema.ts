import { z } from 'zod';

export type CheckPermissonRequestSchema = z.infer<typeof checkPermissonRequestSchema>;
export type LoginRequestSchema = z.infer<typeof loginRequestSchema>;

export const checkPermissonRequestSchema = z.object({
  id: z.string().optional(),
  throwOnError: z.boolean().optional().default(false),
});

export const loginRequestSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
});
