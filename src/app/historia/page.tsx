import { ZamboFooter } from "@/components/ZamboFooter";
import { Historia } from "./Historia";
import { ZamboNavbar } from "@/components/ZamboNavbar";

export default function HistoriaPage() {
  return (
    <div className="min-h-screen w-full">
      <ZamboNavbar overlaid />
      <Historia />
      <ZamboFooter />
    </div>
  );
}
