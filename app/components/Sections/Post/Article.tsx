import type { FC } from 'react';
import type { PostSchema } from '@/schema/post.schema';
import { kstFormat } from '@toss/date';
import HoverGroup from '@/components/HoverGroup';
import Link from 'next/link';

const PostArticle: FC<PostSchema> = ({ id, title, createdAt }) => {
  return (
    <article className="border-l-2 border-zinc-700 pl-4">
      <HoverGroup extend={Link} href={`/posts/${id}`} className="text-lg color-primary">
        {title}
      </HoverGroup>
      <p className="text-sm font-codeblock color-tertiary">
        {kstFormat(new Date(createdAt), 'EEE요일, yyyy년 MM월 dd일')}
      </p>
    </article>
  );
};

export default PostArticle;
