'use client';

import type { FC } from 'react';
import trpc from 'trpc-client';
import CareerCard from '../Card';

const ManageCareerContent: FC = () => {
  const { data: companies } = trpc.company.getMany.useQuery();

  return (
    <main className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
      {companies?.map((company) => <CareerCard key={company.id} {...company} />)}
    </main>
  );
};

export default ManageCareerContent;
