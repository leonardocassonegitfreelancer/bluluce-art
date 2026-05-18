import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import carbonaraImg from "@/assets/carbonara-pasta.webp?url";
import burrataImg    from "@/assets/burrata-prosciutto.webp?url";
import tiramisuImg   from "@/assets/tiramisu.webp?url";
import interiorImg   from "@/assets/hero-interior.webp?url";
import focacciaImg   from "@/assets/focaccia-parma.webp?url";
import deliImg       from "@/assets/about-deli-new.webp?url";
import lasagnaImg    from "@/assets/lasagna.webp?url";

const eyebrow: Record<Lang, string> = {
  it: "La Nostra Cucina",
  en: "Our Kitchen",
  lt: "Mūsų Virtuvė",
};

const igLabel: Record<Lang, string> = {
  it: "Seguici su Instagram",
  en: "Follow us on Instagram",
  lt: "Sekite mus Instagram",
};

// a=2×2  b=1×1  c=1×1  d=2×1  e=1×1  f=3×2  g=1×1
const photos = [
  { src: carbonaraImg, alt: "Carbonara",           area: "a" },
  { src: burrataImg,   alt: "Burrata e Prosciutto", area: "b" },
  { src: tiramisuImg,  alt: "Tiramisù",             area: "c" },
  { src: interiorImg,  alt: "Il locale",            area: "d" },
  { src: focacciaImg,  alt: "Focaccia Parma",       area: "e" },
  { src: deliImg,      alt: "Cucina",               area: "f" },
  { src: lasagnaImg,   alt: "Lasagna",              area: "g" },
];

const ROW_H = 260; // px per row unit

export default function GallerySection() {
  const { lang } = useLanguage();

  return (
    <section style={{ background: "#0E0804" }}>

      {/* Eyebrow */}
      <div style={{ textAlign: "center", padding: "72px 24px 40px" }}>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "#8B3A1A",
            display: "block",
            marginBottom: "16px",
          }}
        >
          {eyebrow[lang as Lang]}
        </span>
        <div style={{ width: "40px", height: "1px", background: "rgba(139,58,26,0.35)", margin: "0 auto" }} />
      </div>

      {/* ── Desktop grid ───────────────────────────────────────── */}
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(4, ${ROW_H}px);
          grid-template-areas:
            "a a b c"
            "a a d d"
            "e f f f"
            "g f f f";
          gap: 3px;
        }
        @media (max-width: 767px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(5, 200px);
            grid-template-areas:
              "a a"
              "b c"
              "d d"
              "e g"
              "f f";
          }
        }
        .gallery-cell img {
          transition: transform 0.75s cubic-bezier(0.32, 0.72, 0, 1);
        }
        .gallery-cell:hover img {
          transform: scale(1.06);
        }
      `}</style>

      <div className="gallery-grid">
        {photos.map(({ src, alt, area }) => (
          <div
            key={area}
            className="gallery-cell"
            style={{ gridArea: area, overflow: "hidden", position: "relative" }}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </div>

      {/* Instagram CTA */}
      <div style={{ textAlign: "center", padding: "48px 24px 72px" }}>
        <a
          href="https://www.instagram.com/lalimentari.vilnius/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.25em",
            color: "rgba(245,237,224,0.45)",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.3s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#F5EDE0"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(245,237,224,0.45)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
          {igLabel[lang as Lang]} · @lalimentari.vilnius
        </a>
      </div>
    </section>
  );
}
