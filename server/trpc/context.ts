import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { RedisStorage } from '@/server/trpc/lib/storage';
import { prisma } from '@/common/utils';
import Session from '@/server/trpc/lib/session';

export type Context = ReturnType<typeof createContext>;

const createContext = (opts?: FetchCreateContextFnOptions) => {
  const redisStorage = new RedisStorage();
  const session = new Session(redisStorage, opts?.req);

  return { ...(opts ?? {}), prisma, session } as const;
};

export default createContext;
