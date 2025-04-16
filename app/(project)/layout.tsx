import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";


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
        className={`antialiased bg-gray-100 flex `}>
          <Sidebar/>
        {children}
      </body>
    </html>
  );
}
