import type { UseQueryResult } from '@tanstack/react-query';

type Options = Pick<UseQueryResult, 'status' | 'isFetching' | 'isLoading' | 'fetchStatus'>;

const getQueryState = ({ status, isFetching, isLoading, fetchStatus }: Options) => ({
  isSuccess: status === 'success',
  isInitialLoading: isFetching && isLoading,
  isRefetching: isFetching && !isLoading,
  isPaused: fetchStatus === 'paused',
  status,
  isFetching,
  isLoading,
  fetchStatus,
});

export default getQueryState;
