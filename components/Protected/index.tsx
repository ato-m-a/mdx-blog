'use client';

import { useEffect, type FC, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import trpc from 'trpc-client';
import getQueryState from '@/common/utils/getQueryState';

type ProtectedChildrenProps = {
  state: boolean;
  refetch: () => void;
};
type ChildrenType = FC<ProtectedChildrenProps> | ReactNode;
type ProtectedProps = {
  fallback?: ChildrenType;
} & (
  | {
      children: ChildrenType;
      replaceTo?: never;
    }
  | {
      children?: never;
      replaceTo: string;
    }
);

const Protected: FC<ProtectedProps> = ({ children, fallback, replaceTo }) => {
  const router = useRouter();

  const {
    data: state,
    refetch,
    ...status
  } = trpc.auth.checkPermission.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
  });

  const { isInitialLoading } = getQueryState(status);

  useEffect(() => {
    if (replaceTo && !state && !isInitialLoading) router.replace(replaceTo);
  }, [state, replaceTo, router, isInitialLoading]);

  if (replaceTo) return null;
  if (state === undefined) return null;

  if (state) return typeof children === 'function' ? children({ state, refetch }) : children;
  return typeof fallback === 'function' ? fallback({ state, refetch }) : fallback;
};

export default Protected;
