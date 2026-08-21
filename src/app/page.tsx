import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { HistoryIntroSection } from "@/components/sections/home/HistoryIntroSection";
import { HistorySection } from "@/components/sections/home/HistorySection";
import { PillarsSection } from "@/components/sections/home/PillarsSection";
import { SupportersSection } from "@/components/sections/home/SupportersSection";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Navbar overlaid />
      <HeroSection />
      <HistoryIntroSection />
      <HistorySection />
      <PillarsSection />
      <SupportersSection />
      <Footer />
    </div>
  );
}
