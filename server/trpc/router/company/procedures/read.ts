import { publicProcedure } from '@/server/trpc';
import { companySchema } from '@/schema/company/base.schema';
import { getCareerRequestSchema } from '@/schema/company/request.schema';
import { getCareerResponseSchema } from '@/schema/company/response.schema';
import { sortByExperience } from '@/common/utils/sort';
import noCacheMiddleware from '@/server/trpc/middleware/no-cache.middleware';

export const getCompanyProcedure = publicProcedure
  .input(companySchema.pick({ id: true }))
  .output(companySchema.nullable())
  .query(async ({ ctx: { prisma }, input: { id } }) => {
    return await prisma.company.findUnique({ where: { id } });
  });

export const getManyCompaniesProcedure = publicProcedure
  .output(companySchema.array())
  .query(async ({ ctx: { prisma } }) => {
    return await prisma.company.findMany();
  });

export const getCareerProcedure = publicProcedure
  .use(noCacheMiddleware)
  .input(getCareerRequestSchema)
  .output(getCareerResponseSchema.nullable())
  .query(async ({ ctx: { prisma }, input: { id } }) => {
    return await prisma.company.findUnique({ where: { id }, include: { experiences: true } });
  });

export const getCareersProcedure = publicProcedure
  .output(getCareerResponseSchema.array())
  .query(async ({ ctx: { prisma } }) => {
    const response = await prisma.company.findMany({
      include: {
        experiences: true,
      },
    });

    return response.sort(sortByExperience);
  });
