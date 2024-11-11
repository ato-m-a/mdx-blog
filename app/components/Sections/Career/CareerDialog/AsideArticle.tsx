'use client';

import type { ExperienceSchema } from '@/schema/experience.schema';
import type { FC } from 'react';
import { format } from 'date-fns';

type AsideArticleProps = ExperienceSchema & { index: number };

const AsideArticle: FC<AsideArticleProps> = ({ position, startDate, endDate }) => {
  const workPeriod = `${format(startDate, 'yyyy.MM')} - ${
    endDate ? format(endDate, 'yyyy.MM') : '현재'
  }`;

  return (
    <article className="transition-transform duration-500 space-y-1">
      <p className="font-codeblock color-primary">{position}</p>
      <p className="text-sm color-secondary">{workPeriod}</p>
    </article>
  );
};

export default AsideArticle;
