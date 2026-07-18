import { useEffect, useRef } from "react";
import gsap from "gsap";

/*
 * HeroTimedCards — full-bleed hero where images cycle behind a fixed message
 * with a "timed cards opening" motion (the active image fills the screen, the
 * upcoming ones stack on the right, and they swap on a timer or via arrows).
 *
 * Self-contained: depends only on React + gsap. Pass your own `images` and copy
 * via props. Needs "Playfair Display" (or override --font-display) for the title.
 *
 * Animation adapted from the "Timed Cards Opening" CodePen by Dilum Sanjaya,
 * used under the MIT License (notice retained below).
 *
 *   The MIT License (MIT)
 *   Copyright (c) 2026 Dilum Sanjaya (https://codepen.io/dilums/pen/NWodZMd)
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

export interface HeroTimedCardsProps {
  /** Image URLs shown as the cycling cards (2+ recommended). */
  images?: string[];
  /** Small gold rule shown above the title (decorative). */
  showRule?: boolean;
  line1?: string;
  highlight?: string;
  line2?: string;
  description?: string;
  ctas?: { label: string; href: string }[];
  /** Milliseconds between auto-advances. */
  autoMs?: number;
  /** Accent colour (gold by default). */
  accent?: string;
  /** Background colour behind the artwork. */
  background?: string;
  /** Uniform dark veil over the active image (0–1). Raise it for pale photos. */
  overlay?: number;
  /** Text colour used on accent surfaces (e.g. the primary CTA). Defaults to `background`. */
  accentForeground?: string;
  /** Max preview cards stacked on the right. Extra images still cycle but stay hidden. */
  maxStack?: number;
}

const DEFAULT_IMAGES = [
  "/events/double-click-jun-2026.webp",
  "/events/powertalks-open-house-jun-2026.webp",
  "/og-image.jpg",
];

const ease = "sine.inOut";
const DUR = 0.85;

