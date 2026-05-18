import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-deli-new.webp";
import logoImage from "@/assets/logo-lalimentari.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";

const Hero = () => {
  const { lang } = useLanguage();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `scale(1.15) translateY(${scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen h-auto flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-[center_70%] scale-[1.15] will-change-transform transition-transform duration-75"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 140px 50px rgba(0,0,0,0.35)' }} />

      {/* Mobile: stacked centered layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 md:py-32 md:hidden">
        <div className="text-center">
          <div className="w-12 h-px bg-gold/60 mx-auto mb-6 animate-fade-in-up opacity-0" />

          <p
            className="font-body text-[0.75rem] tracking-[0.25em] uppercase text-white/80 mb-4 animate-fade-in-up [animation-delay:100ms] opacity-0"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.7)' }}
          >
            {th("heroSubtitle", lang)}
          </p>

          <div className="animate-fade-in-up [animation-delay:250ms] opacity-0 mb-5 bg-[hsl(38,30%,78%)]">
            <img
              src={logoImage}
              alt="LALIMENTARI - Gastronomia Italiana"
              className="w-full block"
            />
            <h1 className="sr-only">LALIMENTARI - Gastronomia Italiana</h1>
          </div>

          <div className="flex items-center justify-center gap-3 mb-5 animate-fade-in-up [animation-delay:350ms] opacity-0">
            <div className="w-8 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-gold/50" />
            <div className="w-8 h-px bg-gold/40" />
          </div>

          <p
            className="font-body text-[1.05rem] text-white/90 leading-relaxed animate-fade-in-up [animation-delay:450ms] opacity-0 max-w-2xl mx-auto"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.7)' }}
          >
            {th("heroTagline", lang)}
          </p>

          <div className="flex flex-col gap-3 mt-8 animate-fade-in-up [animation-delay:650ms] opacity-0">
            <a
              href="tel:+37060000000"
              className="w-full px-8 py-3.5 bg-gold text-espresso font-body text-[0.8rem] tracking-widest uppercase hover:bg-gold/90 transition-all duration-500 font-semibold text-center"
            >
              {th("heroBookTable", lang)}
            </a>
            <a
              href={`/${lang}/menu`}
              className="w-full px-8 py-3.5 border border-gold/70 text-gold font-body text-[0.8rem] tracking-widest uppercase hover:bg-gold/10 hover:border-gold transition-all duration-500 text-center backdrop-blur-sm"
            >
              {th("heroMenu", lang)}
            </a>
          </div>
        </div>
      </div>

      {/* Desktop: two-column layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32 hidden md:block">
        <div className="grid grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column: logo image */}
          <div className="animate-fade-in-up [animation-delay:250ms] opacity-0 bg-[hsl(38,30%,78%)]">
            <img
              src={logoImage}
              alt="LALIMENTARI - Gastronomia Italiana"
              className="w-full block"
            />
            <h1 className="sr-only">LALIMENTARI - Gastronomia Italiana</h1>
          </div>

          {/* Right column: text + buttons */}
          <div>
            <div className="w-12 h-px bg-gold/60 mb-6 animate-fade-in-up opacity-0" />

            <p
              className="font-body text-xs tracking-[0.5em] uppercase text-white/80 mb-6 animate-fade-in-up [animation-delay:100ms] opacity-0"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.7)' }}
            >
              {th("heroSubtitle", lang)}
            </p>

            <div className="flex items-center gap-3 mb-6 animate-fade-in-up [animation-delay:350ms] opacity-0">
              <div className="w-8 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 rotate-45 border border-gold/50" />
              <div className="w-8 h-px bg-gold/40" />
            </div>

            <p
              className="font-body text-xl lg:text-2xl text-white/90 leading-relaxed animate-fade-in-up [animation-delay:450ms] opacity-0 max-w-lg"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.7)' }}
            >
              {th("heroTagline", lang)}
            </p>

            <div className="flex flex-row gap-5 mt-10 animate-fade-in-up [animation-delay:650ms] opacity-0">
              <a
                href="tel:+37060000000"
                className="px-10 py-3.5 bg-gold text-espresso font-body text-sm tracking-widest uppercase hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(180,140,60,0.3)] transition-all duration-500 font-semibold text-center"
              >
                {th("heroBookTable", lang)}
              </a>
              <a
                href={`/${lang}/menu`}
                className="px-10 py-3.5 border border-gold/70 text-gold font-body text-sm tracking-widest uppercase hover:bg-gold/10 hover:border-gold transition-all duration-500 text-center backdrop-blur-sm"
              >
                {th("heroMenu", lang)}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animated scroll down arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a href="#about" className="text-white/70 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
