"use client";

import { DocumentDetailView } from "@/components/admin/DocumentDetailView";
import { useDocuments } from "@/contexts/DocumentsContext";
import Link from "next/link";
import { use } from "react";

export default function RelatorioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { documents, loading } = useDocuments();
  const doc = documents.find((d) => d.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EA] flex items-center justify-center p-8">
        <p className="font-semibold text-sm text-[#756F67]">Carregando relatório...</p>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#F7F3EA] flex flex-col items-center justify-center p-8 gap-4">
        <h2 className="text-xl font-bold text-[#222222]">Relatório não encontrado</h2>
        <Link
          href="/admin/relatorios"
          className="px-4 py-2 rounded-md font-semibold text-xs bg-[#F5B900] text-[#222222] border border-[#E0A800]"
        >
          VOLTAR AOS RELATÓRIOS
        </Link>
      </div>
    );
  }

  return <DocumentDetailView document={doc} />;
}
