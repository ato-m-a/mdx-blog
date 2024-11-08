import { router, publicProcedure } from '@/server/trpc';
import companySchema from '@/schema/company.schema';

const companyRouter = router({
  get: publicProcedure
    .input(companySchema.pick({ id: true }))
    .query(async ({ ctx: { prisma }, input: { id } }) => {
      return await prisma.company.findUnique({ where: { id } });
    }),
});

export default companyRouter;
