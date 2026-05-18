import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Lang } from "@/i18n/homeTranslations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const copy: Record<Lang, { label: string; line1: string; line2: string; sub: string }> = {
  it: {
    label: "L'ambiente",
    line1: "Un posto dove",
    line2: "il tempo rallenta.",
    sub: "Cucina aperta, tavoli in legno, voci italiane. Non solo un ristorante — un pezzo d'Italia nel cuore di Vilnius.",
  },
  en: {
    label: "The Space",
    line1: "A place where",
    line2: "time slows down.",
    sub: "Open kitchen, wooden tables, Italian voices. Not just a restaurant — a piece of Italy in the heart of Vilnius.",
  },
  lt: {
    label: "Aplinka",
    line1: "Vieta, kur laikas",
    line2: "sulėtėja.",
    sub: "Atvira virtuvė, mediniai stalai, itališkos kalbos garsai. Ne tik restoranas — italijos dalis Vilniaus širdyje.",
  },
};

export default function AtmosphereSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const c = copy[lang as Lang];

  useGSAP(() => {
    gsap.fromTo(textRef.current,
      { y: 48, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      style={{ height: "90vh", background: "#0E0804", position: "relative", overflow: "hidden" }}
    >
      {/* Warm lamp-glow radial gradients */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(ellipse 50% 40% at 25% 16%, rgba(191,138,61,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 30% 25% at 68% 12%, rgba(191,138,61,0.11) 0%, transparent 55%),
          radial-gradient(ellipse 60% 35% at 50% 0%,   rgba(42,24,16,0.9)   0%, transparent 55%),
          radial-gradient(ellipse 90% 50% at 50% 100%, rgba(14,8,4,1)       0%, transparent 65%)
        `,
      }} />

      {/* CSS grain texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.045,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "300px 300px",
        pointerEvents: "none",
      }} />

      {/* Top-to-bottom vignette */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(14,8,4,0.72) 0%, transparent 30%, rgba(14,8,4,0.55) 65%, rgba(14,8,4,0.97) 100%)",
      }} />

      {/* Decorative top hairline */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(191,138,61,0.18)" }} />

      {/* Text — bottom left */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-20 pb-16 md:pb-24"
      >
        <span className="font-bebas text-lg tracking-[0.18em] text-[#BF8A3D]/65 block mb-5">
          {c.label}
        </span>

        <h2
          className="font-display font-normal italic text-white leading-[0.88] mb-7"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
            letterSpacing: "-0.02em",
            maxWidth: "20ch",
          }}
        >
          {c.line1}<br />
          <span style={{ color: "#E8C89A" }}>{c.line2}</span>
        </h2>

        <div style={{ width: "3rem", height: "1px", background: "rgba(191,138,61,0.4)", marginBottom: "2rem" }} />

        <p
          className="font-body text-white/40 leading-relaxed"
          style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)", maxWidth: "44ch" }}
        >
          {c.sub}
        </p>
      </div>
    </section>
  );
}
