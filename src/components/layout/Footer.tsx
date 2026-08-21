"use client";

import { LogoMark } from "@/components/icons/LogoMark";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const links = [
    { label: "INÍCIO", to: "/" },
    { label: "HISTÓRIA", to: "/historia" },
    { label: "TRANSPARÊNCIA", to: "/transparencia" },
    { label: "CONTATO", to: "/contato" },
  ];

  return (
    <footer style={{ borderTop: "3px solid #1d1b18" }}>
      {/* Pan-African bar */}
      <div className="flex h-[4px] w-full">
        <div className="flex-1" style={{ background: "#dd341f" }} />
        <div className="flex-1" style={{ background: "#f8ba01" }} />
        <div className="flex-1" style={{ background: "#1a7d3c" }} />
      </div>

      <div className="w-full max-w-[1380px] mx-auto px-6 lg:px-[80px] py-12 flex flex-col gap-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row gap-10 justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark />
              <span
                className="text-black uppercase pt-2"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 40,
                  lineHeight: "normal",
                }}
              >
                ZAMBÔ
              </span>
            </Link>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "22px",
                color: "#6b5e55",
                maxWidth: 300,
              }}
            >
              Ponto de Cultura Zambô do Movimento Negro de Caraguatatuba — SP
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: "1.5px",
                color: "#8c8077",
                marginBottom: 8,
              }}
            >
              NAVEGAÇÃO
            </span>
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.label}
                  href={l.to}
                  className={`uppercase transition-all duration-300 ease-in-out ${
                    active
                      ? "text-[#c87d00]"
                      : "text-[#3a342f] hover:text-[#c87d00]"
                  }`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 13.5,
                    letterSpacing: "0.5px",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: "1.5px",
                color: "#8c8077",
                marginBottom: 8,
              }}
            >
              CONTATO
            </span>
            <a
              href="https://www.instagram.com/zambomnc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3a342f] hover:text-[#c87d00] transition-all duration-300 ease-in-out uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 13.5,
                letterSpacing: "0.5px",
              }}
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid #1d1b18" }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 12,
              color: "#6b5e55",
            }}
          >
            © {new Date().getFullYear()} Zambô — Ponto de Cultura. Todos os
            direitos reservados.
          </span>

          {/* Área restrita — discreto */}
          <Link
            href="/admin/login"
            className="flex items-center gap-2 px-3 py-1.5 rounded-[3px] transition-all"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: "1px",
              color: "#3a342f",
              border: "1px solid #1d1b18",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#f8ba01";
              (e.currentTarget as HTMLElement).style.borderColor = "#f8ba01";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#3a342f";
              (e.currentTarget as HTMLElement).style.borderColor = "#1d1b18";
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              role="img"
              aria-label="Cadeado de área restrita"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            ÁREA RESTRITA
          </Link>
        </div>
      </div>
    </footer>
  );
}
