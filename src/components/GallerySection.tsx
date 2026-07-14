import { useState, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import mareSpiaggiaImg from "@/assets/pittura_mare_donna_spiaggia_dune.webp";
import mareOndeImg from "@/assets/pittura_mare_donna_onde_spiaggia.webp";
import mareSchienaImg from "@/assets/pittura_mare_donna_schiena_acqua.webp";
import flamencarImg from "@/assets/pittura_ritratto_flamenca_rosa_scura.webp";
import ritrattoOroImg from "@/assets/pittura_ritratto_donna_fiore_oro.webp";
import giardinoImg from "@/assets/pittura_giardino_donna_terrazza_fiori.webp";
import ulivoAlberoImg from "@/assets/pittura_ulivo_donna_sotto_albero.webp";
import marreTerazzaImg from "@/assets/pittura_mare_donna_terrazza_barca.webp";
import mareMadreFigliaImg from "@/assets/pittura_mare_madre_figlia_acqua.webp";
import ulivoBoscoImg from "@/assets/pittura_ulivo_donna_bosco_laghetto.webp";

interface Artwork {
  category: "mare" | "terra" | "ulivo";
  img: any;
  name: Record<string, string>;
  info: Record<string, string>;
  status: Record<string, string>;
}

const artworks: Artwork[] = [
  {
    category: "mare",
    img: mareSpiaggiaImg,
    name: { es: "Susurro de la Ola I", en: "Whisper of the Wave I", it: "Sussurro dell'Onda I" },
    info: { es: "120 × 100 cm · Mixta sobre lino con pan de oro (24k) · 2026", en: "120 × 100 cm · Mixed media on linen with gold leaf (24k) · 2026", it: "120 × 100 cm · Tecnica mista su lino con foglia d'oro (24k) · 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" },
  },
  {
    category: "mare",
    img: mareOndeImg,
    name: { es: "Reflejos Meridionales", en: "Southern Reflections", it: "Riflessi Meridionali" },
    info: { es: "100 × 80 cm · Óleo y pigmentos sobre lienzo · 2025", en: "100 × 80 cm · Oil and pigments on canvas · 2025", it: "100 × 80 cm · Olio e pigmenti su tela · 2025" },
    status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" },
  },
  {
    category: "mare",
    img: mareSchienaImg,
    name: { es: "Verso il Largo", en: "Out to Sea", it: "Verso il Largo" },
    info: { es: "150 × 120 cm · Óleo sobre lienzo · 2026", en: "150 × 120 cm · Oil on canvas · 2026", it: "150 × 120 cm · Olio su tela · 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" },
  },
  {
    category: "fuoco",
    img: flamencarImg,
    name: { es: "Fuego del Sur", en: "Fire of the South", it: "Fuoco del Sud" },
    info: { es: "140 × 110 cm · Óleo y pigmentos naturales sobre lino · 2026", en: "140 × 110 cm · Oil and natural pigments on linen · 2026", it: "140 × 110 cm · Olio e pigmenti naturali su lino · 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" },
  },
  {
    category: "fuoco",
    img: ritrattoOroImg,
    name: { es: "La Dorada", en: "The Golden One", it: "La Dorata" },
    info: { es: "90 × 90 cm · Óleo con pan de oro (24k) sobre lienzo · 2025", en: "90 × 90 cm · Oil with 24k gold leaf on canvas · 2025", it: "90 × 90 cm · Olio con foglia d'oro (24k) su tela · 2025" },
    status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" },
  },
  {
    category: "fuoco",
    img: giardinoImg,
    name: { es: "La Terraza", en: "The Terrace", it: "La Terrazza" },
    info: { es: "120 × 100 cm · Óleo y pigmentos del Mediterráneo sobre lino crudo · 2026", en: "120 × 100 cm · Oil and Mediterranean pigments on raw linen · 2026", it: "120 × 100 cm · Olio e pigmenti del Mediterraneo su lino grezzo · 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" },
  },
  {
    category: "terra",
    img: ulivoAlberoImg,
    name: { es: "Bajo el Olivo", en: "Under the Olive Tree", it: "Sotto l'Ulivo" },
    info: { es: "130 × 100 cm · Óleo sobre lienzo · 2026", en: "130 × 100 cm · Oil on canvas · 2026", it: "130 × 100 cm · Olio su tela · 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" },
  },
  {
    category: "terra",
    img: ulivoBoscoImg,
    name: { es: "El Bosque y el Lago", en: "Forest and Lake", it: "Il Bosco e il Lago" },
    info: { es: "80 × 110 cm · Óleo sobre lienzo · 2026", en: "80 × 110 cm · Oil on canvas · 2026", it: "80 × 110 cm · Olio su tela · 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" },
  },
  {
    category: "mare",
    img: marreTerazzaImg,
    name: { es: "La Terraza del Mar", en: "Terrace by the Sea", it: "La Terrazza sul Mare" },
    info: { es: "100 × 70 cm · Óleo sobre lienzo · 2026", en: "100 × 70 cm · Oil on canvas · 2026", it: "100 × 70 cm · Olio su tela · 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" },
  },
  {
    category: "mare",
    img: mareMadreFigliaImg,
    name: { es: "Madre e Hija", en: "Mother and Daughter", it: "Madre e Figlia" },
    info: { es: "90 × 120 cm · Óleo y pigmentos sobre lienzo · 2025", en: "90 × 120 cm · Oil and pigments on canvas · 2025", it: "90 × 120 cm · Olio e pigmenti su tela · 2025" },
    status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" },
  },
];

const copy = {
  title:  { es: "Galería Digital", en: "Digital Gallery", it: "Galleria Digitale" },
  desc: {
    es: "Pinturas originales de nuestras colecciones, capturando la luz y la naturaleza del Mediterráneo.",
    en: "Original fine art paintings from our signature collections, capturing Mediterranean light and texture.",
    it: "Opere originali dalle nostre collezioni, che catturano la luce e la materia del Mediterraneo.",
  },
  filters: {
    all:   { es: "Todos", en: "All",   it: "Tutti" },
    mare:  { es: "Mar",   en: "Sea",   it: "Mare" },
    fuoco: { es: "Fuego", en: "Fire",  it: "Fuoco" },
    terra: { es: "Tierra",en: "Earth", it: "Terra" },
  },
  inquire: {
    es: "Solicitar información →",
    en: "Inquire about this work →",
    it: "Richiedi informazioni →",
  },
};

export default function GallerySection() {
  const { lang } = useLanguage();
  const l = (lang as Lang) ?? "es";
  const [activeFilter, setActiveFilter] = useState<"all" | "mare" | "fuoco" | "terra">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const changeFilter = (f: "all" | "mare" | "terra" | "ulivo") => {
    setActiveFilter(f);
    setLightboxIndex(null);
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const filtered = artworks.filter(
    (a) => activeFilter === "all" || a.category === activeFilter
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filtered.length - 1 : lightboxIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filtered.length - 1 ? 0 : lightboxIndex + 1);
  };

  return (
    <section className="py-24 px-6 md:px-10 min-h-screen" style={{ background: "#FAFAF8" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="font-body uppercase tracking-[0.28em] text-[#8a6a2e] text-[0.6rem] mb-4">
            BLULUCE ART
          </p>
          <h1
            className="font-display font-normal italic leading-none mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#1c1917" }}
          >
            {copy.title[l]}
          </h1>
          <p className="font-body text-sm leading-relaxed max-w-lg" style={{ color: "#78716c" }}>
            {copy.desc[l]}
          </p>
          <div className="mt-6 h-px w-10" style={{ background: "#8a6a2e" }} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-14">
          {(["all", "mare", "fuoco", "terra"] as const).map((f) => (
            <button
              key={f}
              onClick={() => changeFilter(f)}
              className="font-body text-[0.6rem] tracking-[0.22em] uppercase px-5 py-2.5 transition-all duration-300"
              style={{
                border: `1px solid ${activeFilter === f ? "#8a6a2e" : "rgba(176,141,78,0.3)"}`,
                background: activeFilter === f ? "rgba(176,141,78,0.08)" : "transparent",
                color: activeFilter === f ? "#8a6a2e" : "#78716c",
              }}
            >
              {copy.filters[f][l]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filtered.map((art, idx) => (
            <div
              key={art.name.en}
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="overflow-hidden aspect-[4/5] mb-4" style={{ background: "#f0ece5" }}>
                <img
                  src={art.img.src}
                  alt={art.name[l]}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div>
                <p className="font-body text-[0.58rem] uppercase tracking-[0.2em] mb-1.5" style={{ color: "#8a6a2e" }}>
                  {art.category}
                </p>
                <h3
                  className="font-display font-normal italic text-lg leading-snug mb-1.5 transition-colors duration-300 group-hover:text-[#8a6a2e]"
                  style={{ color: "#1c1917" }}
                >
                  {art.name[l]}
                </h3>
                <p className="font-body text-[0.72rem] leading-relaxed" style={{ color: "#a8a29e" }}>
                  {art.info[l]}
                </p>
                <p className="font-body text-[0.6rem] uppercase tracking-[0.15em] mt-2" style={{ color: art.status[l] === "Available" || art.status[l] === "Disponible" || art.status[l] === "Disponibile" ? "#8a6a2e" : "#a8a29e" }}>
                  {art.status[l]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(0,0,0,0.88)" }}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 transition-opacity hover:opacity-70"
            style={{ color: "#FAFAF8" }}
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 p-3 rounded-full transition-all duration-300"
            style={{ background: "rgba(250,248,245,0.08)", color: "#FAFAF8" }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 p-3 rounded-full transition-all duration-300"
            style={{ background: "rgba(250,248,245,0.08)", color: "#FAFAF8" }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full flex flex-col md:flex-row gap-8 md:gap-14 items-center"
          >
            <div className="w-full md:w-1/2 max-h-[60vh] overflow-hidden">
              <img
                src={filtered[lightboxIndex].img.src}
                alt={filtered[lightboxIndex].name[l]}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-full md:w-1/2 text-left">
              <p className="font-body text-[0.58rem] uppercase tracking-[0.25em] mb-3" style={{ color: "#8a6a2e" }}>
                {filtered[lightboxIndex].category}
              </p>
              <h2
                className="font-display font-normal italic leading-tight mb-4"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#FAFAF8" }}
              >
                {filtered[lightboxIndex].name[l]}
              </h2>
              <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "rgba(250,248,245,0.55)" }}>
                {filtered[lightboxIndex].info[l]}
              </p>

              <div className="flex items-center gap-2.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#8a6a2e" }} />
                <span className="font-body text-[0.6rem] uppercase tracking-[0.18em]" style={{ color: "#8a6a2e" }}>
                  {filtered[lightboxIndex].status[l]}
                </span>
              </div>

              <div className="h-px mb-8" style={{ background: "rgba(250,248,245,0.1)" }} />

              <a
                href={`https://wa.me/34600000000?text=${encodeURIComponent(`Ciao, sono interessato all'opera "${filtered[lightboxIndex].name.en}"`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[0.6rem] tracking-[0.22em] uppercase transition-all duration-300 hover:opacity-70"
                style={{ color: "#8a6a2e", borderBottom: "1px solid rgba(176,141,78,0.35)", paddingBottom: "3px" }}
              >
                {copy.inquire[l]}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
