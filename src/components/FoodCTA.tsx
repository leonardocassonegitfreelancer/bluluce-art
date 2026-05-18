import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carbonara from "@/assets/carbonara-pasta.webp?url";
import type { Lang } from "@/i18n/homeTranslations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const copy: Record<Lang, { label: string; heading: [string, string]; body: string; cta: string }> = {
  it: {
    label: "Pasta fresca",
    heading: ["La pasta che", "non ti aspetti."],
    body: "Farina italiana, uova fresche di giornata, sfogliata a mano ogni mattina. Niente di congelato, niente di confezionato.",
    cta: "Vedi il menu →",
  },
  en: {
    label: "Fresh pasta",
    heading: ["Pasta like you", "didn't expect."],
    body: "Italian flour, fresh daily eggs, hand-rolled every morning. Nothing frozen, nothing packaged.",
    cta: "See the menu →",
  },
  lt: {
    label: "Šviežia pasta",
    heading: ["Pasta, kokios", "nesitikėjai."],
    body: "Italų miltai, kasdieniai šviežiai kiaušiniai, minkyti rankomis kiekvieną rytą. Nieko šaldyta, nieko supakuota.",
    cta: "Žiūrėti meniu →",
  },
};

export default function FoodCTA() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const c = copy[lang as Lang];

  useGSAP(() => {
    gsap.fromTo(leftRef.current,
      { x: -36, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true } }
    );
    gsap.fromTo(rightRef.current,
      { x: 36, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true } }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-8 md:px-16 lg:px-20"
      style={{ background: "#0E0804" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-16 md:gap-24 items-center">

        {/* Left: text */}
        <div ref={leftRef}>
          <span className="font-bebas text-xl tracking-[0.14em] text-[#BF8A3D]/60 block mb-5">
            {c.label}
          </span>

          <h2
            className="font-display font-normal italic text-white leading-[0.88] mb-8"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", letterSpacing: "-0.02em" }}
          >
            {c.heading[0]}<br />
            <span style={{ color: "#BF8A3D" }}>{c.heading[1]}</span>
          </h2>

          <div style={{ width: "3rem", height: "1px", background: "rgba(191,138,61,0.3)", marginBottom: "2rem" }} />

          <p className="font-body text-white/38 leading-relaxed mb-10" style={{ fontSize: "1rem", maxWidth: "38ch" }}>
            {c.body}
          </p>

          <a
            href={`/${lang}/menu`}
            className="font-bebas text-xl tracking-[0.1em] text-[#BF8A3D] hover:text-white transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            {c.cta}
          </a>
        </div>

        {/* Right: photo */}
        <div ref={rightRef} className="relative">
          <div
            className="absolute"
            style={{
              inset: 0,
              transform: "translate(10px, 10px)",
              border: "1px solid rgba(191,138,61,0.15)",
              pointerEvents: "none",
            }}
          />
          <img
            src={carbonara}
            alt="Carbonara fatta a mano"
            className="relative w-full object-cover"
            style={{
              aspectRatio: "4/5",
              filter: "brightness(0.82) contrast(1.08) saturate(1.05)",
              objectPosition: "center 35%",
            }}
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}
