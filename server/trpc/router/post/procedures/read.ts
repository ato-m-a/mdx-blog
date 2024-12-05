import type { Category, Prisma } from '@prisma/client';
import { publicProcedure } from '@/server/trpc';
import { getPostRequestSchema, getPostsRequestSchema } from '@/schema/post/request.schema';
import {
  getPostResponseSchema,
  getPostsResponseSchema,
  getCountsByTagResponseSchema,
} from '@/schema/post/response.schema';
import { BadRequestException } from '@/server/trpc/lib/exceptions';

export const getPostProcedure = publicProcedure
  .input(getPostRequestSchema)
  .output(getPostResponseSchema)
  .query(async ({ ctx: { prisma }, input: { slug, id } }) => {
    if (!slug && !id) throw new BadRequestException('slug 또는 id를 입력해주세요.');

    return await prisma.post.findUnique({
      where: { ...(slug ? { slug } : { id }) },
      include: { category: true, tags: true },
    });
  });

export const getManyPostsProcedure = publicProcedure
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
  });

export const getCountsByTagProcedure = publicProcedure
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
  });
