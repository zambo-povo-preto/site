"use client";

import { useState, useRef, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "./AdminAuthContext";
import { useDocuments, AdminDocument, DocCategory } from "./DocumentsContext";

const CATEGORIES: DocCategory[] = ["Prestação de Contas", "Relatório de Atividades", "Plano de Trabalho", "Ata de Reunião", "Edital"];

const CATEGORY_COLORS: Record<DocCategory, { bg: string; color: string }> = {
  "Prestação de Contas":     { bg: "#dd341f", color: "#fff" },
  "Relatório de Atividades": { bg: "#f8ba01", color: "#121212" },
  "Plano de Trabalho":       { bg: "#1a7d3c", color: "#fff" },
  "Ata de Reunião":          { bg: "#1d1b18", color: "#f1e5d1" },
  "Edital":                  { bg: "#6b5e55", color: "#fff" },
};

const FILE_COLORS: Record<string, string> = { PDF: "#dd341f", XLSX: "#1a7d3c", DOC: "#1a5fa8" };
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 2018 }, (_, i) => CURRENT_YEAR - i);

function Badge({ category }: { category: DocCategory }) {
  const { bg, color } = CATEGORY_COLORS[category];
  return <span className="px-2 py-0.5 rounded-[2px] shrink-0" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: "0.8px", background: bg, color }}>{category.toUpperCase()}</span>;
}

function FileTag({ type }: { type: string }) {
  return (
    <span className="flex items-center justify-center rounded-[2px] shrink-0" style={{ width: 36, height: 42, background: FILE_COLORS[type] ?? "#888", border: "2px solid rgba(0,0,0,0.15)" }}>
      <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 10, color: "#fff" }}>{type}</span>
    </span>
  );
}

function StatusPill({ status }: { status: AdminDocument["status"] }) {
  const on = status === "published";
  return (
    <span className="px-2.5 py-1 rounded-full flex items-center gap-1.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: "0.8px", background: on ? "rgba(26,125,60,0.1)" : "rgba(107,94,85,0.08)", color: on ? "#1a7d3c" : "#9a8f86", border: `1px solid ${on ? "rgba(26,125,60,0.25)" : "rgba(107,94,85,0.2)"}` }}>
      <span className="rounded-full" style={{ width: 6, height: 6, background: on ? "#1a7d3c" : "#c9b89a" }} />
      {on ? "PUBLICADO" : "RASCUNHO"}
    </span>
  );
}

