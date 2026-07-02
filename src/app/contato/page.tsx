import { ZamboFooter } from "@/components/ZamboFooter";
import { ZamboNavbar } from "@/components/ZamboNavbar";
import { Contato } from "./Contato";

export default function ContatoPage() {
  return (
    <div className="min-h-screen w-full">
      <ZamboNavbar />
      <Contato />
      <ZamboFooter />
    </div>
  );
}
