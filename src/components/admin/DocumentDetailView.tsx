"use client";

import { Breadcrumbs } from "./Breadcrumbs";
import { useDocuments } from "@/contexts/DocumentsContext";
import {
  getAttachmentDownloadUrl,
  getFileDownloadUrl,
  getFilePreviewUrl,
} from "@/lib/api";
import type { AdminDocument } from "@/types/document";
import {
  ArrowLeft,
  Download,
  Eye,
  EyeOff,
  FileText,
  Folder,
  Link as LinkIcon,
  Pencil,
  Plus,
  Receipt,
  ShieldCheck,
  Trash2,
  Unlink,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileUploadDropzone } from "./FileUploadDropzone";

interface DocumentDetailViewProps {
  document: AdminDocument;
}

export function DocumentDetailView({ document: doc }: DocumentDetailViewProps) {
  const router = useRouter();
  const {
    invoices,
    complementaryDocuments,
    linkAttachment,
    addAttachment,
    uploadPublicFile,
    toggleStatus,
    deleteDocument,
  } = useDocuments();

  const [activeTab, setActiveTab] = useState<
    "comprovantes" | "documentos" | "arquivo"
  >("arquivo");

  // Deletion modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Modals state
  const [showLinkInvoiceModal, setShowLinkInvoiceModal] = useState(false);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showLinkDocModal, setShowLinkDocModal] = useState(false);
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [showUploadPublicModal, setShowUploadPublicModal] = useState(false);
  const [publicModalTarget, setPublicModalTarget] = useState<{
    id?: string;
    attachmentId?: string;
    title: string;
  } | null>(null);

  // Search states inside modals
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [docSearch, setDocSearch] = useState("");

  // New Invoice Form state
  const [newInvoiceData, setNewInvoiceData] = useState({
    issuerName: "",
    issuerDoc: "",
    invoiceNumber: "",
    amount: "",
    issueDate: "",
    expenseType: "Outros",
    description: "",
    isPublicSafe: false,
  });
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [invoicePublicFile, setInvoicePublicFile] = useState<File | null>(null);

  // New Complementary Doc Form state
  const [newDocData, setNewDocData] = useState({
    name: "",
    description: "",
    isPublicSafe: false,
  });
  const [compFile, setCompFile] = useState<File | null>(null);

  // Public File Upload form
  const [selectedPublicFile, setSelectedPublicFile] = useState<File | null>(
    null,
  );

  const previewUrl = getFilePreviewUrl(doc.id);
  const downloadUrl = getFileDownloadUrl(doc.id);
  const isPdf =
    doc.fileType === "PDF" || doc.fileName.toLowerCase().endsWith(".pdf");

  // Filter linked items
  const linkedInvoices = (doc.attachments || []).filter(
    (a) => a.attachmentType === "invoice",
  );
  const linkedDocs = (doc.attachments || []).filter(
    (a) => a.attachmentType === "document",
  );

  const totalInvoicesAmount = linkedInvoices.reduce(
    (acc, att) => acc + (att.amount || 0),
    0,
  );

  // Candidate unlinked/other items for linking
  const availableInvoices = invoices.filter((inv) => inv.documentId !== doc.id);
  const availableDocs = complementaryDocuments.filter(
    (d) => d.documentId !== doc.id,
  );

  const filteredAvailableInvoices = availableInvoices.filter((inv) => {
    const q = invoiceSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      inv.issuerName?.toLowerCase().includes(q) ||
      inv.issuerDoc?.toLowerCase().includes(q) ||
      inv.invoiceNumber?.toLowerCase().includes(q) ||
      inv.name.toLowerCase().includes(q)
    );
  });

  const filteredAvailableDocs = availableDocs.filter((d) => {
    const q = docSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.description?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#222222] pb-16">
      {/* ── Top Header Bar ── */}
      <header className="sticky top-16 z-30 px-4 sm:px-8 py-3.5 border-b border-[#E3DCCF] bg-white shadow-xs">
        <div className="flex items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/admin/relatorios"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#554F48] hover:text-[#222222] hover:bg-white transition-colors text-xs font-semibold shrink-0"
              style={{ fontFamily: "'Inter', sans-serif" }}
              title="Voltar para a listagem de relatórios"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </Link>
            <div className="flex flex-col gap-0.5 min-w-0">
              <Breadcrumbs
                items={[
                  { label: "Admin", href: "/admin" },
                  { label: "Relatórios", href: "/admin/relatorios" },
                  { label: doc.title },
                ]}
              />
              <span
                className="text-xs font-semibold text-[#756F67]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Gerenciamento da Publicação
              </span>
            </div>
          </div>

          {/* Action buttons inside the report page */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => toggleStatus(doc.id)}
              className="px-3 py-1.5 rounded-md font-semibold text-xs border transition-colors inline-flex items-center gap-1.5 shadow-xs"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: doc.status === "published" ? "#EAF5EC" : "#FAF7F2",
                color: doc.status === "published" ? "#1A7D3C" : "#756F67",
                borderColor: doc.status === "published" ? "#CBE5D0" : "#E3DCCF",
              }}
              title={
                doc.status === "published"
                  ? "Despublicar relatório"
                  : "Publicar relatório"
              }
            >
              {doc.status === "published" ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#1A7D3C]" />
                  <span>Publicado</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#756F67]" />
                  <span>Rascunho</span>
                </>
              )}
            </button>

            <Link
              href={`/admin/relatorios/${doc.id}/editar`}
              className="px-3.5 py-1.5 rounded-md font-semibold text-xs text-[#222222] border border-[#E0A800] bg-[#F5B900] hover:bg-[#e6ad00] transition-colors shrink-0 flex items-center gap-1.5 shadow-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
              title="Editar título, descrição e detalhes do relatório"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Editar</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-3 py-1.5 rounded-md font-semibold text-xs text-[#C02D1D] hover:text-white bg-[#FDF2F0] hover:bg-[#C02D1D] border border-[#FADCD7] hover:border-[#C02D1D] transition-colors shrink-0 flex items-center gap-1.5 shadow-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
              title="Excluir este relatório"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Excluir</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex flex-col gap-6">
        {/* ── 1. Document Overview Card ── */}
        <div className="bg-white p-6 rounded-lg border border-[#E3DCCF] shadow-xs flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-[#C02D1D] bg-[#FDF2F0] px-2.5 py-0.5 rounded-md border border-[#FADCD7] uppercase tracking-wide">
                  {doc.category}
                </span>
                <span className="text-xs font-semibold text-[#756F67]">
                  · Exercício {doc.year}
                </span>
                <span className="text-xs text-[#756F67]">
                  · Publicado em {doc.publishedAt}
                </span>
              </div>

              <h1
                className="text-xl sm:text-2xl font-bold text-[#222222] tracking-tight leading-snug"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {doc.title}
              </h1>

              {doc.description ? (
                <p
                  className="text-xs sm:text-sm text-[#756F67] leading-relaxed mt-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {doc.description}
                </p>
              ) : (
                <span className="text-xs text-[#A69E93] italic">
                  Sem descrição informada para esta publicação.
                </span>
              )}
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E3DCCF]">
              <span className="text-xs text-[#756F67] font-medium">
                Total comprovado:
              </span>
              <span
                className="text-lg sm:text-xl font-bold text-[#1A7D3C]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                R${" "}
                {totalInvoicesAmount.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* ── Tabs Navigation ── */}
        <div className="flex items-center gap-1 border-b border-[#E3DCCF] bg-white rounded-t-lg px-4 pt-2 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("arquivo")}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "arquivo"
                ? "border-[#F5B900] text-[#222222]"
                : "border-transparent text-[#756F67] hover:text-[#222222]"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <FileText className="w-4 h-4" />
            <span>Arquivo Principal & LGPD</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("comprovantes")}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "comprovantes"
                ? "border-[#F5B900] text-[#222222]"
                : "border-transparent text-[#756F67] hover:text-[#222222]"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Receipt className="w-4 h-4" />
            <span>Notas Fiscais ({linkedInvoices.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("documentos")}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "documentos"
                ? "border-[#F5B900] text-[#222222]"
                : "border-transparent text-[#756F67] hover:text-[#222222]"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Folder className="w-4 h-4" />
            <span>Documentos Vinculados ({linkedDocs.length})</span>
          </button>
        </div>

        {/* ── TAB CONTENT: NOTAS FISCAIS VINCULADAS ── */}
        {activeTab === "comprovantes" && (
          <div className="bg-white rounded-b-lg rounded-tr-lg border border-[#E3DCCF] p-6 shadow-xs flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E3DCCF]">
              <div className="flex flex-col">
                <h2
                  className="text-base font-semibold text-[#222222]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Notas Fiscais e Comprovantes Vinculados
                </h2>
                <span className="text-xs text-[#756F67]">
                  Comprovantes de despesas associados à prestação de contas
                  deste relatório.
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowLinkInvoiceModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md font-medium text-xs text-[#222222] bg-[#FAF7F2] hover:bg-white border border-[#E3DCCF] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <LinkIcon className="w-3.5 h-3.5 text-[#756F67]" />
                  <span>Vincular Nota Existente</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowNewInvoiceModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] transition-colors shadow-xs"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Cadastrar Novo Nota</span>
                </button>
              </div>
            </div>

            {linkedInvoices.length === 0 ? (
              <div className="py-14 text-center flex flex-col items-center justify-center gap-3 bg-[#FAF7F2] rounded-lg border border-dashed border-[#E3DCCF]">
                <Receipt className="w-10 h-10 text-[#A69E93]" />
                <h3
                  className="text-sm font-semibold text-[#222222]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Nenhuma comprovante foi vinculada a este relatório.
                </h3>
                <p className="text-xs text-[#756F67] max-w-sm">
                  Vincule comprovantes existentes no cadastro de comprovantes ou
                  cadastre uma novo despesa diretamente.
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setShowLinkInvoiceModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md font-medium text-xs text-[#222222] bg-white border border-[#E3DCCF] hover:bg-[#FAF7F2] transition-colors"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-[#756F67]" />
                    <span>Vincular Nota Existente</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewInvoiceModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Cadastrar Novo Nota</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-[#E3DCCF] border border-[#E3DCCF] rounded-lg overflow-hidden">
                {linkedInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-4.5 hover:bg-[#FAF7F2] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-[#222222]">
                          {inv.issuerName || "Favorecido não informado"}
                        </span>
                        {inv.issuerDoc && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FAF7F2] text-[#756F67] border border-[#E3DCCF]">
                            Doc (Admin): {inv.issuerDoc}
                          </span>
                        )}
                        {inv.invoiceNumber && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FFF4CC] text-[#8A6500] border border-[#E3DCCF]">
                            NF #{inv.invoiceNumber}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#756F67]">
                        <span className="font-semibold text-[#1A7D3C]">
                          R${" "}
                          {(inv.amount || 0).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        <span>·</span>
                        <span>{inv.expenseType || "Outros"}</span>
                        {inv.issueDate && (
                          <>
                            <span>·</span>
                            <span>
                              Data:{" "}
                              {new Date(inv.issueDate).toLocaleDateString(
                                "pt-BR",
                              )}
                            </span>
                          </>
                        )}
                      </div>

                      {/* LGPD Status Indicator */}
                      <div className="flex items-center gap-2 pt-1">
                        {inv.hasPublicFile ? (
                          <span className="text-[10px] text-[#1A7D3C] font-semibold flex items-center gap-1">
                            ✓ Arquivo público higienizado configurado
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#8A6500] bg-[#FFF4CC] px-2 py-0.5 rounded border border-[#F0DC99] font-medium flex items-center gap-1">
                            ⚠️ Apenas arquivo original (não visível publicamente
                            no portal)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={getAttachmentDownloadUrl(inv.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium text-xs text-[#756F67] hover:text-[#222222] bg-white border border-[#E3DCCF] hover:bg-[#FAF7F2] transition-colors"
                        title="Baixar comprovante"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setPublicModalTarget({
                            attachmentId: inv.id,
                            title: `Comprovante: ${inv.name}`,
                          });
                          setShowUploadPublicModal(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium text-xs text-[#756F67] hover:text-[#222222] bg-white border border-[#E3DCCF] hover:bg-[#FAF7F2] transition-colors"
                        title="Configurar arquivo público sanitizado LGPD"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1A7D3C]" />
                        <span>
                          {inv.hasPublicFile
                            ? "Substituir Público"
                            : "Adicionar Público"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          if (
                            confirm(
                              "Deseja desvincular esta nota do relatório? Ela continuará disponível no cadastro de notas fiscais.",
                            )
                          ) {
                            await linkAttachment(inv.id, null);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium text-xs text-[#C02D1D] hover:bg-[#FDF2F0] border border-[#E3DCCF] transition-colors"
                        title="Desvincular do relatório"
                      >
                        <Unlink className="w-3.5 h-3.5" />
                        <span>Desvincular</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB CONTENT: DOCUMENTOS COMPLEMENTARES VINCULADOS ── */}
        {activeTab === "documentos" && (
          <div className="bg-white rounded-b-lg rounded-tr-lg border border-[#E3DCCF] p-6 shadow-xs flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E3DCCF]">
              <div className="flex flex-col">
                <h2
                  className="text-base font-semibold text-[#222222]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Documentos Complementares Vinculados
                </h2>
                <span className="text-xs text-[#756F67]">
                  Termos, planilhas orçamentárias, editais e anexos associados a
                  esta publicação.
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowLinkDocModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md font-medium text-xs text-[#222222] bg-[#FAF7F2] hover:bg-white border border-[#E3DCCF] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <LinkIcon className="w-3.5 h-3.5 text-[#756F67]" />
                  <span>Vincular Documento Existente</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowNewDocModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] transition-colors shadow-xs"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enviar Novo Documento</span>
                </button>
              </div>
            </div>

            {linkedDocs.length === 0 ? (
              <div className="py-14 text-center flex flex-col items-center justify-center gap-3 bg-[#FAF7F2] rounded-lg border border-dashed border-[#E3DCCF]">
                <Folder className="w-10 h-10 text-[#A69E93]" />
                <h3
                  className="text-sm font-semibold text-[#222222]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Nenhum documento foi vinculado a este relatório.
                </h3>
                <p className="text-xs text-[#756F67] max-w-sm">
                  Adicione planilhas, termos ou relatórios técnicos
                  complementares.
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setShowLinkDocModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md font-medium text-xs text-[#222222] bg-white border border-[#E3DCCF] hover:bg-[#FAF7F2] transition-colors"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-[#756F67]" />
                    <span>Vincular Documento Existente</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewDocModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Enviar Novo Documento</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-[#E3DCCF] border border-[#E3DCCF] rounded-lg overflow-hidden">
                {linkedDocs.map((docItem) => (
                  <div
                    key={docItem.id}
                    className="p-4.5 hover:bg-[#FAF7F2] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="flex items-center justify-center w-9 h-10 rounded-md font-bold text-xs bg-[#FAF7F2] text-[#756F67] border border-[#E3DCCF] shrink-0">
                        {docItem.fileType}
                      </span>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-sm font-semibold text-[#222222] truncate">
                          {docItem.name}
                        </span>
                        <span className="text-xs text-[#756F67]">
                          {docItem.fileSize} · Enviado em {docItem.createdAt}
                        </span>
                        {docItem.description && (
                          <span className="text-xs text-[#756F67] line-clamp-1">
                            {docItem.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={getAttachmentDownloadUrl(docItem.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium text-xs text-[#756F67] hover:text-[#222222] bg-white border border-[#E3DCCF] hover:bg-[#FAF7F2] transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar</span>
                      </a>

                      <button
                        type="button"
                        onClick={async () => {
                          if (
                            confirm(
                              "Deseja desvincular este documento do relatório?",
                            )
                          ) {
                            await linkAttachment(docItem.id, null);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium text-xs text-[#C02D1D] hover:bg-[#FDF2F0] border border-[#E3DCCF] transition-colors"
                      >
                        <Unlink className="w-3.5 h-3.5" />
                        <span>Desvincular</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB CONTENT: ARQUIVO PRINCIPAL & LGPD ── */}
        {activeTab === "arquivo" && (
          <div className="bg-white rounded-b-lg rounded-tr-lg border border-[#E3DCCF] p-6 shadow-xs flex flex-col gap-6">
            {/* LGPD Mandatory Warning Box */}
            <div className="bg-[#FFF4CC] border border-[#F0DC99] p-4.5 rounded-lg flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <span
                  className="text-xs font-bold text-[#8A6500] uppercase tracking-wider"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  ORIENTAÇÃO DE PROTEÇÃO DE DADOS (LGPD)
                </span>
              </div>
              <p
                className="text-xs sm:text-sm text-[#5C4500] leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <strong>ATENÇÃO:</strong> o arquivo público será disponibilizado
                para qualquer pessoa que acessar o Portal da Transparência.
                Verifique se o documento não contém dados pessoais
                desnecessários, como CPF, endereço residencial, telefone
                pessoal, dados bancários, assinaturas ou documentos de
                identidade de terceiros.
              </p>
            </div>

            {/* Main File Management Box */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4.5 rounded-lg border border-[#E3DCCF] bg-[#FAF7F2]">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#756F67] uppercase tracking-wider">
                  Arquivo Original (Uso Administrativo)
                </span>
                <span className="text-sm font-semibold text-[#222222]">
                  {doc.fileName} ({doc.fileSize})
                </span>
                <span className="text-xs text-[#756F67]">
                  Armazenado de forma segura e acessível exclusivamente pela
                  gestão.
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md font-semibold text-xs text-[#222222] bg-white hover:bg-[#FAF7F2] border border-[#E3DCCF] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#756F67]" />
                  <span>Baixar Original</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setPublicModalTarget({
                      id: doc.id,
                      title: `Relatório: ${doc.title}`,
                    });
                    setShowUploadPublicModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] transition-colors shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>
                    {doc.hasPublicFile
                      ? "Substituir Arquivo Público"
                      : "Enviar Arquivo Público"}
                  </span>
                </button>
              </div>
            </div>

            {/* Embedded Preview */}
            <div className="flex flex-col gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-wider text-[#756F67]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Visualização do Arquivo
              </span>

              {isPdf ? (
                <iframe
                  src={previewUrl}
                  title={`Visualização de ${doc.title}`}
                  className="w-full h-[650px] rounded-lg border border-[#E3DCCF] bg-[#FAF7F2]"
                />
              ) : (
                <div className="py-16 text-center flex flex-col items-center gap-3 bg-[#FAF7F2] rounded-lg border border-[#E3DCCF]">
                  <span className="text-3xl">📄</span>
                  <p className="text-sm font-semibold text-[#222222]">
                    Visualização embutida indisponível para arquivos .
                    {doc.fileType.toLowerCase()}
                  </p>
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md font-semibold text-xs bg-[#F5B900] text-[#222222] border border-[#E0A800] hover:bg-[#e0a800] transition-colors"
                  >
                    Baixar Arquivo ({doc.fileSize})
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ── MODAL: VINCULAR NOTA EXISTENTE ── */}
      {showLinkInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4 max-h-[90vh]">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3DCCF]">
              <h3
                className="text-base font-semibold text-[#222222]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Vincular Comprovante ao Relatório
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkInvoiceModal(false)}
                className="text-[#756F67] hover:text-[#222222] text-sm"
              >
                ✕
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                placeholder="Buscar por favorecido ou número da nota..."
                className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
              />
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#E3DCCF] border border-[#E3DCCF] rounded-md max-h-72">
              {filteredAvailableInvoices.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#756F67]">
                  Nenhuma comprovante disponível para vinculação.
                </div>
              ) : (
                filteredAvailableInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-3 hover:bg-[#FAF7F2] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-semibold text-[#222222] truncate">
                        {inv.issuerName || inv.name}
                      </span>
                      <span className="text-[11px] text-[#756F67]">
                        NF #{inv.invoiceNumber || "S/N"} · R${" "}
                        {(inv.amount || 0).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        · {inv.expenseType || "Outros"}
                      </span>
                      {inv.documentId && (
                        <span className="text-[10px] text-[#8A6500]">
                          Atualmente vinculada a outro relatório
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        await linkAttachment(inv.id, doc.id);
                        setShowLinkInvoiceModal(false);
                      }}
                      className="px-3 py-1.5 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] shrink-0"
                    >
                      Vincular
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowLinkInvoiceModal(false);
                  setShowNewInvoiceModal(true);
                }}
                className="text-xs font-semibold text-[#8A6500] hover:underline"
              >
                + Não encontrou? Cadastrar novo nota
              </button>

              <button
                type="button"
                onClick={() => setShowLinkInvoiceModal(false)}
                className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#756F67] border border-[#E3DCCF] hover:bg-[#FAF7F2]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: CADASTRAR NOVO NOTA (VINCULADA DIRETAMENTE) ── */}
      {showNewInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3DCCF]">
              <h3
                className="text-base font-semibold text-[#222222]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cadastrar Novo Comprovante
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowNewInvoiceModal(false);
                  setInvoiceFile(null);
                  setInvoicePublicFile(null);
                }}
                className="text-[#756F67] hover:text-[#222222] text-sm"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!invoiceFile) {
                  alert("Selecione o arquivo da comprovante");
                  return;
                }
                await addAttachment(doc.id, {
                  file: invoiceFile,
                  publicFile: invoicePublicFile || undefined,
                  attachmentType: "invoice",
                  issuerName: newInvoiceData.issuerName,
                  issuerDoc: newInvoiceData.issuerDoc,
                  invoiceNumber: newInvoiceData.invoiceNumber,
                  amount: newInvoiceData.amount
                    ? Number(newInvoiceData.amount)
                    : undefined,
                  issueDate: newInvoiceData.issueDate,
                  expenseType: newInvoiceData.expenseType,
                  description: newInvoiceData.description,
                  isPublicSafe: newInvoiceData.isPublicSafe,
                });
                setShowNewInvoiceModal(false);
                setInvoiceFile(null);
                setInvoicePublicFile(null);
              }}
              className="flex flex-col gap-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-[#222222] mb-1">
                  Nome do Favorecido *
                </label>
                <input
                  type="text"
                  required
                  value={newInvoiceData.issuerName}
                  onChange={(e) =>
                    setNewInvoiceData({
                      ...newInvoiceData,
                      issuerName: e.target.value,
                    })
                  }
                  placeholder="Ex: Giselle Hoekveld ou Empresa LTDA"
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    CPF ou CNPJ (Gestão Interna)
                  </label>
                  <input
                    type="text"
                    value={newInvoiceData.issuerDoc}
                    onChange={(e) =>
                      setNewInvoiceData({
                        ...newInvoiceData,
                        issuerDoc: e.target.value,
                      })
                    }
                    placeholder="Ex: 000.000.000-00"
                    className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                  />
                  <span className="text-[10px] text-[#756F67] mt-0.5 block">
                    CPFs de pessoas físicas nunca serão expostos publicamente.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Número do Documento / NF
                  </label>
                  <input
                    type="text"
                    value={newInvoiceData.invoiceNumber}
                    onChange={(e) =>
                      setNewInvoiceData({
                        ...newInvoiceData,
                        invoiceNumber: e.target.value,
                      })
                    }
                    placeholder="Ex: 098 ou 1042"
                    className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newInvoiceData.amount}
                    onChange={(e) =>
                      setNewInvoiceData({
                        ...newInvoiceData,
                        amount: e.target.value,
                      })
                    }
                    placeholder="Ex: 1500.00"
                    className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Data da Emissão / Pagamento
                  </label>
                  <input
                    type="date"
                    value={newInvoiceData.issueDate}
                    onChange={(e) =>
                      setNewInvoiceData({
                        ...newInvoiceData,
                        issueDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                  />
                </div>
              </div>

              <FileUploadDropzone
                label="Arquivo Original da Nota (PDF / Imagem)"
                required
                accept=".pdf,.png,.jpg,.jpeg,.xlsx,.doc,.docx"
                formatsHint="PDF, PNG, JPG, XLSX ou DOC"
                maxSizeMB={20}
                file={invoiceFile}
                onFileChange={setInvoiceFile}
                compact
              />

              <div className="bg-[#FAF7F2] p-3 rounded-md border border-[#E3DCCF] flex flex-col gap-2">
                <span className="text-[11px] font-semibold text-[#222222]">
                  Versão Pública Sanitizada (LGPD)
                </span>
                <FileUploadDropzone
                  sublabel="Opcional. Envie caso o documento original possua dados pessoais/sigilosos que foram ocultados."
                  accept=".pdf"
                  formatsHint="Apenas PDF"
                  maxSizeMB={20}
                  file={invoicePublicFile}
                  onFileChange={setInvoicePublicFile}
                  compact
                />
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={newInvoiceData.isPublicSafe}
                    onChange={(e) =>
                      setNewInvoiceData({
                        ...newInvoiceData,
                        isPublicSafe: e.target.checked,
                      })
                    }
                    className="rounded text-[#F5B900]"
                  />
                  <span className="text-[11px] text-[#756F67]">
                    O arquivo original é seguro e pode ser disponibilizado
                    publicamente sem alterações.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewInvoiceModal(false);
                    setInvoiceFile(null);
                    setInvoicePublicFile(null);
                  }}
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#756F67] border border-[#E3DCCF] hover:bg-[#FAF7F2]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
                >
                  Cadastrar e Vincular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: VINCULAR DOCUMENTO EXISTENTE ── */}
      {showLinkDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4 max-h-[90vh]">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3DCCF]">
              <h3
                className="text-base font-semibold text-[#222222]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Vincular Documento ao Relatório
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkDocModal(false)}
                className="text-[#756F67] hover:text-[#222222] text-sm"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              value={docSearch}
              onChange={(e) => setDocSearch(e.target.value)}
              placeholder="Buscar por nome do documento..."
              className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
            />

            <div className="flex-1 overflow-y-auto divide-y divide-[#E3DCCF] border border-[#E3DCCF] rounded-md max-h-72">
              {filteredAvailableDocs.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#756F67]">
                  Nenhum documento disponível para vinculação.
                </div>
              ) : (
                filteredAvailableDocs.map((d) => (
                  <div
                    key={d.id}
                    className="p-3 hover:bg-[#FAF7F2] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-semibold text-[#222222] truncate">
                        {d.name}
                      </span>
                      <span className="text-[11px] text-[#756F67]">
                        {d.fileSize} · {d.fileType}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        await linkAttachment(d.id, doc.id);
                        setShowLinkDocModal(false);
                      }}
                      className="px-3 py-1.5 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] shrink-0"
                    >
                      Vincular
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLinkDocModal(false)}
                className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#756F67] border border-[#E3DCCF] hover:bg-[#FAF7F2]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: ENVIAR NOVO DOCUMENTO COMPLEMENTAR ── */}
      {showNewDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-md w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3DCCF]">
              <h3
                className="text-base font-semibold text-[#222222]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Enviar Novo Documento Complementar
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowNewDocModal(false);
                  setCompFile(null);
                }}
                className="text-[#756F67] hover:text-[#222222] text-sm"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!compFile) {
                  alert("Selecione um arquivo");
                  return;
                }
                await addAttachment(doc.id, {
                  file: compFile,
                  attachmentType: "document",
                  description: newDocData.description,
                  isPublicSafe: newDocData.isPublicSafe,
                });
                setShowNewDocModal(false);
                setCompFile(null);
              }}
              className="flex flex-col gap-3"
            >
              <FileUploadDropzone
                label="Arquivo (PDF, XLSX, DOC)"
                required
                accept=".pdf,.xlsx,.doc,.docx"
                formatsHint="PDF, XLSX, DOC ou DOCX"
                maxSizeMB={25}
                file={compFile}
                onFileChange={setCompFile}
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
                  placeholder="Ex: Planilha de prestação de contas de transporte e logística"
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
                    setShowNewDocModal(false);
                    setCompFile(null);
                  }}
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#756F67] border border-[#E3DCCF] hover:bg-[#FAF7F2]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
                >
                  Enviar e Vincular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: UPLOAD ARQUIVO PÚBLICO SANITIZADO LGPD ── */}
      {showUploadPublicModal && publicModalTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-md w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3DCCF]">
              <h3
                className="text-base font-semibold text-[#222222]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Enviar Arquivo Público Sanitizado
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowUploadPublicModal(false);
                  setPublicModalTarget(null);
                }}
                className="text-[#756F67] hover:text-[#222222] text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#FAF7F2] p-3 rounded-md border border-[#E3DCCF]">
              <span className="text-xs font-semibold text-[#222222]">
                {publicModalTarget.title}
              </span>
              <p className="text-[11px] text-[#756F67] mt-1">
                Esta versão será a única disponibilizada para download pelos
                cidadãos no Portal da Transparência.
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!selectedPublicFile) {
                  alert("Selecione um arquivo higienizado");
                  return;
                }
                await uploadPublicFile(
                  {
                    id: publicModalTarget.id,
                    attachmentId: publicModalTarget.attachmentId,
                  },
                  selectedPublicFile,
                );
                setShowUploadPublicModal(false);
                setPublicModalTarget(null);
                setSelectedPublicFile(null);
              }}
              className="flex flex-col gap-3.5"
            >
              <FileUploadDropzone
                label="Arquivo Público Sanitizado (PDF)"
                sublabel="Documento higienizado com dados pessoais e sigilosos protegidos."
                required
                accept=".pdf"
                formatsHint="Apenas PDF"
                maxSizeMB={20}
                file={selectedPublicFile}
                onFileChange={setSelectedPublicFile}
                compact
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadPublicModal(false);
                    setPublicModalTarget(null);
                    setSelectedPublicFile(null);
                  }}
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#756F67] border border-[#E3DCCF] hover:bg-[#FAF7F2]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
                >
                  Salvar Arquivo Público
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: EXCLUIR RELATÓRIO CONFIRMAÇÃO ── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-md w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FDF2F0] flex items-center justify-center text-[#C02D1D] shrink-0 border border-[#FADCD7]">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h3
                  className="text-base font-semibold text-[#222222]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Excluir este relatório?
                </h3>
                <span className="text-xs text-[#756F67] line-clamp-1 font-medium">
                  {doc.title}
                </span>
              </div>
            </div>

            <p
              className="text-xs sm:text-sm text-[#756F67] leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Tem certeza que deseja excluir esta publicação? As comprovantes
              fiscais vinculadas serão preservadas no cadastro geral de notas
              fiscais, mas deixarão de estar associadas a este relatório. Esta
              ação não poderá ser revertida.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowDeleteModal(false)}
                className="px-3.5 py-2 rounded-md font-medium text-xs text-[#756F67] hover:text-[#222222] border border-[#E3DCCF] hover:bg-[#FAF7F2] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    await deleteDocument(doc.id);
                    router.push("/admin/relatorios");
                  } catch (e) {
                    console.error("Erro ao excluir relatório:", e);
                    setIsDeleting(false);
                    alert("Erro ao excluir o relatório. Tente novomente.");
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md font-semibold text-xs text-white bg-[#C02D1D] hover:bg-[#a62416] transition-colors shadow-xs"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>
                  {isDeleting ? "Excluindo..." : "Excluir permanentemente"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
