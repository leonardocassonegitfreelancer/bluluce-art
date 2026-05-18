import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import insideVideo from "@/assets/inside-video.mp4?url";
import type { Lang } from "@/i18n/homeTranslations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const copy: Record<Lang, { label: string; title: [string, string] }> = {
  it: { label: "Il locale", title: ["Un'occhiata", "dentro."] },
  en: { label: "The place", title: ["Take a look", "inside."] },
  lt: { label: "Vieta",    title: ["Pažvelk", "į vidų."] },
};

export default function InsideSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { label, title } = copy[lang as Lang];

  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setPlaying(true);
  };

  useGSAP(() => {
    gsap.fromTo(headerRef.current,
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } }
    );
    gsap.fromTo(videoWrapRef.current,
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      style={{ background: "#0E0804", position: "relative" }}
      className="py-20 md:py-28 px-6 md:px-10"
    >
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "300px 300px",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-10 md:mb-14">
          <span
            className="font-bebas tracking-[0.2em] block mb-4"
            style={{ fontSize: "0.68rem", color: "#BF8A3D" }}
          >
            {label}
          </span>
          <h2
            className="font-display font-normal italic leading-[0.88]"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              letterSpacing: "-0.025em",
              color: "#F0E6D0",
            }}
          >
            {title[0]}<br />
            <span style={{ color: "#BF8A3D" }}>{title[1]}</span>
          </h2>
        </div>

        {/* Video */}
        <div
          ref={videoWrapRef}
          style={{
            padding: "3px",
            border: "1px solid rgba(191,138,61,0.4)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          }}
        >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <video
            ref={videoRef}
            src={insideVideo}
            loop
            playsInline
            controls={playing}
            style={{
              width: "100%",
              display: "block",
              maxHeight: "72vh",
              objectFit: "cover",
              filter: "brightness(0.92) contrast(1.04) saturate(0.95)",
            }}
          />

          {/* Play button overlay */}
          {!playing && (
            <button
              onClick={handlePlay}
              aria-label="Play video"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                background: "rgba(14,8,4,0.35)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(240,230,208,0.12)",
                border: "1px solid rgba(240,230,208,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(6px)",
                transition: "transform 0.4s cubic-bezier(0.32,0.72,0,1), background 0.4s",
              }}>
                <svg viewBox="0 0 24 24" width={24} height={24} fill="#F0E6D0">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
        </div>

      </div>
    </section>
  );
}
