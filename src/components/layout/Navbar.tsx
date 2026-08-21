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

  const isFixed = overlaid || mobileMenuOpen || scrolled;

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
      <nav
        className={`px-4 sm:px-6 lg:px-[80px] transition-all duration-300 ease-in-out ${
          scrolled ? "py-2 sm:py-2.5 lg:py-3" : "py-4 sm:py-5 lg:py-6"
        }`}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 sm:gap-2.5 z-50 transition-all duration-300 ease-in-out"
          >
            <LogoMark
              className={`w-auto transition-all duration-300 ease-in-out ${
                scrolled ? "h-8 sm:h-9 lg:h-10" : "h-11 sm:h-14 lg:h-[56px]"
              }`}
            />
            <span
              className="text-black uppercase pt-1 transition-all duration-300 ease-in-out"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: scrolled
                  ? "clamp(22px, 3vw, 28px)"
                  : "clamp(28px, 4vw, 40px)",
                lineHeight: "normal",
              }}
            >
              ZAMBÔ
            </span>
          </Link>

          {/* Desktop Nav links */}
          <div
            className={`hidden md:flex items-center transition-all duration-300 ease-in-out ${
              scrolled
                ? "gap-6 lg:gap-8 mr-2 lg:mr-8"
                : "gap-8 lg:gap-10 mr-4 lg:mr-14"
            }`}
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                className="text-black uppercase hover:opacity-70 transition-all duration-300 ease-in-out"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: scrolled ? 13.5 : 15,
                  lineHeight: scrolled ? "22px" : "28px",
                  borderBottom:
                    pathname === item.to
                      ? "2px solid black"
                      : "2px solid transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="https://www.instagram.com/zambomnc/"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:flex items-center transition-all duration-300 ease-in-out bg-[#f8ba01] uppercase rounded-[4px] hover:translate-x-0.5 hover:translate-y-0.5 ${
              scrolled
                ? "gap-2 px-3.5 py-1.5 h-9 lg:h-10 text-[14px] lg:text-[15px]"
                : "gap-3 px-5 py-3 h-12 lg:h-14 text-[16px] lg:text-[17px]"
            }`}
            style={{
              fontFamily: "'Anton', sans-serif",
              color: "#121212",
              boxShadow: scrolled ? "2.5px 2.5px 0px black" : "4px 4px 0px black",
              border: "2px solid black",
            }}
          >
            FALE CONOSCO
            <ArrowIcon size={scrolled ? 18 : 24} color="#121212" />
          </a>

          {/* Mobile Hamburger / Close Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className={`md:hidden flex items-center justify-center rounded-[4px] z-50 cursor-pointer transition-all duration-300 ease-in-out ${
              scrolled ? "w-9 h-9" : "w-11 h-11"
            }`}
            style={{
              background: "#f8ba01",
              border: "2px solid #121212",
              boxShadow: scrolled ? "2px 2px 0px #121212" : "3px 3px 0px #121212",
            }}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <svg
                width={scrolled ? "18" : "22"}
                height={scrolled ? "18" : "22"}
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
                width={scrolled ? "18" : "22"}
                height={scrolled ? "18" : "22"}
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
