'use client';

import type { FC, ReactNode } from 'react';
import trpc from 'trpc-client';

type ProtectedChildrenProps = {
  state: boolean;
  refetch: () => void;
};
type ChildrenType = FC<ProtectedChildrenProps> | ReactNode;
type ProtectedProps = {
  children: ChildrenType;
  fallback?: ChildrenType;
};

const Protected: FC<ProtectedProps> = ({ children, fallback }) => {
  const { data: state, refetch } = trpc.auth.checkPermission.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });

  if (state === undefined) return null;

  if (state) return typeof children === 'function' ? children({ state, refetch }) : children;
  return typeof fallback === 'function' ? fallback({ state, refetch }) : fallback;
};

export default Protected;
