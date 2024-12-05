import { publicProcedure } from '@/server/trpc';
import { categorySchema } from '@/schema/category/base.schema';

export const getManyCategoriesProcedure = publicProcedure
  .output(categorySchema.array())
  .query(async ({ ctx: { prisma } }) => await prisma.category.findMany());
