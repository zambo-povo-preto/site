import { ZamboFooter } from "@/components/ZamboFooter";
import { Transparencia } from "./Transparencia";
import { ZamboNavbar } from "@/components/ZamboNavbar";

export default function TransparenciaPage() {
  return (
    <div className="min-h-screen w-full">
      <ZamboNavbar />
      <Transparencia />
      <ZamboFooter />
    </div>
  );
}
