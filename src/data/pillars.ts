export interface Pillar {
  title: string;
  color: string;
  content?: string;
  values?: string[];
}

export const pillars: Pillar[] = [
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
