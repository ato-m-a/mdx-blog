import type { NextPage } from 'next';
import { HydrationBoundary } from '@tanstack/react-query';
import { getDehydrated } from '@/common/trpc/lib';
import Container from '@/components/Container';
import Header from '@/components/Header';
import SessionController from '@/components/SessionController';
import createMetadata from '@/common/utils/createMetadata';
import ManageCompanyContent from './components/Content';

export const metadata = createMetadata({
  pathname: '/manage/company',
  title: '재직 정보',
  description: '재직 정보를 관리합니다.',
});

const ManageCompanyPage: NextPage = () => {
  const dehydrated = getDehydrated((helper) => [helper.company.getMany.prefetch()]);

  return (
    <Container className="space-y-12">
      <Header
        pathMap={[
          { href: '/', label: '홈' },
          { href: '/manage/company', label: '재직 정보' },
        ]}
        title="재직 정보"
        subtitle="재직 정보를 관리합니다."
        widget={<SessionController />}
      />
      <HydrationBoundary state={dehydrated}>
        <ManageCompanyContent />
      </HydrationBoundary>
    </Container>
  );
};

export default ManageCompanyPage;
