import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import mediterraneanSeaImg from "@/assets/mediterranean_sea.png";
import terracottaClayImg from "@/assets/terracotta_clay.png";
import oliveSunImg from "@/assets/olive_sun.png";

interface Artwork {
  category: "mare" | "terra" | "ulivo";
  img: any;
  name: Record<string, string>;
  info: Record<string, string>;
  status: Record<string, string>;
}

const artworks: Artwork[] = [
  // Mare
  {
    category: "mare",
    img: mediterraneanSeaImg,
    name: { es: "Susurro de la Ola I", en: "Whisper of the Wave I", it: "Sussurro dell'Onda I" },
    info: { es: "120 x 100 cm | Mixta sobre lino con pan de oro (24k) | 2026", en: "120 x 100 cm | Mixed media on linen with gold leaf (24k) | 2026", it: "120 x 100 cm | Tecnica mista su lino con foglia d'oro (24k) | 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" }
  },
  {
    category: "mare",
    img: mediterraneanSeaImg,
    name: { es: "Reflejos Meridionales", en: "Southern Reflections", it: "Riflessi Meridionali" },
    info: { es: "100 x 80 cm | Óleo y pigmentos sobre lienzo | 2025", en: "100 x 80 cm | Oil and pigments on canvas | 2025", it: "100 x 80 cm | Olio e pigmenti su tela | 2025" },
    status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" }
  },
  {
    category: "mare",
    img: mediterraneanSeaImg,
    name: { es: "Abismo Dorado", en: "Golden Abyss", it: "Abisco Dorato" },
    info: { es: "150 x 120 cm | Mixta sobre lino crudo | 2026", en: "150 x 120 cm | Mixed media on raw linen | 2026", it: "150 x 120 cm | Tecnica mista su lino grezzo | 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" }
  },
  // Terra
  {
    category: "terra",
    img: terracottaClayImg,
    name: { es: "Materia Cálida", en: "Warm Matter", it: "Materia Calda" },
    info: { es: "140 x 110 cm | Tierras naturales y aglutinantes orgánicos sobre lino | 2026", en: "140 x 110 cm | Natural earths and organic binders on linen | 2026", it: "140 x 110 cm | Terre naturali e leganti organici su lino | 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" }
  },
  {
    category: "terra",
    img: terracottaClayImg,
    name: { es: "Falesia Blanca", en: "White Cliff", it: "Falesia Bianca" },
    info: { es: "90 x 90 cm | Cemento acrílico y arena sobre lienzo | 2025", en: "90 x 90 cm | Acrylic cement and sand on canvas | 2025", it: "90 x 90 cm | Cemento acrilico e sabbia su tela | 2025" },
    status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" }
  },
  {
    category: "terra",
    img: terracottaClayImg,
    name: { es: "Sendero de Arcilla", en: "Clay Path", it: "Sentiero di Argilla" },
    info: { es: "120 x 100 cm | Pigmentos naturales del Mediterráneo | 2026", en: "120 x 100 cm | Natural Mediterranean pigments on canvas | 2026", it: "120 x 100 cm | Pigmenti naturali del Mediterraneo | 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" }
  },
  // Ulivo
  {
    category: "ulivo",
    img: oliveSunImg,
    name: { es: "Luz Cenital", en: "Zenith Light", it: "Luce Zenitale" },
    info: { es: "130 x 100 cm | Óleo y pan de oro sobre lino virgen | 2026", en: "130 x 100 cm | Oil and gold leaf on virgin linen | 2026", it: "130 x 100 cm | Olio e foglia d'oro su lino vergine | 2026" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" }
  },
  {
    category: "ulivo",
    img: oliveSunImg,
    name: { es: "Hojas de Plata", en: "Silvery Leaves", it: "Foglie d'Argento" },
    info: { es: "80 x 60 cm | Acrílico con textura sobre lienzo | 2025", en: "80 x 60 cm | Textured acrylic on canvas | 2025", it: "80 x 60 cm | Acrilico materico su tela | 2025" },
    status: { es: "Disponible", en: "Available", it: "Disponibile" }
  },
  {
    category: "ulivo",
    img: oliveSunImg,
    name: { es: "Mediodía Mediterráneo", en: "Mediterranean Noon", it: "Meriggio Mediterraneo" },
    info: { es: "160 x 120 cm | Pigmentos minerales y óleo sobre lino crudo | 2026", en: "160 x 120 cm | Mineral pigments and oil on raw linen | 2026", it: "160 x 120 cm | Pigmenti minerali e olio su lino grezzo | 2026" },
    status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" }
  }
];

const copy = {
  label: { es: "BLULUCE ART", en: "BLULUCE ART", it: "BLULUCE ART" },
  title: { es: "Galería Digital", en: "Digital Gallery", it: "Galleria Digitale" },
  desc: {
    es: "Descubra las pinturas originales de nuestras colecciones, capturando la luz y la naturaleza del Mediterráneo.",
    en: "Discover original fine art paintings from our signature collections, capturing Mediterranean light and textures.",
    it: "Scopri le opere d'arte originali delle nostre collezioni, catturando la luce e la materia del Mediterraneo."
  },
  filters: {
    all: { es: "Todos", en: "All", it: "Tutti" },
    mare: { es: "Colección Mar", en: "Mare Collection", it: "Collezione Mare" },
    terra: { es: "Colección Tierra", en: "Terra Collection", it: "Collezione Terra" },
    ulivo: { es: "Colección Olivo", en: "Ulivo Collection", it: "Collezione Ulivo" }
  },
  lightboxContact: {
    es: "Solicitar información sobre esta obra →",
    en: "Inquire about this artwork →",
    it: "Richiedi informazioni su quest'opera →"
  }
};

export default function GallerySection() {
  const { lang } = useLanguage();
  const l = (lang as Lang) ?? "es";
  const [activeFilter, setActiveFilter] = useState<"all" | "mare" | "terra" | "ulivo">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredArtworks = artworks.filter(
    (art) => activeFilter === "all" || art.category === activeFilter
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIdx = lightboxIndex === 0 ? filteredArtworks.length - 1 : lightboxIndex - 1;
    setLightboxIndex(nextIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIdx = lightboxIndex === filteredArtworks.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(nextIdx);
  };

  return (
    <section className="py-24 px-6 md:px-8 min-h-screen text-[#FAFAF8]" style={{ background: "#0E0804" }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-bebas text-[#C9A96E] tracking-[0.24em] block mb-4 text-xs">
            {copy.label[l]}
          </span>
          <h1 className="font-display font-normal italic text-[#FAFAF8] leading-none mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            {copy.title[l]}
          </h1>
          <p className="font-body text-white/60 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            {copy.desc[l]}
          </p>
          <div className="w-12 h-[2px] bg-[#C9A96E] mx-auto mt-6" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          {(["all", "mare", "terra", "ulivo"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="font-bebas text-[11px] md:text-xs tracking-[0.2em] uppercase px-5 md:px-7 py-2.5 md:py-3 transition-all duration-300"
              style={{
                border: `1px solid ${activeFilter === filter ? "#C9A96E" : "rgba(201,169,110,0.3)"}`,
                background: activeFilter === filter ? "rgba(201,169,110,0.12)" : "transparent",
                color: activeFilter === filter ? "#C9A96E" : "rgba(245,240,232,0.6)",
              }}
            >
              {copy.filters[filter][l]}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArtworks.map((art, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="group flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 border border-white/5 hover:border-[#C9A96E]/30"
              style={{ background: "rgba(255,255,255,0.01)" }}
            >
              <div className="overflow-hidden aspect-[4/5] relative">
                <img
                  src={art.img.src}
                  alt={art.name[l] || art.name.en}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  style={{ filter: "brightness(0.9) contrast(1.05) saturate(0.95)" }}
                />
                <div className="absolute inset-4 border border-white/5 pointer-events-none transition-all duration-500 group-hover:inset-3 group-hover:border-white/10" />
                
                {/* Visual spec badge inside grid */}
                <div className="absolute top-4 left-4 bg-[#0E0804]/80 backdrop-blur-sm px-3 py-1 text-[9px] font-bebas tracking-[0.15em] text-[#C9A96E]">
                  {art.status[l] || art.status.en}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-bebas text-[10px] tracking-[0.2em] text-[#C9A96E]/60 mb-2 block">
                    {art.category.toUpperCase()} COLLECTION
                  </span>
                  <h3 className="font-display text-xl font-normal italic tracking-wide mb-3 text-white group-hover:text-[#C9A96E] transition-colors duration-300">
                    {art.name[l] || art.name.en}
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-white/40">
                    {art.info[l] || art.info.en}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-opacity duration-300"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 backdrop-blur-sm p-3 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 backdrop-blur-sm p-3 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <div className="w-full md:w-1/2 max-h-[65vh] overflow-hidden" style={{ border: "1px solid rgba(201,169,110,0.15)" }}>
              <img
                src={filteredArtworks[lightboxIndex].img.src}
                alt={filteredArtworks[lightboxIndex].name[l]}
                className="w-full h-full object-contain"
                style={{ filter: "brightness(0.95)" }}
              />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-start text-left">
              <span className="font-bebas text-xs tracking-[0.2em] text-[#C9A96E] mb-2">
                {filteredArtworks[lightboxIndex].category.toUpperCase()} COLLECTION
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-normal italic text-white mb-4">
                {filteredArtworks[lightboxIndex].name[l]}
              </h2>
              <p className="font-body text-sm text-white/70 mb-6 leading-relaxed">
                {filteredArtworks[lightboxIndex].info[l]}
              </p>
              
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                <span className="font-bebas text-[11px] tracking-[0.15em] text-[#C9A96E]/80">
                  {filteredArtworks[lightboxIndex].status[l]}
                </span>
              </div>

              <div className="w-full h-px bg-white/10 mb-8" />
              
              <a
                href={`mailto:studio@bluluceart.com?subject=Inquiry: ${filteredArtworks[lightboxIndex].name.en}`}
                className="font-bebas text-[11px] tracking-[0.25em] text-[#C9A96E] border-b border-[#C9A96E]/30 pb-1 transition-all duration-300 hover:border-[#C9A96E] hover:text-white"
              >
                {copy.lightboxContact[l]}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
