import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TravelVault',
  description:
    'TravelVault - Save your trips and daily adventures. Document every moment, relive your travel memories, and share your journey with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex h-screen flex-col`}>
        {children}
      </body>
    </html>
  );
}
