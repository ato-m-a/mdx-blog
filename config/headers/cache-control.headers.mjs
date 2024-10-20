const cacheControlHeaders = [
  {
    source: '/api/(.*)',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=60, stale-while-revalidate=30, stale-if-error=60'
      },
    ],
  },
];

export default cacheControlHeaders;
