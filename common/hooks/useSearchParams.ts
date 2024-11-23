'use client';

import type {
  SearchParamsRecord,
  SearchParamsContextType,
} from '@/common/context/searchParams/types';
import { useContext } from 'react';
import SearchParamsContext from '@/common/context/searchParams';

type UseSearchParamsReturns<T extends object = SearchParamsRecord> = {
  searchParams: T;
} & Omit<SearchParamsContextType, 'searchParams'>;
type SearchParamsSerializer<T extends object> = (params: SearchParamsRecord) => T;

function useSearchParams(): UseSearchParamsReturns;
function useSearchParams<T extends object>(
  serializer: SearchParamsSerializer<T>,
): UseSearchParamsReturns<T>;
function useSearchParams<T extends object>(serializer?: SearchParamsSerializer<T>) {
  const context = useContext(SearchParamsContext);

  if (!context) {
    throw new Error('useSearchParams must be used within a <SearchParamsProvider />');
  }

  const { searchParams, ...restOfContext } = context;

  return {
    searchParams: serializer ? serializer(searchParams) : searchParams,
    ...restOfContext,
  };
}

export default useSearchParams;
