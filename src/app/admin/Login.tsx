"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "./AdminAuthContext";
import svgPaths from "../../imports/Group36/svg-hkzbekptio";

function LogoMark() {
  return (
    <div className="inline-grid relative" style={{ width: 28, height: 56 }}>
      <div className="col-1 row-1 relative" style={{ width: 27, height: 33 }}>
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 33.1834 40.2948">
          <path d={svgPaths.p398a3200} fill="#121212" />
          <path d={svgPaths.p20158d00} fill="#121212" />
          <path d={svgPaths.p358a2a80} fill="#121212" />
          <path d={svgPaths.p3fb76280} fill="#121212" />
        </svg>
      </div>
      <div className="col-1 row-1 relative" style={{ width: 13, height: 47, marginLeft: 7, marginTop: 11 }}>
        <svg className="block size-full" fill="none" viewBox="0 0 16.7799 57.1872">
          <path d={svgPaths.p377bdc00} fill="#121212" />
          <path d={svgPaths.p3949a0f0} fill="#308442" stroke="#121212" strokeWidth="0.5" />
          <path d={svgPaths.p12c10a70} fill="#318443" stroke="#121212" strokeWidth="0.5" />
          <path d={svgPaths.p36996180} fill="#121212" stroke="#121212" strokeWidth="1.5" />
          <path d={svgPaths.p2c2b7800} fill="#121212" stroke="#121212" strokeWidth="1.5" />
          <path d={svgPaths.p22913280} fill="#E62127" stroke="#121212" strokeWidth="0.5" />
          <path d={svgPaths.p37414d80} fill="#FDCF31" stroke="#121212" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}

export function AdminLogin() {
  const { login } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen w-full flex" style={{ background: "#f5eedd" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between p-14 w-[480px] shrink-0 relative overflow-hidden" style={{ background: "#fff", borderRight: "3px solid #121212" }}>
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #121212 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        {/* Pan-African bars */}
        <div className="absolute top-0 left-0 right-0 flex h-[6px]">
          <div className="flex-1" style={{ background: "#dd341f" }} />
          <div className="flex-1" style={{ background: "#f8ba01" }} />
          <div className="flex-1" style={{ background: "#1a7d3c" }} />
        </div>

        <div className="relative flex items-center gap-3 mt-4">
          <LogoMark />
          <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, color: "#121212", letterSpacing: "1px" }}>ZAMBÔ</span>
        </div>

        <div className="relative flex flex-col gap-6">
          <div className="w-12 h-1" style={{ background: "#f8ba01" }} />
          <p style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1, color: "#121212", letterSpacing: "0.5px" }}>
            PAINEL DE<br />ADMINISTRAÇÃO
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "24px", color: "#6b5e55" }}>
            Gerencie os documentos públicos do Ponto de Cultura Zambô e mantenha o portal da transparência atualizado.
          </p>
        </div>

        <p className="relative" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: "#9a8f86", lineHeight: "18px" }}>
          Acesso restrito a administradores autorizados.<br />Em caso de problemas, contate: ti@zambo.org.br
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[420px] flex flex-col gap-8">
          <div className="flex lg:hidden items-center gap-3">
            <LogoMark />
            <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 28, color: "#121212", letterSpacing: "1px" }}>ZAMBÔ</span>
          </div>

          <div className="flex flex-col gap-7 p-8 rounded-[4px]" style={{ background: "#fff", border: "1px solid #d4c9b6", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
            <div className="flex flex-col gap-1">
              <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 28, color: "#121212", letterSpacing: "0.5px", lineHeight: 1 }}>ENTRAR</h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: "#6b5e55" }}>Acesse o painel de gestão de documentos</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "1.2px", color: "#3a342f" }}>E-MAIL</label>
                <input
                  id="email" type="email" autoComplete="email" value={email} required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zambo.org.br"
                  className="w-full px-4 py-3 rounded-[3px] outline-none"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 15, background: "#f5eedd", border: "2px solid #d4c9b6", color: "#121212" }}
                  onFocus={(e) => (e.target.style.borderColor = "#121212")}
                  onBlur={(e) => (e.target.style.borderColor = "#d4c9b6")}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "1.2px", color: "#3a342f" }}>SENHA</label>
                <div className="relative">
                  <input
                    id="password" type={showPassword ? "text" : "password"} autoComplete="current-password"
                    value={password} required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-[3px] outline-none pr-12"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 15, background: "#f5eedd", border: "2px solid #d4c9b6", color: "#121212" }}
                    onFocus={(e) => (e.target.style.borderColor = "#121212")}
                    onBlur={(e) => (e.target.style.borderColor = "#d4c9b6")}
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9a8f86" }}>
                    {showPassword
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    }
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-[3px]" style={{ background: "rgba(221,52,31,0.06)", border: "1px solid rgba(221,52,31,0.3)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dd341f" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: "#dd341f" }}>{error}</span>
                </div>
              )}

              <button
                type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-[3px]"
                style={{ fontFamily: "'Anton', sans-serif", fontSize: 17, letterSpacing: "1px", color: loading ? "#9a8f86" : "#121212", background: loading ? "#e8d5b4" : "#f8ba01", border: "2px solid #121212", boxShadow: loading ? "none" : "4px 4px 0px #121212", cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading
                  ? <><svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>ENTRANDO...</>
                  : "ENTRAR NO PAINEL"
                }
              </button>
            </form>

            <div className="px-4 py-3 rounded-[3px]" style={{ background: "rgba(248,186,1,0.1)", border: "1px solid rgba(248,186,1,0.4)" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: "#6b5e55", lineHeight: "18px" }}>
                <span style={{ color: "#121212", fontWeight: 800 }}>Demo: </span>
                admin@zambo.org.br / zambo2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
