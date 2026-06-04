import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GalleryHall from "@/components/GalleryHall";
import ArtCollections from "@/components/ArtCollections";
import VideoShowcase from "@/components/VideoShowcase";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const { lang } = useLanguage();
  return (
    <div style={{ background: "#FAFAF8" }}>
      <Navbar />
      <main>
        <Hero />
        <div className="hidden md:block">
          <GalleryHall mode="section" galleryHref={`/${lang}/gallery`} />
        </div>
        <ArtCollections />
        <VideoShowcase />
        <InterestForm />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;

