import type { FC } from 'react';
import type { GetCareersResponseSchema } from '@/schema/company/response.schema';
import { format } from 'date-fns';
import CompanyLabel from '@/components/CompanyLabel';
import CareerDialog from './CareerDialog';

const CareerArticle: FC<GetCareersResponseSchema> = ({ experiences, ...company }) => {
  const startDate = experiences[0].startDate;
  const endDate = experiences[experiences.length - 1].endDate;
  const period = `${format(startDate, 'yyyy')} - ${endDate ? format(endDate, 'yyyy') : ''}`;

  return (
    <article className="flex justify-between">
      <div className="flex">
        <h3 className="w-44 shrink-0 color-primary">{period}</h3>
        <div className="w-fit flex flex-col gap-0.5">
          <CareerDialog
            trigger={<CompanyLabel {...company} />}
            experiences={experiences}
            company={company}
          />
        </div>
      </div>
    </article>
  );
};

export default CareerArticle;
