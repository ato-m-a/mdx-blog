import { protectedProcedure } from '@/server/trpc';
import { createPostRequestSchema } from '@/schema/post/request.schema';
import { postSchema } from '@/schema/post/base.schema';
import { BadRequestException, ConflictException } from '@/server/trpc/lib/exceptions';

export const createPostProcedure = protectedProcedure
  .input(createPostRequestSchema)
  .output(postSchema.omit({ tags: true, category: true }).passthrough())
  .mutation(async ({ ctx: { prisma }, input: { tags, category, ...postInput } }) => {
    return await prisma.$transaction(async (tx) => {
      const { title } = postInput;

      const categoryExists = await tx.category.findUnique({
        where: {
          name: category,
        },
      });

      if (!categoryExists) {
        throw new BadRequestException('카테고리가 존재하지 않습니다.');
      }

      const slug = title
        .replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      const isDuplicated = await tx.post.findFirst({
        where: { title, slug },
      });

      if (isDuplicated) {
        throw new ConflictException('이미 존재하는 포스트입니다.');
      }

      const post = await tx.post.create({
        data: {
          slug,
          ...postInput,
          category: { connect: { id: categoryExists.id } },
          ...(tags && tags.length
            ? {
                tags: {
                  connectOrCreate: tags.map((tag) => ({
                    where: { name: tag },
                    create: { name: tag },
                  })),
                },
              }
            : {}),
        },
      });

      return post;
    });
  });
