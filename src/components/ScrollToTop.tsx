import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      ref={ref}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
      style={{ backgroundColor: "#BF8A3D", boxShadow: "0 4px 20px rgba(196,96,59,0.35)" }}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" color="#FFFFFF" />
    </button>
  );
});

ScrollToTop.displayName = "ScrollToTop";

export default ScrollToTop;
