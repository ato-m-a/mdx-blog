'use client';

import type { FC, HTMLAttributes } from 'react';
import { cn } from '@/common/utils';
import { Separator } from '@/components/ui/separator';
import ListItem from './ListItem';
import trpc from 'trpc-client';

const PostTags: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const { data: getCountsResponse } = trpc.post.getCountsByTag.useQuery();
  const { totalCount, tags } = getCountsResponse ?? {};

  return (
    <aside className={cn('flex flex-col', className)} {...props}>
      <h3 className="color-primary">태그 목록</h3>
      <Separator className="mt-1.5 w-full" />
      <ul className="mt-3 min-lg:space-y-1 max-lg:flex max-lg:flex-wrap max-lg:gap-1.5">
        <ListItem placeholder="전체보기" count={totalCount ?? 0} />
        {tags?.map(({ id, name, postCount }) => (
          <ListItem key={`tag-${id}`} tag={name} count={postCount} />
        ))}
      </ul>
    </aside>
  );
};

export default PostTags;