function UploadModal({ onClose }: { onClose: () => void }) {
  const { addDocument } = useDocuments();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ title: "", category: CATEGORIES[0], year: CURRENT_YEAR, description: "", status: "published" as AdminDocument["status"] });
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function set(k: string, v: unknown) { setForm((p) => ({ ...p, [k]: v })); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const ext = file.name.split(".").pop()?.toUpperCase() ?? "PDF";
    const fileType = (["PDF", "XLSX", "DOC"].includes(ext) ? ext : "PDF") as "PDF" | "XLSX" | "DOC";
    const size = file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(0)} KB` : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    await addDocument({ ...form, fileType, fileSize: size, fileName: file.name });
    setLoading(false);
    setSuccess(true);
    setTimeout(onClose, 1200);
  }

  const inputStyle = { fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, background: "#f5eedd", border: "2px solid #d4c9b6", color: "#121212" };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => (e.target.style.borderColor = "#121212");
  const onBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => (e.target.style.borderColor = "#d4c9b6");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-[600px] rounded-[4px] overflow-hidden" style={{ background: "#fff", border: "1px solid #d4c9b6", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ background: "#faf7f2", borderBottom: "1px solid #e8d5b4" }}>
          <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 20, color: "#121212", letterSpacing: "0.5px" }}>NOVO DOCUMENTO</span>
          <button onClick={onClose} style={{ color: "#9a8f86" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="flex items-center justify-center rounded-full size-16" style={{ background: "rgba(26,125,60,0.1)", border: "3px solid #1a7d3c" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a7d3c" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 20, color: "#121212" }}>DOCUMENTO ADICIONADO!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
            {/* Drop zone */}
            <div
              className="flex flex-col items-center justify-center gap-3 rounded-[3px] py-8 cursor-pointer"
              style={{ border: `2px dashed ${dragging ? "#121212" : file ? "#1a7d3c" : "#d4c9b6"}`, background: dragging ? "rgba(248,186,1,0.06)" : file ? "rgba(26,125,60,0.04)" : "#faf7f2" }}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) setFile(f); }}
            >
              <input ref={fileRef} type="file" accept=".pdf,.xlsx,.doc,.docx" className="hidden" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
              {file ? (
                <>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a7d3c" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 14, color: "#1a7d3c" }}>{file.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: "#9a8f86" }}>{(file.size / 1024).toFixed(0)} KB · Clique para trocar</p>
                </>
              ) : (
                <>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9a8f86" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 14, color: "#6b5e55" }}>Arraste o arquivo ou clique para selecionar</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: "#9a8f86" }}>PDF, XLSX ou DOC — até 20 MB</p>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex flex-col gap-1.5">
                <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "1px", color: "#3a342f" }}>TÍTULO *</label>
                <input required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Ex: Prestação de Contas Anual 2025" className="w-full px-3 py-2.5 rounded-[3px] outline-none" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "1px", color: "#3a342f" }}>CATEGORIA *</label>
                <select required value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full px-3 py-2.5 rounded-[3px] outline-none" style={inputStyle} onFocus={onFocus} onBlur={onBlur}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "1px", color: "#3a342f" }}>ANO *</label>
                <select required value={form.year} onChange={(e) => set("year", Number(e.target.value))} className="w-full px-3 py-2.5 rounded-[3px] outline-none" style={inputStyle} onFocus={onFocus} onBlur={onBlur}>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "1px", color: "#3a342f" }}>DESCRIÇÃO</label>
                <textarea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Breve descrição do documento..." className="w-full px-3 py-2.5 rounded-[3px] outline-none resize-none" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <button type="button" onClick={() => set("status", form.status === "published" ? "draft" : "published")} className="relative rounded-full shrink-0" style={{ width: 44, height: 24, background: form.status === "published" ? "#1a7d3c" : "#d4c9b6", border: "2px solid rgba(0,0,0,0.1)" }}>
                  <span className="absolute top-0.5 rounded-full" style={{ width: 16, height: 16, background: "#fff", left: form.status === "published" ? "calc(100% - 20px)" : 2, transition: "left 0.2s ease" }} />
                </button>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: "#6b5e55" }}>{form.status === "published" ? "Publicar imediatamente no portal" : "Salvar como rascunho"}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2" style={{ borderTop: "1px solid #e8d5b4" }}>
              <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-[3px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 13, color: "#6b5e55", background: "transparent", border: "2px solid #d4c9b6" }}>CANCELAR</button>
              <button type="submit" disabled={loading || !file} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[3px]" style={{ fontFamily: "'Anton', sans-serif", fontSize: 15, letterSpacing: "0.5px", color: !file || loading ? "#9a8f86" : "#121212", background: !file || loading ? "#e8d5b4" : "#f8ba01", border: `2px solid ${!file || loading ? "#d4c9b6" : "#121212"}`, boxShadow: !file || loading ? "none" : "3px 3px 0px #121212", cursor: !file || loading ? "not-allowed" : "pointer" }}>
                {loading ? <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>ENVIANDO...</> : "ENVIAR DOCUMENTO"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function DeleteConfirm({ doc, onCancel, onConfirm }: { doc: AdminDocument; onCancel: () => void; onConfirm: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-[420px] p-6 rounded-[4px] flex flex-col gap-5" style={{ background: "#fff", border: "1px solid #d4c9b6", borderTop: "3px solid #dd341f", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
        <div className="flex flex-col gap-2">
          <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 20, color: "#121212" }}>REMOVER DOCUMENTO</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: "#6b5e55", lineHeight: "22px" }}>Tem certeza que deseja remover <span style={{ color: "#121212", fontWeight: 800 }}>"{doc.title}"</span>? Esta ação não pode ser desfeita.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-[3px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 13, color: "#6b5e55", background: "transparent", border: "2px solid #d4c9b6" }}>CANCELAR</button>
          <button onClick={async () => { setLoading(true); await onConfirm(); }} disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[3px]" style={{ fontFamily: "'Anton', sans-serif", fontSize: 15, color: "#fff", background: loading ? "#e8d5b4" : "#dd341f", border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading && <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>}
            {loading ? "REMOVENDO..." : "REMOVER"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const { user, loading, logout } = useAdminAuth();
  const { documents, deleteDocument, toggleStatus } = useDocuments();
  const router = useRouter();

  const [showUpload, setShowUpload] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminDocument | null>(null);
  const [filterYear, setFilterYear] = useState<number | "all">("all");
  const [filterCat, setFilterCat] = useState<DocCategory | "all">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/admin/login");
  }, [loading, user, router]);

  if (loading || !user) return null;

  const filtered = documents.filter((d) => {
    if (filterYear !== "all" && d.year !== filterYear) return false;
    if (filterCat !== "all" && d.category !== filterCat) return false;
    if (search && !d.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const years = [...new Set(documents.map((d) => d.year))].sort((a, b) => b - a);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f5eedd" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 lg:px-10 py-4 shrink-0" style={{ background: "#fff", borderBottom: "3px solid #121212" }}>
        <div className="flex items-center gap-4">
          <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, color: "#121212", letterSpacing: "1px" }}>ZAMBÔ</span>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-[3px]" style={{ background: "rgba(248,186,1,0.15)", border: "1px solid rgba(248,186,1,0.5)" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 11, color: "#121212", letterSpacing: "1px" }}>PAINEL ADMIN</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 13, color: "#121212" }}>{user.name}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 11, color: "#9a8f86" }}>{user.email}</span>
          </div>
          <button onClick={() => { logout(); router.push("/admin/login"); }} className="flex items-center gap-2 px-4 py-2 rounded-[3px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 12, color: "#6b5e55", border: "2px solid #d4c9b6", background: "transparent", letterSpacing: "0.5px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            SAIR
          </button>
        </div>
      </header>

      <div className="flex-1 px-6 lg:px-10 py-8 flex flex-col gap-7 max-w-[1300px] mx-auto w-full">
        {/* Title + upload button */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
          <div className="flex flex-col gap-1">
            <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(24px, 3vw, 36px)", color: "#121212", letterSpacing: "0.5px", lineHeight: 1 }}>DOCUMENTOS</h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: "#6b5e55" }}>Gerencie os documentos exibidos no portal público de transparência</p>
          </div>
          <button onClick={() => setShowUpload(true)} className="flex items-center gap-2.5 px-5 py-3 rounded-[3px] shrink-0" style={{ fontFamily: "'Anton', sans-serif", fontSize: 15, color: "#121212", background: "#f8ba01", border: "2px solid #121212", boxShadow: "4px 4px 0px #121212", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            ENVIAR DOCUMENTO
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "TOTAL", value: documents.length, accent: "#f8ba01" },
            { label: "PUBLICADOS", value: documents.filter((d) => d.status === "published").length, accent: "#1a7d3c" },
            { label: "RASCUNHOS", value: documents.filter((d) => d.status === "draft").length, accent: "#9a8f86" },
            { label: "ANOS", value: years.length, accent: "#dd341f" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1 px-5 py-4 rounded-[3px]" style={{ background: "#fff", borderTop: `3px solid ${s.accent}`, borderRight: "1px solid #e8d5b4", borderBottom: "1px solid #e8d5b4", borderLeft: "1px solid #e8d5b4" }}>
              <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, color: "#121212", lineHeight: 1 }}>{s.value}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 10, color: "#9a8f86", letterSpacing: "1px" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center px-4 py-3 rounded-[3px]" style={{ background: "#fff", border: "1px solid #e8d5b4" }}>
          <div className="relative flex-1 min-w-[180px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a8f86" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar documento..." className="w-full pl-8 pr-3 py-2 rounded-[3px] outline-none" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, background: "#f5eedd", border: "1px solid #d4c9b6", color: "#121212" }} />
          </div>
          <select value={filterYear} onChange={(e) => setFilterYear(e.target.value === "all" ? "all" : Number(e.target.value))} className="px-3 py-2 rounded-[3px] outline-none" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 12, background: "#f5eedd", border: "1px solid #d4c9b6", color: "#3a342f" }}>
            <option value="all">TODOS OS ANOS</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value as DocCategory | "all")} className="px-3 py-2 rounded-[3px] outline-none" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 12, background: "#f5eedd", border: "1px solid #d4c9b6", color: "#3a342f" }}>
            <option value="all">TODAS AS CATEGORIAS</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {filtered.length !== documents.length && <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: "#9a8f86" }}>{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</span>}
        </div>

        {/* Table */}
        <div className="rounded-[3px] overflow-hidden" style={{ border: "1px solid #d4c9b6" }}>
          {/* Header row */}
          <div className="hidden md:grid px-5 py-3" style={{ gridTemplateColumns: "40px 1fr 160px 60px 100px 90px 80px", background: "#f5eedd", borderBottom: "2px solid #121212", gap: 12 }}>
            {["", "DOCUMENTO", "CATEGORIA", "ANO", "PUBLICADO EM", "STATUS", "AÇÕES"].map((h) => (
              <span key={h} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 10, color: "#9a8f86", letterSpacing: "1px" }}>{h}</span>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3" style={{ background: "#fff" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4c9b6" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: "#9a8f86" }}>Nenhum documento encontrado</p>
            </div>
          ) : filtered.map((doc, i) => (
            <div key={doc.id} className="flex md:grid items-center gap-3 px-5 py-4 flex-wrap md:flex-nowrap transition-colors" style={{ gridTemplateColumns: "40px 1fr 160px 60px 100px 90px 80px", gap: 12, background: i % 2 === 0 ? "#fff" : "#faf7f2", borderBottom: "1px solid #e8d5b4" }}>
              <FileTag type={doc.fileType} />
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 14, color: "#121212", lineHeight: 1.2 }}>{doc.title}</span>
                <span className="truncate" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 11, color: "#9a8f86" }}>{doc.fileName}</span>
              </div>
              <Badge category={doc.category} />
              <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 16, color: "#3a342f" }}>{doc.year}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: "#9a8f86" }}>{doc.publishedAt}</span>
              <StatusPill status={doc.status} />
              <div className="flex items-center gap-1.5">
                <button onClick={() => toggleStatus(doc.id)} title={doc.status === "published" ? "Despublicar" : "Publicar"} className="flex items-center justify-center size-8 rounded-[3px]" style={{ background: "transparent", border: "1px solid #d4c9b6", color: "#9a8f86" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#121212"; e.currentTarget.style.color = "#121212"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#d4c9b6"; e.currentTarget.style.color = "#9a8f86"; }}>
                  {doc.status === "published"
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  }
                </button>
                <button onClick={() => setDeleteTarget(doc)} title="Remover" className="flex items-center justify-center size-8 rounded-[3px]" style={{ background: "transparent", border: "1px solid #d4c9b6", color: "#9a8f86" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#dd341f"; e.currentTarget.style.color = "#dd341f"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#d4c9b6"; e.currentTarget.style.color = "#9a8f86"; }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
      {deleteTarget && <DeleteConfirm doc={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={async () => { await deleteDocument(deleteTarget.id); setDeleteTarget(null); }} />}
    </div>
  );
}
