import { router, publicProcedure, protectedProcedure } from '@/server/trpc';
import { UnauthorizedException } from '@/server/trpc/lib/exceptions';
import noCacheMiddleware from '@/server/trpc/middleware/no-cache.middleware';
import loginRequestSchema from '@/schema/login/login-request.schema';
import bcrypt from 'bcrypt';

const authRouter = router({
  login: publicProcedure
    .input(loginRequestSchema)
    .mutation(async ({ input: { password }, ctx: { prisma, session } }) => {
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

      return await session.create();
    }),
  logout: protectedProcedure.mutation(async ({ ctx: { session } }) => {
    await session.destroy();
  }),
  checkPermission: publicProcedure
    .use(noCacheMiddleware)
    .query(async ({ ctx: { session } }) => await session.check()),
  getExpiry: protectedProcedure
    .use(noCacheMiddleware)
    .query(async ({ ctx: { session } }) => await session.getExpiry()),
  extendSession: protectedProcedure.mutation(
    async ({ ctx: { session } }) => await session.extend(),
  ),
});

export default authRouter;
