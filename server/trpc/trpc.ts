import type { Context } from './context';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export default t;
