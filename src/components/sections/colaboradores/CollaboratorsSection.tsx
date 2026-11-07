export function CollaboratorsSection() {
  return (
<<<<<<< Updated upstream
    <main className="flex-grow pt-32 pb-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-black">Nossos colaboradores</h1>
      <p className="mt-4 text-gray-600">Colaboradores em breve...</p>
=======
    <main className="w-full bg-[#f0e3cd] text-[#121212] min-h-[calc(100vh-140px)]">
      {/* ── 1. Hero Header Institucional ── */}
      <section className="relative w-full pt-16 pb-12 sm:pt-20 sm:pb-16 px-6 lg:px-[80px] border-b-2 border-[#121212]/15 bg-[#1D1B18]">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-6 ">
          {/* Badge & Subtítulo */}
          <div className="flex items-center gap-3 ">
            <div
              className="w-1.5 h-6 shrink-0"
              style={{ background: "#f8ba01" }}
            />
            <span
              className="uppercase tracking-[2px] text-xs sm:text-sm font-extrabold text-[#ffffff]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              QUEM FAZ ACONTECER
            </span>
          </div>

          {/* Título Principal */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 ">
            <div>
              <h1
                className="uppercase tracking-tight"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(38px, 6vw, 76px)",
                  lineHeight: 0.95,
                  color: "#f8ba01",
                  letterSpacing: "1px",
                }}
              >
                NOSSOS
                <br />
                <span style={{ color: "#f8ba01" }}>COLABORADORES</span>
              </h1>
            </div>

            <p
              className="text-[#D4C9B6] max-w-[560px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(15px, 1.3vw, 17px)",
                lineHeight: "26px",
              }}
            >
              A força da Zambô nasce da união de pessoas dedicadas à causa da
              cultura afro-brasileira, da educação e da tecnologia social.
              Conheça os profissionais e voluntários que fortalecem nossos
              projetos.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pesquisa ── */}
      <section className="sticky top-[60px] sm:top-[68px] z-30 w-full py-4 px-4 sm:px-6 lg:px-[80px] bg-[#ebdcc2] border-b-2 border-[#121212]/20 shadow-sm backdrop-blur-md">
        <div className="max-w-[1240px] mx-auto flex items-center justify-end">
          {/* Campo de busca no canto direito */}
          <div className="relative w-full sm:w-[320px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome ou função..."
              className="w-full bg-[#faf4e8] border-2 border-[#121212] rounded-[4px] px-3.5 py-1.5 pr-8 text-xs sm:text-sm font-medium text-[#121212] placeholder:text-[#8c8077] focus:outline-none focus:ring-2 focus:ring-[#f8ba01] shadow-[2px_2px_0px_#121212]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6b5e55] hover:text-[#121212]"
                title="Limpar busca"
              >
                ✕
              </button>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c8077] pointer-events-none"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. Grid de Colaboradores ── */}
      <section className="w-full px-6 lg:px-[80px] py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-8">
          {/* Contador de resultados */}
          <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-widest text-[#6b5e55]">
            <span>
              Mostrando {filteredCollaborators.length} de {collaborators.length}{" "}
              colaboradores
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[#dd341f] underline hover:opacity-80"
              >
                Limpar busca
              </button>
            )}
          </div>

          {/* Grid com fotos redondas e redes sociais */}
          {filteredCollaborators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredCollaborators.map((collab) => (
                <CollaboratorCard key={collab.id} collaborator={collab} />
              ))}
            </div>
          ) : (
            <div
              className="w-full text-center py-16 px-6 bg-[#faf4e8] rounded-[4px] border-2 border-[#121212] flex flex-col items-center gap-4"
              style={{ boxShadow: "4px 4px 0px #121212" }}
            >
              <span
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 28,
                  color: "#121212",
                }}
              >
                NENHUM COLABORADOR ENCONTRADO
              </span>
              <p
                className="text-[#6b5e55] max-w-[420px]"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 14 }}
              >
                Não encontramos nenhum colaborador correspondente à sua busca.
                Tente buscar com outros termos ou limpe a pesquisa.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-2 bg-[#f8ba01] text-[#121212] px-5 py-2 rounded-[3px] border-2 border-[#121212] uppercase font-['Anton'] text-sm tracking-wider shadow-[2px_2px_0px_#121212]"
              >
                Ver todos os colaboradores
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Banner CTA: "Quer colaborar com a Zambô?" ── */}
      <section
        className="w-full px-6 lg:px-[80px] py-14 border-t-[3px] border-[#1d1b18]"
        style={{ background: "#1d1b18" }}
      >
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2.5 max-w-[620px] text-center md:text-left">
            <span
              className="text-xs font-extrabold uppercase tracking-widest text-[#f8ba01]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              FAÇA PARTE DA CAMINHADA
            </span>
            <h2
              className="uppercase tracking-tight text-[#f1e5d1]"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(26px, 3.5vw, 40px)",
                lineHeight: 1.1,
              }}
            >
              QUER COLABORAR COM A ZAMBÔ?
            </h2>
            <p
              className="text-[#9a8f86]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                lineHeight: "24px",
              }}
            >
              Seja na comunicação, na produção cultural, na tecnologia ou em
              ações comunitárias: suas habilidades fortalecem a ancestralidade e
              o futuro da nossa gente.
            </p>
          </div>

          <Link
            href="/contato"
            className="flex items-center gap-3 shrink-0 bg-[#f8ba01] uppercase rounded-[4px] px-6 py-4 hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 16,
              lineHeight: "24px",
              color: "#121212",
              boxShadow: "4px 4px 0px rgba(255,255,255,0.15)",
              border: "2px solid #000",
            }}
          >
            FALE CONOSCO
            <ArrowIcon />
          </Link>
        </div>
      </section>
>>>>>>> Stashed changes
    </main>
  );
}