export function StatsSection() {
  const stats = [
    { value: "30+", label: "Anos de História", color: "#e22a1d", rotate: -2 },
    { value: "3k+", label: "Vidas Impactadas", color: "#fdc700", rotate: 1 },
    {
      value: "20+",
      label: "Projetos Realizados",
      color: "#008236",
      rotate: -3,
    },
  ];

  return (
    <section
      className="relative w-full pt-20 pb-12 px-6 lg:px-[80px]"
      style={{ background: "#1d1b18" }}
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative flex flex-col items-center bg-[#292724] px-6 py-12 md:py-16 rounded-[16px] shadow-2xl mt-6"
            >
              <div
                className="absolute -top-3 left-1/2 w-24 h-7 shadow-[0px_2px_4px_rgba(0,0,0,0.5)] opacity-95"
                style={{
                  backgroundColor: stat.color,
                  transform: `translateX(-50%) rotate(${stat.rotate}deg)`,
                  borderRadius: "2px",
                }}
              />

              <div
                className="flex flex-col items-center gap-2 text-center"
                style={{ fontFamily: "'Anton', sans-serif", color: "#f1e5d1" }}
              >
                <span
                  style={{ fontSize: "clamp(56px, 7vw, 72px)", lineHeight: 1 }}
                >
                  {stat.value}
                </span>
                <span
                  className="uppercase"
                  style={{
                    fontSize: 16,
                    lineHeight: "24px",
                    letterSpacing: "1px",
                    color: "#c8bfae",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
