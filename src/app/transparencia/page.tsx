import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TransparencyDetailSection } from "@/components/sections/transparencia/TransparencyDetailSection";

export default function TransparenciaPage() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <TransparencyDetailSection />
      <Footer />
    </div>
  );
}
