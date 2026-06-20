"use client";

import { useState } from "react";
import svgPaths from "../../imports/Group36/svg-hkzbekptio";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocCategory = "Prestação de Contas" | "Relatório de Atividades" | "Plano de Trabalho" | "Ata de Reunião" | "Edital";

interface Document {
  id: string;
  title: string;
  category: DocCategory;
  description: string;
  fileType: "PDF" | "XLSX" | "DOC";
  fileSize: string;
  date: string;
}

interface YearGroup {
  year: number;
  documents: Document[];
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const yearGroups: YearGroup[] = [
  {
    year: 2024,
    documents: [
      { id: "1", title: "Prestação de Contas Anual 2024", category: "Prestação de Contas", description: "Demonstrativo financeiro completo do exercício de 2024, incluindo receitas, despesas e saldo.", fileType: "PDF", fileSize: "2,4 MB", date: "31/01/2025" },
      { id: "2", title: "Relatório de Atividades 2024", category: "Relatório de Atividades", description: "Resumo de todas as ações, projetos e eventos realizados ao longo de 2024.", fileType: "PDF", fileSize: "5,1 MB", date: "31/01/2025" },
      { id: "3", title: "Plano de Trabalho 2024", category: "Plano de Trabalho", description: "Planejamento anual de projetos, metas e cronograma de execução para o ano de 2024.", fileType: "PDF", fileSize: "1,2 MB", date: "15/01/2024" },
      { id: "4", title: "Ata de Assembleia Geral — Mar/2024", category: "Ata de Reunião", description: "Registro da Assembleia Geral Ordinária realizada em março de 2024.", fileType: "PDF", fileSize: "380 KB", date: "20/03/2024" },
      { id: "5", title: "Ata de Assembleia Geral — Set/2024", category: "Ata de Reunião", description: "Registro da Assembleia Geral Extraordinária realizada em setembro de 2024.", fileType: "PDF", fileSize: "290 KB", date: "18/09/2024" },
      { id: "6", title: "Edital de Seleção de Artistas 2024", category: "Edital", description: "Edital para seleção de artistas e educadores para os programas do Ponto de Cultura.", fileType: "PDF", fileSize: "650 KB", date: "05/02/2024" },
    ],
  },
  {
    year: 2023,
    documents: [
      { id: "7", title: "Prestação de Contas Anual 2023", category: "Prestação de Contas", description: "Demonstrativo financeiro completo do exercício de 2023.", fileType: "PDF", fileSize: "2,1 MB", date: "31/01/2024" },
      { id: "8", title: "Relatório de Atividades 2023", category: "Relatório de Atividades", description: "Resumo de todas as ações, projetos e eventos realizados ao longo de 2023.", fileType: "PDF", fileSize: "4,8 MB", date: "31/01/2024" },
      { id: "9", title: "Plano de Trabalho 2023", category: "Plano de Trabalho", description: "Planejamento anual de projetos e metas para 2023.", fileType: "PDF", fileSize: "1,0 MB", date: "10/01/2023" },
      { id: "10", title: "Ata de Assembleia Geral — Abr/2023", category: "Ata de Reunião", description: "Registro da Assembleia Geral Ordinária realizada em abril de 2023.", fileType: "PDF", fileSize: "310 KB", date: "12/04/2023" },
      { id: "11", title: "Balanço Patrimonial 2023", category: "Prestação de Contas", description: "Balanço patrimonial e demonstrações contábeis do exercício de 2023.", fileType: "XLSX", fileSize: "890 KB", date: "28/02/2024" },
    ],
  },
  {
    year: 2022,
    documents: [
      { id: "12", title: "Prestação de Contas Anual 2022", category: "Prestação de Contas", description: "Demonstrativo financeiro completo do exercício de 2022.", fileType: "PDF", fileSize: "1,9 MB", date: "28/02/2023" },
      { id: "13", title: "Relatório de Atividades 2022", category: "Relatório de Atividades", description: "Resumo de todas as ações e projetos realizados em 2022.", fileType: "PDF", fileSize: "4,2 MB", date: "28/02/2023" },
      { id: "14", title: "Plano de Trabalho 2022", category: "Plano de Trabalho", description: "Planejamento anual para o exercício de 2022.", fileType: "PDF", fileSize: "980 KB", date: "07/01/2022" },
      { id: "15", title: "Edital ProAC — Ponto de Cultura 2022", category: "Edital", description: "Edital de convênio com o Programa de Ação Cultural do Estado de São Paulo.", fileType: "PDF", fileSize: "1,3 MB", date: "14/03/2022" },
    ],
  },
  {
    year: 2021,
    documents: [
      { id: "16", title: "Prestação de Contas Anual 2021", category: "Prestação de Contas", description: "Demonstrativo financeiro completo do exercício de 2021.", fileType: "PDF", fileSize: "1,7 MB", date: "28/02/2022" },
      { id: "17", title: "Relatório de Atividades 2021", category: "Relatório de Atividades", description: "Resumo das ações realizadas durante o exercício de 2021.", fileType: "PDF", fileSize: "3,6 MB", date: "28/02/2022" },
      { id: "18", title: "Ata de Assembleia Geral — Jun/2021", category: "Ata de Reunião", description: "Registro da Assembleia Geral realizada em junho de 2021.", fileType: "PDF", fileSize: "270 KB", date: "30/06/2021" },
    ],
  },
  {
    year: 2020,
    documents: [
      { id: "19", title: "Prestação de Contas Anual 2020", category: "Prestação de Contas", description: "Demonstrativo financeiro do exercício de 2020.", fileType: "PDF", fileSize: "1,5 MB", date: "26/02/2021" },
      { id: "20", title: "Relatório de Atividades 2020", category: "Relatório de Atividades", description: "Resumo das ações realizadas em 2020, incluindo adaptações ao período pandêmico.", fileType: "PDF", fileSize: "3,1 MB", date: "26/02/2021" },
      { id: "21", title: "Plano de Trabalho 2020", category: "Plano de Trabalho", description: "Planejamento de atividades para o exercício de 2020.", fileType: "PDF", fileSize: "870 KB", date: "08/01/2020" },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const categoryMeta: Record<DocCategory, { color: string; bg: string }> = {
  "Prestação de Contas": { color: "#fff", bg: "#dd341f" },
  "Relatório de Atividades": { color: "#121212", bg: "#f8ba01" },
  "Plano de Trabalho": { color: "#fff", bg: "#1a7d3c" },
  "Ata de Reunião": { color: "#f1e5d1", bg: "#1d1b18" },
  "Edital": { color: "#121212", bg: "#e8d5b4" },
};

function FileIcon({ type }: { type: "PDF" | "XLSX" | "DOC" }) {
  const colors: Record<string, string> = { PDF: "#dd341f", XLSX: "#1a7d3c", DOC: "#1a5fa8" };
  return (
    <div
      className="flex items-center justify-center rounded-[3px] shrink-0"
      style={{ width: 40, height: 48, background: colors[type] ?? "#888", border: "2px solid #121212" }}
    >
      <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 11, color: "#fff", letterSpacing: "0.5px" }}>
        {type}
      </span>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── Document row ─────────────────────────────────────────────────────────────

function DocumentRow({ doc }: { doc: Document }) {
  const meta = categoryMeta[doc.category];
  return (
    <div
      className="flex items-center gap-4 px-5 py-4 group transition-colors"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: "transparent" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(248,186,1,0.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* File icon */}
      <FileIcon type={doc.fileType} />

      {/* Info */}
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
          {/* Category badge */}
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

      {/* Download button */}
      <button
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
          (e.currentTarget as HTMLButtonElement).style.background = "#f8ba01";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "1px 1px 0px #121212";
          (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px,2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#fff";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px #121212";
          (e.currentTarget as HTMLButtonElement).style.transform = "translate(0,0)";
        }}
      >
        <DownloadIcon />
        BAIXAR
      </button>
    </div>
  );
}

// ─── Year accordion ───────────────────────────────────────────────────────────

function YearAccordion({ group, defaultOpen }: { group: YearGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  const countByCategory = group.documents.reduce<Record<string, number>>((acc, d) => {
    acc[d.category] = (acc[d.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div
      className="overflow-hidden"
      style={{ border: "3px solid #121212", borderRadius: 4, boxShadow: open ? "6px 6px 0px #121212" : "4px 4px 0px #121212", transition: "box-shadow 0.2s ease" }}
    >
      {/* Header */}
      <button
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
        <div style={{ color: open ? "#f8ba01" : "#121212", transition: "color 0.2s ease" }}>
          <ChevronIcon open={open} />
        </div>
      </button>

      {/* Documents */}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Transparencia() {
  const [filter, setFilter] = useState<DocCategory | "Todos">("Todos");

  const categories: (DocCategory | "Todos")[] = [
    "Todos",
    "Prestação de Contas",
    "Relatório de Atividades",
    "Plano de Trabalho",
    "Ata de Reunião",
    "Edital",
  ];

  const filtered: YearGroup[] = yearGroups.map((g) => ({
    ...g,
    documents: filter === "Todos" ? g.documents : g.documents.filter((d) => d.category === filter),
  })).filter((g) => g.documents.length > 0);

  const totalDocs = yearGroups.reduce((s, g) => s + g.documents.length, 0);

  return (
    <div className="w-full min-h-screen" style={{ background: "#f5eedd" }}>

      {/* ── Hero header ── */}
      <div
        className="w-full px-6 lg:px-[80px] py-16"
        style={{ borderBottom: "3px solid #121212", background: "#f5eedd" }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10 items-end justify-between">
          {/* Left */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 shrink-0" style={{ background: "#f8ba01" }} />
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
              Aqui você encontra todos os documentos públicos do Ponto de Cultura Zambô, organizados por ano — prestações de contas, relatórios, planos de trabalho e atas de reunião.
            </p>
          </div>

          {/* Right — stats */}
          <div
            className="flex gap-0 shrink-0"
            style={{ border: "3px solid #121212", borderRadius: 4, overflow: "hidden", boxShadow: "6px 6px 0px #121212" }}
          >
            {[
              { value: String(totalDocs), label: "Documentos" },
              { value: String(yearGroups.length), label: "Anos" },
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
            <YearAccordion key={group.year} group={group} defaultOpen={i === 0} />
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
          Todos os documentos são públicos, em cumprimento à Lei de Acesso à Informação (Lei nº 12.527/2011). Em caso de dúvidas, entre em contato:
          <span style={{ color: "#f8ba01" }}> contato@zambo.org.br</span>
        </p>
        <button
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
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
            <path d={svgPaths.p3e0d45f0} fill="#121212" stroke="#121212" />
          </svg>
        </button>
      </div>
    </div>
  );
}
