'use client';

import type { MutationOptions } from './types';
import { unstable_batchedUpdates } from 'react-dom';
import useInvalidateQueries from './lib/useInvalidateQueries';
import trpc from 'trpc-client';

const useExtendSession = ({ onSuccess, onError }: MutationOptions) => {
  const invalidateSessionQueries = useInvalidateQueries();

  const { mutate } = trpc.auth.extendSession.useMutation({
    onSuccess: () =>
      unstable_batchedUpdates(() => {
        if (onSuccess) onSuccess();
        invalidateSessionQueries();
      }),
    onError: () => {
      if (onError) onError();
    },
  });

  return mutate;
};

export default useExtendSession;
