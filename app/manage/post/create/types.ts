import type { CreatePostRequestSchema } from '@/schema/post/request.schema';

export type PostMetadata = Omit<CreatePostRequestSchema, 'content'>;
