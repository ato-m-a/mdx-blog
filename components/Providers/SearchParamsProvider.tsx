'use client';

import type {
  SearchParamsRecord,
  DispatchSearchParamsProps,
  DispatchSearchParamsOptions,
} from '@/common/context/searchParams/types';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import SearchParamsContext from '@/common/context/searchParams';
import React from 'react';

const SearchParamsProviderCore: React.FC<React.PropsWithChildren> = ({ children }) => {
  const readonlyParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();

  const mergeParams = (current: URLSearchParams, next: SearchParamsRecord) => {
    for (const [key, value] of Object.entries(next)) {
      if (value && value !== '') current.set(key, value);
      else current.delete(key);
    }
    return current.toString();
  };

  const setSearchParams = (
    setter: DispatchSearchParamsProps,
    options?: DispatchSearchParamsOptions,
  ) =>
    startTransition(() => {
      const navigate = options?.replace ? router.replace : router.push;
      const currentParams = new URLSearchParams(readonlyParams);
      const nextParams =
        typeof setter === 'function' ? setter(Object.fromEntries(currentParams)) : setter;

      const searchParams = mergeParams(currentParams, nextParams);

      return navigate(`${pathname}?${searchParams}`);
    });

  const context = {
    searchParams: Object.fromEntries(readonlyParams),
    setSearchParams,
    isPending,
  } as const;

  return <SearchParamsContext.Provider value={context}>{children}</SearchParamsContext.Provider>;
};

const SearchParamsProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <React.Suspense>
    <SearchParamsProviderCore>{children}</SearchParamsProviderCore>
  </React.Suspense>
);

export default SearchParamsProvider;
