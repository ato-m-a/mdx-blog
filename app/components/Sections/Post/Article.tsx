import type { FC } from 'react';
import type { PostSchema } from '@/schema/post.schema';
import { format } from 'date-fns';
import HoverGroup from '@/components/HoverGroup';
import Link from 'next/link';

const PostArticle: FC<PostSchema> = ({ id, title, createdAt }) => {
  return (
    <article className="border-l-2 border-zinc-700 pl-4">
      <HoverGroup extend={Link} href={`/posts/${id}`} className="text-lg color-primary">
        {title}
      </HoverGroup>
      <p className="text-sm font-codeblock color-tertiary">
        {format(new Date(createdAt), 'MMM d, yyyy')}
      </p>
    </article>
  );
};

export default PostArticle;
