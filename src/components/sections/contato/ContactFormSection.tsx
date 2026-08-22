"use client";

const MapPinIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    role="img"
    aria-label="Localização"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    role="img"
    aria-label="Telefone"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    role="img"
    aria-label="E-mail"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#dd341f"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    role="img"
    aria-label="Instagram"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#dd341f"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    role="img"
    aria-label="YouTube"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#dd341f"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    role="img"
    aria-label="Facebook"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    role="img"
    aria-label="Enviar"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export function ContactFormSection() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden pt-24 pb-20 px-6 lg:px-[80px] bg-[#f0e3cd]">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* ─── COLUNA ESQUERDA: INFORMAÇÕES ─── */}
        <div className="w-full md:w-[35%] flex flex-col gap-10 mt-4">
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 bg-[#dd341f] border border-[#121212] rounded-[3px] flex items-center justify-center">
                <MapPinIcon />
              </div>
              <div className="flex flex-col">
                <span className="font-['Anton'] tracking-wide text-[16px] text-[#121212] uppercase mb-1">
                  Endereço
                </span>
                <span className="font-['Inter'] text-[15px] font-medium text-[#4a4036] leading-snug">
                  Av. X, 1234
                  <br />
                  Caraguatatuba, SP – CEP 00000-000
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 bg-[#dd341f] border border-[#121212] rounded-[3px] flex items-center justify-center">
                <PhoneIcon />
              </div>
              <div className="flex flex-col">
                <span className="font-['Anton'] tracking-wide text-[16px] text-[#121212] uppercase mb-1">
                  Telefone
                </span>
                <span className="font-['Inter'] text-[15px] font-medium text-[#4a4036] leading-snug">
                  (71) 3333-4444
                  <br />
                  Seg – Sex, 9h às 18h
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 bg-[#dd341f] border border-[#121212] rounded-[3px] flex items-center justify-center">
                <MailIcon />
              </div>
              <div className="flex flex-col">
                <span className="font-['Anton'] tracking-wide text-[16px] text-[#121212] uppercase mb-1">
                  E-mail
                </span>
                <span className="font-['Inter'] text-[15px] font-medium text-[#4a4036] leading-snug">
                  contato@zambo.org.br
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full my-2">
            <div className="flex-1 h-px bg-[#c8b9a2]" />
            <div className="w-2 h-2 bg-[#f8ba01] rotate-45 mx-3" />
            <div className="flex-1 h-px bg-[#c8b9a2]" />
          </div>

          <div className="flex flex-col w-full">
            <span className="font-['Anton'] tracking-wide text-[16px] text-[#121212] uppercase mb-4">
              Redes Sociais
            </span>

            <a
              href="https://www.instagram.com/zambomnc/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 py-3 border-b border-[#c8b9a2] hover:bg-[#e6d8be] transition-colors rounded-[3px] px-2"
            >
              <InstagramIcon />
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[11px] font-bold text-[#6b5e55] uppercase leading-none">
                  Instagram
                </span>
                <span className="font-['Inter'] text-[15px] font-bold text-[#121212]">
                  @zambomnc
                </span>
              </div>
            </a>

            <a
              href="https://www.youtube.com/@zambooficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 py-3 border-b border-[#c8b9a2] hover:bg-[#e6d8be] transition-colors rounded-[3px] px-2"
            >
              <YoutubeIcon />
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[11px] font-bold text-[#6b5e55] uppercase leading-none">
                  YouTube
                </span>
                <span className="font-['Inter'] text-[15px] font-bold text-[#121212]">
                  Zambô Oficial
                </span>
              </div>
            </a>

            <a
              href="https://www.facebook.com/zambooficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 py-3 border-b border-[#c8b9a2] hover:bg-[#e6d8be] transition-colors rounded-[3px] px-2"
            >
              <FacebookIcon />
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[11px] font-bold text-[#6b5e55] uppercase leading-none">
                  Facebook
                </span>
                <span className="font-['Inter'] text-[15px] font-bold text-[#121212]">
                  /zambooficial
                </span>
              </div>
            </a>
          </div>

          <div className="mt-4 pl-4 border-l-[3px] border-[#dd341f]">
            <p className="font-['Inter'] font-semibold italic text-[14px] text-[#3a342f] leading-relaxed">
              "Juntos somos a voz que transforma, a força que resiste e a
              memória que persiste."
            </p>
          </div>
        </div>

        {/* ─── COLUNA DIREITA: FORMULÁRIO ─── */}
        <div className="w-full md:w-[65%] relative bg-[#faf4e8] border border-[#c8b9a2] rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-8 md:p-12">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#f8ba01]" />

          <div className="flex flex-col items-start mb-8">
            <h2 className="font-['Anton'] text-[40px] md:text-[56px] text-[#121212] leading-none uppercase">
              Escreva para <span className="text-[#dd341f]">a gente</span>
            </h2>
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="font-['Anton'] tracking-wider text-[14px] text-[#121212] uppercase"
                >
                  Nome
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full bg-[#faf4e8] border border-[#c8b9a2] rounded-[3px] p-3 md:p-4 font-['Inter'] text-[15px] font-medium text-[#121212] placeholder-[#7a6d5c] focus:outline-none focus:border-[#f8ba01] focus:bg-[#ffffff] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="font-['Anton'] tracking-wider text-[14px] text-[#121212] uppercase"
                >
                  E-mail
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-[#faf4e8] border border-[#c8b9a2] rounded-[3px] p-3 md:p-4 font-['Inter'] text-[15px] font-medium text-[#121212] placeholder-[#7a6d5c] focus:outline-none focus:border-[#f8ba01] focus:bg-[#ffffff] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-subject"
                className="font-['Anton'] tracking-wider text-[14px] text-[#121212] uppercase"
              >
                Assunto
              </label>
              <div className="relative">
                <select
                  id="contact-subject"
                  className="w-full appearance-none bg-[#faf4e8] border border-[#c8b9a2] rounded-[3px] p-3 md:p-4 font-['Inter'] text-[15px] font-medium text-[#121212] focus:outline-none focus:border-[#f8ba01] focus:bg-[#ffffff] transition-colors cursor-pointer"
                >
                  <option>Ser voluntário</option>
                  <option>Dúvidas e Sugestões</option>
                  <option>Parcerias</option>
                  <option>Outros</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    role="img"
                    aria-label="Seta para baixo"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="#121212"
                      strokeWidth="2"
                      strokeLinecap="square"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="font-['Anton'] tracking-wider text-[14px] text-[#121212] uppercase"
              >
                Mensagem
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Escreva sua mensagem aqui..."
                className="w-full resize-none bg-[#faf4e8] border border-[#c8b9a2] rounded-[3px] p-3 md:p-4 font-['Inter'] text-[15px] font-medium text-[#121212] placeholder-[#7a6d5c] focus:outline-none focus:border-[#f8ba01] focus:bg-[#ffffff] transition-colors"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-2 pt-2">
              <span className="font-['Inter'] text-[13px] font-semibold text-[#6b5e55]">
                Respondemos em até 2 dias úteis.
              </span>

              <button
                type="submit"
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#f8ba01] hover:bg-[#ffffff] text-[#121212] border border-[#121212] rounded-[3px] px-8 py-3.5 uppercase font-['Anton'] text-[16px] tracking-wider transition-colors cursor-pointer"
                style={{ boxShadow: "4px 4px 0px rgba(18,18,18,0.1)" }}
              >
                Enviar
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
