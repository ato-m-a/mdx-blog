import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/company', '/experience'],
    },
    sitemap: 'https://ato-m-a.me/sitemap.xml',
  };
}
