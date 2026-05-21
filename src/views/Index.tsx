import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ArtCollections from "@/components/ArtCollections";
import VideoShowcase from "@/components/VideoShowcase";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div style={{ background: "#FAFAF8" }}>
      <Navbar />
      <main>
        <Hero />
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

