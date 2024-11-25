import { z } from 'zod';

export type CreatePostSchema = z.infer<typeof createPostSchema>;

const EMPTY_TITLE = '제목을 입력해주세요.';
const EMPTY_CONTENT = '내용을 입력해주세요.';
const EMPTY_CATEGORY = '카테고리를 선택해주세요.';

const createPostSchema = z.object({
  title: z.string().min(1, EMPTY_TITLE),
  subtitle: z.string().optional(),
  content: z.string().min(1, EMPTY_CONTENT),
  category: z
    .string()
    .min(1, EMPTY_CATEGORY)
    .refine((value) => value !== '', { message: EMPTY_CATEGORY }),
  tag: z.string().optional(),
});

export default createPostSchema;
