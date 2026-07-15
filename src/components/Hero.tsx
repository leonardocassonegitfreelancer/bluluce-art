import { useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import { productsSlug } from "@/i18n/slugs";
import heroVideo from "@/assets/mare.mp4?url";
import heroPoster from "@/assets/mare-poster.webp?url";

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
    cta2: "Sobre mí",
  },
  en: {
    line1: "Where the sea",
    highlight: "meets",
    line2: "art.",
    desc: "Original paintings inspired by the light, women and landscapes of the Mediterranean. Unique hand-painted works of art.",
    cta1: "Shop Collection",
    cta2: "About me",
  },
  it: {
    line1: "Dove il mare",
    highlight: "incontra",
    line2: "l'arte.",
    desc: "Dipinti originali ispirati alla luce, alle donne e ai paesaggi del Mediterraneo. Opere uniche dipinte a mano.",
    cta1: "Scopri la Collezione",
    cta2: "Chi sono",
  },
};

const Hero = () => {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.es;

  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (videoWrapRef.current)
          videoWrapRef.current.style.transform =
            `translateY(${window.scrollY * 0.3}px)`;
        rafId = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const prefix = `/${lang}`;
  const collectionUrl = `${prefix}/${productsSlug[lang as Lang] || productsSlug.es}`;
  const aboutUrl = `${prefix}/about`;

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

      {/* ─── MOBILE ONLY: full-screen video overlay ─── */}
      <section className="md:hidden relative h-[100dvh] flex flex-col overflow-hidden bg-[#0E0804]">

        <div ref={videoWrapRef} className="absolute will-change-transform"
          style={{ inset: "-20%" }}>
          <video autoPlay muted loop playsInline
            className="w-full h-full object-cover"
            style={{ filter: "brightness(1.08) saturate(1.1)" }}
            poster={heroPoster}
            src={heroVideo} />
        </div>

        {/* Gradient overlays to darken edges for text readability */}
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
            <a href={aboutUrl}
              className="inline-flex items-center px-7 py-3.5 font-body text-[0.6rem] tracking-[0.3em] uppercase transition-all duration-700 active:scale-[0.98]"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.75)" }}>
              {t.cta2}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
