import { ImageWithFallback } from "./figma/ImageWithFallback";
import svgPaths from "../imports/Group36/svg-hkzbekptio";

// ─── Data ─────────────────────────────────────────────────────────────────────

const president = {
  name: "MARIA APARECIDA SANTOS",
  role: "PRESIDENTE DA ONG",
  photo: "https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  bio: "Fundadora da Zambô e referência na luta pela valorização da cultura afro-brasileira em Caraguatatuba. Educadora popular, produtora cultural e guardiã de saberes que inspiram gerações.",
  quote: "A cultura negra é memória, resistência e futuro.",
};

const boardMembers = [
  {
    name: "JOÃO PAULO SILVA",
    role: "VICE-PRESIDENTE",
    photo: "https://images.unsplash.com/photo-1613768924699-e71d952b8cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Articulador cultural e produtor; atua na gestão de projetos e fortalecimento de parcerias.",
  },
  {
    name: "ANA LÚCIA MORAES",
    role: "SECRETÁRIA",
    photo: "https://images.unsplash.com/photo-1632765866070-3fadf25d3d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Educadora e pesquisadora; responsável pela organização e documentação das ações.",
  },
  {
    name: "CARLOS EDUARDO",
    role: "TESOUREIRO",
    photo: "https://images.unsplash.com/photo-1773235893573-9253a4b4ea36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Gestor financeiro e administrativo; garante a transparência e sustentabilidade da organização.",
  },
  {
    name: "PATRÍCIA OLIVEIRA",
    role: "COORD. GERAL",
    photo: "https://images.unsplash.com/photo-1615453261246-4b32e335a4a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Atua na fiscalização e no acompanhamento das atividades e recursos da ONG.",
  },
];

const featuredMembers = [
  {
    name: "MESTRE NALDO",
    role: "EDUCADOR E CAPOEIRISTA",
    accentColor: "#dd341f",
    photo: "https://images.unsplash.com/photo-1773650783301-d808ca0279a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Mestre de capoeira e referência na formação de crianças e jovens pela cultura.",
  },
  {
    name: "DJ CÁSSIA PRETA",
    role: "PRODUTORA CULTURAL",
    accentColor: "#f1b412",
    photo: "https://images.unsplash.com/photo-1770396528756-d463cc7f0a8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "DJ, produtora e curadora de eventos que conectam arte, cultura e comunidade.",
  },
  {
    name: "LUAN SANTOS",
    role: "ARTISTA VISUAL",
    accentColor: "#1a7d3c",
    photo: "https://images.unsplash.com/photo-1548527121-52781ea7929f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Artista plástico e ilustrador; suas obras traduzem identidade, resistência e pertencimento.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d={svgPaths.p3e0d45f0} fill="#121212" stroke="#121212" />
    </svg>
  );
}

/** Card da presidente — destaque principal */
function PresidentCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[4px] flex flex-col"
      style={{ border: "3px solid #121212", minHeight: 420 }}
    >
      {/* Badge */}
      <div
        className="absolute top-0 right-0 z-10 px-3 py-1"
        style={{ background: "#f8ba01" }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: "1.5px",
            color: "#121212",
          }}
        >
          {president.role}
        </span>
      </div>

      {/* Photo half */}
      <div className="relative w-full overflow-hidden" style={{ height: 260 }}>
        <ImageWithFallback
          src={president.photo}
          alt={president.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Gradient overlay bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(to top, #1d1b18 0%, transparent 100%)" }}
        />
        {/* ZAMBÔ stamp */}
        <div className="absolute bottom-3 left-4">
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 22,
              color: "#f8ba01",
              letterSpacing: "2px",
              textShadow: "1px 1px 0 black",
            }}
          >
            ZAMBÔ
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex flex-col gap-4 p-6 flex-1"
        style={{ background: "#1d1b18" }}
      >
        <h3
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(22px, 2.5vw, 32px)",
            lineHeight: 1.05,
            color: "#f1e5d1",
            letterSpacing: "0.5px",
          }}
        >
          {president.name}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "22px",
            color: "#c9b89a",
          }}
        >
          {president.bio}
        </p>
        {/* Quote */}
        <blockquote
          className="pl-4 mt-auto"
          style={{ borderLeft: "3px solid #f8ba01" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 14,
              lineHeight: "22px",
              color: "#f2e3b9",
            }}
          >
            "{president.quote}"
          </p>
        </blockquote>
      </div>
    </div>
  );
}

