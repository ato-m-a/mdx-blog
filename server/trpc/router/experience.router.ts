import t from '@/server/trpc';
import experienceSchema from '@/schema/experience.schema';
import companySchema from '@/schema/company.schema';

const experienceRouter = t.router({
  getMany: t.procedure.output(experienceSchema.array()).query(async ({ ctx: { prisma } }) => {
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
  getCurrentJob: t.procedure.output(companySchema.nullable()).query(async ({ ctx: { prisma } }) => {
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
