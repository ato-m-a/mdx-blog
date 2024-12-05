import { protectedProcedure } from '@/server/trpc';
import { deletePostRequestSchema } from '@/schema/post/request.schema';
import { NotFoundException } from '@/server/trpc/lib/exceptions';

export const deletePostProcedure = protectedProcedure
  .input(deletePostRequestSchema)
  .mutation(async ({ ctx: { prisma }, input: { id } }) => {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException('포스트가 존재하지 않습니다.');
    }

    return await prisma.$transaction(async (tx) => {
      await tx.post.delete({ where: { id } });
      await tx.tag.deleteMany({
        where: {
          posts: {
            none: {},
          },
        },
      });
    });
  });
