import type {
  NavigationItem,
  NavigationSubItem,
  SidebarConfig,
} from "@/types/navigation";
import {
  DocumentNavIcon,
  FolderNavIcon,
  GalleryNavIcon,
  HomeNavIcon,
  InvoiceNavIcon,
  UserListNavIcon,
  UserPlusNavIcon,
  UsersNavIcon,
} from "@/components/admin/icons/NavIcons";

/**
 * ============================================================================
 * CONFIGURAÇÃO CENTRALIZADA DE NAVEGAÇÃO DO PAINEL ADMIN (ZAMBÔ)
 * ============================================================================
 */

export const adminNavigationConfig: SidebarConfig = [
  {
    id: "visao-geral",
    title: "VISÃO GERAL",
    items: [
      {
        id: "inicio",
        label: "Início",
        route: "/admin",
        icon: HomeNavIcon,
        isPlanned: false,
        isActive: (pathname: string) => pathname === "/admin",
      },
    ],
  },
  // {
  //   id: "conteudo",
  //   title: "CONTEÚDO",
  //   items: [
  //     {
  //       id: "galeria",
  //       label: "Galeria",
  //       route: "/admin/galeria",
  //       icon: GalleryNavIcon,
  //       isPlanned: true,
  //       badge: "Em breve",
  //       todoComment:
  //         "TODO: Futuro desenvolvedor, implemente a página de Galeria em src/app/admin/galeria/page.tsx e altere isPlanned para false.",
  //       isActive: (pathname: string) => pathname.startsWith("/admin/galeria"),
  //     },
  //     {
  //       id: "colaboradores",
  //       label: "Colaboradores",
  //       icon: UsersNavIcon,
  //       isPlanned: true,
  //       defaultExpanded: false,
  //       todoComment:
  //         "TODO: Futuro desenvolvedor, conecte as páginas de listagem e cadastro de colaboradores.",
  //       isActive: (pathname: string) =>
  //         pathname.startsWith("/admin/colaboradores"),
  //       children: [
  //         {
  //           id: "colaboradores-todos",
  //           label: "Todos os colaboradores",
  //           route: "/admin/colaboradores",
  //           icon: UserListNavIcon,
  //           isPlanned: true,
  //           badge: "Em breve",
  //           todoComment:
  //             "TODO: Implementar listagem em src/app/admin/colaboradores/page.tsx",
  //           isActive: (pathname: string) => pathname === "/admin/colaboradores",
  //         },
  //         {
  //           id: "colaboradores-novo",
  //           label: "Novo colaborador",
  //           route: "/admin/colaboradores/novo",
  //           icon: UserPlusNavIcon,
  //           isPlanned: true,
  //           badge: "Em breve",
  //           todoComment:
  //             "TODO: Implementar cadastro em src/app/admin/colaboradores/novo/page.tsx",
  //           isActive: (pathname: string) =>
  //             pathname === "/admin/colaboradores/novo",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    id: "transparencia-section",
    title: "TRANSPARÊNCIA",
    items: [
      {
        id: "transparencia-relatorios",
        label: "Relatórios",
        route: "/admin/relatorios",
        icon: DocumentNavIcon,
        isPlanned: false,
        isActive: (pathname: string) =>
          pathname === "/admin/relatorios" ||
          pathname.startsWith("/admin/relatorios/"),
      },
      {
        id: "transparencia-comprovantes",
        label: "Comprovantes",
        route: "/admin/comprovantes",
        icon: InvoiceNavIcon,
        isPlanned: false,
        isActive: (pathname: string) =>
          pathname === "/admin/comprovantes" ||
          pathname.startsWith("/admin/comprovantes/"),
      },
      {
        id: "transparencia-documentos",
        label: "Documentos",
        route: "/admin/documentos",
        icon: FolderNavIcon,
        isPlanned: false,
        isActive: (pathname: string) =>
          pathname === "/admin/documentos" ||
          pathname.startsWith("/admin/documentos/"),
      },
    ],
  },
];

/**
 * Verifica se um subitem está ativo com base no pathname atual
 */
export function isSubItemActive(
  subItem: NavigationSubItem,
  pathname: string,
): boolean {
  if (subItem.isActive) {
    return subItem.isActive(pathname);
  }
  return pathname === subItem.route;
}

/**
 * Verifica se um item principal ou qualquer um de seus filhos está ativo
 */
export function isItemActive(item: NavigationItem, pathname: string): boolean {
  if (item.children && item.children.length > 0) {
    return item.children.some((child) => isSubItemActive(child, pathname));
  }
  if (item.isActive) {
    return item.isActive(pathname);
  }
  return item.route ? pathname === item.route : false;
}

/**
 * Verifica se um item expansível deve começar aberto com base no pathname atual
 */
export function shouldItemBeExpanded(
  item: NavigationItem,
  pathname: string,
): boolean {
  if (!item.children || item.children.length === 0) return false;
  const hasActiveChild = item.children.some((child) =>
    isSubItemActive(child, pathname),
  );
  if (hasActiveChild) return true;
  return Boolean(item.defaultExpanded);
}
