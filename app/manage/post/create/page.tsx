import type { NextPage } from 'next';
import createMetadata from '@/common/utils/createMetadata';
import Container from '@/components/Container';
import Header from '@/components/Header';

export const metadata = createMetadata({
  pathname: '/manage/post/create',
  title: '새 포스트 작성',
  description: '새 포스트 작성 페이지',
});

const CreatePostPage: NextPage = () => {
  return (
    <Container className="flex flex-col gap-16">
      <Header
        pathMap={[
          { href: '/', label: '홈' },
          { href: '/post', label: '포스트' },
          { href: '/manage/post', label: '작성' },
        ]}
        title="포스트 작성"
        subtitle="새 포스트를 작성합니다."
      />
    </Container>
  );
};

export default CreatePostPage;
