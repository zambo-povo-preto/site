import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GallerySection } from "@/components/sections/galeria/GallerySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria - Zambô | Ponto de Cultura",
  description:
    "Explore os registros fotográficos, encontros, oficinas e celebrações do Ponto de Cultura Zambô do Movimento Negro em Caraguatatuba-SP.",
};

export default function GaleriaPage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      <Navbar />
      <GallerySection />
      <Footer />
    </div>
  );
}
