import { Toaster } from '@/components/ui/sonner';
import Pretendard from '@/common/fonts/Pretendard.font';
import JetBrainsMono from '@/common/fonts/JetBrains-mono.font';
import QueryProvider from '@/components/Providers/QueryProvider';
import getMetadata from './metadata';
import ThemeProvider from '@/components/Providers/ThemeProvider';
import '@/styles/globals.css';

export const revalidate = 60;
export const metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${Pretendard.variable} ${JetBrainsMono.variable}`}>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster
            toastOptions={{
              classNames: {
                error: 'bg-red-500 text-white',
                success: 'bg-green-500 text-white',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
