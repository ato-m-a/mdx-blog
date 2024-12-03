import type { NextPage } from 'next';
import Container from '@/components/Container';
import Header from '@/components/Header';
import SessionController from '@/components/SessionController';
import createMetadata from '@/common/utils/createMetadata';

export const metadata = createMetadata({
  pathname: '/manage/company',
  title: '재직 정보',
  description: '재직 정보를 관리합니다.',
});

const ManageCompanyPage: NextPage = () => {
  return (
    <Container>
      <Header
        pathMap={[
          { href: '/', label: '홈' },
          { href: '/manage/company', label: '재직 정보' },
        ]}
        title="재직 정보"
        subtitle="재직 정보를 관리합니다."
        widget={<SessionController />}
      />
    </Container>
  );
};

export default ManageCompanyPage;
