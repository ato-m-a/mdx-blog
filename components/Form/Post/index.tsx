'use client';

import type { FC } from 'react';
import type { FormProps } from '../types';
import type { PostSchema } from '@/schema/post/base.schema';
import {
  updatePostRequestSchema,
  createPostRequestSchema,
  type CreatePostRequestSchema,
  type UpdatePostRequestSchema,
} from '@/schema/post/request.schema';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import switchCase from '@/common/utils/switchCase';
import useMarkdown from '@/common/hooks/useMarkdown';
import MarkdownEditor from '@/components/MarkdownEditor';
import MetadataSheet from './MetadataSheet';
import toast from '@/common/utils/toast';
import trpc from 'trpc-client';

type OnSuccessParams = Pick<PostSchema, 'slug'>;
type OnErrorParams = { message: string };

type PostFormProps = FormProps<UpdatePostRequestSchema>;

const Form: FC<PostFormProps> = ({ action, defaultValues }) => {
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

  const toastOnFailure = (message: string) =>
    switchCase(action, {
      update: () => toast.update_post_failed(message),
      create: () => toast.create_post_failed(message),
    });
  const toastOnSuccess = switchCase(action, {
    update: () => toast.update_post_success(),
    create: () => toast.create_post_success(),
  });

  const { source, content, frontmatter } = useMarkdown<Omit<CreatePostRequestSchema, 'content'>>({
    content: defaultContent ?? undefined,
    frontmatter: {
      title: title ?? '포스트 제목을 입력해주세요 (required)',
      subtitle: subtitle ?? '포스트 부제목을 입력하거나, 지워주세요. (optional)',
      category: category ?? '게시할 카테고리를 입력해주세요. (required)',
      tags: tags ?? ['태그를 나열해주세요.', '(optional)'],
    },
  });

  const utils = trpc.useUtils();

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

  const { mutate: updatePost } = trpc.post.update.useMutation(mutationOptions);
  const { mutate: createPost } = trpc.post.create.useMutation(mutationOptions);

  const handleSubmit = () => {
    const schema = switchCase(action, {
      create: createPostRequestSchema,
      update: updatePostRequestSchema,
    });

    const { error, data } = schema.safeParse({
      content: content.get(),
      ...frontmatter.get(),
      ...(isUpdate ? { id } : {}),
    });

    if (error) return toastOnFailure(error.message);

    const mutateFn = switchCase(action, {
      create: () => createPost(data),
      update: () => updatePost({ ...data, id: id! }),
    });
    return mutateFn();
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

export default Form;
