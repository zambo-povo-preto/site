import { ImageWithFallback } from "./figma/ImageWithFallback";
import svgPaths from "../imports/Group36/svg-hkzbekptio";
import { PresidentCard } from "./PresidentCard";

// ─── Data ─────────────────────────────────────────────────────────────────────

const heroPhoto = "/apoiadores/hero-photo.jpg";

const categoryCards = [
  {
    label: "ARTISTAS INDEPENDENTES",
    photo: "/apoiadores/artistas-independentes.jpg",
    accentColor: "#dd341f",
  },
  {
    label: "COLETIVOS CULTURAIS",
    photo: "/apoiadores/coletivos-culturais.jpg",
    accentColor: "#f8ba01",
  },
  {
    label: "EDUCADORES POPULARES",
    photo: "/apoiadores/educadores-populares.jpg",
    accentColor: "#1a7d3c",
  },
  {
    label: "VOLUNTÁRIOS",
    photo: "/apoiadores/voluntarios.jpg",
    accentColor: "#dd341f",
  },
  {
    label: "COMUNIDADE LOCAL",
    photo: "/apoiadores/comunidade-local.jpg",
    accentColor: "#f8ba01",
  },
];

const institutionalPartners = [
  {
    name: "FUNDACC",
    sub: "Fundação Educacional e\nCultural de Caraguatatuba",
  },
  { name: "PROAC", sub: "Programa de Ação Cultural\nEstado de São Paulo" },
  { name: "Cidade de\nCaraguatatuba", sub: "" },
  {
    name: "IFSP Caraguatatuba",
    sub: "Instituto Federal de Educação\nCiência e Tecnologia",
  },
  { name: "Ministério da\nCultura", sub: "" },
  { name: "Governo Federal\nBRASIL", sub: "União e Reconstrução" },
  { name: "Pontos de Cultura", sub: "Odê da Mata\nDois Velhinhos pelo Mundo" },
  {
    name: "Coletivos",
    sub: "Mamulengo de Si Mesmo\nLinhas do Mar\nCasa da Democracia",
  },
  { name: "Matrize Africana\nMatinata" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Card de categoria de apoiadores com foto e label na base */
function CategoryCard({
  photo,
  label,
  accentColor,
}: {
  photo: string;
  label: string;
  accentColor: string;
}) {
  return (
    <div
      className="relative overflow-hidden flex-1 min-w-0"
      style={{
        border: "2.5px solid #121212",
        boxShadow: "4px 4px 0px #121212",
        borderRadius: 3,
        minWidth: 0,
      }}
    >
      {/* Photo */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "3/4" }}
      >
        <ImageWithFallback
          src={photo}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "55%",
            background:
              "linear-gradient(to top, rgba(18,18,18,0.92) 0%, transparent 100%)",
          }}
        />
        {/* Accent top strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[5px]"
          style={{ background: accentColor }}
        />
        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(12px, 1.4vw, 15px)",
              lineHeight: 1.2,
              color: "#f1e5d1",
              letterSpacing: "0.5px",
              display: "block",
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Logo placeholder para parceiros institucionais */
function PartnerLogo({ name, sub }: { name: string; sub: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-4 py-6 flex-1 min-w-0"
      style={{ borderRight: "1px solid rgba(107,94,85,0.2)" }}
    >
      <span
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: "clamp(11px, 1.2vw, 15px)",
          lineHeight: 1.2,
          color: "#f1e5d1",
          letterSpacing: "0.3px",
          whiteSpace: "pre-line",
        }}
      >
        {name}
      </span>
      {sub && (
        <span
          className="mt-1"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(9px, 0.9vw, 11px)",
            lineHeight: 1.3,
            color: "#9a8f86",
            whiteSpace: "pre-line",
          }}
        >
          {sub}
        </span>
      )}
    </div>
  );
}

// const president = {
//   name: "TERESINHA DE OLIVEIRA MARCIANO COSTA",
//   role: "PRESIDENTE DA ONG",
//   photo: "/teresinha-marciano.jpg",
//   bio: "Fundadora da Zambô e referência na luta pela valorização da cultura afro-brasileira em Caraguatatuba. Educadora popular, produtora cultural e guardiã de saberes que inspiram gerações.",
//   quote: "A cultura negra é memória, resistência e futuro.",
// };

// /** Card da presidente — destaque principal */
// function PresidentCard() {
//   return (
//     <div
//       className="relative overflow-hidden rounded-[4px] flex flex-row"
//       style={{ border: "3px solid #121212", minHeight: 420 }}
//     >
//       {/* Badge */}
//       <div
//         className="absolute top-0 right-0 z-10 px-3 py-1"
//         style={{ background: "#f8ba01" }}
//       >
//         <span
//           style={{
//             fontFamily: "'Inter', sans-serif",
//             fontWeight: 800,
//             fontSize: 11,
//             letterSpacing: "1.5px",
//             color: "#121212",
//           }}
//         >
//           {president.role}
//         </span>
//       </div>

//       {/* Photo half */}
//       <div className="relative w-full overflow-hidden max-w-[500px]">
//         <ImageWithFallback
//           src={president.photo}
//           alt={president.name}
//           className="absolute inset-0 w-full h-full object-cover object-top"
//         />
//         {/* Gradient overlay bottom */}
//         <div
//           className="absolute bottom-0 left-0 right-0 h-24"
//           style={{
//             background: "linear-gradient(to top, #1d1b18 0%, transparent 100%)",
//           }}
//         />
//         {/* ZAMBÔ stamp */}
//         <div className="absolute bottom-3 left-4">
//           <span
//             style={{
//               fontFamily: "'Anton', sans-serif",
//               fontSize: 22,
//               color: "#f8ba01",
//               letterSpacing: "2px",
//               textShadow: "1px 1px 0 black",
//             }}
//           >
//             ZAMBÔ
//           </span>
//         </div>
//       </div>

