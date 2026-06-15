import React from "react";
import { Instagram } from "lucide-react";
import formBg from "@/assets/form_background_paint.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";

const copy: Record<Lang, {
  tagline: string;
  desc: string;
  linksLabel: string;
  links: { label: string; href: string }[];
  rights: string;
}> = {
  es: {
    tagline: "Arte Mediterránea",
    desc: "Obras originales inspiradas en la luz, el mar y los colores del Mediterráneo.",
    linksLabel: "Explorar",
    links: [
      { label: "Colección", href: "/es/tienda" },
      { label: "Galería", href: "/es/gallery" },
    ],
    rights: "Todos los derechos reservados.",
  },
  en: {
    tagline: "Mediterranean Art",
    desc: "Original works inspired by the light, sea and colours of the Mediterranean.",
    linksLabel: "Explore",
    links: [
      { label: "Collection", href: "/en/shop" },
      { label: "Gallery", href: "/en/gallery" },
    ],
    rights: "All rights reserved.",
  },
  it: {
    tagline: "Arte Mediterranea",
    desc: "Opere originali ispirate alla luce, al mare e ai colori del Mediterraneo.",
    linksLabel: "Esplora",
    links: [
      { label: "Collezione", href: "/it/collezione" },
      { label: "Galleria", href: "/it/gallery" },
    ],
    rights: "Tutti i diritti riservati.",
  },
};

