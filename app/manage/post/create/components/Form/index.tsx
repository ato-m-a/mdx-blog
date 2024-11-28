'use client';

import type { FC } from 'react';
import {
  createPostRequestSchema,
  type CreatePostRequestSchema,
} from '@/schema/post/request.schema';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import useMarkdown from '@/common/hooks/useMarkdown';
import MarkdownEditor from '@/components/MarkdownEditor';
import MetadataSheet from '../MetadataSheet';
import toast from '@/common/utils/toast';
import trpc from 'trpc-client';

const CreatePostForm: FC = () => {
  const router = useRouter();

  const { source, content, frontmatter } = useMarkdown<Omit<CreatePostRequestSchema, 'content'>>({
    frontmatter: {
      title: '포스트 제목',
      subtitle: '포스트 부제목',
      category: '개발',
      tags: ['React.js'],
    },
  });

  const utils = trpc.useUtils();
  const { mutate: createPost } = trpc.post.create.useMutation({
    onSuccess: ({ slug }) => {
      utils.post.invalidate();
      router.push(`/post/${slug}`);
      toast.create_post_success();
    },
    onError: ({ message }) => {
      toast.create_post_failed(message);
    },
  });

  const handleSubmit = () => {
    const { error, data } = createPostRequestSchema.safeParse({
      content: content.get(),
      ...frontmatter.get(),
    });

    if (error) return toast.create_post_failed(error.message);
    createPost(data);
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

export default CreatePostForm;
