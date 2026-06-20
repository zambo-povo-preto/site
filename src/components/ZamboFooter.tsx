"use client";

import Link from "next/link";
import svgPaths from "../imports/Group36/svg-hkzbekptio";

function LogoMark() {
  return (
    <div className="inline-grid relative shrink-0" style={{ width: 22, height: 44 }}>
      <div className="col-1 row-1 relative" style={{ width: 22, height: 26 }}>
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 33.1834 40.2948">
          <path d={svgPaths.p398a3200} fill="#f1e5d1" />
          <path d={svgPaths.p20158d00} fill="#f1e5d1" />
          <path d={svgPaths.p358a2a80} fill="#f1e5d1" />
          <path d={svgPaths.p3fb76280} fill="#f1e5d1" />
        </svg>
      </div>
      <div className="col-1 row-1 relative" style={{ width: 10, height: 37, marginLeft: 6, marginTop: 9 }}>
        <svg className="block size-full" fill="none" viewBox="0 0 16.7799 57.1872">
          <path d={svgPaths.p377bdc00} fill="#f1e5d1" />
          <path d={svgPaths.p3949a0f0} fill="#308442" stroke="#f1e5d1" strokeWidth="0.5" />
          <path d={svgPaths.p12c10a70} fill="#318443" stroke="#f1e5d1" strokeWidth="0.5" />
          <path d={svgPaths.p36996180} fill="#f1e5d1" stroke="#f1e5d1" strokeWidth="1.5" />
          <path d={svgPaths.p2c2b7800} fill="#f1e5d1" stroke="#f1e5d1" strokeWidth="1.5" />
          <path d={svgPaths.p22913280} fill="#E62127" stroke="#f1e5d1" strokeWidth="0.5" />
          <path d={svgPaths.p37414d80} fill="#FDCF31" stroke="#f1e5d1" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}

export function ZamboFooter() {
  const links = [
    { label: "Início", to: "/" },
    { label: "História", to: "/historia" },
    { label: "Transparência", to: "/transparencia" },
  ];

  return (
    <footer style={{ background: "#121212", borderTop: "3px solid #1d1b18" }}>
      {/* Pan-African bar */}
      <div className="flex h-[4px] w-full">
        <div className="flex-1" style={{ background: "#dd341f" }} />
        <div className="flex-1" style={{ background: "#f8ba01" }} />
        <div className="flex-1" style={{ background: "#1a7d3c" }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-[80px] py-12 flex flex-col gap-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row gap-10 justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <LogoMark />
              <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 28, color: "#f1e5d1", letterSpacing: "1px" }}>
                ZAMBÔ
              </span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, lineHeight: "22px", color: "#6b5e55", maxWidth: 260 }}>
              Ponto de Cultura do Movimento Negro<br />Caraguatatuba — SP
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "1.5px", color: "#3a342f" }}>
              NAVEGAÇÃO
            </span>
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.to}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: "#9a8f86", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f1e5d1")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#9a8f86")}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "1.5px", color: "#3a342f" }}>
              CONTATO
            </span>
            {["contato@zambo.org.br", "Instagram", "Facebook"].map((item) => (
              <span
                key={item}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: "#9a8f86" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid #1d1b18" }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: "#3a342f" }}>
            © {new Date().getFullYear()} Zambô — Ponto de Cultura. Todos os direitos reservados.
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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
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
