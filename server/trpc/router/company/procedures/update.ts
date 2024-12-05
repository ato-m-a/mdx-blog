import { protectedProcedure } from '@/server/trpc';
import { companySchema } from '@/schema/company/base.schema';

export const updateCompanyProcedure = protectedProcedure
  .input(companySchema.omit({ createdAt: true, updatedAt: true }))
  .output(companySchema)
  .mutation(async ({ ctx: { prisma }, input: { id, ...company } }) => {
    return await prisma.company.update({ where: { id }, data: company });
  });
