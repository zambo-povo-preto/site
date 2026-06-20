import { ZamboFooter } from "@/components/ZamboFooter";
import { ZamboNavbar } from "@/components/ZamboNavbar";
import { Transparencia } from "./Transparencia";

export default function TransparenciaPage() {
  return (
    <div className="min-h-screen w-full">
      <ZamboNavbar />
      <Transparencia />
      <ZamboFooter />
    </div>
  );
}
