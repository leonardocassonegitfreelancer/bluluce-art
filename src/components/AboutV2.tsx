import { useState, useEffect, useRef } from "react";
import aboutVideo from "@/assets/about-video.mp4";
import aboutImage from "@/assets/about-deli-new.webp?url";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import gsap from "gsap";

// V2: OSTERIA NERA — Cinema dark. Video as star. Text minimal and dramatic.
export const AboutV2 = () => {
  const { lang } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(bodyRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(statsRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative min-h-[100dvh] flex items-end overflow-hidden bg-[#0C0A08]">
      {/* Full-bleed video background */}
      <div className="absolute inset-0">
        <img src={aboutImage} alt="" className="absolute inset-0 w-full h-full object-cover md:object-top" />
        <video
          src={aboutVideo}
          autoPlay loop muted playsInline preload="auto"
          onLoadedData={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover md:object-top transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D06] via-[#1A0D06]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D06]/65 to-transparent" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-14 pt-48">
        <div className="max-w-xl">
          <div ref={labelRef} className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px bg-[#BF8A3D]/70" />
            <span className="font-bebas text-base tracking-[0.14em] text-[#BF8A3D]/70">
              {th("aboutLabel", lang)}
            </span>
          </div>

          <h2
            ref={headingRef}
            className="font-display text-[2.2rem] md:text-[3.2rem] font-normal italic text-white leading-[0.92] mb-8"
            style={{ letterSpacing: "-0.015em" }}
          >
            {th("aboutTitle1", lang)}{" "}
            <span className="not-italic font-semibold text-[#E8825A]">{th("aboutTitleHighlight1", lang)}</span>
            {" "}{th("aboutTitle2", lang)}{" "}
            <span className="not-italic font-semibold text-[#E8825A]">{th("aboutTitleHighlight2", lang)}</span>
          </h2>

          {/* hidden — cibo parla da solo */}
          <div ref={bodyRef} />

          <div ref={ctaRef} className="flex flex-wrap gap-3">
            <a
              href="tel:+37066408338"
              className="inline-flex items-center px-7 py-3 bg-[#BF8A3D] text-white font-body text-[0.6rem] tracking-[0.3em] uppercase font-bold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#D4703E] active:scale-[0.98]"
            >
              {th("heroBookTable", lang)}
            </a>
            <a
              href={`/${lang}/menu`}
              className="inline-flex items-center px-7 py-3 border border-white/15 text-white/70 font-body text-[0.6rem] tracking-[0.3em] uppercase hover:border-[#BF8A3D]/50 hover:text-[#E8825A] transition-all duration-700 active:scale-[0.98]"
            >
              {th("curiousSeeMenu", lang)}
            </a>
          </div>
        </div>

        <div ref={statsRef} className="absolute right-8 bottom-20 hidden lg:flex flex-col gap-6 text-right">
          <div>
            <p className="font-display text-3xl font-semibold text-[#F0E6D0]">100%</p>
            <p className="font-body text-[0.55rem] tracking-[0.4em] uppercase text-[#BF8A3D]/50 mt-1">{th("aboutItalian", lang)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
