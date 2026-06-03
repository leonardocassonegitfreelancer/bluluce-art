import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import { productsSlug } from "@/i18n/slugs";
import ninfeImg from "@/assets/Ninfe picture for the home.png";
import scorciImg from "@/assets/scorci_mediterraneo.png";
import oliveImg from "@/assets/olive_sun.png";

/*
 * Desktop hero — full-bleed artwork that cycles through the collection pieces
 * behind a fixed brand message. "Timed cards" animation concept based on the
 * MIT-licensed CodePen by dilums (https://codepen.io/dilums/pen/NWodZMd);
 * engine rewritten in React, scoped + bi-directional. MIT notice retained.
 */

const images = [ninfeImg.src, scorciImg.src, oliveImg.src];

const copy: Record<Lang, { line1: string; highlight: string; line2: string; desc: string; cta1: string; cta2: string }> = {
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

const DUR = 0.85;
const AUTO_MS = 10000;
const ease = "sine.inOut";

const HeroDesktopCards = () => {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.it;
  const prefix = `/${lang}`;
  const collectionUrl = `${prefix}/${productsSlug[lang as Lang] || productsSlug.es}`;
  const galleryUrl = `${prefix}/gallery`;

  const rootRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<() => void>(() => {});
  const prevRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(root.querySelectorAll<HTMLElement>(".tc-card"));
      const nums = Array.from(root.querySelectorAll<HTMLElement>(".tc-num"));
      const progressFg = root.querySelector<HTMLElement>(".tc-progress-fg");
      const cardsWrap = root.querySelector<HTMLElement>(".tc-cards");
      if (!cards.length) return;

      let order = cards.map((_, i) => i);
      let isAnimating = false;
      let autoTween: gsap.core.Tween | null = null;
      let metrics = getMetrics();

      function getMetrics() {
        const w = root.clientWidth;
        const h = root.clientHeight;
        const cardWidth = Math.round(Math.max(150, Math.min(210, w * 0.155)));
        const cardHeight = Math.round(cardWidth * 1.48);
        const gap = 30;
        const stackLen = order.length - 1;
        const rightMargin = Math.round(Math.max(40, w * 0.05));
        const offsetLeft = w - rightMargin - cardWidth - Math.max(0, stackLen - 1) * (cardWidth + gap);
        const offsetTop = Math.round(h * 0.5 - cardHeight * 0.32);
        return { w, h, cardWidth, cardHeight, gap, offsetLeft, offsetTop };
      }

      const stackX = (k: number) => metrics.offsetLeft + k * (metrics.cardWidth + metrics.gap);

      function place(animated: boolean) {
        const [active, ...rest] = order;
        const fn = (el: HTMLElement, p: gsap.TweenVars) =>
          animated ? gsap.to(el, { ...p, duration: DUR, ease }) : gsap.set(el, p);
        fn(cards[active], { x: 0, y: 0, width: metrics.w, height: metrics.h, borderRadius: 0, zIndex: 10, scale: 1 });
        rest.forEach((idx, k) => fn(cards[idx], { x: stackX(k), y: metrics.offsetTop, width: metrics.cardWidth, height: metrics.cardHeight, borderRadius: 12, zIndex: 30, scale: 1 }));
        updateMeta();
      }

      function updateMeta() {
        const active = order[0];
        nums.forEach((el, i) => gsap.to(el, { y: i === active ? 0 : 46, opacity: i === active ? 1 : 0, duration: DUR, ease }));
      }

      function change(dir: number) {
        if (isAnimating) return;
        isAnimating = true;
        const oldActive = order[0];
        if (dir > 0) order.push(order.shift() as number);
        else order.unshift(order.pop() as number);
        const newActive = order[0];
        const rest = order.slice(1);

        // Outgoing stays full-screen underneath (slight zoom) so the frame is
        // never empty; it drops into the stack only after the incoming covers all.
        gsap.set(cards[oldActive], { zIndex: 10 });
        gsap.to(cards[oldActive], { scale: 1.12, duration: DUR, ease });

        gsap.set(cards[newActive], { zIndex: 20 });
        gsap.to(cards[newActive], {
          x: 0, y: 0, width: metrics.w, height: metrics.h, borderRadius: 0, scale: 1, duration: DUR, ease,
          onComplete: () => {
            const oi = rest.indexOf(oldActive);
            gsap.set(cards[oldActive], { x: stackX(oi), y: metrics.offsetTop, width: metrics.cardWidth, height: metrics.cardHeight, borderRadius: 12, zIndex: 30, scale: 1 });
            isAnimating = false;
          },
        });

        rest.forEach((idx, k) => {
          if (idx === oldActive) return;
          gsap.set(cards[idx], { zIndex: 30 });
          gsap.to(cards[idx], { x: stackX(k), y: metrics.offsetTop, width: metrics.cardWidth, height: metrics.cardHeight, borderRadius: 12, scale: 1, duration: DUR, ease, delay: 0.05 * (k + 1) });
        });

        updateMeta();
      }

      function startAuto() {
        if (autoTween) autoTween.kill();
        if (!progressFg) return;
        gsap.set(progressFg, { width: "0%" });
        autoTween = gsap.to(progressFg, {
          width: "100%", duration: AUTO_MS / 1000, ease: "none",
          onComplete: () => { change(1); startAuto(); },
        });
      }

      nextRef.current = () => { change(1); startAuto(); };
      prevRef.current = () => { change(-1); startAuto(); };

      place(false);
      gsap.fromTo(cardsWrap, { opacity: 0 }, { opacity: 1, duration: 0.7, ease });
      gsap.from(cards, { scale: 0.92, duration: 0.8, ease, stagger: 0.06 });
      startAuto();

      let raf = 0;
      const onResize = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => { metrics = getMetrics(); place(false); });
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        if (autoTween) autoTween.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="hidden md:block relative h-[100vh] overflow-hidden"
      style={{ background: "#0E0804" }}
    >
      <style>{`
        @keyframes tcFadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .tc-cards { position: absolute; inset: 0; opacity: 0; }
        .tc-card { position: absolute; top: 0; left: 0; background-size: cover; background-position: center;
          box-shadow: 6px 6px 28px 6px rgba(0,0,0,0.5); will-change: transform, width, height; }
        .tc-scrim { position: absolute; inset: 0; z-index: 21; pointer-events: none;
          background:
            linear-gradient(to bottom, rgba(14,8,4,0.8) 0%, rgba(14,8,4,0.34) 8%, rgba(14,8,4,0) 17%),
            linear-gradient(95deg, rgba(14,8,4,0.9) 0%, rgba(14,8,4,0.66) 24%, rgba(14,8,4,0.2) 48%, rgba(14,8,4,0) 64%),
            linear-gradient(to top, rgba(14,8,4,0.6) 0%, rgba(14,8,4,0) 34%); }
        .tc-copy { position: absolute; top: 50%; transform: translateY(-50%); left: clamp(40px, 5vw, 96px);
          z-index: 22; max-width: min(48vw, 640px); }
        .tc-copy .tc-anim1 { animation: tcFadeUp 1.1s cubic-bezier(0.25,1,0.5,1) both; }
        .tc-copy .tc-anim2 { animation: tcFadeUp 1s cubic-bezier(0.25,1,0.5,1) 0.15s both; }
        .tc-copy .tc-anim3 { animation: tcFadeUp 1s cubic-bezier(0.25,1,0.5,1) 0.3s both; }
        .tc-controls { position: absolute; left: clamp(40px, 5vw, 96px); bottom: clamp(28px, 5vh, 52px);
          z-index: 23; display: flex; align-items: center; gap: 18px; }
        .tc-arrow { width: 48px; height: 48px; border-radius: 999px; border: 2px solid rgba(255,255,255,0.28);
          display: grid; place-items: center; cursor: pointer; transition: border-color .3s ease; }
        .tc-arrow:hover { border-color: #C9A96E; }
        .tc-arrow svg { width: 22px; height: 22px; color: rgba(255,255,255,0.75); }
        .tc-progress { width: min(34vw, 380px); height: 3px; background: rgba(255,255,255,0.2); }
        .tc-progress-fg { width: 0%; height: 3px; background: #C9A96E; }
        .tc-nums { width: 40px; height: 44px; overflow: hidden; position: relative; }
        .tc-num { position: absolute; inset: 0; display: grid; place-items: center; font-family: var(--font-display, "Playfair Display", serif);
          font-size: 26px; font-weight: 600; color: #f5f0e8; }
      `}</style>

      {/* Full-bleed cycling artwork */}
      <div className="tc-cards">
        {images.map((src, i) => (
          <div key={i} className="tc-card" style={{ backgroundImage: `url("${src}")` }} />
        ))}
      </div>

      <div className="tc-scrim" />

      {/* Fixed brand message */}
      <div className="tc-copy">
        <div className="tc-anim1 w-10 h-px mb-8" style={{ background: "#C9A96E" }} />
        <h1
          className="tc-anim1 font-display font-normal italic leading-[0.9] mb-6"
          style={{ fontSize: "clamp(3rem, 4.8vw, 5.6rem)", letterSpacing: "-0.025em", color: "#f5f0e8", textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
        >
          {t.line1}{" "}
          <span className="not-italic font-semibold" style={{ color: "#C9A96E" }}>{t.highlight}</span>
          <br />
          <span className="not-italic font-semibold" style={{ color: "#C9A96E" }}>{t.line2}</span>
        </h1>
        <p
          className="tc-anim2 font-body mb-9"
          style={{ maxWidth: "30rem", fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", lineHeight: 1.7, color: "rgba(245,240,232,0.85)", textShadow: "0 1px 16px rgba(0,0,0,0.5)" }}
        >
          {t.desc}
        </p>
        <div className="tc-anim3 flex flex-wrap gap-4">
          <a
            href={collectionUrl}
            className="inline-flex items-center px-8 py-3.5 font-body text-[0.6rem] tracking-[0.3em] uppercase font-bold transition-all duration-500 hover:opacity-85"
            style={{ background: "#C9A96E", color: "#0E0804" }}
          >
            {t.cta1}
          </a>
          <a
            href={galleryUrl}
            className="inline-flex items-center px-8 py-3.5 font-body text-[0.6rem] tracking-[0.3em] uppercase transition-all duration-500 hover:text-white"
            style={{ border: "1px solid rgba(245,240,232,0.35)", color: "rgba(245,240,232,0.75)" }}
          >
            {t.cta2}
          </a>
        </div>
      </div>

      {/* Controls */}
      <div className="tc-controls">
        <div className="tc-arrow" role="button" aria-label="Precedente" onClick={() => prevRef.current()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="tc-arrow" role="button" aria-label="Successivo" onClick={() => nextRef.current()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className="tc-progress"><div className="tc-progress-fg" /></div>
        <div className="tc-nums">
          {images.map((_s, i) => (
            <div key={i} className="tc-num" style={{ transform: i === 0 ? "translateY(0)" : "translateY(46px)", opacity: i === 0 ? 1 : 0 }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroDesktopCards;
