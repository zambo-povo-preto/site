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
      "Fundação do Movimento Negro de Caraguatatuba: idealizado por lideranças negras e apoiadores da causa antirracista em defesa dos direitos da população negra no município.Surgiu com o objetivo de representar a comunidade negra, promover políticas públicas de combate ao racismo, à discriminação e às desigualdades sociais, além de valorizar e preservar a cultura afro-brasileira, sempre participando dos conselhos municipais e estatual.",
    ],
    quote:
      "A Zambô nasceu de uma necessidade: a de ver nossa cultura valorizada, nossa história contada e nossa identidade celebrada.",
    image: "/img/teste5.jpg",
    imageAlt: "Fundação da Zambô — 1990",
    imageRight: true,
  },
  {
    id: "1995",
    year: "1991–2000",
    title: "AÇÕES SOCIOCULTURAIS",
    accentColor: "#f1b412",
    dotColor: "#f1b412",
    paragraphs: [
      "Realização de atividades culturais, palestras e debates, além da articulação com movimentos sociais e organizações do Litoral Norte voltadas à consciência negra, cidadania e combate ao racismo. Entre suas principais realizações está a tradicional “Kizomba da Consciência Negra”, iniciada em 1996, evento que se tornou referência cultural no município, promovendo apresentações artísticas, reflexões antirracistas e valorização das ancestralidades negras",
    ],
    quote:
      "O festival nasceu para mostrar que a cultura negra não é margem — é centro. É de onde vem a força criativa deste país.",
    image: "/img/terezinha.jpg",
    imageAlt: "Programas educacionais — 1995",
    imageRight: false,
  },
  {
    id: "2001",
    year: "2001",
    title: "REGISTRO OFICIAL",
    accentColor: "#1a7d3c",
    dotColor: "#1a7d3c",
    paragraphs: [
      "Registrada como associação civil de direito privado, com autonomia administrativa, sob CNPJ nº 04.978.370/0001-59. Oficializada como associação em 2001, a entidade desenvolveu ao longo de sua trajetória diversas ações culturais, educativas e sociais, como oficinas, palestras, seminários, eventos culturais, projetos de geração de renda e atividades de fortalecimento da identidade negra, sempre em parceria com órgãos públicos e privados. ",
    ],
    quote:
      "A cada nova comunidade alcançada, a Zambô reafirma que a cultura é ferramenta de transformação social.",
    image: "/img/teste4.jpg",
    imageAlt: "Festival Afro-Brasileiro — 2000",
    imageRight: true,
  },
  {
    id: "2002",
    year: "2002",
    title: "RECONHECIMENTO MUNICIPAL",
    accentColor: "#d2301f",
    dotColor: "#d2301f",
    paragraphs: [
      "Declaração de utilidade pública municipal decretada sob a Lei nº 975 em 22 de Novembro de 2002.",
      "Nesse período, a entidade expandiu suas ações de formação e conscientização em escolas e comunidades, promoveu atividades culturais ligadas à memória afro-brasileira valorizando as tradições de matriz africana e fortaleceu sua atuação em conselhos, fóruns e conferências voltados à igualdade racial.",
    ],
    quote:
      "Com apoio crescente da comunidade, a Zambô se tornou um espaço de acolhimento, educação e resistência cultural para gerações de jovens.",
    image: "/img/teste11.jpg",
    imageAlt: "Expansão e impacto — 2010",
    imageRight: false,
  },
  {
    id: "2010",
    year: "2010-2019",
    title: "DESENVOLVIMENTO CULTURAL",
    accentColor: "#f1b412",
    dotColor: "#f1b412",
    paragraphs: [
      "Foco no desenvolvimento de projetos culturais, oficinas e rodas de conversa ligadas ao Dia da Consciência Negra. Além disso, ampliou o diálogo com os setores público e privado para implementar políticas de inclusão e diversidade, atuando firmemente na preservação da memória da população negra de Caraguatatuba e região.",
    ],
    quote:
      "Seguimos construindo com o povo, para o povo. Nossa história é feita de cada pessoa que acredita numa cultura negra viva e transformadora.",
    image: "/img/teste8.jpg",
    imageAlt: "Referência nacional — 2024",
    imageRight: true,
  },
  
  // AQUI COMEÇAM AS NOVAS DATAS (Insira ANTES da função Historia):
  {
    id: "2026",
    year: "2021-2023",
    title: "FORTALECIMENTO COMUNITÁRIO", // Título de exemplo
    accentColor: "#1a7d3c", // Nova cor: Teal
    dotColor: "#1a7d3c",
    paragraphs: [
      "Participação em editais e programas de fortalecimento da cultura de base comunitária. Paralelamente, realizou atividades formativas e educativas para jovens, mulheres e lideranças, além de expandir sua presença institucional em redes culturais e movimentos de igualdade racial.",
    ],
    quote:
      "Seguimos construindo com o povo, para o povo. Vemos nossa força se renovar nos olhos de cada jovem que se descobre potência.",
    image: "/img/teste12.jpg", // placeholder de imagem
    imageAlt: "Expansão regional — 2026",
    imageRight: false, // Mantém a alternância (educadores -> registro -> reconhecimento -> referência -> expansão)
  },
  {
    id: "2024",
    year: "2024",
    title: "PONTO DE CULTURA", // Título de exemplo
    accentColor: "#d2301f", // Nova cor: Orange
    dotColor: "#d2301f",
    paragraphs: [
      "Certificação como Ponto de Cultura. Fortalecimento das ações voltadas à Política Nacional Cultura Viva. A partir disso, a entidade estruturou e ampliou suas atividades, desenvolvendo novas iniciativas de valorização da ancestralidade, memória e identidade afro-brasileira.",
    ],
    quote:
      "Nossa força agora abraça todo o Litoral Norte, tecendo uma rede de ancestralidade e transformação social.",
    image: "/img/teste7.jpg", // placeholder de imagem
    imageAlt: "Zambô Digital — 2024",
    imageRight: true,
  },
  {
    id: "2025",
    year: "2025",
    title: "35 ANOS DE INSTITUIÇÃO", // Título de exemplo
    accentColor: "#f1b412", // Nova cor: Purple
    dotColor: "#f1b412",
    paragraphs: [
      "Este período marca a consolidação de uma trajetória de 35 anos de atuação contínua da instituição. Paralelamente, a entidade participou do Edital de Premiação de Pontos e Pontões de Cultura – Cultura Viva e teve sua relevância histórica, cultural e social amplamente reconhecida em Caraguatatuba, no Litoral Norte e no Estado de São Paulo.",
    ],
    quote:
      "O som dos nossos tambores quebrou fronteiras; agora levamos nossa história para o mundo.",
    image: "/img/teste17.jpg", // placeholder de imagem
    imageAlt: "Impacto geracional — 2030",
    imageRight: false,
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

// Componente auxiliar para os pontilhados nos cantos do card
function DecorativeDots({ className }: { className?: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
      <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
      </pattern>
      <rect width="40" height="40" fill="url(#dots)" />
    </svg>
  );
}

function EraSection({ era }: { era: Era }) {
  const { year, title, accentColor, paragraphs, quote, image, imageAlt, imageRight } = era;

  const isYellow = accentColor.toLowerCase() === "#f1b412";
  const titleTextColor = isYellow ? "#121212" : "#ffffff";

  return (
    // Adicionei md:mb-12 para dar mais espaço entre os cards
    <section id={year} className="relative w-full max-w-[1100px] mx-auto flex items-stretch gap-4 md:gap-8 scroll-mt-10 mb-8 md:mb-12">
      
      {/* LINHA DO TEMPO LATERAL (ESQUERDA) */}
      {imageRight && (
        <div className="hidden md:flex flex-col items-center justify-center w-8 shrink-0 relative">
          <div className="absolute top-10 bottom-10 w-[2px]" style={{ backgroundColor: accentColor }} />
          <div className="w-5 h-5 rounded-full border-[2.5px] border-[#121212] z-10 bg-white" style={{ backgroundColor: accentColor }} />
        </div>
      )}

      {/* CARD PRINCIPAL */}
      {/* MUDANÇA: Adicionei md:min-h-[420px] para padronizar a altura mínima do card em telas maiores */}
      <div className={`relative flex-1 bg-[#f4ebd9] md:min-h-[420px] shadow-[2px_4px_12px_rgba(0,0,0,0.08)] border border-[#dcd1bc] flex flex-col ${imageRight ? "md:flex-row" : "md:flex-row-reverse"} overflow-hidden`}>
        
        {/* Detalhes pontilhados nos cantos do texto */}
        <DecorativeDots className={`absolute top-3 text-[#5a534e] opacity-30 z-10 ${imageRight ? "left-3" : "right-3"}`} />
        <DecorativeDots className={`absolute bottom-3 text-[#5a534e] opacity-30 z-10 ${imageRight ? "left-3" : "right-3"}`} />

        {/* BLOCO DE TEXTO */}
        <div className="flex-1 flex flex-col items-start p-6 md:p-10 z-10 relative">
          
          {/* Cabeçalho do Card */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="font-['Anton'] text-[56px] md:text-[64px] text-[#121212] leading-none">
              {year}
            </span>
            <div className="relative px-3 py-1.5 mt-2 transform -rotate-1 shadow-sm" style={{ backgroundColor: accentColor }}>
              <span className="relative z-10 font-['Anton'] text-[20px] md:text-[22px] tracking-wide" style={{ color: titleTextColor }}>
                {title}
              </span>
            </div>
          </div>

          {/* Parágrafos */}
          <div className="flex flex-col gap-3 font-['Inter'] text-[14px] md:text-[15px] font-semibold text-[#3a342f] leading-relaxed mb-6">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Bloco de Citação */}
          <div className="relative bg-[#e6dbce] p-4 pr-6 rounded-sm flex gap-4 w-full border border-[#d8cdb8] mt-auto">
            <span className="font-['Anton'] text-[48px] leading-[0.7] mt-2" style={{ color: accentColor }}>
              “
            </span>
            <p className="font-['Inter'] font-bold text-[13px] md:text-[14px] text-[#3a342f] leading-snug">
              {quote}
            </p>
          </div>
        </div>

        {/* BLOCO DA IMAGEM: Ocupa todo o bloco da direita, tocando as bordas */}
        {/* REMOVIDO o overflow-hidden desta div abaixo também */}
        <div className="w-full md:w-[45%] shrink-0 relative min-h-[250px] md:min-h-0 bg-white">
          
          {/* A foto com 'absolute inset-0' */}
          <img 
            src={image} 
            alt={imageAlt} 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          
          {/* AJUSTADO: Trocado 'top-4' por '-top-3' para subir, adicionado 'z-30' e deixado reto (rotate(0deg)) como no exemplo */}
          <div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 md:w-24 md:h-8 z-30 shadow-sm" 
            style={{ 
              backgroundColor: accentColor, 
              transform: "rotate(0deg) translateX(-50%)",
              transformOrigin: "left"
            }} 
          />
          
        </div>

      </div>

      {/* LINHA DO TEMPO LATERAL (DIREITA) */}
      {!imageRight && (
        <div className="hidden md:flex flex-col items-center justify-center w-8 shrink-0 relative">
          <div className="absolute top-10 bottom-10 w-[2px]" style={{ backgroundColor: accentColor }} />
          <div className="w-5 h-5 rounded-full border-[2.5px] border-[#121212] z-10 bg-white" style={{ backgroundColor: accentColor }} />
        </div>
      )}

    </section>
  );
}

// Responsável pela linha do tempo da Zambô
function TimelineNav({ activeYear }: { activeYear: string }) {
  return (
    <div className="w-full pt-8 pb-7 px-4 lg:px-[80px] z-20 relative overflow-x-auto no-scrollbar">
      
      <div className="max-w-[1200px] min-w-[850px] mx-auto">
        
        {/* Container Principal da Linha do Tempo */}
        <div className="relative w-full flex justify-between items-end mb-2">
          
          {/* Linha horizontal preta conectando os pontos */}
          <div className="absolute bottom-[10px] md:bottom-[11px] left-[5%] right-[5%] h-[2px] bg-[#121212] z-0" />
          
          {eras.map((era) => (
      
            <div key={era.id} className="relative z-10 flex flex-col items-center w-[90px] md:w-[130px] shrink-0 gap-5 group">
              
              {/* Textos acima da linha */}
              <div className="flex flex-col items-center justify-end text-center w-full px-1">
                
                {/* Ano */}
              
                <span className="font-['Anton'] text-[20px] md:text-[26px] text-[#121212] leading-none mb-3 whitespace-nowrap">
                  {era.year}
                </span>
                
                {/* Caixinha do subtítulo */}
                <div className="flex items-center justify-center w-full min-h-[32px] md:min-h-[40px]">
                  <span className="font-['Inter'] text-[12px] md:text-[14px] font-bold text-[#121212] leading-tight text-center capitalize">
                    {era.title.toLowerCase()}
                  </span>
                </div>
              </div>

              {/* Bolinha com cor dinâmica */}
              <a 
                href={`#${era.year}`} 
                className="w-5 h-5 md:w-6 md:h-6 rounded-full border-[2.5px] md:border-[3px] border-[#121212] transition-transform duration-300 hover:scale-110"
                style={{ 
                  backgroundColor: era.dotColor,
                  transform: activeYear === era.year ? "scale(1.2)" : "scale(1)"
                }}
              />
            </div>
          ))}
        </div>
        
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

export function ZamboStats() {
  // Adicionamos a propriedade "rotate" para rotacionar levemente cada fita
  const stats = [
    { value: "30+", label: "Anos de História", color: "#e22a1d", rotate: -2 },
    { value: "3k+", label: "Vidas Impactadas", color: "#fdc700", rotate: 1 },
    { value: "20+", label: "Projetos Realizados", color: "#008236", rotate: -3 },
  ];

  return (
    <section
      className="relative w-full pt-20 pb-12 px-6 lg:px-[80px]"
      style={{ background: "#1d1b18" }}
    >
      {/* Grid com espaçamento amplo */}
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {stats.map((stat) => (
            // Card Individual Escuro
            <div 
              key={stat.label} 
              className="relative flex flex-col items-center bg-[#292724] px-6 py-12 md:py-16 rounded-[16px] shadow-2xl mt-6"
            >
              {/* Fita Adesiva Tátil */}
              <div
                className="absolute -top-3 left-1/2 w-24 h-7 shadow-[0px_2px_4px_rgba(0,0,0,0.5)] opacity-95"
                style={{
                  backgroundColor: stat.color,
                  transform: `translateX(-50%) rotate(${stat.rotate}deg)`,
                  borderRadius: '2px', // Borda sutilmente suave
                }}
              />
              
              {/* Textos */}
              <div 
                className="flex flex-col items-center gap-2 text-center" 
                style={{ fontFamily: "'Anton', sans-serif", color: "#f1e5d1" }}
              >
                <span style={{ fontSize: "clamp(56px, 7vw, 72px)", lineHeight: 1 }}>
                  {stat.value}
                </span>
                {/* Legenda com cor levemente mais opaca (bege escuro) */}
                <span 
                  className="uppercase" 
                  style={{ fontSize: 16, lineHeight: "24px", letterSpacing: "1px", color: "#c8bfae" }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

// ─── Componente Voltar ao Topo ────────────────────────────────────────────────
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Função para verificar a rolagem da página
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
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`fixed bottom-8 right-8 z-[100] flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#f8ba01] rounded-[4px] border-[2px] border-[#121212] transition-all duration-300 hover:-translate-y-2 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{
        boxShadow: "4px 4px 0px rgba(18, 18, 18, 1)", // Sombra sólida preta igual aos outros botões
      }}
    >
      {/* Ícone de Seta para cima */}
      <svg 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#121212" 
        strokeWidth="3" 
        strokeLinecap="square" 
        strokeLinejoin="miter"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

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

  //inicio do controle de BACKGROUND
  return (
    <div 
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        backgroundColor: "#EEDEC9", 
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
          {/* Title com Faixa ao fundo */}
          <div className="relative inline-block mt-4 mb-2">
            <img
              src="/img/faixa1.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{ transform: "translateX(-3px) translateY(44%) scaleX(1.18) scaleY(0.74) scaleX(0.95)" }} //Alterar as dimensões da faixa de nossa jornada
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

          {/* Subtitle */}
          {/* Subtitle */}
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

      {/* Sticky timeline nav */}
      <TimelineNavStateful />

      {/* Era sections */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[80px] py-16 flex flex-col gap-12">
        {eras.map((era) => (
          <EraSection key={era.id} era={era} />
        ))}
      </div>

      <ZamboStats />

      {/* Footer CTA */}
      <div
        // MUDANÇA: Reduzido de 'py-16' para 'pt-4 pb-12' para colar no bloco de cima
        className="w-full pt-4 pb-12 px-6 lg:px-[80px] flex flex-col items-center justify-center gap-6"
        style={{ background: "#1d1b18" }}
      >
        <p
          className="text-center"
          style={{
            fontFamily: "'Anton', sans-serif",
            // MUDANÇA: Letras menores. Máximo foi de 48px para 36px.
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
