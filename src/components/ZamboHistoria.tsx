import { ArrowIcon } from "./icons/ArrowIcon";

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
    image: "/historia/photo-1.png",
    imageTitle: "Reunião com a Diretoria Executiva",
  },
  {
    year: "2000",
    title: "Encontros Comunitários",
    description:
      "Realização e participação em atividades culturais e educacionais, encontros comunitários, palestras, debates, articulação com movimentos sociais e organizações da sociedade civil do Litoral Norte, sobre consciência negra, cidadania e combate ao racismo. ",
    dotColor: "#f1b412",
    image: "/historia/photo-2.png",
    imageTitle: "Encontro na sede com Sambistas de Caraguatatuba",
  },
  {
    year: "2010",
    title: "Novos Projetos",
    description:
      "Expansão das atividades através da participação em editais e programas de incentivo à cultura, fortalecendo oficinas, eventos e ações voltadas à valorização da cultura afro-brasileira.",
    dotColor: "#d2301f",
    image: "/historia/photo-3.png",
    imageTitle: "Reunião do projeto Camugerê Literário",
  },
  {
    year: "2024",
    title: "Reconhecimento",
    description:
      "Reconhecimento oficial como Ponto de Cultura, consolidando décadas de atuação em Caraguatatuba e reafirmando seu papel como referência regional na promoção da cultura negra e da cidadania.",
    dotColor: "#f1b412",
    image: "/historia/photo-4.jpg",
    imageTitle: "Festival XXIX Kizomba 20 de Novembro de 2025",
  },
];

function ImageCard({
  src,
  label,
  accentColor,
}: {
  src: string;
  label: string;
  accentColor: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[2px]"
      style={{ border: "2px solid #121212" }}
    >
      {/* Faixa superior */}
      <div
        className="h-[6px] w-full"
        style={{ backgroundColor: accentColor }}
      />

      {/* Imagem */}
      <div className="relative aspect-[340/220] w-full overflow-hidden">
        <img
          src={src}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Legenda */}
        <div
          className="absolute inset-x-0 bottom-0 px-3 py-2"
          style={{ background: "rgba(18,18,18,0.65)" }}
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 14,
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
  image,
  imageTitle,
  index,
}: {
  year: string;
  title: string;
  description: string;
  dotColor: string;
  image: string;
  imageTitle: string;
  index: number;
}) {
  const isLeft = index % 2 === 0;

  const DesktopContent = (
    <div className={`${isLeft ? "pr-10 text-right" : "pl-10 text-left"} py-8`}>
      <div
        className="flex gap-4 items-end mb-3"
        style={{
          fontFamily: "'Anton', sans-serif",
          color: "#090908",
          flexDirection: isLeft ? "row-reverse" : "row",
        }}
      >
        <span style={{ fontSize: 48 }}>{year}</span>
        <span style={{ fontSize: 18, marginBottom: 11 }}>{title}</span>
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 16,
          lineHeight: "24px",
          color: "#3a342f",
          maxWidth: 340,
          marginLeft: isLeft ? "auto" : 0,
        }}
      >
        {description}
      </p>
    </div>
  );

  return (
    <>
      {/* MOBILE */}
      <div className="relative pl-12 lg:hidden">
        {/* Linha */}
        <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-[#030303]" />

        {/* Bolinha */}
        <div
          className="absolute left-0 top-8 size-6 rounded-full border-4 border-[#121212]"
          style={{ backgroundColor: dotColor }}
        />

        <div className="py-8">
          <div
            className="flex items-end gap-3 mb-6"
            style={{
              fontFamily: "'Anton', sans-serif",
              color: "#090908",
            }}
          >
            <span className="text-5xl">{year}</span>
            <span className="text-lg mb-2">{title}</span>
          </div>

          <div className="mb-6 w-full max-w-sm">
            <ImageCard src={image} label={imageTitle} accentColor={dotColor} />
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "24px",
              color: "#3a342f",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="relative hidden lg:grid grid-cols-[45%_10%_45%] items-center">
        <div>
          {isLeft ? (
            DesktopContent
          ) : (
            <div className="mb-6 w-full max-w-sm ml-auto pr-10">
              <ImageCard
                src={image}
                label={imageTitle}
                accentColor={dotColor}
              />
            </div>
          )}
        </div>

        <div className="relative flex justify-center">
          <div
            className="size-6 rounded-full border-4 border-[#121212] z-10"
            style={{ backgroundColor: dotColor }}
          />
        </div>

        <div>
          {isLeft ? (
            <div className="mb-6 w-full max-w-sm pl-10">
              <ImageCard
                src={image}
                label={imageTitle}
                accentColor={dotColor}
              />
            </div>
          ) : (
            DesktopContent
          )}
        </div>
      </div>
    </>
  );
}

export function ZamboHistoria() {
  return (
    <section id="historia" className="w-full overflow-hidden">
      {/* Cabeçalho */}
      <div className="mx-auto mb-20 max-w-4xl text-center pt-[120px] px-6">
        <h2
          className="uppercase text-left lg:text-center"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(40px, 5.5vw, 72px)",
            lineHeight: 1,
            color: "#121212",
            letterSpacing: "1px",
          }}
        >
          NOSSA HISTÓRIA
        </h2>

        <p
          className="mt-6 text-xl font-medium leading-normal text-center mx-auto text-left lg:text-center"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "26px",
            color: "#3a342f",
          }}
        >
          A Zambô do Movimento Negro de Caraguatatuba é uma associação civil sem
          fins lucrativos criada a partir da mobilização de cidadãos negros e
          simpatizantes da causa antirracista em Caraguatatuba, no ano de 1990.
          Surgiu com o objetivo de representar a comunidade negra, promover
          políticas públicas de combate ao racismo, à discriminação e às
          desigualdades sociais, além de valorizar e preservar a cultura
          afro-brasileira, Sempre participando dos conselhos municipais e
          estatual.
        </p>
      </div>

      <div className="relative w-full overflow-hidden pb-[120px] px-6 lg:px-[120px]">
        <div className="max-w-[1100px] w-full mx-auto relative ">
          {/* linha central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#030303] -translate-x-1/2 hidden lg:block" />

          <div className="flex flex-col gap-16">
            {timelineEvents.map((event, i) => (
              <TimelineItem key={event.year} {...event} index={i} />
            ))}
          </div>
        </div>

        <div className="flex items-start justify-start lg:items-center lg:justify-center">
          <a
            href="/historia"
            className="flex items-center gap-3 shrink-0 bg-[#f8ba01] uppercase rounded-[4px] px-6 py-4"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 16,
              lineHeight: "24px",
              color: "#121212",
              boxShadow: "6px 6px 0px rgba(29,27,24,0.8)",
              whiteSpace: "nowrap",
              marginTop: 60,
            }}
          >
            Ler Mais Sobre a História da Zambô
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
