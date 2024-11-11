'use client';

import type { ExperienceSchema } from '@/schema/experience.schema';
import { useState, useEffect, useRef, type FC } from 'react';
import { format } from 'date-fns';
import Observed from '@/components/Observed';

type AsideArticleProps = ExperienceSchema & { index: number };

const AsideArticle: FC<AsideArticleProps> = ({ index, position, startDate, endDate }) => {
  const [isActive, setIsActive] = useState<boolean>(() => index === 0);

  const { cursor } = Observed.useContext();

  const articleRef = useRef<HTMLElement>(null);
  const workPeriod = `${format(startDate, 'yyyy.MM')} - ${
    endDate ? format(endDate, 'yyyy.MM') : '현재'
  }`;

  useEffect(() => {
    if (cursor === index) setIsActive(true);
    else setIsActive(false);
  }, [cursor]);

  return (
    <article className="transition-transform duration-500 space-y-1" ref={articleRef}>
      <p className={`font-codeblock ${isActive ? 'color-primary' : 'color-tertiary'}`}>
        {position}
      </p>
      <p className={`text-sm ${isActive ? 'color-secondary' : 'color-tertiary'}`}>{workPeriod}</p>
    </article>
  );
};

export default AsideArticle;
