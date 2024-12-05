import { publicProcedure } from '@/server/trpc';
import { experienceSchema } from '@/schema/experience/base.schema';
import { companySchema } from '@/schema/company/base.schema';

export const getManyExperiencesProcedure = publicProcedure
  .output(experienceSchema.array())
  .query(async ({ ctx: { prisma } }) => {
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
  });

export const getCurrentJobProcedure = publicProcedure
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
  });
