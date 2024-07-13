import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import MainLayout from "@/components/layouts/MainLayout";

import "./globals.css";
import 'react-tooltip/dist/react-tooltip.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social media",
  description: "",
  icons: '/logo.ico',
};

export const viewport: Viewport = {
  themeColor: '#0E0B18',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
