import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import { productsPath, categoryPath, categorySlugs as catSlugs } from "@/i18n/slugs";
import cardFormaggi from "@/assets/card-formaggi.webp";
import cardVino from "@/assets/card-vino-new.webp";
import cardFocaccia from "@/assets/card-focaccia.webp";
import cardPasta from "@/assets/card-pasta-new.webp";
import cardConserve from "@/assets/card-conserve.webp";
import cardDolci from "@/assets/card-tiramisu.webp";
import cardProsciutto from "@/assets/card-prosciutto.webp";

const categoryLabels = [
  "PROSCIUTTI & FORMAGGI",
  "PASTA FRESCA",
  "FOCACCIA",
  "VINI",
  "DOLCI",
  "CONSERVE",
];

const ProductsPage = () => {
  const { lang } = useLanguage();

  const categories = [
    {
      name: th("productsNameSalumi", lang),
      desc: th("productsNarrativeSalumi", lang),
      img: cardProsciutto,
      imgAlt: "Prosciutti & Formaggi",
      slug: "prosciutti",
    },
    {
      name: th("productsNamePasta", lang),
      desc: th("productsNarrativePasta", lang),
      img: cardPasta,
      imgAlt: "Pasta Fresca",
      slug: "pasta",
    },
    {
      name: th("productsNameFocaccia", lang),
      desc: th("productsFocaccia", lang),
      img: cardFocaccia,
      imgAlt: "Focaccia",
      slug: "focaccia",
    },
    {
      name: th("productsNameWine", lang),
      desc: th("productsNarrativeVino", lang),
      img: cardVino,
      imgAlt: "Vino",
      slug: "vini",
    },
    {
      name: th("productsNameDolci", lang),
      desc: th("productsNarrativeDolci", lang),
      img: cardDolci,
      imgAlt: "Dolci",
      slug: "dolci",
    },
    {
      name: th("productsNameVari", lang),
      desc: th("productsVari", lang),
      img: cardConserve,
      imgAlt: "Conserve",
      slug: "conserve",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#141210" }}>
      <SEO
        title="Prodotti Italiani a Vilnius | LALIMENTARI – Salumi, Formaggi, Pasta, Vini"
        description="Scopri i prodotti italiani autentici da LALIMENTARI a Vilnius: salumi, formaggi, pasta fresca, vini, focacce e dolci. Italian deli products in Vilnius."
        path={productsPath(lang)}
      />
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-8 px-6 text-center">
        <p
          className="font-body text-xs tracking-[0.35em] uppercase mb-4"
          style={{ color: "#BF8A3D" }}
        >
          Lalimentari
        </p>
        <h1
          className="font-display text-4xl md:text-5xl lg:text-6xl font-normal italic mb-4"
          style={{ color: "#f5f0e8" }}
        >
          {th("productsPageTitle", lang)}
        </h1>
        <p
          className="font-body text-base max-w-xl mx-auto"
          style={{ color: "rgba(245,240,232,0.6)" }}
        >
          {th("productsPageDesc", lang)}
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
              border: "1px solid rgba(201,168,76,0.35)",
              color: "rgba(245,240,232,0.6)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#BF8A3D";
              e.currentTarget.style.color = "#BF8A3D";
              e.currentTarget.style.background = "rgba(201,168,76,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
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
              href={categoryPath(lang, cat.slug as any)}
              className="block group"
            >
              <div
                className="py-12 md:py-16"
                style={{
                  borderBottom: i < categories.length - 1 ? "1px solid rgba(201,168,76,0.1)" : "none",
                }}
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center ${
                    isReversed ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`overflow-hidden ${isReversed ? "md:[direction:ltr]" : ""}`}>
                    <img
                      src={cat.img}
                      alt={cat.imgAlt}
                      className="w-full h-64 md:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                      style={{ filter: "brightness(0.85) contrast(1.05)" }}
                    />
                  </div>

                  {/* Text */}
                  <div className={`${isReversed ? "md:[direction:ltr]" : ""}`}>
                    <p
                      className="font-body text-[10px] tracking-[0.3em] uppercase mb-3"
                      style={{ color: "#BF8A3D" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2
                      className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide mb-5 group-hover:text-gold transition-colors duration-300"
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
                      className="font-body text-xs tracking-[0.2em] uppercase group-hover:tracking-[0.3em] transition-all duration-300"
                      style={{ color: "#BF8A3D" }}
                    >
                      {th("productsViewAll", lang)}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6" style={{ background: "#1a1512" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-display text-3xl md:text-4xl font-semibold mb-4"
            style={{ color: "#f5f0e8" }}
          >
            {th("productsPageCta", lang)}
          </h2>
          <div className="w-16 h-px mx-auto mb-8" style={{ background: "rgba(201,168,76,0.3)" }} />
          <a
            href={`/${lang}#contact`}
            className="inline-block px-8 py-3 font-body text-sm tracking-widest uppercase transition-colors duration-300"
            style={{
              border: "1px solid #BF8A3D",
              color: "#BF8A3D",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#BF8A3D";
              e.currentTarget.style.color = "#141210";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#BF8A3D";
            }}
          >
            {th("productsPageCtaButton", lang)}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
