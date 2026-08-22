"use client";

import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useDocuments } from "@/contexts/DocumentsContext";
import type {
  AdminDocument,
  AttachmentUploadPayload,
  DocCategory,
  DocumentAttachment,
} from "@/types/document";
import { AddInvoiceModal } from "./AddInvoiceModal";
import { getFileDownloadUrl, getFilePreviewUrl } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";

const CATEGORIES: DocCategory[] = [
  "Prestação de Contas",
  "Relatório de Atividades",
  "Plano de Trabalho",
  "Ata de Reunião",
  "Edital",
];

const CATEGORY_COLORS: Record<DocCategory, { bg: string; color: string }> = {
  "Prestação de Contas": { bg: "#dd341f", color: "#fff" },
  "Relatório de Atividades": { bg: "#f8ba01", color: "#121212" },
  "Plano de Trabalho": { bg: "#1a7d3c", color: "#fff" },
  "Ata de Reunião": { bg: "#1d1b18", color: "#f1e5d1" },
  Edital: { bg: "#6b5e55", color: "#fff" },
};

const FILE_COLORS: Record<string, string> = {
  PDF: "#dd341f",
  XLSX: "#1a7d3c",
  DOC: "#1a5fa8",
};
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: CURRENT_YEAR - 2018 },
  (_, i) => CURRENT_YEAR - i,
);

function Badge({ category }: { category: DocCategory }) {
  const { bg, color } = CATEGORY_COLORS[category];
  return (
    <span
      className="px-2 py-0.5 rounded-[2px] shrink-0"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800,
        fontSize: 10,
        letterSpacing: "0.8px",
        background: bg,
        color,
      }}
    >
      {category.toUpperCase()}
    </span>
  );
}

function FileTag({ type }: { type: string }) {
  return (
    <span
      className="flex items-center justify-center rounded-[2px] shrink-0"
      style={{
        width: 36,
        height: 42,
        background: FILE_COLORS[type] ?? "#888",
        border: "2px solid rgba(0,0,0,0.15)",
      }}
    >
      <span
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 10,
          color: "#fff",
        }}
      >
        {type}
      </span>
    </span>
  );
}

function StatusPill({ status }: { status: AdminDocument["status"] }) {
  const on = status === "published";
  return (
    <span
      className="px-2.5 py-1 rounded-full flex items-center gap-1.5"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800,
        fontSize: 10,
        letterSpacing: "0.8px",
        background: on ? "rgba(26,125,60,0.1)" : "rgba(107,94,85,0.08)",
        color: on ? "#1a7d3c" : "#9a8f86",
        border: `1px solid ${on ? "rgba(26,125,60,0.25)" : "rgba(107,94,85,0.2)"}`,
      }}
    >
      <span
        className="rounded-full"
        style={{
          width: 6,
          height: 6,
          background: on ? "#1a7d3c" : "#c9b89a",
        }}
      />
      {on ? "PUBLICADO" : "RASCUNHO"}
    </span>
  );
}

