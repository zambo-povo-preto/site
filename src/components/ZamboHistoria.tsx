const imgFrame68 = "/zambo/Frame68/bfe8fac91719951ba5d39ec6b633b2da36c68f6b.png";
const imgFrame69 = "/zambo/Frame68/d000f06fd725bf650cddcb2180c76409d124b7b3.png";
const imgRectangle2 = "/zambo/Group36/8f80c506423b36bcc34c34081265fbd8aacf6e50.png";
const imgRectangle3 = "/zambo/Frame68/544d9e7abfc47b0a36e95247d4a5befa83888d16.png";
const imgPhoto1 = "/zambo/Frame68/987b1f4e79a4d84b8b83b08c67629ffffb7464cc.png";
const imgVector = "/zambo/Frame68/b6fdaff9f3ce7f8a1a69c99e6e3044215f857c4f.png";
const imgVector1 = "/zambo/Frame68/65f81940cd6bff9209cd46744549095788cb2805.png";
const imgIllustration = "/zambo/Frame68/e0cb6662dcbe1edc0d3c18a68d3844e699e6390a.png";

const timelineEvents = [
  {
    year: "1990",
    title: "FUNDAÇÃO DA ZAMBÔ",
    description:
      "Surgimos nas periferias de São Paulo com o propósito de valorizar a cultura afro-brasileira e fortalecer a identidade negra.",
    dotColor: "#dd341f",
  },
  {
    year: "1995",
    title: "PRIMEIROS PASSOS",
    description:
      "Lançamento do primeiro programa educacional permanente de capoeira e percussão para crianças e jovens da comunidade.",
    dotColor: "#f1b412",
  },
  {
    year: "2000",
    title: "FESTIVAL AFRO-BRASILEIRO",
    description:
      "Realização do primeiro Festival de Cultura Afro-Brasileira, reunindo mais de 5 mil pessoas em celebração à arte, música e ancestralidade.",
    dotColor: "#1a7d3c",
  },
  {
    year: "2010",
    title: "EXPANSÃO E IMPACTO",
    description:
      "Expansão para novas comunidades e alcance de 20 mil vidas impactadas através dos programas sociais e culturais.",
    dotColor: "#d2301f",
  },
  {
    year: "2024",
    title: "REFERÊNCIA NACIONAL",
    description:
      "Mais de 15 mil vidas impactadas, 50+ projetos realizados e reconhecimento como referência na promoção da cultura negra no Brasil.",
    dotColor: "#f1b412",
  },
];

const imageCards = [
  { src: imgPhoto1, label: "1990 — FUNDAÇÃO", accentColor: "#dd341f" },
  { src: imgPhoto1, label: "1995 — CAPOEIRA", accentColor: "#f1b412" },
  { src: imgPhoto1, label: "2000 — FESTIVAL", accentColor: "#1a7d3c" },
  { src: imgPhoto1, label: "2010 — EXPANSÃO", accentColor: "#d2301f" },
  { src: imgPhoto1, label: "2024 — HOJE", accentColor: "#f1b412" },
];

