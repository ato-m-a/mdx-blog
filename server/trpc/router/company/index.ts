import { router } from '@/server/trpc';
import {
  getCompanyProcedure,
  getManyCompaniesProcedure,
  getCareerProcedure,
  getCareersProcedure,
} from './procedures/read';
import { createCareerProcedure } from './procedures/create';
import { updateCompanyProcedure, updateCareerProcedure } from './procedures/update';
import { deleteCareerProcedure } from './procedures/delete';

const companyRouter = router({
  get: getCompanyProcedure,
  getMany: getManyCompaniesProcedure,
  getCareer: getCareerProcedure,
  getCareers: getCareersProcedure,
  createCareer: createCareerProcedure,
  deleteCareer: deleteCareerProcedure,
  update: updateCompanyProcedure,
  updateCareer: updateCareerProcedure,
});

export default companyRouter;
