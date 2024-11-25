'use client';

import type { FC } from 'react';
import useCategories from '@/common/hooks/category/useCategories';
import useSearchParams from '@/common/hooks/useSearchParams';
import Select from '@/components/Select';

const PostSelect: FC = () => {
  const categories = useCategories();

  const {
    searchParams: { category },
    setSearchParams,
  } = useSearchParams();

  const options = categories ?? [];

  const onValueChange = (category: string) => setSearchParams({ category });
  const value = category && categories?.includes(category) ? category : undefined;

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
