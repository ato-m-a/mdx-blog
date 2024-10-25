import type { FC } from 'react';
import PostArticle from './Article';
import HoverGroup from '@/components/HoverGroup';
import Link from 'next/link';

const fixture = {
  title: '테스트',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  categories: ['테스트'],
};

const PostSection: FC = () => {
  return (
    <section className="flex flex-col gap-y-4 col-span-2">
      <h2 className="text-2xl color-primary font-semibold">최근 글 & 프로젝트</h2>
      <section className="grid grid-cols-2 w-100 gap-y-6 gap-x-16 max-md:grid-cols-1">
        {Array(4)
          .fill(fixture)
          .map((obj, index) => (
            <PostArticle key={index} {...{ ...obj, id: index }} />
          ))}
      </section>
      <HoverGroup extend={Link} className="color-primary" href="/posts">
        모든 글 보기 →
      </HoverGroup>
    </section>
  );
};

export default PostSection;
