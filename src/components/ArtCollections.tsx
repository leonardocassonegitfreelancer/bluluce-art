import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import { categoryPath } from "@/i18n/slugs";

import ninfePictureImg from "@/assets/Ninfe picture for the home.webp";
import scorciImg from "@/assets/scorci_mediterraneo.webp";
import oliveSunImg from "@/assets/olive_sun.webp";
import InteractivePainting from "./InteractivePainting";
import GalleryBackground from "./GalleryBackground";

const copy: Record<Lang, {
  label: string;
  title: string;
  intro: string;
  collections: {
    num: string;
    title: string;
    desc: string;
    tag: string;
  }[];
}> = {
  it: {
    label: "Le Nostre Opere",
    title: "Le Collezioni d'Arte",
    intro: "Dipinti originali ispirati alla luce, alle donne e ai paesaggi del Mediterraneo. Opere uniche dipinte a mano dalla pittrice Bluluce.",
    collections: [
      {
        num: "01",
        title: "Le Ninfe del Mediterraneo",
        desc: "Donne tra le onde, bagnanti sospese nella luce del Mediterraneo. Dipinti originali che catturano la grazia del corpo femminile immerso nel mare.",
        tag: "Figure & Luce",
      },
      {
        num: "02",
        title: "Scorci del Mediterraneo",
        desc: "Porti silenziosi, coste frastagliate, tramonti sul mare. Vedute mediterranee dipinte a mano che portano il profumo della Spagna nella tua casa.",
        tag: "Coste & Orizzonti",
      },
      {
        num: "03",
        title: "Le Meraviglie di Nettuno",
        desc: "Solo il mare. L'orizzonte infinito, le onde, i riflessi dorati del sole sull'acqua. Opere essenziali per chi ama il Mediterraneo nella sua forma più pura.",
        tag: "Mare & Colore",
      },
    ],
  },
  en: {
    label: "Our Works",
    title: "The Fine Art Collections",
    intro: "Original paintings inspired by the light, women and landscapes of the Mediterranean. Unique hand-painted works by artist Bluluce.",
    collections: [
      {
        num: "01",
        title: "Nymphs of the Mediterranean",
        desc: "Women among the waves, bathers suspended in the Mediterranean light. Original paintings capturing the grace of the female figure immersed in the sea.",
        tag: "Figures & Light",
      },
      {
        num: "02",
        title: "Mediterranean Glimpses",
        desc: "Quiet harbours, rugged coastlines, sunsets over the sea. Hand-painted Mediterranean views that bring the scent of Spain into your home.",
        tag: "Coasts & Horizons",
      },
      {
        num: "03",
        title: "Wonders of Neptune",
        desc: "Just the sea. The infinite horizon, the waves, the golden reflections of the sun on the water. Essential works for those who love the Mediterranean in its purest form.",
        tag: "Sea & Colour",
      },
    ],
  },
  es: {
    label: "Nuestras Obras",
    title: "Las Colecciones de Arte",
    intro: "Pinturas originales inspiradas en la luz, las mujeres y los paisajes del Mediterráneo. Obras únicas pintadas a mano por la artista Bluluce.",
    collections: [
      {
        num: "01",
        title: "Las Ninfas del Mediterráneo",
        desc: "Mujeres entre las olas, bañistas suspendidas en la luz del Mediterráneo. Pinturas originales que capturan la gracia de la figura femenina sumergida en el mar.",
        tag: "Figuras & Luz",
      },
      {
        num: "02",
        title: "Rincones del Mediterráneo",
        desc: "Puertos silenciosos, costas escarpadas, atardeceres sobre el mar. Vistas mediterráneas pintadas a mano que traen el aroma de España a tu hogar.",
        tag: "Costas & Horizontes",
      },
      {
        num: "03",
        title: "Las Maravillas de Neptuno",
        desc: "Solo el mar. El horizonte infinito, las olas, los reflejos dorados del sol en el agua. Obras esenciales para quienes aman el Mediterráneo en su forma más pura.",
        tag: "Mar & Color",
      },
    ],
  },
};

