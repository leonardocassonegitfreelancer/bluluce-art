import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import { productsPath, categoryPath, type CategorySlug } from "@/i18n/slugs";
import mediterraneanSeaImg from "@/assets/mediterranean_sea.png";
import terracottaClayImg from "@/assets/terracotta_clay.png";
import oliveSunImg from "@/assets/olive_sun.png";

interface Artwork {
  name: Record<string, string>;
  info: Record<string, string>;
  status: Record<string, string>;
}

interface CategoryData {
  heroImg: string;
  labelKey: string;
  nameKey: string;
  descKey: string;
  artworks: Artwork[];
}

const categoryData: Record<CategorySlug, CategoryData> = {
  mare: {
    heroImg: mediterraneanSeaImg.src,
    labelKey: "collectionMareTitle",
    nameKey: "collectionMareTitle",
    descKey: "collectionMareDesc",
    artworks: [
      {
        name: { es: "Susurro de la Ola I", en: "Whisper of the Wave I", it: "Sussurro dell'Onda I" },
        info: { es: "120 x 100 cm | Mixta sobre lino con pan de oro (24k) | 2026", en: "120 x 100 cm | Mixed media on linen with gold leaf (24k) | 2026", it: "120 x 100 cm | Tecnica mista su lino con foglia d'oro (24k) | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        name: { es: "Reflejos Meridionales", en: "Southern Reflections", it: "Riflessi Meridionali" },
        info: { es: "100 x 80 cm | Óleo y pigmentos sobre lienzo | 2025", en: "100 x 80 cm | Oil and pigments on canvas | 2025", it: "100 x 80 cm | Olio e pigmenti su tela | 2025" },
        status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" }
      },
      {
        name: { es: "Abismo Dorado", en: "Golden Abyss", it: "Abisco Dorato" },
        info: { es: "150 x 120 cm | Mixta sobre lino crudo | 2026", en: "150 x 120 cm | Mixed media on raw linen | 2026", it: "150 x 120 cm | Tecnica mista su lino grezzo | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      }
    ]
  },
  terra: {
    heroImg: terracottaClayImg.src,
    labelKey: "collectionTerraTitle",
    nameKey: "collectionTerraTitle",
    descKey: "collectionTerraDesc",
    artworks: [
      {
        name: { es: "Materia Cálida", en: "Warm Matter", it: "Materia Calda" },
        info: { es: "140 x 110 cm | Tierras naturales y aglutinantes orgánicos sobre lino | 2026", en: "140 x 110 cm | Natural earths and organic binders on linen | 2026", it: "140 x 110 cm | Terre naturali e leganti organici su lino | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        name: { es: "Falesia Blanca", en: "White Cliff", it: "Falesia Bianca" },
        info: { es: "90 x 90 cm | Cemento acrílico y arena sobre lienzo | 2025", en: "90 x 90 cm | Acrylic cement and sand on canvas | 2025", it: "90 x 90 cm | Cemento acrilico e sabbia su tela | 2025" },
        status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" }
      },
      {
        name: { es: "Sendero de Arcilla", en: "Clay Path", it: "Sentiero di Argilla" },
        info: { es: "120 x 100 cm | Pigmentos naturales del Mediterráneo | 2026", en: "120 x 100 cm | Natural Mediterranean pigments on canvas | 2026", it: "120 x 100 cm | Pigmenti naturali del Mediterraneo | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      }
    ]
  },
  ulivo: {
    heroImg: oliveSunImg.src,
    labelKey: "collectionUlivoTitle",
    nameKey: "collectionUlivoTitle",
    descKey: "collectionUlivoDesc",
    artworks: [
      {
        name: { es: "Luz Cenital", en: "Zenith Light", it: "Luce Zenitale" },
        info: { es: "130 x 100 cm | Óleo y pan de oro sobre lino virgen | 2026", en: "130 x 100 cm | Oil and gold leaf on virgin linen | 2026", it: "130 x 100 cm | Olio e foglia d'oro su lino vergine | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        name: { es: "Hojas de Plata", en: "Silvery Leaves", it: "Foglie d'Argento" },
        info: { es: "80 x 60 cm | Acrílico con textura sobre lienzo | 2025", en: "80 x 60 cm | Textured acrylic on canvas | 2025", it: "80 x 60 cm | Acrilico materico su tela | 2025" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        name: { es: "Mediodía Mediterráneo", en: "Mediterranean Noon", it: "Meriggio Mediterraneo" },
        info: { es: "160 x 120 cm | Pigmentos minerales y óleo sobre lino crudo | 2026", en: "160 x 120 cm | Mineral pigments and oil on raw linen | 2026", it: "160 x 120 cm | Pigmenti minerali e olio su lino grezzo | 2026" },
        status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" }
      }
    ]
  }
};

const allSlugs: { slug: CategorySlug; labelKey: string }[] = [
  { slug: "mare", labelKey: "collectionMareTitle" },
  { slug: "terra", labelKey: "collectionTerraTitle" },
  { slug: "ulivo", labelKey: "collectionUlivoTitle" }
];

interface CategoryPageProps {
  category: CategorySlug;
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  const { lang } = useLanguage();

  if (!(category in categoryData)) return null;

  const slug = category;
  const data = categoryData[slug];

  return (
    <div className="min-h-screen" style={{ background: "#0E0804" }}>
      <SEO
        title={`${th(data.nameKey as any, lang)} | BLULUCE ART`}
        description={th(data.descKey as any, lang)}
        path={categoryPath(lang, slug)}
      />
      <Navbar />

      {/* Hero image */}
      <div className="relative pt-16">
        <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden relative">
          <img
            src={data.heroImg}
            alt={th(data.nameKey as any, lang)}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.55) contrast(1.05)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, #0E0804 0%, rgba(14,8,4,0.6) 50%, transparent 100%)",
            }}
          />
        </div>
        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:pb-14">
          <div className="max-w-5xl mx-auto text-center md:text-left">
            <span
              className="font-bebas text-xs tracking-[0.35em] uppercase mb-3 block"
              style={{ color: "#C9A96E" }}
            >
              {lang === "es" ? "COLECCIÓN DE ARTE" : lang === "it" ? "COLLEZIONE D'ARTE" : "FINE ART COLLECTION"}
            </span>
            <h1
              className="font-display text-3xl md:text-5xl lg:text-6xl font-normal italic tracking-wide text-white"
            >
              {th(data.nameKey as any, lang)}
            </h1>
          </div>
        </div>
      </div>

      {/* Category navigation chips */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-6 py-10 md:py-14">
        <a
          href={productsPath(lang)}
          className="font-bebas text-[11px] md:text-xs tracking-[0.2em] uppercase px-5 md:px-7 py-2.5 md:py-3 transition-all duration-300"
          style={{
            border: "1px solid rgba(201,169,110,0.35)",
            color: "rgba(245,240,232,0.6)",
          }}
        >
          {th("collectionBackToAll", lang)}
        </a>
        {allSlugs.map((s) => (
          <a
            key={s.slug}
            href={categoryPath(lang, s.slug)}
            className="font-bebas text-[11px] md:text-xs tracking-[0.2em] uppercase px-5 md:px-7 py-2.5 md:py-3 transition-all duration-300"
            style={{
              border: `1px solid ${s.slug === slug ? "#C9A96E" : "rgba(201,169,110,0.35)"}`,
              background: s.slug === slug ? "rgba(201,169,110,0.12)" : "transparent",
              color: s.slug === slug ? "#C9A96E" : "rgba(245,240,232,0.6)",
            }}
          >
            {th(s.labelKey as any, lang)}
          </a>
        ))}
      </div>

      {/* Description */}
      <div className="max-w-3xl mx-auto px-6 pb-16 md:pb-20 text-center">
        <p
          className="font-body text-base md:text-lg leading-relaxed text-white/70"
        >
          {th(data.descKey as any, lang)}
        </p>
        <div className="w-16 h-px mt-10 mx-auto" style={{ background: "rgba(201,169,110,0.25)" }} />
      </div>

      {/* Product cards / Paintings list */}
      {data.artworks.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <p
            className="font-bebas text-xs tracking-[0.3em] uppercase mb-10 text-center text-[#C9A96E]/55"
          >
            {lang === "es" ? "OBRAS EN LA COLECCIÓN" : lang === "it" ? "OPERE NELLA COLLEZIONE" : "WORKS IN THIS COLLECTION"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.artworks.map((prod, i) => (
              <div
                key={i}
                className="group flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-[#C9A96E]/40"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(201,169,110,0.15)",
                }}
              >
                <div className="overflow-hidden aspect-[4/5] relative">
                  <img
                    src={data.heroImg}
                    alt={prod.name[lang] || prod.name.en}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    style={{ filter: "brightness(0.85) contrast(1.05) saturate(0.95)" }}
                  />
                  {/* Subtle glass effect frame overlay */}
                  <div className="absolute inset-4 border border-white/5 pointer-events-none transition-all duration-500 group-hover:inset-3 group-hover:border-white/10" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-bebas text-[10px] tracking-[0.2em] text-[#C9A96E]/60 mb-2 block">
                      {prod.status[lang] || prod.status.en}
                    </span>
                    <h3
                      className="font-display text-xl font-normal italic tracking-wide mb-3 text-white group-hover:text-[#C9A96E] transition-colors duration-300"
                    >
                      {prod.name[lang] || prod.name.en}
                    </h3>
                    <p
                      className="font-body text-xs leading-relaxed text-white/40"
                    >
                      {prod.info[lang] || prod.info.en}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6" style={{ borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-display text-3xl md:text-4xl font-normal italic mb-4 text-white"
          >
            {lang === "es" 
              ? "¿Interesado en una obra en particular?" 
              : lang === "it" 
                ? "Interessato a un'opera in particolare?" 
                : "Interested in a specific artwork?"}
          </h2>
          <p className="font-body text-sm text-white/50 mb-8 max-w-lg mx-auto leading-relaxed">
            {lang === "es"
              ? "Para conocer la disponibilidad, solicitar un catálogo de precios detallado o programar una visita privada al estudio, contáctenos."
              : lang === "it"
                ? "Per conoscere la disponibilità, richiedere un listino prezzi dettagliato o prenotare una visita privata allo studio, non esitare a contattarci."
                : "To check availability, request a detailed price list, or schedule a private studio visit, please get in touch with us."}
          </p>
          <div className="w-16 h-px mx-auto mb-8" style={{ background: "rgba(201,169,110,0.3)" }} />
          <a
            href={`/${lang}`}
            className="inline-block px-8 py-3 font-body text-xs tracking-widest uppercase transition-all duration-500"
            style={{ border: "1px solid #C9A96E", color: "#C9A96E" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C9A96E";
              e.currentTarget.style.color = "#0E0804";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#C9A96E";
            }}
          >
            {lang === "es" ? "CONTACTAR EL ESTUDIO" : lang === "it" ? "CONTATTA LO STUDIO" : "CONTACT THE STUDIO"}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
