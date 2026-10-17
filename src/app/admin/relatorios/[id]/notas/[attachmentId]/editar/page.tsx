"use client";

import { InvoiceForm } from "@/components/admin/InvoiceForm";
import { useDocuments } from "@/contexts/DocumentsContext";
import Link from "next/link";
import { use } from "react";

export default function EditInvoiceForRelatorioPage({
  params,
}: {
  params: Promise<{ id: string; attachmentId: string }>;
}) {
  const { id, attachmentId } = use(params);
  const { documents, loading } = useDocuments();

  const doc = documents.find((d) => d.id === id);
  const att = doc?.attachments?.find((a) => a.id === attachmentId);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EA] flex items-center justify-center p-8">
        <p className="font-semibold text-sm text-[#756F67]">
          Carregando comprovante...
        </p>
      </div>
    );
  }

  if (!doc || !att) {
    return (
      <div className="min-h-screen bg-[#F7F3EA] flex flex-col items-center justify-center p-8 gap-4">
        <h2 className="text-xl font-bold text-[#222222]">
          Comprovante não encontrada
        </h2>
        <Link
          href={
            doc ? `/admin/relatorios/${doc.id}/editar` : "/admin/relatorios"
          }
          className="px-4 py-2 rounded-md font-semibold text-xs bg-[#F5B900] text-[#222222] border border-[#E0A800]"
        >
          VOLTAR AO RELATÓRIO
        </Link>
      </div>
    );
  }

  return <InvoiceForm document={doc} initialAttachment={att} />;
}
