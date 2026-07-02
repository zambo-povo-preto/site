"use client";

import React from "react";

// ─── Ícones (SVGs) ─────────────────────────────────────────────────────────────
const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dd341f" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dd341f" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dd341f" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

// ─── Página de Contato ────────────────────────────────────────────────────────

export function Contato() {
  return (
    <div 
      className="relative w-full min-h-screen overflow-hidden pt-24 pb-20 px-6 lg:px-[80px]"
      style={{
        backgroundColor: "#EEDEC9", 
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(0, 0, 0, 0.06) 0%, transparent 40%),
          radial-gradient(circle at 85% 75%, rgba(0, 0, 0, 0.04) 0%, transparent 50%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.10'/%3E%3C/svg%3E")
        `,
      }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* ─── COLUNA ESQUERDA: INFORMAÇÕES ─── */}
        <div className="w-full md:w-[35%] flex flex-col gap-10 mt-4">
          
          {/* Bloco de Contatos */}
          <div className="flex flex-col gap-8">
            {/* Endereço */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 bg-[#dd341f] flex items-center justify-center">
                <MapPinIcon />
              </div>
              <div className="flex flex-col">
                <span className="font-['Anton'] tracking-wide text-[16px] text-[#121212] uppercase mb-1">Endereço</span>
                <span className="font-['Inter'] text-[15px] font-medium text-[#3a342f] leading-snug">
                  Av. X, 1234<br/>
                  Caraguatatuba, SP – CEP 00000-000
                </span>
              </div>
            </div>

            {/* Telefone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 bg-[#dd341f] flex items-center justify-center">
                <PhoneIcon />
              </div>
              <div className="flex flex-col">
                <span className="font-['Anton'] tracking-wide text-[16px] text-[#121212] uppercase mb-1">Telefone</span>
                <span className="font-['Inter'] text-[15px] font-medium text-[#3a342f] leading-snug">
                  (71) 3333-4444<br/>
                  Seg – Sex, 9h às 18h
                </span>
              </div>
            </div>

            {/* E-mail */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 bg-[#dd341f] flex items-center justify-center">
                <MailIcon />
              </div>
              <div className="flex flex-col">
                <span className="font-['Anton'] tracking-wide text-[16px] text-[#121212] uppercase mb-1">E-mail</span>
                <span className="font-['Inter'] text-[15px] font-medium text-[#3a342f] leading-snug">
                  contato@zambo.org.br
                </span>
              </div>
            </div>
          </div>

          {/* Divisor Decorativo */}
          <div className="flex items-center w-full my-2">
            <div className="flex-1 h-px bg-[#dcd1bc]"></div>
            <div className="w-2 h-2 bg-[#f8ba01] rotate-45 mx-3"></div>
            <div className="flex-1 h-px bg-[#dcd1bc]"></div>
          </div>

          {/* Redes Sociais */}
          <div className="flex flex-col w-full">
            <span className="font-['Anton'] tracking-wide text-[16px] text-[#121212] uppercase mb-4">Redes Sociais</span>
            
            <a href="#" className="flex items-center gap-4 py-3 border-b border-[#dcd1bc] hover:bg-[#e6d6be] transition-colors">
              <InstagramIcon />
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[11px] font-bold text-[#5a534e] uppercase leading-none">Instagram</span>
                <span className="font-['Inter'] text-[15px] font-bold text-[#121212]">@zambomnc</span>
              </div>
            </a>

            <a href="#" className="flex items-center gap-4 py-3 border-b border-[#dcd1bc] hover:bg-[#e6d6be] transition-colors">
              <YoutubeIcon />
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[11px] font-bold text-[#5a534e] uppercase leading-none">YouTube</span>
                <span className="font-['Inter'] text-[15px] font-bold text-[#121212]">Zambô Oficial</span>
              </div>
            </a>

            <a href="#" className="flex items-center gap-4 py-3 border-b border-[#dcd1bc] hover:bg-[#e6d6be] transition-colors">
              <FacebookIcon />
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[11px] font-bold text-[#5a534e] uppercase leading-none">Facebook</span>
                <span className="font-['Inter'] text-[15px] font-bold text-[#121212]">/zambooficial</span>
              </div>
            </a>
          </div>

          {/* Citação Inferior */}
          <div className="mt-4 pl-4 border-l-[3px] border-[#dd341f]">
            <p className="font-['Inter'] font-semibold italic text-[14px] text-[#3a342f] leading-relaxed">
              "Juntos somos a voz que transforma, a força que resiste e a memória que persiste."
            </p>
          </div>

        </div>

        {/* ─── COLUNA DIREITA: FORMULÁRIO ─── */}
        <div className="w-full md:w-[65%] relative bg-[#f4ebd9] border border-[#dcd1bc] shadow-[4px_8px_24px_rgba(0,0,0,0.06)] p-8 md:p-12">
          
          {/* Topo Decorativo do Card */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#dd341f]" />
          {/* Fita Amarela Canto Superior Direito */}
          <div className="absolute top-0 right-4 w-12 h-14 bg-[#f8ba01] mix-blend-multiply opacity-90 shadow-sm" />

          {/* Título do Formulário */}
          <div className="flex flex-col items-start mb-8">
            <div className="bg-[#f8ba01] px-2 py-0.5 mb-2">
              <span className="font-['Anton'] text-[13px] tracking-widest uppercase text-[#121212]">Formulário</span>
            </div>
            <h2 className="font-['Anton'] text-[40px] md:text-[56px] text-[#121212] leading-none uppercase">
              Escreva para <span className="text-[#dd341f]">a gente</span>
            </h2>
          </div>

          {/* Campos do Formulário */}
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Linha 1: Nome e Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="font-['Anton'] tracking-wider text-[14px] text-[#121212] uppercase">Nome</label>
                <input 
                  type="text" 
                  placeholder="Seu nome completo" 
                  className="w-full bg-[#EEDEC9] border border-[#dcd1bc] p-3 md:p-4 font-['Inter'] text-[15px] font-medium text-[#121212] placeholder-[#8a8178] focus:outline-none focus:border-[#dd341f] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-['Anton'] tracking-wider text-[14px] text-[#121212] uppercase">E-mail</label>
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="w-full bg-[#EEDEC9] border border-[#dcd1bc] p-3 md:p-4 font-['Inter'] text-[15px] font-medium text-[#121212] placeholder-[#8a8178] focus:outline-none focus:border-[#dd341f] transition-colors"
                />
              </div>
            </div>

            {/* Linha 2: Assunto */}
            <div className="flex flex-col gap-1.5">
              <label className="font-['Anton'] tracking-wider text-[14px] text-[#121212] uppercase">Assunto</label>
              <div className="relative">
                <select className="w-full appearance-none bg-[#EEDEC9] border border-[#dcd1bc] p-3 md:p-4 font-['Inter'] text-[15px] font-medium text-[#121212] focus:outline-none focus:border-[#dd341f] transition-colors cursor-pointer">
                  <option>Ser voluntário</option>
                  <option>Dúvidas e Sugestões</option>
                  <option>Parcerias</option>
                  <option>Outros</option>
                </select>
                {/* Ícone customizado da setinha do Select */}
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#121212" strokeWidth="2" strokeLinecap="square"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Linha 3: Mensagem */}
            <div className="flex flex-col gap-1.5">
              <label className="font-['Anton'] tracking-wider text-[14px] text-[#121212] uppercase">Mensagem</label>
              <textarea 
                rows={5}
                placeholder="Escreva sua mensagem aqui..." 
                className="w-full resize-none bg-[#EEDEC9] border border-[#dcd1bc] p-3 md:p-4 font-['Inter'] text-[15px] font-medium text-[#121212] placeholder-[#8a8178] focus:outline-none focus:border-[#dd341f] transition-colors"
              />
            </div>

            {/* Rodapé do Formulário: Aviso e Botão */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-2 pt-2">
              <span className="font-['Inter'] text-[13px] font-semibold text-[#5a534e]">
                Respondemos em até 2 dias úteis.
              </span>
              
              <button 
                type="submit"
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#dd341f] hover:bg-[#c22b19] transition-colors text-white px-8 py-3.5 uppercase font-['Anton'] text-[16px] tracking-wider"
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