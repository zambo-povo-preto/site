import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zambo",
  description: "Ponto de Cultura Zambo do Movimento Negro em Caraguatatuba-SP.",
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
      <body>{children}</body>
    </html>
  );
}
