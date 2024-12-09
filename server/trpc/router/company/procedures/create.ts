import { protectedProcedure } from '@/server/trpc';
import { createCareerRequestSchema } from '@/schema/company/request.schema';

export const createCareerProcedure = protectedProcedure
  .input(createCareerRequestSchema)
  .mutation(async ({ ctx: { prisma }, input: { experiences, ...company } }) => {
    return await prisma.company.create({
      data: {
        ...company,
        experiences: {
          createMany: {
            data: experiences,
          },
        },
      },
    });
  });
