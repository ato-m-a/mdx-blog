import { publicProcedure } from '@/server/trpc';
import { UnauthorizedException } from '@/server/trpc/lib/exceptions';
import { setSessionCookie } from '@/common/utils/cookie';
import { loginRequestSchema } from '@/schema/auth/request.schema';
import bcrypt from 'bcrypt';

export const loginProcedure = publicProcedure
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
  });
