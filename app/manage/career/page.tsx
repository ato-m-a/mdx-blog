import { HydrationBoundary } from '@tanstack/react-query';
import { getDehydrated } from '@/common/trpc/lib';
import Container from '@/components/Container';
import Header from '@/components/Header';
import SessionController from '@/components/SessionController';
import createMetadata from '@/common/utils/createMetadata';
import ManageCareerContent from './components/Content';

export const metadata = createMetadata({
  pathname: '/manage/career',
  title: '이력 관리',
  description: '내 이력을 관리합니다.',
});

const ManageCareerPage = async () => {
  const dehydrated = await getDehydrated((helpers) => [helpers.company.getCareers.prefetch()]);

  return (
    <Container className="space-y-12">
      <Header
        pathMap={[
          { href: '/', label: '홈' },
          { href: '/manage/career', label: '이력 관리' },
        ]}
        title="이력 관리"
        subtitle="내 이력을 관리합니다."
        widget={<SessionController />}
      />
      <HydrationBoundary state={dehydrated}>
        <ManageCareerContent />
      </HydrationBoundary>
    </Container>
  );
};

export default ManageCareerPage;
