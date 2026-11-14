import { CollaboratorsManagementView } from "@/components/admin/CollaboratorsManagementView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerenciar Colaboradores - Painel Zambô",
};

export default function AdminCollaboratorsPage() {
  return <CollaboratorsManagementView />;
}

