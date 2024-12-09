import type { FC } from 'react';
import createMetadata from '@/common/utils/createMetadata';
import SessionController from '@/components/SessionController';
import Container from '@/components/Container';
import Header from '@/components/Header';
import Form from '@/components/Form/Post';

export const metadata = createMetadata({
  pathname: '/manage/post/create',
  title: '새 포스트 작성',
  description: '새 포스트 작성 페이지',
});

const CreatePostPage: FC = () => {
  return (
    <Container className="flex flex-col gap-10">
      <Header
        pathMap={[
          { href: '/', label: '홈' },
          { href: '/post', label: '포스트' },
          { href: '/manage/post', label: '작성' },
        ]}
        title="포스트 작성"
        subtitle="새 포스트를 작성합니다."
        widget={<SessionController />}
      />
      <Form action="create" />
    </Container>
  );
};

export default CreatePostPage;
