import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CollaboratorsSection } from "@/components/sections/colaboradores/CollaboratorsSection";

export default function ColaboradoresPage() {
    return (
        <div className="min-h-screen- w-full">
            <Navbar />
            <CollaboratorsSection/>
            <Footer />

        </div>
    );
}
