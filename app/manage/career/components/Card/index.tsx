'use client';

import type { GetCareerResponseSchema } from '@/schema/company/response.schema';
import type { FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import getPeriod from '@/common/utils/getPeriod';
import CompanyLabel from '@/components/CompanyLabel';
import CareerCardListItem from './ListItem';
import CardEmptyView from './EmptyView';
import Link from 'next/link';

interface ICareerCard extends FC<GetCareerResponseSchema> {
  skeleton: FC;
  emptyView: FC;
}

const CareerCard: ICareerCard = ({ id, name, url, brandColor, experiences, description }) => {
  const period = getPeriod(experiences, { join: ' - ', format: 'yyyy.MM.dd', fallback: '재직중' });

  return (
    <Card className="flex flex-col h-80">
      <CardHeader>
        <CardTitle>
          <CompanyLabel name={name} brandColor={brandColor} href={url} />
        </CardTitle>
        <CardDescription className="line-clamp-2 h-10">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <CareerCardListItem title="재직 기간" value={period} />
        <CareerCardListItem title="이력 정보" value={`${experiences.length}개`} />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild>
          <Link href={`/manage/career/${id}`}>편집</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

CareerCard.skeleton = () => <Skeleton className="h-[318px]" />;
CareerCard.emptyView = CardEmptyView;

export default CareerCard;
