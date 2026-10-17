"use client";

import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import { LogoMark } from "@/components/icons/LogoMark";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fecha o menu mobile ao mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Trava scroll da tela quando o drawer mobile estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Redireciona para /admin/login se não estiver autenticado e não estiver na tela de login
  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [loading, user, pathname, router]);

  // Na página de login, renderiza apenas o formulário sem a casca do painel
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Estado de carregamento ou não autenticado (aguardando redirecionamento)
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F3EA]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center w-40 h-40">
            {/* Efeito de loading circular em volta da LogoMark */}
            <svg
              className="absolute inset-0 w-full h-full animate-spin text-[#F5B900]"
              viewBox="0 0 80 80"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#E3DCCF"
                strokeWidth="2.5"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="160"
                strokeDashoffset="60"
                strokeLinecap="round"
              />
            </svg>

            {/* LogoMark centralizada com pulso suave */}
            <LogoMark className="w-auto h-[72px] animate-pulse relative z-10" />
          </div>

          <p
            className="font-medium text-sm text-[#756F67] tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Carregando painel administrativo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EA] text-[#222222]">
      {/* 1. Header Global Fixo no Topo (ocupa 100% da largura, acima da sidebar e do conteúdo) */}
      <AdminHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* 2. Área abaixo do Header: Sidebar à esquerda + Conteúdo à direita */}
      <div className="flex-1 flex flex-row min-w-0">
        {/* Desktop Sidebar (começa abaixo do header) */}
        <div className="hidden md:block shrink-0">
          <AdminSidebar />
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop suave */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fadeIn"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Content */}
            <div
              className="relative w-[280px] max-w-[85vw] h-full bg-[#FFFFFF] z-10 shadow-lg flex flex-col animate-slideInLeft"
              role="dialog"
              aria-modal="true"
              aria-label="Menu administrativo"
            >
              <AdminSidebar
                isMobileDrawer
                onCloseMobile={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* 3. Conteúdo Principal */}
        <main className="flex-1 min-w-0 bg-[#F7F3EA]">{children}</main>
      </div>
    </div>
  );
}
