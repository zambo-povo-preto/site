"use client";

import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useCollaborators } from "@/contexts/CollaboratorsContext";
import type { Collaborator } from "@/types/collaborator";
import {
  ArrowRight,
  ExternalLink,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function CollaboratorsManagementView() {
  const { collaborators, loading, deleteCollaborator, resetToDefaults } =
    useCollaborators();

  const [search, setSearch] = useState("");
  const [accentFilter, setAccentFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<Collaborator | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return collaborators.filter((collab) => {
      const matchSearch =
        !q ||
        collab.name.toLowerCase().includes(q) ||
        collab.role.toLowerCase().includes(q) ||
        (collab.bio && collab.bio.toLowerCase().includes(q));

      const matchAccent =
        accentFilter === "all" || collab.accentColor === accentFilter;

      return matchSearch && matchAccent;
    });
  }, [collaborators, search, accentFilter]);

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteCollaborator(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#222222] pb-16">
      {/* ── Top Bar ── */}
      <div className="px-4 sm:px-8 lg:px-12 pt-7">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <Breadcrumbs
            items={[
              { label: "Painel", href: "/admin" },
              { label: "Colaboradores" },
            ]}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="flex flex-col gap-1">
              <h1
                className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Gerenciamento de Colaboradores
              </h1>
              <p
                className="text-xs sm:text-sm text-[#756F67]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cadastre, edite e remova os profissionais e voluntários exibidos na página pública do Ponto de Cultura.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                href="/admin/colaboradores/novo"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f8ba01] text-[#121212] text-xs font-bold uppercase tracking-wider border-2 border-[#121212] shadow-[2.5px_2.5px_0px_#121212] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Plus className="w-4 h-4" />
                Novo Colaborador
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cards de Métricas / Resumo ── */}
      <div className="px-4 sm:px-8 lg:px-12 pt-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white border border-[#E2DDD3] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#756F67] uppercase tracking-wider">
                Total de Colaboradores
              </span>
              <span className="text-2xl font-black text-[#222222]">
                {collaborators.length}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#f8ba01]/20 border border-[#f8ba01]/40 flex items-center justify-center text-[#121212]">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E2DDD3] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#756F67] uppercase tracking-wider">
                Com Rede Social
              </span>
              <span className="text-2xl font-black text-[#1a7d3c]">
                {collaborators.filter((c) => c.social?.url).length}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#1a7d3c]/15 border border-[#1a7d3c]/30 flex items-center justify-center text-[#1a7d3c]">
              <ExternalLink className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E2DDD3] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#756F67] uppercase tracking-wider">
                Página Pública
              </span>
              <Link
                href="/colaboradores"
                target="_blank"
                className="text-xs font-bold text-[#dd341f] hover:underline flex items-center gap-1 mt-1"
              >
                Ver vitrine pública <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    "Deseja restaurar a lista para os colaboradores padrão do sistema?",
                  )
                ) {
                  resetToDefaults();
                }
              }}
              title="Restaurar dados padrão"
              className="p-2 rounded-lg bg-[#FAF7F0] border border-[#E2DDD3] text-[#756F67] hover:text-[#121212] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Filtros e Busca ── */}
      <div className="px-4 sm:px-8 lg:px-12 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E2DDD3] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
          {/* Busca */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9388]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, cargo ou bio..."
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#FAF7F0] border border-[#D9D3C7] text-[#222222] placeholder:text-[#9A9388] focus:outline-none focus:ring-2 focus:ring-[#f8ba01]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          {/* Filtro por cor de destaque */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#756F67] shrink-0">
              Cor:
            </span>
            <select
              value={accentFilter}
              onChange={(e) => setAccentFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg bg-[#FAF7F0] border border-[#D9D3C7] text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#f8ba01]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <option value="all">Todas as cores</option>
              <option value="#f8ba01">Amarelo (#f8ba01)</option>
              <option value="#dd341f">Vermelho (#dd341f)</option>
              <option value="#1a7d3c">Verde (#1a7d3c)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Tabela / Grid de Colaboradores ── */}
      <div className="px-4 sm:px-8 lg:px-12 pt-6">
        <div className="max-w-7xl mx-auto bg-white rounded-xl border border-[#E2DDD3] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-[#756F67]">
              Carregando colaboradores...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center gap-3">
              <Users className="w-10 h-10 text-[#B5AEA2]" />
              <span className="text-sm font-bold text-[#222222]">
                Nenhum colaborador encontrado
              </span>
              <p className="text-xs text-[#756F67] max-w-sm">
                Tente ajustar os filtros de busca ou cadastre um novo colaborador.
              </p>
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-1 text-xs font-bold text-[#dd341f] underline"
                >
                  Limpar busca
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2DDD3] bg-[#FAF7F0] text-[11px] font-bold uppercase tracking-wider text-[#756F67]">
                    <th className="py-3 px-4 sm:px-6">Colaborador</th>
                    <th className="py-3 px-4">Função / Atuação</th>
                    <th className="py-3 px-4">Rede Social</th>
                    <th className="py-3 px-4 text-center">Destaque</th>
                    <th className="py-3 px-4 sm:px-6 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DDD3] text-xs">
                  {filtered.map((item) => {
                    const accent = item.accentColor || "#f8ba01";
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-[#FAF7F0]/60 transition-colors"
                      >
                        {/* Foto e Nome */}
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-black/20 bg-[#FAF7F0]"
                              style={{ boxShadow: "1px 1px 0px #121212" }}
                            >
                              <ImageWithFallback
                                src={item.photo}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span
                                className="font-bold text-[#121212] uppercase truncate max-w-[200px] sm:max-w-[260px]"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                              >
                                {item.name}
                              </span>
                              {item.bio && (
                                <span className="text-[11px] text-[#756F67] line-clamp-1 max-w-[260px]">
                                  {item.bio}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Cargo */}
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-[#3A352F] uppercase text-[11px] tracking-wide">
                            {item.role}
                          </span>
                        </td>

                        {/* Rede Social */}
                        <td className="py-3.5 px-4">
                          {item.social?.url ? (
                            <a
                              href={item.social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FAF7F0] border border-[#D9D3C7] text-[#222222] font-semibold text-[11px] hover:border-[#121212] transition-colors"
                            >
                              <span className="uppercase text-[10px] text-[#756F67]">
                                {item.social.platform}:
                              </span>
                              <span className="truncate max-w-[120px]">
                                {item.social.handle ||
                                  item.social.customLabel ||
                                  "Link"}
                              </span>
                              <ExternalLink className="w-3 h-3 shrink-0 text-[#756F67]" />
                            </a>
                          ) : (
                            <span className="text-[#9A9388] italic text-[11px]">
                              Sem rede vinculada
                            </span>
                          )}
                        </td>

                        {/* Cor de Destaque */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FAF7F0] border border-[#E2DDD3]">
                            <div
                              className="w-3 h-3 rounded-full border border-black/20"
                              style={{ background: accent }}
                            />
                            <span className="text-[10px] font-mono text-[#554F48]">
                              {accent}
                            </span>
                          </div>
                        </td>

                        {/* Ações */}
                        <td className="py-3.5 px-4 sm:px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/admin/colaboradores/${item.id}/editar`}
                              className="p-1.5 rounded-lg border border-[#E2DDD3] text-[#3A352F] hover:bg-[#FAF7F0] hover:border-[#121212] transition-colors"
                              title="Editar colaborador"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => setDeleteTarget(item)}
                              className="p-1.5 rounded-lg border border-[#E2DDD3] text-[#C02D1D] hover:bg-[#FDF2F0] hover:border-[#F3B7B1] transition-colors"
                              title="Excluir colaborador"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Modal de Confirmação de Exclusão ── */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-xl border border-[#E2DDD3] shadow-xl p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FDF2F0] text-[#C02D1D] flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-[#121212]">
                  Excluir Colaborador
                </h3>
                <span className="text-xs text-[#756F67]">
                  Essa ação removerá o colaborador da listagem.
                </span>
              </div>
            </div>

            <p className="text-xs text-[#4A443C] leading-relaxed">
              Tem certeza que deseja remover <strong>{deleteTarget.name}</strong> ({deleteTarget.role})? Você poderá restaurar os dados padrão a qualquer momento.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg border border-[#D9D3C7] text-xs font-semibold text-[#554F48] hover:bg-[#FAF7F0]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-[#dd341f] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#b82715] transition-colors"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

