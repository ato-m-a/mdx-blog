import t from '@/server/trpc';

/** routers */
import experienceRouter from './experience.router';

const appRouter = t.router({
  experience: experienceRouter,
});

export default appRouter;
