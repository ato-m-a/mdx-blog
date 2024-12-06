'use client';

import type { FC } from 'react';
import trpc from 'trpc-client';

const ManageCompanyContent: FC = () => {
  const { data: companies } = trpc.company.getMany.useQuery();

  return (
    <main className="grid grid-cols-3 gap-6">
      {companies?.map((company) => <div key={company.id}>{company.name}</div>)}
    </main>
  );
};

export default ManageCompanyContent;
