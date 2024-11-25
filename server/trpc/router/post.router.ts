import type { Category } from '@prisma/client';
import { router, publicProcedure, protectedProcedure } from '@/server/trpc';
import { BadRequestException } from '@/server/trpc/lib/exceptions';
import pagedResponseSchema from '@/schema/common/paged-response.schema';
import getCountsByTagSchema from '@/schema/post/getCountsByTag.schema';
import postRequestSchema from '@/schema/post/post-request.schema';
import postResponseSchema from '@/schema/post/post-response.schema';
import createPostSchema from '@/schema/post/create-post.schema';

const postRouter = router({
  getCountsByTag: publicProcedure
    .output(getCountsByTagSchema)
    .query(async ({ ctx: { prisma } }) => {
      const [totalCount, tags] = await Promise.all([
        prisma.post.count(),
        prisma.tag.findMany({
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            _count: {
              select: {
                posts: true,
              },
            },
          },
        }),
      ]);

      return {
        totalCount,
        tags: tags.map(({ _count, ...tag }) => ({ ...tag, postCount: _count.posts })),
      };
    }),
  getMany: publicProcedure
    .input(postRequestSchema.optional())
    .output(pagedResponseSchema(postResponseSchema))
    .query(async ({ ctx: { prisma }, input }) => {
      const { cursor, take = 10, category, keyword, tag } = input ?? {};

      let categoryExists: Category | null = null;

      if (category) {
        categoryExists = await prisma.category.findUnique({
          where: {
            name: category,
          },
        });
      }

      const where = {
        ...(categoryExists ? { category: { name: category } } : {}),
        ...(keyword ? { title: { contains: keyword } } : {}),
        ...(tag ? { tags: { some: { name: tag } } } : {}),
      };

      const posts = await prisma.post.findMany({
        take: take + 1,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
        },
        where,
      });

      let nextCursor: number | undefined = undefined;
      if (posts.length > take) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }

      return { data: posts, nextCursor };
    }),
  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx: { prisma }, input: { tag, category, ...postInput } }) => {
      return await prisma.$transaction(async (tx) => {
        const categoryExists = await tx.category.findUnique({
          where: {
            name: category,
          },
        });

        if (!categoryExists) {
          throw new BadRequestException('카테고리가 존재하지 않습니다.');
        }

        let tagData = undefined;
        if (tag) {
          let tagExists = await tx.tag.findUnique({
            where: {
              name: tag,
            },
          });

          if (!tagExists) {
            tagExists = await tx.tag.create({
              data: {
                name: tag,
              },
            });
          }

          tagData = {
            connect: { id: tagExists.id },
          };
        }

        const post = await tx.post.create({
          data: {
            ...postInput,
            category: { connect: { id: categoryExists.id } },
            ...(tagData ? { tags: tagData } : {}),
          },
        });

        return post;
      });
    }),
});

export default postRouter;
