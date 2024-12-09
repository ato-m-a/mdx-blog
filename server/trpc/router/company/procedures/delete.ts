import { protectedProcedure } from '@/server/trpc';
import { deleteCareerRequestSchema } from '@/schema/company/request.schema';

export const deleteCareerProcedure = protectedProcedure
  .input(deleteCareerRequestSchema)
  .mutation(async ({ ctx: { prisma }, input: { id } }) => {
    await prisma.company.delete({ where: { id } });
  });
