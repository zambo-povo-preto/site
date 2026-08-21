import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactFormSection } from "@/components/sections/contato/ContactFormSection";

export default function ContatoPage() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <ContactFormSection />
      <Footer />
    </div>
  );
}
