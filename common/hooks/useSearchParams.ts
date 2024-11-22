'use client';

import type { SearchParamsRecord } from '@/common/context/searchParams/types';
import { useContext } from 'react';
import SearchParamsContext from '@/common/context/searchParams';

type SearchParamsSerializer<T> = (params: SearchParamsRecord) => T;

const useSearchParams = <T = SearchParamsRecord>(serializer?: SearchParamsSerializer<T>) => {
  const context = useContext(SearchParamsContext);

  if (!context) {
    throw new Error('useSearchParams must be used within a <SearchParamsProvider />');
  }

  const { searchParams, ...restOfContext } = context;

  return {
    searchParams: serializer ? serializer(searchParams) : searchParams,
    ...restOfContext,
  } as const;
};

export default useSearchParams;
