import t from '@/server/trpc';

/** routers */
import experienceRouter from './experience.router';
import postRouter from './post.router';

const appRouter = t.router({
  experience: experienceRouter,
  post: postRouter,
});

export default appRouter;
