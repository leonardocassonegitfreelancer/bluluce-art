import { useState } from "react";
import aboutVideo from "@/assets/about-video.mp4";
import aboutImage from "@/assets/about-deli-new.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";

// V5: LA DOLCE — Warm, lush, layered. Ghost text. Italian energy. Z-axis cascade.
export const AboutV5 = () => {
  const { lang } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section id="about" className="bg-[#2A1A0E] pt-32 pb-32 overflow-hidden relative">
      {/* Ghost background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-bold text-white/[0.025] leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(8rem, 20vw, 22rem)", letterSpacing: "-0.04em" }}
        >
          ITALIA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">

        {/* Top: label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-body text-[0.55rem] tracking-[0.5em] uppercase text-[#BF8A3D]/50">Gastronomia</span>
          <div className="flex-1 h-px bg-[#BF8A3D]/15" />
          <span className="font-body text-[0.55rem] tracking-[0.5em] uppercase text-[#BF8A3D]/50">Vilnius</span>
        </div>

        {/* Z-axis cascade: image and text overlapping */}
        <div className="relative">

          {/* Image block — positioned left, large */}
          <div className="relative md:w-[55%] z-10">
            <div className="relative overflow-hidden" style={{ height: "520px" }}>
              <img src={aboutImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <video
                src={aboutVideo}
                autoPlay loop muted playsInline preload="auto"
                onLoadedData={() => setVideoReady(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2A1A0E]/60" />
              {/* Floating label on image */}
              <div className="absolute bottom-6 left-6">
                <span className="font-body text-[0.55rem] tracking-[0.35em] uppercase text-white/50">Dal 2019</span>
              </div>
            </div>
          </div>

          {/* Text block — overlaps image on the right */}
          <div className="md:absolute md:top-12 md:right-0 md:w-[52%] z-20 bg-[#1A0F08] p-10 md:p-14 mt-4 md:mt-0">
            <h2
              className="font-display text-[2.5rem] md:text-[3.8rem] font-normal italic text-[#F0E6D3] leading-[0.9] mb-8"
              style={{ letterSpacing: "-0.015em" }}
            >
              {th("aboutTitle1", lang)}{" "}
              <span className="not-italic font-semibold text-[#BF8A3D]">{th("aboutTitleHighlight1", lang)}</span>
              <br />
              {th("aboutTitle2", lang)}{" "}
              <span className="not-italic font-semibold text-[#BF8A3D]">{th("aboutTitleHighlight2", lang)}</span>
            </h2>

            <div className="w-12 h-px bg-[#BF8A3D]/40 mb-8" />

            <p className="font-body text-[#F0E6D3]/60 leading-relaxed mb-5">{th("aboutP1", lang)}</p>
            <p className="font-body text-[#F0E6D3]/60 leading-relaxed mb-10">{th("aboutP2", lang)}</p>

            <p className="font-display text-base italic text-[#BF8A3D]/80 mb-10 leading-relaxed">{th("aboutQuote", lang)}</p>

            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+37066408338"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#BF8A3D] text-[#1A0F08] font-body text-[0.6rem] tracking-[0.3em] uppercase font-bold hover:bg-[#E8C76A] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                {th("heroBookTable", lang)}
              </a>
              <a
                href={`/${lang}/menu`}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#BF8A3D]/25 text-[#BF8A3D] font-body text-[0.6rem] tracking-[0.3em] uppercase hover:bg-[#BF8A3D]/10 transition-all duration-700"
              >
                {th("curiousSeeMenu", lang)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
