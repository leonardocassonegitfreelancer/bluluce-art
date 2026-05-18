import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import type { Lang } from "@/i18n/homeTranslations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutDeli from "@/assets/about-deli-new.webp?url";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const label: Record<Lang, string> = {
  it: "Il Nostro Posto",
  en: "Our Place",
  lt: "Mūsų Vieta",
};
const heading: Record<Lang, [string, string]> = {
  it: ["Cucina italiana", "vera."],
  en: ["Real Italian", "cooking."],
  lt: ["Tikroji itališka", "virtuvė."],
};
const hoursLabel: Record<Lang, string> = {
  it: "Siamo aperti",
  en: "We're open",
  lt: "Dirbame",
};

export default function AboutSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(leftRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } }
    );
    gsap.fromTo(rightRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } }
    );
  }, { scope: sectionRef });

  const [line1, line2] = heading[lang];

  return (
    <section ref={sectionRef} style={{ background: "#2A1810" }} className="relative overflow-hidden">

      {/* Ghost year — background texture */}
      <span
        className="absolute pointer-events-none select-none font-bebas text-white leading-none"
        style={{
          fontSize: "clamp(12rem, 30vw, 28rem)",
          opacity: 0.025,
          bottom: "-2rem",
          right: "-1rem",
          letterSpacing: "-0.04em",
        }}
        aria-hidden="true"
      >
        2019
      </span>

      <div className="grid md:grid-cols-[2fr_3fr]" style={{ minHeight: "580px" }}>

        {/* Sinistra: testo */}
        <div ref={leftRef} className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20 relative z-10">

          <span className="font-bebas text-xl tracking-[0.12em] text-[#BF8A3D]/70 block mb-6">
            {label[lang]}
          </span>

          <h2
            className="font-display font-normal italic text-white mb-10"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.88,
            }}
          >
            {line1}<br />
            <span className="text-[#E8825A]">{line2}</span>
          </h2>

          <div className="space-y-4 mb-10">
            <p className="font-body text-sm text-[#D4C4B0]/60 leading-relaxed">{th("aboutP1", lang)}</p>
            <p className="font-body text-sm text-[#D4C4B0]/60 leading-relaxed">{th("aboutP2", lang)}</p>
            <p className="font-body text-sm text-[#D4C4B0]/60 leading-relaxed">{th("aboutP3", lang)}</p>
          </div>

          {/* Orari */}
          <div className="mb-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.75rem" }}>
            <span className="font-bebas text-lg tracking-[0.1em] text-[#BF8A3D]/55 block mb-4">
              {hoursLabel[lang]}
            </span>
            <div className="space-y-1.5">
              {[th("hoursMF", lang), th("hoursFri", lang), th("hoursSat", lang), th("hoursSun", lang)].map((h) => (
                <p key={h} className="font-body text-sm text-[#D4C4B0]/45">{h}</p>
              ))}
            </div>
          </div>

          <a
            href="tel:+37066408338"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#BF8A3D] text-white font-body text-[0.6rem] tracking-[0.3em] uppercase font-bold w-fit hover:bg-[#D4703E] active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            {th("heroBookTable", lang)}
          </a>
        </div>

        {/* Destra: foto */}
        <div ref={rightRef} className="relative overflow-hidden" style={{ minHeight: "420px" }}>
          <img
            src={aboutDeli}
            alt="L'Alimentari — interno"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.75) contrast(1.06)", objectPosition: "center" }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#2A1810]/60" />
        </div>

      </div>
    </section>
  );
}
