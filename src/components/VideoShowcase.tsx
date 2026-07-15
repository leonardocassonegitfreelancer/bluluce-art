import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import insideVideo from "@/assets/video-bottom-home.mp4?url";
import posterImg from "@/assets/video-bottom-home-poster.webp?url";

const copy: Record<Lang, {
  quote: string;
  author: string;
}> = {
  it: {
    quote: "“L'arte non riproduce ciò che è visibile, ma rende visibile ciò che non sempre lo è.”",
    author: "— Il Processo Creativo nello Studio Bluluce",
  },
  en: {
    quote: "“Art does not reproduce what is visible; rather, it makes visible what is not always so.”",
    author: "— The Creative Process in the Bluluce Studio",
  },
  es: {
    quote: "“El arte no reproduce lo visible, sino que hace visible lo que no siempre lo es.”",
    author: "— El Proceso Creativo en el Estudio Bluluce",
  },
};

export default function VideoShowcase() {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.es;

  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const rafRef = useRef<number>(0);

  // Text fade-in when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Video fade-in when ready to play
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onReady = () => { setVideoReady(true); vid.play().catch(() => {}); };
    vid.addEventListener("canplay", onReady, { once: true });
    return () => vid.removeEventListener("canplay", onReady);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const video = parallaxRef.current;
    if (!container || !video) return;

    // Skip parallax on touch devices — scroll hijacking feels wrong there
    if (window.matchMedia("(hover: none)").matches) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: 0 when bottom of section enters viewport, 1 when top exits
        const progress = 1 - (rect.bottom / (vh + rect.height));
        const clampedProgress = Math.max(0, Math.min(1, progress));
        // shift the video up to 18% of its height as user scrolls through
        const shift = clampedProgress * 18;
        video.style.transform = `translateY(${shift}%)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Parallax wrapper: JS moves this with translateY, oversized so no gaps show */}
      <div
        ref={parallaxRef}
        style={{
          position: "absolute",
          top: "-15%",
          left: 0,
          width: "100%",
          height: "130%",
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        {/* Poster — visible until video is ready */}
        <img
          src={posterImg}
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: videoReady ? 0 : 0.65,
            filter: "brightness(0.55) contrast(1.1) saturate(0.9)",
            transition: "opacity 1s ease",
            pointerEvents: "none",
          }}
        />
        <video
          ref={videoRef}
          src={insideVideo}
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: videoReady ? 0.65 : 0,
            filter: "brightness(0.55) contrast(1.1) saturate(0.9)",
            transition: "opacity 1s ease",
          }}
        />
      </div>

      {/* Film grain overlay just for this section to increase cinematic depth */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.042, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "300px 300px",
      }} />



      {/* Cinematic vignette — edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none z-10" />
      {/* Dark radial overlay centered on text for readability */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.45) 0%, transparent 100%)"
      }} />

      {/* Overlay text content */}
      <div
        ref={textRef}
        className={`relative z-20 text-center px-6 max-w-4xl transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h3
          className="font-display font-normal text-white italic leading-relaxed mb-6 tracking-wide"
          style={{
            fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)",
            textShadow: "0 2px 24px rgba(0,0,0,0.7), 0 1px 6px rgba(0,0,0,0.5)",
            textWrap: "balance",
          } as any}
        >
          {t.quote}
        </h3>
      </div>
    </div>
  );
}
