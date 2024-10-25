import type { FC } from 'react';
import type { ExperienceSchema } from '@/schema/experience.schema';
import { format } from 'date-fns';
import ColorBadge from '@/components/ColorBadge';
import HoverGroup from '@/components/HoverGroup';
import Link from 'next/link';

const ExperienceArticle: FC<ExperienceSchema> = ({ company, position, startDate, endDate }) => {
  const period = `${format(startDate, 'yyyy')} - ${endDate ? format(endDate, 'yyyy') : ''}`;

  return (
    <article className="flex">
      <h3 className="w-44 shrink-0 color-primary">{period}</h3>
      <div className="w-fit flex flex-col gap-0.5">
        <HoverGroup extend={Link} href={`/experience/${company.id}`} className="company-label">
          <ColorBadge color={company.brandColor} />
          <span className="company-label__name">{company.name}</span>
        </HoverGroup>
        <p className="text-sm font-codeblock color-secondary leading-5">{position}</p>
      </div>
    </article>
  );
};

export default ExperienceArticle;