const Footer = React.forwardRef<HTMLElement>((_, ref) => {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.es;

  return (
    <footer
      ref={ref}
      style={{ position: "relative", overflow: "hidden", minHeight: "280px" }}
      className="py-16 px-6 md:px-8"
    >
      {/* Responsive styles for mobile */}
      <style>{`
        .footer-bg-img { height: 100% !important; }
        .footer-gradient { background: linear-gradient(to bottom, #FAFAF8 0%, #FAFAF8 8%, rgba(250,248,245,0.4) 20%, rgba(250,248,245,0) 45%) !important; }
        .footer-content {
          padding-top: 3.5rem !important;
        }
        @media (max-width: 768px) {
          .footer-content {
            padding-top: 9.5rem !important;
          }
        }
      `}</style>
      {/* Paint brushes background */}
      <img
        src={formBg.src}
        alt=""
        aria-hidden="true"
        className="footer-bg-img"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          objectFit: "cover",
          objectPosition: "bottom center",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Gradient: page-bg at top → transparent, so footer blends in from above */}
      <div
        aria-hidden="true"
        className="footer-gradient"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }} className="max-w-5xl mx-auto footer-content">

        {/* Top rule */}
        <div className="h-px mb-14" style={{ background: "rgba(14, 8, 4, 0.15)" }} />

        <div className="grid md:grid-cols-3 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-1">
            <p
              className="font-display text-xl font-bold tracking-[0.14em] mb-1"
              style={{
                color: "#1c1917",
                textShadow: "-1.5px -1.5px 0 #fafaf8, 1.5px -1.5px 0 #fafaf8, -1.5px 1.5px 0 #fafaf8, 1.5px 1.5px 0 #fafaf8, 0 0 8px rgba(250,248,245,0.9)"
              }}
            >
              BLULUCE
            </p>
            <p
              className="font-body uppercase tracking-[0.3em] mb-5 font-bold"
              style={{
                fontSize: "0.62rem",
                color: "#b08d4e",
                textShadow: "-1px -1px 0 #fafaf8, 1px -1px 0 #fafaf8, -1px 1px 0 #fafaf8, 1px 1px 0 #fafaf8, 0 0 5px rgba(250,248,245,0.8)"
              }}
            >
              {t.tagline}
            </p>
            <p
              className="font-body text-sm leading-relaxed max-w-xs font-bold"
              style={{
                color: "#1c1917",
                textShadow: "-1.5px -1.5px 0 #fafaf8, 1.5px -1.5px 0 #fafaf8, -1.5px 1.5px 0 #fafaf8, 1.5px 1.5px 0 #fafaf8, 0 0 8px rgba(250,248,245,0.9)"
              }}
            >
              {t.desc}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p
              className="font-body uppercase tracking-[0.3em] mb-5 font-bold"
              style={{
                fontSize: "0.62rem",
                color: "#b08d4e",
                textShadow: "-1px -1px 0 #fafaf8, 1px -1px 0 #fafaf8, -1px 1px 0 #fafaf8, 1px 1px 0 #fafaf8, 0 0 5px rgba(250,248,245,0.8)"
              }}
            >
              {t.linksLabel}
            </p>
            <ul className="space-y-3">
              {t.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm font-bold transition-colors duration-300"
                    style={{
                      color: "#1c1917",
                      textShadow: "-1.5px -1.5px 0 #fafaf8, 1.5px -1.5px 0 #fafaf8, -1.5px 1.5px 0 #fafaf8, 1.5px 1.5px 0 #fafaf8, 0 0 8px rgba(250,248,245,0.9)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#b08d4e";
                      e.currentTarget.style.textShadow = "-1.5px -1.5px 0 #fafaf8, 1.5px -1.5px 0 #fafaf8, -1.5px 1.5px 0 #fafaf8, 1.5px 1.5px 0 #fafaf8, 0 0 8px rgba(250,248,245,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#1c1917";
                      e.currentTarget.style.textShadow = "-1.5px -1.5px 0 #fafaf8, 1.5px -1.5px 0 #fafaf8, -1.5px 1.5px 0 #fafaf8, 1.5px 1.5px 0 #fafaf8, 0 0 8px rgba(250,248,245,0.9)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p
              className="font-body uppercase tracking-[0.3em] mb-5 font-bold"
              style={{
                fontSize: "0.62rem",
                color: "#b08d4e",
                textShadow: "-1px -1px 0 #fafaf8, 1px -1px 0 #fafaf8, -1px 1px 0 #fafaf8, 1px 1px 0 #fafaf8, 0 0 5px rgba(250,248,245,0.8)"
              }}
            >
              Social
            </p>
            <a
              href="https://www.instagram.com/bluluce.art/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 transition-colors duration-300"
              style={{
                color: "#1c1917",
                fontWeight: 700,
                textShadow: "-1.5px -1.5px 0 #fafaf8, 1.5px -1.5px 0 #fafaf8, -1.5px 1.5px 0 #fafaf8, 1.5px 1.5px 0 #fafaf8, 0 0 8px rgba(250,248,245,0.9)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#b08d4e";
                e.currentTarget.style.textShadow = "-1.5px -1.5px 0 #fafaf8, 1.5px -1.5px 0 #fafaf8, -1.5px 1.5px 0 #fafaf8, 1.5px 1.5px 0 #fafaf8, 0 0 8px rgba(250,248,245,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#1c1917";
                e.currentTarget.style.textShadow = "-1.5px -1.5px 0 #fafaf8, 1.5px -1.5px 0 #fafaf8, -1.5px 1.5px 0 #fafaf8, 1.5px 1.5px 0 #fafaf8, 0 0 8px rgba(250,248,245,0.9)";
              }}
              aria-label="Instagram"
            >
              <Instagram size={16} strokeWidth={1.5} />
              <span className="font-body text-sm font-bold">@bluluce.art</span>
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="h-px mb-7" style={{ background: "rgba(14, 8, 4, 0.15)" }} />
        <p
          className="font-body uppercase tracking-[0.25em] text-center font-bold"
          style={{
            fontSize: "0.58rem",
            color: "#1c1917",
            textShadow: "-1px -1px 0 #fafaf8, 1px -1px 0 #fafaf8, -1px 1px 0 #fafaf8, 1px 1px 0 #fafaf8, 0 0 5px rgba(250,248,245,0.8)"
          }}
        >
          © 2026 BLULUCE ART — {t.rights}
        </p>

      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
