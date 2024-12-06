'use client';

import type { FC } from 'react';
import trpc from 'trpc-client';
import CompanyCard from '../Card';

const ManageCompanyContent: FC = () => {
  const { data: companies } = trpc.company.getMany.useQuery();

  return (
    <main className="grid grid-cols-3 gap-6">
      {companies?.map((company) => <CompanyCard key={company.id} {...company} />)}
    </main>
  );
};

export default ManageCompanyContent;
