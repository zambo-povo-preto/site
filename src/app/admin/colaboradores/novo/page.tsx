import { CollaboratorForm } from "@/components/admin/CollaboratorForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novo Colaborador - Painel Zambô",
};

export default function AdminNovoCollaboratorPage() {
  return <CollaboratorForm />;
}

