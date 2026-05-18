import { useState } from "react";
import aboutVideo from "@/assets/about-video.mp4";
import aboutImage from "@/assets/about-deli-new.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";

// V1: CARTA BIANCA — Editorial Italian magazine. Light, typographic, oversized serif.
export const AboutV1 = () => {
  const { lang } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section id="about" className="bg-[#FDFBF7] pt-32 pb-24 overflow-hidden">
      {/* Eyebrow */}
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <div className="flex items-center gap-4">
          <span className="font-body text-[0.6rem] tracking-[0.4em] uppercase text-[#8B6E4F]">01</span>
          <div className="w-8 h-px bg-[#BF8A3D]/40" />
          <span className="font-body text-[0.6rem] tracking-[0.4em] uppercase text-[#8B6E4F]">{th("aboutLabel", lang)}</span>
        </div>
      </div>

      {/* Main grid: 55% text / 45% image */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-0 items-start">
        {/* Left: Typography hero */}
        <div className="pr-0 md:pr-16">
          <h2
            className="font-display text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] font-normal italic leading-[0.88] text-[#1A130B] mb-12"
            style={{ letterSpacing: "-0.02em" }}
          >
            {th("aboutTitle1", lang)}{" "}
            <span className="not-italic font-semibold text-[#C2522A]">{th("aboutTitleHighlight1", lang)}</span>
            <br />
            {th("aboutTitle2", lang)}{" "}
            <span className="not-italic font-semibold text-[#C2522A]">{th("aboutTitleHighlight2", lang)}</span>
          </h2>

          <div className="h-px bg-[#BF8A3D]/30 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <p className="font-body text-[#5C4A3A] leading-relaxed text-base">{th("aboutP1", lang)}</p>
            <div>
              <p className="font-body text-[#5C4A3A] leading-relaxed text-base mb-6">{th("aboutP2", lang)}</p>
              <p className="font-body text-[#5C4A3A] leading-relaxed text-base">{th("aboutP3", lang)}</p>
            </div>
          </div>

          <blockquote className="border-l border-[#BF8A3D]/40 pl-6 mb-12">
            <p className="font-display text-lg italic text-[#C2522A] leading-relaxed">{th("aboutQuote", lang)}</p>
          </blockquote>

          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+37066408338"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#1A130B] text-[#FDFBF7] font-body text-[0.65rem] tracking-[0.3em] uppercase transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#C2522A]"
            >
              {th("heroBookTable", lang)}
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform duration-500">→</span>
            </a>
            <a
              href={`/${lang}/menu`}
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#1A130B]/20 text-[#1A130B] font-body text-[0.65rem] tracking-[0.3em] uppercase hover:border-[#BF8A3D] hover:text-[#C2522A] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              {th("curiousSeeMenu", lang)}
            </a>
          </div>
        </div>

        {/* Right: Image with double-bezel */}
        <div className="mt-16 md:mt-0 md:-mr-8">
          <div className="p-1.5 bg-[#1A130B]/5 ring-1 ring-[#1A130B]/8 rounded-none">
            <div className="overflow-hidden relative" style={{ height: "680px" }}>
              <img src={aboutImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <video
                src={aboutVideo}
                autoPlay loop muted playsInline preload="auto"
                onLoadedData={() => setVideoReady(true)}
                className={`relative w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </div>
          <p className="font-body text-[0.6rem] tracking-[0.35em] uppercase text-[#8B6E4F] mt-3 text-right">Vilnius, Lietuva</p>
        </div>
      </div>
    </section>
  );
};
