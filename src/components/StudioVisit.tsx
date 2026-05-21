import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import aboutVideo from "@/assets/about-video.mp4?url";

const copy: Record<Lang, {
  eyebrow: string;
  title: string;
  desc: string;
  nameLabel: string;
  emailLabel: string;
  btnLabel: string;
  successMsg: string;
  studioLabel: string;
  contactLabel: string;
}> = {
  it: {
    eyebrow: "Esperienza Esclusiva",
    title: "Visita lo Studio",
    desc: "Aperto solo su appuntamento privato. Unisciti a noi nel cuore di Vilnius per esplorare le collezioni, toccare le tele materiche e respirare l'atmosfera creativa.",
    nameLabel: "NOME",
    emailLabel: "EMAIL",
    btnLabel: "RICHIEDI APPUNTAMENTO PRIVATO",
    successMsg: "Richiesta inviata. Ti contatteremo a breve.",
    studioLabel: "STUDIO D'ARTE",
    contactLabel: "CONTATTO",
  },
  en: {
    eyebrow: "Exclusive Experience",
    title: "Visit the Studio",
    desc: "Open by private appointment only. Join us in the heart of Vilnius to explore the collections, experience the raw textures, and feel the creative atmosphere.",
    nameLabel: "NAME",
    emailLabel: "EMAIL",
    btnLabel: "REQUEST PRIVATE VIEWING",
    successMsg: "Request sent. We will contact you shortly.",
    studioLabel: "ART STUDIO",
    contactLabel: "CONTACT",
  },
  es: {
    eyebrow: "Experiencia Exclusiva",
    title: "Visita el Estudio",
    desc: "Abierto solo con cita privada. Únete a nosotros en el corazón de Vilna para explorar las colecciones, experimentar las texturas y sentir la atmósfera creativa.",
    nameLabel: "NOMBRE",
    emailLabel: "CORREO ELECTRÓNICO",
    btnLabel: "SOLICITAR VISITA PRIVADA",
    successMsg: "Solicitud enviada. Nos pondremos en contacto contigo pronto.",
    studioLabel: "ESTUDIO DE ARTE",
    contactLabel: "CONTACTO",
  },
};

export default function StudioVisit() {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.es;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      style={{ background: "#0E0804" }}
      className="py-24 md:py-32 px-6 md:px-8 relative overflow-hidden scroll-mt-28"
    >
      {/* Top hairline */}
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "rgba(201,169,110,0.12)" }} />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left column - Content & Minimalist Form */}
        <div 
          ref={leftRef} 
          className={`lg:col-span-6 flex flex-col items-start relative z-10 transition-all duration-[1200ms] ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-[30px] opacity-0"
          }`}
        >
          <span
            className="font-bebas text-[#C9A96E]/60 tracking-[0.24em] block mb-4"
            style={{ fontSize: "0.75rem" }}
          >
            {t.eyebrow}
          </span>
          <h2
            className="font-display font-normal italic text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {t.title}
          </h2>
          <p className="font-body text-white/50 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
            {t.desc}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 mb-12">
            <div>
              <label className="font-bebas text-[0.62rem] tracking-[0.2em] text-[#C9A96E]/50 block mb-2">
                {t.nameLabel}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-2.5 text-white font-body text-sm outline-none transition-colors focus:border-[#C9A96E]"
                style={{ borderRadius: 0 }}
              />
            </div>
            <div>
              <label className="font-bebas text-[0.62rem] tracking-[0.2em] text-[#C9A96E]/50 block mb-2">
                {t.emailLabel}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-2.5 text-white font-body text-sm outline-none transition-colors focus:border-[#C9A96E]"
                style={{ borderRadius: 0 }}
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-4 text-center font-bebas text-[0.72rem] tracking-[0.3em] font-semibold transition-all duration-500 relative overflow-hidden"
              style={{
                background: submitted ? "#C9A96E" : "transparent",
                border: "1px solid #C9A96E",
                color: submitted ? "#0E0804" : "#C9A96E"
              }}
            >
              <span className="relative z-10">
                {submitted ? t.successMsg : t.btnLabel}
              </span>
            </button>
          </form>

          {/* Details footer */}
          <div className="grid grid-cols-2 gap-8 w-full border-t border-white/10 pt-8">
            <div>
              <span className="font-bebas text-[0.62rem] tracking-[0.2em] text-[#C9A96E]/50 block mb-2">
                {t.studioLabel}
              </span>
              <p className="font-body text-white/60 text-xs leading-relaxed">
                Gedimino pr. 37<br />
                Vilnius, Lithuania
              </p>
            </div>
            <div>
              <span className="font-bebas text-[0.62rem] tracking-[0.2em] text-[#C9A96E]/50 block mb-2">
                {t.contactLabel}
              </span>
              <p className="font-body text-white/60 text-xs leading-relaxed">
                studio@bluluceart.com<br />
                +370 664 08338
              </p>
            </div>
          </div>
        </div>

        {/* Right column - Elegant Video Block */}
        <div 
          ref={rightRef} 
          className={`lg:col-span-6 relative w-full aspect-[4/3] md:aspect-[16/11] overflow-hidden group transition-all duration-[1200ms] ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-[30px] opacity-0"
          }`} 
          style={{ border: "1px solid rgba(201,169,110,0.12)" }}
        >
          <div className="absolute inset-0 bg-[#0E0804]/10 pointer-events-none z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            style={{ filter: "brightness(0.88) contrast(1.05) saturate(0.95)" }}
            src={aboutVideo}
          />
        </div>
      </div>
    </section>
  );
}
