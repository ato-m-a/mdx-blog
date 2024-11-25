import { z } from 'zod';

export type PostRequestSchema = z.infer<typeof postRequestSchema>;

const postRequestSchema = z.object({
  slug: z.string(),
});

export default postRequestSchema;
