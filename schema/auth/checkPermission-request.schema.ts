import { z } from 'zod';

export type CheckPermissionRequestSchema = z.infer<typeof checkPermissionRequestSchema>;

const checkPermissionRequestSchema = z.object({
  id: z.string().optional(),
  throwOnError: z.boolean().optional().default(false),
});

export default checkPermissionRequestSchema;
