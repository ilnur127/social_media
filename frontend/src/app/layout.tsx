'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { useThemeStore } from '@/store/theme.store';

import './globals.css';
import 'react-tooltip/dist/react-tooltip.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useThemeStore();
  return (
    <html lang='en'>
      <body className={theme === 'dark' ? 'darkMode' : 'whiteMode'}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
