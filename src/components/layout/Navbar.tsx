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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "INÍCIO", to: "/" },
    { label: "HISTÓRIA", to: "/historia" },
    { label: "TRANSPARÊNCIA", to: "/transparencia" },
    { label: "CONTATO", to: "/contato" },
  ];

  return (
    <nav
      className={`
    ${overlaid ? "fixed inset-x-0 top-0 z-50" : "relative z-20"}

    px-6 py-5 lg:px-[80px]
    transition-all duration-300 ease-out

    ${
      overlaid
        ? scrolled
          ? "bg-[#f0e3cd] shadow-lg"
          : "bg-transparent"
        : "bg-[#f0e3cd]"
    }
  `}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        {/* Logo */}
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
                  pathname === item.to
                    ? "2px solid black"
                    : "2px solid transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://www.instagram.com/zambomnc/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-3 bg-[#f8ba01] uppercase rounded-[4px] px-5 py-4 h-14"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 18,
            lineHeight: "24px",
            color: "#121212",
            boxShadow: "6px 6px 0px black",
          }}
        >
          FALE CONOSCO
          <ArrowIcon size={28} color="#121212" />
        </a>
      </div>
    </nav>
  );
}
