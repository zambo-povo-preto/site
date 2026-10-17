"use client";

import { useDocuments } from "@/contexts/DocumentsContext";
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  FileText,
  FolderOpen,
  Plus,
  Receipt,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export function AdminHomeView() {
  const { documents, invoices, complementaryDocuments, loading } =
    useDocuments();

  // Estatísticas calculadas
  const stats = useMemo(() => {
    const publishedReports = documents.filter(
      (d) => d.status === "published",
    ).length;
    const draftReports = documents.filter((d) => d.status === "draft").length;
    const totalReports = documents.length;
    const totalInvoices = invoices.length;
    const totalDocs = complementaryDocuments.length;

    // Soma estimada das comprovantes com valor numérico
    const totalAmount = invoices.reduce((acc, inv) => {
      const val = typeof inv.amount === "number" ? inv.amount : 0;
      return acc + val;
    }, 0);

    return {
      publishedReports,
      draftReports,
      totalReports,
      totalInvoices,
      totalDocs,
      totalAmount,
    };
  }, [documents, invoices, complementaryDocuments]);

  // Relatórios mais recentes (até 5)
  const recentReports = useMemo(() => {
    return [...documents].slice(0, 5);
  }, [documents]);

  // Data formatada em português
  const currentDateFormatted = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date());
    } catch {
      return "";
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#222222] pb-16">
      {/* ── Top Bar Institucional ── */}
      <div className="px-4 sm:px-8 lg:px-12 pt-7">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-1 min-w-0">
            <h1
              className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight leading-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Boas-vindas ao Painel
            </h1>
            <p
              className="text-xs sm:text-sm text-[#756F67] max-w-3xl leading-relaxed mt-0.5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Gerencie as publicações institucionais, relatórios de prestação de
              contas, notas fiscais e documentos.
            </p>
          </div>

          {/* Ação Primária de Destaque */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-md font-medium text-xs text-[#554F48] bg-white hover:text-[#222222] hover:bg-[#FAF7F2] border border-[#E3DCCF] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
              title="Visualizar portal público em novo aba"
            >
              <span>Portal Público</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#756F67]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Conteúdo Central ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-8 flex flex-col gap-8">
        {/* Cartões de Indicadores Rápidos (KPIs) */}
        <section aria-label="Indicadores do Painel">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* 1. Relatórios */}
            <div className="bg-white rounded-lg border border-[#E3DCCF] p-5 shadow-xs flex flex-col justify-between hover:border-[#D5CCBC] transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <span
                    className="text-xs font-semibold text-[#756F67] uppercase tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Relatórios
                  </span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span
                      className="text-2xl sm:text-3xl font-extrabold text-[#222222]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {loading ? "..." : stats.totalReports}
                    </span>
                    <span className="text-xs text-[#756F67] font-medium">
                      {stats.totalReports === 1 ? "cadastrado" : "cadastrados"}
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-md bg-[#FAF4E6] border border-[#F0DC99] flex items-center justify-center text-[#9E6D00] shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E3DCCF]/60 flex items-center justify-between text-xs">
                <span className="text-[#756F67]">
                  {stats.publishedReports} publicados · {stats.draftReports}{" "}
                  rascunhos
                </span>
                <Link
                  href="/admin/relatorios"
                  className="font-semibold text-[#C02D1D] hover:underline inline-flex items-center gap-1"
                >
                  <span>Gerenciar</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* 2. Notas Fiscais */}
            <div className="bg-white rounded-lg border border-[#E3DCCF] p-5 shadow-xs flex flex-col justify-between hover:border-[#D5CCBC] transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <span
                    className="text-xs font-semibold text-[#756F67] uppercase tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Comprovantes
                  </span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span
                      className="text-2xl sm:text-3xl font-extrabold text-[#222222]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {loading ? "..." : stats.totalInvoices}
                    </span>
                    <span className="text-xs text-[#756F67] font-medium">
                      {stats.totalInvoices === 1 ? "cadastrado" : "cadastrados"}
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-md bg-[#FAF4E6] border border-[#F0DC99] flex items-center justify-center text-[#9E6D00] shrink-0">
                  <Receipt className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E3DCCF]/60 flex items-center justify-between text-xs">
                <span className="text-[#756F67] truncate max-w-[150px]">
                  {stats.totalAmount > 0
                    ? `Total: R$ ${stats.totalAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : "Notas Fiscais"}
                </span>
                <Link
                  href="/admin/comprovantes"
                  className="font-semibold text-[#C02D1D] hover:underline inline-flex items-center gap-1"
                >
                  <span>Gerenciar</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* 3. Documentos */}
            <div className="bg-white rounded-lg border border-[#E3DCCF] p-5 shadow-xs flex flex-col justify-between hover:border-[#D5CCBC] transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <span
                    className="text-xs font-semibold text-[#756F67] uppercase tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Documentos
                  </span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span
                      className="text-2xl sm:text-3xl font-extrabold text-[#222222]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {loading ? "..." : stats.totalDocs}
                    </span>
                    <span className="text-xs text-[#756F67] font-medium">
                      {stats.totalDocs === 1 ? "cadastrado" : "cadastrados"}
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-md bg-[#FAF4E6] border border-[#F0DC99] flex items-center justify-center text-[#9E6D00] shrink-0">
                  <FolderOpen className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E3DCCF]/60 flex items-center justify-between text-xs">
                <span className="text-[#756F67]">
                  Atas, relatórios & arquivos
                </span>
                <Link
                  href="/admin/documentos"
                  className="font-semibold text-[#C02D1D] hover:underline inline-flex items-center gap-1"
                >
                  <span>Gerenciar</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Atalhos Rápidos de Gestão ── */}
        <section aria-label="Atalhos de Gestão">
          <div className="flex items-center justify-between pb-4 border-b border-[#E3DCCF] mb-5">
            <div>
              <h2
                className="text-base font-bold text-[#222222]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Acesso Rápido aos Módulos
              </h2>
              <p
                className="text-xs text-[#756F67] mt-0.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Navegue pelas áreas principais do painel institucional
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/relatorios"
              className="p-4 rounded-md border border-[#E3DCCF] bg-white hover:border-[#D5CCBC] hover:shadow-xs transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-md bg-[#FAF4E6] border border-[#F0DC99] flex items-center justify-center text-[#9E6D00] shrink-0 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-sm text-[#222222] group-hover:text-[#C02D1D] transition-colors">
                    Relatórios da Transparência
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-[#756F67] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <p className="text-xs text-[#756F67] mt-1 leading-snug">
                  Listagem completa, relatórios anuais, publicações e gestão de
                  rascunhos.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/comprovantes"
              className="p-4 rounded-md border border-[#E3DCCF] bg-white hover:border-[#D5CCBC] hover:shadow-xs transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-md bg-[#FAF4E6] border border-[#F0DC99] flex items-center justify-center text-[#9E6D00] shrink-0 group-hover:scale-105 transition-transform">
                <Receipt className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-sm text-[#222222] group-hover:text-[#C02D1D] transition-colors">
                    Comprovantes e Notas Fiscais
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-[#756F67] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <p className="text-xs text-[#756F67] mt-1 leading-snug">
                  Consulta de notas fiscais, favorecidos e valores cadastrados.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/documentos"
              className="p-4 rounded-md border border-[#E3DCCF] bg-white hover:border-[#D5CCBC] hover:shadow-xs transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-md bg-[#FAF4E6] border border-[#F0DC99] flex items-center justify-center text-[#9E6D00] shrink-0 group-hover:scale-105 transition-transform">
                <FolderOpen className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-sm text-[#222222] group-hover:text-[#C02D1D] transition-colors">
                    Documentos Oficiais
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-[#756F67] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <p className="text-xs text-[#756F67] mt-1 leading-snug">
                  Atas, certificações, contratos e arquivos institucionais
                  arquivados.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* ── Últimos Relatórios Atualizados ── */}
        <section aria-label="Relatórios Recentes">
          <div className="flex items-center justify-between pb-4 border-b border-[#E3DCCF] mb-4">
            <div>
              <h2
                className="text-base font-bold text-[#222222]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Relatórios Recentes
              </h2>
              <p
                className="text-xs text-[#756F67] mt-0.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Últimas prestações de contas criadas ou modificadas
              </p>
            </div>

            <Link
              href="/admin/relatorios"
              className="text-xs font-semibold text-[#C02D1D] hover:underline inline-flex items-center gap-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>Ver todos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-10 text-center text-xs text-[#756F67]">
              Carregando relatórios...
            </div>
          ) : recentReports.length === 0 ? (
            <div className="bg-white rounded-lg border border-[#E3DCCF] p-16 text-center flex flex-col items-center justify-center gap-5">
              <FileText className="w-10 h-10 text-[#A69E93]" />
              <p
                className="text-xs text-[#756F67] mt-0.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Nenhum relatório foi cadastrado ainda.
              </p>
              <Link
                href="/admin/relatorios/novo"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-xs text-[#222222] bg-[#F5B900] hover:bg-[#e0a800] border border-[#E0A800]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Criar Primeiro Relatório</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentReports.map((doc) => {
                const invoicesCount = (doc.attachments || []).filter(
                  (a) => a.attachmentType === "invoice",
                ).length;
                const docsCount = (doc.attachments || []).filter(
                  (a) => a.attachmentType === "document",
                ).length;

                return (
                  <div
                    key={doc.id}
                    className="bg-white border border-[#E3DCCF] p-6 shadow-xs py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 -mx-2 rounded-md transition-colors"
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/admin/relatorios/${doc.id}`}
                          className="font-bold text-sm text-[#222222] hover:text-[#C02D1D] hover:underline truncate"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {doc.title}
                        </Link>
                        {doc.status === "draft" ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FAF4E6] text-[#756F67] border border-[#E3DCCF]">
                            Rascunho
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EAF5EC] text-[#1A7D3C] border border-[#CBE5D0]">
                            Publicado
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#756F67]">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#A69E93]" />
                          <span>Exercício {doc.year}</span>
                        </span>
                        <span>·</span>
                        <span>
                          {invoicesCount}{" "}
                          {invoicesCount === 1 ? "nota" : "comprovantes"}
                        </span>
                        <span>·</span>
                        <span>
                          {docsCount}{" "}
                          {docsCount === 1 ? "documento" : "documentos"}
                        </span>
                        {doc.publishedAt && (
                          <>
                            <span className="hidden md:inline">·</span>
                            <span className="hidden md:inline text-[11px] text-[#A69E93]">
                              {doc.publishedAt}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <Link
                        href={`/admin/relatorios/${doc.id}`}
                        className="px-3 py-1.5 rounded-md font-semibold text-xs text-[#222222] bg-[#FAF7F2] hover:bg-white border border-[#E3DCCF] transition-colors inline-flex items-center gap-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <span>Abrir</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Nota Institucional ── */}
        <section
          aria-label="Diretrizes Institucionais"
          className="p-5 rounded-lg bg-[#FAF4E6] border border-[#F0DC99] flex items-start gap-3.5"
        >
          <Sparkles className="w-5 h-5 text-[#9E6D00] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5 text-xs text-[#6B551D] leading-relaxed">
            <span className="font-bold text-sm text-[#4A3A13]">
              Pilares da Transparência Zambô
            </span>
            <p>
              Toda informação registrada neste painel reflete o compromisso com
              a integridade pública e a prestação de contas clara para a
              comunidade e órgãos fiscalizadores. Garanta que relatórios e notas
              fiscais estejam sempre validados e legíveis.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
