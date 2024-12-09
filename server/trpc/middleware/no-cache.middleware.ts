import t from '@/server/trpc/trpc';

const noCacheMiddleware = t.middleware(async ({ ctx: { resHeaders }, next }) => {
  resHeaders?.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  return next();
});

export default noCacheMiddleware;
