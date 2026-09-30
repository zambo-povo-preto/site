import { Footer } from "@/components/layout/Footer";
import { EventsSection } from "@/components/sections/eventos/EventsSection";
import { Navbar } from "@/components/layout/Navbar";

export default function EventosPage() {
    return(
        <div className="min-h-screen- w-full">
            <Navbar />
            <EventsSection />
            <Footer />
        </div>
    )

}