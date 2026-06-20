export function ZamboStats() {
  const stats = [
    { value: "30+", label: "Anos de História", color: "#e22a1d" },
    { value: "15k+", label: "Vidas Impactadas", color: "#fdc700" },
    { value: "50+", label: "Projetos Realizados", color: "#008236" },
  ];

  return (
    <section
      className="w-full py-20 px-6 lg:px-[80px]"
      style={{ background: "#1d1b18" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-8">
              {/* Colored bar */}
              <div
                className="w-4 shrink-0"
                style={{ height: 96, backgroundColor: stat.color }}
              />
              {/* Text */}
              <div
                className="flex flex-col items-center gap-4 text-center"
                style={{ fontFamily: "'Anton', sans-serif", color: "#f1e5d1" }}
              >
                <span style={{ fontSize: "clamp(72px, 9vw, 120px)", lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span className="uppercase" style={{ fontSize: 24, lineHeight: "32px", letterSpacing: "1px" }}>
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
