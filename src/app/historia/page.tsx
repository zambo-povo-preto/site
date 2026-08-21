import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { HistoryDetailSection } from "@/components/sections/historia/HistoryDetailSection";

export default function HistoriaPage() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <HistoryDetailSection />
      <Footer />
    </div>
  );
}