/** Card de membro da presidência com foto e faixa ZAMBÔ */
function BoardMemberCard({ member }: { member: typeof boardMembers[0] }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-[3px]"
      style={{ border: "2px solid #121212", background: "#fff" }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        <ImageWithFallback
          src={member.photo}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* ZAMBÔ strip */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-1"
          style={{ background: "rgba(18,18,18,0.82)" }}
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 16,
              color: "#f8ba01",
              letterSpacing: "3px",
            }}
          >
            ZAMBÔ
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 p-4">
        <span
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 16,
            color: "#121212",
            lineHeight: 1.1,
            letterSpacing: "0.3px",
          }}
        >
          {member.name}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 11,
            color: "#dd341f",
            letterSpacing: "1px",
          }}
        >
          {member.role}
        </span>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 13,
            lineHeight: "20px",
            color: "#3a342f",
          }}
        >
          {member.bio}
        </p>
      </div>
    </div>
  );
}

/** Card de pessoa de destaque — estilo mais compacto com acento colorido */
function FeaturedMemberCard({ member }: { member: typeof featuredMembers[0] }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-[3px]"
      style={{ border: "2px solid #121212", background: "#fff" }}
    >
      {/* Colored top band */}
      <div className="h-[5px] w-full" style={{ background: member.accentColor }} />

      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: 160 }}>
        <ImageWithFallback
          src={member.photo}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 p-4">
        <span
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 16,
            color: "#121212",
            lineHeight: 1.1,
          }}
        >
          {member.name}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 11,
            color: member.accentColor,
            letterSpacing: "1px",
          }}
        >
          {member.role}
        </span>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 13,
            lineHeight: "20px",
            color: "#3a342f",
          }}
        >
          {member.bio}
        </p>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function ZamboMembros() {
  return (
    <section className="w-full" style={{ background: "#f5eedd" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[80px] py-20 flex flex-col gap-16">

        {/* ── Header + President ── */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left: headline */}
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 shrink-0" style={{ background: "#f8ba01" }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 14,
                  letterSpacing: "1.5px",
                  color: "#121212",
                }}
              >
                QUEM FAZ ACONTECER
              </span>
            </div>
            <h2
              className="uppercase"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1,
                color: "#121212",
                letterSpacing: "1px",
              }}
            >
              MEMBROS<br />DA ZAMBÔ
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: "26px",
                color: "#3a342f",
                maxWidth: 380,
              }}
            >
              Nossa equipe é formada por pessoas comprometidas com a cultura, a educação e a transformação social. Juntos, seguimos construindo caminhos de resistência, criatividade e ancestralidade.
            </p>
          </div>

          {/* Right: president card */}
          <div className="w-full lg:w-[340px] shrink-0">
            <PresidentCard />
          </div>
        </div>

        {/* ── Board members ── */}
        <div className="flex flex-col gap-6">
          <h3
            className="uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "2px",
              color: "#3a342f",
              borderBottom: "1px solid rgba(0,0,0,0.12)",
              paddingBottom: 12,
            }}
          >
            MEMBROS DA PRESIDÊNCIA
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {boardMembers.map((m) => (
              <BoardMemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>

        {/* ── Destaque members ── */}
        <div className="flex flex-col gap-6">
          <h3
            className="uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "2px",
              color: "#3a342f",
              borderBottom: "1px solid rgba(0,0,0,0.12)",
              paddingBottom: 12,
            }}
          >
            PESSOAS DE DESTAQUE NA ZAMBÔ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredMembers.map((m) => (
              <FeaturedMemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer strip ── */}
      <div
        className="w-full px-6 lg:px-[80px] py-8 flex flex-col lg:flex-row items-center justify-between gap-6"
        style={{ background: "#1d1b18" }}
      >
        <div className="flex flex-col gap-2 lg:max-w-[580px]">
          <p
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(18px, 2.5vw, 28px)",
              lineHeight: 1.1,
              color: "#f1e5d1",
              letterSpacing: "0.5px",
            }}
          >
            UMA REDE QUE TRABALHA COM PROPÓSITO E CORAÇÃO.
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
            Cada pessoa aqui carrega a missão da Zambô e transforma ideias em ações todos os dias.
          </p>
        </div>
        <button
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
          FAÇA PARTE DESSA HISTÓRIA
          <ArrowIcon />
        </button>
      </div>
    </section>
  );
}
