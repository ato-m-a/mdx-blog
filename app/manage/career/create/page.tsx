import type { FC } from 'react';
import createMetadata from '@/common/utils/createMetadata';
import Container from '@/components/Container';
import Header from '@/components/Header';
import SessionController from '@/components/SessionController';
import Form from '@/components/Form/Career';

export const metadata = createMetadata({
  pathname: '/manage/career/create',
  title: '이력 생성',
  description: '새로운 이력을 생성합니다.',
});

const CareerCreatePage: FC = () => {
  return (
    <Container className="space-y-12">
      <Header
        pathMap={[
          { href: '/', label: '홈' },
          { href: '/manage/career', label: '이력 관리' },
          { href: '', label: '이력 추가' },
        ]}
        title="이력 추가"
        subtitle="새로운 이력을 추가합니다."
        widget={<SessionController />}
      />
      <Form action="create" />
    </Container>
  );
};

export default CareerCreatePage;
