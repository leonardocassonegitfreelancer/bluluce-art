import { useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import { productsSlug } from "@/i18n/slugs";
import heroVideo from "@/assets/mare.mp4?url";

const copy: Record<Lang, {
  line1: string;
  highlight: string;
  line2: string;
  desc: string;
  cta1: string;
  cta2: string;
}> = {
  es: {
    line1: "Donde el mar",
    highlight: "encuentra",
    line2: "el arte.",
    desc: "Pinturas originales inspiradas en la luz, las mujeres y los paisajes del Mediterráneo. Creaciones únicas pintadas a mano.",
    cta1: "Descubrir Colección",
    cta2: "Portfolio",
  },
  en: {
    line1: "Where the sea",
    highlight: "meets",
    line2: "art.",
    desc: "Original paintings inspired by the light, women and landscapes of the Mediterranean. Unique hand-painted works of art.",
    cta1: "Shop Collection",
    cta2: "Portfolio",
  },
  it: {
    line1: "Dove il mare",
    highlight: "incontra",
    line2: "l'arte.",
    desc: "Dipinti originali ispirati alla luce, alle donne e ai paesaggi del Mediterraneo. Opere uniche dipinte a mano.",
    cta1: "Scopri la Collezione",
    cta2: "Portfolio",
  },
};

const Hero = () => {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.es;

  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (videoWrapRef.current)
        videoWrapRef.current.style.transform =
          `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prefix = `/${lang}`;
  const collectionUrl = `${prefix}/${productsSlug[lang as Lang] || productsSlug.es}`;
  const galleryUrl = `${prefix}/gallery`;

  return (
    <>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-h1   { animation: heroFadeUp 1.2s cubic-bezier(0.25,1,0.5,1) forwards; }
        .hero-ctas { animation: heroFadeUp 1s cubic-bezier(0.25,1,0.5,1) 0.3s both; }
        .hero-desc { animation: heroFadeUp 1s cubic-bezier(0.25,1,0.5,1) 0.15s both; }
      `}</style>

      {/* ─── MOBILE: full-screen video overlay ─── */}
      <section className="md:hidden relative h-[100dvh] flex flex-col overflow-hidden bg-[#0E0804]">

        <div ref={videoWrapRef} className="absolute will-change-transform"
          style={{ inset: "-20%" }}>
          <video autoPlay muted loop playsInline
            className="w-full h-full object-cover"
            style={{ filter: "brightness(1.08) saturate(1.1)" }}
            src={heroVideo} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2240]/90 via-[#0a2240]/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#EDE0C4]/95 via-[#EDE0C4]/50 to-transparent" />

        <div className="relative z-10 flex-1 flex flex-col px-7">
          <div className="mt-[48vh]">
            <h1
              className="hero-h1 font-display font-normal italic text-white leading-[0.9]"
              style={{ fontSize: "clamp(2.8rem, 10vw, 3.8rem)", letterSpacing: "-0.02em", textShadow: "0 2px 24px rgba(0,0,0,0.65)" }}>
              {t.line1}{" "}
              <span className="not-italic font-semibold text-[#C9A96E]">{t.highlight}</span>
              <br />
              <span className="not-italic font-semibold text-[#C9A96E]">{t.line2}</span>
            </h1>
          </div>

          <div className="hero-ctas flex flex-wrap gap-3 mt-auto pb-12 pt-6">
            <a href={collectionUrl}
              className="inline-flex items-center px-7 py-3.5 font-body text-[0.6rem] tracking-[0.3em] uppercase font-bold transition-all duration-700 hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#C9A96E", color: "#0E0804" }}>
              {t.cta1}
            </a>
            <a href={galleryUrl}
              className="inline-flex items-center px-7 py-3.5 font-body text-[0.6rem] tracking-[0.3em] uppercase transition-all duration-700 active:scale-[0.98]"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.75)" }}>
              {t.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* ─── DESKTOP: split layout ─── */}
      <section className="hidden md:flex h-[100vh]" style={{ background: "#FAFAF8" }}>

        <div className="flex flex-col justify-center px-16 lg:px-24 w-[45%] shrink-0 py-32">

          <div className="w-10 h-px mb-8" style={{ background: "#C9A96E" }} />

          <h1
            className="hero-h1 font-display font-normal italic leading-[0.9] mb-6"
            style={{ fontSize: "clamp(3.2rem, 4.5vw, 5.5rem)", letterSpacing: "-0.025em", color: "#0e0804" }}>
            {t.line1}{" "}
            <span className="not-italic font-semibold" style={{ color: "#C9A96E" }}>{t.highlight}</span>
            <br />
            <span className="not-italic font-semibold" style={{ color: "#C9A96E" }}>{t.line2}</span>
          </h1>

          <p
            className="hero-desc font-body mb-9"
            style={{ maxWidth: "26rem", fontSize: "0.95rem", lineHeight: 1.7, color: "#57534e" }}
          >
            {t.desc}
          </p>

          <div className="hero-ctas flex gap-4">
            <a href={collectionUrl}
              className="inline-flex items-center px-8 py-3.5 font-body text-[0.6rem] tracking-[0.3em] uppercase font-bold transition-all duration-500 hover:opacity-80"
              style={{ background: "#0e0804", color: "#FAFAF8", textDecoration: "none" }}>
              {t.cta1}
            </a>
            <a href={galleryUrl}
              className="inline-flex items-center px-8 py-3.5 font-body text-[0.6rem] tracking-[0.3em] uppercase transition-all duration-500 hover:border-[#0e0804] hover:text-[#0e0804]"
              style={{ border: "1px solid rgba(14,8,4,0.3)", color: "rgba(14,8,4,0.6)", textDecoration: "none" }}>
              {t.cta2}
            </a>
          </div>

        </div>

        <div className="flex-1 relative overflow-hidden">
          <video autoPlay muted loop playsInline
            className="w-full h-full object-cover"
            style={{ filter: "brightness(1.05) saturate(1.08)" }}
            src={heroVideo} />
        </div>

      </section>
    </>
  );
};

export default Hero;
