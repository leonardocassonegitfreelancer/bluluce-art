import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { AboutV2 } from "@/components/AboutV2";
import CategoriesHorizontal from "@/components/CategoriesHorizontal";
import QuoteSection from "@/components/QuoteSection";
import OrnamentDivider from "@/components/OrnamentDivider";
import HoursSection from "@/components/HoursSection";
import InsideSection from "@/components/InsideSection";
import Reviews from "@/components/Reviews";

import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  useEffect(() => {
    const hash = sessionStorage.getItem("scrollToHash") || window.location.hash?.slice(1);
    if (hash) {
      sessionStorage.removeItem("scrollToHash");
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 800);
    }
  }, []);

  return (
    <div style={{ background: "#0E0804" }}>
      <Navbar />
      <main>
        <AboutV2 />
        <CategoriesHorizontal />
        <div style={{ height: "3px", background: "#0E0804" }} />
        <QuoteSection />
        <OrnamentDivider />
        <Reviews />
        <InsideSection />
        <HoursSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
