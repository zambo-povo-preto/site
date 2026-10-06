"use client";

import { useDocuments } from "@/contexts/DocumentsContext";
import svgPaths from "@/imports/Group36/svg-hkzbekptio";
import type { AdminDocument, DocCategory } from "@/types/document";
import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * ============================================================================
 * PORTAL DA TRANSPARÊNCIA - BIBLIOTECA PÚBLICA DE PRESTAÇÕES DE CONTAS
 * ============================================================================
 * O Relatório / Prestação de Contas é a entidade principal da transparência.
 * A listagem principal é limpa, institucional e orientada a publicações.
 * As notas fiscais e documentos são consultados na página pública de cada relatório.
 * Em estrito cumprimento à LGPD (sem buscas nem exibição de CPF/CNPJ na lista).
 * ============================================================================
 */

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

function CategoryBadge({ category }: { category: DocCategory }) {
  const meta = categoryMeta[category] || {
    color: "#ffffff",
    bg: "#dd341f",
  };
  return (
    <span
      className="px-2.5 py-0.5 rounded-[3px] inline-flex items-center text-[10px] font-extrabold uppercase tracking-wide border"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: meta.bg,
        color: meta.color,
        borderColor: "rgba(0,0,0,0.15)",
      }}
    >
      {category.toUpperCase()}
    </span>
  );
}

function getEvidenceSummary(doc: AdminDocument): string {
  const attachments = doc.attachments || [];
  const invoices = attachments.filter(
    (att) =>
      att.attachmentType === "invoice" ||
      Boolean(att.amount || att.invoiceNumber),
  );
  const complementaryDocs = attachments.filter(
    (att) =>
      att.attachmentType === "document" && !att.amount && !att.invoiceNumber,
  );

  const parts = ["1 documento principal"];

  if (invoices.length > 0) {
    parts.push(
      `${invoices.length} ${invoices.length === 1 ? "comprovante" : "comprovantes"}`,
    );
  }

  if (complementaryDocs.length > 0) {
    parts.push(
      `${complementaryDocs.length} ${complementaryDocs.length === 1 ? "documento" : "documentos"}`,
    );
  }

  return parts.join(" · ");
}

interface YearPublicationGroup {
  year: number;
  documents: AdminDocument[];
}

