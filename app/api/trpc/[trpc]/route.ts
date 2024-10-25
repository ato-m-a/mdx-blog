import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import appRouter from '@/server/trpc/router/app.router';
import createContext from '@/server/trpc/context';

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    createContext,
    router: appRouter,
  });
};

export { handler as GET, handler as POST };
