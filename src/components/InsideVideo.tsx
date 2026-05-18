import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import insideVideo from "@/assets/inside-video.mp4";

const InsideVideo = () => {
  const { lang } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6" style={{ background: "#F2E4CB" }}>
      <div className="max-w-5xl mx-auto">

        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center">

          {/* Left: text */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="font-bebas text-xl tracking-[0.12em] text-[#BF8A3D]/70 block mb-4">
              {th("insideLabel", lang)}
            </span>
            <h2
              className="font-display text-[2.5rem] md:text-[3.8rem] font-normal italic text-[#2A1810] leading-[0.92] mb-8"
              style={{ letterSpacing: "-0.015em" }}
            >
              {th("insideTitle", lang)}
            </h2>
            <div className="w-10 h-px bg-[#BF8A3D]/40" />
          </div>

          {/* Right: video portrait */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: visible ? "150ms" : "0ms" }}
          >
            {/* Double-bezel wrapper */}
            <div className="p-1.5 bg-[#BF8A3D]/[0.06] ring-1 ring-[#BF8A3D]/20">
              <div className="relative overflow-hidden" style={{ width: "260px", height: "462px" }}>
                <video
                  ref={videoRef}
                  src={insideVideo}
                  controls={playing}
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-contain bg-[#2A1810]"
                />
                {!playing && (
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors duration-500 cursor-pointer group"
                    aria-label="Play video"
                  >
                    <div className="w-14 h-14 rounded-full border border-[#BF8A3D]/60 bg-[#BF8A3D]/20 flex items-center justify-center transition-all duration-500 group-hover:bg-[#BF8A3D]/40 group-hover:scale-105">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 ml-0.5 fill-white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InsideVideo;