//       {/* Content */}
//       <div
//         className="flex flex-col gap-4 p-6 flex-1"
//         style={{ background: "#1d1b18" }}
//       >
//         <h3
//           style={{
//             fontFamily: "'Anton', sans-serif",
//             fontSize: "clamp(22px, 2.5vw, 32px)",
//             lineHeight: 1.05,
//             color: "#f1e5d1",
//             letterSpacing: "0.5px",
//           }}
//         >
//           {president.name}
//         </h3>
//         <p
//           style={{
//             fontFamily: "'Inter', sans-serif",
//             fontWeight: 500,
//             fontSize: 14,
//             lineHeight: "22px",
//             color: "#c9b89a",
//           }}
//         >
//           {president.bio}
//         </p>
//         {/* Quote */}
//         <blockquote
//           className="pl-4 mt-auto"
//           style={{ borderLeft: "3px solid #f8ba01" }}
//         >
//           <p
//             style={{
//               fontFamily: "'Inter', sans-serif",
//               fontStyle: "italic",
//               fontWeight: 500,
//               fontSize: 14,
//               lineHeight: "22px",
//               color: "#f2e3b9",
//             }}
//           >
//             "{president.quote}"
//           </p>
//         </blockquote>
//       </div>
//     </div>
//   );
// }

// ─── Section ─────────────────────────────────────────────────────────────────

export function ZamboApoiadores() {
  return (
    <section className="w-full">
      {/* ── Top block: header + photo ── */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[80px] pt-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left: headline */}
          <div>
            <div className="flex flex-col gap-6 flex-1">
              {/* Label */}
              <div className="flex items-center gap-3">
                <div
                  className="w-1 h-5 shrink-0"
                  style={{ background: "#f8ba01" }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 14,
                    letterSpacing: "1.5px",
                    color: "#121212",
                  }}
                >
                  NOSSA REDE
                </span>
              </div>

              {/* Heading */}
              <h2
                className="uppercase"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(40px, 5.5vw, 72px)",
                  lineHeight: 1,
                  color: "#121212",
                  letterSpacing: "1px",
                }}
              >
                QUEM CAMINHA
                <br />
                COM A ZAMBÔ,
                <br />
                <span style={{ color: "#dd341f" }}>FORTALECE.</span>
              </h2>
            </div>

            {/* Center: description */}
            <div
              className="flex flex-col gap-5 flex-1"
              style={{ paddingTop: 8 }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "26px",
                  color: "#3a342f",
                }}
              >
                A Zambô existe graças às parcerias que acreditam na cultura como
                ferramenta de transformação e na força dos territórios.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "26px",
                  color: "#3a342f",
                }}
              >
                Juntos, seguimos promovendo arte, educação, identidade e justiça
                social.
              </p>
            </div>
          </div>

          <div className="max-w-[400px]">
            <PresidentCard />
          </div>
        </div>
      </div>

      {/* ── Category cards ── */}
      <div className="w-full px-6 lg:px-[80px] py-14">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: "2px",
              color: "#6b5e55",
            }}
          >
            APOIADORES, ARTISTAS E AMIGOS DA ZAMBÔ
          </span>
          <div className="grid gap-4 items-stretch grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {categoryCards.map((card) => (
              <CategoryCard
                key={card.label}
                photo={card.photo}
                label={card.label}
                accentColor={card.accentColor}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Institutional partners band ── */}
      <div
        className="bg-[#1d1b18] w-full py-6 px-6 lg:px-[80px]"
        style={{
          borderTop: "2px solid #121212",
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <span
            className="block mb-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: "2px",
              color: "#9a8f86",
            }}
          >
            PARCEIROS INSTITUCIONAIS E PATROCINADORES
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {institutionalPartners.map((p) => (
              <div
                key={p.name}
                className="
                  h-28
                  flex
                  items-center
                  justify-center
                  border-b
                  border-[#2a2825]
                "
              >
                <PartnerLogo name={p.name} sub={p.sub} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer CTA strip ── */}
      <div
        className="w-full px-6 lg:px-[80px] py-6"
        style={{ background: "#f8ba01", borderTop: "3px solid #121212" }}
      >
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row items-start lg:items-center gap-6]">
          <div className="flex flex-col md:flex-row items-baseline gap-3 flex-1">
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(18px, 2.2vw, 26px)",
                lineHeight: 1,
                color: "#121212",
                letterSpacing: "0.5px",
                whiteSpace: "nowrap",
              }}
            >
              NOSSA FORÇA É COLETIVA.
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "20px",
                color: "#3a342f",
              }}
            >
              Seja um parceiro da Zambô e ajude a transformar realidades.
            </span>
          </div>
          <a
            href="https://www.instagram.com/zambomnc/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 shrink-0 bg-[#121212] uppercase rounded-[4px] px-6 py-3"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 16,
              lineHeight: "24px",
              color: "#f8ba01",
              boxShadow: "4px 4px 0px rgba(0,0,0,0.25)",
              whiteSpace: "nowrap",
            }}
          >
            FALE CONOSCO
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <path d={svgPaths.p3e0d45f0} fill="#f8ba01" stroke="#f8ba01" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
