'use client';

import type { MutationOptions } from './types';
import { unstable_batchedUpdates } from 'react-dom';
import useInvalidateQueries from './lib/useInvalidateQueries';
import toast from '@/common/utils/toast';
import trpc from 'trpc-client';

const useLogout = (options?: MutationOptions) => {
  const { onSuccess, onError } = options ?? {};
  const invalidateSessionQueries = useInvalidateQueries();

  const { mutate } = trpc.auth.logout.useMutation({
    onSuccess: () =>
      unstable_batchedUpdates(() => {
        if (onSuccess) onSuccess();
        invalidateSessionQueries();
        toast.logout_success();
      }),
    onError: () => {
      if (onError) onError();
      invalidateSessionQueries();
      toast.logout_failed();
    },
  });

  return mutate;
};

export default useLogout;
