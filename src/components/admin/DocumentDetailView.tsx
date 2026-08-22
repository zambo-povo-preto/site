"use client";

import { Breadcrumbs } from "./Breadcrumbs";
import { useDocuments } from "@/contexts/DocumentsContext";
import { getFilePreviewUrl } from "@/lib/api";
import type { AdminDocument } from "@/types/document";
import Link from "next/link";

interface DocumentDetailViewProps {
  document: AdminDocument;
}

export function DocumentDetailView({ document: doc }: DocumentDetailViewProps) {
  const { deleteAttachment } = useDocuments();
  const previewUrl = getFilePreviewUrl(doc.id);
  const isPdf =
    doc.fileType === "PDF" || doc.fileName.toLowerCase().endsWith(".pdf");

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#121212] pb-16">
      {/* Header Bar */}
      <header
        className="sticky top-0 z-40 px-4 sm:px-8 py-3 border-b border-[#d4c9b6]"
        style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
      >
        <div className="flex items-center gap-3 min-w-0 max-w-5xl mx-auto">
          <Link
            href="/admin"
            className="flex items-center justify-center w-8 h-8 rounded border border-[#d4c9b6] bg-[#faf7f2] text-[#121212] font-bold hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-colors text-sm shrink-0"
            title="Voltar ao Painel"
          >
            ←
          </Link>
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <Breadcrumbs
              items={[
                { label: "Admin", href: "/admin" },
                { label: "Transparência", href: "/admin" },
                { label: doc.title },
              ]}
            />
            <h1
              className="text-base sm:text-lg font-bold text-[#121212] truncate"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Pré-visualização do Relatório
            </h1>
          </div>

          <Link
            href={`/admin/documento/${doc.id}/editar`}
            className="px-3.5 py-1.5 rounded font-extrabold text-xs text-[#121212] border border-[#121212] bg-[#f8ba01] hover:bg-white transition-colors shrink-0"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ✏️ EDITAR DOCUMENTO
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 flex flex-col gap-6">
        {/* Document Header Metadata Card */}
        <div className="bg-white p-6 rounded-[3px] border border-[#d4c9b6] flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-extrabold text-[#c87d00] uppercase tracking-wider">
                {doc.category} · EXERCÍCIO {doc.year}
              </span>
              <h2
                className="text-2xl font-bold text-[#121212]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {doc.title}
              </h2>
              <span className="text-xs text-[#6b5e55] font-medium">
                Arquivo: <strong>{doc.fileName}</strong> ({doc.fileSize})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded font-extrabold text-xs ${
                  doc.status === "published"
                    ? "bg-[#1a7d3c] text-white"
                    : "bg-[#e8d5b4] text-[#6b5e55]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {doc.status === "published" ? "PUBLICADO" : "RASCUNHO"}
              </span>
            </div>
          </div>

          {doc.description && (
            <p className="text-sm font-medium text-[#3a342f] pt-3 border-t border-[#e8d5b4]">
              {doc.description}
            </p>
          )}
        </div>

        {/* File Preview Frame */}
        <div className="bg-white p-4 sm:p-6 rounded-[3px] border border-[#d4c9b6] flex flex-col gap-4">
          <span
            className="text-xs font-extrabold text-[#121212] uppercase tracking-wider"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            📄 PRÉ-VISUALIZAÇÃO DO ARQUIVO PRINCIPAL
          </span>

          {isPdf ? (
            <iframe
              src={previewUrl}
              title={`Pré-visualização de ${doc.title}`}
              className="w-full h-[600px] rounded border border-[#d4c9b6] bg-[#faf7f2]"
            />
          ) : (
            <div className="py-16 text-center flex flex-col items-center gap-4 bg-[#faf7f2] rounded border border-[#d4c9b6]">
              <span className="text-4xl">📄</span>
              <p className="font-bold text-base text-[#121212]">
                Pré-visualização direta não disponível no navegador para arquivos .{doc.fileType.toLowerCase()}
              </p>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-5 py-2.5 rounded font-extrabold text-xs bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                BAIXAR ARQUIVO AGORA ({doc.fileSize})
              </a>
            </div>
          )}
        </div>

        {/* Linked Invoices Section */}
        <div className="bg-white p-6 rounded-[3px] border border-[#d4c9b6] flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧾</span>
              <h3
                className="text-base font-bold text-[#121212]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                NOTAS FISCAIS & COMPROVANTES ({doc.attachments?.length || 0})
              </h3>
            </div>

            <Link
              href={`/admin/documento/${doc.id}/notas/nova`}
              className="px-3.5 py-1.5 rounded font-extrabold text-xs bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              + INCLUIR NOTA FISCAL
            </Link>
          </div>

          {doc.attachments && doc.attachments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {doc.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex flex-col justify-between p-4 bg-white rounded border border-[#d4c9b6] gap-3"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-xs text-[#c87d00] truncate">
                        🧾 {att.name}
                      </span>
                      {att.invoiceNumber && (
                        <span className="px-2 py-0.5 rounded bg-[#f8ba01]/30 font-mono text-[10px] font-bold text-[#121212] border border-[#121212]/20">
                          {att.invoiceNumber}
                        </span>
                      )}
                    </div>

                    {att.issuerName ? (
                      <span className="text-xs text-[#121212] font-bold truncate mt-1">
                        Favorecido: {att.issuerName} {att.issuerDoc ? `(${att.issuerDoc})` : ""}
                      </span>
                    ) : (
                      <span className="text-xs text-[#c87d00] font-bold italic mt-1">
                        ⚠️ Sem favorecido associado
                      </span>
                    )}

                    <div className="flex items-center gap-3 text-xs text-[#6b5e55] font-semibold mt-1">
                      {att.amount !== null && att.amount !== undefined && (
                        <span className="font-black text-[#1a7d3c]">
                          R$ {att.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      )}
                      {att.expenseType && <span>· {att.expenseType}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#e8d5b4]">
                    <Link
                      href={`/admin/documento/${doc.id}/notas/${att.id}/editar`}
                      className="flex-1 py-1.5 text-center text-xs font-bold rounded bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      ✏️ EDITAR DADOS
                    </Link>
                    {att.downloadUrl && (
                      <a
                        href={att.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="px-3 py-1.5 text-xs font-bold rounded bg-white text-[#121212] border border-[#d4c9b6]"
                      >
                        BAIXAR
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteAttachment(att.id)}
                      className="px-2 py-1.5 text-xs font-bold text-[#dd341f] hover:underline cursor-pointer"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#8c8077] italic py-2">
              Nenhum comprovante financeiro anexado a este relatório.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
