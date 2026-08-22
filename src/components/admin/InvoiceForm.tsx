"use client";

import { Breadcrumbs } from "./Breadcrumbs";
import { EXPENSE_CATEGORIES } from "@/components/admin/AddInvoiceModal";
import { useDocuments } from "@/contexts/DocumentsContext";
import type {
  AdminDocument,
  AttachmentUploadPayload,
  DocumentAttachment,
  ExpenseCategory,
} from "@/types/document";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState } from "react";

interface InvoiceFormProps {
  document: AdminDocument;
  initialAttachment?: DocumentAttachment;
}

export function InvoiceForm({ document: doc, initialAttachment }: InvoiceFormProps) {
  const router = useRouter();
  const { addAttachment, updateAttachment } = useDocuments();
  const fileRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(initialAttachment);

  const [docType, setDocType] = useState<"PJ" | "PF">(
    initialAttachment?.issuerDoc && initialAttachment.issuerDoc.length <= 14 ? "PF" : "PJ",
  );
  const [issuerName, setIssuerName] = useState(initialAttachment?.issuerName || "");
  const [issuerDoc, setIssuerDoc] = useState(initialAttachment?.issuerDoc || "");
  const [invoiceNumber, setInvoiceNumber] = useState(initialAttachment?.invoiceNumber || "");
  const [amountRaw, setAmountRaw] = useState(
    initialAttachment?.amount !== null && initialAttachment?.amount !== undefined
      ? String(initialAttachment.amount)
      : "",
  );
  const [issueDate, setIssueDate] = useState(
    initialAttachment?.issueDate || new Date().toISOString().split("T")[0],
  );
  const [expenseType, setExpenseType] = useState<ExpenseCategory>(
    (initialAttachment?.expenseType as ExpenseCategory) || EXPENSE_CATEGORIES[0],
  );
  const [description, setDescription] = useState(initialAttachment?.description || "");
  const [file, setFile] = useState<File | null>(null);
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

  const handleDocChange = (val: string) => {
    const digits = val.replace(/\D/g, "");
    if (docType === "PJ") {
      let masked = digits.slice(0, 14);
      if (masked.length > 12) {
        masked = masked.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})$/, "$1.$2.$3/$4-$5");
      } else if (masked.length > 8) {
        masked = masked.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4})$/, "$1.$2.$3/$4");
      } else if (masked.length > 5) {
        masked = masked.replace(/^(\d{2})(\d{3})(\d{1,3})$/, "$1.$2.$3");
      } else if (masked.length > 2) {
        masked = masked.replace(/^(\d{2})(\d{1,3})$/, "$1.$2");
      }
      setIssuerDoc(masked);
    } else {
      let masked = digits.slice(0, 11);
      if (masked.length > 9) {
        masked = masked.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
      } else if (masked.length > 6) {
        masked = masked.replace(/^(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
      } else if (masked.length > 3) {
        masked = masked.replace(/^(\d{3})(\d{1,3})$/, "$1.$2");
      }
      setIssuerDoc(masked);
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isEditing && !file) return;

    setLoading(true);
    setSuccessMsg("");

    const cleanAmount = amountRaw.replace(/[^\d.,]/g, "").replace(",", ".");
    const parsedAmount = Number.parseFloat(cleanAmount);

    const payload = {
      file: file || undefined,
      issuerName: issuerName.trim() || undefined,
      issuerDoc: issuerDoc.trim() || undefined,
      invoiceNumber: invoiceNumber.trim() || undefined,
      amount: Number.isNaN(parsedAmount) ? undefined : parsedAmount,
      issueDate: issueDate || undefined,
      expenseType: expenseType || undefined,
      description: description.trim() || undefined,
    };

    try {
      if (isEditing && initialAttachment) {
        await updateAttachment(initialAttachment.id, payload);
        setSuccessMsg("Nota Fiscal / Comprovante atualizado com sucesso!");
      } else {
        await addAttachment(doc.id, payload as AttachmentUploadPayload);
        setSuccessMsg("Nota Fiscal cadastrada com sucesso!");
      }

      setTimeout(() => {
        router.push(`/admin/documento/${doc.id}/editar`);
      }, 1000);
    } catch (err) {
      console.error("Erro ao salvar nota fiscal:", err);
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
        <div className="flex items-center gap-3 min-w-0 max-w-3xl mx-auto">
          <Link
            href={`/admin/documento/${doc.id}/editar`}
            className="flex items-center justify-center w-8 h-8 rounded border border-[#d4c9b6] bg-[#faf7f2] text-[#121212] font-bold hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-colors text-sm shrink-0"
            title="Voltar ao Documento"
          >
            ←
          </Link>
          <div className="flex flex-col gap-0.5 min-w-0">
            <Breadcrumbs
              items={[
                { label: "Admin", href: "/admin" },
                { label: doc.title, href: `/admin/documento/${doc.id}/editar` },
                { label: isEditing ? "Editar Comprovante" : "Incluir Comprovante" },
              ]}
            />
            <h1
              className="text-base sm:text-lg font-bold text-[#121212] truncate"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {isEditing ? initialAttachment?.name : "Incluir Nota Fiscal / Recibo"}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
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
              Redirecionando de volta ao documento...
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
                🧾 DADOS DA NOTA FISCAL / RECIBO DE PAGAMENTO
              </span>
              <span className="text-xs text-[#8c8077] font-medium">
                * Campos obrigatórios
              </span>
            </div>

            {/* File Upload Box */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="invoice-file-input"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: "1px",
                  color: "#3a342f",
                }}
              >
                ARQUIVO DO COMPROVANTE {isEditing ? "(OPCIONAL SE MANTIVER O ATUAL)" : "*"}
              </label>

              <div
                className="w-full flex flex-col items-center justify-center gap-3 rounded-[3px] py-6 px-4 cursor-pointer transition-colors"
                style={{
                  border: `2px dashed ${file ? "#1a7d3c" : "#d4c9b6"}`,
                  background: file ? "rgba(26,125,60,0.04)" : "#faf7f2",
                }}
                onClick={() => fileRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
                role="button"
                tabIndex={0}
              >
                <input
                  ref={fileRef}
                  id="invoice-file-input"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.xlsx,.doc,.docx"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
                />

                {file ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📄</span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-base text-[#1a7d3c]">
                        Novo arquivo: {file.name}
                      </span>
                      <span className="text-xs text-[#8c8077]">
                        {(file.size / 1024).toFixed(0)} KB · Clique para trocar
                      </span>
                    </div>
                  </div>
                ) : isEditing && initialAttachment ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📄</span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-base text-[#121212]">
                        Arquivo anexado: {initialAttachment.name} ({initialAttachment.fileSize})
                      </span>
                      <span className="text-xs text-[#8c8077]">
                        Clique para substituir o comprovante (opcional)
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-3xl">📥</span>
                    <span
                      className="font-bold text-sm text-[#121212]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Clique para selecionar a Nota Fiscal / Recibo (PDF, PNG, JPG, DOC) *
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Favorecido & Document Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5 sm:col-span-1">
                <label
                  htmlFor="favorecido-type-btn"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "1px",
                    color: "#3a342f",
                  }}
                >
                  TIPO DE FAVORECIDO *
                </label>
                <div id="favorecido-type-btn" className="flex rounded border border-[#d4c9b6] p-1 bg-[#faf7f2]">
                  <button
                    type="button"
                    onClick={() => {
                      setDocType("PJ");
                      setIssuerDoc("");
                    }}
                    className={`flex-1 py-2 text-xs font-extrabold rounded transition-colors ${
                      docType === "PJ"
                        ? "bg-[#121212] text-[#f8ba01]"
                        : "text-[#6b5e55] hover:text-[#121212]"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    PJ (CNPJ)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDocType("PF");
                      setIssuerDoc("");
                    }}
                    className={`flex-1 py-2 text-xs font-extrabold rounded transition-colors ${
                      docType === "PF"
                        ? "bg-[#121212] text-[#f8ba01]"
                        : "text-[#6b5e55] hover:text-[#121212]"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    PF (CPF)
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label
                  htmlFor="issuer-name"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "1px",
                    color: "#3a342f",
                  }}
                >
                  NOME DO FAVORECIDO / RAZÃO SOCIAL *
                </label>
                <input
                  id="issuer-name"
                  required
                  value={issuerName}
                  onChange={(e) => setIssuerName(e.target.value)}
                  placeholder={docType === "PJ" ? "Ex: Oficina Som & Ritmo LTDA" : "Ex: Mestre João da Percussão"}
                  className="w-full px-4 py-3 rounded-[3px] outline-none text-base"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            </div>

            {/* CPF/CNPJ, Invoice Number, Payment Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="issuer-doc"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "1px",
                    color: "#3a342f",
                  }}
                >
                  {docType === "PJ" ? "CNPJ DO FAVORECIDO *" : "CPF DO FAVORECIDO *"}
                </label>
                <input
                  id="issuer-doc"
                  required
                  value={issuerDoc}
                  onChange={(e) => handleDocChange(e.target.value)}
                  placeholder={docType === "PJ" ? "00.000.000/0001-00" : "000.000.000-00"}
                  className="w-full px-4 py-3 rounded-[3px] outline-none font-mono text-base"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="invoice-number"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "1px",
                    color: "#3a342f",
                  }}
                >
                  Nº DA NF / RECIBO *
                </label>
                <input
                  id="invoice-number"
                  required
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="Ex: NF-2025/084"
                  className="w-full px-4 py-3 rounded-[3px] outline-none text-base font-bold"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="issue-date"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "1px",
                    color: "#3a342f",
                  }}
                >
                  DATA DO PAGAMENTO *
                </label>
                <input
                  id="issue-date"
                  type="date"
                  required
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-[3px] outline-none text-base"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            </div>

            {/* Amount & Expense Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="amount-raw"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "1px",
                    color: "#3a342f",
                  }}
                >
                  VALOR DO COMPROVANTE (R$) *
                </label>
                <input
                  id="amount-raw"
                  required
                  value={amountRaw}
                  onChange={(e) => setAmountRaw(e.target.value)}
                  placeholder="Ex: 1.500,00"
                  className="w-full px-4 py-3 rounded-[3px] outline-none font-bold text-lg text-[#1a7d3c]"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="expense-type-select"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "1px",
                    color: "#3a342f",
                  }}
                >
                  RUBRICA / CATEGORIA DE DESPESA *
                </label>
                <select
                  id="expense-type-select"
                  required
                  value={expenseType}
                  onChange={(e) => setExpenseType(e.target.value as ExpenseCategory)}
                  className="w-full px-4 py-3 rounded-[3px] outline-none cursor-pointer text-base"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                >
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Items detail */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="invoice-desc"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: "1px",
                  color: "#3a342f",
                }}
              >
                DETALHAMENTO DOS ITENS OU SERVIÇOS PRESTADOS (OPCIONAL)
              </label>
              <textarea
                id="invoice-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Ref. à prestação de serviços de instrutor de percussão para as oficinas culturais..."
                className="w-full px-4 py-3 rounded-[3px] outline-none resize-none text-sm"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#e8d5b4]">
              <Link
                href={`/admin/documento/${doc.id}/editar`}
                className="flex-1 py-3 text-center rounded text-xs font-bold text-[#6b5e55] border border-[#d4c9b6] bg-white hover:border-[#121212] hover:text-[#121212] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                CANCELAR
              </Link>

              <button
                type="submit"
                disabled={loading || (!isEditing && !file) || !issuerName || !issuerDoc || !invoiceNumber || !amountRaw}
                className="flex-1 py-3 rounded font-bold text-sm text-[#121212] bg-[#f8ba01] border border-[#121212] cursor-pointer hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {loading
                  ? "SALVANDO..."
                  : isEditing
                    ? "SALVAR ALTERAÇÕES DA NOTA"
                    : "SALVAR NOTA FISCAL"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
