import t from './trpc';

/** middleware */
import sessionMiddleware from './middleware/session.middleware';

export const createCallerFactory = t.createCallerFactory;
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(sessionMiddleware);
