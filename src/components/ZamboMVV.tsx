export function ZamboMVV() {
  const stats = [
    {
      value: "MISSÃO",
      label:
        "Promover a autoestima, o empoderamento e a valorização do povo preto por meio de ações culturais, sociais e educacionais, reconhecendo e difundindo as contribuições dos povos africanos e afrodescendentes na formação do Brasil e da América Latina. ",
      color: "#e22a1d",
    },
    {
      value: "VISÃO",
      label:
        "Ser uma entidade de referência na promoção da equidade racial, atuando como agente de transformação social por meio da cultura e da educação, com compromisso permanente no enfrentamento ao racismo, à discriminação e às desigualdades que afetam populações negra e as que estão em situação de vulnerabilidade. ",
      color: "#fdc700",
    },
    {
      value: "VALORES",
      label:
        "Orgulho e valorização do legado ancestral africano. Compromisso com a justiça social e a equidade racial. Promoção da educação antirracista e libertadora. Defesa dos direitos humanos e da dignidade das populações negras. Combate à intolerância religiosa, ao preconceito e ao racismo estrutural.",
      color: "#008236",
    },
  ];

  return (
    <section
      className="w-full py-20 px-6 lg:px-[80px]"
      style={{ background: "#1d1b18" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-8">
              {/* Colored bar */}
              <div
                className="w-4 shrink-0"
                style={{ height: 96, backgroundColor: stat.color }}
              />
              {/* Text */}
              <div
                className="flex flex-col items-center gap-4 text-center"
                style={{ color: "#f1e5d1" }}
              >
                <span
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: "clamp(24px, 3vw, 40px)",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span className="font-extralight">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
