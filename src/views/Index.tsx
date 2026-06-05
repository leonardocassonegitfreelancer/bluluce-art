import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GalleryHall from "@/components/GalleryHall";
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
        <GalleryHall mode="section" lang={lang} />
        <VideoShowcase />
        <InterestForm />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;

