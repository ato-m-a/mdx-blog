'use client';

import type { FC } from 'react';
import type { CompanySchema } from '@/schema/company/base.schema';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CompanyLabel from '@/components/CompanyLabel';

const CareerCard: FC<CompanySchema> = ({ id, name, url, brandColor, description }) => {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>
          <CompanyLabel name={name} brandColor={brandColor} href={url} />
        </CardTitle>
        <CardDescription className="line-clamp-2 h-10">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div></div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline">이력 편집</Button>
        <Button>수정</Button>
      </CardFooter>
    </Card>
  );
};

export default CareerCard;
