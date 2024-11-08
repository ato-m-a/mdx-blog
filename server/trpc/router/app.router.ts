import { router } from '@/server/trpc';

/** routers */
import experienceRouter from './experience.router';
import postRouter from './post.router';
import authRouter from './auth.router';
import companyRouter from './company.router';

const appRouter = router({
  experience: experienceRouter,
  post: postRouter,
  auth: authRouter,
  company: companyRouter,
});

export default appRouter;
