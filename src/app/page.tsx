import { ZamboApoiadores } from "@/components/ZamboApoiadores";
import { ZamboFooter } from "@/components/ZamboFooter";
import { ZamboHero } from "@/components/ZamboHero";
import { ZamboHistoria } from "@/components/ZamboHistoria";
import { ZamboHistoryIntro } from "@/components/ZamboHistoryIntro";
import { ZamboMembros } from "@/components/ZamboMembros";
import { ZamboStats } from "@/components/ZamboStats";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <ZamboHero />
      <ZamboHistoryIntro />
      <ZamboHistoria />
      <ZamboStats />
      <ZamboMembros />
      <ZamboApoiadores />
      <ZamboFooter />
    </div>
  );
}
