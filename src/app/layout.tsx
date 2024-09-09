import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import Header from '@/components/modules/header';
import Nav from '@/components/modules/nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Travel Journal',
  description: 'Keep a note of your travel day-by-day',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex h-screen flex-col`}>
        <Header />
        <Nav />
        {children}
      </body>
    </html>
  );
}
