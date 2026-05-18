import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroInterior from "@/assets/hero-interior.webp?url";
import aboutDeliNew from "@/assets/about-deli-new.webp?url";
import heroDeli from "@/assets/hero-deli.webp?url";
import divSection1 from "@/assets/image for the div section n1 .png?url";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLLAGE = [
  { src: divSection1,  rotate: "-5deg",  top: "0px",   left: "0px",  right: "auto", width: "70%", height: "210px", zIndex: 1 },
  { src: heroDeli,     rotate: "4deg",   top: "15px",  left: "auto", right: "0px",  width: "62%", height: "190px", zIndex: 2 },
  { src: heroInterior, rotate: "-2deg",  top: "155px", left: "12%",  right: "auto", width: "64%", height: "200px", zIndex: 3 },
  { src: aboutDeliNew, rotate: "3.5deg", top: "185px", left: "auto", right: "5%",   width: "56%", height: "185px", zIndex: 4 },
];

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useGSAP(() => {
    gsap.fromTo(collageRef.current,
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } }
    );
    gsap.fromTo(quoteRef.current,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      style={{ background: "#F5EDE0", position: "relative", overflow: "hidden" }}
      className="pt-16 pb-14 px-6"
    >
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.065, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "300px 300px",
      }} />

      <div className="relative z-10 max-w-lg mx-auto">

        {/* Collage */}
        <div
          ref={collageRef}
          style={{ position: "relative", height: "clamp(340px, 90vw, 440px)" }}
        >
          {COLLAGE.map((p, i) => (
            <div
              key={i}
              onClick={() => setLightbox(p.src)}
              style={{
                position: "absolute",
                top: p.top,
                left: p.left,
                right: p.right,
                width: p.width,
                zIndex: p.zIndex,
                transform: `rotate(${p.rotate})`,
                boxShadow: "0 6px 28px rgba(42,24,16,0.22), 0 1px 4px rgba(42,24,16,0.12)",
                overflow: "hidden",
                background: "#1A0A06",
                cursor: "pointer",
              }}
            >
              <img
                src={p.src}
                alt=""
                style={{
                  width: "100%",
                  height: p.height,
                  objectFit: "cover",
                  display: "block",
                  filter: "saturate(0.88) contrast(1.05) brightness(0.95)",
                  transition: "transform 0.4s cubic-bezier(0.32,0.72,0,1)",
                }}
                loading={i < 2 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div ref={quoteRef} className="mt-10 text-center">
          <blockquote style={{ margin: 0 }}>
            <p
              className="font-display font-normal italic"
              style={{
                fontSize: "clamp(1.9rem, 7vw, 2.8rem)",
                color: "#1A0A06",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Vino,{" "}
              <span style={{ color: "#8B3A1A" }}>Pasta</span>{" "}
              e Amore.
            </p>
          </blockquote>
          <p
            className="font-bebas tracking-[0.2em] mt-4"
            style={{ fontSize: "0.6rem", color: "#8B3A1A" }}
          >
            L'Alimentari · Vilnius
          </p>
        </div>

      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(14,8,4,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <img
            src={lightbox}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "88dvh",
              objectFit: "contain",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
            aria-label="Chiudi"
          >
            ×
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </section>
  );
}
