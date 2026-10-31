import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CollaboratorsSection } from "@/components/sections/colaboradores/CollaboratorsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colaboradores - Zambô | Ponto de Cultura",
  description:
    "Conheça os profissionais, artistas, voluntários e parceiros que colaboram e fortalecem o Ponto de Cultura Zambô do Movimento Negro em Caraguatatuba-SP.",
};

export default function ColaboradoresPage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      <Navbar />
      <CollaboratorsSection />
      <Footer />
    </div>
  );
}