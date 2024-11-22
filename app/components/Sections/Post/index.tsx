'use client';

import type { FC } from 'react';
import PostArticle from './Article';
import trpc from 'trpc-client';
import Link from 'next/link';

const PostSection: FC = () => {
  const { data: posts } = trpc.post.getMany.useQuery({ take: 4 });

  return (
    <section className="flex flex-col gap-y-4 col-span-2">
      <h2 className="text-2xl color-primary font-semibold">최근 글 & 프로젝트</h2>
      <section className="grid grid-cols-2 w-full gap-y-6 gap-x-16 max-md:grid-cols-1">
        {posts && posts.data.length > 0 ? (
          posts.data.map((post) => <PostArticle key={post.id} {...post} />)
        ) : (
          <p className="color-tertiary leading-10">아직 작성된 포스트가 없습니다.</p>
        )}
      </section>
      <Link href="/post" className="color-primary animated-underline w-fit">
        모든 글 보기 →
      </Link>
    </section>
  );
};

export default PostSection;
