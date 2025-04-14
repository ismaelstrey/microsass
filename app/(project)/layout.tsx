import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const interSans = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const interMono = Inter({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-inter-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Micro SAAS",
  description: "Sistema de gerenciamento de MICROSASS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pr-BR">
      <body suppressHydrationWarning
        className={`${interSans.variable} ${interMono.variable} antialiased bg-gray-100 flex `}      >
          <Sidebar/>
        {children}
      </body>
    </html>
  );
}
