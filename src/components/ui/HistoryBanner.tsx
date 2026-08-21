import { ArrowIcon } from "@/components/icons/ArrowIcon";

export const HistoryBanner = () => {
  return (
    <div
      className="w-full px-6 lg:px-[80px] py-8 flex flex-col lg:flex-row items-center justify-between gap-6"
      style={{ background: "#1d1b18" }}
    >
      <div className="w-full flex flex-col lg:flex-row items-center justify-between mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-2 lg:max-w-[580px]">
          <p
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(18px, 2.5vw, 28px)",
              lineHeight: 1.1,
              color: "#f1e5d1",
              letterSpacing: "0.5px",
              maxWidth: 450,
            }}
          >
            DÉCADAS DE LUTA, CULTURA E CIDADANIA NO LITORAL NORTE.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              lineHeight: "22px",
              color: "#9a8f86",
            }}
          >
            {" "}
            Cada pessoa que caminha com a Zambô é parte dessa jornada de
            transformação. Juntos, seguimos fazendo história.
          </p>
        </div>
        <a
          href="/historia"
          className="flex items-center gap-3 shrink-0 bg-[#f8ba01] uppercase rounded-[4px] px-6 py-4"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 16,
            lineHeight: "24px",
            color: "#121212",
            boxShadow: "6px 6px 0px rgba(255,255,255,0.1)",
            whiteSpace: "nowrap",
          }}
        >
          SAIBA MAIS
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
};
