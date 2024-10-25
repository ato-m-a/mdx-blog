import { createServerSideHelpers } from '@trpc/react-query/server';
import t from '@/server/trpc';
import appRouter from '@/server/trpc/router/app.router';
import createContext from '@/server/trpc/context';
import superjson from 'superjson';

const createCaller = t.createCallerFactory(appRouter);
const trpc = createCaller(createContext());

export const createHelpers = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: createContext(),
    transformer: superjson,
  });

export default trpc;
