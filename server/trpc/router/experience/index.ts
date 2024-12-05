import { router } from '@/server/trpc';
import { getManyExperiencesProcedure, getCurrentJobProcedure } from './procedures/read';

const experienceRouter = router({
  getMany: getManyExperiencesProcedure,
  getCurrentJob: getCurrentJobProcedure,
});

export default experienceRouter;
