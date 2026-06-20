import { ZamboFooter } from "@/components/ZamboFooter";
import { ZamboNavbar } from "@/components/ZamboNavbar";
import { Historia } from "./Historia";

export default function HistoriaPage() {
  return (
    <div className="min-h-screen w-full">
      <ZamboNavbar />
      <Historia />
      <ZamboFooter />
    </div>
  );
}
