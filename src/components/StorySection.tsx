import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import type { Lang } from "@/i18n/homeTranslations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import interiorImg from "@/assets/hero-interior.webp?url";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const label: Record<Lang, string> = {
  it: "La nostra storia",
  en: "Our story",
  lt: "Mūsų istorija",
};
const heading: Record<Lang, [string, string]> = {
  it: ["Cucina italiana", "vera."],
  en: ["Italian cooking", "done right."],
  lt: ["Tikroji itališka", "virtuvė."],
};
const hoursLabel: Record<Lang, string> = {
  it: "Siamo aperti",
  en: "We're open",
  lt: "Dirbame",
};

export default function StorySection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [line1, line2] = heading[lang as Lang];

  useGSAP(() => {
    gsap.fromTo(leftRef.current,
      { x: -44, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } }
    );
    gsap.fromTo(rightRef.current,
      { x: 44, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} style={{ background: "#140C08" }} className="relative overflow-hidden">

      {/* Ghost year */}
      <span
        aria-hidden="true"
        className="absolute pointer-events-none select-none font-bebas text-white"
        style={{
          fontSize: "clamp(10rem, 28vw, 26rem)",
          opacity: 0.018,
          bottom: "-1.5rem",
          right: "-0.5rem",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        2019
      </span>

      <div className="grid md:grid-cols-[1fr_1fr] lg:grid-cols-[55fr_45fr]" style={{ minHeight: "640px" }}>

        {/* Left — text */}
        <div
          ref={leftRef}
          className="flex flex-col justify-center px-8 py-16 md:px-14 lg:px-20 md:py-24 relative z-10"
        >
          <span className="font-bebas tracking-[0.2em] text-[#BF8A3D]/60 block mb-6"
            style={{ fontSize: "0.75rem" }}>
            {label[lang as Lang]}
          </span>

          <h2
            className="font-display font-normal italic text-white mb-10"
            style={{
              fontSize: "clamp(2.6rem, 4.8vw, 4.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.86,
            }}
          >
            {line1}<br />
            <span style={{ color: "#BF8A3D" }}>{line2}</span>
          </h2>

          <div className="space-y-4 mb-10" style={{ maxWidth: "44ch" }}>
            <p className="font-body text-sm text-white/45 leading-relaxed">{th("aboutP1", lang as Lang)}</p>
            <p className="font-body text-sm text-white/45 leading-relaxed">{th("aboutP2", lang as Lang)}</p>
            <p className="font-body text-sm text-white/45 leading-relaxed">{th("aboutP3", lang as Lang)}</p>
          </div>

          {/* Hours */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.75rem", marginBottom: "2.5rem" }}>
            <span className="font-bebas tracking-[0.14em] text-[#BF8A3D]/50 block mb-4"
              style={{ fontSize: "0.7rem" }}>
              {hoursLabel[lang as Lang]}
            </span>
            <div className="space-y-1.5">
              {[th("hoursMF", lang as Lang), th("hoursFri", lang as Lang), th("hoursSat", lang as Lang), th("hoursSun", lang as Lang)].map((h) => (
                <p key={h} className="font-body text-sm text-white/35">{h}</p>
              ))}
            </div>
          </div>

          <a
            href="tel:+37066408338"
            className="inline-flex items-center gap-3 px-7 py-3.5 font-body text-[0.6rem] tracking-[0.3em] uppercase font-bold w-fit transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            style={{ background: "#BF8A3D", color: "#fff" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#A8752F"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#BF8A3D"; }}
          >
            {th("heroBookTable", lang as Lang)}
          </a>
        </div>

        {/* Right — photo */}
        <div ref={rightRef} className="relative overflow-hidden" style={{ minHeight: "460px" }}>
          <img
            src={interiorImg}
            alt="Interno di L'Alimentari"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.55) contrast(1.1) saturate(0.9)", objectPosition: "center" }}
            loading="lazy"
          />
          {/* Left-to-right gradient to blend with text column */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #140C08 0%, transparent 35%)" }} />
          {/* Bottom fade */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #140C08 0%, transparent 40%)" }} />
        </div>

      </div>
    </section>
  );
}
