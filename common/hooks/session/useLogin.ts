'use client';

import type { MutationOptions } from './types';
import { unstable_batchedUpdates } from 'react-dom';
import useInvalidateQueries from './lib/useInvalidateQueries';
import trpc from 'trpc-client';

const useLogin = ({ onSuccess, onError }: MutationOptions) => {
  const invalidateSessionQueries = useInvalidateQueries();

  const { mutate } = trpc.auth.login.useMutation({
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

export default useLogin;
