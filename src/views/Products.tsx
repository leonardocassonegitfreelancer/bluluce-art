import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import { productsPath, categoryPath, categorySlugs as catSlugs } from "@/i18n/slugs";
import mediterraneanSeaImg from "@/assets/mediterranean_sea.png";
import terracottaClayImg from "@/assets/terracotta_clay.png";
import oliveSunImg from "@/assets/olive_sun.png";

const categoryLabels = [
  "COLECCIÓN MARE",
  "COLECCIÓN TERRA",
  "COLECCIÓN ULIVO",
];

const ProductsPage = () => {
  const { lang } = useLanguage();

  const categories = [
    {
      name: th("collectionMareTitle", lang),
      desc: th("collectionMareDesc", lang),
      img: mediterraneanSeaImg.src,
      imgAlt: "Colección Mare",
      slug: "mare" as const,
    },
    {
      name: th("collectionTerraTitle", lang),
      desc: th("collectionTerraDesc", lang),
      img: terracottaClayImg.src,
      imgAlt: "Colección Terra",
      slug: "terra" as const,
    },
    {
      name: th("collectionUlivoTitle", lang),
      desc: th("collectionUlivoDesc", lang),
      img: oliveSunImg.src,
      imgAlt: "Colección Ulivo",
      slug: "ulivo" as const,
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0E0804" }}>
      <SEO
        title={`${th("collectionTitle", lang)} | BLULUCE ART`}
        description={th("heroDescDesktop", lang)}
        path={productsPath(lang)}
      />
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-8 px-6 text-center">
        <p
          className="font-body text-xs tracking-[0.35em] uppercase mb-4"
          style={{ color: "#C9A96E" }}
        >
          BLULUCE ART
        </p>
        <h1
          className="font-display text-4xl md:text-5xl lg:text-6xl font-normal italic mb-4"
          style={{ color: "#f5f0e8" }}
        >
          {th("collectionTitle", lang)}
        </h1>
        <p
          className="font-body text-base max-w-xl mx-auto"
          style={{ color: "rgba(245,240,232,0.6)" }}
        >
          {lang === "es" 
            ? "Obras exclusivas pintadas a mano inspiradas en los reflejos y texturas del Mediterráneo." 
            : lang === "it" 
              ? "Opere esclusive dipinte a mano ispirate ai riflessi e alle trame del Mediterraneo." 
              : "Exclusive hand-painted artworks inspired by the reflections and textures of the Mediterranean."}
        </p>
      </div>

      {/* Gold filter chips */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-6 pb-16 md:pb-20">
        {catSlugs.map((slug, idx) => (
          <a
            key={slug}
            href={categoryPath(lang, slug)}
            className="font-body text-[11px] md:text-xs tracking-[0.2em] uppercase px-5 md:px-7 py-2.5 md:py-3 transition-all duration-300"
            style={{
              border: "1px solid rgba(201,169,110,0.35)",
              color: "rgba(245,240,232,0.6)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C9A96E";
              e.currentTarget.style.color = "#0E0804";
              e.currentTarget.style.background = "#C9A96E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
              e.currentTarget.style.color = "rgba(245,240,232,0.6)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {categoryLabels[idx]}
          </a>
        ))}
      </div>

      {/* Catalog list */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {categories.map((cat, i) => {
          const isReversed = i % 2 === 1;
          return (
            <a
              key={i}
              href={categoryPath(lang, cat.slug)}
              className="block group"
            >
              <div
                className="py-12 md:py-16"
                style={{
                  borderBottom: i < categories.length - 1 ? "1px solid rgba(201,169,110,0.1)" : "none",
                }}
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center ${
                    isReversed ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`overflow-hidden ${isReversed ? "md:[direction:ltr]" : ""}`} style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
                    <img
                      src={cat.img}
                      alt={cat.imgAlt}
                      className="w-full h-64 md:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                      style={{ filter: "brightness(0.9) contrast(1.05)" }}
                    />
                  </div>

                  {/* Text */}
                  <div className={`${isReversed ? "md:[direction:ltr]" : ""}`}>
                    <p
                      className="font-bebas text-sm tracking-[0.3em] uppercase mb-3"
                      style={{ color: "#C9A96E" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2
                      className="font-display text-2xl md:text-3xl lg:text-4xl font-normal italic tracking-wide mb-5 group-hover:text-[#C9A96E] transition-colors duration-300"
                      style={{ color: "#f5f0e8" }}
                    >
                      {cat.name}
                    </h2>
                    <p
                      className="font-body text-sm md:text-base leading-relaxed mb-6"
                      style={{ color: "rgba(245,240,232,0.55)" }}
                    >
                      {cat.desc}
                    </p>
                    <span
                      className="font-bebas text-xs tracking-[0.2em] uppercase group-hover:tracking-[0.3em] transition-all duration-300"
                      style={{ color: "#C9A96E", borderBottom: "1px solid rgba(201,169,110,0.3)" }}
                    >
                      {lang === "it" ? "ESPLORA LA COLLEZIONE →" : lang === "en" ? "EXPLORE COLLECTION →" : "EXPLORAR LA COLECCIÓN →"}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6" style={{ background: "#0E0804", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-display text-3xl md:text-4xl font-normal italic mb-4"
            style={{ color: "#f5f0e8" }}
          >
            {lang === "es" 
              ? "¿Interesado en una obra para su espacio?" 
              : lang === "it" 
                ? "Interessato a un'opera per i tuoi spazi?" 
                : "Interested in a piece for your space?"}
          </h2>
          <p className="font-body text-sm text-white/50 mb-8 max-w-lg mx-auto leading-relaxed">
            {lang === "es" 
              ? "Cada pintura es única y se entrega con un certificado de autenticidad firmado. Póngase en contacto con nuestro estudio para consultas y encargos privados." 
              : lang === "it" 
                ? "Ogni dipinto è unico e viene fornito con certificato di autenticità firmato. Contatta lo studio per informazioni o commissioni private." 
                : "Each painting is unique and comes with a signed certificate of authenticity. Contact the studio for inquiries and private commissions."}
          </p>
          <div className="w-16 h-px mx-auto mb-8" style={{ background: "rgba(201,169,110,0.3)" }} />
          <a
            href={`/${lang}`}
            className="inline-block px-8 py-3 font-body text-xs tracking-widest uppercase transition-all duration-500 ease-out"
            style={{
              border: "1px solid #C9A96E",
              color: "#C9A96E",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C9A96E";
              e.currentTarget.style.color = "#0E0804";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#C9A96E";
            }}
          >
            {lang === "es" ? "VOLVER AL INICIO" : lang === "it" ? "TORNA ALLA HOME" : "BACK TO HOME"}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
