import type { BoardMember, FeaturedMember, President } from "@/types/member";

export const president: President = {
  name: "TERESINHA DE OLIVEIRA MARCIANO COSTA",
  role: "PRESIDENTE DA ONG",
  photo: "/teresinha-marciano.jpg",
  bio: "Fundadora da Zambô e referência na luta pela valorização da cultura afro-brasileira em Caraguatatuba. Educadora popular, produtora cultural e guardiã de saberes que inspiram gerações.",
  quote: "A cultura negra é memória, resistência e futuro.",
};

export const boardMembers: BoardMember[] = [
  {
    name: "JOÃO PAULO SILVA",
    role: "VICE-PRESIDENTE",
    photo:
      "https://images.unsplash.com/photo-1613768924699-e71d952b8cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Articulador cultural e produtor; atua na gestão de projetos e fortalecimento de parcerias.",
  },
  {
    name: "ANA LÚCIA MORAES",
    role: "SECRETÁRIA",
    photo:
      "https://images.unsplash.com/photo-1632765866070-3fadf25d3d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Educadora e pesquisadora; responsável pela organização e documentação das ações.",
  },
  {
    name: "CARLOS EDUARDO",
    role: "TESOUREIRO",
    photo:
      "https://images.unsplash.com/photo-1773235893573-9253a4b4ea36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Gestor financeiro e administrativo; garante a transparência e sustentabilidade da organização.",
  },
  {
    name: "PATRÍCIA OLIVEIRA",
    role: "COORD. GERAL",
    photo:
      "https://images.unsplash.com/photo-1615453261246-4b32e335a4a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Atua na fiscalização e no acompanhamento das atividades e recursos da ONG.",
  },
];

export const featuredMembers: FeaturedMember[] = [
  {
    name: "MESTRE NALDO",
    role: "EDUCADOR E CAPOEIRISTA",
    accentColor: "#dd341f",
    photo:
      "https://images.unsplash.com/photo-1773650783301-d808ca0279a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Mestre de capoeira e referência na formação de crianças e jovens pela cultura.",
  },
  {
    name: "DJ CÁSSIA PRETA",
    role: "PRODUTORA CULTURAL",
    accentColor: "#f1b412",
    photo:
      "https://images.unsplash.com/photo-1770396528756-d463cc7f0a8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "DJ, produtora e curadora de eventos que conectam arte, cultura e comunidade.",
  },
  {
    name: "LUAN SANTOS",
    role: "ARTISTA VISUAL",
    accentColor: "#1a7d3c",
    photo:
      "https://images.unsplash.com/photo-1548527121-52781ea7929f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Artista plástico e ilustrador; suas obras traduzem identidade, resistência e pertencimento.",
  },
];
