import type { Category } from '@prisma/client';
import { router, publicProcedure, protectedProcedure } from '@/server/trpc';
import { BadRequestException, ConflictException } from '@/server/trpc/lib/exceptions';
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

      const filteredTags = tags.flatMap((tag) =>
        tag._count.posts > 0 ? [{ ...tag, postCount: tag._count.posts }] : [],
      );

      return {
        totalCount,
        tags: filteredTags,
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
        const { title } = postInput;

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
            ...(tagData ? { tags: tagData } : {}),
          },
        });

        return post;
      });
    }),
});

export default postRouter;
