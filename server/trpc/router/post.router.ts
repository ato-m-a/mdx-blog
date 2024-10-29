import t from '@/server/trpc';
import pagedRequestSchema from '@/schema/common/paged-request.schema';
import pagedResponseSchema from '@/schema/common/paged-response.schema';
import postSchema from '@/schema/post.schema';

const postRouter = t.router({
  getMany: t.procedure
    .input(pagedRequestSchema)
    .output(pagedResponseSchema(postSchema))
    .query(async ({ ctx: { prisma }, input: { page, limit } }) => {
      const [data, totalCount] = await Promise.all([
        prisma.post.findMany({
          skip: (page - 1) * limit,
          take: limit,
          include: {
            categories: true,
          },
        }),
        prisma.post.count(),
      ]);

      return {
        totalCount,
        totalPage: Math.ceil(totalCount / limit),
        data,
      };
    }),
});

export default postRouter;
