import type { FC } from 'react';
import type { PostResponseSchema } from '@/schema/post/post-response.schema';
import { format } from 'date-fns';
import Link from 'next/link';

type PostArticleProps = Pick<PostResponseSchema, 'title' | 'slug' | 'createdAt'>;

const PostArticle: FC<PostArticleProps> = ({ slug, title, createdAt }) => {
  return (
    <article className="flex flex-col gap-1">
      <div className="line-clamp-2">
        <Link
          href={`/post/${slug}`}
          className="text-2xl color-primary break-words animated-underline"
        >
          {title}
        </Link>
      </div>
      <p className="font-codeblock text-sm color-secondary">{format(createdAt, 'MMM d, yyyy')}</p>
    </article>
  );
};

export default PostArticle;
