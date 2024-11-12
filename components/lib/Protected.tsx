'use client';

import type { ComponentType, FC } from 'react';
import trpc from '@trpc.client';

type ProtectedProps<P extends object> = P & {
  sessionValid: boolean;
  refetchSessionValid: () => void;
};

type ProtectedArg<P extends object> = ComponentType<ProtectedProps<P>>;
type ProtectedReturns<P extends object> = FC<P>;

const Protected = <P extends object>(Component: ProtectedArg<P>): ProtectedReturns<P> => {
  const ProtectedComponent: FC<P> = (props: P) => {
    const { data: sessionValid, refetch: refetchSessionValid } =
      trpc.auth.checkPermission.useQuery();

    if (!sessionValid) return null;

    return (
      <Component {...props} sessionValid={sessionValid} refetchSessionValid={refetchSessionValid} />
    );
  };

  return ProtectedComponent;
};

export default Protected;
