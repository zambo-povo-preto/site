const imgFrame68 =
  "/zambo/Frame68/bfe8fac91719951ba5d39ec6b633b2da36c68f6b.png";
const imgFrame69 =
  "/zambo/Frame68/d000f06fd725bf650cddcb2180c76409d124b7b3.png";
const imgRectangle2 =
  "/zambo/Group36/8f80c506423b36bcc34c34081265fbd8aacf6e50.png";
const imgRectangle3 =
  "/zambo/Frame68/544d9e7abfc47b0a36e95247d4a5befa83888d16.png";
const imgPhoto1 = "/zambo/Frame68/987b1f4e79a4d84b8b83b08c67629ffffb7464cc.png";
const imgVector = "/zambo/Frame68/b6fdaff9f3ce7f8a1a69c99e6e3044215f857c4f.png";
const imgVector1 =
  "/zambo/Frame68/65f81940cd6bff9209cd46744549095788cb2805.png";
const imgIllustration =
  "/zambo/Frame68/e0cb6662dcbe1edc0d3c18a68d3844e699e6390a.png";

const timelineEvents = [
  {
    year: "1990",
    title: "Nascimento do Movimento",
    description:
      "Surgimento da Zambô do Movimento Negro em Caraguatatuba, com o propósito de fortalecer a identidade negra, promover a cultura afro-brasileira e atuar junto às comunidades do município.",
    dotColor: "#dd341f",
  },
  {
    year: "1996",
    title: "Primeira Kizomba",
    description:
      "Início da realização da Kizomba da Consciência Negra, evento que se tornou uma das principais celebrações da cultura negra do Litoral Norte, reunindo arte, música, debates e educação antirracista.",
    dotColor: "#f1b412",
  },
  {
    year: "2014",
    title: "Novos Projetos",
    description:
      "Expansão das atividades através da participação em editais e programas de incentivo à cultura, fortalecendo oficinas, eventos e ações voltadas à valorização da cultura afro-brasileira.",
    dotColor: "#d2301f",
  },
  {
    year: "2024",
    title: "Reconhecimento",
    description:
      "Reconhecimento oficial como Ponto de Cultura, consolidando décadas de atuação em Caraguatatuba e reafirmando seu papel como referência regional na promoção da cultura negra e da cidadania.",
    dotColor: "#f1b412",
  },
];

const imageCards = [
  {
    year: "1990",
    src: imgPhoto1,
    label: "FUNDAÇÃO",
    accentColor: "#dd341f",
  },
  {
    year: "2001",
    src: imgPhoto1,
    label: "ASSOCIAÇÃO",
    accentColor: "#1a7d3c",
  },
  {
    year: "2024",
    src: imgPhoto1,
    label: "PONTO DE CULTURA",
    accentColor: "#f1b412",
  },
];

function ImageCard({
  src,
  label,
  accentColor,
}: { src: string; label: string; accentColor: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[2px]"
      style={{ border: "2px solid #121212" }}
    >
      {/* Colored band on top */}
      <div
        className="w-full h-[6px] shrink-0"
        style={{ backgroundColor: accentColor }}
      />
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ height: 140 }}>
        <img
          src={src}
          alt={label}
          width={260}
          height={220}
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
  isLast,
}: {
  year: string;
  title: string;
  description: string;
  dotColor: string;
  isLast: boolean;
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
      <div className={`pl-10 py-8 ${isLast ? "" : ""}`}>
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
    <section className="background relative w-full overflow-hidden py-[120px] px-6 lg:px-[120px]">
      <div className="max-w-[1100px] w-full mx-auto">
        {/* Decorative sketch lines */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{ left: -246, top: 705 }}
        >
          <div
            className="absolute"
            style={{ left: 0, top: 87, width: 581, height: 386 }}
          >
            <div
              style={{
                transform: "rotate(21.85deg)",
                transformOrigin: "center",
                width: 547,
                height: 197,
              }}
            >
              <img alt="" src={imgVector} className="block w-full h-full" />
            </div>
          </div>
          <div
            className="absolute"
            style={{ left: 290, top: 20, width: 482, height: 347 }}
          >
            <div
              style={{
                transform: "rotate(21.85deg)",
                transformOrigin: "center",
                width: 441,
                height: 197,
              }}
            >
              <img alt="" src={imgVector1} className="block w-full h-full" />
            </div>
          </div>
          <div
            className="absolute"
            style={{ left: 346, top: 0, width: 346, height: 519 }}
          >
            <img
              alt=""
              src={imgIllustration}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative w-full mx-auto flex flex-col lg:flex-row gap-[120px] items-start">
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
                <span className="block">UMA TRAJETÓRIA</span>
                <span className="block">DE CULTURA,</span>
                <span className="block">MEMÓRIA E</span>
                <span className="relative block w-fit">
                  <span
                    className="absolute -left-6 -right-6 top-[0.12em] bottom-[-0.04em] overflow-hidden"
                    style={{ zIndex: 0 }}
                    aria-hidden
                  >
                    <img
                      alt=""
                      className="absolute inset-0 size-full object-fill"
                      src={imgRectangle2}
                    />
                    <img
                      alt=""
                      className="absolute inset-0 size-full object-cover opacity-35 mix-blend-multiply"
                      src={imgRectangle3}
                    />
                  </span>
                  <span className="relative" style={{ zIndex: 1 }}>
                    RESISTÊNCIA.
                  </span>
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
              Nossa caminhada é feita de encontros, ancestralidade, cultura e
              compromisso com a construção de um futuro mais justo,
              representativo e digno para todas as comunidades.
            </p>
          </div>

          {/* Right — image cards + timeline */}
          <div className="flex gap-5 items-start flex-1 min-w-0">
            {/* Timeline */}
            <div className="flex flex-col flex-1 min-w-0">
              {timelineEvents.map((event, i) => (
                <TimelineItem
                  key={event.year}
                  {...event}
                  isLast={i === timelineEvents.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
