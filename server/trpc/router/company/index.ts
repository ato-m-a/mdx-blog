import { router } from '@/server/trpc';
import { getCompanyProcedure, getCareersProcedure } from './procedures/read';
import { updateCompanyProcedure } from './procedures/update';

const companyRouter = router({
  get: getCompanyProcedure,
  getCareers: getCareersProcedure,
  update: updateCompanyProcedure,
});

export default companyRouter;
