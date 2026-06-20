import { ZamboApoiadores } from "@/components/ZamboApoiadores";
import { ZamboFooter } from "@/components/ZamboFooter";
import { ZamboHero } from "@/components/ZamboHero";
import { ZamboHistoria } from "@/components/ZamboHistoria";
import { ZamboMembros } from "@/components/ZamboMembros";
import { ZamboStats } from "@/components/ZamboStats";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <ZamboHero />
      <ZamboStats />
      <ZamboHistoria />
      <ZamboMembros />
      <ZamboApoiadores />
      <ZamboFooter />
    </div>
  );
}
