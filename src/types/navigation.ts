import type { ComponentType, SVGProps } from "react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Definition of a submenu navigation item in the Admin Panel
 */
export interface NavigationSubItem {
  id: string;
  label: string;
  /** Destination route */
  route: string;
  /** Optional icon */
  icon?: IconComponent;
  /** Optional custom active matcher function */
  isActive?: (pathname: string) => boolean;
  /** Optional permission key (for future RBAC implementation) */
  permission?: string;
  /** True if the target page is not yet implemented (future structure/TODO) */
  isPlanned?: boolean;
  /** Optional badge text, e.g. "Em breve" */
  badge?: string;
  /** Guidance/description for future developers */
  todoComment?: string;
}

/**
 * Definition of a top-level navigation item within a section
 */
export interface NavigationItem {
  id: string;
  label: string;
  /** Direct route (used if the item has no submenus) */
  route?: string;
  /** Icon component */
  icon?: IconComponent;
  /** Submenu items if this item is expandable */
  children?: NavigationSubItem[];
  /** Optional custom active matcher function */
  isActive?: (pathname: string) => boolean;
  /** Optional permission key (for future RBAC implementation) */
  permission?: string;
  /** True if the target page is not yet implemented (future structure/TODO) */
  isPlanned?: boolean;
  /** Optional badge text, e.g. "Em breve" */
  badge?: string;
  /** Guidance/description for future developers */
  todoComment?: string;
  /** Default expand behavior if no child is active */
  defaultExpanded?: boolean;
}

/**
 * Definition of a navigation section/group (e.g., CONTEÚDO, TRANSPARÊNCIA)
 */
export interface NavigationSection {
  id: string;
  /** Section title displayed in the sidebar */
  title: string;
  /** Items within this section */
  items: NavigationItem[];
  /** Optional permission key (for future RBAC) */
  permission?: string;
}

/**
 * Full sidebar navigation configuration
 */
export type SidebarConfig = NavigationSection[];
