import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CuriousBanner = () => {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const titleParts: Record<string, { before: string; gold: string; after: string; line2: string; line3?: string }> = {
    it: { before: "Ogni ", gold: "piatto", after: " racconta", line2: "una storia." },
    en: { before: "Every ", gold: "dish", after: " tells", line2: "a story." },
    lt: { before: "Kiekvienas ", gold: "patiekalas", after: " pasakoja", line2: "istoriją." },
  };
  const parts = titleParts[lang] || titleParts.it;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.fromTo(
        line1Ref.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power4.out" }
      )
        .fromTo(
          line2Ref.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
          "-=0.75"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#2A1810" }} className="py-32 md:py-48 px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <span className="font-bebas text-2xl tracking-[0.1em] text-[#BF8A3D]/65 block mb-8">
          Dal 2019 · Vilnius
        </span>

        {/* Line 1 */}
        <div ref={line1Ref} className="overflow-hidden">
          <h2
            className="font-display font-normal italic text-white leading-[0.88]"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              letterSpacing: "-0.025em",
            }}
          >
            {parts.before}
            <span className="not-italic font-semibold text-[#E8825A]">{parts.gold}</span>
            {parts.after}
          </h2>
        </div>

        {/* Line 2 */}
        <div ref={line2Ref} className="overflow-hidden">
          <h2
            className="font-display font-normal italic text-white leading-[0.88] mb-14"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              letterSpacing: "-0.025em",
            }}
          >
            {parts.line2}
          </h2>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3">
          <a
            href={`/${lang}/menu`}
            className="inline-flex items-center justify-center px-10 py-4 bg-[#BF8A3D] text-white font-body text-[0.6rem] tracking-[0.35em] uppercase font-bold hover:bg-[#D4703E] active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            {th("curiousSeeMenu", lang)}
          </a>
          <a
            href="tel:+37066408338"
            className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white/70 font-body text-[0.6rem] tracking-[0.35em] uppercase hover:bg-white/10 active:scale-[0.98] transition-all duration-500"
          >
            {th("curiousBookTable", lang)}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CuriousBanner;
