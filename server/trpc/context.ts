import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { prisma } from '@/common/utils';
import redisClient from '@/common/utils/redis';

export type Context = ReturnType<typeof createContext>;

const createContext = (opts?: FetchCreateContextFnOptions) => {
  return { ...(opts ?? {}), prisma, redisClient } as const;
};

export default createContext;
