"use client";

import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { LogoMark } from "@/components/icons/LogoMark";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavbarProps {
  /** When true, navbar floats over content with transparent bg */
  overlaid?: boolean;
}

export function Navbar({ overlaid = false }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const navLinks = [
    { label: "INÍCIO", to: "/" },
    { label: "HISTÓRIA", to: "/historia" },
    { label: "TRANSPARÊNCIA", to: "/transparencia" },
    { label: "CONTATO", to: "/contato" },
  ];

  return (
    <header
      className={`
        ${overlaid ? "fixed inset-x-0 top-0 z-50" : "sticky top-0 z-50"}
        transition-all duration-300 ease-in-out
        ${
          overlaid && !scrolled && !mobileMenuOpen
            ? "bg-transparent border-b border-transparent"
            : "bg-[#f0e3cd] shadow-md border-b-[3px] border-[#1d1b18]"
        }
      `}
    >
      <nav className="px-4 sm:px-6 lg:px-[80px] py-2 sm:py-2.5 lg:py-3 transition-all duration-300 ease-in-out">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 sm:gap-2.5 z-50 transition-all duration-300 ease-in-out"
          >
            <LogoMark className="w-auto h-8 sm:h-9 lg:h-10 transition-all duration-300 ease-in-out" />
            <span
              className="text-black uppercase pt-1 transition-all duration-300 ease-in-out"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(22px, 3vw, 28px)",
                lineHeight: "normal",
              }}
            >
              ZAMBÔ
            </span>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-3 lg:gap-5 mr-2 lg:mr-8 transition-all duration-300 ease-in-out">
            {navLinks.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.label}
                  href={item.to}
                  className={`group flex items-center gap-2 uppercase px-3.5 py-1.5 rounded-full transition-all duration-300 ease-in-out ${
                    active
                      ? "text-[#121212] bg-[#f8ba01]/25 font-extrabold"
                      : "text-[#121212] hover:bg-[#f8ba01]/15"
                  }`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 13.5,
                    lineHeight: "22px",
                  }}
                >
                  <span>{item.label}</span>
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out ${
                      active
                        ? "bg-[#f8ba01] opacity-100 scale-100"
                        : "bg-[#f8ba01] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <a
            href="https://www.instagram.com/zambomnc/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 h-9 lg:h-10 text-[14px] lg:text-[15px] transition-all duration-300 ease-in-out bg-[#f8ba01] uppercase rounded-[4px] hover:translate-x-0.5 hover:translate-y-0.5"
            style={{
              fontFamily: "'Anton', sans-serif",
              color: "#121212",
              boxShadow: "2.5px 2.5px 0px black",
              border: "2px solid black",
            }}
          >
            FALE CONOSCO
            <ArrowIcon size={18} color="#121212" />
          </a>

          {/* Mobile Hamburger / Close Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-[4px] z-50 cursor-pointer transition-all duration-300 ease-in-out"
            style={{
              background: "#f8ba01",
              border: "2px solid #121212",
              boxShadow: "2px 2px 0px #121212",
            }}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#121212"
                strokeWidth="2.5"
                strokeLinecap="round"
                role="img"
                aria-label="Fechar menu"
                className="transition-all duration-300 ease-in-out"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#121212"
                strokeWidth="2.5"
                strokeLinecap="round"
                role="img"
                aria-label="Abrir menu"
                className="transition-all duration-300 ease-in-out"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Pan-African bar */}
      <div
        className={`flex h-[4px] w-full transition-opacity duration-300 ${
          overlaid && !scrolled && !mobileMenuOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex-1" style={{ background: "#dd341f" }} />
        <div className="flex-1" style={{ background: "#f8ba01" }} />
        <div className="flex-1" style={{ background: "#1a7d3c" }} />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 h-[calc(100dvh-100%)] bg-[#f0e3cd] px-6 py-8 flex flex-col justify-between overflow-y-auto z-40 transition-all duration-300"
          style={{ borderTop: "2px solid #121212" }}
        >
          <div className="flex flex-col gap-6">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: "1.5px",
                color: "#9a8f86",
              }}
            >
              NAVEGAÇÃO
            </span>

            <div className="flex flex-col gap-4">
              {navLinks.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.label}
                    href={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 border-b border-black/10"
                  >
                    <span
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: 28,
                        color: active ? "#dd341f" : "#121212",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.label}
                    </span>
                    {active && (
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: "#dd341f" }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-8">
            <a
              href="https://www.instagram.com/zambomnc/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#f8ba01] uppercase rounded-[4px] px-5 py-4 w-full text-center"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 18,
                color: "#121212",
                boxShadow: "4px 4px 0px black",
                border: "2px solid black",
              }}
            >
              FALE CONOSCO
              <ArrowIcon size={24} color="#121212" />
            </a>

            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 text-[12px] font-extrabold uppercase tracking-wider text-[#6b5e55]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Área Administrativa
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
