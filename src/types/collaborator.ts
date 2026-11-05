export type SocialPlatform =
  | "instagram"
  | "linkedin"
  | "github"
  | "twitter"
  | "youtube"
  | "behance"
  | "website";

export interface CollaboratorSocial {
  /** Plataforma escolhida pelo colaborador */
  platform: SocialPlatform;
  /** Link completo para a rede social */
  url: string;
  /** Identificador legível ou handle, ex: "@nome", "in/nome", "github.com/nome" */
  handle?: string;
  /** Rótulo personalizado caso queira substituir o padrão (ex: "Portfólio", "Canal") */
  customLabel?: string;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio?: string;
  accentColor?: string; // Cor de destaque Pan-Africana (#dd341f | #f8ba01 | #1a7d3c)
  /** Rede social que o colaborador escolheu para ser divulgada */
  social: CollaboratorSocial;
  /** Redes adicionais (opcional) */
  additionalSocials?: CollaboratorSocial[];
}
