"use client";

import { transparencyYearGroups } from "@/data/transparencyDocuments";
import svgPaths from "@/imports/Group36/svg-hkzbekptio";
import type {
  DocCategory,
  TransparencyDocument,
  YearGroup,
} from "@/types/document";
import { useState } from "react";

const categoryMeta: Record<DocCategory, { color: string; bg: string }> = {
  "Prestação de Contas": { color: "#fff", bg: "#dd341f" },
  "Relatório de Atividades": { color: "#121212", bg: "#f8ba01" },
  "Plano de Trabalho": { color: "#fff", bg: "#1a7d3c" },
  "Ata de Reunião": { color: "#f1e5d1", bg: "#1d1b18" },
  Edital: { color: "#121212", bg: "#e8d5b4" },
};

function FileIcon({ type }: { type: "PDF" | "XLSX" | "DOC" }) {
  const colors: Record<string, string> = {
    PDF: "#dd341f",
    XLSX: "#1a7d3c",
    DOC: "#1a5fa8",
  };
  return (
    <div
      className="flex items-center justify-center rounded-[3px] shrink-0"
      style={{
        width: 40,
        height: 48,
        background: colors[type] ?? "#888",
        border: "2px solid #121212",
      }}
    >
      <span
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 11,
          color: "#fff",
          letterSpacing: "0.5px",
        }}
      >
        {type}
      </span>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
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
  const meta = categoryMeta[doc.category];
  return (
    <div
      className="flex items-center gap-4 px-5 py-4 group transition-colors"
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(248,186,1,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <FileIcon type={doc.fileType} />

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 15,
              color: "#121212",
              letterSpacing: "0.3px",
            }}
          >
            {doc.title}
          </span>
          <span
            className="px-2 py-0.5 rounded-[2px] shrink-0"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 10,
              letterSpacing: "0.8px",
              background: meta.bg,
              color: meta.color,
            }}
          >
            {doc.category.toUpperCase()}
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 13,
            lineHeight: "20px",
            color: "#6b5e55",
          }}
        >
          {doc.description}
        </p>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            color: "#9a8f86",
            letterSpacing: "0.3px",
          }}
        >
          Publicado em {doc.date} · {doc.fileSize}
        </span>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 shrink-0 rounded-[3px] px-4 py-2 transition-all"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: 12,
          color: "#121212",
          letterSpacing: "0.5px",
          border: "2px solid #121212",
          background: "#fff",
          boxShadow: "3px 3px 0px #121212",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#f8ba01";
          e.currentTarget.style.boxShadow = "1px 1px 0px #121212";
          e.currentTarget.style.transform = "translate(2px,2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.boxShadow = "3px 3px 0px #121212";
          e.currentTarget.style.transform = "translate(0,0)";
        }}
      >
        <DownloadIcon />
        BAIXAR
      </button>
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

  return (
    <div
      className="overflow-hidden"
      style={{
        border: "3px solid #121212",
        borderRadius: 4,
        boxShadow: open ? "6px 6px 0px #121212" : "4px 4px 0px #121212",
        transition: "box-shadow 0.2s ease",
      }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
        style={{ background: open ? "#1d1b18" : "#f5eedd" }}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-end gap-5 flex-wrap">
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1,
              color: open ? "#f8ba01" : "#121212",
              letterSpacing: "1px",
              transition: "color 0.2s ease",
            }}
          >
            {group.year}
          </span>
          <div className="flex flex-wrap gap-2 pb-1">
            {Object.entries(countByCategory).map(([cat, count]) => {
              const meta = categoryMeta[cat as DocCategory];
              return (
                <span
                  key={cat}
                  className="px-2 py-0.5 rounded-[2px]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 10,
                    letterSpacing: "0.8px",
                    background: open ? "rgba(255,255,255,0.1)" : meta.bg,
                    color: open ? "#c9b89a" : meta.color,
                    border: open ? "1px solid rgba(255,255,255,0.15)" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {count} {cat.toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>
        <div
          style={{
            color: open ? "#f8ba01" : "#121212",
            transition: "color 0.2s ease",
          }}
        >
          <ChevronIcon open={open} />
        </div>
      </button>

      {open && (
        <div style={{ background: "#fff" }}>
          {group.documents.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TransparencyDetailSection() {
  const [filter, setFilter] = useState<DocCategory | "Todos">("Todos");

  const categories: (DocCategory | "Todos")[] = [
    "Todos",
    "Prestação de Contas",
    "Relatório de Atividades",
    "Plano de Trabalho",
    "Ata de Reunião",
    "Edital",
  ];

  const filtered: YearGroup[] = transparencyYearGroups
    .map((g) => ({
      ...g,
      documents:
        filter === "Todos"
          ? g.documents
          : g.documents.filter((d) => d.category === filter),
    }))
    .filter((g) => g.documents.length > 0);

  const totalDocs = transparencyYearGroups.reduce(
    (s, g) => s + g.documents.length,
    0,
  );

  return (
    <div className="w-full min-h-screen">
      {/* ── Hero header ── */}
      <div
        className="w-full px-6 lg:px-[80px] py-16"
        style={{ borderBottom: "3px solid #121212" }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10 items-end justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div
                className="w-1 h-5 shrink-0"
                style={{ background: "#f8ba01" }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 14,
                  letterSpacing: "1.5px",
                  color: "#121212",
                }}
              >
                PONTO DE CULTURA ZAMBÔ
              </span>
            </div>
            <h1
              className="uppercase"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(40px, 6vw, 80px)",
                lineHeight: 1,
                color: "#121212",
                letterSpacing: "1px",
              }}
            >
              TRANSPARÊNCIA
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 17,
                lineHeight: "28px",
                color: "#3a342f",
                maxWidth: 520,
              }}
            >
              Aqui você encontra todos os documentos públicos do Ponto de
              Cultura Zambô, organizados por ano — prestações de contas,
              relatórios, planos de trabalho e atas de reunião.
            </p>
          </div>

          <div
            className="flex gap-0 shrink-0"
            style={{
              border: "3px solid #121212",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "6px 6px 0px #121212",
            }}
          >
            {[
              { value: String(totalDocs), label: "Documentos" },
              { value: String(transparencyYearGroups.length), label: "Anos" },
              { value: "100%", label: "Público" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center px-7 py-5"
                style={{
                  borderRight: i < 2 ? "3px solid #121212" : "none",
                  background: i === 1 ? "#f8ba01" : "#fff",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: "clamp(28px, 3vw, 44px)",
                    lineHeight: 1,
                    color: "#121212",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    color: "#6b5e55",
                    letterSpacing: "1px",
                    marginTop: 4,
                  }}
                >
                  {s.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div
        className="sticky top-0 z-10 w-full px-6 lg:px-[80px] py-3 overflow-x-auto"
        style={{ background: "#1d1b18", borderBottom: "3px solid #121212" }}
      >
        <div className="max-w-[1200px] mx-auto flex gap-2 items-center">
          <span
            className="shrink-0 mr-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 11,
              color: "#9a8f86",
              letterSpacing: "1.5px",
            }}
          >
            FILTRAR:
          </span>
          {categories.map((cat) => {
            const active = filter === cat;
            const meta = cat !== "Todos" ? categoryMeta[cat] : null;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setFilter(cat)}
                className="shrink-0 px-3 py-1.5 rounded-[3px] transition-all"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: "0.8px",
                  border: `2px solid ${active ? (meta?.bg ?? "#f8ba01") : "rgba(255,255,255,0.15)"}`,
                  background: active ? (meta?.bg ?? "#f8ba01") : "transparent",
                  color: active ? (meta?.color ?? "#121212") : "#9a8f86",
                  cursor: "pointer",
                }}
              >
                {cat.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Year accordions ── */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[80px] py-14 flex flex-col gap-6">
        {filtered.length === 0 ? (
          <p
            className="text-center py-20"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              color: "#9a8f86",
            }}
          >
            Nenhum documento encontrado para esse filtro.
          </p>
        ) : (
          filtered.map((group, i) => (
            <YearAccordion
              key={group.year}
              group={group}
              defaultOpen={i === 0}
            />
          ))
        )}
      </div>

      {/* ── Footer note ── */}
      <div
        className="w-full px-6 lg:px-[80px] py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ background: "#1d1b18", borderTop: "3px solid #121212" }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "22px",
            color: "#9a8f86",
            maxWidth: 560,
          }}
        >
          Todos os documentos são públicos, em cumprimento à Lei de Acesso à
          Informação (Lei nº 12.527/2011). Em caso de dúvidas, entre em contato:
          <span style={{ color: "#f8ba01" }}> contato@zambo.org.br</span>
        </p>
        <button
          type="button"
          className="flex items-center gap-2 shrink-0 rounded-[3px] px-5 py-3"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 15,
            color: "#121212",
            background: "#f8ba01",
            border: "2px solid #f8ba01",
            boxShadow: "4px 4px 0px rgba(255,255,255,0.1)",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
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
        </button>
      </div>
    </div>
  );
}
