import type { FC, PropsWithChildren } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sidebar, SidebarTrigger } from '@/components/Sidebar';
import Pretendard from '@/common/fonts/Pretendard.font';
import JetBrainsMono from '@/common/fonts/JetBrains-mono.font';
import QueryProvider from '@/components/Providers/QueryProvider';
import ThemeProvider from '@/components/Providers/ThemeProvider';
import SessionDialog from '@/components/SessionDialog';
import '@/styles/globals.css';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${Pretendard.variable} ${JetBrainsMono.variable}`}>
        <ThemeProvider>
          <QueryProvider>
            <SidebarProvider defaultOpen={false}>
              <Sidebar />
              <SidebarTrigger />
              {children}
            </SidebarProvider>
            <SessionDialog />
          </QueryProvider>
          <Toaster
            toastOptions={{
              classNames: {
                error: 'bg-red-500 text-white',
                success: 'bg-green-500 text-white',
              },
            }}
            richColors
          />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
