import { publicProcedure } from '@/server/trpc';
import { companySchema } from '@/schema/company/base.schema';
import { getCareersResponseSchema } from '@/schema/company/response.schema';

export const getCompanyProcedure = publicProcedure
  .input(companySchema.pick({ id: true }))
  .output(companySchema.nullable())
  .query(async ({ ctx: { prisma }, input: { id } }) => {
    return await prisma.company.findUnique({ where: { id } });
  });

export const getCareersProcedure = publicProcedure
  .output(getCareersResponseSchema.array())
  .query(async ({ ctx: { prisma } }) => {
    return await prisma.company.findMany({
      include: {
        experiences: true,
      },
    });
  });
