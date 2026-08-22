"use client";

import { Breadcrumbs } from "./Breadcrumbs";
import { useDocuments } from "@/contexts/DocumentsContext";
import type {
  AdminDocument,
  DocCategory,
} from "@/types/document";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState } from "react";

const CATEGORIES: DocCategory[] = [
  "Prestação de Contas",
  "Relatório de Atividades",
  "Plano de Trabalho",
  "Ata de Reunião",
  "Edital",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => CURRENT_YEAR - i);

interface DocumentFormProps {
  initialDocument?: AdminDocument;
}

export function DocumentForm({ initialDocument }: DocumentFormProps) {
  const router = useRouter();
  const { addDocument, updateDocument, deleteAttachment } = useDocuments();
  const mainFileRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(initialDocument);

  const [title, setTitle] = useState(initialDocument?.title || "");
  const [category, setCategory] = useState<DocCategory>(
    initialDocument?.category || CATEGORIES[0],
  );
  const [year, setYear] = useState<number>(
    initialDocument?.year || CURRENT_YEAR,
  );
  const [description, setDescription] = useState(
    initialDocument?.description || "",
  );
  const [status, setStatus] = useState<"published" | "draft">(
    initialDocument?.status || "published",
  );

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const inputStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 14,
    background: "#f5eedd",
    border: "1px solid #d4c9b6",
    color: "#121212",
  };

  const onFocus = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    e.target.style.borderColor = "#121212";
  };

  const onBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    e.target.style.borderColor = "#d4c9b6";
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isEditing && !mainFile) return;

    setLoading(true);
    setSuccessMsg("");

    try {
      if (isEditing && initialDocument) {
        await updateDocument(
          initialDocument.id,
          { title, category, year, description, status },
          mainFile ? [mainFile] : undefined,
        );
        setSuccessMsg("Documento atualizado com sucesso!");
      } else {
        await addDocument({
          title,
          category,
          year,
          description,
          status,
          fileName: mainFile?.name || "documento.pdf",
          fileSize: mainFile ? `${(mainFile.size / 1024).toFixed(0)} KB` : "0 KB",
          fileType: mainFile?.name.toLowerCase().endsWith(".xlsx")
            ? "XLSX"
            : mainFile?.name.toLowerCase().endsWith(".doc") ||
                mainFile?.name.toLowerCase().endsWith(".docx")
              ? "DOC"
              : "PDF",
          file: mainFile || undefined,
        });
        setSuccessMsg("Novo documento criado com sucesso!");
      }

      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } catch (err) {
      console.error("Erro ao salvar documento:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#121212] pb-16">
      {/* Header Bar */}
      <header
        className="sticky top-0 z-40 px-4 sm:px-8 py-3 border-b border-[#d4c9b6]"
        style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
      >
        <div className="flex items-center gap-3 min-w-0 max-w-4xl mx-auto">
          <Link
            href="/admin"
            className="flex items-center justify-center w-8 h-8 rounded border border-[#d4c9b6] bg-[#faf7f2] text-[#121212] font-bold hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-colors text-sm shrink-0"
            title="Voltar ao Painel"
          >
            ←
          </Link>
          <div className="flex flex-col gap-0.5 min-w-0">
            <Breadcrumbs
              items={[
                { label: "Admin", href: "/admin" },
                { label: "Transparência", href: "/admin" },
                { label: isEditing ? "Editar Documento" : "Novo Documento" },
              ]}
            />
            <h1
              className="text-base sm:text-lg font-bold text-[#121212] truncate"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {isEditing ? initialDocument?.title : "Criar Novo Relatório"}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {successMsg ? (
          <div className="p-8 rounded-[3px] border border-[#1a7d3c] bg-[#1a7d3c]/10 text-center flex flex-col items-center gap-4 my-8">
            <div className="w-16 h-16 rounded-full bg-[#1a7d3c] text-white flex items-center justify-center text-3xl font-black">
              ✓
            </div>
            <h2
              className="text-2xl font-bold text-[#121212]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {successMsg}
            </h2>
            <p className="text-sm font-medium text-[#3a342f]">
              Redirecionando de volta ao painel administrativo...
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 rounded-[3px] border border-[#d4c9b6] flex flex-col gap-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#e8d5b4]">
              <span
                className="text-xs font-extrabold text-[#c87d00] uppercase tracking-wider"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                📋 DADOS PRINCIPAIS DO DOCUMENTO
              </span>
              <span className="text-xs text-[#8c8077] font-medium">
                * Campos obrigatórios
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="doc-title"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: "1px",
                  color: "#3a342f",
                }}
              >
                TÍTULO DO DOCUMENTO / RELATÓRIO *
              </label>
              <input
                id="doc-title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Relatório Anual de Atividades Culturais 2025"
                className="w-full px-4 py-3 rounded-[3px] outline-none text-base font-medium"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            {/* Category & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="doc-category"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "1px",
                    color: "#3a342f",
                  }}
                >
                  CATEGORIA *
                </label>
                <select
                  id="doc-category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value as DocCategory)}
                  className="w-full px-4 py-3 rounded-[3px] outline-none cursor-pointer text-base"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="doc-year"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "1px",
                    color: "#3a342f",
                  }}
                >
                  ANO DE EXERCÍCIO *
                </label>
                <select
                  id="doc-year"
                  required
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-[3px] outline-none cursor-pointer text-base"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="doc-description"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: "1px",
                  color: "#3a342f",
                }}
              >
                DESCRIÇÃO / RESUMO EXECUTIVO (OPCIONAL)
              </label>
              <textarea
                id="doc-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva brevemente o conteúdo deste documento, objetivo ou termo de fomento correspondente..."
                className="w-full px-4 py-3 rounded-[3px] outline-none resize-none text-sm"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            {/* Main File Box */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="main-file-input"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: "1px",
                  color: "#3a342f",
                }}
              >
                ARQUIVO PRINCIPAL DO RELATÓRIO {isEditing ? "(OPCIONAL SE MANTIVER O ATUAL)" : "*"}
              </label>

              <div
                className="w-full flex flex-col items-center justify-center gap-3 rounded-[3px] py-8 px-4 cursor-pointer transition-colors"
                style={{
                  border: `2px dashed ${mainFile ? "#1a7d3c" : "#d4c9b6"}`,
                  background: mainFile ? "rgba(26,125,60,0.04)" : "#faf7f2",
                }}
                onClick={() => mainFileRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && mainFileRef.current?.click()}
                role="button"
                tabIndex={0}
              >
                <input
                  ref={mainFileRef}
                  id="main-file-input"
                  type="file"
                  accept=".pdf,.xlsx,.doc,.docx"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && setMainFile(e.target.files[0])}
                />

                {mainFile ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📄</span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-base text-[#1a7d3c]">
                        Novo arquivo selecionado: {mainFile.name}
                      </span>
                      <span className="text-xs text-[#8c8077]">
                        {(mainFile.size / 1024).toFixed(0)} KB · Clique para trocar
                      </span>
                    </div>
                  </div>
                ) : isEditing && initialDocument ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📄</span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-base text-[#121212]">
                        Arquivo atual: {initialDocument.fileName} ({initialDocument.fileSize})
                      </span>
                      <span className="text-xs text-[#8c8077]">
                        Clique aqui para substituir por outro PDF / Planilha
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-3xl">📥</span>
                    <span
                      className="font-bold text-sm sm:text-base text-[#121212]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Clique para selecionar ou arraste o arquivo do Relatório (PDF, XLSX, DOC) *
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center justify-between p-4 rounded bg-[#faf7f2] border border-[#d4c9b6]">
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-extrabold text-xs text-[#121212]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  VISIBILIDADE NO PORTAL PÚBLICO
                </span>
                <span className="text-xs text-[#6b5e55]">
                  {status === "published"
                    ? "🟢 Publicado: visível imediatamente para os cidadãos no portal."
                    : "🔴 Rascunho: visível apenas no painel administrativo."}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setStatus(status === "published" ? "draft" : "published")}
                className="relative rounded-full shrink-0 cursor-pointer"
                style={{
                  width: 48,
                  height: 26,
                  background: status === "published" ? "#1a7d3c" : "#d4c9b6",
                  border: "1px solid #121212",
                }}
              >
                <span
                  className="absolute top-0.5 rounded-full bg-white transition-all"
                  style={{
                    width: 18,
                    height: 18,
                    left: status === "published" ? "calc(100% - 22px)" : 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                />
              </button>
            </div>

            {/* Invoices List Section when Editing */}
            {isEditing && initialDocument && (
              <div className="flex flex-col gap-4 pt-4 border-t border-[#e8d5b4]">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🧾</span>
                    <h3
                      className="text-base font-bold text-[#121212]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Notas Fiscais e Comprovantes Vinculados ({initialDocument.attachments?.length || 0})
                    </h3>
                  </div>

                  <Link
                    href={`/admin/documento/${initialDocument.id}/notas/nova`}
                    className="px-3.5 py-1.5 rounded font-extrabold text-xs bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white transition-all"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    + ADICIONAR NOTA FISCAL
                  </Link>
                </div>

                {initialDocument.attachments && initialDocument.attachments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                    {initialDocument.attachments.map((att) => (
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
                            href={`/admin/documento/${initialDocument.id}/notas/${att.id}/editar`}
                            className="flex-1 py-1.5 text-center text-xs font-bold rounded bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white transition-colors"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            ✏️ EDITAR DADOS
                          </Link>
                          <button
                            type="button"
                            onClick={() => deleteAttachment(att.id)}
                            className="px-3 py-1.5 text-xs font-bold text-[#dd341f] hover:underline cursor-pointer"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#8c8077] italic py-2">
                    Nenhuma nota fiscal ou recibo associado a este documento. Clique em "+ ADICIONAR NOTA FISCAL" para incluir.
                  </p>
                )}
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#e8d5b4]">
              <Link
                href="/admin"
                className="flex-1 py-3 text-center rounded text-xs font-bold text-[#6b5e55] border border-[#d4c9b6] bg-white hover:border-[#121212] hover:text-[#121212] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                CANCELAR
              </Link>
              <button
                type="submit"
                disabled={loading || (!isEditing && !mainFile)}
                className="flex-1 py-3 rounded font-bold text-sm text-[#121212] bg-[#f8ba01] border border-[#121212] cursor-pointer hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {loading
                  ? "SALVANDO..."
                  : isEditing
                    ? "SALVAR ALTERAÇÕES"
                    : "CRIAR E PUBLICAR DOCUMENTO"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
