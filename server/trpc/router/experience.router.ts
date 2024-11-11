import { router, publicProcedure } from '@/server/trpc';
import experienceSchema from '@/schema/experience.schema';
import companySchema from '@/schema/company/company.schema';

const experienceRouter = router({
  getMany: publicProcedure.output(experienceSchema.array()).query(async ({ ctx: { prisma } }) => {
    return await prisma.experience.findMany({
      orderBy: [
        {
          endDate: {
            sort: 'desc',
            nulls: 'first',
          },
        },
        {
          startDate: 'desc',
        },
      ],
      include: {
        company: true,
      },
    });
  }),
  getCurrentJob: publicProcedure
    .output(companySchema.nullable())
    .query(async ({ ctx: { prisma } }) => {
      const latestExperience = await prisma.experience.findFirst({
        where: {
          endDate: null,
        },
        select: {
          company: true,
        },
      });

      return latestExperience?.company ?? null;
    }),
});

export default experienceRouter;
