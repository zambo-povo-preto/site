"use client";

import {
  adminNavigationConfig,
  isItemActive,
  isSubItemActive,
  shouldItemBeExpanded,
} from "@/config/adminNavigation";
import { ChevronDownNavIcon } from "@/components/admin/icons/NavIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminSidebarProps {
  /** Callback para fechar o sidebar quando em modo drawer mobile */
  onCloseMobile?: () => void;
  /** Indica se está sendo renderizado no drawer mobile */
  isMobileDrawer?: boolean;
}

export function AdminSidebar({
  onCloseMobile,
  isMobileDrawer = false,
}: AdminSidebarProps) {
  const pathname = usePathname();

  // Controla quais seções expansíveis estão abertas
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of adminNavigationConfig) {
      for (const item of section.items) {
        if (item.children && item.children.length > 0) {
          initial[item.id] = shouldItemBeExpanded(item, pathname);
        }
      }
    }
    return initial;
  });

  // Notificação temporária não-intrusiva quando clica em rota planejada (futura/TODO)
  const [plannedNotice, setPlannedNotice] = useState<string | null>(null);

  // Abre automaticamente o grupo pai quando rota filha estiver ativa
  useEffect(() => {
    setExpandedIds((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const section of adminNavigationConfig) {
        for (const item of section.items) {
          if (item.children && item.children.length > 0) {
            const hasActiveChild = item.children.some((child) =>
              isSubItemActive(child, pathname),
            );
            if (hasActiveChild && !next[item.id]) {
              next[item.id] = true;
              changed = true;
            }
          }
        }
      }
      return changed ? next : prev;
    });
  }, [pathname]);

  useEffect(() => {
    if (plannedNotice) {
      const timer = setTimeout(() => setPlannedNotice(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [plannedNotice]);

  const toggleExpand = (itemId: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handlePlannedClick = (e: React.MouseEvent, label: string, route?: string) => {
    e.preventDefault();
    setPlannedNotice(
      `Área em planejamento: O módulo "${label}" (${route || "rota planejada"}) será conectado futuramente.`,
    );
  };

  const handleNavigate = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`flex flex-col bg-[#FFFFFF] select-none ${
        isMobileDrawer
          ? "w-full h-full"
          : "w-64 lg:w-72 shrink-0 border-r border-[#E3DCCF] sticky top-16 h-[calc(100vh-4rem)]"
      }`}
    >
      {/* Se estiver no drawer mobile, exibe cabeçalho do drawer com botão de fechar */}
      {isMobileDrawer && (
        <div className="px-5 py-4 border-b border-[#E3DCCF] flex items-center justify-between shrink-0">
          <span
            className="text-xs font-bold text-[#756F67] uppercase tracking-wider"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Menu de Navegação
          </span>
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1.5 rounded-md text-[#756F67] hover:text-[#222222] hover:bg-[#F7F3EA] transition-colors"
              aria-label="Fechar menu"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Feedback não-intrusivo para rotas planejadas */}
      {plannedNotice && (
        <div className="mx-4 mt-3 p-3 rounded-md bg-[#FFF4CC] border border-[#E3DCCF] text-xs text-[#222222] flex items-start gap-2 shrink-0 animate-fadeIn">
          <span className="shrink-0 text-sm">ℹ️</span>
          <div className="flex-1 leading-snug">
            <p className="font-semibold text-[11px] text-[#756F67] uppercase tracking-wider mb-0.5">
              Estrutura planejada
            </p>
            <p className="text-[12px] text-[#222222]">{plannedNotice}</p>
          </div>
          <button
            type="button"
            onClick={() => setPlannedNotice(null)}
            className="text-[#756F67] hover:text-[#222222] text-xs font-bold shrink-0 ml-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navegação principal */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-7">
        {adminNavigationConfig.map((section) => (
          <div key={section.id} className="flex flex-col gap-1.5">
            {/* Título da Seção */}
            <div className="px-3 pb-1">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "1px",
                  color: "#756F67",
                }}
              >
                {section.title}
              </span>
            </div>

            {/* Itens da Seção */}
            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = Boolean(expandedIds[item.id]);
                const isItemOpenOrActive = isItemActive(item, pathname);
                const Icon = item.icon;

                // 1. Grupo Expansível (Colaboradores)
                if (hasChildren && item.children) {
                  return (
                    <div key={item.id} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left transition-colors relative ${
                          isItemOpenOrActive
                            ? "bg-[#FFF4CC] text-[#222222] font-semibold"
                            : "text-[#554f48] hover:text-[#222222] hover:bg-[#F7F3EA] font-medium"
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5 }}
                      >
                        {isItemOpenOrActive && (
                          <span
                            className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#F5B900] rounded-r"
                            aria-hidden="true"
                          />
                        )}

                        <div className="flex items-center gap-2.5 min-w-0">
                          {Icon && (
                            <span
                              className={`shrink-0 ${
                                isItemOpenOrActive ? "text-[#222222]" : "text-[#756F67]"
                              }`}
                            >
                              <Icon />
                            </span>
                          )}
                          <span className="truncate">{item.label}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge && (
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F7F3EA] border border-[#E3DCCF] text-[#756F67]"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {item.badge}
                            </span>
                          )}
                          <span
                            className={`transition-transform duration-200 text-[#756F67] ${
                              isExpanded ? "rotate-180" : "rotate-0"
                            }`}
                          >
                            <ChevronDownNavIcon />
                          </span>
                        </div>
                      </button>

                      {/* Submenus */}
                      {isExpanded && (
                        <div className="ml-5 pl-3 border-l border-[#E3DCCF] flex flex-col gap-1 mt-1 mb-1">
                          {item.children.map((subItem) => {
                            const isSubActive = isSubItemActive(subItem, pathname);
                            const SubIcon = subItem.icon;

                            if (subItem.isPlanned) {
                              return (
                                <button
                                  key={subItem.id}
                                  type="button"
                                  onClick={(e) =>
                                    handlePlannedClick(e, subItem.label, subItem.route)
                                  }
                                  className={`flex items-center justify-between px-2.5 py-2 rounded-md text-xs transition-colors text-left relative ${
                                    isSubActive
                                      ? "bg-[#FFF4CC] text-[#222222] font-semibold"
                                      : "text-[#756F67] hover:text-[#222222] hover:bg-[#F7F3EA] font-normal"
                                  }`}
                                  style={{ fontFamily: "'Inter', sans-serif" }}
                                  title={subItem.todoComment}
                                >
                                  {isSubActive && (
                                    <span
                                      className="absolute left-0 top-1 bottom-1 w-[2.5px] bg-[#F5B900] rounded-r"
                                      aria-hidden="true"
                                    />
                                  )}
                                  <div className="flex items-center gap-2 min-w-0">
                                    {SubIcon && (
                                      <span
                                        className={
                                          isSubActive ? "text-[#222222]" : "text-[#756F67]"
                                        }
                                      >
                                        <SubIcon />
                                      </span>
                                    )}
                                    <span className="truncate">{subItem.label}</span>
                                  </div>
                                  {subItem.badge && (
                                    <span
                                      className="px-1.5 py-0.5 rounded text-[9.5px] font-medium bg-[#F7F3EA] border border-[#E3DCCF] text-[#756F67] shrink-0"
                                      style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                      {subItem.badge}
                                    </span>
                                  )}
                                </button>
                              );
                            }

                            return (
                              <Link
                                key={subItem.id}
                                href={subItem.route}
                                onClick={handleNavigate}
                                className={`flex items-center justify-between px-2.5 py-2 rounded-md text-xs transition-colors relative ${
                                  isSubActive
                                    ? "bg-[#FFF4CC] text-[#222222] font-semibold"
                                    : "text-[#554f48] hover:text-[#222222] hover:bg-[#F7F3EA] font-normal"
                                }`}
                                style={{ fontFamily: "'Inter', sans-serif" }}
                              >
                                {isSubActive && (
                                  <span
                                    className="absolute left-0 top-1.5 bottom-1.5 w-[2.5px] bg-[#F5B900] rounded-r"
                                    aria-hidden="true"
                                  />
                                )}
                                <div className="flex items-center gap-2 min-w-0">
                                  {SubIcon && (
                                    <span
                                      className={
                                        isSubActive ? "text-[#222222]" : "text-[#756F67]"
                                      }
                                    >
                                      <SubIcon />
                                    </span>
                                  )}
                                  <span className="truncate">{subItem.label}</span>
                                </div>
                                {isSubActive && (
                                  <span
                                    className="w-1.5 h-1.5 rounded-full bg-[#F5B900] shrink-0"
                                    aria-hidden="true"
                                  />
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // 2. Item Simples
                const isActive = item.isActive
                  ? item.isActive(pathname)
                  : item.route === pathname;

                if (item.isPlanned) {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={(e) => handlePlannedClick(e, item.label, item.route)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left transition-colors relative ${
                        isActive
                          ? "bg-[#FFF4CC] text-[#222222] font-semibold"
                          : "text-[#554f48] hover:text-[#222222] hover:bg-[#F7F3EA] font-medium"
                      }`}
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5 }}
                      title={item.todoComment}
                    >
                      {isActive && (
                        <span
                          className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#F5B900] rounded-r"
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex items-center gap-2.5 min-w-0">
                        {Icon && (
                          <span
                            className={isActive ? "text-[#222222]" : "text-[#756F67]"}
                          >
                            <Icon />
                          </span>
                        )}
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F7F3EA] border border-[#E3DCCF] text-[#756F67] shrink-0"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.route || "/admin"}
                    onClick={handleNavigate}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-md transition-colors relative ${
                      isActive
                        ? "bg-[#FFF4CC] text-[#222222] font-semibold"
                        : "text-[#554f48] hover:text-[#222222] hover:bg-[#F7F3EA] font-medium"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5 }}
                  >
                    {isActive && (
                      <span
                        className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#F5B900] rounded-r"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex items-center gap-2.5 min-w-0">
                      {Icon && (
                        <span
                          className={isActive ? "text-[#222222]" : "text-[#756F67]"}
                        >
                          <Icon />
                        </span>
                      )}
                      <span className="truncate">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
