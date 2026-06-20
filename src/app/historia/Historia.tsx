"use client";

import { useEffect, useRef, useState } from "react";
const imgPhoto = "/zambo/Frame68/987b1f4e79a4d84b8b83b08c67629ffffb7464cc.png";
const imgIllustration = "/zambo/Frame68/e0cb6662dcbe1edc0d3c18a68d3844e699e6390a.png";
const imgRectangle2 = "/zambo/Frame68/1e4f18855119022a2920c12139fd25721134e022.png";
const imgRectangle3 = "/zambo/Frame68/544d9e7abfc47b0a36e95247d4a5befa83888d16.png";
const imgBg = "/zambo/Frame68/bfe8fac91719951ba5d39ec6b633b2da36c68f6b.png";
import svgPaths from "../../imports/Group36/svg-hkzbekptio";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Era {
  id: string;
  year: string;
  title: string;
  accentColor: string;
  dotColor: string;
  paragraphs: string[];
  quote: string;
  quoteAuthor?: string;
  image: string;
  imageAlt: string;
  imageRight: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const eras: Era[] = [
  {
    id: "1990",
    year: "1990",
    title: "FUNDAÇÃO",
    accentColor: "#dd341f",
    dotColor: "#dd341f",
    paragraphs: [
      "Fundação da ONG Zambô nas periferias de São Paulo com o propósito de valorizar a cultura afro-brasileira.",
      "Um grupo de artistas e educadores se uniu para criar um espaço de resistência e celebração da cultura negra através da arte, dança e música.",
      "Nos acostumeiros terreiros de São Paulo, com compromisso com as raízes e a ancestralidade, começamos a tecer nossa rede de influências.",
    ],
    quote:
      "A Zambô nasceu de uma necessidade: a de ver nossa cultura valorizada, nossa história contada e nossa identidade celebrada.",
    image: imgPhoto,
    imageAlt: "Fundação da Zambô — 1990",
    imageRight: true,
  },
  {
    id: "1995",
    year: "1995",
    title: "PROGRAMAS EDUCACIONAIS",
    accentColor: "#f1b412",
    dotColor: "#f1b412",
    paragraphs: [
      "Lançamento do primeiro programa educacional permanente de capoeira e percussão para crianças e jovens.",
      "Nos primeiros anos, atendemos mais de 200 crianças e adolescentes regularmente, oferecendo acesso à cultura, educação artística e formação cidadã.",
      "Com apoio crescente da comunidade, a Zambô consolidou sua presença e começou a expandir o alcance do programa educacional permanente.",
    ],
    quote:
      "Com apoio crescente da comunidade, a Zambô se tornou um espaço de acolhimento, educação e resistência cultural para gerações de jovens.",
    image: imgPhoto,
    imageAlt: "Programas educacionais — 1995",
    imageRight: false,
  },
  {
    id: "2000",
    year: "2000",
    title: "FESTIVAL AFRO-BRASILEIRO",
    accentColor: "#1a7d3c",
    dotColor: "#1a7d3c",
    paragraphs: [
      "Realização do primeiro Festival de Cultura Afro-Brasileira, reunindo mais de 5 mil pessoas em celebração à arte, música e ancestralidade.",
      "Um marco que consolidou a Zambô como referência na cena cultural paulista, o festival reuniu artistas, mestres de capoeira, percussionistas e comunidades de todo o estado.",
      "O festival tornou-se anual e um dos mais importantes eventos de afirmação da cultura negra no interior e litoral do estado.",
    ],
    quote:
      "O festival nasceu para mostrar que a cultura negra não é margem — é centro. É de onde vem a força criativa deste país.",
    image: imgPhoto,
    imageAlt: "Festival Afro-Brasileiro — 2000",
    imageRight: true,
  },
  {
    id: "2010",
    year: "2010",
    title: "EXPANSÃO E IMPACTO",
    accentColor: "#d2301f",
    dotColor: "#d2301f",
    paragraphs: [
      "Expansão para novas comunidades e alcance de 20 mil vidas impactadas através dos programas sociais e culturais.",
      "Novos parceiros foram construídos, ampliando o acesso à arte, educação e oportunidades para as comunidades negras.",
      "A Zambô passou a atuar em mais de 10 municípios, levando programas de formação artística, educação patrimonial e fortalecimento identitário.",
    ],
    quote:
      "A cada nova comunidade alcançada, a Zambô reafirma que a cultura é ferramenta de transformação social.",
    image: imgIllustration,
    imageAlt: "Expansão e impacto — 2010",
    imageRight: false,
  },
  {
    id: "2024",
    year: "2024",
    title: "REFERÊNCIA NACIONAL",
    accentColor: "#f1b412",
    dotColor: "#f1b412",
    paragraphs: [
      "Mais de 15 mil vidas impactadas, 50+ projetos realizados e reconhecimento como referência na promoção da cultura negra no Brasil.",
      "A Zambô continua a transformar a cultura afro-brasileira como ponte entre o passado e um futuro mais justo.",
      "Seguimos construindo com o povo, para o povo, acreditando que cada encontro, cada oficina e cada celebração semeia uma nova geração de transformadores.",
    ],
    quote:
      "Seguimos construindo com o povo, para o povo. Nossa história é feita de cada pessoa que acredita numa cultura negra viva e transformadora.",
    image: imgPhoto,
    imageAlt: "Referência nacional — 2024",
    imageRight: true,
  },
];

const timelineYears = eras.map((e) => e.year);

// ─── Sub-components ───────────────────────────────────────────────────────────

function HighlightedTitle({ text, accentColor }: { text: string; accentColor: string }) {
  return (
    <div className="relative inline-block">
      {/* Yellow band behind text */}
      <span
        className="absolute inset-y-0 left-0 right-0 overflow-hidden"
        aria-hidden
        style={{ zIndex: 0 }}
      >
        <span
          className="absolute inset-0"
          style={{
            maskImage: `url("${imgRectangle2}")`,
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
          }}
        >
          <span className="absolute inset-0" style={{ backgroundColor: accentColor }} />
          <img alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" src={imgRectangle3} />
        </span>
      </span>
      <span
        className="relative uppercase"
        style={{
          zIndex: 1,
          fontFamily: "'Anton', sans-serif",
          fontSize: "clamp(20px, 2.5vw, 28px)",
          lineHeight: 1,
          letterSpacing: "1px",
          color: "#121212",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function QuoteBlock({ text, author, accentColor }: { text: string; author?: string; accentColor: string }) {
  return (
    <blockquote
      className="relative pl-5 py-1"
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 16,
          lineHeight: "26px",
          color: "#3a342f",
        }}
      >
        "{text}"
      </p>
      {author && (
        <footer
          className="mt-2"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 13,
            color: "#3a342f",
            letterSpacing: "0.5px",
          }}
        >
          — {author}
        </footer>
      )}
    </blockquote>
  );
}

function EraSection({ era }: { era: Era }) {
  const { year, title, accentColor, paragraphs, quote, quoteAuthor, image, imageAlt, imageRight } = era;

  const content = (
    <div className="flex flex-col gap-6 flex-1">
      {/* Year + title */}
      <div className="flex flex-col gap-3">
        <div className="flex items-end gap-5 flex-wrap">
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(72px, 8vw, 120px)",
              lineHeight: 1,
              color: "#090908",
              letterSpacing: "1px",
            }}
          >
            {year}
          </span>
          <HighlightedTitle text={title} accentColor={accentColor} />
        </div>
        {/* Colored rule */}
        <div className="h-[3px] w-16" style={{ backgroundColor: accentColor }} />
      </div>

      {/* Paragraphs */}
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "26px",
              color: "#3a342f",
            }}
          >
            {p}
          </p>
        ))}
      </div>

      {/* Quote */}
      <QuoteBlock text={quote} author={quoteAuthor} accentColor={accentColor} />
    </div>
  );

  const photo = (
    <div
      className="relative shrink-0 overflow-hidden rounded-[2px]"
      style={{
        width: "clamp(220px, 35%, 380px)",
        aspectRatio: "3/4",
        border: "3px solid #121212",
        boxShadow: "6px 6px 0px #121212",
      }}
    >
      {/* Colored band on top */}
      <div className="absolute top-0 left-0 right-0 h-[6px] z-10" style={{ backgroundColor: accentColor }} />
      <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );

  return (
    <section id={year} className="relative scroll-mt-32">
      {/* Left accent border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: accentColor }}
      />

      <div
        className="ml-4 p-8 lg:p-12 rounded-r-[4px]"
        style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(4px)", border: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className={`flex flex-col lg:flex-row gap-10 items-start ${imageRight ? "" : "lg:flex-row-reverse"}`}>
          {content}
          {photo}
        </div>
      </div>
    </section>
  );
}

function TimelineNav({ activeYear }: { activeYear: string }) {
  return (
    <div className="sticky top-0 z-10 py-4 px-6 lg:px-[80px]" style={{ background: "#1d1b18" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-0 overflow-x-auto">
          {timelineYears.map((year, i) => (
            <div key={year} className="flex items-center shrink-0">
              {i > 0 && (
                <div className="h-[2px] w-8 lg:w-16" style={{ background: activeYear === year ? "#f8ba01" : "#3a342f" }} />
              )}
              <a
                href={`#${year}`}
                className="flex flex-col items-center gap-1 px-3 group"
              >
                <div
                  className="size-4 rounded-full border-2 transition-colors"
                  style={{
                    backgroundColor: activeYear === year ? "#f8ba01" : "#3a342f",
                    borderColor: activeYear === year ? "#f8ba01" : "#5a534e",
                  }}
                />
                <span
                  className="transition-colors"
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 14,
                    lineHeight: "20px",
                    color: activeYear === year ? "#f8ba01" : "#9a8f86",
                    letterSpacing: "0.5px",
                  }}
                >
                  {year}
                </span>
              </a>
            </div>
          ))}
        </div>
        <p
          className="mt-1 hidden lg:block"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 12,
            color: "#9a8f86",
            letterSpacing: "0.3px",
          }}
        >
          Clique em um ano para navegar até cada capítulo da nossa história.
        </p>
      </div>
    </div>
  );
}

function DonateArrow() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d={svgPaths.p3e0d45f0} fill="#121212" stroke="#121212" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Historia() {
  const activeYearRef = useRef(timelineYears[0]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeYearRef.current = entry.target.id;
            // force re-render by dispatching a custom event
            window.dispatchEvent(new CustomEvent("era-change", { detail: entry.target.id }));
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    eras.forEach((era) => {
      const el = document.getElementById(era.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full" style={{ background: "#f5eedd" }}>
      {/* Hero header */}
      <div
        className="relative w-full overflow-hidden py-20 px-6 lg:px-[80px]"
        style={{ background: "#f5eedd" }}
      >
        <img src={imgBg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none mix-blend-multiply" />
        <div className="relative max-w-[1200px] mx-auto flex flex-col items-center text-center gap-6">
          {/* Label */}
          <div className="flex items-center gap-3">
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

          {/* Title */}
          <h1
            className="uppercase"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: 1,
              color: "#121212",
              letterSpacing: "1px",
            }}
          >
            NOSSA JORNADA
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "28px",
              color: "#3a342f",
              maxWidth: 520,
            }}
          >
            Mais de três décadas de luta, resistência e transformação social.
          </p>
        </div>
      </div>

      {/* Sticky timeline nav */}
      <TimelineNavStateful />

      {/* Era sections */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[80px] py-16 flex flex-col gap-12">
        {eras.map((era) => (
          <EraSection key={era.id} era={era} />
        ))}
      </div>

      {/* Footer CTA */}
      <div
        className="w-full py-16 px-6 lg:px-[80px] flex flex-col items-center justify-center gap-8"
        style={{ background: "#1d1b18" }}
      >
        <p
          className="text-center"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(24px, 4vw, 48px)",
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
          className="flex items-center gap-3 bg-[#f8ba01] uppercase rounded-[4px] px-8 py-4"
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
    </div>
  );
}

// Stateful wrapper so TimelineNav reacts to scroll
function TimelineNavStateful() {
  const [activeYear, setActiveYear] = useState(timelineYears[0]);

  useEffect(() => {
    const handler = (e: Event) => setActiveYear((e as CustomEvent).detail);
    window.addEventListener("era-change", handler);
    return () => window.removeEventListener("era-change", handler);
  }, []);

  return <TimelineNav activeYear={activeYear} />;
}
