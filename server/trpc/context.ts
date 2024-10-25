import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import prisma from '@/common/prisma';

export type Context = ReturnType<typeof createContext>;

const createContext = (opts?: FetchCreateContextFnOptions) => {
  return { ...(opts ?? {}), prisma } as const;
};

export default createContext;
