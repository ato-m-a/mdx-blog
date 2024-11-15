import { router, publicProcedure, protectedProcedure } from '@/server/trpc';
import { UnauthorizedException } from '@/server/trpc/lib/exceptions';
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
  checkPermission: publicProcedure.query(async ({ ctx: { resHeaders, session } }) => {
    resHeaders?.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return await session.check();
  }),
  extendSession: protectedProcedure.mutation(
    async ({ ctx: { session } }) => await session.create(),
  ),
});

export default authRouter;
