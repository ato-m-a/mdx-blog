import { router, publicProcedure } from '@/server/trpc';
import { categorySchema } from '@/schema/category/base.schema';

const categoryRouter = router({
  getMany: publicProcedure
    .output(categorySchema.array())
    .query(async ({ ctx: { prisma } }) => await prisma.category.findMany()),
});

export default categoryRouter;
