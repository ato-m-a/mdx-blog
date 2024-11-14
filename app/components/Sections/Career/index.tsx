import type { FC } from 'react';
import trpc from 'trpc-server';
import CareerArticle from './Article';

const CareerSection: FC = async () => {
  const careers = await trpc.company.getCareers();

  return (
    <section className="flex flex-col gap-y-4 max-lg:col-span-2">
      <h2 className="text-2xl color-primary font-semibold">이력</h2>
      <section className="flex flex-col gap-y-4">
        {careers?.map((career) => <CareerArticle key={career.id} {...career} />)}
      </section>
    </section>
  );
};

export default CareerSection;
