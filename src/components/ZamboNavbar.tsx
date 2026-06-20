"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import svgPaths from "../imports/Group36/svg-hkzbekptio";

function LogoMark() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-[34px] h-[70px]">
      <div className="col-1 row-1 relative" style={{ width: 33, height: 40 }}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.1834 40.2948">
          <path d={svgPaths.p398a3200} fill="black" />
          <path d={svgPaths.p20158d00} fill="black" />
          <path d={svgPaths.p358a2a80} fill="black" />
          <path d={svgPaths.p3fb76280} fill="black" />
        </svg>
      </div>
      <div className="col-1 row-1 relative" style={{ width: 16, height: 57, marginLeft: 9, marginTop: 14 }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.7799 57.1872">
          <path d={svgPaths.p377bdc00} fill="black" />
          <path d={svgPaths.p3949a0f0} fill="#308442" stroke="black" />
          <path d={svgPaths.p12c10a70} fill="#318443" stroke="black" />
          <path d={svgPaths.p36996180} fill="black" stroke="black" strokeWidth="1.88976" />
          <path d={svgPaths.p2c2b7800} fill="black" stroke="black" strokeWidth="1.88976" />
          <path d={svgPaths.p22913280} fill="#E62127" stroke="black" />
          <path d={svgPaths.p37414d80} fill="#FDCF31" stroke="black" />
        </svg>
      </div>
    </div>
  );
}

function DonateArrow({ color = "black" }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d={svgPaths.p3e0d45f0} fill={color} stroke={color} />
    </svg>
  );
}

interface ZamboNavbarProps {
  /** When true, navbar floats over content with transparent bg */
  overlaid?: boolean;
}

export function ZamboNavbar({ overlaid = false }: ZamboNavbarProps) {
  const pathname = usePathname();

  const navLinks = [
    { label: "INÍCIO", to: "/" },
    { label: "HISTÓRIA", to: "/historia" },
    { label: "TRANSPARÊNCIA", to: "/transparencia" },
  ];

  return (
    <nav
      className={`${overlaid ? "absolute top-0 left-0 right-0 z-20" : "relative z-20 border-b border-black/10"} py-5 px-6 lg:px-[80px]`}
      style={overlaid ? undefined : { background: "#f5eedd" }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span
            className="text-black uppercase pt-2"
            style={{ fontFamily: "'Anton', sans-serif", fontSize: 40, lineHeight: "normal" }}
          >
            ZAMBÔ
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-10 mr-14">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.to}
              className="text-black uppercase hover:opacity-70 transition-opacity"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                lineHeight: "28px",
                borderBottom:
                  pathname === item.to ? "2px solid black" : "2px solid transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <button
          className="hidden md:flex items-center gap-3 bg-[#f8ba01] uppercase rounded-[4px] px-5 py-4 h-14"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 18,
            lineHeight: "24px",
            color: "#121212",
            boxShadow: "6px 6px 0px black",
          }}
        >
          DOE AGORA
          <DonateArrow />
        </button>
      </div>
    </nav>
  );
}
