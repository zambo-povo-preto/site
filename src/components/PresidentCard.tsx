import { ImageWithFallback } from "./figma/ImageWithFallback";

const president = {
  name: "TERESINHA DE OLIVEIRA MARCIANO COSTA",
  role: "PRESIDENTE DA ONG",
  photo: "/teresinha-marciano.jpg",
  bio: "Fundadora da Zambô e referência na luta pela valorização da cultura afro-brasileira em Caraguatatuba. Educadora popular, produtora cultural e guardiã de saberes que inspiram gerações.",
  quote: "A cultura negra é memória, resistência e futuro.",
};

export function PresidentCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[4px] flex flex-col"
      style={{ border: "3px solid #121212", minHeight: 420 }}
    >
      {/* Badge */}
      <div
        className="absolute top-0 right-0 z-10 px-3 py-1"
        style={{ background: "#f8ba01" }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: "1.5px",
            color: "#121212",
          }}
        >
          {president.role}
        </span>
      </div>

      {/* Photo half */}
      <div className="relative w-full overflow-hidden" style={{ height: 260 }}>
        <ImageWithFallback
          src={president.photo}
          alt={president.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Gradient overlay bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: "linear-gradient(to top, #1d1b18 0%, transparent 100%)",
          }}
        />
        {/* ZAMBÔ stamp */}
        <div className="absolute bottom-3 left-4">
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 22,
              color: "#f8ba01",
              letterSpacing: "2px",
              textShadow: "1px 1px 0 black",
            }}
          >
            ZAMBÔ
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex flex-col gap-4 p-6 flex-1"
        style={{ background: "#1d1b18" }}
      >
        <h3
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(22px, 2.5vw, 32px)",
            lineHeight: 1.05,
            color: "#f1e5d1",
            letterSpacing: "0.5px",
          }}
        >
          {president.name}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "22px",
            color: "#c9b89a",
          }}
        >
          {president.bio}
        </p>
        {/* Quote */}
        <blockquote
          className="pl-4 mt-auto"
          style={{ borderLeft: "3px solid #f8ba01" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 14,
              lineHeight: "22px",
              color: "#f2e3b9",
            }}
          >
            "{president.quote}"
          </p>
        </blockquote>
      </div>
    </div>
  );
}
