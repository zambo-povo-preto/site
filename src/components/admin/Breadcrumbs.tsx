"use client";

import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs font-medium text-[#6b5e55] flex-wrap"
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={`${item.label}-${idx}`} className="flex items-center gap-1.5 min-w-0">
            {idx > 0 && <span className="text-[#9a8f86] font-normal">/</span>}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:underline hover:text-[#121212] transition-colors truncate max-w-[180px] sm:max-w-[280px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="font-semibold text-[#121212] truncate max-w-[220px] sm:max-w-[320px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
