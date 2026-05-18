import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carbonara from "@/assets/carbonara-pasta.webp?url";
import burrata from "@/assets/burrata-prosciutto.webp?url";
import focacciaParma from "@/assets/focaccia-parma.webp?url";
import tiramisu from "@/assets/tiramisu.webp?url";
import type { Lang } from "@/i18n/homeTranslations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const panels = [
  {
    n: "01",
    tag: { it: "Primi", en: "Pasta", lt: "Pirmieji" },
    title: "PASTA",
    sub: { it: "Fatta a mano ogni mattina", en: "Handmade every morning", lt: "Gaminama rankomis kiekvieną rytą" },
    img: carbonara,
    anchor: "fresh-pasta",
  },
  {
    n: "02",
    tag: { it: "Antipasti", en: "Starters", lt: "Užkandžiai" },
    title: "ANTIPASTI",
    sub: { it: "Prodotti italiani selezionati", en: "Selected Italian products", lt: "Atrinkti itališki produktai" },
    img: burrata,
    anchor: "starters",
  },
  {
    n: "03",
    tag: { it: "Focaccia", en: "Focaccia", lt: "Focaccia" },
    title: "FOCACCIA",
    sub: { it: "Sfornata ogni giorno", en: "Freshly baked daily", lt: "Kepama kiekvieną dieną" },
    img: focacciaParma,
    anchor: "focacce",
  },
  {
    n: "04",
    tag: { it: "Dolci", en: "Desserts", lt: "Desertai" },
    title: "DOLCI",
    sub: { it: "Tiramisù e non solo", en: "Tiramisù and more", lt: "Tiramisù ir daugiau" },
    img: tiramisu,
    anchor: "dolci",
  },
];

const cta = { it: "Scopri →", en: "Discover →", lt: "Atrask →" };


export default function CategoriesHorizontal() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useGSAP(() => {
    if (!isDesktop) return;
    if (!trackRef.current || !sectionRef.current) return;

    const totalMove = window.innerWidth * (panels.length - 1);

    const scrollTween = gsap.to(trackRef.current, {
      x: -totalMove,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalMove}`,
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setActiveIndex(Math.round(self.progress * (panels.length - 1)));
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    const panelEls = trackRef.current.querySelectorAll<HTMLElement>(".cat-panel");
    panelEls.forEach((panel, i) => {
      if (i === 0) return;
      const heading = panel.querySelector(".cat-heading");
      const bottom = panel.querySelector(".cat-bottom");
      if (heading) {
        gsap.fromTo(heading,
          { yPercent: 14, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { containerAnimation: scrollTween, trigger: panel, start: "left 80%", toggleActions: "play none none reset" } }
        );
      }
      if (bottom) {
        gsap.fromTo(bottom,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.14,
            scrollTrigger: { containerAnimation: scrollTween, trigger: panel, start: "left 80%", toggleActions: "play none none reset" } }
        );
      }
    });
  }, { scope: sectionRef, dependencies: [isDesktop], revertOnUpdate: true });

  // MOBILE
  if (!isDesktop) {
    return (
      <section style={{ background: "#0E0804", display: "flex", flexDirection: "column", gap: "3px", paddingTop: "3px", paddingBottom: "4px", position: "relative" }}>
        {panels.map((p, i) => (
          <a
            key={i}
            href={`/${lang}/menu#${p.anchor}`}
            className="relative block overflow-hidden"
            style={{ height: "75vw" }}
          >
            <img
              src={p.img}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.38)" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0804]/92 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 pb-7">
              <h2 className="font-bebas text-white leading-[0.8]" style={{ fontSize: "21vw" }}>
                {p.title}
              </h2>
              <span className="font-bebas text-base mt-2" style={{ color: "#BF8A3D" }}>
                {cta[lang as Lang]}
              </span>
            </div>
          </a>
        ))}

      </section>
    );
  }

  // DESKTOP
  return (
    <section ref={sectionRef} style={{ background: "#0E0804" }} className="overflow-hidden">
      <div style={{ height: "100dvh", position: "relative" }}>
        <div
          ref={trackRef}
          className="flex"
          style={{ width: `${panels.length * 100}vw`, height: "100dvh" }}
        >
          {panels.map((p, i) => (
            <a
              key={i}
              href={`/${lang}/menu#${p.anchor}`}
              className="cat-panel relative flex-shrink-0 overflow-hidden block cursor-pointer"
              style={{ width: "100vw", height: "100dvh" }}
            >
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03]"
                style={{ filter: "brightness(0.35) contrast(1.08)" }}
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0804]/95 via-transparent to-[#0E0804]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0E0804]/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between px-12 lg:px-16 py-10">
                <div className="flex items-center justify-between">
                  <span className="font-bebas text-sm tracking-[0.22em]" style={{ color: "rgba(232,130,90,0.35)" }}>
                    {p.n} · {(p.tag[lang as Lang] as string).toUpperCase()}
                  </span>
                  <span className="font-bebas text-sm tracking-[0.18em]" style={{ color: "rgba(232,130,90,0.18)" }}>
                    {p.n} / 0{panels.length}
                  </span>
                </div>
                <div>
                  <h2
                    className="cat-heading font-bebas text-white leading-[0.78]"
                    style={{ fontSize: "clamp(6rem, 19vw, 16rem)", letterSpacing: "-0.01em" }}
                  >
                    {p.title}
                  </h2>
                  <div
                    className="cat-bottom flex items-end justify-between mt-5 pt-5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p className="font-body text-sm text-white/35 max-w-xs">
                      {p.sub[lang as Lang]}
                    </p>
                    <span className="font-bebas text-2xl tracking-[0.08em]" style={{ color: "#BF8A3D" }}>
                      {cta[lang as Lang]}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.05)" }}>
          <div
            ref={progressRef}
            style={{ height: "100%", background: "#BF8A3D", transformOrigin: "left center", transform: "scaleX(0)", transition: "none" }}
          />
        </div>

        <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.5rem" }}>
          {panels.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                width: i === activeIndex ? 24 : 4,
                height: 4,
                background: i === activeIndex ? "#BF8A3D" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
