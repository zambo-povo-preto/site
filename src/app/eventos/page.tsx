import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { EventsSection } from "@/components/sections/eventos/EventsSection";

export default function ContatoPage() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <EventsSection/>
      <Footer />
    </div>
  );
}
