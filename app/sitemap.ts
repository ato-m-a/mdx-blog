import type { MetadataRoute } from 'next';
import { prisma } from '@/common/utils';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await prisma.post.findMany();

  return [
    {
      url: 'https://ato-m-a.me',
      lastModified: new Date(),
      priority: 0.5,
    },
    ...posts.map(({ slug, createdAt, updatedAt }) => ({
      url: `https://ato-m-a.me/posts/${slug}`,
      lastModified: updatedAt ?? createdAt,
      priority: 1,
    })),
  ];
};

export default sitemap;
