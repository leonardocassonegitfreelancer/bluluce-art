import React from "react";
import { Instagram } from "lucide-react";
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
      style={{ background: "#0E0804" }}
      className="py-16 px-6 md:px-8"
    >
      <div className="max-w-5xl mx-auto">

        {/* Top rule */}
        <div className="h-px mb-14" style={{ background: "rgba(255,255,255,0.08)" }} />

        <div className="grid md:grid-cols-3 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-1">
            <p
              className="font-display text-xl font-bold tracking-[0.14em] mb-1"
              style={{ color: "#F0E6D0" }}
            >
              BLULUCE
            </p>
            <p
              className="font-body uppercase tracking-[0.3em] mb-5"
              style={{ fontSize: "0.52rem", color: "#C9A96E" }}
            >
              {t.tagline}
            </p>
            <p
              className="font-body text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {t.desc}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p
              className="font-body uppercase tracking-[0.3em] mb-5"
              style={{ fontSize: "0.52rem", color: "#C9A96E" }}
            >
              {t.linksLabel}
            </p>
            <ul className="space-y-3">
              {t.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
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
              className="font-body uppercase tracking-[0.3em] mb-5"
              style={{ fontSize: "0.52rem", color: "#C9A96E" }}
            >
              Social
            </p>
            <a
              href="https://www.instagram.com/bluluce.art/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              aria-label="Instagram"
            >
              <Instagram size={16} strokeWidth={1.5} />
              <span className="font-body text-sm">@bluluce.art</span>
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="h-px mb-7" style={{ background: "rgba(255,255,255,0.08)" }} />
        <p
          className="font-body uppercase tracking-[0.25em] text-center"
          style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.25)" }}
        >
          © 2026 BLULUCE ART — {t.rights}
        </p>

      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
