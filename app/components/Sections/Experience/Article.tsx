import type { FC } from 'react';
import type { ExperienceSchema } from '@/schema/experience.schema';
import { format } from 'date-fns';
import CompanyLabel from '@/components/CompanyLabel';
import ExperienceDialog from './ExpirenceDialog';

const ExperienceArticle: FC<ExperienceSchema> = ({
  company,
  position,
  department,
  startDate,
  endDate,
  content,
}) => {
  const period = `${format(startDate, 'yyyy')} - ${endDate ? format(endDate, 'yyyy') : ''}`;
  const dialogProps = { company, content, position, department, startDate, endDate };

  return (
    <article className="flex justify-between">
      <div className="flex">
        <h3 className="w-44 shrink-0 color-primary">{period}</h3>
        <div className="w-fit flex flex-col gap-0.5">
          <ExperienceDialog {...dialogProps} trigger={<CompanyLabel {...company} />} />
          <p className="text-sm font-codeblock color-secondary leading-5">{position}</p>
        </div>
      </div>
    </article>
  );
};

export default ExperienceArticle;
