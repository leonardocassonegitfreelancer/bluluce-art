import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";

const meta = {
  title: {
    es: "Galería de Arte | BLULUCE ART – Pinturas abstractas originales",
    en: "Art Gallery | BLULUCE ART – Original abstract paintings",
    it: "Galleria d'Arte | BLULUCE ART – Dipinti astratti originali",
  },
  desc: {
    es: "Explore la galería digital de BLULUCE ART. Pinturas originales y colecciones de arte inspiradas en el mar y los colores del Mediterráneo.",
    en: "Explore the digital gallery of BLULUCE ART. Original paintings and art collections inspired by the sea and colors of the Mediterranean.",
    it: "Esplora la galleria digitale di BLULUCE ART. Dipinti originali e collezioni d'arte ispirati al mare e ai colori del Mediterraneo.",
  }
};

export default function GalleryView() {
  const { lang } = useLanguage();
  const l = (lang as Lang) ?? "es";

  return (
    <div style={{ background: "#0E0804", minHeight: "100vh" }}>
      <SEO
        title={meta.title[l]}
        description={meta.desc[l]}
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
