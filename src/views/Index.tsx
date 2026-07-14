import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWorks from "@/components/FeaturedWorks";
import VideoShowcase from "@/components/VideoShowcase";
import AboutTeaser from "@/components/AboutTeaser";
import CommissionsTeaser from "@/components/CommissionsTeaser";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
const Index = () => {
  return (
    <div style={{ background: "#FAFAF8" }}>
      <Navbar />
      <main>
        <Hero />
        <FeaturedWorks />
        <VideoShowcase />
        <AboutTeaser />
        <CommissionsTeaser />
      </main>

      <div>
        <InterestForm />
        <Footer />
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Index;

