import { useState } from "react";
import aboutVideo from "@/assets/about-video.mp4";
import aboutImage from "@/assets/about-deli-new.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";

// V3: LA GRIGLIA — Asymmetric bento grid. Modern, structured, editorial.
export const AboutV3 = () => {
  const { lang } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section id="about" className="bg-[#F5F0E8] pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-auto gap-3">

          {/* Cell 1: Big heading — spans 7 cols, 1 row */}
          <div className="md:col-span-7 bg-[#1A130B] p-10 md:p-14 flex flex-col justify-between min-h-[320px]">
            <span className="font-body text-[0.55rem] tracking-[0.5em] uppercase text-[#BF8A3D]/60">01 — {th("aboutLabel", lang)}</span>
            <h2
              className="font-display text-[2.8rem] md:text-[4.2rem] font-normal italic text-white leading-[0.92]"
              style={{ letterSpacing: "-0.02em" }}
            >
              {th("aboutTitle1", lang)}{" "}
              <span className="not-italic text-[#BF8A3D]">{th("aboutTitleHighlight1", lang)}</span>
              <br />{th("aboutTitle2", lang)}{" "}
              <span className="not-italic text-[#BF8A3D]">{th("aboutTitleHighlight2", lang)}</span>
            </h2>
          </div>

          {/* Cell 2: Image — spans 5 cols, 2 rows */}
          <div className="md:col-span-5 md:row-span-2 relative overflow-hidden min-h-[320px]">
            <img src={aboutImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <video
              src={aboutVideo}
              autoPlay loop muted playsInline preload="auto"
              onLoadedData={() => setVideoReady(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A130B]/30 to-transparent" />
          </div>

          {/* Cell 3: Text + CTA — spans 7 cols, 1 row */}
          <div className="md:col-span-7 bg-[#FDFBF7] p-10 flex flex-col justify-between min-h-[280px]">
            <div className="space-y-4">
              <p className="font-body text-[#5C4A3A] leading-relaxed">{th("aboutP1", lang)}</p>
              <p className="font-body text-[#5C4A3A] leading-relaxed">{th("aboutP2", lang)}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="tel:+37066408338"
                className="inline-flex items-center gap-3 px-7 py-3 bg-[#C2522A] text-white font-body text-[0.6rem] tracking-[0.3em] uppercase font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#1A130B]"
              >
                {th("heroBookTable", lang)}
              </a>
              <a
                href={`/${lang}/menu`}
                className="inline-flex items-center gap-3 px-7 py-3 border border-[#1A130B]/20 text-[#1A130B] font-body text-[0.6rem] tracking-[0.3em] uppercase hover:bg-[#1A130B] hover:text-white transition-all duration-700"
              >
                {th("curiousSeeMenu", lang)}
              </a>
            </div>
          </div>

          {/* Cell 4: Quote — spans 5 cols */}
          <div className="md:col-span-5 bg-[#C2522A] p-10 flex items-center min-h-[160px]">
            <p className="font-display text-xl italic text-white/90 leading-snug">{th("aboutQuote", lang)}</p>
          </div>

          {/* Cell 5: Stat strip — spans 7 cols */}
          <div className="md:col-span-7 bg-[#1A130B]/5 p-8 flex items-center justify-around">
            {[
              { n: "100%", l: "Italiano" },
              { n: "Fresco", l: "ogni giorno" },
              { n: "Vilnius", l: "Senamiestyje" },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <p className="font-display text-2xl md:text-3xl font-semibold text-[#1A130B]">{s.n}</p>
                <p className="font-body text-[0.55rem] tracking-[0.3em] uppercase text-[#8B6E4F] mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
