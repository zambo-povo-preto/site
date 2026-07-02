import { Target, Eye, Heart } from "lucide-react";

function TargetIcon() {
  return <Target className="h-10 w-10 text-white" />;
}

function EyeIcon() {
  return <Eye className="h-10 w-10 text-white" />;
}

function HeartIcon() {
  return <Heart className="h-10 w-10 text-white" />;
}

export function ZamboPillars() {
  const pillars = [
    {
      title: "Missão",
      color: "#e22a1d",
      content:
        "Promover a autoestima, o empoderamento e a valorização do povo preto por meio de ações culturais, sociais e educacionais, reconhecendo e difundindo as contribuições dos povos africanos e afrodescendentes na formação do Brasil e da América Latina.",
    },
    {
      title: "Visão",
      color: "#fdc700",
      content:
        "Ser uma entidade de referência na promoção da equidade racial, atuando como agente de transformação social por meio da cultura e da educação, com compromisso permanente no enfrentamento ao racismo, à discriminação e às desigualdades que afetam populações negras e aquelas em situação de vulnerabilidade.",
    },
    {
      title: "Valores",
      color: "#008236",
      values: [
        "Orgulho e valorização do legado ancestral africano.",
        "Compromisso com a justiça social e a equidade racial.",
        "Promoção da educação antirracista e libertadora.",
        "Defesa dos direitos humanos e da dignidade das populações negras.",
        "Combate ao preconceito, à intolerância religiosa e ao racismo estrutural.",
      ],
    },
  ];

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
                    // color: pillar.color,
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
                {"content" in pillar ? (
                  <p className="leading-7 text-neutral-700 font-medium">
                    {pillar.content}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {pillar.values.map((value) => (
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
