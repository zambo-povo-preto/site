import svgPaths from "../imports/Group36/svg-hkzbekptio";
import { ZamboLogoMarkHero } from "./logo/ZamboLogoMarkHero";
import { ZamboNavbar } from "./ZamboNavbar";
const imgFrame59 =
  "/zambo/Group36/5a73c4eafeeba52ba5c573c39ca63ccfe3ce3ae4.png";
const imgGrafitebase1 =
  "/zambo/Group36/8d468e10e6e80b89a19522ecf60100f51507b119.png";
const imgRectangle2 =
  "/zambo/Group36/8f80c506423b36bcc34c34081265fbd8aacf6e50.png";
const imgRectangle3 =
  "/zambo/Group36/544d9e7abfc47b0a36e95247d4a5befa83888d16.png";

function DonateArrow() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d={svgPaths.p3e0d45f0} fill="black" stroke="black" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d={svgPaths.p17ccfd00} fill="black" stroke="black" />
    </svg>
  );
}

export function ZamboHero() {
  return (
    <section
      className="background relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Navbar overlaid on hero */}
      <ZamboNavbar overlaid />

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-[80px] pt-[140px] pb-[80px] flex items-center min-h-screen">
        {/* Left side */}
        <div className="flex-1 flex flex-col gap-12 lg:min-w-[600px]">
          {/* Tagline */}
          <div className="flex gap-3 items-start">
            <div
              className="w-1 h-full bg-black shrink-0 mt-0.5"
              style={{ minHeight: 40 }}
            />
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 18,
                lineHeight: "20px",
                color: "black",
              }}
            >
              PONTO DE CULTURA ZAMBÔ DO MOVIMENTO NEGRO <br />
              <span style={{ fontWeight: 500, fontSize: 14 }}>
                CARAGUATATUBA-SP
              </span>
            </p>
          </div>

          {/* Headline */}
          <h1
            className="uppercase"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(48px, 6vw, 90px)",
              lineHeight: "1",
              color: "black",
              letterSpacing: "0.9px",
            }}
          >
            <span className="block">PROMOVENDO A</span>
            <span className="relative block w-fit">
              {/* Brush highlight behind text */}
              <span
                className="absolute -left-6 -right-5 top-[0.14em] bottom-[-0.08em] overflow-hidden"
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
                CULTURA NEGRA.
              </span>
            </span>
          </h1>

          {/* Body text and CTAs */}
          <div className="flex flex-col gap-12">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 20,
                lineHeight: "normal",
                color: "#212121",
                maxWidth: 474,
                letterSpacing: "0.2px",
              }}
            >
              A Zambô é uma organização que fortalece laços comunitários por
              meio de encontros, oficinas e movimentos que celebram e preservam
              a cultura afro-brasileira.
            </p>

            <div className="flex flex-wrap gap-7 items-center">
              <button
                type="button"
                className="flex items-center gap-3 bg-[#f8ba01] uppercase rounded-[4px] px-5 py-4"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 18,
                  lineHeight: "24px",
                  color: "#121212",
                  boxShadow: "6px 6px 0px black",
                }}
              >
                CONHEÇA NOSSO TRABALHO
                <ArrowRight />
              </button>
              <button
                type="button"
                className="flex items-center gap-3 bg-[#ebdbc3] uppercase rounded-[4px] px-5 py-4 h-14 border-3 border-black relative"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 18,
                  lineHeight: "24px",
                  color: "#121212",
                  boxShadow: "6px 6px 0px black",
                }}
              >
                DOE AGORA
                <DonateArrow />
              </button>
            </div>
          </div>
        </div>

        {/* Right side — figure */}
        <div className="hidden lg:flex items-end justify-center shrink-0">
          <img src="/logo-mark-hero.png" alt="" width={635} height={738} />
        </div>
      </div>

      {/* Ticker bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[58px] bg-[#1d1b18] overflow-hidden z-10">
        <div className="ticker-track flex items-center h-full whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-0 shrink-0"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "1.8px",
                color: "#f2e3b9",
              }}
            >
              {[
                "CULTURA",
                "RESISTÊNCIA",
                "UNIÃO",
                "COMUNIDADE",
                "ARTE",
                "HISTÓRIA",
                "ANCESTRALIDADE",
              ].map((word, j) => (
                <span key={j} className="flex items-center">
                  <span className="mx-2">{word}</span>
                  <span style={{ color: "#f8ba01" }}>•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
