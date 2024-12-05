import { router } from '@/server/trpc';
import { getManyCategoriesProcedure } from './procedures/read';

const categoryRouter = router({
  getMany: getManyCategoriesProcedure,
});

export default categoryRouter;
