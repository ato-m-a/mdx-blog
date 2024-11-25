import type { FC } from 'react';
import type { PostResponseSchema } from '@/schema/post/post-response.schema';
import { format } from 'date-fns';
import Link from 'next/link';

const PostArticle: FC<PostResponseSchema> = ({ slug, title, createdAt }) => {
  return (
    <article className="justify-between border-l-2 border-zinc-700 pl-4 h-fit">
      <Link href={`/post/${slug}`} className="text-lg color-primary animated-underline">
        {title}
      </Link>
      <p className="text-sm font-codeblock color-secondary">
        {format(new Date(createdAt), 'MMM d, yyyy')}
      </p>
    </article>
  );
};

export default PostArticle;
