import { router, publicProcedure, protectedProcedure } from '@/server/trpc';
import { TRPCError } from '@trpc/server';
import { nanoid } from 'nanoid';
import { HEADERS_SESSION_KEY, REDIS_SESSION_KEY } from '@/common/utils/session';
import { addHours } from 'date-fns';
import loginRequestSchema from '@/schema/login/login-request.schema';
import bcrypt from 'bcrypt';

const authRouter = router({
  login: publicProcedure
    .input(loginRequestSchema)
    .mutation(async ({ input: { password }, ctx: { prisma, redisClient } }) => {
      const storedAuth = await prisma.auth.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          deletedAt: null,
        },
      });

      if (!storedAuth) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const isValid = await bcrypt.compare(password, storedAuth.password);

      if (!isValid) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const sessionId = nanoid();

      await redisClient.set(REDIS_SESSION_KEY(sessionId), addHours(new Date(), 1).toISOString(), {
        EX: 3600,
      });

      return sessionId;
    }),
  logout: protectedProcedure.mutation(async ({ ctx: { req, redisClient } }) => {
    const sessionId = req?.headers.get(HEADERS_SESSION_KEY);

    if (sessionId) await redisClient.del(REDIS_SESSION_KEY(sessionId));

    return true;
  }),
  checkPermission: publicProcedure.query(async ({ ctx: { req, redisClient } }) => {
    const sessionId = req?.headers.get(HEADERS_SESSION_KEY);

    if (!sessionId) return false;

    const storedSession = await redisClient.get(REDIS_SESSION_KEY(sessionId));

    return Boolean(storedSession);
  }),
});

export default authRouter;
