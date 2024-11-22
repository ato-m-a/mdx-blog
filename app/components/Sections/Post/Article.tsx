import type { FC } from 'react';
import type { PostResponseSchema } from '@/schema/post/post-response.schema';
import { format } from 'date-fns';
import Link from 'next/link';

const PostArticle: FC<PostResponseSchema> = ({ id, title, createdAt }) => {
  return (
    <article className="border-l-2 border-zinc-700 pl-4">
      <Link href={`/posts/${id}`} className="text-lg color-primary w-fit animated-underline">
        {title}
      </Link>
      <p className="text-sm font-codeblock color-secondary">
        {format(new Date(createdAt), 'MMM d, yyyy')}
      </p>
    </article>
  );
};

export default PostArticle;
