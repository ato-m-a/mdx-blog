import t from '@/server/trpc/trpc';

const sessionMiddleware = t.middleware(async ({ ctx: { session }, next }) => {
  await session.sync();
  return next();
});

export default sessionMiddleware;
