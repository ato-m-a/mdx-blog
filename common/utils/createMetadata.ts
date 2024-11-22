import type { Metadata } from 'next';

export type RequestParams<T extends string> = Promise<{ [key in T]: string }>;

type MetadataProps = {
  pathname: string;
  description: string;
  title: string;
  ogImage?: string;
};

const createMetadata = ({
  pathname,
  description,
  title,
  ogImage = '/images/og-image.webp',
}: MetadataProps): Metadata => ({
  metadataBase: new URL(`https://ato-m-a.me${pathname}`),
  description,
  title,
  icons: {
    apple: [
      { rel: 'apple-touch-icon', sizes: '57x57', url: '/images/favicon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', url: '/images/favicon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', url: '/images/favicon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', url: '/images/favicon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', url: '/images/favicon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', url: '/images/favicon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', url: '/images/favicon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', url: '/images/favicon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', url: '/images/favicon/apple-icon-180x180.png' },
    ],
    icon: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/images/favicon/android-icon-192x192.png',
      },
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/images/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', url: '/images/favicon/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/images/favicon/favicon-16x16.png' },
    ],
    shortcut: '/images/favicon/favicon.ico',
  },
  openGraph: {
    type: 'website',
    title,
    description,
    siteName: 'ato-m-a.me',
    locale: 'ko-KR',
    url: new URL(`https://ato-m-a.me${pathname}`),
    images: {
      url: ogImage,
      width: 1080,
      height: 1080,
      alt: description,
    },
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ato_m_a',
    creator: '@ato_m_a',
    title,
    description,
    images: {
      url: ogImage,
      width: 1080,
      height: 1080,
      alt: description,
    },
  },
});

export default createMetadata;
