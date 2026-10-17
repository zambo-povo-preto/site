import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PublicReportDetailView } from "@/components/sections/transparencia/PublicReportDetailView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relatório de Transparência | Ponto de Cultura Zambô",
  description:
    "Consulta pública aos documentos e comprovantes da prestação de contas do Ponto de Cultura Zambô, em estrito cumprimento à Lei de Acesso à Informação e à LGPD.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicReportPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#faf4e8]">
      <Navbar />
      <main className="flex-1 w-full">
        <PublicReportDetailView id={id} />
      </main>
      <Footer />
    </div>
  );
}
