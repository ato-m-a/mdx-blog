'use client';

import { useRef, type FC, type PropsWithChildren } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { httpBatchLink } from '@trpc/client';
import trpc from '@trpc.client';
import superjson from 'superjson';

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const trpcClientRef = useRef(
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
          headers: () => ({
            'x-session-id': sessionStorage.getItem('sessionId') ?? undefined,
          }),
        }),
      ],
    }),
  );

  const queryClientRef = useRef<QueryClient>(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60,
        },
      },
    }),
  );

  return (
    <trpc.Provider client={trpcClientRef.current} queryClient={queryClientRef.current}>
      <QueryClientProvider client={queryClientRef.current}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default QueryProvider;
