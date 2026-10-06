"use client";

import { useDocuments } from "@/contexts/DocumentsContext";
import { getAttachmentDownloadUrl } from "@/lib/api";
import type { DocumentAttachment, ExpenseCategory } from "@/types/document";
import {
  ChevronDown,
  Download,
  Link as LinkIcon,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FileUploadDropzone } from "./FileUploadDropzone";

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Cachê Artístico & Arte-Educadores",
  "Alimentação",
  "Transporte & Logística",
  "Material Didático & Consumo",
  "Sonorização & Equipamentos",
  "Serviços Terceiros (PJ/PF)",
  "Despesas Operacionais & Sede",
  "Outros",
];

export function InvoicesManagementView() {
  const {
    invoices,
    documents,
    loading,
    addAttachment,
    updateAttachment,
    linkAttachment,
    deleteAttachment,
    uploadPublicFile,
  } = useDocuments();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [linkFilter, setLinkFilter] = useState<"all" | "linked" | "unlinked">(
    "all",
  );

  // Modal states
  const [showNewModal, setShowNewModal] = useState(false);
  const [editInvoice, setEditInvoice] = useState<DocumentAttachment | null>(
    null,
  );
  const [linkTargetInvoice, setLinkTargetInvoice] =
    useState<DocumentAttachment | null>(null);
  const [publicTargetInvoice, setPublicTargetInvoice] =
    useState<DocumentAttachment | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    issuerName: "",
    issuerDoc: "",
    invoiceNumber: "",
    amount: "",
    issueDate: "",
    expenseType: "Outros" as ExpenseCategory,
    description: "",
    documentId: "",
    isPublicSafe: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [publicFile, setPublicFile] = useState<File | null>(null);

  // Public upload modal file
  const [selectedPublicFile, setSelectedPublicFile] = useState<File | null>(
    null,
  );

  const filtered = invoices.filter((inv) => {
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      inv.issuerName?.toLowerCase().includes(q) ||
      inv.issuerDoc?.toLowerCase().includes(q) ||
      inv.invoiceNumber?.toLowerCase().includes(q) ||
      inv.name.toLowerCase().includes(q) ||
      inv.description?.toLowerCase().includes(q);

    const matchCat =
      categoryFilter === "all" || inv.expenseType === categoryFilter;
    const matchLink =
      linkFilter === "all" ||
      (linkFilter === "linked" && Boolean(inv.documentId)) ||
      (linkFilter === "unlinked" && !inv.documentId);

    return matchSearch && matchCat && matchLink;
  });

  const totalAmount = filtered.reduce((acc, inv) => acc + (inv.amount || 0), 0);
  const unlinkedCount = invoices.filter((i) => !i.documentId).length;

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#222222] pb-16">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-[#E3DCCF] px-4 sm:px-8 lg:px-12 py-7">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1
              className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight leading-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Comprovantes & Notas Fiscais
            </h1>
            <p
              className="text-xs sm:text-sm text-[#756F67]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Gerencie os comprovantes e notas fiscais utilizados nas prestações
              de contas.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setFormData({
                issuerName: "",
                issuerDoc: "",
                invoiceNumber: "",
                amount: "",
                issueDate: "",
                expenseType: "Outros",
                description: "",
                documentId: "",
                isPublicSafe: false,
              });
              setFile(null);
              setPublicFile(null);
              setShowNewModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] transition-colors shadow-xs self-start sm:self-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Plus className="w-4 h-4" />
            <span>Novo Comprovante</span>
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
              placeholder="Buscar por favorecido, CPF/CNPJ ou nº da nota..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] placeholder-[#756F67] focus:outline-none focus:border-[#F5B900] focus:bg-white transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Select Categoria com Caret Down devidamente espaçado */}
            <div className="relative inline-flex items-center">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 text-xs font-medium rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900] cursor-pointer transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <option value="all">Todas as Categorias</option>
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
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
                <option value="linked">Vinculadas a Relatório</option>
                <option value="unlinked">
                  Avulsas / Não Vinculadas ({unlinkedCount})
                </option>
              </select>
              <ChevronDown
                className="w-3.5 h-3.5 text-[#756F67] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>

            {(search || categoryFilter !== "all" || linkFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("all");
                  setLinkFilter("all");
                }}
                className="px-3 py-2 text-xs font-medium rounded-md text-[#756F67] hover:text-[#222222] hover:bg-[#FAF7F2] border border-[#E3DCCF] transition-colors"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* ── Summary Line ── */}
        <div className="flex items-center justify-between text-xs text-[#756F67] px-1">
          <span>
            Exibindo <strong>{filtered.length}</strong> de {invoices.length}{" "}
            comprovantes
          </span>
          <span>
            Total listado:{" "}
            <strong className="text-[#1A7D3C]">
              R${" "}
              {totalAmount.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </strong>
          </span>
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white rounded-lg border border-[#E3DCCF] shadow-xs overflow-hidden flex flex-col">
          {loading ? (
            <div className="py-20 text-center text-xs text-[#756F67]">
              Carregando notas fiscais...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 px-6 text-center flex flex-col items-center justify-center gap-3">
              <span className="text-3xl">🧾</span>
              <h3 className="text-base font-semibold text-[#222222]">
                Nenhumo comprovate encontrada
              </h3>
              <p className="text-xs text-[#756F67] max-w-sm">
                Cadastre novos notas fiscais de forma autônoma para vinculá-las
                posteriormente a relatórios.
              </p>
              <button
                type="button"
                onClick={() => setShowNewModal(true)}
                className="mt-2 px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
              >
                + Novo Comprovante
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E3DCCF] bg-[#FAF7F2] text-[11px] font-semibold text-[#756F67] uppercase tracking-wider">
                    <th className="py-3 px-4">Favorecido / Documento</th>
                    <th className="py-3 px-4">Nº / Categoria</th>
                    <th className="py-3 px-4">Data</th>
                    <th className="py-3 px-4">Valor</th>
                    <th className="py-3 px-4">Relatório Vinculado</th>
                    <th className="py-3 px-4">Versão Pública LGPD</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3DCCF] text-xs">
                  {filtered.map((inv) => {
                    const linkedReport = documents.find(
                      (d) => d.id === inv.documentId,
                    );

                    return (
                      <tr
                        key={inv.id}
                        className="hover:bg-[#FAF7F2] transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col gap-0.5 min-w-[180px]">
                            <span className="font-semibold text-[#222222]">
                              {inv.issuerName || inv.name}
                            </span>
                            {inv.issuerDoc && (
                              <span className="text-[11px] font-mono text-[#756F67]">
                                Doc: {inv.issuerDoc}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-mono font-medium text-[#222222]">
                              {inv.invoiceNumber
                                ? `#${inv.invoiceNumber}`
                                : "S/N"}
                            </span>
                            <span className="text-[11px] text-[#756F67]">
                              {inv.expenseType || "Outros"}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-[#756F67] whitespace-nowrap">
                          {inv.issueDate
                            ? new Date(inv.issueDate).toLocaleDateString(
                                "pt-BR",
                              )
                            : "—"}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-[#1A7D3C]">
                          R${" "}
                          {(inv.amount || 0).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
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
                              Avulsa / Não vinculada
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {inv.hasPublicFile ? (
                            <span className="text-[11px] text-[#1A7D3C] font-semibold flex items-center gap-1">
                              ✓ Higienizado
                            </span>
                          ) : (
                            <span
                              className="text-[11px] text-[#756F67] italic"
                              title="Apenas arquivo original (não visível publicamente no portal)"
                            >
                              ⚠️ Sem público
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <a
                              href={getAttachmentDownloadUrl(inv.id)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md text-[#756F67] hover:text-[#222222] hover:bg-white border border-transparent hover:border-[#E3DCCF] transition-colors"
                              title="Baixar comprovante"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </a>

                            <button
                              type="button"
                              onClick={() => {
                                setPublicTargetInvoice(inv);
                                setSelectedPublicFile(null);
                              }}
                              className="p-1.5 rounded-md text-[#756F67] hover:text-[#222222] hover:bg-white border border-transparent hover:border-[#E3DCCF] transition-colors"
                              title="Configurar arquivo público sanitizado LGPD"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-[#1A7D3C]" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setLinkTargetInvoice(inv)}
                              className="p-1.5 rounded-md text-[#756F67] hover:text-[#222222] hover:bg-white border border-transparent hover:border-[#E3DCCF] transition-colors"
                              title="Vincular ou alterar relatório"
                            >
                              <LinkIcon className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setEditInvoice(inv)}
                              className="p-1.5 rounded-md text-[#756F67] hover:text-[#222222] hover:bg-white border border-transparent hover:border-[#E3DCCF] transition-colors"
                              title="Editar comprovante"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={async () => {
                                if (
                                  confirm(
                                    "Deseja realmente excluir esta comprovante?",
                                  )
                                ) {
                                  await deleteAttachment(inv.id);
                                }
                              }}
                              className="p-1.5 rounded-md text-[#756F67] hover:text-[#C02D1D] hover:bg-[#FDF2F0] border border-transparent hover:border-[#FADCD7] transition-colors"
                              title="Excluir comprovante"
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

      {/* ── MODAL: NOVO COMPROVANTE (AUTÔNOMA OU VINCULADA) ── */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3DCCF]">
              <h3 className="text-base font-semibold text-[#222222]">
                Cadastrar Novo Comprovante
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowNewModal(false);
                  setFile(null);
                  setPublicFile(null);
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
                  alert("Selecione o arquivo da comprovante");
                  return;
                }
                await addAttachment(formData.documentId || null, {
                  file,
                  publicFile: publicFile || undefined,
                  attachmentType: "invoice",
                  issuerName: formData.issuerName,
                  issuerDoc: formData.issuerDoc,
                  invoiceNumber: formData.invoiceNumber,
                  amount: formData.amount ? Number(formData.amount) : undefined,
                  issueDate: formData.issueDate,
                  expenseType: formData.expenseType,
                  description: formData.description,
                  isPublicSafe: formData.isPublicSafe,
                });
                setShowNewModal(false);
                setFile(null);
                setPublicFile(null);
              }}
              className="flex flex-col gap-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-[#222222] mb-1">
                  Vincular a um Relatório (Opcional)
                </label>
                <select
                  value={formData.documentId}
                  onChange={(e) =>
                    setFormData({ ...formData, documentId: e.target.value })
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

              <div>
                <label className="block text-xs font-semibold text-[#222222] mb-1">
                  Nome do Favorecido *
                </label>
                <input
                  type="text"
                  required
                  value={formData.issuerName}
                  onChange={(e) =>
                    setFormData({ ...formData, issuerName: e.target.value })
                  }
                  placeholder="Ex: Giselle Hoekveld ou Gráfica Express LTDA"
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    CPF ou CNPJ (Uso Interno)
                  </label>
                  <input
                    type="text"
                    value={formData.issuerDoc}
                    onChange={(e) =>
                      setFormData({ ...formData, issuerDoc: e.target.value })
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
                    value={formData.invoiceNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
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
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="Ex: 1500.00"
                    className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Categoria da Despesa
                  </label>
                  <select
                    value={formData.expenseType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expenseType: e.target.value as ExpenseCategory,
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                  >
                    {EXPENSE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#222222] mb-1">
                  Data de Emissão / Pagamento
                </label>
                <input
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, issueDate: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                />
              </div>

              <FileUploadDropzone
                label="Arquivo Original da Nota (PDF / Imagem)"
                required
                accept=".pdf,.png,.jpg,.jpeg,.xlsx,.doc,.docx"
                formatsHint="PDF, PNG, JPG, XLSX ou DOC"
                maxSizeMB={20}
                file={file}
                onFileChange={setFile}
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
                  file={publicFile}
                  onFileChange={setPublicFile}
                  compact
                />
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={formData.isPublicSafe}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
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
                    setShowNewModal(false);
                    setFile(null);
                    setPublicFile(null);
                  }}
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#756F67] border border-[#E3DCCF] hover:bg-[#FAF7F2]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
                >
                  Salvar Comprovante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: ALTERAR VÍNCULO DE RELATÓRIO ── */}
      {linkTargetInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-md w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3DCCF]">
              <h3 className="text-base font-semibold text-[#222222]">
                Vincular a Relatório
              </h3>
              <button
                type="button"
                onClick={() => setLinkTargetInvoice(null)}
                className="text-[#756F67] hover:text-[#222222] text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#756F67]">
              Selecione a qual relatório de prestação de contas este comprovante
              de{" "}
              <strong>
                {linkTargetInvoice.issuerName || linkTargetInvoice.name}
              </strong>{" "}
              pertence:
            </p>

            <select
              defaultValue={linkTargetInvoice.documentId || ""}
              id="report-select-target"
              className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
            >
              <option value="">Desvinculada / Avulsa</option>
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} (Exercício {d.year})
                </option>
              ))}
            </select>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLinkTargetInvoice(null)}
                className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#756F67] border border-[#E3DCCF] hover:bg-[#FAF7F2]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={async () => {
                  const select = document.getElementById(
                    "report-select-target",
                  ) as unknown as HTMLSelectElement | null;
                  const newDocId = select?.value || null;
                  await linkAttachment(linkTargetInvoice.id, newDocId);
                  setLinkTargetInvoice(null);
                }}
                className="px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
              >
                Salvar Vínculo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: UPLOAD ARQUIVO PÚBLICO LGPD ── */}
      {publicTargetInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-md w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3DCCF]">
              <h3 className="text-base font-semibold text-[#222222]">
                Arquivo Público Sanitizado (LGPD)
              </h3>
              <button
                type="button"
                onClick={() => setPublicTargetInvoice(null)}
                className="text-[#756F67] hover:text-[#222222] text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#FAF7F2] p-3 rounded-md border border-[#E3DCCF]">
              <span className="text-xs font-semibold text-[#222222]">
                {publicTargetInvoice.issuerName || publicTargetInvoice.name}
              </span>
              <p className="text-[11px] text-[#756F67] mt-1">
                Envie a versão higienizada sem CPF, dados bancários ou endereços
                pessoais.
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
                  { attachmentId: publicTargetInvoice.id },
                  selectedPublicFile,
                );
                setPublicTargetInvoice(null);
                setSelectedPublicFile(null);
              }}
              className="flex flex-col gap-3"
            >
              <FileUploadDropzone
                label="Arquivo Sanitizado (PDF)"
                sublabel="Documento higienizado com dados pessoais e sigilosos removidos."
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
                  onClick={() => setPublicTargetInvoice(null)}
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#756F67] border border-[#E3DCCF] hover:bg-[#FAF7F2]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
                >
                  Salvar Versão Pública
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: EDITAR DADOS DA COMPROVANTE ── */}
      {editInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full border border-[#E3DCCF] shadow-lg flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3DCCF]">
              <h3 className="text-base font-semibold text-[#222222]">
                Editar Comprovante
              </h3>
              <button
                type="button"
                onClick={() => setEditInvoice(null)}
                className="text-[#756F67] hover:text-[#222222] text-sm"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const issuerName = (
                  form.elements.namedItem(
                    "edit-issuerName",
                  ) as unknown as HTMLInputElement
                ).value;
                const issuerDoc = (
                  form.elements.namedItem(
                    "edit-issuerDoc",
                  ) as unknown as HTMLInputElement
                ).value;
                const invoiceNumber = (
                  form.elements.namedItem(
                    "edit-invoiceNumber",
                  ) as unknown as HTMLInputElement
                ).value;
                const amount = (
                  form.elements.namedItem(
                    "edit-amount",
                  ) as unknown as HTMLInputElement
                ).value;
                const issueDate = (
                  form.elements.namedItem(
                    "edit-issueDate",
                  ) as unknown as HTMLInputElement
                ).value;
                const expenseType = (
                  form.elements.namedItem(
                    "edit-expenseType",
                  ) as unknown as HTMLSelectElement
                ).value;

                await updateAttachment(editInvoice.id, {
                  issuerName,
                  issuerDoc,
                  invoiceNumber,
                  amount: amount ? Number(amount) : undefined,
                  issueDate,
                  expenseType,
                });
                setEditInvoice(null);
              }}
              className="flex flex-col gap-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-[#222222] mb-1">
                  Nome do Favorecido *
                </label>
                <input
                  type="text"
                  name="edit-issuerName"
                  required
                  defaultValue={editInvoice.issuerName || ""}
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    CPF ou CNPJ (Uso Interno)
                  </label>
                  <input
                    type="text"
                    name="edit-issuerDoc"
                    defaultValue={editInvoice.issuerDoc || ""}
                    className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Número do Documento / NF
                  </label>
                  <input
                    type="text"
                    name="edit-invoiceNumber"
                    defaultValue={editInvoice.invoiceNumber || ""}
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
                    name="edit-amount"
                    defaultValue={editInvoice.amount ?? ""}
                    className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Categoria da Despesa
                  </label>
                  <select
                    name="edit-expenseType"
                    defaultValue={editInvoice.expenseType || "Outros"}
                    className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                  >
                    {EXPENSE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#222222] mb-1">
                  Data de Emissão / Pagamento
                </label>
                <input
                  type="date"
                  name="edit-issueDate"
                  defaultValue={editInvoice.issueDate || ""}
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditInvoice(null)}
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#756F67] border border-[#E3DCCF] hover:bg-[#FAF7F2]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
