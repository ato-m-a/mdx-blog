import type { FC } from 'react';
import type { PostSchema } from '@/schema/post/base.schema';
import type { FetchStatus } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import Link from 'next/link';

type PostArticleProps = Pick<PostSchema, 'title' | 'slug' | 'createdAt'> & {
  fetchStatus: FetchStatus;
};

interface IPostArticle extends FC<PostArticleProps> {
  skeleton: FC;
}

const PostArticle: IPostArticle = ({ slug, title, createdAt }) => {
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

PostArticle.skeleton = () => {
  return (
    <article className="flex flex-col gap-1">
      <Skeleton className="w-full h-[2rem]" />
      <Skeleton className="w-[12ch] h-[1.3rem]" />
    </article>
  );
};

export default PostArticle;
