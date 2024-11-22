'use client';

import type { FC } from 'react';
import useSearchParams from '@/common/hooks/useSearchParams';
import trpc from 'trpc-client';
import Select from '@/components/Select';

const PostSelect: FC = () => {
  const { data: categories } = trpc.category.getMany.useQuery(undefined, {
    select: (data) => data.map(({ name }) => name),
  });

  const {
    searchParams: { category },
    setSearchParams,
  } = useSearchParams();

  const options = categories ?? [];

  const onValueChange = (category: string) => setSearchParams({ category });
  const value = categories?.includes(category) ? category : undefined;

  return (
    <Select
      options={options}
      onValueChange={onValueChange}
      value={value}
      label="카테고리"
      placeholder="전체"
    />
  );
};

export default PostSelect;
