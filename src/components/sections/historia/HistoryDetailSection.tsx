"use client";

import { StatsSection } from "@/components/sections/home/StatsSection";
import { type Era, eras, timelineYears } from "@/data/historyEras";
import svgPaths from "@/imports/Group36/svg-hkzbekptio";
import { useEffect, useRef, useState } from "react";

// Componente auxiliar para os pontilhados nos cantos do card
function DecorativeDots({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      role="img"
      aria-label="Pontilhados decorativos"
    >
      <pattern
        id="dots"
        x="0"
        y="0"
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
      </pattern>
      <rect width="40" height="40" fill="url(#dots)" />
    </svg>
  );
}

function EraSection({ era }: { era: Era }) {
  const {
    year,
    title,
    accentColor,
    paragraphs,
    quote,
    image,
    imageAlt,
    imageRight,
  } = era;

  const isYellow = accentColor.toLowerCase() === "#f1b412";
  const titleTextColor = isYellow ? "#121212" : "#ffffff";

  return (
    <section
      id={year}
      className="relative w-full max-w-[1100px] mx-auto flex items-stretch gap-4 md:gap-8 scroll-mt-10 mb-8 md:mb-12"
    >
      {/* LINHA DO TEMPO LATERAL (ESQUERDA) */}
      {imageRight && (
        <div className="hidden md:flex flex-col items-center justify-center w-8 shrink-0 relative">
          <div
            className="absolute top-10 bottom-10 w-[2px]"
            style={{ backgroundColor: accentColor }}
          />
          <div
            className="w-5 h-5 rounded-full border-[2.5px] border-[#121212] z-10 bg-white"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      )}

      {/* CARD PRINCIPAL */}
      <div
        className={`relative flex-1 bg-[#faf4e8] md:min-h-[420px] shadow-[2px_4px_12px_rgba(0,0,0,0.08)] border border-[#c8b9a2] flex flex-col ${imageRight ? "md:flex-row" : "md:flex-row-reverse"} overflow-hidden`}
      >
        <DecorativeDots
          className={`absolute top-3 text-[#5a534e] opacity-30 z-10 ${imageRight ? "left-3" : "right-3"}`}
        />
        <DecorativeDots
          className={`absolute bottom-3 text-[#5a534e] opacity-30 z-10 ${imageRight ? "left-3" : "right-3"}`}
        />

        {/* BLOCO DE TEXTO */}
        <div className="flex-1 flex flex-col items-start p-6 md:p-10 z-10 relative">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="font-['Anton'] text-[56px] md:text-[64px] text-[#121212] leading-none">
              {year}
            </span>
            <div
              className="relative px-3 py-1.5 mt-2 transform -rotate-1 shadow-sm"
              style={{ backgroundColor: accentColor }}
            >
              <span
                className="relative z-10 font-['Anton'] text-[20px] md:text-[22px] tracking-wide"
                style={{ color: titleTextColor }}
              >
                {title}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 font-['Inter'] text-[14px] md:text-[15px] font-semibold text-[#3a342f] leading-relaxed mb-6">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="relative bg-[#e6d8be] p-4 pr-6 rounded-sm flex gap-4 w-full border border-[#c8b9a2] mt-auto">
            <span
              className="font-['Anton'] text-[48px] leading-[0.7] mt-2"
              style={{ color: accentColor }}
            >
              “
            </span>
            <p className="font-['Inter'] font-bold text-[13px] md:text-[14px] text-[#3a342f] leading-snug">
              {quote}
            </p>
          </div>
        </div>

        {/* BLOCO DA IMAGEM */}
        <div className="w-full md:w-[45%] shrink-0 relative min-h-[250px] md:min-h-0 bg-white">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 md:w-24 md:h-8 z-30 shadow-sm"
            style={{
              backgroundColor: accentColor,
              transform: "rotate(0deg) translateX(-50%)",
              transformOrigin: "left",
            }}
          />
        </div>
      </div>

      {/* LINHA DO TEMPO LATERAL (DIREITA) */}
      {!imageRight && (
        <div className="hidden md:flex flex-col items-center justify-center w-8 shrink-0 relative">
          <div
            className="absolute top-10 bottom-10 w-[2px]"
            style={{ backgroundColor: accentColor }}
          />
          <div
            className="w-5 h-5 rounded-full border-[2.5px] border-[#121212] z-10 bg-white"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      )}
    </section>
  );
}

function TimelineNav({ activeYear }: { activeYear: string }) {
  return (
    <div className="w-full pt-8 pb-7 px-4 lg:px-[80px] z-20 relative overflow-x-auto no-scrollbar">
      <div className="max-w-[1200px] min-w-[850px] mx-auto">
        <div className="relative w-full flex justify-between items-end mb-2">
          <div className="absolute bottom-[10px] md:bottom-[11px] left-[5%] right-[5%] h-[2px] bg-[#121212] z-0" />

          {eras.map((era) => (
            <div
              key={era.id}
              className="relative z-10 flex flex-col items-center w-[90px] md:w-[130px] shrink-0 gap-5 group"
            >
              <div className="flex flex-col items-center justify-end text-center w-full px-1">
                <span className="font-['Anton'] text-[20px] md:text-[26px] text-[#121212] leading-none mb-3 whitespace-nowrap">
                  {era.year}
                </span>

                <div className="flex items-center justify-center w-full min-h-[32px] md:min-h-[40px]">
                  <span className="font-['Inter'] text-[12px] md:text-[14px] font-bold text-[#121212] leading-tight text-center capitalize">
                    {era.title.toLowerCase()}
                  </span>
                </div>
              </div>

              <a
                href={`#${era.year}`}
                aria-label={`Navegar para o ano ${era.year}`}
                className="w-5 h-5 md:w-6 md:h-6 rounded-full border-[2.5px] md:border-[3px] border-[#121212] transition-transform duration-300 hover:scale-110"
                style={{
                  backgroundColor: era.dotColor,
                  transform:
                    activeYear === era.year ? "scale(1.2)" : "scale(1)",
                }}
              >
                <span className="sr-only">Ano {era.year}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonateArrow() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      role="img"
      aria-label="Seta para doar"
    >
      <path d={svgPaths.p3e0d45f0} fill="#121212" stroke="#121212" />
    </svg>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`fixed bottom-8 right-8 z-[100] flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#f8ba01] rounded-[4px] border-[2px] border-[#121212] transition-all duration-300 hover:-translate-y-2 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{
        boxShadow: "4px 4px 0px rgba(18, 18, 18, 1)",
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#121212"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
        role="img"
        aria-label="Seta para cima"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

function TimelineNavStateful() {
  const [activeYear, setActiveYear] = useState(timelineYears[0]);

  useEffect(() => {
    const handler = (e: Event) => setActiveYear((e as CustomEvent).detail);
    window.addEventListener("era-change", handler);
    return () => window.removeEventListener("era-change", handler);
  }, []);

  return <TimelineNav activeYear={activeYear} />;
}

export function HistoryDetailSection() {
  const activeYearRef = useRef(timelineYears[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeYearRef.current = entry.target.id;
            window.dispatchEvent(
              new CustomEvent("era-change", { detail: entry.target.id }),
            );
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const era of eras) {
      const el = document.getElementById(era.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        backgroundColor: "#f0e3cd",
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(0, 0, 0, 0.06) 0%, transparent 40%),
          radial-gradient(circle at 85% 75%, rgba(0, 0, 0, 0.04) 0%, transparent 50%),
          radial-gradient(circle at 50% 5%, rgba(139, 69, 19, 0.02) 0%, transparent 50%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.10'/%3E%3C/svg%3E")
        `,
      }}
    >
      {/* Hero header */}
      <div className="relative w-full pt-16 pb-12 px-6 lg:px-[80px]">
        <div className="relative max-w-[1200px] mx-auto flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-3 mt-[90px]">
            <div className="h-px w-12 bg-black" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: "2px",
                color: "black",
              }}
            >
              NOSSA HISTÓRIA
            </span>
            <div className="h-px w-12 bg-black" />
          </div>

          <div className="relative inline-block mt-4 mb-2">
            <img
              src="/img/faixa1.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{
                transform:
                  "translateX(-3px) translateY(44%) scaleX(1.18) scaleY(0.74) scaleX(0.95)",
              }}
              aria-hidden
            />
            <h1
              className="relative uppercase"
              style={{
                zIndex: 1,
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(48px, 8vw, 96px)",
                lineHeight: 1,
                color: "#121212",
                letterSpacing: "1px",
                padding: "0 10px",
              }}
            >
              NOSSA JORNADA
            </h1>
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "1.4",
              color: "#3a342f",
              maxWidth: 800,
            }}
          >
            Mais de três décadas de luta, resistência e transformação social.
          </p>
        </div>
      </div>

      <TimelineNavStateful />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-[80px] py-16 flex flex-col gap-12">
        {eras.map((era) => (
          <EraSection key={era.id} era={era} />
        ))}
      </div>

      <StatsSection />

      <div
        className="w-full pt-4 pb-12 px-6 lg:px-[80px] flex flex-col items-center justify-center gap-6"
        style={{ background: "#1d1b18" }}
      >
        <p
          className="text-center"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(24px, 4vw, 36px)",
            lineHeight: 1.1,
            color: "#f1e5d1",
            letterSpacing: "1px",
            maxWidth: 700,
          }}
        >
          NOSSA HISTÓRIA É FEITA COM VOCÊ.{" "}
          <span style={{ color: "#f8ba01" }}>CONTINUE.</span>
        </p>
        <button
          type="button"
          className="flex items-center gap-3 bg-[#f8ba01] uppercase rounded-[4px] px-8 py-4 mt-2"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 18,
            lineHeight: "24px",
            color: "#121212",
            boxShadow: "6px 6px 0px rgba(255,255,255,0.2)",
          }}
        >
          FAÇA PARTE
          <DonateArrow />
        </button>
      </div>
      <ScrollToTop />
    </div>
  );
}
