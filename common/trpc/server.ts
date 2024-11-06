import { createServerSideHelpers } from '@trpc/react-query/server';
import { createCallerFactory } from '@/server/trpc';
import appRouter from '@/server/trpc/router/app.router';
import createContext from '@/server/trpc/context';
import superjson from 'superjson';

const trpc = createCallerFactory(appRouter)(createContext());

export const createHelpers = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: createContext(),
    transformer: superjson,
  });

export default trpc;