export function TransparencyDetailSection() {
  const { documents, loading } = useDocuments();

  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState<number | "all">("all");
  const [filterCat, setFilterCat] = useState<DocCategory | "all">("all");

  const publishedDocs = useMemo(() => {
    return documents.filter((d) => d.status === "published");
  }, [documents]);

  const years = useMemo(() => {
    return Array.from(
      new Set(publishedDocs.map((d) => d.year || new Date().getFullYear())),
    ).sort((a, b) => b - a);
  }, [publishedDocs]);

  // Busca pública: título, descrição ou categoria (sem CPF/CNPJ)
  const filteredDocs = useMemo(() => {
    const q = search.toLowerCase().trim();

    return publishedDocs.filter((d) => {
      const matchSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);

      const matchYear = filterYear === "all" || d.year === filterYear;
      const matchCat = filterCat === "all" || d.category === filterCat;

      return matchSearch && matchYear && matchCat;
    });
  }, [publishedDocs, search, filterYear, filterCat]);

  // Agrupamento leve por ano
  const yearGroups: YearPublicationGroup[] = useMemo(() => {
    if (filteredDocs.length === 0) return [];

    const map = new Map<number, AdminDocument[]>();
    for (const doc of filteredDocs) {
      const year = doc.year || new Date().getFullYear();
      if (!map.has(year)) map.set(year, []);
      map.get(year)?.push(doc);
    }

    const sortedYears = [...map.keys()].sort((a, b) => b - a);
    return sortedYears.map((year) => ({
      year,
      documents: map.get(year) || [],
    }));
  }, [filteredDocs]);

  const isFiltered =
    search.trim().length > 0 || filterYear !== "all" || filterCat !== "all";

  function clearFilters() {
    setSearch("");
    setFilterYear("all");
    setFilterCat("all");
  }

  return (
    <div className="w-full bg-[#faf4e8] text-[#121212] pb-0 min-h-[calc(100vh-200px)] flex flex-col justify-between">
      <div>
        {/* ── 1. Apresentação Institucional do Portal da Transparência ── */}
        <div className="w-full pt-10 pb-12 sm:pt-14 sm:pb-14 bg-[#1d1b18] border-b border-[#3a342f]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3">
            <span
              className="text-xs font-extrabold uppercase tracking-widest text-[#f8ba01]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              GESTÃO & PRESTAÇÃO DE CONTAS
            </span>

            <h1
              className="uppercase tracking-tight"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(36px, 5.5vw, 64px)",
                lineHeight: 1,
                color: "#ffffff",
              }}
            >
              PORTAL DA TRANSPARÊNCIA
            </h1>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "26px",
                color: "#d4c9b6",
                maxWidth: 720,
              }}
            >
              Consulte as prestações de contas, documentos e informações
              públicas da Zambô, organizadas por exercício financeiro.
            </p>
          </div>
        </div>

        {/* ── 2. Área Compacta de Pesquisa e Filtros ── */}
        <div
          className="sticky top-[72px] z-30 w-full py-4 border-b border-[#d8caa6]"
          style={{
            background: "#ede4d4",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center justify-between">
            {/* Input de Busca (Título, Descrição ou Categoria) */}
            <div className="relative flex-1 min-w-[260px]">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#756f67]"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
                placeholder="Buscar por título, descrição ou categoria..."
                className="w-full pl-10 pr-8 py-2.5 rounded-[4px] outline-none text-sm font-medium transition-colors border border-[#c8b9a2] focus:border-[#dd341f] bg-[#faf4e8] text-[#121212] placeholder-[#8a7d73]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#756f67] hover:text-[#121212] cursor-pointer"
                  aria-label="Limpar texto da busca"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
              {/* Filtro por Ano com Caret Down espaçado */}
              <div className="relative w-full sm:w-auto inline-flex items-center">
                <select
                  value={filterYear}
                  onChange={(e) =>
                    setFilterYear(
                      e.target.value === "all" ? "all" : Number(e.target.value),
                    )
                  }
                  className="w-full sm:w-auto appearance-none pl-3.5 pr-9 py-2.5 rounded-[4px] outline-none cursor-pointer text-xs font-semibold border border-[#c8b9a2] bg-[#faf4e8] text-[#2c2723] focus:border-[#dd341f] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <option value="all">Todos os anos</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      Exercício {y}
                    </option>
                  ))}
                </select>
                <svg
                  className="w-3.5 h-3.5 text-[#5a4e44] pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Filtro por Categoria com Caret Down espaçado */}
              <div className="relative w-full sm:w-auto inline-flex items-center">
                <select
                  value={filterCat}
                  onChange={(e) =>
                    setFilterCat(e.target.value as DocCategory | "all")
                  }
                  className="w-full sm:w-auto appearance-none pl-3.5 pr-9 py-2.5 rounded-[4px] outline-none cursor-pointer text-xs font-semibold border border-[#c8b9a2] bg-[#faf4e8] text-[#2c2723] focus:border-[#dd341f] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <option value="all">Todas as categorias</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <svg
                  className="w-3.5 h-3.5 text-[#5a4e44] pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Limpar Filtros */}
              {isFiltered && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-3.5 py-2.5 rounded-[4px] cursor-pointer text-xs font-bold uppercase tracking-wider shrink-0 transition-colors bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── 3. Listagem de Publicações / Prestações de Contas ── */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 flex flex-col gap-10">
          {loading ? (
            <div className="py-16 text-center text-[#756f67] text-sm font-medium">
              Carregando publicações do portal...
            </div>
          ) : yearGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-[4px] bg-[#faf4e8] border border-[#d8caa6] my-4">
              <span className="text-3xl mb-3">📄</span>
              <h3
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 22,
                  color: "#121212",
                }}
              >
                {publishedDocs.length > 0
                  ? "NENHUMA PUBLICAÇÃO ENCONTRADA PARA ESTES FILTROS"
                  : "NENHUMA PUBLICAÇÃO DISPONÍVEL NO MOMENTO"}
              </h3>
              <p
                className="mt-2 max-w-md text-sm text-[#5a4e44]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {publishedDocs.length > 0
                  ? "Tente buscar por outro termo ou selecione outro ano/categoria."
                  : "Os relatórios e prestações de contas serão disponibilizados assim que homologados."}
              </p>
              {isFiltered && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 px-4 py-2 rounded-[4px] text-xs font-bold uppercase tracking-wider bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white transition-colors cursor-pointer"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Limpar filtros de busca
                </button>
              )}
            </div>
          ) : (
            yearGroups.map((group) => (
              <section key={group.year} className="flex flex-col gap-4">
                {/* Header de Ano Agrupador (Leve e Institucional) */}
                <div className="flex items-baseline justify-between border-b border-[#d8caa6] pb-2">
                  <div className="flex items-baseline gap-3">
                    <h2
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: 28,
                        color: "#121212",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {group.year}
                    </h2>
                    <span
                      className="text-xs font-semibold text-[#756f67]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {group.documents.length}{" "}
                      {group.documents.length === 1
                        ? "publicação"
                        : "publicações"}
                    </span>
                  </div>
                </div>

                {/* Cards das Publicações daquele Ano */}
                <div className="flex flex-col gap-3.5">
                  {group.documents.map((doc) => {
                    const evidenceSummary = getEvidenceSummary(doc);

                    return (
                      <article
                        key={doc.id}
                        className="p-5 sm:p-6 rounded-[4px] bg-[#faf4e8] border border-[#d8caa6] hover:border-[#121212] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                      >
                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                          {/* Categoria */}
                          <div className="flex items-center gap-2">
                            <CategoryBadge category={doc.category} />
                          </div>

                          {/* Título do Relatório */}
                          <h3
                            style={{
                              fontFamily: "'Anton', sans-serif",
                              fontSize: "clamp(18px, 2.2vw, 22px)",
                              color: "#121212",
                              lineHeight: 1.25,
                              letterSpacing: "0.2px",
                            }}
                          >
                            {doc.title}
                          </h3>

                          {/* Descrição curta (se houver) */}
                          {doc.description && (
                            <p
                              className="text-sm text-[#5a4e44] line-clamp-2"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {doc.description}
                            </p>
                          )}

                          {/* Metadados: Exercício, Publicação e Resumo de Documentos */}
                          <div
                            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#756f67] mt-1"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            <span className="font-semibold text-[#3a342f]">
                              Exercício {doc.year}
                            </span>
                            <span>·</span>
                            <span>Publicado em {doc.publishedAt}</span>
                            <span>·</span>
                            <span className="font-medium text-[#121212]">
                              {evidenceSummary}
                            </span>
                          </div>
                        </div>

                        {/* Ação de Consulta ao Relatório */}
                        <div className="shrink-0 flex items-center">
                          <Link
                            href={`/transparencia/${doc.id}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white cursor-pointer"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              textDecoration: "none",
                            }}
                          >
                            <span>CONSULTAR RELATÓRIO</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      {/* ── 4. Rodapé Institucional: Lei de Acesso à Informação & LGPD ── */}
      <div className="w-full bg-[#1d1b18] border-t border-[#3a342f] mt-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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
              LEI DE ACESSO À INFORMAÇÃO (LEI Nº 12.527/2011) & LGPD
            </span>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "22px",
                color: "#fdfaf3",
              }}
            >
              Todos os documentos desta página são públicos para fins de
              controle social e prestação de contas, com dados pessoais
              salvaguardados pela LGPD. Em caso de dúvidas ou pedidos de
              informações adicionais:{" "}
              <a
                href="mailto:contato@zambo.org.br"
                className="underline hover:opacity-80 transition-opacity font-semibold"
                style={{ color: "#f8ba01" }}
              >
                contato@zambo.org.br
              </a>
            </p>
          </div>

          <a
            href="mailto:contato@zambo.org.br?subject=Solicita%C3%A7%C3%A3o%20de%20Documento%20-%20Portal%20de%20Transpar%C3%AAncia"
            className="flex items-center justify-center gap-2.5 w-full md:w-auto shrink-0 rounded-[4px] px-5 py-3 transition-colors cursor-pointer text-center bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white text-xs font-extrabold uppercase tracking-wider"
            style={{
              fontFamily: "'Inter', sans-serif",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            SOLICITAR DOCUMENTO
            <svg
              width="16"
              height="16"
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
