import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GallerySection } from "@/components/sections/galeria/GallerySection";

export default function ContatoPage() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <GallerySection/>
      <Footer />
    </div>
  );
}