'use client';

import trpc from 'trpc-client';

const useInvalidateQueries = () => {
  const utils = trpc.useUtils();

  return () => {
    utils.auth.checkPermission.invalidate();
    utils.auth.getExpiry.invalidate();
  };
};

export default useInvalidateQueries;
