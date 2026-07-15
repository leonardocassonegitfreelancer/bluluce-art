import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import { productsSlug } from "@/i18n/slugs";
import mareSpiaggiaImg from "@/assets/pittura_mare_donna_spiaggia_dune.webp";
import flamencarImg from "@/assets/pittura_ritratto_flamenca_rosa_scura.webp";
import ulivoAlberoImg from "@/assets/pittura_ulivo_donna_sotto_albero.webp";

const copy: Record<Lang, {
  label: string;
  heading: string;
  cta: string;
  works: { name: string; collection: string; info: string }[];
}> = {
  it: {
    label: "OPERE SELEZIONATE",
    heading: "Ogni dipinto è unico",
    cta: "Esplora la collezione →",
    works: [
      { name: "Sussurro dell'Onda I", collection: "Mare",  info: "120 × 100 cm · Tecnica mista su lino · 2026" },
      { name: "Fuoco del Sud",        collection: "Fuoco", info: "140 × 110 cm · Olio e pigmenti su lino · 2026" },
      { name: "Sotto l'Ulivo",        collection: "Terra", info: "130 × 100 cm · Olio su tela · 2026" },
    ],
  },
  es: {
    label: "OBRAS SELECCIONADAS",
    heading: "Cada pintura es única",
    cta: "Explorar la colección →",
    works: [
      { name: "Susurro de la Ola I", collection: "Mar",   info: "120 × 100 cm · Mixta sobre lino · 2026" },
      { name: "Fuego del Sur",       collection: "Fuego", info: "140 × 110 cm · Óleo y pigmentos sobre lino · 2026" },
      { name: "Bajo el Olivo",       collection: "Tierra",info: "130 × 100 cm · Óleo sobre lienzo · 2026" },
    ],
  },
  en: {
    label: "SELECTED WORKS",
    heading: "Every painting is unique",
    cta: "Explore the collection →",
    works: [
      { name: "Whisper of the Wave I", collection: "Sea",   info: "120 × 100 cm · Mixed media on linen · 2026" },
      { name: "Fire of the South",     collection: "Fire",  info: "140 × 110 cm · Oil and pigments on linen · 2026" },
      { name: "Under the Olive Tree",  collection: "Earth", info: "130 × 100 cm · Oil on canvas · 2026" },
    ],
  },
};

const images = [mareSpiaggiaImg, flamencarImg, ulivoAlberoImg];

export default function FeaturedWorks() {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.it;
  const collectionUrl = `/${lang}/${productsSlug[lang as Lang] || productsSlug.it}`;

  return (
    <section className="pt-14 pb-20 md:py-32 px-6 md:px-10" style={{ background: "#FAFAF8" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-14 gap-4 flex-wrap">
          <div>
            <p className="font-bebas text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "#8a6a2e" }}>
              {t.label}
            </p>
            <h2
              className="font-bebas font-light uppercase leading-[0.95]"
              style={{ fontSize: "clamp(2.6rem, 7vw, 6.5rem)", color: "#1c1917", letterSpacing: "0.02em", textWrap: "balance" } as any}
            >
              {t.heading}
            </h2>
          </div>
          <a
            href={collectionUrl}
            className="font-bebas text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:tracking-[0.4em] flex-shrink-0 self-end"
            style={{ color: "#8a6a2e", borderBottom: "1px solid rgba(176,141,78,0.3)", paddingBottom: "3px" }}
          >
            {t.cta}
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {t.works.map((work, i) => (
            <a
              key={i}
              href={collectionUrl}
              className="group block"
              style={{ textDecoration: "none" }}
            >
              {/* Image with mat */}
              <div
                className="overflow-hidden mb-4"
                style={{ background: "#f0ece5", padding: "12px 12px 20px", aspectRatio: "4/5" }}
              >
                <img
                  src={images[i].src}
                  alt={work.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <p className="font-bebas text-[9px] tracking-[0.28em] uppercase mb-1.5" style={{ color: "#8a6a2e" }}>
                {work.collection}
              </p>
              <h3
                className="font-display font-normal italic text-2xl leading-snug mb-1 transition-colors duration-300 group-hover:text-[#8a6a2e]"
                style={{ color: "#1c1917" }}
              >
                {work.name}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#a8a29e" }}>
                {work.info}
              </p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
