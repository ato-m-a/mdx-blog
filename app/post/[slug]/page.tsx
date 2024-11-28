import type { NextPage } from 'next';
import type { Params } from '@/components/types';
import { notFound } from 'next/navigation';
import createMetadata from '@/common/utils/createMetadata';
import createOpenGraph from '@/common/utils/createOpenGraph';
import Container from '@/components/Container';
import MDXRenderer from '@/components/MDXRenderer';
import PostHeader from './components/Header';
import trpc from 'trpc-server';

type PostViewPageProps = Params<'slug'>;

export const revalidate = 60;

export const generateMetadata = async ({ params: { slug } }: PostViewPageProps) => {
  if (!slug) return {};

  const post = await trpc.post.get({ slug: decodeURIComponent(slug) });

  if (!post) return {};

  const title = `${post.title} | 홍준혁`;
  const description = post.subtitle ?? '';

  return createMetadata({
    pathname: `/post/${slug}`,
    title,
    description,
    ogImage: createOpenGraph({
      pathname: 'post',
      title: post.title,
      subtitle: post.subtitle ?? undefined,
    }),
  });
};

export const generateStaticParams = async ({ params: { slug } }: PostViewPageProps) => {
  if (!slug) return [];

  const posts = await trpc.post.getMany();

  return posts.data.map(({ slug }) => ({ slug }));
};

const PostViewPage: NextPage<PostViewPageProps> = async ({ params: { slug } }) => {
  if (!slug) return notFound();

  const post = await trpc.post.get({ slug: decodeURIComponent(slug) });
  if (!post) return notFound();

  return (
    <Container className="flex flex-col gap-16 max-lg:gap-10 max-md:gap-6">
      <PostHeader {...post} />
      <MDXRenderer source={post.content} />
    </Container>
  );
};

export default PostViewPage;
