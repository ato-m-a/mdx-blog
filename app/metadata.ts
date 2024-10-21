import { Metadata } from 'next';

const getMetadata = (): Metadata => ({
  metadataBase: new URL('https://ato-m-a.me'),
  description: '웹 프론트엔드 개발자 홍준혁입니다. 찾아주셔서 감사합니다!',
  title: '홍준혁 | 웹 프론트엔드 개발자',
  icons: {
    icon: './favicon.ico',
  },
  openGraph: {
    type: 'website',
    title: '홍준혁 | 웹 프론트엔드 개발자',
    description: '웹 프론트엔드 개발자 홍준혁입니다. 찾아주셔서 감사합니다!',
    siteName: 'ato-m-a.me',
    locale: 'ko-KR',
    url: 'https://ato-m-a.me',
    images: {
      url: '/images/og-image.webp',
      width: 1080,
      height: 1080,
      alt: '홍준혁 | 웹 프론트엔드 개발자',
    },
  },
  twitter: {
    card: 'summary',
    site: '@ato_m_a',
    creator: '@ato_m_a',
    title: '홍준혁 | 웹 프론트엔드 개발자',
    description: '웹 프론트엔드 개발자 홍준혁입니다. 찾아주셔서 감사합니다!',
    images: {
      url: '/images/og-image.webp',
      width: 1080,
      height: 1080,
      alt: '홍준혁 | 웹 프론트엔드 개발자',
    },
  },
});

export default getMetadata;
