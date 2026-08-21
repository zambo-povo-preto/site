import { pillars } from "@/data/pillars";

export function PillarsSection() {
  return (
    <section id="pilares" className="py-28 bg-[#1d1b18]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Cabeçalho */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2
            className="uppercase"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 1,
              color: "#f1e5d1",
              letterSpacing: "1px",
            }}
          >
            NOSSOS PILARES
          </h2>

          <p
            className="mt-6 text-xl font-medium leading-normal max-w-[600px] text-center mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 18,
              lineHeight: "26px",
              color: "#9a8f86",
            }}
          >
            Os princípios que orientam a atuação da Zambô na promoção da
            cultura, educação e equidade racial.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="overflow-hidden rounded-[4px] bg-[#f1e5d1]"
            >
              {/* Borda colorida */}
              <div
                className="h-2"
                style={{
                  backgroundColor: pillar.color,
                }}
              />

              {/* Título */}
              <div className="border-b-[3px] border-[#121212] px-6 py-5 bg-[#121212]">
                <h3
                  className="font-bebas text-5xl uppercase leading-none"
                  style={{
                    color: "#f1e5d1",
                    fontFamily: "'Anton', sans-serif",
                    fontSize: "clamp(18px, 2.5vw, 28px)",
                    lineHeight: 1.1,
                    letterSpacing: "0.5px",
                    textAlign: "center",
                  }}
                >
                  {pillar.title}
                </h3>
              </div>

              {/* Conteúdo */}
              <div className="space-y-5 p-6">
                {pillar.content ? (
                  <p className="leading-7 text-neutral-700 font-medium">
                    {pillar.content}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {pillar.values?.map((value) => (
                      <li
                        key={value}
                        className="flex gap-3 leading-6 text-neutral-700 font-medium"
                      >
                        <span
                          className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor: pillar.color,
                          }}
                        />

                        {value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
