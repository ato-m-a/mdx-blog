import { publicProcedure, protectedProcedure } from '@/server/trpc';
import { checkPermissonRequestSchema } from '@/schema/auth/request.schema';
import { UnauthorizedException } from '@/server/trpc/lib/exceptions';
import noCacheMiddleware from '@/server/trpc/middleware/no-cache.middleware';

export const checkPermissionProcedure = publicProcedure
  .use(noCacheMiddleware)
  .input(checkPermissonRequestSchema.optional())
  .query(async ({ ctx: { session }, input }) => {
    const { id, throwOnError = false } = input ?? {};

    const sessionValid = await session.check(id);
    if (!sessionValid && throwOnError) throw new UnauthorizedException();

    return sessionValid;
  });

export const getExpiryProcedure = protectedProcedure
  .use(noCacheMiddleware)
  .query(async ({ ctx: { session } }) => await session.getExpiry());
