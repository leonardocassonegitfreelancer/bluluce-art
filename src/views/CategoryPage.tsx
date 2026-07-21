import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import { productsPath, categoryPath, type CategorySlug } from "@/i18n/slugs";
import mareSpiaggiaImg from "@/assets/pittura_mare_donna_spiaggia_dune.webp";
import mareOndeImg from "@/assets/pittura_mare_donna_onde_spiaggia.webp";
import mareSchienaImg from "@/assets/pittura_mare_donna_schiena_acqua.webp";
import flamencarImg from "@/assets/pittura_ritratto_flamenca_rosa_scura.webp";
import ritrattoOroImg from "@/assets/pittura_ritratto_donna_fiore_oro.webp";
import giardinoImg from "@/assets/pittura_giardino_donna_terrazza_fiori.webp";
import ulivoAlberoImg from "@/assets/pittura_ulivo_donna_sotto_albero.webp";
import ulivoBoscoImg from "@/assets/pittura_ulivo_donna_bosco_laghetto.webp";
import marreTerazzaImg from "@/assets/pittura_mare_donna_terrazza_barca.webp";
import mareMadreFigliaImg from "@/assets/pittura_mare_madre_figlia_acqua.webp";
import bambinaSpiaggiaImg from "@/assets/pittura_mare_bambina_spiaggia_cielo.webp";
import bambinaSecchielloOndeImg from "@/assets/pittura_mare_bambina_secchiello_onde.webp";
import bambinaSecchielloRossoImg from "@/assets/pittura_mare_bambina_secchiello_rosso.webp";
import mareRocciSaliceImg from "@/assets/pittura_mare_donna_rocce_salice_acqua.webp";
import dueBimbiRivaImg from "@/assets/pittura_mare_due_bimbi_riva.webp";
import donnaAbitoAcquaImg from "@/assets/pittura_mare_donna_abito_acqua_luce.webp";

