"use client";

import { InvoiceForm } from "@/components/admin/InvoiceForm";
import { useDocuments } from "@/contexts/DocumentsContext";
import Link from "next/link";
import { use } from "react";

export default function EditInvoicePage({
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
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-8">
        <p className="font-bold text-base text-[#121212]">Carregando nota fiscal...</p>
      </div>
    );
  }

  if (!doc || !att) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center p-8 gap-4">
        <h2 className="text-2xl font-black text-[#121212]">Nota fiscal não encontrada</h2>
        <Link
          href={doc ? `/admin/documento/${doc.id}/editar` : "/admin"}
          className="px-5 py-2.5 rounded font-black text-xs bg-[#f8ba01] text-[#121212] border-2 border-[#121212]"
        >
          VOLTAR AO DOCUMENTO
        </Link>
      </div>
    );
  }

  return <InvoiceForm document={doc} initialAttachment={att} />;
}
