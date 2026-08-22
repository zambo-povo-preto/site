"use client";

import { useDocuments } from "@/contexts/DocumentsContext";
import svgPaths from "@/imports/Group36/svg-hkzbekptio";
import { getAttachmentDownloadUrl, getFileDownloadUrl } from "@/lib/api";
import type {
  AdminDocument,
  DocCategory,
  TransparencyDocument,
  YearGroup,
} from "@/types/document";
import { useEffect, useState } from "react";

const CATEGORIES: DocCategory[] = [
  "Prestação de Contas",
  "Relatório de Atividades",
  "Plano de Trabalho",
  "Ata de Reunião",
  "Edital",
];

const categoryMeta: Record<DocCategory, { color: string; bg: string }> = {
  "Prestação de Contas": { color: "#ffffff", bg: "#dd341f" },
  "Relatório de Atividades": { color: "#121212", bg: "#f8ba01" },
  "Plano de Trabalho": { color: "#ffffff", bg: "#1a7d3c" },
  "Ata de Reunião": { color: "#f5eedd", bg: "#1d1b18" },
  Edital: { color: "#121212", bg: "#6b5e55" },
};

function FileTag({ type }: { type: "PDF" | "XLSX" | "DOC" }) {
  const colors: Record<string, string> = {
    PDF: "#dd341f",
    XLSX: "#1a7d3c",
    DOC: "#1a5fa8",
  };
  return (
    <div
      className="flex items-center justify-center rounded-[3px] shrink-0"
      style={{
        width: 44,
        height: 48,
        background: colors[type] ?? "#dd341f",
        border: "1px solid #121212",
      }}
    >
      <span
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 12,
          color: "#ffffff",
          letterSpacing: "0.5px",
        }}
      >
        {type}
      </span>
    </div>
  );
}

