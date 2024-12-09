import t from '@/server/trpc/trpc';

const noCacheMiddleware = t.middleware(async ({ ctx: { resHeaders }, next }) => {
  resHeaders?.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  resHeaders?.set('Pragma', 'no-cache');
  resHeaders?.set('Expires', '0');
  return next();
});

export default noCacheMiddleware;
