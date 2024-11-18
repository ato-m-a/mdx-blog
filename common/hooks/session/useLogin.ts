'use client';

import type { MutationOptions } from './types';
import { setSessionId } from './lib/sessionStorage';
import { unstable_batchedUpdates } from 'react-dom';
import useInvalidateQueries from './lib/useInvalidateQueries';
import trpc from 'trpc-client';

const useLogin = ({ onSuccess, onError }: MutationOptions) => {
  const invalidateSessionQueries = useInvalidateQueries();

  const { mutate } = trpc.auth.login.useMutation({
    onSuccess: (sessionId) =>
      unstable_batchedUpdates(() => {
        if (onSuccess) onSuccess();
        setSessionId(sessionId);
        invalidateSessionQueries();
      }),
    onError: () => {
      if (onError) onError();
    },
  });

  return mutate;
};

export default useLogin;
