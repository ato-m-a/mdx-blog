import type { FC } from 'react';
import type { Params } from '@/components/types';
import { notFound } from 'next/navigation';
import createMetadata from '@/common/utils/createMetadata';
import Container from '@/components/Container';
import Header from '@/components/Header';
import SessionController from '@/components/SessionController';
import Form from '@/components/Form/Career';
import trpc from 'trpc-server';

type CareerDetailPageProps = Params<'id'>;

export const dynamic = 'force-dynamic';

export const metadata = createMetadata({
  pathname: '/manage/career',
  title: '이력 상세',
  description: '내 이력을 상세하게 관리합니다.',
});

const CareerDetailPage: FC<CareerDetailPageProps> = async ({ params: { id } }) => {
  if (!id) return notFound();

  const parsedId = parseInt(id);
  const career = await trpc.company.getCareer({ id: parsedId });

  if (!career) notFound();

  return (
    <Container className="space-y-12">
      <Header
        pathMap={[
          { href: '/', label: '홈' },
          { href: '/manage/career', label: '이력 관리' },
          { href: '', label: career.name },
        ]}
        title="이력 관리"
        subtitle={`${career.name}의 이력을 관리합니다.`}
        widget={<SessionController />}
      />
      <Form action="update" defaultValues={career} />
    </Container>
  );
};

export default CareerDetailPage;
