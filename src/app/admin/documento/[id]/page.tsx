"use client";

import { DocumentDetailView } from "@/components/admin/DocumentDetailView";
import { useDocuments } from "@/contexts/DocumentsContext";
import Link from "next/link";
import { use } from "react";

export default function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { documents, loading } = useDocuments();
  const doc = documents.find((d) => d.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-8">
        <p className="font-bold text-base text-[#121212]">Carregando documento...</p>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center p-8 gap-4">
        <h2 className="text-2xl font-black text-[#121212]">Documento não encontrado</h2>
        <Link
          href="/admin"
          className="px-5 py-2.5 rounded font-black text-xs bg-[#f8ba01] text-[#121212] border-2 border-[#121212]"
        >
          VOLTAR AO PAINEL
        </Link>
      </div>
    );
  }

  return <DocumentDetailView document={doc} />;
}
