'use client';

import type { MutationOptions } from './types';
import { removeSessionId } from './lib/sessionStorage';
import { unstable_batchedUpdates } from 'react-dom';
import useInvalidateQueries from './lib/useInvalidateQueries';
import trpc from 'trpc-client';

const useLogout = ({ onSuccess, onError }: MutationOptions) => {
  const invalidateSessionQueries = useInvalidateQueries();

  const { mutate } = trpc.auth.logout.useMutation({
    onSuccess: () =>
      unstable_batchedUpdates(() => {
        if (onSuccess) onSuccess();
        removeSessionId();
        invalidateSessionQueries();
      }),
    onError: () => {
      if (onError) onError();
      removeSessionId();
      invalidateSessionQueries();
    },
  });

  return mutate;
};

export default useLogout;
