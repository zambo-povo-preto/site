"use client";

import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminHeader } from "./AdminHeader";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export function AdminLoginForm() {
  const { login } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F7F3EA] text-[#222222]">
      {/* ── HEADER DO ADMIN (COM BOTÃO 'VOLTAR AO PORTAL') ── */}
      <AdminHeader showPortalReturn />

      {/* ── ÁREA PRINCIPAL CENTRALIZADA ── */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-[480px] flex flex-col items-center">
          {/* Card Branco de Login */}
          <div className="w-full bg-white rounded-2xl border border-[#E3DCCF] shadow-sm p-7 sm:p-10 flex flex-col gap-6">
            {/* Título e Subtítulo */}
            <div className="flex flex-col gap-1 text-left">
              <h1
                className="text-2xl sm:text-[28px] font-bold text-[#121212] tracking-tight"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Entrar no Painel
              </h1>
              <p
                className="text-sm text-[#756F67] leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Digite seu e-mail e senha para acessar o painel de
                administração.
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Campo: E-mail */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-email"
                  className="block text-xs font-bold text-[#3a342f] tracking-wider uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  E-MAIL
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-5 h-5 text-[#8C8077] absolute left-3.5 pointer-events-none" />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#D4C9B6] bg-[#FAF7F2]/60 hover:border-[#B3A692] focus:border-[#F5B900] focus:bg-white focus:outline-none text-sm text-[#121212] transition-colors placeholder:text-[#9A8F86]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
              </div>

              {/* Campo: Senha */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-bold text-[#3a342f] tracking-wider uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  SENHA
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-5 h-5 text-[#8C8077] absolute left-3.5 pointer-events-none" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="w-full pl-11 pr-11 py-3 rounded-lg border border-[#D4C9B6] bg-[#FAF7F2]/60 hover:border-[#B3A692] focus:border-[#F5B900] focus:bg-white focus:outline-none text-sm text-[#121212] transition-colors placeholder:text-[#9A8F86]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 text-[#8C8077] hover:text-[#121212] transition-colors p-1 cursor-pointer"
                    aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Alerta de Erro */}
              {error && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-lg font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 bg-[#F5B900] hover:bg-[#E0A800] active:scale-[0.99] text-[#121212] border border-[#E0A800] transition-all shadow-xs cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#121212]" />
                    <span>ENTRANDO...</span>
                  </>
                ) : (
                  <>
                    <span>ENTRAR NO PAINEL</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Link de Esqueci a Senha */}
              {/* <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs font-semibold text-[#1A7D3C] hover:underline self-start cursor-pointer transition-colors mt-0.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Esqueceu sua senha?
              </button> */}
            </form>
          </div>

          {/* Rodapé Informativo Abaixo do Card */}
          <footer
            className="text-center text-xs text-[#8C8077] flex flex-col gap-1 leading-relaxed mt-8 select-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p>Acesso restrito a administradores autorizados.</p>
            {/* <p>
              Em caso de problemas, contate:{" "}
              <a
                href="mailto:ti@zambo.org.br"
                className="text-[#554E46] font-medium hover:underline"
              >
                ti@zambo.org.br
              </a>
            </p> */}
          </footer>
        </div>
      </main>

      {/* ── MODAL DE RECUPERAÇÃO DE SENHA ── */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-xl p-6 sm:p-7 max-w-md w-full border border-[#E3DCCF] shadow-xl flex flex-col gap-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3DCCF]">
              <h3
                className="text-base font-bold text-[#121212]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Recuperação de Senha
              </h3>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="text-[#756F67] hover:text-[#121212] p-1 rounded-md transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="flex flex-col gap-3 text-xs sm:text-sm text-[#554E46] leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <p>
                Por motivos de segurança e integridade do Ponto de Cultura
                Zambô, a redefinição de acesso é realizada mediante validação
                direta pela equipe técnica e coordenação.
              </p>
              <p>
                Envie um e-mail informando seu nome completo e cargo para{" "}
                <strong className="text-[#121212]">ti@zambo.org.br</strong>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E3DCCF]">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#554E46] border border-[#E3DCCF] hover:bg-[#FAF7F2] transition-colors"
              >
                Fechar
              </button>
              <a
                href="mailto:ti@zambo.org.br?subject=Solicita%C3%A7%C3%A3o%20de%20Redefini%C3%A7%C3%A3o%20de%20Senha%20-%20Painel%20Zamb%C3%B4"
                className="px-4 py-2 rounded-lg text-xs font-bold text-[#121212] bg-[#F5B900] hover:bg-[#E0A800] border border-[#E0A800] transition-colors"
              >
                Enviar E-mail
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