function ImageCard({ src, label, accentColor }: { src: string; label: string; accentColor: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[2px]" style={{ border: "2px solid #121212" }}>
      {/* Colored band on top */}
      <div className="w-full h-[6px] shrink-0" style={{ backgroundColor: accentColor }} />
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ height: 140 }}>
        <img
          src={src}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Label overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 px-2 py-1"
          style={{ background: "rgba(18,18,18,0.65)" }}
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 11,
              letterSpacing: "0.5px",
              color: "#f1e5d1",
              lineHeight: 1,
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  year,
  title,
  description,
  dotColor,
}: {
  year: string;
  title: string;
  description: string;
  dotColor: string;
}) {
  return (
    <div className="relative w-full">
      {/* Left vertical border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#030303]" />
      {/* Dot */}
      <div
        className="absolute left-[-10px] top-[40px] size-6 rounded-full border-4 border-[#121212]"
        style={{ backgroundColor: dotColor }}
      />
      <div className="pl-10 py-8 border-b border-[#3a342f]">
        <div
          className="flex gap-4 items-end mb-3"
          style={{ fontFamily: "'Anton', sans-serif", color: "#090908" }}
        >
          <span style={{ fontSize: 48, lineHeight: "48px" }}>{year}</span>
          <span style={{ fontSize: 18, lineHeight: "28px" }}>{title}</span>
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "24px",
            color: "#3a342f",
            maxWidth: 340,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export function ZamboHistoria() {
  return (
    <section className="relative w-full overflow-hidden py-[120px] px-6 lg:px-[120px]">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgFrame68} />
        <div
          className="absolute inset-0 opacity-5 mix-blend-multiply"
          style={{ backgroundImage: `url("${imgFrame69}")`, backgroundSize: "1024px 1024px" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(129deg, rgba(241,227,206,0.2) 0%, rgba(240,226,205,0.2) 100%)",
          }}
        />
      </div>

      {/* Decorative sketch lines */}
      <div aria-hidden className="absolute pointer-events-none" style={{ left: -246, top: 705 }}>
        <div className="absolute" style={{ left: 0, top: 87, width: 581, height: 386 }}>
          <div style={{ transform: "rotate(21.85deg)", transformOrigin: "center", width: 547, height: 197 }}>
            <img alt="" src={imgVector} className="block w-full h-full" />
          </div>
        </div>
        <div className="absolute" style={{ left: 290, top: 20, width: 482, height: 347 }}>
          <div style={{ transform: "rotate(21.85deg)", transformOrigin: "center", width: 441, height: 197 }}>
            <img alt="" src={imgVector1} className="block w-full h-full" />
          </div>
        </div>
        <div className="absolute" style={{ left: 346, top: 0, width: 346, height: 519 }}>
          <img alt="" src={imgIllustration} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      <div className="relative max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-[120px] items-start">
        {/* Left — text content */}
        <div className="flex flex-col gap-8 shrink-0 w-full lg:w-[489px]">
          {/* Section label */}
          <div className="flex gap-4 items-center">
            <div className="w-1 h-5 bg-[#f3b309] shrink-0" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 18,
                color: "black",
              }}
            >
              NOSSA HISTÓRIA
            </span>
          </div>

          {/* Headline */}
          <div className="relative">
            <h2
              className="relative uppercase"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(36px, 4vw, 60px)",
                lineHeight: "72px",
                color: "black",
                letterSpacing: "1px",
              }}
            >
              <span className="block">MAIS DE TRÊS</span>
              <span className="block">DÉCADAS DE LUTAS,</span>
              <span className="block">RESISTÊNCIA E</span>
              <span className="relative block w-fit">
                <span
                  className="absolute -left-6 -right-6 top-[0.12em] bottom-[-0.04em] overflow-hidden"
                  style={{ zIndex: 0 }}
                  aria-hidden
                >
                  <img alt="" className="absolute inset-0 size-full object-fill" src={imgRectangle2} />
                  <img alt="" className="absolute inset-0 size-full object-cover opacity-35 mix-blend-multiply" src={imgRectangle3} />
                </span>
                <span className="relative" style={{ zIndex: 1 }}>TRANSFORMAÇÃO.</span>
              </span>
            </h2>
          </div>

          {/* Body */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "24px",
              color: "black",
              maxWidth: 328,
            }}
          >
            Nossa caminhada é feita de encontros, ancestralidade, cultura e compromisso com a construção de um futuro mais justo, representativo e digno para todas as comunidades.
          </p>
        </div>

        {/* Right — image cards + timeline */}
        <div className="flex gap-5 items-start flex-1 min-w-0">
          {/* Image cards column */}
          <div className="flex flex-col gap-3 shrink-0 w-[220px]">
            {imageCards.map((card, i) => (
              <ImageCard key={i} src={card.src} label={card.label} accentColor={card.accentColor} />
            ))}
          </div>

          {/* Timeline */}
          <div className="flex flex-col flex-1 min-w-0">
            {timelineEvents.map((event) => (
              <TimelineItem key={event.year} {...event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
