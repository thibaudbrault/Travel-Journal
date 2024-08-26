import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/modules/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Journal",
  description: "Keep a note of your travel day-by-day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} h-screen flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
