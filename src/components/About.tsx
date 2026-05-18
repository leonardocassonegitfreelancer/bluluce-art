import { useState } from "react";
import aboutVideo from "@/assets/about-video.mp4";
import aboutImage from "@/assets/about-deli-new.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";

const About = () => {
  const { lang } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section id="about" className="pt-28 md:pt-32 pb-24 px-6 bg-background">
      {/* Video + Text Grid — primo impatto visivo */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="overflow-hidden rounded-lg relative">
          <img src={aboutImage} alt="" className="absolute inset-0 w-full h-[500px] object-cover" />
          <video
            src={aboutVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoReady(true)}
            className={`relative w-full h-[500px] object-cover transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-foreground/10 to-transparent" />
        </div>
        <div>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            {th("aboutLabel", lang)}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
            {th("aboutTitle1", lang)}{" "}
            <span className="italic text-primary">{th("aboutTitleHighlight1", lang)}</span>{" "}
            {th("aboutTitle2", lang)}{" "}
            <span className="italic text-primary">{th("aboutTitleHighlight2", lang)}</span>
          </h2>
          <div className="w-16 h-px bg-gold mb-8" />
          <p className="font-body text-muted-foreground leading-relaxed mb-6">
            {th("aboutP1", lang)}
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            {th("aboutP2", lang)}
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            {th("aboutP3", lang)}
          </p>
          <p className="font-display text-lg italic text-primary">
            {th("aboutQuote", lang)}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 mt-12">
        <a
          href="tel:+37066408338"
          className="inline-flex items-center justify-center px-6 sm:px-8 py-3 font-body text-xs sm:text-sm tracking-widest uppercase border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-sm"
        >
          {th("heroBookTable", lang)}
        </a>
        <a
          href={`/${lang}/menu`}
          className="inline-flex items-center justify-center px-6 sm:px-8 py-3 font-body text-xs sm:text-sm tracking-widest uppercase border-2 border-primary text-primary hover:bg-primary/10 transition-colors rounded-sm"
        >
          {th("curiousSeeMenu", lang)}
        </a>
      </div>
    </section>
  );
};

export default About;
