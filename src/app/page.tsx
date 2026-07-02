import { HistoryBanner } from "@/components/HistoryBanner";
import { ZamboApoiadores } from "@/components/ZamboApoiadores";
import { ZamboFooter } from "@/components/ZamboFooter";
import { ZamboHero } from "@/components/ZamboHero";
import { ZamboHistoria } from "@/components/ZamboHistoria";
import { ZamboHistoryIntro } from "@/components/ZamboHistoryIntro";
import { ZamboMembros } from "@/components/ZamboMembros";
import { ZamboNavbar } from "@/components/ZamboNavbar";
import { ZamboPillars } from "@/components/ZamboPillars";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <ZamboNavbar overlaid />
      <ZamboHero />
      <ZamboHistoryIntro />
      <ZamboHistoria />
      <ZamboPillars />
      <ZamboApoiadores />
      <ZamboFooter />
    </div>
  );
}