interface Artwork {
  img: string;
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
    heroImg: mareSpiaggiaImg.src,
    labelKey: "collectionMareTitle",
    nameKey: "collectionMareTitle",
    descKey: "collectionMareDesc",
    artworks: [
      {
        img: mareSpiaggiaImg.src,
        name: { es: "Susurro de la Ola I", en: "Whisper of the Wave I", it: "Sussurro dell'Onda I" },
        info: { es: "60 x 80 cm | Acrílico sobre lienzo | 2026", en: "60 x 80 cm | Acrylic on canvas | 2026", it: "60 x 80 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        img: mareOndeImg.src,
        name: { es: "A la Orilla", en: "A la Orilla", it: "A la Orilla" },
        info: { es: "38 x 46 cm | Acrílico sobre lienzo | 2026", en: "38 x 46 cm | Acrylic on canvas | 2026", it: "38 x 46 cm | Acrilico su tela | 2026" },
        status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" }
      },
      {
        img: mareSchienaImg.src,
        name: { es: "Verso il Largo", en: "Out to Sea", it: "Verso il Largo" },
        info: { es: "60 x 80 cm | Acrílico sobre lienzo | 2026", en: "60 x 80 cm | Acrylic on canvas | 2026", it: "60 x 80 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        img: marreTerazzaImg.src,
        name: { es: "La Terraza del Mar", en: "Terrace by the Sea", it: "La Terrazza sul Mare" },
        info: { es: "70 x 50 cm | Acrílico sobre lienzo | 2026", en: "70 x 50 cm | Acrylic on canvas | 2026", it: "70 x 50 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        img: mareMadreFigliaImg.src,
        name: { es: "Madre e Hija", en: "Mother and Daughter", it: "Madre e Figlia" },
        info: { es: "50 x 70 cm | Acrílico sobre lienzo | 2026", en: "50 x 70 cm | Acrylic on canvas | 2026", it: "50 x 70 cm | Acrilico su tela | 2026" },
        status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" }
      },
      {
        img: bambinaSpiaggiaImg.src,
        name: { es: "Juegos en la Orilla", en: "Shore Games", it: "Giochi in Riva" },
        info: { es: "18 x 24 cm | Acrílico sobre lienzo | 2026", en: "18 x 24 cm | Acrylic on canvas | 2026", it: "18 x 24 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        img: bambinaSecchielloOndeImg.src,
        name: { es: "La Niña del Cubo Rojo I", en: "Girl with the Red Bucket I", it: "La Bambina col Secchiello Rosso I" },
        info: { es: "18 x 24 cm | Acrílico sobre lienzo | 2026", en: "18 x 24 cm | Acrylic on canvas | 2026", it: "18 x 24 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        img: bambinaSecchielloRossoImg.src,
        name: { es: "La Niña del Cubo Rojo II", en: "Girl with the Red Bucket II", it: "La Bambina col Secchiello Rosso II" },
        info: { es: "18 x 24 cm | Acrílico sobre lienzo | 2026", en: "18 x 24 cm | Acrylic on canvas | 2026", it: "18 x 24 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        img: mareRocciSaliceImg.src,
        name: { es: "Bajo el Sauce", en: "Under the Willow", it: "Sotto il Salice" },
        info: { es: "60 x 80 cm | Acrílico sobre lienzo | 2026", en: "60 x 80 cm | Acrylic on canvas | 2026", it: "60 x 80 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        img: dueBimbiRivaImg.src,
        name: { es: "Dos Niños en la Orilla", en: "Two Children by the Shore", it: "Due Bimbi in Riva" },
        info: { es: "60 x 80 cm | Acrílico sobre lienzo | 2026", en: "60 x 80 cm | Acrylic on canvas | 2026", it: "60 x 80 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        img: donnaAbitoAcquaImg.src,
        name: { es: "Reflejos", en: "Reflections", it: "Riflessi" },
        info: { es: "40 x 50 cm | Acrílico sobre lienzo | 2026", en: "40 x 50 cm | Acrylic on canvas | 2026", it: "40 x 50 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      }
    ]
  },
  fuoco: {
    heroImg: flamencarImg.src,
    labelKey: "collectionFuocoTitle",
    nameKey: "collectionFuocoTitle",
    descKey: "collectionFuocoDesc",
    artworks: [
      {
        img: flamencarImg.src,
        name: { es: "Fuego Callado", en: "Fuego Callado", it: "Fuego Callado" },
        info: { es: "38 x 46 cm | Acrílico sobre lienzo | 2026", en: "38 x 46 cm | Acrylic on canvas | 2026", it: "38 x 46 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        img: ritrattoOroImg.src,
        name: { es: "Rosa de la Tarde", en: "Rosa de la Tarde", it: "Rosa de la Tarde" },
        info: { es: "46 x 38 cm | Acrílico sobre lienzo | 2026", en: "46 x 38 cm | Acrylic on canvas | 2026", it: "46 x 38 cm | Acrilico su tela | 2026" },
        status: { es: "Colección Privada", en: "Private Collection", it: "Collezione Privata" }
      },
      {
        img: giardinoImg.src,
        name: { es: "La Terraza", en: "The Terrace", it: "La Terrazza" },
        info: { es: "60 x 80 cm | Acrílico sobre lienzo | 2026", en: "60 x 80 cm | Acrylic on canvas | 2026", it: "60 x 80 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      }
    ]
  },
  terra: {
    heroImg: ulivoAlberoImg.src,
    labelKey: "collectionTerraTitle",
    nameKey: "collectionTerraTitle",
    descKey: "collectionTerraDesc",
    artworks: [
      {
        img: ulivoAlberoImg.src,
        name: { es: "Bajo el Olivo", en: "Under the Olive Tree", it: "Sotto l'Ulivo" },
        info: { es: "60 x 80 cm | Acrílico sobre lienzo | 2026", en: "60 x 80 cm | Acrylic on canvas | 2026", it: "60 x 80 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      },
      {
        img: ulivoBoscoImg.src,
        name: { es: "El Bosque y el Lago", en: "Forest and Lake", it: "Il Bosco e il Lago" },
        info: { es: "40 x 60 cm | Acrílico sobre lienzo | 2026", en: "40 x 60 cm | Acrylic on canvas | 2026", it: "40 x 60 cm | Acrilico su tela | 2026" },
        status: { es: "Disponible", en: "Available", it: "Disponibile" }
      }
    ]
  }
};

const allSlugs: { slug: CategorySlug; labelKey: string }[] = [
  { slug: "mare",  labelKey: "collectionMareTitle" },
  { slug: "fuoco", labelKey: "collectionFuocoTitle" },
  { slug: "terra", labelKey: "collectionTerraTitle" },
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
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
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
            style={{ filter: "brightness(0.75) contrast(1.05)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, #FAFAF8 0%, rgba(250,248,245,0.45) 35%, transparent 100%)",
            }}
          />
        </div>
        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:pb-14">
          <div className="max-w-5xl mx-auto text-center md:text-left">
            <span
              className="font-bebas text-xs tracking-[0.35em] uppercase mb-3 block"
              style={{ color: "#8a6a2e" }}
            >
              {lang === "es" ? "COLECCIÓN DE ARTE" : lang === "it" ? "COLLEZIONE D'ARTE" : "FINE ART COLLECTION"}
            </span>
            <h1
              className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold uppercase"
              style={{ color: "#1c1917", letterSpacing: "0.08em" }}
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
            border: "1px solid rgba(176,141,78,0.3)",
            color: "#78716c",
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
              border: `1px solid ${s.slug === slug ? "#8a6a2e" : "rgba(176,141,78,0.3)"}`,
              background: s.slug === slug ? "rgba(176,141,78,0.08)" : "transparent",
              color: s.slug === slug ? "#8a6a2e" : "#78716c",
            }}
          >
            {th(s.labelKey as any, lang)}
          </a>
        ))}
      </div>

      {/* Description */}
      <div className="max-w-3xl mx-auto px-6 pb-16 md:pb-20 text-center">
        <p
          className="font-body text-base md:text-lg leading-relaxed"
          style={{ color: "#78716c" }}
        >
          {th(data.descKey as any, lang)}
        </p>
        <div className="w-16 h-px mt-10 mx-auto" style={{ background: "rgba(176,141,78,0.25)" }} />
      </div>

      {/* Artwork editorial list */}
      {data.artworks.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-24">

          {/* Section label with flanking rules */}
          <div className="flex items-center gap-5 mb-16 md:mb-20">
            <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
            <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#8a6a2e" }}>
              {lang === "es" ? "OBRAS EN LA COLECCIÓN" : lang === "it" ? "OPERE NELLA COLLEZIONE" : "WORKS IN THIS COLLECTION"}
            </p>
            <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
          </div>

          {data.artworks.map((prod, i) => {
            const isAvail = ["Disponibile","Disponible","Available"].includes(prod.status[lang] || prod.status.en);
            const romans = ["I","II","III","IV","V"];
            const rev = i % 2 === 1;
            return (
              <div
                key={i}
                className="py-14 md:py-20"
                style={{ borderBottom: i < data.artworks.length - 1 ? "1px solid rgba(28,25,23,0.07)" : "none" }}
              >
                <div className={`grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-center ${rev ? "md:[direction:rtl]" : ""}`}>

                  {/* Image — second on mobile, position handled by desktop grid */}
                  <div className={`order-last md:order-none md:col-span-3 ${rev ? "md:[direction:ltr]" : ""}`}>
                    <div style={{ background: "#f0ece5", padding: "18px 18px 28px" }}>
                      <img
                        src={prod.img}
                        alt={prod.name[lang] || prod.name.en}
                        className="w-full object-cover"
                        style={{ aspectRatio: "4/5" }}
                      />
                    </div>
                  </div>

                  {/* Details — first on mobile */}
                  <div className={`order-first md:order-none md:col-span-2 ${rev ? "md:[direction:ltr]" : ""}`}>
                    <p
                      className="font-display font-normal italic leading-none mb-5 select-none"
                      style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)", color: "rgba(176,141,78,0.13)", lineHeight: 1 }}
                    >
                      {romans[i]}
                    </p>
                    <div className="h-px mb-6" style={{ background: "rgba(176,141,78,0.22)" }} />

                    <div className="flex items-center gap-2 mb-5">
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: isAvail ? "#8a6a2e" : "#a8a29e" }}
                      />
                      <span
                        className="font-bebas text-xs tracking-[0.32em] uppercase"
                        style={{ color: isAvail ? "#8a6a2e" : "#a8a29e" }}
                      >
                        {prod.status[lang] || prod.status.en}
                      </span>
                    </div>

                    <h3
                      className="font-display font-semibold italic mb-5 leading-snug"
                      style={{ fontSize: "clamp(2.4rem, 3.2vw, 2.8rem)", color: "#1c1917" }}
                    >
                      {prod.name[lang] || prod.name.en}
                    </h3>
                    <p className="font-body text-sm leading-relaxed tracking-wide" style={{ color: "#a8a29e" }}>
                      {prod.info[lang] || prod.info.en}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6" style={{ borderTop: "1px solid rgba(176,141,78,0.15)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-display font-semibold italic mb-4"
            style={{ fontSize: "clamp(2.4rem, 4vw, 2.8rem)", color: "#1c1917" }}
          >
            {lang === "es"
              ? "¿Interesado en una obra en particular?"
              : lang === "it"
                ? "Interessato a un'opera in particolare?"
                : "Interested in a specific artwork?"}
          </h2>
          <p className="font-body text-base mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: "#78716c" }}>
            {lang === "es"
              ? "Para conocer la disponibilidad, solicitar un catálogo de precios detallado o programar una visita privada al estudio, contáctenos."
              : lang === "it"
                ? "Per conoscere la disponibilità, richiedere un listino prezzi dettagliato o prenotare una visita privata allo studio, non esitare a contattarci."
                : "To check availability, request a detailed price list, or schedule a private studio visit, please get in touch with us."}
          </p>
          <div className="w-16 h-px mx-auto mb-8" style={{ background: "rgba(176,141,78,0.3)" }} />
          <a
            href={`/${lang}`}
            className="inline-block px-8 py-3 font-body text-xs tracking-widest uppercase transition-all duration-500"
            style={{ border: "1px solid #8a6a2e", color: "#8a6a2e" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#8a6a2e";
              e.currentTarget.style.color = "#FAFAF8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#8a6a2e";
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
