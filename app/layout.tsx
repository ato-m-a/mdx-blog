import Pretendard from '@/common/fonts/Pretendard.font';
import JetBrainsMono from '@/common/fonts/JetBrains-mono.font';
import QueryProvider from '@/components/Providers/QueryProvider';
import getMetadata from './metadata';
import '@/styles/globals.css';

export const revalidate = 60;
export const metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${Pretendard.variable} ${JetBrainsMono.variable}`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
