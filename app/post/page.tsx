import type { NextPage } from 'next';
import { getDehydrated } from '@/common/trpc/lib';
import { HydrationBoundary } from '@tanstack/react-query';
import SearchParamsProvider from '@/components/Providers/SearchParamsProvider';
import createMetadata from '@/common/utils/createMetadata';
import createOpenGraph from '@/common/utils/createOpenGraph';
import Container from '@/components/Container';
import Header from '@/components/Header';
import PostTags from './components/Tags';
import PostToolbar from './components/Toolbar';
import PostContent from './components/Content';
import CreatePostLink from './components/CreatePostLink';

export const revalidate = 60;

export const metadata = createMetadata({
  pathname: '/post',
  title: '홍준혁 | 포스트 목록',
  description: '내일 더 나아지기 위한 기록입니다.',
  ogImage: createOpenGraph({
    pathname: 'Post',
    title: '내일 더 나아지기 위한 기록입니다.',
    subtitle: 'https://ato-m-a.me/post/',
  }),
});

const PostPage: NextPage = async () => {
  const dehydrated = await getDehydrated((helpers) => [
    helpers.post.getMany.prefetchInfinite({ take: 10 }),
    helpers.post.getCountsByTag.prefetch(),
    helpers.category.getMany.prefetch(),
  ]);

  return (
    <Container className="flex flex-col gap-16 max-lg:gap-10">
      <Header
        pathMap={[
          { href: '/', label: '홈' },
          { href: '/post', label: '포스트' },
        ]}
        title="포스트 목록"
        subtitle="내일 더 나아지기 위한 기록입니다."
        widget={<CreatePostLink />}
      />
      <HydrationBoundary state={dehydrated}>
        <SearchParamsProvider>
          <div className="flex flex-row-reverse gap-10 max-lg:flex-col">
            <PostTags className="w-44 max-lg:w-full" />
            <section className="flex flex-col gap-10 flex-1">
              <PostToolbar />
              <PostContent />
            </section>
          </div>
        </SearchParamsProvider>
      </HydrationBoundary>
    </Container>
  );
};

export default PostPage;
