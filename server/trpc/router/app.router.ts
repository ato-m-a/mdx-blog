import { router } from '@/server/trpc';

/** routers */
import experienceRouter from './experience.router';
import postRouter from './post.router';
import authRouter from './auth.router';

const appRouter = router({
  experience: experienceRouter,
  post: postRouter,
  auth: authRouter,
});

export default appRouter;
