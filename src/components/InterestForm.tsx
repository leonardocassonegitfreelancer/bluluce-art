import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";

// ─── Copy trilingue ───────────────────────────────────────────────────────────

const copy: Record<Lang, {
  eyebrow: string;
  headline: string;
  sub: string;
  products: { id: string; label: string }[];
  placeholder: string;
  cta: string;
  success: string;
  successSub: string;
  privacy: string;
}> = {
  es: {
    eyebrow: "Colección Privada",
    headline: "¿Una obra para tu espacio?",
    sub: "Escríbenos y te orientamos hacia la pieza que mejor encaje con tu mirada.",
    products: [
      { id: "cuadros",   label: "Cuadros originales" },
      { id: "calamitas", label: "Imanes artesanales" },
      { id: "ambos",     label: "Ambos" },
    ],
    placeholder: "Tu dirección de email",
    cta: "ESCRIBIRNOS →",
    success: "Gracias. Te contactamos pronto.",
    successSub: "Síguenos en Instagram para ver las últimas obras.",
    privacy: "Sin spam. Solo arte.",
  },
  en: {
    eyebrow: "Private Collection",
    headline: "A piece for your space?",
    sub: "Write to us and we'll guide you toward the work that speaks to you.",
    products: [
      { id: "paintings", label: "Original paintings" },
      { id: "magnets",   label: "Handcrafted magnets" },
      { id: "both",      label: "Both" },
    ],
    placeholder: "Your email address",
    cta: "GET IN TOUCH →",
    success: "Thank you. We'll be in touch soon.",
    successSub: "Follow us on Instagram for new works.",
    privacy: "No spam. Just art.",
  },
  it: {
    eyebrow: "Collezione Privata",
    headline: "Un'opera per il tuo spazio?",
    sub: "Scrivici e ti guidiamo verso il dipinto che fa per te.",
    products: [
      { id: "quadri",    label: "Quadri originali" },
      { id: "calamite",  label: "Calamite artigianali" },
      { id: "entrambi",  label: "Entrambi" },
    ],
    placeholder: "Il tuo indirizzo email",
    cta: "SCRIVICI →",
    success: "Grazie. Ti scriviamo presto.",
    successSub: "Seguici su Instagram per le nuove opere.",
    privacy: "Niente spam. Solo arte.",
  },
};

// ─── Formspree endpoint — replace with your own from formspree.io ─────────────
// Create a free account at formspree.io → New Form → copy the endpoint id
const FORMSPREE_ID = "xpwzgvqk"; // placeholder — sostituisci con il tuo ID

// ─── Component ────────────────────────────────────────────────────────────────

export default function InterestForm() {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.es;

  const sectionRef  = useRef<HTMLElement>(null);
  const [visible,   setVisible]   = useState(false);
  const [interest,  setInterest]  = useState("");
  const [email,     setEmail]     = useState("");
  const [status,    setStatus]    = useState<"idle" | "loading" | "success" | "error">("idle");

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !interest) return;
    setStatus("loading");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, interest, lang, _subject: `Bluluce — Interesse da ${lang.toUpperCase()}` }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="interesse"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F3EFE6 0%, #EDE8DE 100%)" }}
    >

      <div className={`relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32 transition-all duration-[1100ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {status === "success" ? (
          <div className="text-center py-12">
            <p className="font-bebas tracking-[0.28em] mb-6" style={{ fontSize: "0.7rem", color: "#B5915D" }}>
              {t.eyebrow}
            </p>
            <p className="font-display italic mb-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#1E1A16" }}>
              {t.success}
            </p>
            <p className="font-body text-sm mb-8" style={{ color: "rgba(14,8,4,0.45)" }}>
              {t.successSub}
            </p>
            <a href="https://www.instagram.com/bluluce.art/"
              target="_blank" rel="noopener noreferrer"
              className="font-bebas tracking-[0.22em] text-[0.7rem] transition-colors duration-300"
              style={{ color: "#B5915D" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1E1A16")}
              onMouseLeave={e => (e.currentTarget.style.color = "#B5915D")}>
              @BLULUCE.ART →
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

            {/* Left — editorial text */}
            <div>
              <p className="font-bebas tracking-[0.28em] mb-8" style={{ fontSize: "0.68rem", color: "#B5915D" }}>
                {t.eyebrow}
              </p>
              <h2 className="font-display font-normal italic leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)", color: "#1E1A16" }}>
                {t.headline}
              </h2>
              <p className="font-body leading-relaxed" style={{ fontSize: "0.9rem", color: "rgba(14,8,4,0.5)", maxWidth: "34ch" }}>
                {t.sub}
              </p>
            </div>

            {/* Right — form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">

              {/* Interest selector — text options, not pills */}
              <div>
                <p className="font-bebas tracking-[0.22em] mb-5" style={{ fontSize: "0.6rem", color: "rgba(14,8,4,0.35)" }}>
                  {lang === "it" ? "MI INTERESSA" : lang === "en" ? "I'M INTERESTED IN" : "ME INTERESA"}
                </p>
                <div className="flex flex-col gap-0">
                  {t.products.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setInterest(p.id)}
                      className="group flex items-center justify-between py-4 text-left transition-all duration-300"
                      style={{
                        borderTop: i === 0 ? "1px solid rgba(14,8,4,0.1)" : "none",
                        borderBottom: "1px solid rgba(14,8,4,0.1)",
                      }}
                    >
                      <span className="font-body text-sm transition-colors duration-300"
                        style={{ color: interest === p.id ? "#B5915D" : "rgba(14,8,4,0.55)" }}>
                        {p.label}
                      </span>
                      <span className="transition-all duration-300"
                        style={{
                          color: interest === p.id ? "#B5915D" : "transparent",
                          fontSize: "0.7rem",
                          fontFamily: "var(--font-bebas, sans-serif)",
                          letterSpacing: "0.1em",
                        }}>
                        ✦
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email — underline only */}
              <div style={{ borderBottom: "1px solid rgba(14,8,4,0.2)" }}
                className="transition-all duration-300"
                onFocusCapture={e => (e.currentTarget.style.borderBottomColor = "#B5915D")}
                onBlurCapture={e => (e.currentTarget.style.borderBottomColor = "rgba(14,8,4,0.2)")}>
                <input
                  id="interest-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full pb-3 font-body text-sm bg-transparent outline-none"
                  style={{ color: "#1E1A16", caretColor: "#B5915D" }}
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={status === "loading" || !interest}
                  className="w-full font-bebas tracking-[0.25em] py-4 text-[0.72rem] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: status === "loading" ? "rgba(201,169,110,0.7)" : "#C9A96E",
                    color: "#0E0804",
                  }}
                  onMouseEnter={e => { if (status !== "loading" && interest) (e.currentTarget as HTMLButtonElement).style.background = "#0E0804"; }}
                  onMouseLeave={e => { if (status !== "loading") (e.currentTarget as HTMLButtonElement).style.background = "#C9A96E"; }}
                >
                  {status === "loading" ? "..." : t.cta}
                </button>

                {status === "error" && (
                  <p className="font-body text-xs text-center" style={{ color: "rgba(255,120,100,0.7)" }}>
                    Qualcosa è andato storto. Riprova o scrivici su Instagram.
                  </p>
                )}

                <p className="font-body text-center tracking-widest uppercase"
                  style={{ fontSize: "0.55rem", color: "rgba(14,8,4,0.25)" }}>
                  {t.privacy}
                </p>
              </div>

            </form>
          </div>
        )}
      </div>
    </section>
  );
}
