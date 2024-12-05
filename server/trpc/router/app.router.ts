import { router } from '@/server/trpc';

/** routers */
import experienceRouter from './experience';
import postRouter from './post';
import authRouter from './auth';
import companyRouter from './company';
import categoryRouter from './category';

const appRouter = router({
  experience: experienceRouter,
  post: postRouter,
  auth: authRouter,
  company: companyRouter,
  category: categoryRouter,
});

export default appRouter;
