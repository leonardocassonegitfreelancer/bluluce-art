import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutVideo from "@/assets/about-video.mp4";
import type { Lang } from "@/i18n/homeTranslations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const label: Record<Lang, string> = {
  it: "Dal Vivo",
  en: "In the Room",
  lt: "Atmosfera",
};

const heading: Record<Lang, [string, string]> = {
  it: ["Cucina aperta,", "niente segreti."],
  en: ["Open kitchen,", "no secrets."],
  lt: ["Atvira virtuvė,", "jokių paslapčių."],
};

export default function VideoSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [line1, line2] = heading[lang as Lang];

  useGSAP(() => {
    // Subtle parallax: video moves up as you scroll past
    gsap.to(videoRef.current, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Decorative line expands on enter
    gsap.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      }
    );

    // Text block fades up
    gsap.fromTo(textRef.current,
      { y: 48, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "88vh", background: "#0E0804" }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        src={aboutVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.42) contrast(1.08)", willChange: "transform" }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0804]/95 via-[#0E0804]/25 to-[#0E0804]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E0804]/55 to-transparent" />

      {/* Decorative top line */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 right-0"
        style={{
          height: "1px",
          background: "rgba(196,96,59,0.22)",
          transformOrigin: "left center",
        }}
      />

      {/* Text — bottom left */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-20 pb-14 md:pb-20"
      >
        <span className="font-bebas text-xl tracking-[0.15em] text-[#BF8A3D]/65 block mb-4">
          {label[lang as Lang]}
        </span>
        <h2
          className="font-display font-normal italic text-white leading-[0.88]"
          style={{
            fontSize: "clamp(2.6rem, 6.5vw, 5.8rem)",
            letterSpacing: "-0.02em",
            maxWidth: "18ch",
          }}
        >
          {line1}<br />
          <span style={{ color: "#E8825A" }}>{line2}</span>
        </h2>
      </div>
    </section>
  );
}