function UploadModal({ onClose }: { onClose: () => void }) {
  const { addDocument } = useDocuments();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0],
    year: CURRENT_YEAR,
    description: "",
    status: "published" as AdminDocument["status"],
  });
  const [file, setFile] = useState<File | null>(null);
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function set(k: string, v: unknown) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const ext = file.name.split(".").pop()?.toUpperCase() ?? "PDF";
    const fileType = (["PDF", "XLSX", "DOC"].includes(ext) ? ext : "PDF") as
      | "PDF"
      | "XLSX"
      | "DOC";
    const size =
      file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(0)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    await addDocument({
      ...form,
      fileType,
      fileSize: size,
      fileName: file.name,
      file,
      attachmentFiles: attachmentFiles.length > 0 ? attachmentFiles : undefined,
    });
    setLoading(false);
    setSuccess(true);
    setTimeout(onClose, 1200);
  }

  const inputStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 14,
    background: "#f5eedd",
    border: "2px solid #d4c9b6",
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
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <div
        className="w-full max-w-[600px] my-auto rounded-[4px] overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          background: "#fff",
          border: "1px solid #d4c9b6",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ background: "#faf7f2", borderBottom: "1px solid #e8d5b4" }}
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 20,
              color: "#121212",
              letterSpacing: "0.5px",
            }}
          >
            NOVO DOCUMENTO
          </span>
          <button type="button" onClick={onClose} style={{ color: "#9a8f86" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              role="img"
              aria-label="Fechar modal"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 overflow-y-auto">
            <div
              className="flex items-center justify-center rounded-full size-16"
              style={{
                background: "rgba(26,125,60,0.1)",
                border: "3px solid #1a7d3c",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a7d3c"
                strokeWidth="2.5"
                strokeLinecap="round"
                role="img"
                aria-label="Sucesso"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 20,
                color: "#121212",
              }}
            >
              DOCUMENTO ADICIONADO!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-6 overflow-y-auto min-h-0 flex-1"
          >
            <button
              type="button"
              className="w-full flex flex-col items-center justify-center gap-3 rounded-[3px] py-8 cursor-pointer"
              style={{
                border: `2px dashed ${dragging ? "#121212" : file ? "#1a7d3c" : "#d4c9b6"}`,
                background: dragging
                  ? "rgba(248,186,1,0.06)"
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
                accept=".pdf,.xlsx,.doc,.docx"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.[0] && setFile(e.target.files[0])
                }
              />
              {file ? (
                <>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1a7d3c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    role="img"
                    aria-label="Arquivo selecionado"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: 14,
                      color: "#1a7d3c",
                    }}
                  >
                    {file.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "#9a8f86",
                    }}
                  >
                    {(file.size / 1024).toFixed(0)} KB · Clique para trocar
                  </p>
                </>
              ) : (
                <>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9a8f86"
                    strokeWidth="2"
                    strokeLinecap="round"
                    role="img"
                    aria-label="Upload de arquivo"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: 14,
                      color: "#6b5e55",
                    }}
                  >
                    Arraste o arquivo ou clique para selecionar
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "#9a8f86",
                    }}
                  >
                    PDF, XLSX ou DOC — até 20 MB
                  </p>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex flex-col gap-1.5">
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
                  TÍTULO *
                </label>
                <input
                  id="doc-title"
                  required
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Ex: Prestação de Contas Anual 2025"
                  className="w-full px-3 py-2.5 rounded-[3px] outline-none"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
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
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-[3px] outline-none"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
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
                  ANO *
                </label>
                <select
                  id="doc-year"
                  required
                  value={form.year}
                  onChange={(e) => set("year", Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-[3px] outline-none"
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
              <div className="col-span-2 flex flex-col gap-1.5">
                <label
                  htmlFor="doc-desc"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "1px",
                    color: "#3a342f",
                  }}
                >
                  DESCRIÇÃO
                </label>
                <textarea
                  id="doc-desc"
                  rows={2}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Breve descrição do documento..."
                  className="w-full px-3 py-2.5 rounded-[3px] outline-none resize-none"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              <div
                className="col-span-2 flex flex-col gap-2 p-3 rounded-[3px]"
                style={{ background: "#faf7f2", border: "1px solid #d4c9b6" }}
              >
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="attachment-file-input"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: 11,
                      letterSpacing: "1px",
                      color: "#c87d00",
                    }}
                  >
                    🧾 NOTAS FISCAIS / COMPROVANTES (OPCIONAL - VÁRIOS ARQUIVOS)
                  </label>
                  <span className="text-[10px] text-[#8c8077] font-bold">
                    {attachmentFiles.length} selecionada(s)
                  </span>
                </div>
                <input
                  id="attachment-file-input"
                  type="file"
                  multiple
                  accept=".pdf,.xlsx,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files) {
                      const newFiles = Array.from(e.target.files);
                      setAttachmentFiles((prev) => [...prev, ...newFiles]);
                    }
                  }}
                  className="w-full px-3 py-1.5 rounded-[3px] outline-none text-xs"
                  style={inputStyle}
                />
                {attachmentFiles.length > 0 && (
                  <div className="flex flex-col gap-1 max-h-[100px] overflow-y-auto mt-1">
                    {attachmentFiles.map((f, idx) => (
                      <div
                        key={`${f.name}-${idx}`}
                        className="flex items-center justify-between px-2.5 py-1 bg-white rounded border border-[#d4c9b6] text-xs"
                      >
                        <span className="truncate font-bold text-[#121212] max-w-[320px]">
                          🧾 {f.name} ({(f.size / 1024).toFixed(0)} KB)
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setAttachmentFiles((prev) =>
                              prev.filter((_, i) => i !== idx),
                            )
                          }
                          className="text-[#dd341f] font-bold text-xs hover:opacity-75 cursor-pointer px-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    set(
                      "status",
                      form.status === "published" ? "draft" : "published",
                    )
                  }
                  className="relative rounded-full shrink-0"
                  style={{
                    width: 44,
                    height: 24,
                    background:
                      form.status === "published" ? "#1a7d3c" : "#d4c9b6",
                    border: "2px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <span
                    className="absolute top-0.5 rounded-full"
                    style={{
                      width: 16,
                      height: 16,
                      background: "#fff",
                      left:
                        form.status === "published" ? "calc(100% - 20px)" : 2,
                      transition: "left 0.2s ease",
                    }}
                  />
                </button>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "#6b5e55",
                  }}
                >
                  {form.status === "published"
                    ? "Publicar imediatamente no portal"
                    : "Salvar como rascunho"}
                </span>
              </div>
            </div>

            <div
              className="flex gap-3 pt-2"
              style={{ borderTop: "1px solid #e8d5b4" }}
            >
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-[3px]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 13,
                  color: "#6b5e55",
                  background: "transparent",
                  border: "2px solid #d4c9b6",
                }}
              >
                CANCELAR
              </button>
              <button
                type="submit"
                disabled={loading || !file}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[3px]"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 15,
                  letterSpacing: "0.5px",
                  color: !file || loading ? "#9a8f86" : "#121212",
                  background: !file || loading ? "#e8d5b4" : "#f8ba01",
                  border: `2px solid ${!file || loading ? "#d4c9b6" : "#121212"}`,
                  boxShadow: !file || loading ? "none" : "3px 3px 0px #121212",
                  cursor: !file || loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      role="img"
                      aria-label="Carregando"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    ENVIANDO...
                  </>
                ) : (
                  "ENVIAR DOCUMENTO"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function EditModal({
  doc,
  onClose,
}: {
  doc: AdminDocument;
  onClose: () => void;
}) {
  const { updateDocument, deleteAttachment, addAttachment, updateAttachment } =
    useDocuments();
  const attFileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: doc.title,
    category: doc.category,
    year: doc.year,
    description: doc.description,
    status: doc.status,
  });
  const [newAttachmentFiles, setNewAttachmentFiles] = useState<File[]>([]);
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [editingAttachment, setEditingAttachment] =
    useState<DocumentAttachment | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function set(k: string, v: unknown) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await updateDocument(doc.id, form, newAttachmentFiles);
    setLoading(false);
    setSuccess(true);
    setTimeout(onClose, 1000);
  }

  const inputStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 14,
    background: "#f5eedd",
    border: "2px solid #d4c9b6",
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
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto py-6"
        style={{
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)",
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
      >
        <div
          className="w-full max-w-[600px] my-auto rounded-[4px] overflow-hidden flex flex-col max-h-[90vh]"
          style={{
            background: "#fff",
            border: "1px solid #d4c9b6",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 shrink-0"
            style={{ background: "#faf7f2", borderBottom: "1px solid #e8d5b4" }}
          >
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 20,
                color: "#121212",
                letterSpacing: "0.5px",
              }}
            >
              EDITAR DOCUMENTO
            </span>
            <button
              type="button"
              onClick={onClose}
              style={{ color: "#9a8f86" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                role="img"
                aria-label="Fechar modal"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {success ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 overflow-y-auto">
              <div
                className="flex items-center justify-center rounded-full size-16"
                style={{
                  background: "rgba(26,125,60,0.1)",
                  border: "3px solid #1a7d3c",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a7d3c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  role="img"
                  aria-label="Sucesso"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 20,
                  color: "#121212",
                }}
              >
                DOCUMENTO ATUALIZADO!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 p-6 overflow-y-auto min-h-0 flex-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label
                    htmlFor="edit-doc-title"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: 11,
                      letterSpacing: "1px",
                      color: "#3a342f",
                    }}
                  >
                    TÍTULO *
                  </label>
                  <input
                    id="edit-doc-title"
                    required
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-[3px] outline-none"
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="edit-doc-category"
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
                    id="edit-doc-category"
                    required
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-[3px] outline-none"
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="edit-doc-year"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: 11,
                      letterSpacing: "1px",
                      color: "#3a342f",
                    }}
                  >
                    ANO *
                  </label>
                  <select
                    id="edit-doc-year"
                    required
                    value={form.year}
                    onChange={(e) => set("year", Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-[3px] outline-none"
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

                <div className="col-span-2 flex flex-col gap-1.5">
                  <label
                    htmlFor="edit-doc-desc"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: 11,
                      letterSpacing: "1px",
                      color: "#3a342f",
                    }}
                  >
                    DESCRIÇÃO
                  </label>
                  <textarea
                    id="edit-doc-desc"
                    rows={2}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-[3px] outline-none resize-none"
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Status Toggle */}
                <div className="col-span-2 flex items-center gap-3 py-1">
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        "status",
                        form.status === "published" ? "draft" : "published",
                      )
                    }
                    className="relative rounded-full shrink-0"
                    style={{
                      width: 44,
                      height: 24,
                      background:
                        form.status === "published" ? "#1a7d3c" : "#d4c9b6",
                      border: "2px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    <span
                      className="absolute top-0.5 rounded-full"
                      style={{
                        width: 16,
                        height: 16,
                        background: "#fff",
                        left:
                          form.status === "published" ? "calc(100% - 20px)" : 2,
                        transition: "left 0.2s ease",
                      }}
                    />
                  </button>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: 13,
                      color: "#6b5e55",
                    }}
                  >
                    {form.status === "published"
                      ? "Publicado no portal de transparência"
                      : "Rascunho (invisível no portal)"}
                  </span>
                </div>

                {/* Existing & New Attachments */}
                <div
                  className="col-span-2 flex flex-col gap-2 p-3.5 rounded-[3px]"
                  style={{ background: "#faf7f2", border: "1px solid #d4c9b6" }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 800,
                        fontSize: 11,
                        letterSpacing: "1px",
                        color: "#c87d00",
                      }}
                    >
                      🧾 NOTAS FISCAIS & COMPROVANTES (
                      {(doc.attachments?.length || 0) +
                        newAttachmentFiles.length}
                      )
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowAddInvoiceModal(true)}
                      className="px-2.5 py-1 rounded text-[11px] font-black uppercase tracking-wider bg-[#f8ba01] text-[#121212] border border-[#121212] shadow-[1.5px_1.5px_0px_#121212] cursor-pointer hover:bg-white transition-all"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      + NOVA NOTA FISCAL
                    </button>
                  </div>

                  {/* Existing attachments */}
                  {doc.attachments && doc.attachments.length > 0 && (
                    <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto mt-1">
                      {doc.attachments.map((att) => (
                        <div
                          key={att.id}
                          className="flex items-start justify-between p-2.5 bg-white rounded border border-[#d4c9b6] text-xs gap-2"
                        >
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-[#121212] truncate">
                                🧾 {att.name}
                              </span>
                              {att.invoiceNumber && (
                                <span className="px-1.5 py-0.5 rounded bg-[#f8ba01]/20 border border-[#121212]/20 font-mono text-[10px] text-[#121212]">
                                  {att.invoiceNumber}
                                </span>
                              )}
                            </div>
                            {att.issuerName ? (
                              <span className="text-[11px] text-[#3a342f] font-semibold truncate">
                                Favorecido: <strong>{att.issuerName}</strong>{" "}
                                {att.issuerDoc ? `(${att.issuerDoc})` : ""}
                              </span>
                            ) : (
                              <span className="text-[11px] text-[#c87d00] font-bold italic">
                                ⚠️ Sem pessoa/favorecido associado (clique em
                                Editar Dados)
                              </span>
                            )}
                            <div className="flex items-center gap-2 text-[10px] text-[#8c8077] mt-0.5 flex-wrap">
                              {att.amount !== null &&
                                att.amount !== undefined && (
                                  <span className="font-bold text-[#1a7d3c]">
                                    R${" "}
                                    {att.amount.toLocaleString("pt-BR", {
                                      minimumFractionDigits: 2,
                                    })}
                                  </span>
                                )}
                              {att.expenseType && (
                                <span>· {att.expenseType}</span>
                              )}
                              <span>· {att.fileSize}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setEditingAttachment(att)}
                              className="px-2 py-1 text-[11px] font-extrabold text-[#121212] bg-[#f8ba01] rounded border border-[#121212] cursor-pointer hover:bg-white transition-colors"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {att.issuerName
                                ? "EDITAR DADOS"
                                : "ASSOCIAR PESSOA"}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteAttachment(att.id)}
                              className="text-[#dd341f] font-bold hover:underline text-xs cursor-pointer"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* New attachments staged */}
                  {newAttachmentFiles.length > 0 && (
                    <div className="flex flex-col gap-1.5 mt-1">
                      <span className="text-[11px] font-bold text-[#1a7d3c]">
                        Novos arquivos simples para anexar ao salvar:
                      </span>
                      {newAttachmentFiles.map((f, idx) => (
                        <div
                          key={`new-${f.name}-${idx}`}
                          className="flex items-center justify-between px-2.5 py-1.5 bg-white rounded border border-[#1a7d3c]/40 text-xs"
                        >
                          <span className="truncate font-bold text-[#1a7d3c]">
                            + 🧾 {f.name} ({(f.size / 1024).toFixed(0)} KB)
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setNewAttachmentFiles((prev) =>
                                prev.filter((_, i) => i !== idx),
                              )
                            }
                            className="text-[#dd341f] font-bold ml-2 cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick file add input */}
                  <div className="mt-1.5 flex items-center justify-between">
                    <input
                      ref={attFileRef}
                      type="file"
                      multiple
                      accept=".pdf,.xlsx,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          const files = Array.from(e.target.files);
                          setNewAttachmentFiles((prev) => [...prev, ...files]);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => attFileRef.current?.click()}
                      className="text-[11px] font-bold text-[#6b5e55] hover:text-[#121212] underline cursor-pointer"
                    >
                      + Anexar arquivo rápido sem formulário
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="flex gap-3 pt-2"
                style={{ borderTop: "1px solid #e8d5b4" }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-[3px]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 13,
                    color: "#6b5e55",
                    background: "transparent",
                    border: "2px solid #d4c9b6",
                  }}
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[3px]"
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 15,
                    letterSpacing: "0.5px",
                    color: loading ? "#9a8f86" : "#121212",
                    background: loading ? "#e8d5b4" : "#f8ba01",
                    border: `2px solid ${loading ? "#d4c9b6" : "#121212"}`,
                    boxShadow: loading ? "none" : "3px 3px 0px #121212",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {(showAddInvoiceModal || editingAttachment) && (
        <AddInvoiceModal
          documentTitle={doc.title}
          initialAttachment={editingAttachment || undefined}
          onClose={() => {
            setShowAddInvoiceModal(false);
            setEditingAttachment(null);
          }}
          onSave={async (payload) => {
            if (editingAttachment) {
              await updateAttachment(editingAttachment.id, payload);
            } else if (payload.file) {
              await addAttachment(doc.id, payload as AttachmentUploadPayload);
            }
            setShowAddInvoiceModal(false);
            setEditingAttachment(null);
          }}
        />
      )}
    </>
  );
}

function DeleteConfirm({
  doc,
  onCancel,
  onConfirm,
}: {
  doc: AdminDocument;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto py-6"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-[420px] my-auto p-6 rounded-[4px] flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
        style={{
          background: "#fff",
          border: "1px solid #d4c9b6",
          borderTop: "3px solid #dd341f",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        <div className="flex flex-col gap-2">
          <p
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 20,
              color: "#121212",
            }}
          >
            REMOVER DOCUMENTO
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: "#6b5e55",
              lineHeight: "22px",
            }}
          >
            Tem certeza que deseja remover{" "}
            <span style={{ color: "#121212", fontWeight: 800 }}>
              "{doc.title}"
            </span>
            ? Esta ação não pode ser desfeita.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-[3px]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 13,
              color: "#6b5e55",
              background: "transparent",
              border: "2px solid #d4c9b6",
            }}
          >
            CANCELAR
          </button>
          <button
            type="button"
            onClick={async () => {
              setLoading(true);
              await onConfirm();
            }}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[3px]"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 15,
              color: "#fff",
              background: loading ? "#e8d5b4" : "#dd341f",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading && (
              <svg
                className="animate-spin"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                role="img"
                aria-label="Carregando"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            )}
            {loading ? "REMOVENDO..." : "REMOVER"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewModal({
  doc,
  onClose,
  onDownload,
}: {
  doc: AdminDocument;
  onClose: () => void;
  onDownload: (doc: AdminDocument) => void;
}) {
  const { addAttachment, updateAttachment, deleteAttachment } = useDocuments();
  const attFileRef = useRef<HTMLInputElement>(null);
  const [attLoading, setAttLoading] = useState(false);
  const [editingAttachment, setEditingAttachment] =
    useState<DocumentAttachment | null>(null);
  const previewUrl = getFilePreviewUrl(doc.id);
  const isPdf =
    doc.fileType === "PDF" || doc.fileName.toLowerCase().endsWith(".pdf");

  return (
    <>
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
          className="w-full max-w-[850px] my-auto rounded-[4px] overflow-hidden flex flex-col max-h-[90vh]"
          style={{
            background: "#fff",
            border: "1px solid #d4c9b6",
            boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 shrink-0"
            style={{ background: "#faf7f2", borderBottom: "1px solid #e8d5b4" }}
          >
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 20,
                color: "#121212",
                letterSpacing: "0.5px",
              }}
            >
              PRÉ-VISUALIZAÇÃO DO DOCUMENTO
            </span>
            <button
              type="button"
              onClick={onClose}
              style={{ color: "#9a8f86" }}
              aria-label="Fechar modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Metadata section */}
          <div
            className="px-6 py-4 shrink-0 flex flex-col gap-3"
            style={{ background: "#f5eedd", borderBottom: "1px solid #d4c9b6" }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FileTag type={doc.fileType} />
                <div className="flex flex-col gap-1 min-w-0">
                  <h3
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 18,
                      color: "#121212",
                      lineHeight: 1.2,
                    }}
                  >
                    {doc.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "#6b5e55",
                    }}
                  >
                    {doc.fileName} · {doc.fileSize}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge category={doc.category} />
                <StatusPill status={doc.status} />
                <span
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 14,
                    color: "#121212",
                    background: "#fff",
                    padding: "2px 8px",
                    borderRadius: 2,
                    border: "1px solid #d4c9b6",
                  }}
                >
                  {doc.year}
                </span>
              </div>
            </div>

            {doc.description && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#3a342f",
                  lineHeight: "20px",
                }}
              >
                {doc.description}
              </p>
            )}
          </div>

          {/* Preview Frame */}
          <div className="flex-1 p-4 bg-[#e8d5b4]/20 min-h-[300px] overflow-hidden flex flex-col">
            {isPdf ? (
              <iframe
                src={previewUrl}
                title={`Pré-visualização de ${doc.title}`}
                className="w-full h-full min-h-[300px] rounded-[3px] border border-[#d4c9b6] bg-white"
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12 px-6 text-center bg-white rounded-[3px] border border-[#d4c9b6]">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-full"
                  style={{
                    background: "rgba(248,186,1,0.15)",
                    border: "2px solid #f8ba01",
                  }}
                >
                  <FileTag type={doc.fileType} />
                </div>
                <div className="flex flex-col gap-1 max-w-[440px]">
                  <p
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 18,
                      color: "#121212",
                    }}
                  >
                    PRÉ-VISUALIZAÇÃO DIRETA NÃO DISPONÍVEL
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: 13,
                      color: "#6b5e55",
                      lineHeight: "20px",
                    }}
                  >
                    Arquivos do tipo{" "}
                    <strong>.{doc.fileType.toLowerCase()}</strong> não possuem
                    visualizador direto no navegador. Clique abaixo para fazer o
                    download.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onDownload(doc)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-[3px] cursor-pointer"
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 14,
                    color: "#121212",
                    background: "#f8ba01",
                    border: "2px solid #121212",
                    boxShadow: "3px 3px 0px #121212",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  BAIXAR AGORA ({doc.fileSize})
                </button>
              </div>
            )}
          </div>

          {/* Attachments & Invoices Section */}
          <div className="px-6 py-4 bg-[#fdfaf3] border-t border-[#d4c9b6] flex flex-col gap-3 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">🧾</span>
                <span
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 16,
                    color: "#121212",
                    letterSpacing: "0.5px",
                  }}
                >
                  NOTAS FISCAIS & COMPROVANTES ({doc.attachments?.length || 0})
                </span>
              </div>
              <div>
                <input
                  ref={attFileRef}
                  type="file"
                  accept=".pdf,.xlsx,.doc,.docx"
                  className="hidden"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setAttLoading(true);
                      await addAttachment(doc.id, f);
                      setAttLoading(false);
                    }
                  }}
                />
                <button
                  type="button"
                  disabled={attLoading}
                  onClick={() => attFileRef.current?.click()}
                  className="px-3 py-1.5 rounded-[3px] text-xs font-extrabold uppercase tracking-wider cursor-pointer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: "#f8ba01",
                    color: "#121212",
                    border: "1.5px solid #121212",
                    boxShadow: "2px 2px 0px #121212",
                  }}
                >
                  {attLoading ? "ENVIANDO..." : "+ ANEXAR ARQUIVO RÁPIDO"}
                </button>
              </div>
            </div>

            {doc.attachments && doc.attachments.length > 0 ? (
              <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                {doc.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center justify-between px-3 py-2 bg-white rounded border border-[#d4c9b6] text-xs gap-2"
                  >
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-[#c87d00]">
                          🧾 NF:
                        </span>
                        <span className="text-xs font-bold text-[#121212]">
                          {att.name}
                        </span>
                        {att.invoiceNumber && (
                          <span className="px-1.5 py-0.5 rounded bg-[#f8ba01]/20 font-mono text-[10px] text-[#121212]">
                            {att.invoiceNumber}
                          </span>
                        )}
                        <span className="text-[11px] text-[#8c8077]">
                          ({att.fileSize})
                        </span>
                      </div>
                      {att.issuerName ? (
                        <span className="text-[11px] text-[#3a342f] font-semibold truncate">
                          Favorecido: <strong>{att.issuerName}</strong>{" "}
                          {att.issuerDoc ? `(${att.issuerDoc})` : ""}
                          {att.amount && (
                            <span className="ml-2 font-bold text-[#1a7d3c]">
                              — R${" "}
                              {att.amount.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#c87d00] font-bold italic">
                          ⚠️ Sem pessoa/favorecido associado
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingAttachment(att)}
                        className="px-2 py-1 text-[11px] font-extrabold text-[#121212] bg-[#f8ba01] rounded border border-[#121212] cursor-pointer hover:bg-white transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {att.issuerName ? "EDITAR DADOS" : "ASSOCIAR PESSOA"}
                      </button>

                      {att.downloadUrl && (
                        <a
                          href={att.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="px-2.5 py-1 text-[11px] font-extrabold rounded bg-white text-[#121212] border border-[#121212]"
                        >
                          BAIXAR
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={async () => {
                          await deleteAttachment(att.id);
                        }}
                        className="px-2 py-1 text-[11px] font-extrabold text-[#dd341f] hover:underline cursor-pointer"
                      >
                        EXCLUIR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8c8077] italic">
                Nenhuma nota fiscal ou comprovante anexado a este documento até
                o momento.
              </p>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-6 py-4 shrink-0 gap-3"
            style={{ background: "#faf7f2", borderTop: "1px solid #e8d5b4" }}
          >
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 12,
                color: "#6b5e55",
                textDecoration: "underline",
              }}
            >
              Abrir em nova aba
            </a>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-[3px]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 13,
                  color: "#6b5e55",
                  background: "transparent",
                  border: "2px solid #d4c9b6",
                }}
              >
                FECHAR
              </button>
              <button
                type="button"
                onClick={() => onDownload(doc)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-[3px]"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 14,
                  color: "#121212",
                  background: "#f8ba01",
                  border: "2px solid #121212",
                  boxShadow: "3px 3px 0px #121212",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                BAIXAR DOCUMENTO PRINCIPAL
              </button>
            </div>
          </div>
        </div>
      </div>

      {editingAttachment && (
        <AddInvoiceModal
          documentTitle={doc.title}
          initialAttachment={editingAttachment}
          onClose={() => setEditingAttachment(null)}
          onSave={async (payload) => {
            await updateAttachment(editingAttachment.id, payload);
            setEditingAttachment(null);
          }}
        />
      )}
    </>
  );
}

export function AdminDashboard() {
  const { user, loading, logout } = useAdminAuth();
  const { documents, deleteDocument, toggleStatus } = useDocuments();
  const router = useRouter();

  const [showUpload, setShowUpload] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminDocument | null>(null);
  const [editingTarget, setEditingTarget] = useState<AdminDocument | null>(
    null,
  );
  const [previewTarget, setPreviewTarget] = useState<AdminDocument | null>(
    null,
  );
  const [filterYear, setFilterYear] = useState<number | "all">("all");
  const [filterCat, setFilterCat] = useState<DocCategory | "all">("all");
  const [search, setSearch] = useState("");

  function handleDownloadDocument(doc: AdminDocument) {
    const downloadUrl = getFileDownloadUrl(doc.id);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = doc.fileName || doc.title;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  useEffect(() => {
    if (!loading && !user) router.push("/admin/login");
  }, [loading, user, router]);

  if (loading || !user) return null;

  const filtered = documents.filter((d) => {
    if (filterYear !== "all" && d.year !== filterYear) return false;
    if (filterCat !== "all" && d.category !== filterCat) return false;

    if (search) {
      const q = search.toLowerCase().trim();
      const cleanQ = q.replace(/\D/g, "");

      const matchTitle = d.title.toLowerCase().includes(q);
      const matchDescription = d.description?.toLowerCase().includes(q);
      const matchFileName = d.fileName?.toLowerCase().includes(q);

      const matchAttachments = d.attachments?.some((att) => {
        const nameMatch = att.name.toLowerCase().includes(q);
        const issuerMatch = att.issuerName?.toLowerCase().includes(q);
        const docMatch = att.issuerDoc?.toLowerCase().includes(q);
        const cleanDocMatch =
          cleanQ.length > 2 &&
          att.issuerDoc?.replace(/\D/g, "").includes(cleanQ);
        const invMatch = att.invoiceNumber?.toLowerCase().includes(q);
        const expenseMatch = att.expenseType?.toLowerCase().includes(q);
        const descMatch = att.description?.toLowerCase().includes(q);

        return (
          nameMatch ||
          issuerMatch ||
          docMatch ||
          cleanDocMatch ||
          invMatch ||
          expenseMatch ||
          descMatch
        );
      });

      if (
        !matchTitle &&
        !matchDescription &&
        !matchFileName &&
        !matchAttachments
      ) {
        return false;
      }
    }

    return true;
  });

  const years = [...new Set(documents.map((d) => d.year))].sort(
    (a, b) => b - a,
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f5eedd" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 lg:px-10 py-4 shrink-0"
        style={{ background: "#fff", borderBottom: "3px solid #121212" }}
      >
        <div className="flex items-center gap-4">
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 22,
              color: "#121212",
              letterSpacing: "1px",
            }}
          >
            ZAMBÔ
          </span>
          <div
            className="hidden md:flex items-center gap-2 px-3 py-1 rounded-[3px]"
            style={{
              background: "rgba(248,186,1,0.15)",
              border: "1px solid rgba(248,186,1,0.5)",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                color: "#121212",
                letterSpacing: "1px",
              }}
            >
              PAINEL ADMIN
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 13,
                color: "#121212",
              }}
            >
              {user.name}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                color: "#9a8f86",
              }}
            >
              {user.email}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-[3px]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              color: "#6b5e55",
              border: "2px solid #d4c9b6",
              background: "transparent",
              letterSpacing: "0.5px",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              role="img"
              aria-label="Sair"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            SAIR
          </button>
        </div>
      </header>

      <div className="flex-1 px-6 lg:px-10 py-8 flex flex-col gap-7 max-w-[1300px] mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
          <div className="flex flex-col gap-1">
            <h1
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                color: "#121212",
                letterSpacing: "0.5px",
                lineHeight: 1,
              }}
            >
              DOCUMENTOS
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: "#6b5e55",
              }}
            >
              Gerencie os documentos exibidos no portal público de transparência
            </p>
          </div>
          <Link
            href="/admin/novo"
            className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-[3px] w-full sm:w-auto shrink-0 cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 15,
              color: "#121212",
              background: "#f8ba01",
              border: "2px solid #121212",
              boxShadow: "4px 4px 0px #121212",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              role="img"
              aria-label="Adicionar"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            NOVO DOCUMENTO
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "TOTAL", value: documents.length, accent: "#f8ba01" },
            {
              label: "PUBLICADOS",
              value: documents.filter((d) => d.status === "published").length,
              accent: "#1a7d3c",
            },
            {
              label: "RASCUNHOS",
              value: documents.filter((d) => d.status === "draft").length,
              accent: "#9a8f86",
            },
            { label: "ANOS", value: years.length, accent: "#dd341f" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 px-5 py-4 rounded-[3px]"
              style={{
                background: "#fff",
                borderTop: `3px solid ${s.accent}`,
                borderRight: "1px solid #e8d5b4",
                borderBottom: "1px solid #e8d5b4",
                borderLeft: "1px solid #e8d5b4",
              }}
            >
              <span
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 32,
                  color: "#121212",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 10,
                  color: "#9a8f86",
                  letterSpacing: "1px",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center px-4 py-3 rounded-[3px]"
          style={{ background: "#fff", border: "1px solid #e8d5b4" }}
        >
          <div className="relative flex-1 min-w-[180px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9a8f86"
              strokeWidth="2.5"
              strokeLinecap="round"
              role="img"
              aria-label="Buscar"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título, favorecido, CPF/CNPJ ou nº da nota..."
              className="w-full pl-8 pr-3 py-2 rounded-[3px] outline-none"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                background: "#f5eedd",
                border: "1px solid #d4c9b6",
                color: "#121212",
              }}
            />
          </div>
          <select
            value={filterYear}
            onChange={(e) =>
              setFilterYear(
                e.target.value === "all" ? "all" : Number(e.target.value),
              )
            }
            className="w-full sm:w-auto px-3 py-2 rounded-[3px] outline-none cursor-pointer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              background: "#f5eedd",
              border: "1px solid #d4c9b6",
              color: "#3a342f",
            }}
          >
            <option value="all">TODOS OS ANOS</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            value={filterCat}
            onChange={(e) =>
              setFilterCat(e.target.value as DocCategory | "all")
            }
            className="w-full sm:w-auto px-3 py-2 rounded-[3px] outline-none cursor-pointer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              background: "#f5eedd",
              border: "1px solid #d4c9b6",
              color: "#3a342f",
            }}
          >
            <option value="all">TODAS AS CATEGORIAS</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {filtered.length !== documents.length && (
            <span
              className="text-center sm:text-left"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 12,
                color: "#9a8f86",
              }}
            >
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div
          className="rounded-[3px] overflow-hidden"
          style={{ border: "1px solid #d4c9b6" }}
        >
          <div
            className="hidden md:grid px-5 py-3"
            style={{
              gridTemplateColumns: "40px 1fr 190px 55px 95px 90px 220px",
              background: "#f5eedd",
              borderBottom: "2px solid #121212",
              gap: 12,
            }}
          >
            {[
              "",
              "DOCUMENTO",
              "CATEGORIA",
              "ANO",
              "PUBLICADO EM",
              "STATUS",
              "AÇÕES",
            ].map((h) => (
              <span
                key={h}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 10,
                  color: "#9a8f86",
                  letterSpacing: "1px",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 px-6 gap-3 text-center"
              style={{ background: "#fff" }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full mb-1"
                style={{
                  background: "rgba(248,186,1,0.15)",
                  border: "1px solid rgba(248,186,1,0.5)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#121212"
                  strokeWidth="2"
                  strokeLinecap="round"
                  role="img"
                  aria-label="Nenhum documento"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 18,
                  color: "#121212",
                  letterSpacing: "0.5px",
                }}
              >
                {documents.length === 0
                  ? "NENHUM DOCUMENTO CADASTRADO NO BANCO"
                  : "NENHUM DOCUMENTO ENCONTRADO PARA ESTE FILTRO"}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#6b5e55",
                  maxWidth: 400,
                }}
              >
                {documents.length === 0
                  ? "Clique no botão 'ENVIAR DOCUMENTO' acima para fazer upload do primeiro arquivo no portal de transparência."
                  : "Tente alterar os termos de busca ou o filtro de categoria selecionado."}
              </p>
            </div>
          ) : (
            filtered.map((doc, i) => (
              <div key={doc.id}>
                {/* Desktop View (md:grid) */}
                <div
                  className="hidden md:grid items-center gap-3 px-5 py-5 transition-colors"
                  style={{
                    gridTemplateColumns: "40px 1fr 190px 55px 95px 90px 220px",
                    gap: 12,
                    background: i % 2 === 0 ? "#fff" : "#faf7f2",
                    borderBottom: "1px solid #e8d5b4",
                  }}
                >
                  <FileTag type={doc.fileType} />
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: 15,
                        color: "#121212",
                        lineHeight: 1.2,
                      }}
                    >
                      {doc.title}
                    </span>
                    <span
                      className="truncate"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: 11,
                        color: "#9a8f86",
                      }}
                    >
                      {doc.fileName}
                    </span>
                  </div>
                  <div className="flex flex-col items-start gap-1 min-w-0">
                    <Badge category={doc.category} />
                    {doc.attachments && doc.attachments.length > 0 && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#f8ba01]/30 text-[#121212] border border-[#121212]/20 shrink-0">
                        🧾 {doc.attachments.length}{" "}
                        {doc.attachments.length === 1
                          ? "Nota Fiscal"
                          : "Notas Fiscais"}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 16,
                      color: "#3a342f",
                    }}
                  >
                    {doc.year}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "#9a8f86",
                    }}
                  >
                    {doc.publishedAt}
                  </span>
                  <StatusPill status={doc.status} />

                  {/* Desktop Action Buttons */}
                  <div className="flex items-center gap-1.5 justify-end">
                    <Link
                      href={`/admin/documento/${doc.id}/notas/nova`}
                      title="Incluir Nota Fiscal / Recibo"
                      className="px-2.5 py-1.5 rounded font-extrabold text-[11px] bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white transition-colors shrink-0 flex items-center gap-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      + NF
                    </Link>
                    <Link
                      href={`/admin/documento/${doc.id}/editar`}
                      title="Editar documento"
                      className="flex items-center justify-center size-9 rounded-[3px] cursor-pointer hover:bg-white transition-colors"
                      style={{
                        background: "transparent",
                        border: "1px solid #d4c9b6",
                        color: "#c87d00",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        role="img"
                        aria-label="Editar"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </Link>
                    <Link
                      href={`/admin/documento/${doc.id}`}
                      title="Ver detalhes do documento"
                      className="flex items-center justify-center size-9 rounded-[3px] cursor-pointer hover:bg-white transition-colors"
                      style={{
                        background: "transparent",
                        border: "1px solid #d4c9b6",
                        color: "#1a5fa8",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        role="img"
                        aria-label="Ver detalhes"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDownloadDocument(doc)}
                      title="Baixar documento"
                      className="flex items-center justify-center size-9 rounded-[3px] cursor-pointer hover:bg-white transition-colors"
                      style={{
                        background: "transparent",
                        border: "1px solid #d4c9b6",
                        color: "#9a8f86",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#1a7d3c";
                        e.currentTarget.style.color = "#1a7d3c";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#d4c9b6";
                        e.currentTarget.style.color = "#9a8f86";
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        role="img"
                        aria-label="Baixar"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStatus(doc.id)}
                      title={
                        doc.status === "published"
                          ? "Publicado - Clique para despublicar"
                          : "Rascunho - Clique para publicar"
                      }
                      className="flex items-center justify-center size-9 rounded-[3px] cursor-pointer hover:bg-white transition-colors"
                      style={{
                        background: "transparent",
                        border: "1px solid #d4c9b6",
                        color:
                          doc.status === "published" ? "#1a7d3c" : "#9a8f86",
                      }}
                    >
                      {doc.status === "published" ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          role="img"
                          aria-label="Publicado no portal público"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          role="img"
                          aria-label="Rascunho privado"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(doc)}
                      title="Remover"
                      className="flex items-center justify-center size-9 rounded-[3px] cursor-pointer hover:bg-white transition-colors"
                      style={{
                        background: "transparent",
                        border: "1px solid #d4c9b6",
                        color: "#9a8f86",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#dd341f";
                        e.currentTarget.style.color = "#dd341f";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#d4c9b6";
                        e.currentTarget.style.color = "#9a8f86";
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        role="img"
                        aria-label="Remover"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Mobile View (md:hidden) */}
                <div
                  className="md:hidden flex flex-col gap-4 p-5 border-b border-[#e8d5b4]"
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#faf7f2",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <FileTag type={doc.fileType} />
                      <div className="flex flex-col gap-1 min-w-0">
                        <span
                          style={{
                            fontFamily: "'Anton', sans-serif",
                            fontSize: 16,
                            color: "#121212",
                            lineHeight: 1.2,
                          }}
                        >
                          {doc.title}
                        </span>
                        <span
                          className="truncate text-xs font-medium text-[#9a8f86]"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {doc.fileName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e8d5b4]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge category={doc.category} />
                      <StatusPill status={doc.status} />
                    </div>

                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: 12,
                        color: "#9a8f86",
                      }}
                    >
                      {doc.publishedAt} ({doc.year})
                    </span>
                  </div>

                  {/* Explicit Mobile Actions Bar */}
                  <div className="flex flex-col min-[450px]:flex-row min-[450px]:items-center justify-between gap-2.5 pt-2.5 border-t border-[#e8d5b4]">
                    <Link
                      href={`/admin/documento/${doc.id}/notas/nova`}
                      className="w-full min-[450px]:flex-1 py-2.5 px-3 rounded font-extrabold text-xs bg-[#f8ba01] text-[#121212] border border-[#121212] text-center hover:bg-white transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      + NOTA FISCAL
                    </Link>
                    <div className="flex items-center justify-between min-[450px]:justify-end gap-1.5 w-full min-[450px]:w-auto shrink-0">
                      <Link
                        href={`/admin/documento/${doc.id}/editar`}
                        title="Editar documento"
                        className="flex items-center justify-center flex-1 min-[450px]:flex-initial size-9 rounded-[3px] cursor-pointer bg-white"
                        style={{
                          border: "1px solid #d4c9b6",
                          color: "#c87d00",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          role="img"
                          aria-label="Editar"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/documento/${doc.id}`}
                        title="Ver detalhes do documento"
                        className="flex items-center justify-center flex-1 min-[450px]:flex-initial size-9 rounded-[3px] cursor-pointer bg-white"
                        style={{
                          border: "1px solid #d4c9b6",
                          color: "#1a5fa8",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          role="img"
                          aria-label="Ver detalhes"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDownloadDocument(doc)}
                        title="Baixar documento"
                        className="flex items-center justify-center flex-1 min-[450px]:flex-initial size-9 rounded-[3px] cursor-pointer bg-white"
                        style={{
                          border: "1px solid #d4c9b6",
                          color: "#1a7d3c",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          role="img"
                          aria-label="Baixar"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStatus(doc.id)}
                        title={
                          doc.status === "published"
                            ? "Publicado - Clique para despublicar"
                            : "Rascunho - Clique para publicar"
                        }
                        className="flex items-center justify-center flex-1 min-[450px]:flex-initial size-9 rounded-[3px] cursor-pointer bg-white"
                        style={{
                          border: "1px solid #d4c9b6",
                          color:
                            doc.status === "published" ? "#1a7d3c" : "#9a8f86",
                        }}
                      >
                        {doc.status === "published" ? (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            role="img"
                            aria-label="Publicado no portal público"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                        ) : (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            role="img"
                            aria-label="Rascunho privado"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(doc)}
                        title="Remover"
                        className="flex items-center justify-center flex-1 min-[450px]:flex-initial size-9 rounded-[3px] cursor-pointer bg-white"
                        style={{
                          border: "1px solid #d4c9b6",
                          color: "#dd341f",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          role="img"
                          aria-label="Remover"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {deleteTarget && (
        <DeleteConfirm
          doc={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await deleteDocument(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
}
