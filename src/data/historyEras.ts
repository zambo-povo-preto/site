export interface Era {
  id: string;
  year: string;
  title: string;
  accentColor: string;
  dotColor: string;
  paragraphs: string[];
  quote: string;
  quoteAuthor?: string;
  image: string;
  imageAlt: string;
  imageRight: boolean;
}

export const eras: Era[] = [
  {
    id: "1990",
    year: "1990",
    title: "FUNDAÇÃO",
    accentColor: "#dd341f",
    dotColor: "#dd341f",
    paragraphs: [
      "Fundação do Movimento Negro de Caraguatatuba: idealizado por lideranças negras e apoiadores da causa antirracista em defesa dos direitos da população negra no município.Surgiu com o objetivo de representar a comunidade negra, promover políticas públicas de combate ao racismo, à discriminação e às desigualdades sociais, além de valorizar e preservar a cultura afro-brasileira, sempre participando dos conselhos municipais e estatual.",
    ],
    quote:
      "A Zambô nasceu de uma necessidade: a de ver nossa cultura valorizada, nossa história contada e nossa identidade celebrada.",
    image: "/img/teste5.jpg",
    imageAlt: "Fundação da Zambô — 1990",
    imageRight: true,
  },
  {
    id: "1995",
    year: "1991–2000",
    title: "AÇÕES SOCIOCULTURAIS",
    accentColor: "#f1b412",
    dotColor: "#f1b412",
    paragraphs: [
      "Realização de atividades culturais, palestras e debates, além da articulação com movimentos sociais e organizações do Litoral Norte voltadas à consciência negra, cidadania e combate ao racismo. Entre suas principais realizações está a tradicional “Kizomba da Consciência Negra”, iniciada em 1996, evento que se tornou referência cultural no município, promovendo apresentações artísticas, reflexões antirracistas e valorização das ancestralidades negras",
    ],
    quote:
      "O festival nasceu para mostrar que a cultura negra não é margem — é centro. É de onde vem a força criativa deste país.",
    image: "/img/terezinha.jpg",
    imageAlt: "Programas educacionais — 1995",
    imageRight: false,
  },
  {
    id: "2001",
    year: "2001",
    title: "REGISTRO OFICIAL",
    accentColor: "#1a7d3c",
    dotColor: "#1a7d3c",
    paragraphs: [
      "Registrada como associação civil de direito privado, com autonomia administrativa, sob CNPJ nº 04.978.370/0001-59. Oficializada como associação em 2001, a entidade desenvolveu ao longo de sua trajetória diversas ações culturais, educativas e sociais, como oficinas, palestras, seminários, eventos culturais, projetos de geração de renda e atividades de fortalecimento da identidade negra, sempre em parceria com órgãos públicos e privados. ",
    ],
    quote:
      "A cada nova comunidade alcançada, a Zambô reafirma que a cultura é ferramenta de transformação social.",
    image: "/img/teste4.jpg",
    imageAlt: "Festival Afro-Brasileiro — 2000",
    imageRight: true,
  },
  {
    id: "2002",
    year: "2002",
    title: "RECONHECIMENTO MUNICIPAL",
    accentColor: "#d2301f",
    dotColor: "#d2301f",
    paragraphs: [
      "Declaração de utilidade pública municipal decretada sob a Lei nº 975 em 22 de Novembro de 2002.",
      "Nesse período, a entidade expandiu suas ações de formação e conscientização em escolas e comunidades, promoveu atividades culturais ligadas à memória afro-brasileira valorizando as tradições de matriz africana e fortaleceu sua atuação em conselhos, fóruns e conferências voltados à igualdade racial.",
    ],
    quote:
      "Com apoio crescente da comunidade, a Zambô se tornou um espaço de acolhimento, educação e resistência cultural para gerações de jovens.",
    image: "/img/teste11.jpg",
    imageAlt: "Expansão e impacto — 2010",
    imageRight: false,
  },
  {
    id: "2010",
    year: "2010-2019",
    title: "DESENVOLVIMENTO CULTURAL",
    accentColor: "#f1b412",
    dotColor: "#f1b412",
    paragraphs: [
      "Foco no desenvolvimento de projetos culturais, oficinas e rodas de conversa ligadas ao Dia da Consciência Negra. Além disso, ampliou o diálogo com os setores público e privado para implementar políticas de inclusão e diversidade, atuando firmemente na preservação da memória da população negra de Caraguatatuba e região.",
    ],
    quote:
      "Seguimos construindo com o povo, para o povo. Nossa história é feita de cada pessoa que acredita numa cultura negra viva e transformadora.",
    image: "/img/teste8.jpg",
    imageAlt: "Referência nacional — 2024",
    imageRight: true,
  },
  {
    id: "2026",
    year: "2021-2023",
    title: "FORTALECIMENTO COMUNITÁRIO",
    accentColor: "#1a7d3c",
    dotColor: "#1a7d3c",
    paragraphs: [
      "Participação em editais e programas de fortalecimento da cultura de base comunitária. Paralelamente, realizou atividades formativas e educativas para jovens, mulheres e lideranças, além de expandir sua presença institucional em redes culturais e movimentos de igualdade racial.",
    ],
    quote:
      "Seguimos construindo com o povo, para o povo. Vemos nossa força se renovar nos olhos de cada jovem que se descobre potência.",
    image: "/img/teste12.jpg",
    imageAlt: "Expansão regional — 2026",
    imageRight: false,
  },
  {
    id: "2024",
    year: "2024",
    title: "PONTO DE CULTURA",
    accentColor: "#d2301f",
    dotColor: "#d2301f",
    paragraphs: [
      "Certificação como Ponto de Cultura. Fortalecimento das ações voltadas à Política Nacional Cultura Viva. A partir disso, a entidade estruturou e ampliou suas atividades, desenvolvendo novas iniciativas de valorização da ancestralidade, memória e identidade afro-brasileira.",
    ],
    quote:
      "Nossa força agora abraça todo o Litoral Norte, tecendo uma rede de ancestralidade e transformação social.",
    image: "/img/teste7.jpg",
    imageAlt: "Zambô Digital — 2024",
    imageRight: true,
  },
  {
    id: "2025",
    year: "2025",
    title: "35 ANOS DE INSTITUIÇÃO",
    accentColor: "#f1b412",
    dotColor: "#f1b412",
    paragraphs: [
      "Este período marca a consolidação de uma trajetória de 35 anos de atuação contínua da instituição. Paralelamente, a entidade participou do Edital de Premiação de Pontos e Pontões de Cultura – Cultura Viva e teve sua relevância histórica, cultural e social amplamente reconhecida em Caraguatatuba, no Litoral Norte e no Estado de São Paulo.",
    ],
    quote:
      "O som dos nossos tambores quebrou fronteiras; agora levamos nossa história para o mundo.",
    image: "/img/teste17.jpg",
    imageAlt: "Impacto geracional — 2030",
    imageRight: false,
  },
];

export const timelineYears = eras.map((e) => e.year);
