import { redirect } from "next/navigation";

export default async function LegacyDocumentEditInvoiceRedirect({
  params,
}: {
  params: Promise<{ id: string; attachmentId: string }>;
}) {
  const { id, attachmentId } = await params;
  redirect(`/admin/relatorios/${id}/comprovantes/${attachmentId}/editar`);
}
