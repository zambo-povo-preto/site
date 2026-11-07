"use client";

import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { galleryItems } from "@/data/gallery";
import type { GalleryItem } from "@/types/gallery";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function GalleryCard({
  item,
  onSelect,
}: {
  item: GalleryItem;
  onSelect: (item: GalleryItem) => void;
}) {
  const {
    title,
    description,
    image,
    date,
    location,
    accentColor = "#f8ba01",
  } = item;

  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-[4px] transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#faf4e8",
        border: "2.5px solid #121212",
        boxShadow: "4px 4px 0px #121212",
      }}
    >
      {/* Faixa superior Pan-Africana */}
      <div
        className="w-full h-[6px] shrink-0"
        style={{ background: accentColor }}
      />

      {/* Imagem do Registro */}
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="relative w-full aspect-[4/3] overflow-hidden bg-[#1D1B18] border-b-[2.5px] border-[#121212] text-left cursor-pointer focus:outline-none"
        aria-label={`Ampliar foto: ${title}`}
      >
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay sutil no hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1.5 rounded-[3px] uppercase text-xs tracking-wider"
            style={{
              fontFamily: "'Anton', sans-serif",
              background: "#f8ba01",
              color: "#121212",
              border: "2px solid #121212",
              boxShadow: "2px 2px 0px #121212",
            }}
          >
            VER GALERIA
          </span>
        </div>

        {/* Badge de Data */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-[3px] text-[10.5px] font-extrabold uppercase tracking-wider"
          style={{
            fontFamily: "'Inter', sans-serif",
            background: "#faf4e8",
            color: "#121212",
            border: "2px solid #121212",
            boxShadow: "2px 2px 0px #121212",
          }}
        >
          {date}
        </div>
      </button>

      {/* Conteúdo do Card */}
      <div className="flex flex-col p-5 flex-grow">
        {location && (
          <span
            className="font-extrabold uppercase tracking-wider text-[11px] flex items-center gap-1.5"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: accentColor === "#f8ba01" ? "#b27700" : accentColor,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
              role="img"
              aria-label="Localização"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </span>
        )}

        <h3
          className="mt-1.5 uppercase tracking-tight"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(19px, 2vw, 23px)",
            lineHeight: 1.15,
            color: "#121212",
            letterSpacing: "0.5px",
          }}
        >
          {title}
        </h3>

        <p
          className="mt-2.5 text-[13.5px] leading-relaxed text-[#5c5248] line-clamp-3"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
          }}
        >
          {description}
        </p>
      </div>

      {/* Botão inferior para abrir o modal */}
      <div className="p-5 pt-0 w-full mt-auto">
        <button
          type="button"
          onClick={() => onSelect(item)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-[4px] uppercase cursor-pointer transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "14px",
            letterSpacing: "0.5px",
            background: "#f8ba01",
            color: "#121212",
            border: "2px solid #121212",
            boxShadow: "2.5px 2.5px 0px #121212",
          }}
        >
          <span>AMPLIAR REGISTRO</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 transition-transform group-hover:scale-110"
            role="img"
            aria-label="Ampliar imagem"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export function GallerySection() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return galleryItems;

    return galleryItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q) ||
        (item.location && item.location.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  // Fechar modal com ESC e travar scroll do body quando aberto
  useEffect(() => {
    if (!selectedItem) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      } else if (e.key === "ArrowRight") {
        const currentIndex = filteredItems.findIndex(
          (i) => i.id === selectedItem.id,
        );
        if (currentIndex !== -1 && filteredItems.length > 1) {
          const nextIndex = (currentIndex + 1) % filteredItems.length;
          setSelectedItem(filteredItems[nextIndex]);
        }
      } else if (e.key === "ArrowLeft") {
        const currentIndex = filteredItems.findIndex(
          (i) => i.id === selectedItem.id,
        );
        if (currentIndex !== -1 && filteredItems.length > 1) {
          const prevIndex =
            (currentIndex - 1 + filteredItems.length) % filteredItems.length;
          setSelectedItem(filteredItems[prevIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem, filteredItems]);

  const handleNavigateModal = (direction: "prev" | "next") => {
    if (!selectedItem || filteredItems.length <= 1) return;
    const currentIndex = filteredItems.findIndex(
      (i) => i.id === selectedItem.id,
    );
    if (currentIndex === -1) return;

    const targetIndex =
      direction === "next"
        ? (currentIndex + 1) % filteredItems.length
        : (currentIndex - 1 + filteredItems.length) % filteredItems.length;

    setSelectedItem(filteredItems[targetIndex]);
  };

  return (
    <main className="w-full bg-[#f0e3cd] text-[#121212] min-h-[calc(100vh-140px)]">
      {/* ── 1. Hero Header Institucional ── */}
      <section className="relative w-full pt-16 pb-12 sm:pt-20 sm:pb-16 px-6 lg:px-[80px] border-b-2 border-[#121212]/15 bg-[#1D1B18]">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-6">
          {/* Badge & Subtítulo */}
          <div className="flex items-center gap-3">
            <div
              className="w-1.5 h-6 shrink-0"
              style={{ background: "#f8ba01" }}
            />
            <span
              className="uppercase tracking-[2px] text-xs sm:text-sm font-extrabold text-[#ffffff]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              MEMÓRIA VIVA & REGISTROS
            </span>
          </div>

          {/* Título Principal */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1
                className="uppercase tracking-tight"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(38px, 6vw, 76px)",
                  lineHeight: 0.95,
                  color: "#ffffff",
                  letterSpacing: "1px",
                }}
              >
                NOSSA
                <br />
                <span style={{ color: "#ffffff" }}>GALERIA</span>
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
              Cada fotografia guarda a potência dos nossos encontros, oficinas,
              rodas de conversa e celebrações em Caraguatatuba e no Litoral
              Norte. Explore os momentos que constroem a nossa trajetória.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Pesquisa (Canto Direito) ── */}
      <section className="sticky top-[60px] sm:top-[68px] z-30 w-full py-4 px-4 sm:px-6 lg:px-[80px] bg-[#ebdcc2] border-b-2 border-[#121212]/20 shadow-sm backdrop-blur-md">
        <div className="max-w-[1240px] mx-auto flex items-center justify-end">
          {/* Campo de busca no canto direito */}
          <div className="relative w-full sm:w-[320px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, data ou local..."
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
                role="img"
                aria-label="Pesquisar"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. Grid da Galeria ── */}
      <section className="w-full px-6 lg:px-[80px] py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-8">
          {/* Contador de resultados */}
          <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-widest text-[#6b5e55]">
            <span>
              Mostrando {filteredItems.length} de {galleryItems.length}{" "}
              registros
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

          {/* Grid de Fotos */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onSelect={(selected) => setSelectedItem(selected)}
                />
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
                NENHUM REGISTRO ENCONTRADO
              </span>
              <p
                className="text-[#6b5e55] max-w-[420px]"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 14 }}
              >
                Não encontramos nenhuma foto ou registro correspondente à sua
                busca. Tente buscar com outros termos ou limpe a pesquisa.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-2 bg-[#f8ba01] text-[#121212] px-5 py-2 rounded-[3px] border-2 border-[#121212] uppercase font-['Anton'] text-sm tracking-wider shadow-[2px_2px_0px_#121212]"
              >
                Ver toda a galeria
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Modal Lightbox de Visualização ── */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-[920px] bg-[#faf4e8] rounded-[4px] overflow-hidden flex flex-col max-h-[90vh]"
            style={{
              border: "3px solid #121212",
              boxShadow: "6px 6px 0px #121212",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Faixa Pan-Africana no topo do modal */}
            <div
              className="w-full h-[6px] shrink-0"
              style={{ background: selectedItem.accentColor || "#f8ba01" }}
            />

            {/* Barra de cabeçalho do modal */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#ebdcc2] border-b-2 border-[#121212]">
              <div className="flex items-center gap-3">
                <span
                  className="px-2.5 py-0.5 rounded-[3px] text-[11px] font-extrabold uppercase"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: "#faf4e8",
                    color: "#121212",
                    border: "1.5px solid #121212",
                  }}
                >
                  {selectedItem.date}
                </span>
                {selectedItem.location && (
                  <span
                    className="text-xs font-extrabold uppercase tracking-wider text-[#4a4036] hidden sm:inline"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    • {selectedItem.location}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-[3px] bg-[#dd341f] text-white font-bold flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                style={{
                  border: "2px solid #121212",
                  boxShadow: "2px 2px 0px #121212",
                }}
                aria-label="Fechar visualização"
              >
                ✕
              </button>
            </div>

            {/* Área da Imagem */}
            <div className="relative w-full bg-[#121212] flex items-center justify-center overflow-hidden max-h-[58vh]">
              <ImageWithFallback
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full max-h-[58vh] object-contain"
              />

              {/* Botões Anterior / Próximo */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => handleNavigateModal("prev")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-[4px] bg-[#f8ba01] text-[#121212] flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                    style={{
                      border: "2px solid #121212",
                      boxShadow: "2.5px 2.5px 0px #121212",
                    }}
                    aria-label="Registro anterior"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigateModal("next")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-[4px] bg-[#f8ba01] text-[#121212] flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                    style={{
                      border: "2px solid #121212",
                      boxShadow: "2.5px 2.5px 0px #121212",
                    }}
                    aria-label="Próximo registro"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Rodapé com descrição do registro */}
            <div className="p-5 sm:p-6 overflow-y-auto border-t-2 border-[#121212] bg-[#faf4e8]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2
                  className="uppercase tracking-tight"
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: "clamp(22px, 3vw, 28px)",
                    lineHeight: 1.15,
                    color: "#121212",
                  }}
                >
                  {selectedItem.title}
                </h2>
                {selectedItem.photographer && (
                  <span
                    className="text-[11px] font-extrabold uppercase tracking-wider text-[#6b5e55]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Foto: {selectedItem.photographer}
                  </span>
                )}
              </div>
              <p
                className="mt-2 text-[14px] sm:text-[15px] leading-relaxed text-[#4a4036]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. Banner CTA: "Compartilhe registros com a Zambô" ── */}
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
              NOSSO ACERVO COMUNITÁRIO
            </span>
            <h2
              className="uppercase tracking-tight text-[#f1e5d1]"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(26px, 3.5vw, 40px)",
                lineHeight: 1.1,
              }}
            >
              TEM REGISTROS DOS NOSSOS ENCONTROS?
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
              Ajude a preservar e ampliar a memória viva do Movimento Negro de
              Caraguatatuba. Entre em contato conosco para enviar fotos e
              registros históricos das ações da Zambô.
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
