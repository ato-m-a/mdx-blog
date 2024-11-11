import type { FC } from 'react';
import type { CareerSchema } from '@/schema/company/career.schema';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import CompanyLabel from '@/components/CompanyLabel';
import CareerDialog from './CareerDialog';
import CompanyDialog from './CompanyDialog';

const CareerArticle: FC<CareerSchema> = ({ experiences, ...company }) => {
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
      <CompanyDialog trigger={<Button variant="link">수정</Button>} edit {...company} />
    </article>
  );
};

export default CareerArticle;