function Badge({ category }: { category: DocCategory }) {
  const meta = categoryMeta[category] || {
    color: "#ffffff",
    bg: "#dd341f",
  };
  return (
    <span
      className="px-2.5 py-1 rounded-[3px] inline-flex items-center shrink-0"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800,
        fontSize: 10,
        letterSpacing: "0.8px",
        background: meta.bg,
        color: meta.color,
        border: "1px solid #d4c9b6",
      }}
    >
      {category.toUpperCase()}
    </span>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Ícone de download"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.25s ease",
      }}
      role="img"
      aria-label="Expandir ou recolher"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function DocumentRow({
  doc,
  searchTerm,
}: {
  doc: TransparencyDocument;
  searchTerm?: string;
}) {
  const downloadUrl = getFileDownloadUrl(doc.id);

  // Check if search matches any attachment
  const q = searchTerm?.toLowerCase().trim() || "";
  const cleanQ = q.replace(/\D/g, "");

  const hasMatchingAttachment = Boolean(
    q &&
      doc.attachments?.some((att) => {
        return (
          att.name.toLowerCase().includes(q) ||
          att.issuerName?.toLowerCase().includes(q) ||
          att.issuerDoc?.toLowerCase().includes(q) ||
          (cleanQ.length > 2 &&
            att.issuerDoc?.replace(/\D/g, "").includes(cleanQ)) ||
          att.invoiceNumber?.toLowerCase().includes(q) ||
          att.expenseType?.toLowerCase().includes(q) ||
          att.description?.toLowerCase().includes(q)
        );
      }),
  );

  const [showAttachments, setShowAttachments] = useState(hasMatchingAttachment);
  const hasAttachments = Boolean(doc.attachments && doc.attachments.length > 0);

  useEffect(() => {
    if (hasMatchingAttachment) {
      setShowAttachments(true);
    }
  }, [hasMatchingAttachment]);

  const totalAmount = (doc.attachments || []).reduce(
    (acc, att) => acc + (att.amount || 0),
    0,
  );

  return (
    <div
      className="flex flex-col border-b last:border-b-0 transition-colors"
      style={{
        borderColor: "#d8caa6",
        background: "#faf4e8",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4.5">
        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
          <FileTag type={doc.fileType} />

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 17,
                  color: "#121212",
                  letterSpacing: "0.3px",
                  lineHeight: "22px",
                }}
              >
                {doc.title}
              </span>
              <Badge category={doc.category} />
              {totalAmount > 0 && (
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold uppercase inline-flex items-center gap-1"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: "rgba(26,125,60,0.12)",
                    color: "#1a7d3c",
                    border: "1px solid #1a7d3c",
                  }}
                >
                  💰 TOTAL: R${" "}
                  {totalAmount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
            </div>

            {doc.description && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  lineHeight: "20px",
                  color: "#5a4e44",
                }}
              >
                {doc.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  color: "#8a7d73",
                  letterSpacing: "0.3px",
                }}
              >
                Publicado em {doc.date} · {doc.fileSize}
              </span>

              {hasAttachments && (
                <button
                  type="button"
                  onClick={() => setShowAttachments((v) => !v)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide cursor-pointer transition-colors"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: showAttachments ? "#121212" : "#e6d8be",
                    color: showAttachments ? "#f8ba01" : "#121212",
                    border: "1px solid #c8b9a2",
                  }}
                >
                  <span>🧾 NOTAS FISCAIS ({doc.attachments?.length})</span>
                  <ChevronIcon open={showAttachments} />
                </button>
              )}
            </div>
          </div>
        </div>

        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex items-center justify-center gap-2 shrink-0 rounded-[3px] px-5 py-2.5 transition-all cursor-pointer w-full sm:w-auto"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 13,
            color: "#121212",
            letterSpacing: "0.5px",
            border: "1px solid #121212",
            background: "#f8ba01",
            textDecoration: "none",
          }}
        >
          <DownloadIcon />
          BAIXAR
        </a>
      </div>

      {/* Attachments Collapsible Section */}
      {hasAttachments && showAttachments && (
        <div
          className="px-4 sm:px-5 py-4 flex flex-col gap-3 border-t"
          style={{
            background: "#e6d8be",
            borderColor: "#c8b9a2",
          }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: "1.5px",
                color: "#c87d00",
              }}
            >
              🧾 NOTAS FISCAIS & COMPROVANTES DETALHADOS
            </span>
            {totalAmount > 0 && (
              <span
                className="text-xs font-bold text-[#1a7d3c]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                TOTAL COMPROVADO: R${" "}
                {totalAmount.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {doc.attachments?.map((att) => {
              const isMatch = Boolean(
                q &&
                  (att.name.toLowerCase().includes(q) ||
                    att.issuerName?.toLowerCase().includes(q) ||
                    att.issuerDoc?.toLowerCase().includes(q) ||
                    (cleanQ.length > 2 &&
                      att.issuerDoc?.replace(/\D/g, "").includes(cleanQ)) ||
                    att.invoiceNumber?.toLowerCase().includes(q) ||
                    att.expenseType?.toLowerCase().includes(q) ||
                    att.description?.toLowerCase().includes(q)),
              );

              return (
                <div
                  key={att.id}
                  className={`flex flex-col justify-between gap-3 p-4 rounded-[3px] bg-[#faf4e8] border transition-colors ${
                    isMatch
                      ? "border-[#c87d00] bg-[#f8ba01]/10"
                      : "border-[#c8b9a2]"
                  }`}
                >
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded flex items-center justify-center bg-[#f8ba01]/20 border border-[#121212]/20 shrink-0 font-bold text-xs">
                          🧾
                        </div>
                        <span
                          className="truncate text-sm font-bold text-[#121212]"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {att.name}
                        </span>
                      </div>
                      {att.invoiceNumber && (
                        <span className="px-2 py-0.5 rounded bg-[#f8ba01]/30 text-[#121212] text-[10px] font-mono font-bold shrink-0 border border-[#121212]/20">
                          {att.invoiceNumber}
                        </span>
                      )}
                    </div>

                    {/* Favorecido & CPF/CNPJ */}
                    {att.issuerName ? (
                      <div className="flex flex-col text-xs text-[#3a342f] bg-[#e6d8be] p-2.5 rounded border border-[#c8b9a2]">
                        <span className="font-bold text-[#121212]">
                          Favorecido: {att.issuerName}
                        </span>
                        {att.issuerDoc && (
                          <span className="text-[11px] font-mono text-[#6b5e55] font-semibold mt-0.5">
                            CPF/CNPJ: {att.issuerDoc}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-[#8c8077] italic">
                        Sem favorecido especificado
                      </span>
                    )}

                    {/* Description if present */}
                    {att.description && (
                      <p className="text-xs text-[#5a4e44] font-medium leading-snug">
                        {att.description}
                      </p>
                    )}

                    {/* Amount & Expense Category badges */}
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      {att.amount !== null && att.amount !== undefined && (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold text-xs">
                          R${" "}
                          {att.amount.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      )}
                      {att.expenseType && (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300 font-bold text-[10px]">
                          {att.expenseType}
                        </span>
                      )}
                      {att.issueDate && (
                        <span className="text-[10px] text-[#8c8077] font-semibold">
                          Data:{" "}
                          {new Date(att.issueDate).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-[#c8b9a2]">
                    <span className="text-[10px] font-bold text-[#8c8077]">
                      {att.fileSize} · {att.fileType}
                    </span>
                    <a
                      href={att.downloadUrl || getAttachmentDownloadUrl(att.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide shrink-0 transition-colors"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        background: "#f8ba01",
                        color: "#121212",
                        border: "1px solid #121212",
                        textDecoration: "none",
                      }}
                    >
                      <DownloadIcon />
                      <span>VER COMPROVANTE</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function YearAccordion({
  group,
  defaultOpen,
  searchTerm,
}: {
  group: YearGroup;
  defaultOpen: boolean;
  searchTerm?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (searchTerm && searchTerm.trim().length > 0) {
      setOpen(true);
    }
  }, [searchTerm]);

  const countByCategory = group.documents.reduce<Record<string, number>>(
    (acc, d) => {
      acc[d.category] = (acc[d.category] ?? 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <div
      className="overflow-hidden rounded-[3px] transition-all bg-[#faf4e8]"
      style={{
        border: "1px solid #c8b9a2",
      }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left transition-colors cursor-pointer"
        style={{
          background: open ? "#e6d8be" : "#faf4e8",
          borderBottom: open ? "1px solid #c8b9a2" : "none",
        }}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <div className="flex items-baseline gap-3">
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(30px, 4.5vw, 42px)",
                lineHeight: 1,
                color: "#121212",
                letterSpacing: "0.5px",
              }}
            >
              {group.year}
            </span>
          </div>

          <div className="hidden md:flex flex-wrap gap-2">
            {Object.entries(countByCategory).map(([cat, count]) => {
              const meta = categoryMeta[cat as DocCategory] || {
                bg: "#121212",
                color: "#fff",
              };
              return (
                <span
                  key={cat}
                  className="px-2 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wide"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: open ? "rgba(18,18,18,0.08)" : meta.bg,
                    color: open ? "#121212" : meta.color,
                    border: "1px solid #c8b9a2",
                  }}
                >
                  {count} {cat.toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#121212]">
          <span
            className="hidden sm:inline-block font-extrabold text-xs tracking-wider"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {open ? "RECOLHER" : "EXPANDIR"}
          </span>
          <ChevronIcon open={open} />
        </div>
      </button>

      {open && (
        <div style={{ background: "#faf4e8" }}>
          {group.documents.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} searchTerm={searchTerm} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({
  hasDocs,
  onClear,
}: {
  hasDocs: boolean;
  onClear: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center rounded-[3px] my-4 bg-[#faf4e8]"
      style={{
        border: "1px solid #c8b9a2",
      }}
    >
      <div
        className="flex items-center justify-center w-14 h-14 rounded-full mb-4"
        style={{
          background: "rgba(248,186,1,0.2)",
          border: "1px solid #f8ba01",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#121212"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label="Nenhum documento"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      </div>

      <h3
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 22,
          color: "#121212",
          letterSpacing: "0.5px",
        }}
      >
        {hasDocs
          ? "NENHUM DOCUMENTO ENCONTRADO PARA ESTES FILTROS"
          : "NENHUM DOCUMENTO PUBLICADO"}
      </h3>

      <p
        className="mt-2 max-w-md"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 13,
          color: "#5a4e44",
          lineHeight: "20px",
        }}
      >
        {hasDocs
          ? "Tente alterar os termos de busca ou selecionar outra categoria e ano."
          : "Os documentos e prestações de contas do Ponto de Cultura Zambô serão disponibilizados nesta página assim que forem inseridos pelo painel de administração."}
      </p>

      {hasDocs && (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 px-5 py-2.5 rounded-[3px] cursor-pointer font-bold text-xs uppercase text-[#121212] bg-[#f8ba01] border border-[#121212] hover:bg-white transition-colors"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          LIMPAR FILTROS DE BUSCA
        </button>
      )}
    </div>
  );
}

function adminDocToTransparencyDoc(doc: AdminDocument): TransparencyDocument {
  return {
    id: doc.id,
    title: doc.title,
    category: doc.category,
    description: doc.description,
    date: doc.publishedAt,
    fileType: doc.fileType,
    fileSize: doc.fileSize,
    downloadUrl: getFileDownloadUrl(doc.id),
    attachments: doc.attachments,
  };
}

export function TransparencyDetailSection() {
  const { documents } = useDocuments();

  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState<number | "all">("all");
  const [filterCat, setFilterCat] = useState<DocCategory | "all">("all");

  const publishedDocs = documents.filter((d) => d.status === "published");

  const years = Array.from(
    new Set(publishedDocs.map((d) => d.year || new Date().getFullYear())),
  ).sort((a, b) => b - a);

  const filteredDocs = publishedDocs.filter((d) => {
    const q = search.toLowerCase().trim();
    const cleanQ = q.replace(/\D/g, "");

    const matchSearch =
      !q ||
      d.title.toLowerCase().includes(q) ||
      d.description?.toLowerCase().includes(q) ||
      d.fileName?.toLowerCase().includes(q) ||
      d.attachments?.some((att) => {
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

    const matchYear = filterYear === "all" || d.year === filterYear;
    const matchCat = filterCat === "all" || d.category === filterCat;

    return matchSearch && matchYear && matchCat;
  });

  let yearGroups: YearGroup[] = [];

  if (filteredDocs.length > 0) {
    const map = new Map<number, TransparencyDocument[]>();
    for (const doc of filteredDocs) {
      const year = doc.year || new Date().getFullYear();
      if (!map.has(year)) map.set(year, []);
      map.get(year)?.push(adminDocToTransparencyDoc(doc));
    }

    const sortedYears = [...map.keys()].sort((a, b) => b - a);
    yearGroups = sortedYears.map((year) => ({
      year,
      documents: map.get(year) || [],
    }));
  }

  const isFiltered =
    search.trim().length > 0 || filterYear !== "all" || filterCat !== "all";

  function clearFilters() {
    setSearch("");
    setFilterYear("all");
    setFilterCat("all");
  }

  const formatStatValue = (val: number) => {
    return val < 10 ? `0${val}` : `${val}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#f0e3cd] text-[#121212] pb-0">
      {/* ── 1. Hero Section (Fundo Grafite #1d1b18 com Título Claro) ── */}
      <div className="w-full pt-10 pb-12 sm:pt-14 sm:pb-16 bg-[#1d1b18] border-b border-[#3a342f]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-end justify-between">
          {/* Header Text */}
          <div className="flex flex-col gap-4 max-w-[620px]">
            <div>
              <h1
                className="uppercase"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(42px, 6.5vw, 76px)",
                  lineHeight: 0.95,
                  color: "#ffffff",
                  letterSpacing: "0.5px",
                }}
              >
                TRANSPARÊNCIA
              </h1>
            </div>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: "26px",
                color: "#d4c9b6",
                marginTop: 4,
              }}
            >
              Aqui você encontra todos os documentos públicos do Ponto de
              Cultura Zambô, organizados por ano — prestações de contas,
              relatórios, planos de trabalho e atas de reunião.
            </p>
          </div>

          {/* ── 2. Indicators (Cards com Alto Contraste e Bordas Ajustadas) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full lg:w-auto shrink-0">
            {[
              {
                value: formatStatValue(filteredDocs.length),
                label: "DOCUMENTOS PUBLICADOS",
                accent: "#f8ba01",
              },
              {
                value: formatStatValue(yearGroups.length),
                label: "ANOS DISPONÍVEIS",
                accent: "#1a7d3c",
              },
              {
                value: "100%",
                label: "PÚBLICO E TRANSPARENTE",
                accent: "#dd341f",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center px-6 py-5 rounded-[3px] relative overflow-hidden bg-[#faf4e8] border border-[#3a342f] shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-0.5"
                style={{
                  minWidth: 155,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ background: s.accent }}
                />
                <span
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: "clamp(32px, 4vw, 42px)",
                    lineHeight: 1,
                    color: "#121212",
                    letterSpacing: "0.5px",
                    marginTop: 4,
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="text-center"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 10,
                    color: "#5a4e44",
                    letterSpacing: "1px",
                    marginTop: 6,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Barra de Busca e Filtros (Limpa com Bordas Sutis) ── */}
      <div
        className="sticky top-[72px] z-30 w-full py-4 border-b border-[#c8b9a2]"
        style={{
          background: "#faf4e8",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6b5e55"
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
              className="w-full pl-10 pr-4 py-2.5 rounded-[3px] outline-none text-sm font-medium"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: "#e6d8be",
                border: "1px solid #c8b9a2",
                color: "#121212",
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Year Select */}
            <select
              value={filterYear}
              onChange={(e) =>
                setFilterYear(
                  e.target.value === "all" ? "all" : Number(e.target.value),
                )
              }
              className="w-full sm:w-auto px-4 py-2.5 rounded-[3px] outline-none cursor-pointer text-xs font-bold"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: "#e6d8be",
                border: "1px solid #c8b9a2",
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

            {/* Category Select */}
            <select
              value={filterCat}
              onChange={(e) =>
                setFilterCat(e.target.value as DocCategory | "all")
              }
              className="w-full sm:w-auto px-4 py-2.5 rounded-[3px] outline-none cursor-pointer text-xs font-bold"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: "#e6d8be",
                border: "1px solid #c8b9a2",
                color: "#3a342f",
              }}
            >
              <option value="all">TODAS AS CATEGORIAS</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c.toUpperCase()}
                </option>
              ))}
            </select>

            {/* Clear filters button */}
            {isFiltered && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2.5 rounded-[3px] cursor-pointer text-[11px] font-extrabold uppercase tracking-wider shrink-0 transition-colors bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                LIMPAR FILTROS
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 4. Seção DOCUMENTOS e Agrupamento por Ano ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <h2
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(26px, 4vw, 36px)",
              color: "#121212",
              letterSpacing: "0.5px",
            }}
          >
            DOCUMENTOS PUBLICADOS
          </h2>
        </div>

        {yearGroups.length === 0 ? (
          <EmptyState
            hasDocs={publishedDocs.length > 0}
            onClear={clearFilters}
          />
        ) : (
          yearGroups.map((group, i) => (
            <YearAccordion
              key={group.year}
              group={group}
              defaultOpen={i === 0 || search.trim().length > 0}
              searchTerm={search}
            />
          ))
        )}
      </div>

      {/* ── 5. Full-Width Banner (Lei de Acesso à Informação) Alinhado ao Footer ── */}
      <div className="w-full mt-14 bg-[#1d1b18] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-[720px]">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: "1.5px",
                color: "#f8ba01",
              }}
            >
              LEI DE ACESSO À INFORMAÇÃO (LEI Nº 12.527/2011)
            </span>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "22px",
                color: "#fdfaf3",
              }}
            >
              Todos os documentos são públicos, em cumprimento à Lei de Acesso à
              Informação (Lei nº 12.527/2011). Em caso de dúvidas ou necessidade
              de informações complementares, entre em contato:{" "}
              <a
                href="mailto:contato@zambo.org.br"
                className="underline hover:opacity-80 transition-opacity"
                style={{ color: "#f8ba01", fontWeight: 700 }}
              >
                contato@zambo.org.br
              </a>
            </p>
          </div>

          <a
            href="mailto:contato@zambo.org.br?subject=Solicita%C3%A7%C3%A3o%20de%20Documento%20-%20Portal%20de%20Transpar%C3%AAncia"
            className="flex items-center justify-center gap-2.5 w-full md:w-auto shrink-0 rounded-[3px] px-6 py-3.5 transition-colors cursor-pointer text-center bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            SOLICITAR DOCUMENTO
            <svg
              width="18"
              height="18"
              viewBox="0 0 28 28"
              fill="none"
              role="img"
              aria-label="Seta para solicitar"
            >
              <path d={svgPaths.p3e0d45f0} fill="#121212" stroke="#121212" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
