'use client';

import type { FC } from 'react';
import trpc from 'trpc-client';
import CareerCard from '../Card';

const ManageCareerContent: FC = () => {
  const { data: careers } = trpc.company.getCareers.useQuery();

  return (
    <main className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
      {careers?.map((career) => <CareerCard key={career.id} {...career} />)}
      <CareerCard.emptyView />
    </main>
  );
};

export default ManageCareerContent;
