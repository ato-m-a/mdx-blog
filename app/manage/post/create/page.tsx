import type { NextPage } from 'next';
import Container from '@/components/Container';
import Header from '@/components/Header';

const CreatePostPage: NextPage = () => {
  return (
    <Container>
      <Header
        pathMap={[
          { href: '/', label: 'Home' },
          { href: '/post', label: 'Post' },
          { href: '/manage/post', label: 'Write Post' },
        ]}
        title="Write Post"
      />
    </Container>
  );
};

export default CreatePostPage;
