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

const CompanyCard: FC<CompanySchema> = ({ id, name, url, brandColor, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div></div>
      </CardContent>
      <CardFooter>
        <div></div>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
