'use client';

import type { FC } from 'react';
import { cn } from '@/common/utils';
import useSearchParams from '@/common/hooks/useSearchParams';
import Link from 'next/link';

type ListItemProps = { count: number } & (
  | { tag?: never; placeholder?: string }
  | { tag: string; placeholder?: never }
);

const ListItem: FC<ListItemProps> = ({ tag, placeholder, count }) => {
  const {
    searchParams: { tag: currentTag, ...searchParams },
  } = useSearchParams();

  const query = { ...searchParams, ...(tag && { tag }) };

  return (
    <li
      className={cn(
        'text-sm flex gap-1 items-center max-lg:px-2 max-lg:py-[0.25rem] max-lg:rounded-lg max-lg:w-fit max-lg:inline-block',
        tag === currentTag
          ? 'color-primary max-lg:color-invert max-lg:bg-invert'
          : 'color-secondary max-lg:color-primary max-lg:bg-inactive',
      )}
    >
      <Link
        href={{ pathname: '/post', query }}
        className="min-lg:animated-underline max-lg:text-xs"
      >
        {tag ?? placeholder}
      </Link>
      <span className="text-xs color-secondary max-lg:!text-inherit">({count})</span>
    </li>
  );
};

export default ListItem;
