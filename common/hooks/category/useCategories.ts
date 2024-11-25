'use client';

import trpc from 'trpc-client';

export const useCategories = () => {
  const { data: categories } = trpc.category.getMany.useQuery(undefined, {
    select: (data) => data.map(({ name }) => name),
  });

  return categories ?? [];
};

export default useCategories;
