import type { NextPage } from 'next';
import type { Params } from '@/components/types';
import { notFound } from 'next/navigation';
import createMetadata from '@/common/utils/createMetadata';
import SessionController from '@/components/SessionController';
import Container from '@/components/Container';
import Header from '@/components/Header';
import PostForm from '@/components/PostForm';
import trpc from 'trpc-server';

export const metadata = createMetadata({
  pathname: '/manage/post/update',
  title: '포스트 수정',
  description: '포스트 수정 페이지',
});

const UpdatePostPage: NextPage<Params<'id'>> = async ({ params: { id } }) => {
  if (!id) return notFound();

  const postId = parseInt(id);
  if (isNaN(postId)) return notFound();

  const post = await trpc.post.get({ id: postId });
  if (!post) return notFound();

  const defaultValues = {
    ...post,
    subtitle: post.subtitle ?? '',
    category: post.category.name,
    tags: post.tags.map((tag) => tag.name),
  };

  return (
    <Container className="flex flex-col gap-10">
      <Header
        pathMap={[
          { href: '/', label: '홈' },
          { href: '/post', label: '포스트' },
          { href: `/manage/post/update/${id}`, label: '수정' },
        ]}
        title="포스트 수정"
        subtitle="포스트를 수정합니다."
        widget={<SessionController />}
      />
      <PostForm action="update" defaultValues={defaultValues} />
    </Container>
  );
};

export default UpdatePostPage;
