"use client";

import type { AttachmentUploadPayload, DocumentAttachment, ExpenseCategory } from "@/types/document";
import { type FormEvent, useRef, useState } from "react";

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Cachê Artístico & Arte-Educadores",
  "Alimentação",
  "Transporte & Logística",
  "Material Didático & Consumo",
  "Sonorização & Equipamentos",
  "Serviços Terceiros (PJ/PF)",
  "Despesas Operacionais & Sede",
  "Outros",
];

interface AddInvoiceModalProps {
  documentTitle?: string;
  initialAttachment?: DocumentAttachment;
  onAdd?: (payload: AttachmentUploadPayload) => void;
  onSave?: (payload: Partial<AttachmentUploadPayload> & { file?: File }) => void;
  onClose: () => void;
}

export function AddInvoiceModal({
  documentTitle,
  initialAttachment,
  onAdd,
  onSave,
  onClose,
}: AddInvoiceModalProps) {
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
  const [dragging, setDragging] = useState(false);

  // Helper mask for CPF / CNPJ
  const handleDocChange = (val: string) => {
    const digits = val.replace(/\D/g, "");
    if (docType === "PJ") {
      // Mask CNPJ: 00.000.000/0001-00
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
      // Mask CPF: 000.000.000-00
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isEditing && !file) return;

    // Parse numeric amount
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

    if (onSave) {
      onSave(payload);
    } else if (onAdd && file) {
      onAdd(payload as AttachmentUploadPayload);
    }

    onClose();
  }

  const inputStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 14,
    background: "#fdfaf3",
    border: "1.5px solid #d4c9b6",
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto py-6"
      style={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <div
        className="w-full max-w-[640px] my-auto rounded-[4px] overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          background: "#ffffff",
          border: "1.5px solid #121212",
          boxShadow: "6px 6px 0px #121212",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ background: "#f8ba01", borderBottom: "1.5px solid #121212" }}
        >
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 20,
                color: "#121212",
                letterSpacing: "0.5px",
                lineHeight: 1.1,
              }}
            >
              {isEditing ? "✏️ EDITAR NOTA FISCAL / COMPROVANTE" : "🧾 ADICIONAR NOTA FISCAL / COMPROVANTE"}
            </span>
            {documentTitle && (
              <span
                className="text-xs font-semibold text-[#121212]/80 truncate max-w-[400px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                VINCULADO A: {documentTitle}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded border border-[#121212] bg-white text-[#121212] font-black cursor-pointer hover:bg-[#121212] hover:text-[#f8ba01] transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 sm:p-6 overflow-y-auto min-h-0 flex-1">
          {/* File Upload Box */}
          <button
            type="button"
            className="w-full flex flex-col items-center justify-center gap-2 rounded-[3px] py-5 px-4 cursor-pointer transition-colors"
            style={{
              border: `2px dashed ${dragging ? "#121212" : file ? "#1a7d3c" : "#d4c9b6"}`,
              background: dragging
                ? "rgba(248,186,1,0.08)"
                : file
                  ? "rgba(26,125,60,0.04)"
                  : "#faf7f2",
            }}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files[0];
              if (f) setFile(f);
            }}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.xlsx,.doc,.docx"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
            />
            {file ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div className="flex flex-col text-left">
                  <span
                    className="font-bold text-sm text-[#1a7d3c] truncate max-w-[340px]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Novo arquivo: {file.name}
                  </span>
                  <span
                    className="text-xs text-[#8c8077]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {(file.size / 1024).toFixed(0)} KB · Clique para trocar o arquivo
                  </span>
                </div>
              </div>
            ) : initialAttachment ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div className="flex flex-col text-left">
                  <span
                    className="font-bold text-sm text-[#121212] truncate max-w-[340px]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Arquivo anexado: {initialAttachment.name}
                  </span>
                  <span
                    className="text-xs text-[#8c8077]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Clique aqui para substituir o arquivo (opcional)
                  </span>
                </div>
              </div>
            ) : (
              <>
                <span className="text-2xl">📥</span>
                <span
                  className="font-bold text-xs sm:text-sm text-[#6b5e55]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Arraste a Nota Fiscal / Recibo ou clique para selecionar *
                </span>
                <span
                  className="text-[11px] text-[#9a8f86]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  PDF, Imagem, XLSX ou DOC (máx 20MB)
                </span>
              </>
            )}
          </button>

          {/* Person Type & Favorecido */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1 sm:col-span-1">
              <label
                htmlFor="doc-type-select"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 10,
                  letterSpacing: "1px",
                  color: "#3a342f",
                }}
              >
                TIPO DE FAVORECIDO *
              </label>
              <div className="flex rounded-[3px] overflow-hidden border border-[#d4c9b6] p-0.5 bg-[#faf7f2]">
                <button
                  type="button"
                  onClick={() => {
                    setDocType("PJ");
                    setIssuerDoc("");
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold transition-colors ${
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
                  className={`flex-1 py-1.5 text-xs font-bold transition-colors ${
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

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label
                htmlFor="issuer-name"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 10,
                  letterSpacing: "1px",
                  color: "#3a342f",
                }}
              >
                FAVORECIDO / RAZÃO SOCIAL *
              </label>
              <input
                id="issuer-name"
                required
                value={issuerName}
                onChange={(e) => setIssuerName(e.target.value)}
                placeholder={docType === "PJ" ? "Ex: Oficina Som & Ritmo LTDA" : "Ex: Mestre João da Percussão"}
                className="w-full px-3 py-2 rounded-[3px] outline-none"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          </div>

          {/* CPF/CNPJ & Invoice Number & Issue Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="issuer-doc"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 10,
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
                className="w-full px-3 py-2 rounded-[3px] outline-none"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="invoice-number"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 10,
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
                className="w-full px-3 py-2 rounded-[3px] outline-none"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="issue-date"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 10,
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
                className="w-full px-3 py-2 rounded-[3px] outline-none"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          </div>

          {/* Amount & Expense Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="amount-raw"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 10,
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
                className="w-full px-3 py-2 rounded-[3px] outline-none font-bold text-[#1a7d3c]"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="expense-type-select"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 10,
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
                className="w-full px-3 py-2 rounded-[3px] outline-none cursor-pointer"
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

          {/* Description / Items */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="invoice-desc"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 10,
                letterSpacing: "1px",
                color: "#3a342f",
              }}
            >
              DETALHAMENTO DOS ITENS OU SERVIÇOS PRESTADOS (OPCIONAL)
            </label>
            <textarea
              id="invoice-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Ref. à prestação de serviços de instrutor de percussão para a oficina comunitária de jovens."
              className="w-full px-3 py-2 rounded-[3px] outline-none resize-none text-xs"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center gap-3 pt-3 mt-1 border-t border-[#e8d5b4]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-[3px] font-bold text-xs text-[#6b5e55] border-2 border-[#d4c9b6] cursor-pointer hover:border-[#121212] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              CANCELAR
            </button>

            <button
              type="submit"
              disabled={!isEditing && !file ? true : !issuerName || !issuerDoc || !invoiceNumber || !amountRaw}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[3px] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 15,
                letterSpacing: "0.5px",
                color: (!isEditing && !file) || !issuerName || !issuerDoc || !invoiceNumber || !amountRaw ? "#9a8f86" : "#121212",
                background: (!isEditing && !file) || !issuerName || !issuerDoc || !invoiceNumber || !amountRaw ? "#e8d5b4" : "#f8ba01",
                border: "2px solid #121212",
                boxShadow: (!isEditing && !file) || !issuerName || !issuerDoc || !invoiceNumber || !amountRaw ? "none" : "3px 3px 0px #121212",
              }}
            >
              {isEditing ? "SALVAR ALTERAÇÕES DA NOTA" : "SALVAR NOTA FISCAL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
