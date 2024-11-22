import { router } from '@/server/trpc';

/** routers */
import experienceRouter from './experience.router';
import postRouter from './post.router';
import authRouter from './auth.router';
import companyRouter from './company.router';
import categoryRouter from './category.router';

const appRouter = router({
  experience: experienceRouter,
  post: postRouter,
  auth: authRouter,
  company: companyRouter,
  category: categoryRouter,
});

export default appRouter;
