import { ImageWithFallback } from "./figma/ImageWithFallback";
import svgPaths from "../imports/Group36/svg-hkzbekptio";

// ─── Data ─────────────────────────────────────────────────────────────────────

const heroPhoto =
  "https://images.unsplash.com/photo-1768244016517-2ec30e558a78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

const categoryCards = [
  {
    label: "ARTISTAS INDEPENDENTES",
    photo: "https://images.unsplash.com/photo-1588172322752-e13df881e89e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    accentColor: "#dd341f",
  },
  {
    label: "COLETIVOS CULTURAIS",
    photo: "https://images.unsplash.com/photo-1523689119443-df96632084a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    accentColor: "#f8ba01",
  },
  {
    label: "EDUCADORES POPULARES",
    photo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    accentColor: "#1a7d3c",
  },
  {
    label: "VOLUNTÁRIOS",
    photo: "https://images.unsplash.com/photo-1778236313375-c80768b13495?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    accentColor: "#dd341f",
  },
  {
    label: "COMUNIDADE LOCAL",
    photo: "https://images.unsplash.com/photo-1505147634308-9b83c4cb46b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    accentColor: "#f8ba01",
  },
];

const institutionalPartners = [
  { name: "Lei de Incentivo\nà Cultura", sub: "Governo Federal" },
  { name: "PROAC", sub: "Programa de Ação Cultural\nEstado de São Paulo" },
  { name: "Cidade de\nCaraguatatuba", sub: "" },
  { name: "FECEC", sub: "Fundo Estadual\nde Cultura" },
  { name: "Ministério da\nCultura", sub: "" },
  { name: "Governo Federal\nBRASIL", sub: "União e Reconstrução" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <path d={svgPaths.p3e0d45f0} fill="#121212" stroke="#121212" />
    </svg>
  );
}

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
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
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
            background: "linear-gradient(to top, rgba(18,18,18,0.92) 0%, transparent 100%)",
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
      style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
    >
      <span
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: "clamp(11px, 1.2vw, 15px)",
          lineHeight: 1.2,
          color: "#121212",
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
            color: "#6b5e55",
            whiteSpace: "pre-line",
          }}
        >
          {sub}
        </span>
      )}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function ZamboApoiadores() {
  return (
    <section className="w-full" style={{ background: "#f5eedd" }}>

      {/* ── Top block: header + photo ── */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[80px] pt-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Left: headline */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 shrink-0" style={{ background: "#f8ba01" }} />
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
              QUEM CAMINHA<br />COM A ZAMBÔ,<br />
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
              A Zambô existe graças às parcerias que acreditam na cultura como ferramenta de transformação e na força dos territórios.
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
              Juntos, seguimos promovendo arte, educação, identidade e justiça social.
            </p>
          </div>

          {/* Right: hero photo with tag */}
          <div
            className="relative shrink-0 overflow-hidden"
            style={{
              width: "clamp(200px, 28%, 300px)",
              aspectRatio: "4/5",
              border: "3px solid #121212",
              boxShadow: "6px 6px 0px #121212",
              borderRadius: 3,
            }}
          >
            <ImageWithFallback
              src={heroPhoto}
              alt="Comunidade Zambô"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Tag overlay */}
            <div className="absolute bottom-0 right-0 flex flex-col items-end">
              {[
                { text: "CULTURA", bg: "#dd341f" },
                { text: "COMUNIDADE", bg: "#1a7d3c" },
                { text: "TRANSFORMAÇÃO", bg: "#f8ba01" },
              ].map(({ text, bg }) => (
                <div
                  key={text}
                  className="px-3 py-1"
                  style={{ background: bg }}
                >
                  <span
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 11,
                      letterSpacing: "1px",
                      color: bg === "#f8ba01" ? "#121212" : "#f1e5d1",
                      lineHeight: 1.4,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Institutional partners band ── */}
      <div
        className="w-full py-6 px-6 lg:px-[80px]"
        style={{ background: "#fff", borderTop: "2px solid #121212", borderBottom: "2px solid #121212" }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: "2px",
              color: "#6b5e55",
            }}
          >
            PARCEIROS INSTITUCIONAIS E PATROCINADORES
          </span>
          <div
            className="flex flex-wrap items-stretch divide-x divide-black/10"
            style={{ borderTop: "1px solid rgba(0,0,0,0.1)", borderBottom: "1px solid rgba(0,0,0,0.1)" }}
          >
            {institutionalPartners.map((p) => (
              <PartnerLogo key={p.name} name={p.name} sub={p.sub} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Category cards ── */}
      <div
        className="w-full px-6 lg:px-[80px] py-14"
        style={{ background: "#f5eedd" }}
      >
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
          <div className="flex gap-4 items-stretch">
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

      {/* ── Footer CTA strip ── */}
      <div
        className="w-full px-6 lg:px-[80px] py-6 flex flex-col md:flex-row items-center gap-6"
        style={{ background: "#f8ba01", borderTop: "3px solid #121212" }}
      >
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
        <button
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
        </button>
      </div>
    </section>
  );
}
