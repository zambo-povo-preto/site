export function ZamboHistoryIntro() {
  return (
    <section className="bg-[#0C0C0C] relative w-full pt-24 overflow-hidden px-6 lg:px-[120px]">
      <div className="w-full max-w-[1100px] mx-auto">
        <div className="relative w-full flex flex-col lg:flex-row items-start">
          {/* Left — text content */}
          <div className="flex flex-col w-full max-w-[450px]">
            {/* Headline */}
            <div className="relative">
              <h2
                className="relative uppercase"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(36px, 4vw, 60px)",
                  lineHeight: "72px",
                  color: "#f2e3b9",
                  letterSpacing: "1px",
                }}
              >
                <span className="block">NOSSA HISTÓRIA É FEITA COM VOCÊ.</span>
              </h2>
            </div>

            {/* Body */}
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: 18,
                lineHeight: "24px",
                color: "#f2e3b9",
                maxWidth: 400,
                marginTop: 24,
              }}
            >
              Cada pessoa que caminha com a Zambô é parte dessa jornada de
              transformação. Juntos, seguimos fazendo história.
            </p>
          </div>

          {/* Right — image cards + timeline */}
          <div className="flex-1 flex flex-col gap-8 lg:gap-12">
            <img alt="" src="/zambo-members.png" width={864} height={450} />
          </div>
        </div>
      </div>
    </section>
  );
}
