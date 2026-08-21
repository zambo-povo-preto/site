"use client";

import { useDocuments } from "@/contexts/DocumentsContext";
import svgPaths from "@/imports/Group36/svg-hkzbekptio";
import { getFileDownloadUrl } from "@/lib/api";
import type {
  AdminDocument,
  DocCategory,
  TransparencyDocument,
  YearGroup,
} from "@/types/document";
import { useState } from "react";

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
  Edital: { color: "#121212", bg: "#e8d5b4" },
};

function FileTag({ type }: { type: "PDF" | "XLSX" | "DOC" }) {
  const colors: Record<string, string> = {
    PDF: "#dd341f",
    XLSX: "#1a7d3c",
    DOC: "#1a5fa8",
  };
  return (
    <div
      className="flex items-center justify-center rounded-[4px] shrink-0"
      style={{
        width: 44,
        height: 52,
        background: colors[type] ?? "#dd341f",
        border: "1.5px solid #121212",
        boxShadow: "2px 2px 0px #121212",
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
        border: "1px solid #121212",
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
      width="24"
      height="24"
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

function DocumentRow({ doc }: { doc: TransparencyDocument }) {
  const downloadUrl = getFileDownloadUrl(doc.id);

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4.5 transition-colors border-b last:border-b-0"
      style={{
        borderColor: "#e8d5b4",
        background: "#ffffff",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(248,186,1,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#ffffff";
      }}
    >
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

          <div className="flex items-center gap-2 mt-0.5">
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
          </div>
        </div>
      </div>

      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="flex items-center justify-center gap-2 shrink-0 rounded-[4px] px-5 py-2.5 transition-all cursor-pointer w-full sm:w-auto"
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 14,
          color: "#121212",
          letterSpacing: "0.5px",
          border: "1.5px solid #121212",
          background: "#f8ba01",
          boxShadow: "3px 3px 0px #121212",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.style.transform = "translate(1px, 1px)";
          e.currentTarget.style.boxShadow = "2px 2px 0px #121212";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#f8ba01";
          e.currentTarget.style.transform = "translate(0, 0)";
          e.currentTarget.style.boxShadow = "3px 3px 0px #121212";
        }}
      >
        <DownloadIcon />
        BAIXAR
      </a>
    </div>
  );
}

function YearAccordion({
  group,
  defaultOpen,
}: { group: YearGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  const countByCategory = group.documents.reduce<Record<string, number>>(
    (acc, d) => {
      acc[d.category] = (acc[d.category] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const totalDocs = group.documents.length;

  return (
    <div
      className="overflow-hidden rounded-[4px] transition-all"
      style={{
        border: "1.5px solid #121212",
        boxShadow: "4px 4px 0px #121212",
        background: "#fdfaf3",
      }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4.5 text-left transition-colors cursor-pointer"
        style={{
          background: open ? "#f8ba01" : "#fdfaf3",
          borderBottom: open ? "1.5px solid #121212" : "none",
        }}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <div className="flex items-baseline gap-3">
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(32px, 5vw, 48px)",
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
                  className="px-2 py-0.5 rounded-[3px] text-[10px] font-black uppercase tracking-wide"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: open ? "rgba(18,18,18,0.12)" : meta.bg,
                    color: open ? "#121212" : meta.color,
                    border: "1px solid #121212",
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
        <div style={{ background: "#ffffff" }}>
          {group.documents.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} />
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
      className="flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center rounded-[4px] my-4"
      style={{
        background: "#fdfaf3",
        border: "1.5px solid #121212",
        boxShadow: "4px 4px 0px #121212",
      }}
    >
      <div
        className="flex items-center justify-center w-14 h-14 rounded-full mb-4"
        style={{
          background: "#f8ba01",
          border: "1.5px solid #121212",
          boxShadow: "2px 2px 0px #121212",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#121212"
          strokeWidth="2.5"
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
          className="mt-5 px-5 py-2.5 rounded-[4px] cursor-pointer transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 14,
            color: "#121212",
            background: "#f8ba01",
            border: "1.5px solid #121212",
            boxShadow: "3px 3px 0px #121212",
            letterSpacing: "0.5px",
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
    const matchSearch =
      !search ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description?.toLowerCase().includes(search.toLowerCase()) ||
      d.fileName?.toLowerCase().includes(search.toLowerCase());

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
    <div className="w-full min-h-screen background pb-12">
      {/* ── 1. Hero Section (Predominantemente Claro / Creme) ── */}
      <div className="w-full px-4 sm:px-6 lg:px-[80px] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#121212]/15">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-end justify-between">
          {/* Header Text */}
          <div className="flex flex-col gap-4 max-w-[620px]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-[#f8ba01] rounded-[1px] border border-[#121212]" />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: "1.8px",
                  color: "#121212",
                }}
              >
                PONTO DE CULTURA ZAMBÔ
              </span>
            </div>

            <div>
              <h1
                className="uppercase"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(42px, 6.5vw, 76px)",
                  lineHeight: 0.95,
                  color: "#121212",
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
                color: "#3a342f",
                marginTop: 4,
              }}
            >
              Aqui você encontra todos os documentos públicos do Ponto de
              Cultura Zambô, organizados por ano — prestações de contas,
              relatórios, planos de trabalho e atas de reunião.
            </p>
          </div>

          {/* ── 2. Indicators (3 Cards Claros com Acento de Cor) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full lg:w-auto shrink-0">
            {[
              {
                value: formatStatValue(filteredDocs.length),
                label: "DOCUMENTOS PUBLICADOS",
                accent: "#f8ba01", // Amarelo
              },
              {
                value: formatStatValue(yearGroups.length),
                label: "ANO DISPONÍVEL",
                accent: "#1a7d3c", // Verde
              },
              {
                value: "100%",
                label: "PÚBLICO",
                accent: "#dd341f", // Vermelho
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center px-6 py-5 rounded-[4px] relative overflow-hidden transition-transform hover:-translate-y-0.5"
                style={{
                  background: "#fdfaf3",
                  border: "1.5px solid #121212",
                  boxShadow: "3px 3px 0px #121212",
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
                    color: "#6b5e55",
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

      {/* ── 3. Barra de Busca e Filtros (Faixa Grafite/Preta de Transição) ── */}
      <div
        className="sticky top-[72px] z-30 w-full px-4 sm:px-6 lg:px-[80px] py-4"
        style={{
          background: "#1d1b18",
          borderTop: "1.5px solid #121212",
          borderBottom: "1.5px solid #121212",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center justify-between">
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
              placeholder="Buscar documento por nome ou descrição..."
              className="w-full pl-10 pr-4 py-2.5 rounded-[4px] outline-none transition-all"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                background: "#fdfaf3",
                border: "1.5px solid #121212",
                color: "#121212",
                boxShadow: "2px 2px 0px #121212",
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
              className="w-full sm:w-auto px-4 py-2.5 rounded-[4px] outline-none cursor-pointer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 12,
                background: "#fdfaf3",
                border: "1.5px solid #121212",
                color: "#121212",
                boxShadow: "2px 2px 0px #121212",
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
              className="w-full sm:w-auto px-4 py-2.5 rounded-[4px] outline-none cursor-pointer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 12,
                background: "#fdfaf3",
                border: "1.5px solid #121212",
                color: "#121212",
                boxShadow: "2px 2px 0px #121212",
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
                className="px-4 py-2.5 rounded-[4px] cursor-pointer text-[11px] font-black uppercase tracking-wider shrink-0 transition-transform active:translate-x-0.5 active:translate-y-0.5"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: "#f8ba01",
                  color: "#121212",
                  border: "1.5px solid #121212",
                  boxShadow: "2px 2px 0px #121212",
                }}
              >
                LIMPAR FILTROS
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 4. Seção DOCUMENTOS e Agrupamento por Ano ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-[80px] pt-10 pb-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <h2
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(26px, 4vw, 36px)",
              color: "#121212",
              letterSpacing: "0.5px",
            }}
          >
            DOCUMENTOS
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
              defaultOpen={i === 0}
            />
          ))
        )}
      </div>

      {/* ── 5. Área de Informação / Solicitação (Lei de Acesso à Informação) ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-[80px] pt-6 pb-4">
        <div
          className="w-full rounded-[4px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
          style={{
            background: "#1d1b18",
            border: "1.5px solid #121212",
            boxShadow: "4px 4px 0px #121212",
          }}
        >
          {/* Subtle Top Pan-African / Yellow Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#f8ba01]" />

          <div className="flex flex-col gap-2 max-w-[680px]">
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
            className="flex items-center justify-center gap-2.5 w-full md:w-auto shrink-0 rounded-[4px] px-6 py-3.5 transition-all cursor-pointer text-center"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 15,
              color: "#121212",
              background: "#f8ba01",
              border: "1.5px solid #121212",
              boxShadow: "3px 3px 0px #ffffff",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.transform = "translate(1px, 1px)";
              e.currentTarget.style.boxShadow = "2px 2px 0px #f8ba01";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f8ba01";
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "3px 3px 0px #ffffff";
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
