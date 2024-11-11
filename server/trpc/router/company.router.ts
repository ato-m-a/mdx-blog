import { router, publicProcedure } from '@/server/trpc';
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
});

export default companyRouter;
