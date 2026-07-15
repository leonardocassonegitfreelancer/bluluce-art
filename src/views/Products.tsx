import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import { productsPath, categoryPath, categorySlugs as catSlugs } from "@/i18n/slugs";
import mediterraneanSeaImg from "@/assets/pittura_mare_donna_spiaggia_dune.webp";
import terracottaClayImg from "@/assets/pittura_ritratto_flamenca_rosa_scura.webp";
import oliveSunImg from "@/assets/pittura_ulivo_donna_sotto_albero.webp";

const ProductsPage = () => {
  const { lang } = useLanguage();

  const categories = [
    {
      name: th("collectionMareTitle", lang),
      desc: th("collectionMareDesc", lang),
      img: mediterraneanSeaImg.src,
      slug: "mare" as const,
    },
    {
      name: th("collectionFuocoTitle", lang),
      desc: th("collectionFuocoDesc", lang),
      img: terracottaClayImg.src,
      slug: "fuoco" as const,
    },
    {
      name: th("collectionTerraTitle", lang),
      desc: th("collectionTerraDesc", lang),
      img: oliveSunImg.src,
      slug: "terra" as const,
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
      <SEO
        title={`${th("collectionTitle", lang)} | BLULUCE ART`}
        description={th("heroDescDesktop", lang)}
        path={productsPath(lang)}
      />
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-5 mb-10">
            <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#8a6a2e" }}>
              BLULUCE ART
            </p>
            <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
          </div>
          <h1
            className="font-display font-medium uppercase mb-6"
            style={{ fontSize: "clamp(1.8rem, 5vw, 5rem)", color: "#1c1917", lineHeight: "1.05", letterSpacing: "0.07em" }}
          >
            {th("collectionTitle", lang)}
          </h1>
          <p className="font-body text-base max-w-lg leading-relaxed" style={{ color: "#78716c" }}>
            {lang === "es"
              ? "Obras exclusivas pintadas a mano inspiradas en los reflejos y texturas del Mediterráneo."
              : lang === "it"
                ? "Opere esclusive dipinte a mano ispirate ai riflessi e alle trame del Mediterraneo."
                : "Exclusive hand-painted artworks inspired by the reflections and textures of the Mediterranean."}
          </p>
        </div>
      </div>

      {/* Filter chips — left-aligned */}
      <div className="px-6 pb-16 md:pb-20">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-3">
        {catSlugs.map((slug, idx) => (
          <a
            key={slug}
            href={categoryPath(lang, slug)}
            className="font-body text-[11px] md:text-xs tracking-[0.2em] uppercase px-5 md:px-7 py-2.5 md:py-3 transition-all duration-300"
            style={{
              border: "1px solid rgba(176,141,78,0.3)",
              color: "#78716c",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#8a6a2e";
              e.currentTarget.style.color = "#FAFAF8";
              e.currentTarget.style.background = "#8a6a2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(176,141,78,0.3)";
              e.currentTarget.style.color = "#78716c";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {categories[idx].name}
          </a>
        ))}
      </div>
      </div>

      {/* Catalog list */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        {categories.map((cat, i) => {
          const isReversed = i % 2 === 1;
          const romans = ["I", "II", "III"];
          return (
            <a
              key={i}
              href={categoryPath(lang, cat.slug)}
              className="block group"
            >
              <div
                className="py-16 md:py-20"
                style={{
                  borderBottom: i < categories.length - 1 ? "1px solid rgba(28,25,23,0.07)" : "none",
                }}
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-center ${
                    isReversed ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Image with gallery mat — 3/5 cols */}
                  <div className={`md:col-span-3 overflow-hidden ${isReversed ? "md:[direction:ltr]" : ""}`}>
                    <div style={{ background: "#f0ece5", padding: "16px 16px 24px" }}>
                      <img
                        src={cat.img}
                        alt={cat.name}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                        style={{ aspectRatio: "3/2" }}
                      />
                    </div>
                  </div>

                  {/* Text — 2/5 cols */}
                  <div className={`md:col-span-2 ${isReversed ? "md:[direction:ltr]" : ""}`}>
                    <p
                      className="font-display font-normal italic leading-none mb-5 select-none"
                      style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)", color: "rgba(176,141,78,0.13)", lineHeight: 1 }}
                    >
                      {romans[i]}
                    </p>
                    <div className="h-px mb-6" style={{ background: "rgba(176,141,78,0.22)" }} />
                    <h2
                      className="font-display font-normal italic mb-5 leading-snug transition-colors duration-300 group-hover:text-[#8a6a2e]"
                      style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", color: "#1c1917" }}
                    >
                      {cat.name}
                    </h2>
                    <p
                      className="font-body text-sm leading-relaxed mb-8"
                      style={{ color: "#78716c" }}
                    >
                      {cat.desc}
                    </p>
                    <span
                      className="font-bebas text-[11px] tracking-[0.25em] uppercase transition-all duration-300 group-hover:tracking-[0.35em]"
                      style={{ color: "#8a6a2e", borderBottom: "1px solid rgba(176,141,78,0.3)", paddingBottom: "3px" }}
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

      <Footer />
    </div>
  );
};

export default ProductsPage;
