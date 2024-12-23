'use client';

import { useEffect, useRef } from 'react';
import { getPostsRequestSchema } from '@/schema/post/request.schema';
import getQueryState from '@/common/utils/getQueryState';
import useSearchParams from '@/common/hooks/useSearchParams';
import trpc from 'trpc-client';

const usePostList = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const {
    searchParams: { keyword, tag, category },
  } = useSearchParams(getPostsRequestSchema.parse);

  const payload = { keyword, tag, category, take: 10 };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...status } =
    trpc.post.getMany.useInfiniteQuery(payload, {
      getNextPageParam: ({ nextCursor }) => nextCursor,
      select: ({ pages }) => pages.flatMap((page) => page.data),
      placeholderData: (data) => data,
    });

  const queryState = getQueryState(status);

  useEffect(() => {
    if (isFetchingNextPage) return;
    if (!hasNextPage) return;

    const handleObserve: IntersectionObserverCallback = (entries) => {
      const target = entries?.at(0);
      if (target?.isIntersecting) fetchNextPage();
    };

    observerRef.current = new IntersectionObserver(handleObserve, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (elementRef.current) observerRef.current.observe(elementRef.current);

    return () => {
      if (observerRef.current && elementRef.current) {
        observerRef.current.unobserve(elementRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return { data, elementRef, queryState } as const;
};

export default usePostList;
