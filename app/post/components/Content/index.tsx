'use client';

import type { FC } from 'react';
import useSearchParams from '@/common/hooks/useSearchParams';
import usePostList from '@/common/hooks/post/usePostList';
import PostArticle from './Article';

const PostContent: FC = () => {
  const {
    searchParams: { keyword },
  } = useSearchParams();
  const { data, elementRef } = usePostList();

  return (
    <section className="flex flex-col gap-10">
      {data && data.length > 0 ? (
        data.map((post) => <PostArticle key={post.id} {...post} />)
      ) : (
        <div className="flex flex-col gap-y-4">
          <p className="text-sm color-secondary">
            {keyword ? '검색된 결과가' : '아직 작성된 포스트가'} 없습니다.
          </p>
        </div>
      )}
      <div ref={elementRef} />
    </section>
  );
};

export default PostContent;
