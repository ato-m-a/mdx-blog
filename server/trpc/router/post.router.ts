import type { Category } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { router, publicProcedure, protectedProcedure } from '@/server/trpc';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@/server/trpc/lib/exceptions';
import {
  getPostRequestSchema,
  getPostsRequestSchema,
  createPostRequestSchema,
  deletePostRequestSchema,
} from '@/schema/post/request.schema';
import {
  getPostResponseSchema,
  getCountsByTagResponseSchema,
  getPostsResponseSchema,
} from '@/schema/post/response.schema';
import { postSchema } from '@/schema/post/base.schema';

const postRouter = router({
  getCountsByTag: publicProcedure
    .output(getCountsByTagResponseSchema)
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
  get: publicProcedure
    .input(getPostRequestSchema)
    .output(getPostResponseSchema)
    .query(async ({ ctx: { prisma }, input: { slug } }) => {
      return await prisma.post.findUnique({
        where: { slug },
        include: { category: true, tags: true },
      });
    }),
  getMany: publicProcedure
    .input(getPostsRequestSchema.optional())
    .output(getPostsResponseSchema)
    .query(async ({ ctx: { prisma }, input }) => {
      const { cursor, take = 10, category, keyword, tag } = input ?? {};

      let categoryExists: Category | null = null;

      if (category) {
        categoryExists = await prisma.category.findUnique({
          where: { name: category },
        });
      }

      const where: Prisma.PostWhereInput = {
        ...(categoryExists ? { category: { name: category } } : {}),
        ...(keyword ? { title: { contains: keyword, mode: 'insensitive' } } : {}),
        ...(tag ? { tags: { some: { name: tag } } } : {}),
      };

      const posts = await prisma.post.findMany({
        take: take + 1,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          tags: true,
        },
        where: Object.keys(where).length > 0 ? where : undefined,
      });

      let nextCursor: number | undefined = undefined;
      if (posts.length > take) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }

      return { data: posts, nextCursor };
    }),
  create: protectedProcedure
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
    }),
  delete: protectedProcedure
    .input(deletePostRequestSchema)
    .mutation(async ({ ctx: { prisma }, input: { id } }) => {
      const post = await prisma.post.findUnique({ where: { id } });

      if (!post) {
        throw new NotFoundException('포스트가 존재하지 않습니다.');
      }

      return await prisma.$transaction(async (tx) => {
        await tx.tag.deleteMany({ where: { posts: { some: { id } } } });
        await tx.post.delete({ where: { id } });
      });
    }),
});

export default postRouter;
