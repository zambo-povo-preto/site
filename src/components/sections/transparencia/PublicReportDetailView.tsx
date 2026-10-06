"use client";

import { useDocuments } from "@/contexts/DocumentsContext";
import svgPaths from "@/imports/Group36/svg-hkzbekptio";
import {
  getAttachmentDownloadUrl,
  getAttachmentPreviewUrl,
  getFileDownloadUrl,
  getFilePreviewUrl,
} from "@/lib/api";
import type { AdminDocument, DocumentAttachment } from "@/types/document";
import Link from "next/link";
import { useMemo, useState } from "react";

function DownloadIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Download"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Visualizar"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FileTypeBadge({ type }: { type: "PDF" | "XLSX" | "DOC" }) {
  const bgColors: Record<string, string> = {
    PDF: "#dd341f",
    XLSX: "#1a7d3c",
    DOC: "#1a5fa8",
  };
  return (
    <span
      className="px-2 py-0.5 rounded-[3px] text-[10px] font-extrabold uppercase tracking-wide text-white"
      style={{
        background: bgColors[type] || "#dd341f",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {type}
    </span>
  );
}

export function PublicReportDetailView({ id }: { id: string }) {
  const { documents, loading } = useDocuments();
  const [showPreview, setShowPreview] = useState(false);

  const doc = useMemo(() => {
    return documents.find((d) => d.id === id && d.status === "published");
  }, [documents, id]);

  const invoices = useMemo(() => {
    if (!doc?.attachments) return [];
    return doc.attachments.filter(
      (att) =>
        att.attachmentType === "invoice" ||
        Boolean(att.amount || att.invoiceNumber),
    );
  }, [doc]);

  const complementaryDocs = useMemo(() => {
    if (!doc?.attachments) return [];
    return doc.attachments.filter(
      (att) =>
        att.attachmentType === "document" && !att.amount && !att.invoiceNumber,
    );
  }, [doc]);

  const totalAmount = useMemo(() => {
    return invoices.reduce((acc, att) => acc + (att.amount || 0), 0);
  }, [invoices]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-[#faf4e8]">
        <div className="text-sm font-medium text-[#756f67]">
          Carregando relatório de transparência...
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#faf4e8] px-4 py-16 text-center">
        <span className="text-4xl">📁</span>
        <h1
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 26,
            color: "#121212",
          }}
        >
          RELATÓRIO NÃO ENCONTRADO OU NÃO PUBLICADO
        </h1>
        <p className="text-sm text-[#5a4e44] max-w-md">
          Este relatório pode ter sido despublicado ou o endereço acessado pode
          estar incorreto.
        </p>
        <Link
          href="/transparencia"
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-wider bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white transition-colors"
          style={{ fontFamily: "'Inter', sans-serif", textDecoration: "none" }}
        >
          ← Voltar para o Portal da Transparência
        </Link>
      </div>
    );
  }

  const downloadUrl = getFileDownloadUrl(doc.id);
  const previewUrl = getFilePreviewUrl(doc.id);
  const isPdf = doc.fileType === "PDF";

  return (
    <div className="w-full bg-[#faf4e8] text-[#121212] pb-0 min-h-[calc(100vh-200px)]">
      {/* ── 1. Barra Superior com Navegação de Retorno ── */}
      <div className="w-full bg-[#ede4d4] border-b border-[#d8caa6] py-3.5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/transparencia"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3a342f] hover:text-[#121212] transition-colors"
            style={{
              fontFamily: "'Inter', sans-serif",
              textDecoration: "none",
            }}
          >
            <span>←</span>
            <span>Voltar para o Portal da Transparência</span>
          </Link>
        </div>
      </div>

      {/* ── 2. Cabeçalho Principal do Relatório ── */}
      <header className="w-full bg-[#1d1b18] border-b border-[#3a342f] text-white py-10 sm:py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5">
          {/* Categoria e Exercício */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="text-xs font-extrabold uppercase tracking-widest text-[#f8ba01]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {doc.category.toUpperCase()} · EXERCÍCIO {doc.year}
            </span>
          </div>

          {/* Título do Relatório */}
          <h1
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(28px, 4.5vw, 48px)",
              lineHeight: 1.15,
              color: "#ffffff",
              letterSpacing: "0.5px",
            }}
          >
            {doc.title}
          </h1>

          {/* Data de Publicação e Resumo */}
          <div className="flex flex-col gap-3">
            <span
              className="text-xs text-[#d4c9b6] font-medium"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Publicado em {doc.publishedAt}
            </span>

            {doc.description && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 15,
                  lineHeight: "24px",
                  color: "#e6d8be",
                  maxWidth: 820,
                }}
              >
                {doc.description}
              </p>
            )}
          </div>

          {/* Informação Resumida: Total Comprovado e Ações do Topo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#3a342f]/80">
            {/* Total Comprovado (Discreto e Secundário) */}
            {totalAmount > 0 ? (
              <div className="flex flex-col">
                <span
                  className="text-[11px] font-bold uppercase tracking-wider text-[#d4c9b6]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  TOTAL COMPROVADO
                </span>
                <span
                  className="text-lg font-extrabold text-[#f8ba01]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  R${" "}
                  {totalAmount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            ) : (
              <div />
            )}

            {/* Ações do Topo */}
            <div className="flex flex-wrap items-center gap-2.5">
              {isPdf && (
                <button
                  type="button"
                  onClick={() => setShowPreview((v) => !v)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer bg-transparent text-white border border-[#d4c9b6] hover:bg-white hover:text-[#121212]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <EyeIcon />
                  <span>
                    {showPreview ? "Ocultar documento" : "Visualizar documento"}
                  </span>
                </button>
              )}

              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  textDecoration: "none",
                }}
              >
                <DownloadIcon />
                <span>BAIXAR RELATÓRIO</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── 3. Visualizador Embutido (quando acionado pelo usuário) ── */}
      {showPreview && isPdf && (
        <section className="w-full bg-[#ede4d4] border-b border-[#d8caa6] py-6">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-bold uppercase tracking-wider text-[#3a342f]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Visualização do Documento Principal
              </span>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="text-xs font-bold text-[#5a4e44] hover:text-[#121212] cursor-pointer"
              >
                ✕ Fechar visualização
              </button>
            </div>
            <iframe
              src={previewUrl}
              title={`Visualização de ${doc.title}`}
              className="w-full h-[600px] rounded-[4px] border border-[#c8b9a2] bg-white shadow-sm"
            />
          </div>
        </section>
      )}

      {/* ── 4. Conteúdo Central: Documento Principal, Comprovantes e Anexos ── */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
        {/* ── SEÇÃO 1: DOCUMENTO PRINCIPAL ── */}
        <section className="flex flex-col gap-3.5">
          <div className="border-b border-[#d8caa6] pb-2">
            <h2
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 22,
                color: "#121212",
                letterSpacing: "0.5px",
              }}
            >
              DOCUMENTO PRINCIPAL
            </h2>
          </div>

          <div className="p-4 sm:p-5 rounded-[4px] bg-[#faf4e8] border border-[#d8caa6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              <span className="text-2xl">📄</span>
              <div className="flex flex-col min-w-0 flex-1">
                <span
                  className="font-bold text-sm text-[#121212] truncate"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  title={doc.fileName || doc.title}
                >
                  {doc.fileName || doc.title}
                </span>
                <div
                  className="flex items-center gap-2 text-xs text-[#756f67] mt-0.5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <FileTypeBadge type={doc.fileType} />
                  <span>·</span>
                  <span>{doc.fileSize}</span>
                  <span>·</span>
                  <span>Publicado em {doc.publishedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {isPdf && (
                <button
                  type="button"
                  onClick={() => setShowPreview((v) => !v)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer bg-white text-[#121212] border border-[#c8b9a2] hover:border-[#121212]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <EyeIcon />
                  <span>Visualizar</span>
                </button>
              )}

              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  textDecoration: "none",
                }}
              >
                <DownloadIcon />
                <span>Baixar documento</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── SEÇÃO 2: COMPROVANTES ── */}
        <section className="flex flex-col gap-3.5">
          <div className="flex items-baseline justify-between border-b border-[#d8caa6] pb-2 flex-wrap gap-2">
            <h2
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 22,
                color: "#121212",
                letterSpacing: "0.5px",
              }}
            >
              COMPROVANTES
            </h2>
            <span
              className="text-xs font-semibold text-[#756f67]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {invoices.length}{" "}
              {invoices.length === 1 ? "comprovante" : "comprovantes"}
            </span>
          </div>

          {invoices.length === 0 ? (
            <div className="p-5 rounded-[4px] bg-[#faf4e8] border border-[#d8caa6] text-xs text-[#756f67] italic font-medium">
              Nenhum comprovante vinculado a este relatório.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {invoices.map((inv, idx) => {
                const invDownloadUrl =
                  inv.downloadUrl || getAttachmentDownloadUrl(inv.id);
                const invPreviewUrl = getAttachmentPreviewUrl(inv.id);
                const isInvPdf = inv.fileType === "PDF";

                return (
                  <div
                    key={inv.id}
                    className="p-4 rounded-[4px] bg-[#faf4e8] border border-[#d8caa6] flex flex-col justify-between gap-3"
                  >
                    <div className="flex flex-col gap-2">
                      {/* Identificação do Comprovante */}
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className="font-bold text-sm text-[#121212]"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          Comprovante #{inv.invoiceNumber || idx + 1}
                        </span>

                        {inv.expenseType && (
                          <span
                            className="px-2 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider bg-[#ede4d4] text-[#5a4e44] border border-[#d8caa6]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {inv.expenseType}
                          </span>
                        )}
                      </div>

                      {/* Favorecido (LGPD: Nome obrigatório, CNPJ se PJ, CPF NUNCA) */}
                      <div
                        className="text-xs text-[#3a342f] flex flex-col gap-0.5"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <span className="font-semibold text-[#121212]">
                          Favorecido:{" "}
                          <span className="font-normal text-[#2c2723]">
                            {inv.issuerName || "Não especificado"}
                          </span>
                        </span>
                        {inv.cnpj && (
                          <span className="text-[11px] font-mono text-[#5a4e44]">
                            CNPJ: {inv.cnpj}
                          </span>
                        )}
                      </div>

                      {/* Descrição se houver */}
                      {inv.description && (
                        <p
                          className="text-xs text-[#5a4e44] line-clamp-2"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {inv.description}
                        </p>
                      )}

                      {/* Data e Valor */}
                      <div
                        className="flex flex-wrap items-baseline justify-between gap-2 pt-1 border-t border-[#ede4d4]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {inv.issueDate && (
                          <span className="text-xs text-[#756f67]">
                            Data:{" "}
                            {new Date(inv.issueDate).toLocaleDateString(
                              "pt-BR",
                            )}
                          </span>
                        )}

                        {inv.amount !== null && inv.amount !== undefined && (
                          <span className="text-sm font-extrabold text-[#1a7d3c]">
                            R${" "}
                            {inv.amount.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Ação do Comprovante (LGPD Segura) */}
                    <div className="pt-2 border-t border-[#ede4d4] flex items-center justify-between">
                      <span className="text-[10px] text-[#8a7d73] font-medium">
                        {inv.fileSize} · {inv.fileType}
                      </span>

                      {inv.hasPublicFile || inv.downloadUrl ? (
                        <div className="flex items-center gap-1.5">
                          {isInvPdf && (
                            <a
                              href={invPreviewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[3px] text-xs font-semibold uppercase tracking-wider text-[#121212] bg-white border border-[#c8b9a2] hover:border-[#121212] transition-colors"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                textDecoration: "none",
                              }}
                            >
                              <EyeIcon />
                              <span>Ver</span>
                            </a>
                          )}
                          <a
                            href={invDownloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] text-xs font-bold uppercase tracking-wider text-[#121212] bg-[#f8ba01] border border-[#121212] hover:bg-white transition-colors"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              textDecoration: "none",
                            }}
                          >
                            <DownloadIcon />
                            <span>Baixar</span>
                          </a>
                        </div>
                      ) : (
                        <span
                          className="text-[10px] text-[#756f67] italic font-medium px-2 py-0.5 bg-[#ede4d4] rounded-[3px]"
                          title="Comprovante arquivado internamente sob custódia administrativa."
                        >
                          Arquivo sob guarda interna
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── SEÇÃO 3: DOCUMENTOS COMPLEMENTARES ── */}
        {complementaryDocs.length > 0 && (
          <section className="flex flex-col gap-3.5">
            <div className="flex items-baseline justify-between border-b border-[#d8caa6] pb-2 flex-wrap gap-2">
              <h2
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 22,
                  color: "#121212",
                  letterSpacing: "0.5px",
                }}
              >
                DOCUMENTOS COMPLEMENTARES
              </h2>
              <span
                className="text-xs font-semibold text-[#756f67]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {complementaryDocs.length}{" "}
                {complementaryDocs.length === 1
                  ? "documento complementar"
                  : "documentos complementares"}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {complementaryDocs.map((item) => {
                const itemDownloadUrl =
                  item.downloadUrl || getAttachmentDownloadUrl(item.id);
                const itemPreviewUrl = getAttachmentPreviewUrl(item.id);
                const isItemPdf = item.fileType === "PDF";

                return (
                  <div
                    key={item.id}
                    className="p-3.5 sm:p-4 rounded-[4px] bg-[#faf4e8] border border-[#d8caa6] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileTypeBadge type={item.fileType} />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span
                          className="font-bold text-sm text-[#121212] truncate"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          title={item.name}
                        >
                          {item.name}
                        </span>
                        {item.description && (
                          <p
                            className="text-xs text-[#5a4e44] line-clamp-1 mt-0.5"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {item.description}
                          </p>
                        )}
                        <span className="text-[11px] text-[#756f67] mt-0.5">
                          {item.fileSize} · Cadastrado em {item.createdAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isItemPdf && (
                        <a
                          href={itemPreviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-semibold uppercase tracking-wider text-[#121212] bg-white border border-[#c8b9a2] hover:border-[#121212] transition-colors"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            textDecoration: "none",
                          }}
                        >
                          <EyeIcon />
                          <span>Visualizar</span>
                        </a>
                      )}

                      <a
                        href={itemDownloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-wider text-[#121212] bg-[#f8ba01] border border-[#121212] hover:bg-white transition-colors"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          textDecoration: "none",
                        }}
                      >
                        <DownloadIcon />
                        <span>Baixar</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* ── 5. Rodapé Institucional da LAI & LGPD ── */}
      <footer className="w-full bg-[#1d1b18] border-t border-[#3a342f] mt-12">
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
              Em caso de dúvidas ou necessidade de esclarecimentos adicionais
              sobre esta prestação de contas, entre em contato com a equipe da
              Zambô:{" "}
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
            href={`mailto:contato@zambo.org.br?subject=D%C3%BAvida%20sobre%20Relat%C3%B3rio%20-${encodeURIComponent(
              doc.title,
            )}`}
            className="flex items-center justify-center gap-2.5 w-full md:w-auto shrink-0 rounded-[4px] px-5 py-3 transition-colors cursor-pointer text-center bg-[#f8ba01] text-[#121212] border border-[#121212] hover:bg-white text-xs font-extrabold uppercase tracking-wider"
            style={{
              fontFamily: "'Inter', sans-serif",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            SOLICITAR ESCLARECIMENTOS
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
      </footer>
    </div>
  );
}
