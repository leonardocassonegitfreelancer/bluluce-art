import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Lang } from "@/i18n/homeTranslations";
import meshGradient from "@/assets/image-mesh-gradient.png?url";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const copy: Record<Lang, {
  eyebrow: string;
  line1: string;
  line2: string;
  sub: string;
  pillars: [string, string, string];
}> = {
  it: {
    eyebrow: "La nostra filosofia",
    line1: "Ogni mattina",
    line2: "la stessa storia.",
    sub: "Farina, uova, mani. Nient'altro.",
    pillars: ["Pasta fresca ogni mattina", "Solo prodotti italiani", "A Vilnius"],
  },
  en: {
    eyebrow: "Our philosophy",
    line1: "Every morning",
    line2: "the same story.",
    sub: "Flour, eggs, hands. Nothing else.",
    pillars: ["Fresh pasta every morning", "Italian ingredients only", "In Vilnius"],
  },
  lt: {
    eyebrow: "Mūsų filosofija",
    line1: "Kiekvieną rytą",
    line2: "ta pati istorija.",
    sub: "Miltai, kiaušiniai, rankos. Nieko daugiau.",
    pillars: ["Šviežia pasta kiekvieną rytą", "Tik itališki ingredientai", "Vilniuje"],
  },
};

const nums = ["01", "02", "03"];

export default function ManifestoSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const c = copy[lang as Lang];

  useGSAP(() => {
    gsap.fromTo(headRef.current,
      { y: 52, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true } }
    );
    gsap.fromTo(pillarsRef.current,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true } }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      style={{ background: "#0E0804", backgroundImage: `url(${meshGradient})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "80vh", position: "relative", overflow: "hidden" }}
      className="flex flex-col items-center justify-center px-6 py-24 md:py-32"
    >
      {/* CSS grain */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "300px 300px",
      }} />

      {/* Warm radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(191,138,61,0.07) 0%, transparent 70%)",
      }} />

      {/* Top hairline */}
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "rgba(191,138,61,0.15)" }} />

      {/* Heading block */}
      <div ref={headRef} className="text-center relative z-10" style={{ maxWidth: "800px" }}>
        <span className="font-bebas tracking-[0.24em] text-[#BF8A3D]/55 block mb-8"
          style={{ fontSize: "0.75rem" }}>
          {c.eyebrow}
        </span>

        <h2
          className="font-display font-normal italic text-white"
          style={{
            fontSize: "clamp(3.2rem, 8vw, 7.5rem)",
            lineHeight: 0.86,
            letterSpacing: "-0.02em",
          }}
        >
          {c.line1}<br />
          <span style={{ color: "#BF8A3D" }}>{c.line2}</span>
        </h2>

        <p className="font-body text-white/30 mt-8 tracking-[0.08em]"
          style={{ fontSize: "clamp(0.8rem, 1.2vw, 1rem)" }}>
          {c.sub}
        </p>
      </div>

      {/* Divider */}
      <div style={{ width: "1px", height: "4rem", background: "rgba(191,138,61,0.2)", margin: "3rem 0" }} />

      {/* 3 pillars */}
      <div
        ref={pillarsRef}
        className="relative z-10 w-full"
        style={{ maxWidth: "860px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          {c.pillars.map((pillar, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 px-6 py-8 md:py-10"
              style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
            >
              <span className="font-bebas text-[#BF8A3D]/40 tracking-[0.18em]"
                style={{ fontSize: "0.7rem" }}>
                {nums[i]}
              </span>
              <p className="font-body text-white/55 leading-snug"
                style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)" }}>
                {pillar}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom hairline */}
      <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: "1px", background: "rgba(191,138,61,0.1)" }} />
    </section>
  );
}
