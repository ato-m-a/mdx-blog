import { router, publicProcedure, protectedProcedure } from '@/server/trpc';
import { UnauthorizedException } from '@/server/trpc/lib/exceptions';
import { setSessionCookie } from '@/common/utils/cookie';
import { loginRequestSchema, checkPermissonRequestSchema } from '@/schema/auth/request.schema';
import noCacheMiddleware from '@/server/trpc/middleware/no-cache.middleware';
import bcrypt from 'bcrypt';

const authRouter = router({
  login: publicProcedure
    .input(loginRequestSchema)
    .mutation(async ({ input: { password }, ctx: { prisma, session, resHeaders } }) => {
      const storedAuth = await prisma.auth.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          deletedAt: null,
        },
      });
      if (!storedAuth) throw new UnauthorizedException();

      const isValid = await bcrypt.compare(password, storedAuth.password);
      if (!isValid) throw new UnauthorizedException();

      const sessionId = await session.create();
      setSessionCookie({ sessionId, resHeaders });
    }),
  logout: protectedProcedure.mutation(async ({ ctx: { session, resHeaders } }) => {
    await session.destroy();
    setSessionCookie({ sessionId: '', maxAge: 0, resHeaders });
  }),
  checkPermission: publicProcedure
    .use(noCacheMiddleware)
    .input(checkPermissonRequestSchema.optional())
    .query(async ({ ctx: { session }, input }) => {
      const { id, throwOnError = false } = input ?? {};

      const sessionValid = await session.check(id);
      if (!sessionValid && throwOnError) throw new UnauthorizedException();

      return sessionValid;
    }),
  getExpiry: protectedProcedure
    .use(noCacheMiddleware)
    .query(async ({ ctx: { session } }) => await session.getExpiry()),
  extendSession: protectedProcedure.mutation(async ({ ctx: { session, resHeaders } }) => {
    const sessionId = await session.extend();
    setSessionCookie({ sessionId, resHeaders });
  }),
});

export default authRouter;
