"use client";

import { useDocuments } from "@/contexts/DocumentsContext";
import type { AdminDocument, DocCategory } from "@/types/document";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  FileText,
  Plus,
  Receipt,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES: DocCategory[] = [
  "Prestação de Contas",
  "Relatório de Atividades",
  "Plano de Trabalho",
  "Ata de Reunião",
  "Edital",
];

const CATEGORY_COLORS: Record<DocCategory, { bg: string; color: string }> = {
  "Prestação de Contas": { bg: "#FDF2F0", color: "#C02D1D" },
  "Relatório de Atividades": { bg: "#FFF4CC", color: "#8A6500" },
  "Plano de Trabalho": { bg: "#EAF5EC", color: "#166832" },
  "Ata de Reunião": { bg: "#F2EFE9", color: "#3A352F" },
  Edital: { bg: "#F5F2EB", color: "#554F48" },
};

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: CURRENT_YEAR - 2018 },
  (_, i) => CURRENT_YEAR - i,
);

function Badge({ category }: { category: DocCategory }) {
  const { bg, color } = CATEGORY_COLORS[category] ?? {
    bg: "#F5F2EB",
    color: "#554F48",
  };
  return (
    <span
      className="px-2.5 py-1 rounded-md shrink-0 font-medium text-[11px] tracking-wide inline-flex items-center"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: bg,
        color,
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {category}
    </span>
  );
}

