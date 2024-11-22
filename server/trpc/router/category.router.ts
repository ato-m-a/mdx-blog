import { router, publicProcedure } from '@/server/trpc';
import categoryResponseSchema from '@/schema/category/category-response.schema';

const categoryRouter = router({
  getMany: publicProcedure
    .output(categoryResponseSchema.array())
    .query(async ({ ctx: { prisma } }) => await prisma.category.findMany()),
});

export default categoryRouter;
