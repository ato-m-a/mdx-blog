import { router, publicProcedure, protectedProcedure } from '@/server/trpc';
import companySchema from '@/schema/company/company.schema';
import careerSchema from '@/schema/company/career.schema';

const companyRouter = router({
  get: publicProcedure
    .input(companySchema.pick({ id: true }))
    .output(companySchema.nullable())
    .query(async ({ ctx: { prisma }, input: { id } }) => {
      return await prisma.company.findUnique({ where: { id } });
    }),
  getCareers: publicProcedure.output(careerSchema.array()).query(async ({ ctx: { prisma } }) => {
    return await prisma.company.findMany({
      include: {
        experiences: true,
      },
    });
  }),
  update: protectedProcedure
    .input(companySchema.omit({ createdAt: true, updatedAt: true }))
    .output(companySchema)
    .mutation(async ({ ctx: { prisma }, input: { id, ...company } }) => {
      return await prisma.company.update({ where: { id }, data: company });
    }),
});

export default companyRouter;
