import { useState } from "react";
import aboutVideo from "@/assets/about-video.mp4";
import aboutImage from "@/assets/about-deli-new.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";

// V4: ARCHITETTURA — Precise, architectural dark. Double-bezel frames. Cold luxury.
export const AboutV4 = () => {
  const { lang } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section id="about" className="bg-[#0E0C0A] pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">

        {/* Top rule with label */}
        <div className="flex items-center gap-6 mb-20">
          <div className="flex-1 h-px bg-white/8" />
          <span className="font-body text-[0.55rem] tracking-[0.5em] uppercase text-white/25">{th("aboutLabel", lang)}</span>
          <span className="font-body text-[0.55rem] tracking-[0.5em] uppercase text-white/25">01</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[45fr_55fr] gap-16 items-center">

          {/* Left: Double-bezel image frame */}
          <div>
            {/* Outer shell */}
            <div className="p-2 bg-white/3 ring-1 ring-white/8">
              {/* Inner core */}
              <div className="relative overflow-hidden" style={{ height: "580px" }}>
                <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]" />
                <img src={aboutImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                <video
                  src={aboutVideo}
                  autoPlay loop muted playsInline preload="auto"
                  onLoadedData={() => setVideoReady(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-90" : "opacity-0"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/40 to-transparent" />
              </div>
            </div>
            {/* Caption */}
            <div className="flex justify-between items-center mt-3 px-1">
              <span className="font-body text-[0.5rem] tracking-[0.4em] uppercase text-white/20">Gastronomia</span>
              <span className="font-body text-[0.5rem] tracking-[0.4em] uppercase text-white/20">Vilnius</span>
            </div>
          </div>

          {/* Right: Typography */}
          <div>
            <div className="w-6 h-px bg-[#BF8A3D]/60 mb-8" />

            <h2
              className="font-display text-[3rem] md:text-[4.5rem] font-normal text-white leading-[0.92] mb-10"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span className="italic">{th("aboutTitle1", lang)}</span>{" "}
              <span className="italic font-semibold text-[#BF8A3D]">{th("aboutTitleHighlight1", lang)}</span>
              <br />
              <span className="italic">{th("aboutTitle2", lang)}</span>{" "}
              <span className="italic font-semibold text-[#BF8A3D]">{th("aboutTitleHighlight2", lang)}</span>
            </h2>

            <div className="space-y-5 mb-10">
              <p className="font-body text-white/50 leading-relaxed">{th("aboutP1", lang)}</p>
              <p className="font-body text-white/50 leading-relaxed">{th("aboutP2", lang)}</p>
              <p className="font-body text-white/50 leading-relaxed">{th("aboutP3", lang)}</p>
            </div>

            <div className="border-l border-[#BF8A3D]/20 pl-5 mb-12">
              <p className="font-display text-lg italic text-[#BF8A3D]/80 leading-relaxed">{th("aboutQuote", lang)}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+37066408338"
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#BF8A3D] text-[#0E0C0A] font-body text-[0.6rem] tracking-[0.3em] uppercase font-bold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white"
              >
                {th("heroBookTable", lang)}
                <span className="w-5 h-5 bg-black/10 flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
              <a
                href={`/${lang}/menu`}
                className="inline-flex items-center px-8 py-3.5 border border-white/12 text-white/60 font-body text-[0.6rem] tracking-[0.3em] uppercase hover:border-[#BF8A3D]/40 hover:text-[#BF8A3D] transition-all duration-700"
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
