import { parseISO, isAfter } from 'date-fns';
import { TRPCError } from '@trpc/server';
import { HEADERS_SESSION_KEY, REDIS_SESSION_KEY } from '@/common/utils/session';
import t from '@/server/trpc/trpc';
import redisClient from '@/common/utils/redis';

const sessionMiddleware = t.middleware(async ({ ctx, next }) => {
  const sessionId = ctx.req?.headers.get(HEADERS_SESSION_KEY);
  if (!sessionId) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const session = await redisClient.get(REDIS_SESSION_KEY(sessionId));
  if (!session) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const now = new Date();
  const expiresAt = parseISO(session);

  if (isAfter(now, expiresAt)) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return next();
});

export default sessionMiddleware;
