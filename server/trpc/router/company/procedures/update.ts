import { protectedProcedure } from '@/server/trpc';
import { companySchema } from '@/schema/company/base.schema';
import { updateCareerRequestSchema } from '@/schema/company/request.schema';

export const updateCompanyProcedure = protectedProcedure
  .input(companySchema.omit({ createdAt: true, updatedAt: true }))
  .output(companySchema)
  .mutation(async ({ ctx: { prisma }, input: { id, ...company } }) => {
    return await prisma.company.update({ where: { id }, data: company });
  });

export const updateCareerProcedure = protectedProcedure
  .input(updateCareerRequestSchema)
  .mutation(async ({ ctx: { prisma }, input: { id, experiences, ...company } }) => {
    return await prisma.company.update({
      where: { id },
      data: {
        ...company,
        experiences: {
          upsert: experiences.map((experience) => ({
            where: { id: experience.id },
            update: experience,
            create: experience,
          })),
        },
      },
    });
  });
