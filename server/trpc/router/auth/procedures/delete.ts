import { protectedProcedure } from '@/server/trpc';
import { setSessionCookie } from '@/common/utils/cookie';

export const logoutProcedure = protectedProcedure.mutation(
  async ({ ctx: { session, resHeaders } }) => {
    await session.destroy();
    setSessionCookie({ sessionId: '', maxAge: 0, resHeaders });
  },
);
