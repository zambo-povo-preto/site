"use client";

import { useDocuments } from "@/contexts/DocumentsContext";
import { getAttachmentDownloadUrl } from "@/lib/api";
import type { DocumentAttachment } from "@/types/document";
import {
  ChevronDown,
  Download,
  Folder,
  Link as LinkIcon,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FileUploadDropzone } from "./FileUploadDropzone";

export function DocumentsManagementView() {
  const {
    complementaryDocuments,
    documents,
    loading,
    addAttachment,
    linkAttachment,
    deleteAttachment,
  } = useDocuments();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [linkFilter, setLinkFilter] = useState<"all" | "linked" | "unlinked">(
    "all",
  );

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [linkTargetDoc, setLinkTargetDoc] = useState<DocumentAttachment | null>(
    null,
  );

  const [newDocData, setNewDocData] = useState({
    description: "",
    documentId: "",
    isPublicSafe: false,
  });
  const [file, setFile] = useState<File | null>(null);

  const filtered = complementaryDocuments.filter((docItem) => {
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      docItem.name.toLowerCase().includes(q) ||
      docItem.description?.toLowerCase().includes(q);

    const matchType = typeFilter === "all" || docItem.fileType === typeFilter;
    const matchLink =
      linkFilter === "all" ||
      (linkFilter === "linked" && Boolean(docItem.documentId)) ||
      (linkFilter === "unlinked" && !docItem.documentId);

    return matchSearch && matchType && matchLink;
  });

  const unlinkedCount = complementaryDocuments.filter(
    (d) => !d.documentId,
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#222222] pb-16">
      {/* ── Page Header ── */}
      <div className="px-4 sm:px-8 lg:px-12 pt-7">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1
              className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight leading-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Documentos Complementares
            </h1>
            <p
              className="text-xs sm:text-sm text-[#756F67]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Gerencie os arquivos complementares, termos, editais e planilhas
              orçamentárias.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setNewDocData({
                description: "",
                documentId: "",
                isPublicSafe: false,
              });
              setFile(null);
              setShowUploadModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] transition-colors shadow-xs self-start sm:self-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Plus className="w-4 h-4" />
            <span>Novo Documento</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 flex flex-col gap-6">
        {/* ── Search & Filters Bar ── */}
        <div className="bg-white rounded-lg p-4 sm:p-5 border border-[#E3DCCF] flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between shadow-xs">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#756F67] w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar documento por nome ou descrição..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] placeholder-[#756F67] focus:outline-none focus:border-[#F5B900] focus:bg-white transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Select Tipo com Caret Down devidamente espaçado */}
            <div className="relative inline-flex items-center">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 text-xs font-medium rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900] cursor-pointer transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <option value="all">Todos os Tipos</option>
                <option value="PDF">PDF</option>
                <option value="XLSX">Planilha (XLSX)</option>
                <option value="DOC">Documento (DOC)</option>
              </select>
              <ChevronDown
                className="w-3.5 h-3.5 text-[#756F67] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>

            {/* Select Vínculo com Caret Down devidamente espaçado */}
            <div className="relative inline-flex items-center">
              <select
                value={linkFilter}
                onChange={(e) =>
                  setLinkFilter(e.target.value as "all" | "linked" | "unlinked")
                }
                className="appearance-none pl-3.5 pr-8 py-2 text-xs font-medium rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900] cursor-pointer transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <option value="all">Todos os Vínculos</option>
                <option value="linked">Vinculados a Relatório</option>
                <option value="unlinked">
                  Avulsos / Não Vinculados ({unlinkedCount})
                </option>
              </select>
              <ChevronDown
                className="w-3.5 h-3.5 text-[#756F67] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>

            {(search || typeFilter !== "all" || linkFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("all");
                  setLinkFilter("all");
                }}
                className="px-3 py-2 text-xs font-medium rounded-md text-[#756F67] hover:text-[#222222] hover:bg-[#FAF7F2] border border-[#E3DCCF] transition-colors"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white rounded-lg border border-[#E3DCCF] shadow-xs overflow-hidden flex flex-col">
          {loading ? (
            <div className="py-20 text-center text-xs text-[#756F67]">
              Carregando documentos...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 px-6 text-center flex flex-col items-center justify-center gap-3">
              <Folder className="w-10 h-10 text-[#A69E93]" />
              <h3 className="text-base font-semibold text-[#222222]">
                Nenhum documento cadastrado
              </h3>
              <p className="text-xs text-[#756F67] max-w-sm">
                Envie novos arquivos avulsos para organizá-los e vinculá-los às
                publicações oficiais.
              </p>
              <button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Documento</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E3DCCF] bg-[#FAF7F2] text-[11px] font-semibold text-[#756F67] uppercase tracking-wider">
                    <th className="py-3 px-4">Nome do Arquivo</th>
                    <th className="py-3 px-4">Tipo / Formato</th>
                    <th className="py-3 px-4">Tamanho</th>
                    <th className="py-3 px-4">Data de Envio</th>
                    <th className="py-3 px-4">Relatório Vinculado</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3DCCF] text-xs">
                  {filtered.map((docItem) => {
                    const linkedReport = documents.find(
                      (d) => d.id === docItem.documentId,
                    );

                    return (
                      <tr
                        key={docItem.id}
                        className="hover:bg-[#FAF7F2] transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col gap-0.5 min-w-[200px]">
                            <span className="font-semibold text-[#222222]">
                              {docItem.name}
                            </span>
                            {docItem.description && (
                              <span className="text-[11px] text-[#756F67] line-clamp-1">
                                {docItem.description}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF7F2] text-[#756F67] border border-[#E3DCCF]">
                            {docItem.fileType}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-[#756F67]">
                          {docItem.fileSize}
                        </td>

                        <td className="py-3.5 px-4 text-[#756F67] whitespace-nowrap">
                          {docItem.createdAt}
                        </td>

                        <td className="py-3.5 px-4">
                          {linkedReport ? (
                            <Link
                              href={`/admin/relatorios/${linkedReport.id}`}
                              className="text-[#222222] hover:text-[#C02D1D] font-medium text-[11px] hover:underline flex items-center gap-1"
                            >
                              <span>📄</span>
                              <span className="truncate max-w-[180px]">
                                {linkedReport.title}
                              </span>
                            </Link>
                          ) : (
                            <span className="text-[11px] text-[#8A6500] bg-[#FFF4CC] px-2 py-0.5 rounded border border-[#F0DC99] font-medium">
                              Avulso / Não vinculado
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <a
                              href={getAttachmentDownloadUrl(docItem.id)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md text-[#756F67] hover:text-[#222222] hover:bg-white border border-transparent hover:border-[#E3DCCF] transition-colors"
                              title="Baixar arquivo"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </a>

                            <button
                              type="button"
                              onClick={() => setLinkTargetDoc(docItem)}
                              className="p-1.5 rounded-md text-[#756F67] hover:text-[#222222] hover:bg-white border border-transparent hover:border-[#E3DCCF] transition-colors"
                              title="Vincular ou alterar relatório"
                            >
                              <LinkIcon className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={async () => {
                                if (
                                  confirm(
                                    "Deseja realmente excluir este documento?",
                                  )
                                ) {
                                  await deleteAttachment(docItem.id);
                                }
                              }}
                              className="p-1.5 rounded-md text-[#756F67] hover:text-[#C02D1D] hover:bg-[#FDF2F0] border border-transparent hover:border-[#FADCD7] transition-colors"
                              title="Excluir documento"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── MODAL: UPLOAD NOVO DOCUMENTO ── */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-md w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3DCCF]">
              <h3 className="text-base font-semibold text-[#222222]">
                Enviar Novo Documento
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowUploadModal(false);
                  setFile(null);
                }}
                className="text-[#756F67] hover:text-[#222222] text-sm"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!file) {
                  alert("Selecione um arquivo");
                  return;
                }
                await addAttachment(newDocData.documentId || null, {
                  file,
                  attachmentType: "document",
                  description: newDocData.description,
                  isPublicSafe: newDocData.isPublicSafe,
                });
                setShowUploadModal(false);
              }}
              className="flex flex-col gap-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-[#222222] mb-1">
                  Vincular a um Relatório (Opcional)
                </label>
                <select
                  value={newDocData.documentId}
                  onChange={(e) =>
                    setNewDocData({ ...newDocData, documentId: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                >
                  <option value="">Manter avulso (Vincular depois)</option>
                  {documents.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} (Exercício {d.year})
                    </option>
                  ))}
                </select>
              </div>

              <FileUploadDropzone
                label="Arquivo (PDF, XLSX, DOC)"
                required
                accept=".pdf,.xlsx,.doc,.docx"
                formatsHint="PDF, XLSX, DOC ou DOCX"
                maxSizeMB={25}
                file={file}
                onFileChange={setFile}
                compact
              />

              <div>
                <label className="block text-xs font-semibold text-[#222222] mb-1">
                  Descrição / Resumo
                </label>
                <textarea
                  value={newDocData.description}
                  onChange={(e) =>
                    setNewDocData({
                      ...newDocData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Ex: Planilha de cálculo de gastos operacionais"
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={newDocData.isPublicSafe}
                  onChange={(e) =>
                    setNewDocData({
                      ...newDocData,
                      isPublicSafe: e.target.checked,
                    })
                  }
                  className="rounded text-[#F5B900]"
                />
                <span className="text-[11px] text-[#756F67]">
                  O documento é público e não possui dados pessoais protegidos.
                </span>
              </label>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setFile(null);
                  }}
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#756F67] border border-[#E3DCCF] hover:bg-[#FAF7F2]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
                >
                  Salvar Documento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: ALTERAR VÍNCULO ── */}
      {linkTargetDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-md w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3DCCF]">
              <h3 className="text-base font-semibold text-[#222222]">
                Vincular a Relatório
              </h3>
              <button
                type="button"
                onClick={() => setLinkTargetDoc(null)}
                className="text-[#756F67] hover:text-[#222222] text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#756F67]">
              Selecione a qual publicação o documento{" "}
              <strong>{linkTargetDoc.name}</strong> pertence:
            </p>

            <select
              defaultValue={linkTargetDoc.documentId || ""}
              id="report-select-doc-target"
              className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
            >
              <option value="">Desvinculado / Avulso</option>
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} (Exercício {d.year})
                </option>
              ))}
            </select>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLinkTargetDoc(null)}
                className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#756F67] border border-[#E3DCCF] hover:bg-[#FAF7F2]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={async () => {
                  const select = document.getElementById(
                    "report-select-doc-target",
                  ) as unknown as HTMLSelectElement | null;
                  const newDocId = select?.value || null;
                  await linkAttachment(linkTargetDoc.id, newDocId);
                  setLinkTargetDoc(null);
                }}
                className="px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
              >
                Salvar Vínculo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
