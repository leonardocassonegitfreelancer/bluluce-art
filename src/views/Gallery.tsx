import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";

export default function GalleryView() {
  const { lang } = useLanguage();

  return (
    <div style={{ background: "#0E0804", minHeight: "100vh" }}>
      <SEO
        title="Galleria | LALIMENTARI – Italian Restaurant Vilnius"
        description="Scopri la nostra cucina attraverso le immagini. Pasta fresca, focacce, antipasti e l'atmosfera del nostro locale a Vilnius."
        path={`/${lang}/gallery`}
      />
      <Navbar />
      <div style={{ paddingTop: "56px" }}>
        <GallerySection />
      </div>
      <Footer />
    </div>
  );
}
