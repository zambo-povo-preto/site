import { PresidentCard } from "@/components/ui/PresidentCard";

export function MembersSection() {
  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[80px] py-20 flex flex-col gap-16">
        {/* ── Header + President ── */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: headline */}
          <div className="flex flex-col gap-6 flex-1">
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
                QUEM FAZ ACONTECER
              </span>
            </div>
            <h2
              className="uppercase"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1,
                color: "#121212",
                letterSpacing: "1px",
              }}
            >
              MEMBROS
              <br />
              DA ZAMBÔ
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 18,
                lineHeight: "26px",
                color: "#3a342f",
                maxWidth: 380,
              }}
            >
              Nossa equipe é formada por pessoas comprometidas com a cultura, a
              educação e a transformação social. Juntos, seguimos construindo
              caminhos de resistência, criatividade e ancestralidade.
            </p>
          </div>

          {/* Right: president card */}
          <div className="w-full lg:w-[340px] shrink-0">
            <PresidentCard />
          </div>
        </div>
      </div>
    </section>
  );
}
