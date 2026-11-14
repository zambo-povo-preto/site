"use client";

import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useCollaborators } from "@/contexts/CollaboratorsContext";
import type { Collaborator, CollaboratorSocial, SocialPlatform } from "@/types/collaborator";
import { ArrowLeft, Check, Image as ImageIcon, Sparkles, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState } from "react";

const SOCIAL_PLATFORMS: { value: SocialPlatform; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "X / Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "behance", label: "Behance" },
  { value: "website", label: "Site Pessoal / Outro" },
];

const ACCENT_COLORS = [
  { value: "#f8ba01", label: "Amarelo Ouro (Padrão)", color: "#f8ba01" },
  { value: "#dd341f", label: "Vermelho Pan-Africano", color: "#dd341f" },
  { value: "#1a7d3c", label: "Verde Pan-Africano", color: "#1a7d3c" },
];

interface CollaboratorFormProps {
  initialCollaborator?: Collaborator;
}

export function CollaboratorForm({ initialCollaborator }: CollaboratorFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addCollaborator, updateCollaborator } = useCollaborators();
  const isEditing = Boolean(initialCollaborator);

  const [name, setName] = useState(initialCollaborator?.name || "");
  const [role, setRole] = useState(initialCollaborator?.role || "");
  const [photo, setPhoto] = useState<string>(
    initialCollaborator?.photo || "",
  );
  const [photoFileName, setPhotoFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const [bio, setBio] = useState(initialCollaborator?.bio || "");
  const [accentColor, setAccentColor] = useState(
    initialCollaborator?.accentColor || "#f8ba01",
  );

  // Rede social principal
  const [platform, setPlatform] = useState<SocialPlatform>(
    initialCollaborator?.social?.platform || "instagram",
  );
  const [socialUrl, setSocialUrl] = useState(
    initialCollaborator?.social?.url || "",
  );
  const [socialHandle, setSocialHandle] = useState(
    initialCollaborator?.social?.handle || "",
  );

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const inputStyle = {
    fontFamily: "'Inter', sans-serif",
  };

  const handleProcessFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setErrorMsg("O arquivo selecionado deve ser uma imagem (JPG, PNG, WebP).");
      return;
    }

    // Limite de 5MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMsg("A imagem selecionada deve ter no máximo 5MB.");
      return;
    }

    setErrorMsg("");
    setPhotoFileName(selectedFile.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPhoto(result);
    };
    reader.onerror = () => {
      setErrorMsg("Erro ao carregar imagem do dispositivo.");
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleProcessFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleProcessFile(files[0]);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto("");
    setPhotoFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("O nome do colaborador é obrigatório.");
      return;
    }
    if (!role.trim()) {
      setErrorMsg("A função ou cargo é obrigatório.");
      return;
    }
    if (!photo) {
      setErrorMsg("Por favor, selecione uma foto para o colaborador.");
      return;
    }
    if (!socialUrl.trim()) {
      setErrorMsg("Informe o link da rede social ou portfólio.");
      return;
    }

    setLoading(true);

    const social: CollaboratorSocial = {
      platform,
      url: socialUrl.trim(),
      handle: socialHandle.trim() || undefined,
    };

    try {
      if (isEditing && initialCollaborator) {
        updateCollaborator(initialCollaborator.id, {
          name: name.trim().toUpperCase(),
          role: role.trim().toUpperCase(),
          photo: photo.trim(),
          bio: bio.trim() || undefined,
          accentColor,
          social,
        });
        setSuccessMsg("Colaborador atualizado com sucesso!");
      } else {
        addCollaborator({
          name: name.trim().toUpperCase(),
          role: role.trim().toUpperCase(),
          photo: photo.trim(),
          bio: bio.trim() || undefined,
          accentColor,
          social,
        });
        setSuccessMsg("Colaborador cadastrado com sucesso!");
      }

      setTimeout(() => {
        router.push("/admin/colaboradores");
      }, 700);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Erro ao salvar colaborador.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#222222] pb-16">
      {/* ── Top Bar ── */}
      <div className="px-4 sm:px-8 lg:px-12 pt-7">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <Breadcrumbs
            items={[
              { label: "Painel", href: "/admin" },
              { label: "Colaboradores", href: "/admin/colaboradores" },
              { label: isEditing ? "Editar Colaborador" : "Novo Colaborador" },
            ]}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="flex flex-col gap-1">
              <h1
                className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {isEditing ? "Editar Colaborador" : "Cadastrar Novo Colaborador"}
              </h1>
              <p
                className="text-xs sm:text-sm text-[#756F67]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Preencha os dados do profissional ou voluntário que atua no Ponto de Cultura Zambô.
              </p>
            </div>

            <Link
              href="/admin/colaboradores"
              className="inline-flex items-center gap-2 self-start sm:self-center px-3.5 py-2 rounded-lg bg-white border border-[#E2DDD3] text-[#222222] text-xs font-semibold hover:bg-[#F2ECE1] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar à listagem
            </Link>
          </div>
        </div>
      </div>

      {/* ── Formulário ── */}
      <div className="px-4 sm:px-8 lg:px-12 pt-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white rounded-xl border border-[#E2DDD3] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          {/* Faixa decorativa Pan-Africana com a cor selecionada */}
          <div
            className="w-full h-1.5 transition-colors duration-300"
            style={{ background: accentColor }}
          />

          <div className="p-6 sm:p-8 flex flex-col gap-6">
            {errorMsg && (
              <div
                className="p-3.5 rounded-lg bg-[#FDF2F0] border border-[#F3B7B1] text-[#C02D1D] text-xs font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div
                className="p-3.5 rounded-lg bg-[#EAF5EC] border border-[#A7D9B4] text-[#166832] text-xs font-semibold flex items-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Check className="w-4 h-4" />
                {successMsg} Redirecionando...
              </div>
            )}

            {/* Linha 1: Nome e Cargo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold uppercase tracking-wider text-[#3A352F]"
                  style={inputStyle}
                >
                  Nome Completo <span className="text-[#dd341f]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: DANILO ALVES"
                  className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#D9D3C7] text-sm text-[#222222] placeholder:text-[#9A9388] focus:outline-none focus:ring-2 focus:ring-[#f8ba01] focus:border-transparent"
                  style={inputStyle}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold uppercase tracking-wider text-[#3A352F]"
                  style={inputStyle}
                >
                  Função / Atuação <span className="text-[#dd341f]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex: DESENVOLVEDOR WEB & VOLUNTÁRIO"
                  className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#D9D3C7] text-sm text-[#222222] placeholder:text-[#9A9388] focus:outline-none focus:ring-2 focus:ring-[#f8ba01] focus:border-transparent"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Linha 2: Upload de Imagem do Dispositivo e Pré-visualização */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-bold uppercase tracking-wider text-[#3A352F]"
                style={inputStyle}
              >
                Foto de Perfil <span className="text-[#dd341f]">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
                {/* Área de Seleção / Dropzone */}
                <div className="sm:col-span-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="collaborator-photo-upload"
                  />

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                      isDragging
                        ? "border-[#f8ba01] bg-[#FAF4E6]"
                        : photo
                          ? "border-[#A7D9B4] bg-[#F4FBF6]"
                          : "border-[#D9D3C7] bg-[#FAF7F0] hover:border-[#121212] hover:bg-[#F2ECE1]"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        photo
                          ? "bg-[#1a7d3c]/15 text-[#1a7d3c]"
                          : "bg-[#f8ba01]/20 text-[#121212]"
                      }`}
                    >
                      {photo ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <UploadCloud className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-xs font-bold text-[#222222]"
                        style={inputStyle}
                      >
                        {photo
                          ? "Clique para escolher outra imagem"
                          : "Clique para selecionar foto do seu dispositivo"}
                      </span>
                      <span className="text-[11px] text-[#756F67]" style={inputStyle}>
                        ou arraste e solte o arquivo aqui (JPG, PNG ou WebP até 5MB)
                      </span>
                      {photoFileName && (
                        <span className="text-[11px] font-semibold text-[#1a7d3c] mt-1 truncate max-w-xs">
                          Arquivo: {photoFileName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pré-visualização Circular */}
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <span
                    className="text-xs font-bold uppercase tracking-wider text-[#756F67]"
                    style={inputStyle}
                  >
                    Pré-visualização
                  </span>

                  <div className="relative group">
                    <div
                      className="w-24 h-24 rounded-full overflow-hidden p-1 bg-white"
                      style={{
                        border: "3px solid #121212",
                        boxShadow: "2.5px 2.5px 0px #121212",
                      }}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden relative bg-[#FAF7F0] flex items-center justify-center">
                        {photo ? (
                          <ImageWithFallback
                            src={photo}
                            alt="Pré-visualização da foto"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-[#B5AEA2]" />
                        )}
                      </div>
                    </div>

                    {photo && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePhoto();
                        }}
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#dd341f] text-white flex items-center justify-center border border-[#121212] shadow-sm hover:scale-110 transition-transform cursor-pointer"
                        title="Remover imagem"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Linha 3: Bio / Descrição */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold uppercase tracking-wider text-[#3A352F]"
                style={inputStyle}
              >
                Breve Biografia / Contribuição
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Ex: Responsável pelo suporte e modernização das plataformas digitais e do Portal da Transparência da Zambô."
                className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#D9D3C7] text-sm text-[#222222] placeholder:text-[#9A9388] focus:outline-none focus:ring-2 focus:ring-[#f8ba01] focus:border-transparent resize-y"
                style={inputStyle}
              />
            </div>

            {/* Linha 4: Cor Pan-Africana de Destaque */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-bold uppercase tracking-wider text-[#3A352F]"
                style={inputStyle}
              >
                Cor Pan-Africana de Destaque
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ACCENT_COLORS.map((c) => {
                  const selected = accentColor === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setAccentColor(c.value)}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        selected
                          ? "bg-[#FAF7F0] border-[#121212] shadow-[2px_2px_0px_#121212]"
                          : "bg-white border-[#E2DDD3] hover:border-[#B5AEA2]"
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full shrink-0 border border-black/20"
                        style={{ background: c.color }}
                      />
                      <span
                        className="text-xs font-bold text-[#222222]"
                        style={inputStyle}
                      >
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divisor */}
            <div className="h-px w-full bg-[#E2DDD3]" />

            {/* Seção Redes Sociais */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f8ba01]" />
                <h3
                  className="text-sm font-bold uppercase tracking-wider text-[#222222]"
                  style={inputStyle}
                >
                  Rede Social Principal (Botão do Card)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold text-[#554F48]"
                    style={inputStyle}
                  >
                    Plataforma
                  </label>
                  <select
                    value={platform}
                    onChange={(e) =>
                      setPlatform(e.target.value as SocialPlatform)
                    }
                    className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#D9D3C7] text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#f8ba01]"
                    style={inputStyle}
                  >
                    {SOCIAL_PLATFORMS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold text-[#554F48]"
                    style={inputStyle}
                  >
                    Link Completo (URL) <span className="text-[#dd341f]">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={socialUrl}
                    onChange={(e) => setSocialUrl(e.target.value)}
                    placeholder="https://instagram.com/usuario"
                    className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#D9D3C7] text-sm text-[#222222] placeholder:text-[#9A9388] focus:outline-none focus:ring-2 focus:ring-[#f8ba01] font-mono text-xs"
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold text-[#554F48]"
                    style={inputStyle}
                  >
                    Identificador / Handle (Opcional)
                  </label>
                  <input
                    type="text"
                    value={socialHandle}
                    onChange={(e) => setSocialHandle(e.target.value)}
                    placeholder="Ex: @usuario ou in/nome"
                    className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#D9D3C7] text-sm text-[#222222] placeholder:text-[#9A9388] focus:outline-none focus:ring-2 focus:ring-[#f8ba01]"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#E2DDD3]">
              <Link
                href="/admin/colaboradores"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[#D9D3C7] text-xs font-bold text-[#554F48] hover:bg-[#F2ECE1] transition-colors text-center"
                style={inputStyle}
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#f8ba01] text-[#121212] text-xs font-extrabold uppercase tracking-wider border-2 border-[#121212] shadow-[2.5px_2.5px_0px_#121212] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
                style={inputStyle}
              >
                {loading
                  ? "Salvando..."
                  : isEditing
                    ? "Salvar Alterações"
                    : "Cadastrar Colaborador"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
