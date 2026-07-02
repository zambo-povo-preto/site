import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google"; // Importação adicionada

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
        {children}
      </body>
    </html>
  );
}
