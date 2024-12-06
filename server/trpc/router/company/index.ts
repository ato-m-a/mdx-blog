import { router } from '@/server/trpc';
import {
  getCompanyProcedure,
  getManyCompaniesProcedure,
  getCareersProcedure,
} from './procedures/read';
import { updateCompanyProcedure } from './procedures/update';

const companyRouter = router({
  get: getCompanyProcedure,
  getMany: getManyCompaniesProcedure,
  getCareers: getCareersProcedure,
  update: updateCompanyProcedure,
});

export default companyRouter;
