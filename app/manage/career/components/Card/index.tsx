'use client';

import type { GetCareersResponseSchema } from '@/schema/company/response.schema';
import { memo, useMemo, type FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import CompanyLabel from '@/components/CompanyLabel';
import Link from 'next/link';

const CareerCard: FC<GetCareersResponseSchema> = memo(
  ({ id, name, url, brandColor, experiences, description }) => {
    const period = useMemo<string>(() => {
      if (experiences.length) {
        const startDate = experiences[0].startDate;
        const endDate = experiences[experiences.length - 1].endDate;

        return `${format(startDate, 'yyyy.MM.dd')} ~ ${endDate ? format(endDate, 'yyyy.MM.dd') : '재직중'}`;
      }

      return '재직 정보 없음';
    }, [experiences]);

    return (
      <Card className="flex flex-col h-80">
        <CardHeader>
          <CardTitle>
            <CompanyLabel name={name} brandColor={brandColor} href={url} />
          </CardTitle>
          <CardDescription className="line-clamp-2 h-10">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <div className="space-y-2 text-sm">
            <p className="color-primary">재직 기간</p>
            <p className="color-secondary">{period}</p>
          </div>
          <p className="text-sm color-secondary">
            이력 정보 <span className="color-primary mx-1">{experiences.length}</span>개 기록
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button asChild>
            <Link href={`/manage/career/${id}`}>편집</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  },
);

CareerCard.displayName = 'CareerCard';
export default CareerCard;
