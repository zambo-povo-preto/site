import { redirect } from "next/navigation";

export default async function LegacyDocumentEditPageRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/admin/relatorios/${id}/editar`);
}