function StatCard({
  value,
  label,
  accentColor,
}: {
  value: string | number;
  label: string;
  accentColor: string;
}) {
  return (
    <div className="bg-white rounded-lg p-5 border border-[#E3DCCF] flex flex-col justify-between relative overflow-hidden shadow-xs hover:border-[#D5CCBC] transition-colors">
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: accentColor }}
      />
      <div className="flex flex-col">
        <span
          className="text-3xl sm:text-4xl text-[#222222] tracking-tight leading-none mb-1.5"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          {value}
        </span>
        <span
          className="text-xs font-medium text-[#756F67] uppercase tracking-wider"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const { documents, loading } = useDocuments();

  const [activeTab, setActiveTab] = useState<"published" | "draft">(
    "published",
  );
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  const totalPublished = documents.filter(
    (d) => d.status === "published",
  ).length;
  const totalDraft = documents.filter((d) => d.status === "draft").length;
  const distinctYears = new Set(documents.map((d) => d.year)).size;

  const filtered = documents.filter((doc) => {
    // Filtragem primária pelas Abas de Status
    if (doc.status !== activeTab) return false;

    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      doc.title.toLowerCase().includes(q) ||
      doc.description?.toLowerCase().includes(q) ||
      doc.fileName?.toLowerCase().includes(q);

    const matchCat = catFilter === "all" || doc.category === catFilter;
    const matchYear = yearFilter === "all" || String(doc.year) === yearFilter;

    return matchSearch && matchCat && matchYear;
  });

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
              Relatórios
            </h1>
            <p
              className="text-xs sm:text-sm text-[#756F67]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Gerencie os relatórios anuais, prestações de contas e publicações
              oficiais.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/relatorios/novo"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] transition-colors shadow-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Plus className="w-4 h-4" />
              <span>Novo relatório</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 flex flex-col gap-8">
        {/* ── Statistics Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            value={documents.length}
            label="Total de Relatórios"
            accentColor="#F5B900"
          />
          <StatCard
            value={totalPublished}
            label="Publicados"
            accentColor="#1A7D3C"
          />
          <StatCard
            value={totalDraft}
            label="Rascunhos"
            accentColor="#756F67"
          />
          <StatCard
            value={distinctYears || 1}
            label="Exercícios / Anos"
            accentColor="#1A5FA8"
          />
        </div>

        {/* ── Status Tabs (Publicados / Rascunhos) ── */}
        <div className="flex items-center gap-2 border-b border-[#E3DCCF]">
          <button
            type="button"
            onClick={() => setActiveTab("published")}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === "published"
                ? "border-[#F5B900] text-[#222222]"
                : "border-transparent text-[#756F67] hover:text-[#222222]"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span>Publicados</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeTab === "published"
                  ? "bg-[#EAF5EC] text-[#1A7D3C] border border-[#CBE5D0]"
                  : "bg-[#FAF7F2] text-[#756F67] border border-[#E3DCCF]"
              }`}
            >
              {totalPublished}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("draft")}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === "draft"
                ? "border-[#F5B900] text-[#222222]"
                : "border-transparent text-[#756F67] hover:text-[#222222]"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span>Rascunhos</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeTab === "draft"
                  ? "bg-[#FFF4CC] text-[#8A6500] border border-[#F0DC99]"
                  : "bg-[#FAF7F2] text-[#756F67] border border-[#E3DCCF]"
              }`}
            >
              {totalDraft}
            </span>
          </button>
        </div>

        {/* ── Search & Filters Bar ── */}
        <div className="bg-white rounded-lg p-4 sm:p-5 border border-[#E3DCCF] flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between shadow-xs">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#756F67] w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                activeTab === "published"
                  ? "Buscar relatório publicado por título ou descrição..."
                  : "Buscar rascunho por título ou descrição..."
              }
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] placeholder-[#756F67] focus:outline-none focus:border-[#F5B900] focus:bg-white transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Select Exercício / Ano com Caret Down devidamente espaçado */}
            <div className="relative inline-flex items-center">
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 text-xs font-medium rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900] cursor-pointer transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <option value="all">Todos os Anos</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    Exercício {y}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="w-3.5 h-3.5 text-[#756F67] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>

            {/* Select Categoria com Caret Down devidamente espaçado */}
            <div className="relative inline-flex items-center">
              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 text-xs font-medium rounded-md border border-[#E3DCCF] bg-[#FAF7F2] text-[#222222] focus:outline-none focus:border-[#F5B900] cursor-pointer transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <option value="all">Todas as Categorias</option>
                {CATEGORIES.map((c) => (
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

            {(search || catFilter !== "all" || yearFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCatFilter("all");
                  setYearFilter("all");
                }}
                className="px-3 py-2 text-xs font-medium rounded-md text-[#756F67] hover:text-[#222222] hover:bg-[#FAF7F2] border border-[#E3DCCF] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* ── Reports Cards Grid ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <span
              className="text-xs font-semibold uppercase tracking-wider text-[#756F67]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {activeTab === "published"
                ? "Relatórios Publicados"
                : "Rascunhos"}{" "}
              ({filtered.length})
            </span>
            <span
              className="text-xs text-[#756F67]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Clique em [ Abrir relatório ] para gerenciar as comprovantes e
              documentos vinculados
            </span>
          </div>

          {loading ? (
            <div className="bg-white rounded-lg border border-[#E3DCCF] p-16 text-center flex flex-col items-center justify-center gap-2">
              <span className="text-sm font-medium text-[#756F67]">
                Carregando publicações...
              </span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-lg border border-[#E3DCCF] p-16 text-center flex flex-col items-center justify-center gap-3">
              <FileText className="w-10 h-10 text-[#A69E93]" />
              <h3
                className="text-base font-semibold text-[#222222]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {activeTab === "published"
                  ? "Nenhum relatório publicado encontrado"
                  : "Nenhum rascunho de relatório encontrado"}
              </h3>
              <p
                className="text-xs text-[#756F67] max-w-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {activeTab === "published"
                  ? "Tente ajustar os filtros de busca ou publique um relatório em rascunho."
                  : "Não há materiais em rascunho pendentes de publicação."}
              </p>
              <Link
                href="/admin/relatorios/novo"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Plus className="w-4 h-4" />
                <span>Novo relatório</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((doc) => {
                const invoicesCount = (doc.attachments || []).filter(
                  (a) => a.attachmentType === "invoice",
                ).length;
                const docsCount = (doc.attachments || []).filter(
                  (a) => a.attachmentType === "document",
                ).length;

                return (
                  <article
                    key={doc.id}
                    className="bg-white rounded-lg border border-[#E3DCCF] p-5 shadow-xs hover:border-[#D5CCBC] hover:shadow-sm transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Top Badges (Sem badge 'Publicado', apenas categoria e tag de rascunho se aplicável) */}
                      <div className="flex items-center justify-between gap-2">
                        <Badge category={doc.category} />
                        {doc.status === "draft" && (
                          <span
                            className="px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 shrink-0 text-[11px] font-semibold bg-[#F5F2EB] text-[#756F67] border border-[#E3DCCF]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A69E93]" />
                            Rascunho
                          </span>
                        )}
                      </div>

                      {/* Title & Link */}
                      <h2
                        className="text-base font-bold text-[#222222] group-hover:text-[#C02D1D] transition-colors line-clamp-2 leading-snug"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <Link
                          href={`/admin/relatorios/${doc.id}`}
                          className="hover:underline"
                        >
                          {doc.title}
                        </Link>
                      </h2>

                      {/* Description */}
                      <p
                        className="text-xs text-[#756F67] line-clamp-2 leading-relaxed min-h-[2rem]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {doc.description ||
                          "Nenhuma descrição informada para este relatório."}
                      </p>

                      {/* Metadata Details */}
                      <div className="pt-3 border-t border-[#E3DCCF]/70 flex flex-col gap-2 text-xs text-[#756F67]">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#756F67] shrink-0" />
                            <span>Exercício {doc.year}</span>
                          </span>
                          <span className="text-[11px] text-[#A69E93]">
                            {doc.publishedAt}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 pt-0.5">
                          <span className="inline-flex items-center gap-1.5 font-medium text-[#222222]">
                            <Receipt className="w-3.5 h-3.5 text-[#756F67] shrink-0" />
                            <span>
                              {invoicesCount}{" "}
                              {invoicesCount === 1
                                ? "comprovante"
                                : "notas fiscais"}
                            </span>
                          </span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1.5 font-medium text-[#222222]">
                            <FileText className="w-3.5 h-3.5 text-[#756F67] shrink-0" />
                            <span>
                              {docsCount}{" "}
                              {docsCount === 1 ? "documento" : "documentos"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Action */}
                    <div className="pt-2">
                      <Link
                        href={`/admin/relatorios/${doc.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800] transition-colors shadow-xs"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <span>Abrir relatório</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
