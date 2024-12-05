import { protectedProcedure } from '@/server/trpc';
import { setSessionCookie } from '@/common/utils/cookie';

export const extendSessionProcedure = protectedProcedure.mutation(
  async ({ ctx: { session, resHeaders } }) => {
    const sessionId = await session.extend();
    setSessionCookie({ sessionId, resHeaders });
  },
);
