"use client";

import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { LogoMark } from "@/components/icons/LogoMark";
import { ArrowLeft, ChevronDown, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface AdminHeaderProps {
  /** Callback para abrir o menu mobile (drawer lateral) */
  onOpenMobileMenu?: () => void;
  /** Força o botão de voltar ao portal à direita (usado na tela de login / deslogado) */
  showPortalReturn?: boolean;
}

export function AdminHeader({
  onOpenMobileMenu,
  showPortalReturn = false,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAdminAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fecha o dropdown ao mudar de rota
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    router.push("/admin/login");
  };

  const initialLetter = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#FFFFFF] border-b border-[#E3DCCF] select-none shadow-xs">
      {/* Sutil linha de acento Pan-Africano no topo absoluto do Header */}
      <div className="absolute top-0 left-0 right-0 flex h-[3px] z-50">
        <div className="flex-1" style={{ background: "#dd341f" }} />
        <div className="flex-1" style={{ background: "#F5B900" }} />
        <div className="flex-1" style={{ background: "#1a7d3c" }} />
      </div>

      <div className="w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* ── LADO ESQUERDO: Botão Mobile + Logo Zambô ── */}
        <div className="flex items-center gap-3">
          {onOpenMobileMenu && (
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="md:hidden p-1.5 rounded-md text-[#554F48] hover:text-[#222222] hover:bg-[#F7F3EA] border border-[#E3DCCF] transition-colors"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link
            href="/admin"
            className="flex items-center gap-2 group"
            title="Ir para o Início do Painel"
          >
            <LogoMark className="w-auto h-9 transition-opacity group-hover:opacity-85" />
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 20,
                  color: "#222222",
                  letterSpacing: "0.5px",
                  lineHeight: 1.1,
                }}
              >
                ZAMBÔ
              </span>
            </div>
          </Link>
        </div>

        {/* ── LADO DIREITO: Usuário e Dropdown ou Voltar ao Portal ── */}
        {showPortalReturn || !user ? (
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#E3DCCF] bg-[#FFFFFF] hover:bg-[#FAF7F2] hover:border-[#D5CCBC] transition-colors text-xs font-semibold text-[#222222] shadow-2xs group"
            style={{ fontFamily: "'Inter', sans-serif" }}
            title="Voltar ao portal público"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#756F67] group-hover:-translate-x-0.5 transition-transform" />
            <span>Voltar ao portal</span>
          </Link>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#E3DCCF] bg-[#FFFFFF] hover:bg-[#FAF7F2] hover:border-[#D5CCBC] transition-colors text-xs font-semibold text-[#222222] cursor-pointer shadow-2xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              title="Abrir opções de usuário"
            >
              <div className="w-7 h-7 rounded-full bg-[#F7F3EA] border border-[#E3DCCF] flex items-center justify-center font-bold text-xs text-[#222222] shrink-0">
                {initialLetter}
              </div>
              <span className="hidden sm:inline font-medium text-xs text-[#222222] max-w-[150px] truncate">
                {user?.name.split(" ") || "Admin"}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#756F67] transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Popup Dropdown com Nome, E-mail e Botão Sair */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-lg bg-white border border-[#E3DCCF] shadow-lg p-3 z-50 animate-fadeIn"
                role="menu"
              >
                <div className="px-2 py-1.5 flex flex-col min-w-0">
                  <span
                    className="text-xs font-bold text-[#222222] truncate"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {user?.name || "Admin"}
                  </span>
                  <span
                    className="text-[11px] text-[#756F67] truncate mt-0.5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {user?.email || "admin@zambo.org"}
                  </span>
                </div>

                <div className="my-2 border-t border-[#E3DCCF]" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-[#C02D1D] hover:bg-[#FDF2F0] rounded-md transition-colors cursor-pointer text-left"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  role="menuitem"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#C02D1D]" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
