'use client';

import type { FC } from 'react';
import type { PostSchema } from '@/schema/post/base.schema';
import {
  updatePostRequestSchema,
  createPostRequestSchema,
  type CreatePostRequestSchema,
  type UpdatePostRequestSchema,
} from '@/schema/post/request.schema';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import useMarkdown from '@/common/hooks/useMarkdown';
import MarkdownEditor from '@/components/MarkdownEditor';
import MetadataSheet from '@/components/PostForm/MetadataSheet';
import toast from '@/common/utils/toast';
import trpc from 'trpc-client';

type OnSuccessParams = Pick<PostSchema, 'slug'>;
type OnErrorParams = { message: string };

type PostFormProps =
  | {
      action: 'update';
      defaultValues: UpdatePostRequestSchema;
    }
  | {
      action: 'create';
      defaultValues?: never;
    };

const PostForm: FC<PostFormProps> = ({ action, defaultValues }) => {
  const router = useRouter();
  const isUpdate = action === 'update';
  const {
    title,
    subtitle,
    category,
    tags,
    id,
    content: defaultContent,
  } = isUpdate ? defaultValues : {};

  const toastOnFailure = (message: string) => {
    if (isUpdate) return toast.update_post_failed(message);
    else return toast.create_post_failed(message);
  };
  const toastOnSuccess = () => {
    if (isUpdate) return toast.update_post_success();
    else return toast.create_post_success();
  };

  const { source, content, frontmatter } = useMarkdown<Omit<CreatePostRequestSchema, 'content'>>({
    content: defaultContent ?? undefined,
    frontmatter: {
      title: title ?? '포스트 제목을 입력해주세요 (required)',
      subtitle: subtitle ?? '포스트 부제목을 입력하거나, 지워주세요. (optional)',
      category: category ?? '게시할 카테고리를 입력해주세요. (required)',
      tags: tags ?? ['태그를 나열해주세요.', '(optional)'],
    },
  });

  const mutationOptions = {
    onSuccess: ({ slug }: OnSuccessParams) => {
      utils.post.invalidate();
      router.push(`/post/${slug}`);
      toastOnSuccess();
    },
    onError: ({ message }: OnErrorParams) => {
      toastOnFailure(message);
    },
  };

  const utils = trpc.useUtils();
  const { mutate: updatePost } = trpc.post.update.useMutation(mutationOptions);
  const { mutate: createPost } = trpc.post.create.useMutation(mutationOptions);

  const handleSubmit = () => {
    const mutateSchema = isUpdate ? updatePostRequestSchema : createPostRequestSchema;

    const { error, data } = mutateSchema.safeParse({
      content: content.get(),
      ...frontmatter.get(),
      ...(isUpdate ? { id } : {}),
    });

    if (error) return toastOnFailure(error.message);
    if (id) return updatePost({ ...data, id });
    else return createPost(data);
  };

  return (
    <section className="flex flex-col gap-8 max-md:gap-6 h-full">
      <MarkdownEditor
        className="h-[600px]"
        widget={<MetadataSheet frontmatter={frontmatter} />}
        {...source}
      />
      <div className="flex justify-end">
        <Button className="max-sm:w-full" onClick={handleSubmit}>
          게시하기
        </Button>
      </div>
    </section>
  );
};

export default PostForm;