export default function ArtCollections() {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.es;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          cardsObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (cardsRef.current) cardsObserver.observe(cardsRef.current);

    return () => {
      headerObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  const images = [ninfePictureImg, scorciImg, oliveSunImg];

  return (
    <section
      id="shop"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #FCFAF5 0%, #F3EFE6 100%)",
        position: "relative"
      }}
      className="py-24 md:py-36 px-6 md:px-8 overflow-hidden scroll-mt-28"
    >
      {/* === Animated Gallery Background: floating golden dust + volumetric light beams === */}
      <GalleryBackground />

      {/* Plaster / Canvas fine wall texture for tangible museum feel */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef} 
          className={`text-center mb-20 md:mb-28 transition-all duration-1000 ease-out ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-[30px] opacity-0"
          }`}
        >
          <span
            className="font-bebas text-[#B5915D] tracking-[0.24em] block mb-4"
            style={{ fontSize: "0.75rem" }}
          >
            {t.label}
          </span>
          <h2
            className="font-display font-normal italic text-[#1E1A16] leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            {t.title}
          </h2>
          <div className="w-12 h-[2px] bg-[#B5915D] mx-auto mt-6" />
          <p className="font-body text-[#4E4A44]/70 text-sm md:text-base leading-relaxed mt-6 max-w-xl mx-auto">
            {t.intro}
          </p>
        </div>

        {/* Staggered Editorial Layout */}
        <div ref={cardsRef} className="flex flex-col gap-24 md:gap-36">
          {/* Card 1: Wide Layout Left */}
          <div 
            className={`collection-card grid md:grid-cols-12 gap-8 md:gap-12 items-center transition-all duration-[1200ms] ease-out ${
              cardsVisible ? "translate-y-0 opacity-100" : "translate-y-[60px] opacity-0"
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            <div 
              className="md:col-span-7 overflow-hidden relative group w-full aspect-[1/1] md:aspect-[1/1]"
              style={{
                border: "4px solid #B5915D",
                outline: "1px solid rgba(138, 106, 62, 0.4)",
                boxShadow: "0 30px 80px -20px rgba(15,10,7,0.18), 0 0 40px rgba(181,145,93,0.05), inset 0 0 15px rgba(0,0,0,0.1)"
              }}
            >
              {/* Inner Gold Fillet Gallery Line (Clair Obscur double-frame detail) */}
              <div className="absolute inset-1 border border-[#B5915D]/30 pointer-events-none z-30" />

              <InteractivePainting
                imageSrc={images[0].src}
                alt={t.collections[0].title}
                theme="mare"
              />
              
              {/* Premium museum anti-reflective glass / wet varnish permanent subtle glossy sheen */}
              <div 
                className="absolute inset-0 z-30 pointer-events-none opacity-[0.16] transition-opacity duration-700 group-hover:opacity-[0.24]" 
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 100%)",
                  mixBlendMode: "overlay"
                }}
              />
              {/* Dynamic Glossy Specular Sheen Sweep on hover */}
              <div 
                className="absolute inset-y-0 left-0 z-30 pointer-events-none transform -translate-x-[200%] skew-x-[-30deg] group-hover:translate-x-[250%] transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)",
                  width: "50%"
                }}
              />
            </div>
            <div className="md:col-span-5 flex flex-col items-start md:pl-6">
              <span className="font-bebas text-[#B5915D] text-2xl tracking-widest mb-2 block">
                {t.collections[0].num}
              </span>
              <h3 className="font-display font-normal text-2xl md:text-3xl text-[#1E1A16] mb-4 italic">
                {t.collections[0].title}
              </h3>
              <p className="font-body text-[#4E4A44] text-sm md:text-base leading-relaxed mb-6 max-w-md">
                {t.collections[0].desc}
              </p>
              <a
                href={categoryPath(lang as Lang, "mare")}
                className="font-bebas text-[0.7rem] tracking-[0.25em] text-[#B5915D] border-b border-[#B5915D]/30 pb-1 transition-all duration-300 hover:border-[#1E1A16] hover:text-[#1E1A16]"
              >
                {lang === "it" ? "ESPLORA LA COLLEZIONE →" : lang === "en" ? "EXPLORE COLLECTION →" : "EXPLORAR LA COLECCIÓN →"}
              </a>
            </div>
          </div>

          {/* Card 2: Wide Layout Right Staggered */}
          <div 
            className={`collection-card grid md:grid-cols-12 gap-8 md:gap-12 items-center transition-all duration-[1200ms] ease-out ${
              cardsVisible ? "translate-y-0 opacity-100" : "translate-y-[60px] opacity-0"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div 
              className="md:col-span-7 md:order-2 overflow-hidden relative group w-full aspect-[1/1] md:aspect-[1/1]"
              style={{
                border: "4px solid #B5915D",
                outline: "1px solid rgba(138, 106, 62, 0.4)",
                boxShadow: "0 30px 80px -20px rgba(15,10,7,0.18), 0 0 40px rgba(181,145,93,0.05), inset 0 0 15px rgba(0,0,0,0.1)"
              }}
            >
              {/* Inner Gold Fillet Gallery Line (Clair Obscur double-frame detail) */}
              <div className="absolute inset-1 border border-[#B5915D]/30 pointer-events-none z-30" />

              <InteractivePainting
                imageSrc={images[1].src}
                alt={t.collections[1].title}
                theme="terra"
              />
              
              {/* Premium museum anti-reflective glass / wet varnish permanent subtle glossy sheen */}
              <div 
                className="absolute inset-0 z-30 pointer-events-none opacity-[0.16] transition-opacity duration-700 group-hover:opacity-[0.24]" 
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 100%)",
                  mixBlendMode: "overlay"
                }}
              />
              {/* Dynamic Glossy Specular Sheen Sweep on hover */}
              <div 
                className="absolute inset-y-0 left-0 z-30 pointer-events-none transform -translate-x-[200%] skew-x-[-30deg] group-hover:translate-x-[250%] transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)",
                  width: "50%"
                }}
              />
            </div>
            <div className="md:col-span-5 md:order-1 flex flex-col items-start md:pr-6">
              <span className="font-bebas text-[#B5915D] text-2xl tracking-widest mb-2 block">
                {t.collections[1].num}
              </span>
              <h3 className="font-display font-normal text-2xl md:text-3xl text-[#1E1A16] mb-4 italic">
                {t.collections[1].title}
              </h3>
              <p className="font-body text-[#4E4A44] text-sm md:text-base leading-relaxed mb-6 max-w-md">
                {t.collections[1].desc}
              </p>
              <a
                href={categoryPath(lang as Lang, "terra")}
                className="font-bebas text-[0.7rem] tracking-[0.25em] text-[#B5915D] border-b border-[#B5915D]/30 pb-1 transition-all duration-300 hover:border-[#1E1A16] hover:text-[#1E1A16]"
              >
                {lang === "it" ? "ESPLORA LA COLLEZIONE →" : lang === "en" ? "EXPLORE COLLECTION →" : "EXPLORAR LA COLECCIÓN →"}
              </a>
            </div>
          </div>

          {/* Card 3: Wide Layout Left */}
          <div 
            className={`collection-card grid md:grid-cols-12 gap-8 md:gap-12 items-center transition-all duration-[1200ms] ease-out ${
              cardsVisible ? "translate-y-0 opacity-100" : "translate-y-[60px] opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div 
              className="md:col-span-7 overflow-hidden relative group w-full aspect-[4/3] md:aspect-[16/10]" 
              style={{ 
                border: "4px solid #B5915D", // Solid ornate gold museum frame edge
                outline: "1px solid rgba(138, 106, 62, 0.4)", // Outer metallic gold border
                boxShadow: "0 30px 80px -20px rgba(15,10,7,0.18), 0 0 40px rgba(181,145,93,0.05), inset 0 0 15px rgba(0,0,0,0.1)" 
              }}
            >
              {/* Inner Gold Fillet Gallery Line (Clair Obscur double-frame detail) */}
              <div className="absolute inset-1 border border-[#B5915D]/30 pointer-events-none z-30" />

              <InteractivePainting
                imageSrc={images[2].src}
                alt={t.collections[2].title}
                theme="ulivo"
              />
              
              {/* Premium museum anti-reflective glass / wet varnish permanent subtle glossy sheen */}
              <div 
                className="absolute inset-0 z-30 pointer-events-none opacity-[0.16] transition-opacity duration-700 group-hover:opacity-[0.24]" 
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 100%)",
                  mixBlendMode: "overlay"
                }}
              />
              {/* Dynamic Glossy Specular Sheen Sweep on hover */}
              <div 
                className="absolute inset-y-0 left-0 z-30 pointer-events-none transform -translate-x-[200%] skew-x-[-30deg] group-hover:translate-x-[250%] transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)",
                  width: "50%"
                }}
              />
              <div 
                className="absolute top-4 left-4 z-30 bg-[#FAF9F6]/95 backdrop-blur-md px-4 py-1.5 text-[10px] font-bebas tracking-[0.18em] text-[#B5915D] pointer-events-none border border-[#B5915D]/30" 
                style={{ boxShadow: "0 4px 15px rgba(15,10,7,0.06)" }}
              >
                {t.collections[2].tag}
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col items-start md:pl-6">
              <span className="font-bebas text-[#B5915D] text-2xl tracking-widest mb-2 block">
                {t.collections[2].num}
              </span>
              <h3 className="font-display font-normal text-2xl md:text-3xl text-[#1E1A16] mb-4 italic">
                {t.collections[2].title}
              </h3>
              <p className="font-body text-[#4E4A44] text-sm md:text-base leading-relaxed mb-6 max-w-md">
                {t.collections[2].desc}
              </p>
              <a
                href={categoryPath(lang as Lang, "ulivo")}
                className="font-bebas text-[0.7rem] tracking-[0.25em] text-[#B5915D] border-b border-[#B5915D]/30 pb-1 transition-all duration-300 hover:border-[#1E1A16] hover:text-[#1E1A16]"
              >
                {lang === "it" ? "ESPLORA LA COLLEZIONE →" : lang === "en" ? "EXPLORE COLLECTION →" : "EXPLORAR LA COLECCIÓN →"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
