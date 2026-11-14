"use client";

import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useCollaborators } from "@/contexts/CollaboratorsContext";
import type { Collaborator, SocialPlatform } from "@/types/collaborator";
import Link from "next/link";
import { useMemo, useState } from "react";

// Ícones das redes sociais
function SocialIcon({
  platform,
  className = "w-4 h-4 shrink-0",
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  switch (platform) {
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          role="img"
          aria-label="Instagram"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "github":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          role="img"
          aria-label="GitHub"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          role="img"
          aria-label="LinkedIn"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24M7.85 18.5v-8.37H5.06v8.37h2.79z" />
        </svg>
      );
    case "twitter":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          role="img"
          aria-label="X (Twitter)"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          role="img"
          aria-label="YouTube"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "behance":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          role="img"
          aria-label="Behance"
        >
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.66 0-5.555-2.617-5.555-6.002 0-3.483 1.954-5.998 5.485-5.998 3.504 0 5.253 2.502 5.253 5.922 0 .426-.041.859-.074 1.078h-7.859c.093 1.77 1.218 2.678 2.834 2.678 1.402 0 2.277-.66 2.684-1.558l2.408.88zm-5.187-5.592c-.067-1.378-.962-2.164-2.428-2.164-1.385 0-2.316.852-2.492 2.164h4.92zm-12.539-7.408h5.663c2.474 0 4.337 1.012 4.337 3.328 0 1.348-.771 2.373-1.956 2.853 1.545.549 2.296 1.83 2.296 3.428 0 2.668-2.115 3.891-4.887 3.891h-5.453v-13.5zm3.085 2.551v2.793h2.339c1.077 0 1.829-.395 1.829-1.42 0-.965-.752-1.373-1.829-1.373h-2.339zm0 5.282v3.136h2.532c1.244 0 2.052-.451 2.052-1.579 0-1.107-.808-1.557-2.052-1.557h-2.532z" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          role="img"
          aria-label="Website"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
}

function CollaboratorCard({ collaborator }: { collaborator: Collaborator }) {
  const { name, role, photo, bio, accentColor = "#f8ba01", social } =
    collaborator;

  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-[4px] transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#faf4e8",
        border: "2.5px solid #121212",
        boxShadow: "4px 4px 0px #121212",
      }}
    >
      {/* Faixa superior Pan-Africana personalizada por colaborador */}
      <div
        className="w-full h-[6px] shrink-0"
        style={{ background: accentColor }}
      />

      <div className="flex flex-col items-center p-6 text-center flex-grow">
        {/* ── FOTO DO COLABORADOR REDONDA ── */}
        <div className="relative my-2">
          {/* Círculo com borda brutalista e sombra */}
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 bg-white transition-transform duration-300 group-hover:scale-105"
            style={{
              border: "3px solid #121212",
              boxShadow: "3px 3px 0px #121212",
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <ImageWithFallback
                src={photo}
                alt={`Foto de ${name}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Badge decorativo no canto inferior da foto circular */}
          <div
            className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-[#121212] flex items-center justify-center text-white"
            style={{
              background: accentColor,
              boxShadow: "1.5px 1.5px 0px #121212",
            }}
            title={role}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>

        {/* ── NOME DO COLABORADOR ── */}
        <h3
          className="mt-4 uppercase tracking-tight"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(20px, 2.2vw, 24px)",
            lineHeight: 1.15,
            color: "#121212",
            letterSpacing: "0.5px",
          }}
        >
          {name}
        </h3>

        {/* Cargo / Atuação */}
        <span
          className="mt-1 font-extrabold uppercase tracking-wider text-[11px]"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: accentColor === "#f8ba01" ? "#b27700" : accentColor,
          }}
        >
          {role}
        </span>

        {/* Bio / Breve descrição */}
        {bio && (
          <p
            className="mt-3 text-[13.5px] leading-relaxed text-[#5c5248] line-clamp-3"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            {bio}
          </p>
        )}
      </div>

      {/* ── LINK PARA A REDE SOCIAL ESCOLHIDA ── */}
      <div className="p-4 pt-0 w-full mt-auto">
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-[4px] uppercase transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "14px",
            letterSpacing: "0.5px",
            background: "#f8ba01",
            color: "#121212",
            border: "2px solid #121212",
            boxShadow: "2.5px 2.5px 0px #121212",
          }}
          aria-label={`Acessar rede social de ${name} (${social.platform})`}
        >
          <SocialIcon platform={social.platform} className="w-4 h-4 shrink-0" />
          <span className="truncate">
            {social.handle || social.customLabel || social.platform}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 transition-transform group-hover:translate-x-0.5"
            role="img"
            aria-label="Abrir link externo"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export function CollaboratorsSection() {
  const { collaborators } = useCollaborators();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCollaborators = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return collaborators;

    return collaborators.filter((collab) => {
      return (
        collab.name.toLowerCase().includes(q) ||
        collab.role.toLowerCase().includes(q) ||
        (collab.bio && collab.bio.toLowerCase().includes(q))
      );
    });
  }, [collaborators, searchQuery]);

  return (
    <main className="w-full bg-[#f0e3cd] text-[#121212] min-h-[calc(100vh-140px)]">
      {/* ── 1. Hero Header Institucional ── */}
      <section className="relative w-full pt-16 pb-12 sm:pt-20 sm:pb-16 px-6 lg:px-[80px] border-b-2 border-[#121212]/15 bg-[#1D1B18]">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-6 ">
          {/* Badge & Subtítulo */}
          <div className="flex items-center gap-3 ">
            <div
              className="w-1.5 h-6 shrink-0"
              style={{ background: "#f8ba01" }}
            />
            <span
              className="uppercase tracking-[2px] text-xs sm:text-sm font-extrabold text-[#ffffff]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              QUEM FAZ ACONTECER
            </span>
          </div>

          {/* Título Principal */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 ">
            <div>
              <h1
                className="uppercase tracking-tight"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(38px, 6vw, 76px)",
                  lineHeight: 0.95,
                  color: "#f8ba01",
                  letterSpacing: "1px",
                }}
              >
                NOSSOS
                <br />
                <span style={{ color: "#f8ba01" }}>COLABORADORES</span>
              </h1>
            </div>

            <p
              className="text-[#D4C9B6] max-w-[560px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(15px, 1.3vw, 17px)",
                lineHeight: "26px",
              }}
            >
              A força da Zambô nasce da união de pessoas dedicadas à causa da
              cultura afro-brasileira, da educação e da tecnologia social.
              Conheça os profissionais e voluntários que fortalecem nossos
              projetos.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pesquisa ── */}
      <section className="sticky top-[60px] sm:top-[68px] z-30 w-full py-4 px-4 sm:px-6 lg:px-[80px] bg-[#ebdcc2] border-b-2 border-[#121212]/20 shadow-sm backdrop-blur-md">
        <div className="max-w-[1240px] mx-auto flex items-center justify-end">
          {/* Campo de busca no canto direito */}
          <div className="relative w-full sm:w-[320px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome ou função..."
              className="w-full bg-[#faf4e8] border-2 border-[#121212] rounded-[4px] px-3.5 py-1.5 pr-8 text-xs sm:text-sm font-medium text-[#121212] placeholder:text-[#8c8077] focus:outline-none focus:ring-2 focus:ring-[#f8ba01] shadow-[2px_2px_0px_#121212]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6b5e55] hover:text-[#121212]"
                title="Limpar busca"
              >
                ✕
              </button>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c8077] pointer-events-none"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. Grid de Colaboradores ── */}
      <section className="w-full px-6 lg:px-[80px] py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-8">
          {/* Contador de resultados */}
          <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-widest text-[#6b5e55]">
            <span>
              Mostrando {filteredCollaborators.length} de {collaborators.length}{" "}
              colaboradores
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[#dd341f] underline hover:opacity-80"
              >
                Limpar busca
              </button>
            )}
          </div>

          {/* Grid com fotos redondas e redes sociais */}
          {filteredCollaborators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredCollaborators.map((collab) => (
                <CollaboratorCard key={collab.id} collaborator={collab} />
              ))}
            </div>
          ) : (
            <div
              className="w-full text-center py-16 px-6 bg-[#faf4e8] rounded-[4px] border-2 border-[#121212] flex flex-col items-center gap-4"
              style={{ boxShadow: "4px 4px 0px #121212" }}
            >
              <span
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 28,
                  color: "#121212",
                }}
              >
                NENHUM COLABORADOR ENCONTRADO
              </span>
              <p
                className="text-[#6b5e55] max-w-[420px]"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 14 }}
              >
                Não encontramos nenhum colaborador correspondente à sua busca.
                Tente buscar com outros termos ou limpe a pesquisa.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-2 bg-[#f8ba01] text-[#121212] px-5 py-2 rounded-[3px] border-2 border-[#121212] uppercase font-['Anton'] text-sm tracking-wider shadow-[2px_2px_0px_#121212]"
              >
                Ver todos os colaboradores
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Banner CTA: "Quer colaborar com a Zambô?" ── */}
      <section
        className="w-full px-6 lg:px-[80px] py-14 border-t-[3px] border-[#1d1b18]"
        style={{ background: "#1d1b18" }}
      >
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2.5 max-w-[620px] text-center md:text-left">
            <span
              className="text-xs font-extrabold uppercase tracking-widest text-[#f8ba01]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              FAÇA PARTE DA CAMINHADA
            </span>
            <h2
              className="uppercase tracking-tight text-[#f1e5d1]"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(26px, 3.5vw, 40px)",
                lineHeight: 1.1,
              }}
            >
              QUER COLABORAR COM A ZAMBÔ?
            </h2>
            <p
              className="text-[#9a8f86]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                lineHeight: "24px",
              }}
            >
              Seja na comunicação, na produção cultural, na tecnologia ou em
              ações comunitárias: suas habilidades fortalecem a ancestralidade e
              o futuro da nossa gente.
            </p>
          </div>

          <Link
            href="/contato"
            className="flex items-center gap-3 shrink-0 bg-[#f8ba01] uppercase rounded-[4px] px-6 py-4 hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 16,
              lineHeight: "24px",
              color: "#121212",
              boxShadow: "4px 4px 0px rgba(255,255,255,0.15)",
              border: "2px solid #000",
            }}
          >
            FALE CONOSCO
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}