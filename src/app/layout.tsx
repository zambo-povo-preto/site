import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { DocumentsProvider } from "@/contexts/DocumentsContext";
import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Zambô - Ponto de Cultura",
  description: "Ponto de Cultura Zambô do Movimento Negro em Caraguatatuba-SP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`background ${inter.variable} ${anton.variable} antialiased`}
      >
        <AdminAuthProvider>
          <DocumentsProvider>{children}</DocumentsProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
