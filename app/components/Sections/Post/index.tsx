import type { FC, PropsWithChildren } from 'react';
import PostArticle from './Article';
import HoverGroup from '@/components/HoverGroup';
import Link from 'next/link';

interface IPostSection extends FC<PropsWithChildren> {
  Article: typeof PostArticle;
}

const PostSection: IPostSection = ({ children }) => {
  return (
    <section className="flex flex-col gap-y-4 col-span-2">
      <h2 className="text-2xl color-primary font-semibold">최근 글 & 프로젝트</h2>
      <section className="grid grid-cols-2 w-100 gap-y-6 gap-x-16">{children}</section>
      <HoverGroup extend={Link} className="color-primary" href="/test">
        모든 글 보기 →
      </HoverGroup>
    </section>
  );
};

PostSection.Article = PostArticle;

export default PostSection;
