import type { FC } from 'react';
import type { PostResponseSchema } from '@/schema/post/post-response.schema';
import type { FetchStatus } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { cn } from '@/common/utils';
import Link from 'next/link';

type PostArticleProps = Pick<PostResponseSchema, 'title' | 'slug' | 'createdAt'> & {
  fetchStatus: FetchStatus;
};

const PostArticle: FC<PostArticleProps> = ({ slug, title, createdAt, fetchStatus }) => {
  return (
    <article className="flex flex-col gap-1">
      <div className="line-clamp-2">
        {fetchStatus === 'fetching' ? (
          <Skeleton className={cn(`w-[${title.length}ch] h-[2rem]`)} />
        ) : (
          <Link
            href={`/post/${slug}`}
            className="text-2xl color-primary break-words animated-underline"
          >
            {title}
          </Link>
        )}
      </div>
      {fetchStatus === 'fetching' ? (
        <Skeleton className="w-[12ch] h-[1.3rem]" />
      ) : (
        <p className="font-codeblock text-sm color-secondary">{format(createdAt, 'MMM d, yyyy')}</p>
      )}
    </article>
  );
};

export default PostArticle;
