"use client";

import { CollaboratorForm } from "@/components/admin/CollaboratorForm";
import { useCollaborators } from "@/contexts/CollaboratorsContext";
import { useParams } from "next/navigation";

export default function AdminEditarCollaboratorPage() {
  const params = useParams();
  const id = params?.id as string;
  const { getCollaborator, loading } = useCollaborators();

  const collaborator = getCollaborator(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EA] flex items-center justify-center p-8">
        <span className="text-xs font-semibold text-[#756F67]">
          Carregando colaborador...
        </span>
      </div>
    );
  }

  if (!collaborator) {
    return (
      <div className="min-h-screen bg-[#F7F3EA] flex flex-col items-center justify-center gap-3 p-8">
        <span className="text-base font-bold text-[#222222]">
          Colaborador não encontrado
        </span>
        <p className="text-xs text-[#756F67]">
          O colaborador solicitado não existe ou foi removido.
        </p>
      </div>
    );
  }

  return <CollaboratorForm initialCollaborator={collaborator} />;
}

