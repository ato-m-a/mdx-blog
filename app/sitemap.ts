import type { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  return [
    {
      url: 'https://ato-m-a.me',
      lastModified: new Date(),
      priority: 1,
    },
  ];
};

export default sitemap;