const HeroTimedCards = ({
  images = DEFAULT_IMAGES,
  showRule = true,
  line1 = "Where ideas",
  highlight = "take",
  line2 = "shape.",
  description = "A place built for the people who make things happen. Spaces, events and a community designed around your next big idea.",
  ctas = [
    { label: "Discover", href: "#" },
    { label: "Learn more", href: "#" },
  ],
  autoMs = 10000,
  accent = "#C9A96E",
  background = "#0E0804",
  overlay = 0.15,
  accentForeground = background,
  maxStack = 3,
}: HeroTimedCardsProps) => {
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
      if (cards.length < 1) return;

      let order = cards.map((_, i) => i);
      let isAnimating = false;
      let autoTween: gsap.core.Tween | null = null;
      let metrics = getMetrics();

      function getMetrics() {
        const w = root.clientWidth;
        const h = root.clientHeight;
        const cardWidth = Math.round(Math.max(140, Math.min(200, w * 0.12)));
        const cardHeight = Math.round(cardWidth * 1.5);
        const gap = 30;
        const stackLen = Math.min(order.length - 1, maxStack);
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
        fn(cards[active], { x: 0, y: 0, width: metrics.w, height: metrics.h, borderRadius: 0, zIndex: 10, scale: 1, opacity: 1 });
        rest.forEach((idx, k) => {
          const shown = k < maxStack;
          fn(cards[idx], { x: stackX(Math.min(k, maxStack - 1)), y: metrics.offsetTop, width: metrics.cardWidth, height: metrics.cardHeight, borderRadius: 12, zIndex: shown ? 30 : 20, scale: 1, opacity: shown ? 1 : 0 });
        });
        updateMeta();
      }

      function updateMeta() {
        const active = order[0];
        nums.forEach((el, i) => gsap.to(el, { y: i === active ? 0 : 46, opacity: i === active ? 1 : 0, duration: DUR, ease }));
      }

      function change(dir: number) {
        if (isAnimating || order.length < 2) return;
        isAnimating = true;
        const oldActive = order[0];
        if (dir > 0) order.push(order.shift() as number);
        else order.unshift(order.pop() as number);
        const newActive = order[0];
        const rest = order.slice(1);

        gsap.set(cards[oldActive], { zIndex: 10 });
        gsap.to(cards[oldActive], { scale: 1.12, duration: DUR, ease });

        gsap.set(cards[newActive], { zIndex: 20 });
        gsap.to(cards[newActive], {
          x: 0, y: 0, width: metrics.w, height: metrics.h, borderRadius: 0, scale: 1, opacity: 1, duration: DUR, ease,
          onComplete: () => {
            const oi = rest.indexOf(oldActive);
            const shown = oi < maxStack;
            gsap.set(cards[oldActive], { x: stackX(Math.min(oi, maxStack - 1)), y: metrics.offsetTop, width: metrics.cardWidth, height: metrics.cardHeight, borderRadius: 12, zIndex: shown ? 30 : 20, scale: 1, opacity: shown ? 1 : 0 });
            isAnimating = false;
          },
        });

        rest.forEach((idx, k) => {
          if (idx === oldActive) return;
          const shown = k < maxStack;
          gsap.set(cards[idx], { zIndex: shown ? 30 : 20 });
          gsap.to(cards[idx], { x: stackX(Math.min(k, maxStack - 1)), y: metrics.offsetTop, width: metrics.cardWidth, height: metrics.cardHeight, borderRadius: 12, scale: 1, opacity: shown ? 1 : 0, duration: DUR, ease, delay: 0.05 * (k + 1) });
        });

        updateMeta();
      }

      function startAuto() {
        if (autoTween) autoTween.kill();
        if (!progressFg || order.length < 2) return;
        gsap.set(progressFg, { width: "0%" });
        autoTween = gsap.to(progressFg, {
          width: "100%", duration: autoMs / 1000, ease: "none",
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
  }, [autoMs, maxStack]);

  return (
    <section
      ref={rootRef}
      style={{ position: "relative", height: "100vh", overflow: "hidden", background }}
    >
      <style>{`
        @keyframes tcFadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .tc-cards { position: absolute; inset: 0; opacity: 0; }
        .tc-card { position: absolute; top: 0; left: 0; background-size: cover; background-position: center;
          box-shadow: 6px 6px 28px 6px rgba(0,0,0,0.5); will-change: transform, width, height; }
        .tc-scrim { position: absolute; inset: 0; z-index: 21; pointer-events: none; }
        .tc-copy { position: absolute; top: 50%; transform: translateY(-50%);
          left: max(2rem, calc((100% - 80rem) / 2 + 2rem));
          z-index: 22; max-width: min(48vw, 640px); }
        .tc-copy .tc-anim1 { animation: tcFadeUp 1.1s cubic-bezier(0.25,1,0.5,1) both; }
        .tc-copy .tc-anim2 { animation: tcFadeUp 1s cubic-bezier(0.25,1,0.5,1) 0.15s both; }
        .tc-copy .tc-anim3 { animation: tcFadeUp 1s cubic-bezier(0.25,1,0.5,1) 0.3s both; }
        .tc-title { font-family: var(--font-display, "Playfair Display", serif); font-weight: 700;
          font-style: normal; line-height: 0.95; letter-spacing: -0.02em; color: #f5f0e8;
          font-size: clamp(3rem, 4.8vw, 5.6rem); text-shadow: 0 2px 30px rgba(0,0,0,0.5); margin: 0 0 1.4rem; }
        .tc-title .hl { font-style: normal; font-weight: 700; }
        .tc-desc { font-family: var(--font-body, "Inter", sans-serif); max-width: 30rem;
          font-size: clamp(0.9rem, 1.1vw, 1.05rem); line-height: 1.7; color: rgba(245,240,232,0.85);
          text-shadow: 0 1px 16px rgba(0,0,0,0.5); margin: 0 0 2.2rem; }
        .tc-ctas { display: flex; flex-wrap: wrap; gap: 1rem; }
        .tc-cta { display: inline-flex; align-items: center; padding: 0.9rem 2rem; font-family: var(--font-body, "Inter", sans-serif);
          font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none;
          transition: opacity .5s ease, color .5s ease; }
        .tc-cta--primary { font-weight: 700; }
        .tc-cta--primary:hover { opacity: 0.85; }
        .tc-cta--ghost:hover { color: #fff; }
        .tc-controls { position: absolute; left: max(2rem, calc((100% - 80rem) / 2 + 2rem)); bottom: clamp(28px, 5vh, 52px);
          z-index: 23; display: flex; align-items: center; gap: 18px; }
        .tc-arrow { width: 48px; height: 48px; border-radius: 999px; border: 2px solid rgba(255,255,255,0.28);
          display: grid; place-items: center; cursor: pointer; transition: border-color .3s ease; }
        .tc-arrow svg { width: 22px; height: 22px; color: rgba(255,255,255,0.75); }
        .tc-progress { width: min(34vw, 380px); height: 3px; background: rgba(255,255,255,0.2); }
        .tc-progress-fg { width: 0%; height: 3px; }
        .tc-nums { width: 40px; height: 44px; overflow: hidden; position: relative; }
        .tc-num { position: absolute; inset: 0; display: grid; place-items: center;
          font-family: var(--font-display, "Playfair Display", serif); font-size: 26px; font-weight: 600; color: #f5f0e8; }
      `}</style>

      <div className="tc-cards">
        {images.map((src, i) => (
          <div key={i} className="tc-card" style={{ backgroundImage: `url("${src}")` }} />
        ))}
      </div>

      <div
        className="tc-scrim"
        style={{
          background: `linear-gradient(rgba(0,0,0,${overlay}), rgba(0,0,0,${overlay})),
            linear-gradient(to bottom, ${background}cc 0%, ${background}55 8%, ${background}00 17%),
            linear-gradient(95deg, ${background}e6 0%, ${background}a8 24%, ${background}33 48%, ${background}00 64%),
            linear-gradient(to top, ${background}99 0%, ${background}00 34%)`,
        }}
      />

      <div className="tc-copy">
        {showRule && <div className="tc-anim1" style={{ width: 40, height: 1, background: accent, margin: "0 0 2rem" }} />}
        <h1 className="tc-anim1 tc-title">
          {line1}{" "}
          <span className="hl" style={{ color: accent }}>{highlight}</span>
          <br />
          <span className="hl" style={{ color: accent }}>{line2}</span>
        </h1>
        {description ? <p className="tc-anim2 tc-desc">{description}</p> : null}
        <div className="tc-anim3 tc-ctas">
          {ctas.map((c, i) => (
            <a
              key={i}
              href={c.href}
              className={`tc-cta ${i === 0 ? "tc-cta--primary" : "tc-cta--ghost"}`}
              style={i === 0
                ? { background: accent, color: accentForeground }
                : { border: "1px solid rgba(245,240,232,0.35)", color: "rgba(245,240,232,0.75)" }}
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>

      <div className="tc-controls">
        <div className="tc-arrow" role="button" aria-label="Previous" onClick={() => prevRef.current()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="tc-arrow" role="button" aria-label="Next" onClick={() => nextRef.current()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className="tc-progress"><div className="tc-progress-fg" style={{ background: accent }} /></div>
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

export default HeroTimedCards;
