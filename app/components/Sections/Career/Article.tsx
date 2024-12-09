import type { FC } from 'react';
import type { GetCareerResponseSchema } from '@/schema/company/response.schema';
import CompanyLabel from '@/components/CompanyLabel';
import CareerDialog from './CareerDialog';
import getPeriod from '@/common/utils/getPeriod';

const CareerArticle: FC<GetCareerResponseSchema> = ({ experiences, ...company }) => {
  const period = getPeriod(experiences, { format: 'yyyy', flat: true });

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
