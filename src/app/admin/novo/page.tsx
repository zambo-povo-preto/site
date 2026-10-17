import { redirect } from "next/navigation";

export default function LegacyNewPageRedirect() {
  redirect("/admin/relatorios/novo");
}
