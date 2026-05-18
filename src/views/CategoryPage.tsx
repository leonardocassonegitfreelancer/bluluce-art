import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";
import { th, type Lang } from "@/i18n/homeTranslations";
import { productsPath, categoryPath, type CategorySlug } from "@/i18n/slugs";

import cardProsciutto from "@/assets/card-prosciutto.webp";
import cardFormaggi from "@/assets/card-formaggi.webp";
import cardPasta from "@/assets/card-pasta-new.webp";
import cardFocaccia from "@/assets/card-focaccia.webp";
import cardVino from "@/assets/card-vino-new.webp";
import cardConserve from "@/assets/card-conserve.webp";
import cardDolci from "@/assets/card-tiramisu.webp";

import prodProsciuttoNegroni    from "@/assets/card-prosciutto.webp";
import prodProsciuttoSantarello from "@/assets/bruschetta-crudo.webp";
import prodParmigiano            from "@/assets/formaggi-pasta.webp";
import prodBurrata               from "@/assets/burrata-prosciutto.webp";
import prodPaccheri              from "@/assets/paccheri-pescatore.webp";
import prodOrecchiette           from "@/assets/amatriciana-pasta.webp";
import prodFocacciaRosmarino     from "@/assets/focaccia-molise.webp";
import prodFocacciaOlive         from "@/assets/focaccia-bologna.webp";
import prodChianti               from "@/assets/card-vino-new.webp";
import prodNeroDavola            from "@/assets/card-vino-new.webp";
import prodSanMarzano            from "@/assets/pomodoro-pasta.webp";
import prodPesto                 from "@/assets/pesto-pasta.webp";

interface CategoryData {
  heroImg: string;
  labelKey: string;
  nameKey: string;
  descKey: string;
  products: { nameKey: string; descKey: string; img: string }[];
}

const categoryData: Record<CategorySlug, CategoryData> = {
  prosciutti: {
    heroImg: cardProsciutto,
    labelKey: "prodCatProsciuttiLabel",
    nameKey: "prodCatProsciuttiName",
    descKey: "prodCatProsciuttiDesc",
    products: [
      { nameKey: "prodCard_prosciutti_1_name", descKey: "prodCard_prosciutti_1_desc", img: prodProsciuttoNegroni },
      { nameKey: "prodCard_prosciutti_2_name", descKey: "prodCard_prosciutti_2_desc", img: prodProsciuttoSantarello },
      { nameKey: "prodCard_formaggi_1_name", descKey: "prodCard_formaggi_1_desc", img: prodParmigiano },
      { nameKey: "prodCard_formaggi_2_name", descKey: "prodCard_formaggi_2_desc", img: prodBurrata },
    ],
  },
  pasta: {
    heroImg: cardPasta,
    labelKey: "prodCatPastaLabel",
    nameKey: "prodCatPastaName",
    descKey: "prodCatPastaDesc",
    products: [
      { nameKey: "prodCard_pasta_1_name", descKey: "prodCard_pasta_1_desc", img: prodPaccheri },
      { nameKey: "prodCard_pasta_2_name", descKey: "prodCard_pasta_2_desc", img: prodOrecchiette },
    ],
  },
  focaccia: {
    heroImg: cardFocaccia,
    labelKey: "prodCatFocacciaLabel",
    nameKey: "prodCatFocacciaName",
    descKey: "prodCatFocacciaDesc",
    products: [
      { nameKey: "prodCard_focaccia_1_name", descKey: "prodCard_focaccia_1_desc", img: prodFocacciaRosmarino },
      { nameKey: "prodCard_focaccia_2_name", descKey: "prodCard_focaccia_2_desc", img: prodFocacciaOlive },
    ],
  },
  vini: {
    heroImg: cardVino,
    labelKey: "prodCatViniLabel",
    nameKey: "prodCatViniName",
    descKey: "prodCatViniDesc",
    products: [
      { nameKey: "prodCard_vini_1_name", descKey: "prodCard_vini_1_desc", img: prodChianti },
      { nameKey: "prodCard_vini_2_name", descKey: "prodCard_vini_2_desc", img: prodNeroDavola },
    ],
  },
  dolci: {
    heroImg: cardDolci,
    labelKey: "prodCatConserveLabel",
    nameKey: "productsNameDolci",
    descKey: "productsNarrativeDolci",
    products: [],
  },
  conserve: {
    heroImg: cardConserve,
    labelKey: "prodCatConserveLabel",
    nameKey: "prodCatConserveName",
    descKey: "prodCatConserveDesc",
    products: [
      { nameKey: "prodCard_conserve_1_name", descKey: "prodCard_conserve_1_desc", img: prodSanMarzano },
      { nameKey: "prodCard_conserve_2_name", descKey: "prodCard_conserve_2_desc", img: prodPesto },
    ],
  },
};

const allSlugs: { slug: CategorySlug; label: string }[] = [
  { slug: "prosciutti", label: "PROSCIUTTI" },
  { slug: "pasta", label: "PASTA" },
  { slug: "focaccia", label: "FOCACCIA" },
  { slug: "vini", label: "VINI" },
  { slug: "dolci", label: "DOLCI" },
  { slug: "conserve", label: "CONSERVE" },
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
    <div className="min-h-screen" style={{ background: "#141210" }}>
      <SEO
        title={`${th(data.nameKey as any, lang)} | LALIMENTARI`}
        description={th(data.descKey as any, lang)}
        path={categoryPath(lang, slug)}
      />
      <Navbar />

      {/* Hero image */}
      <div className="relative pt-16">
        <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={data.heroImg}
            alt={th(data.nameKey as any, lang)}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.7) contrast(1.05)" }}
          />
          <div
            className="absolute inset-0 mt-16"
            style={{
              background: "linear-gradient(to top, #141210 0%, rgba(20,18,16,0.6) 40%, transparent 70%)",
            }}
          />
        </div>
        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:pb-14">
          <div className="max-w-5xl mx-auto">
            <p
              className="font-body text-[10px] md:text-xs tracking-[0.35em] uppercase mb-3"
              style={{ color: "#BF8A3D" }}
            >
              {th(data.labelKey as any, lang)}
            </p>
            <h1
              className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-wide"
              style={{ color: "#f5f0e8" }}
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
          className="font-body text-[11px] md:text-xs tracking-[0.2em] uppercase px-5 md:px-7 py-2.5 md:py-3 transition-all duration-300"
          style={{
            border: "1px solid rgba(201,168,76,0.35)",
            color: "rgba(245,240,232,0.6)",
          }}
        >
          â† TUTTI
        </a>
        {allSlugs.map((s) => (
          <a
            key={s.slug}
            href={categoryPath(lang, s.slug)}
            className="font-body text-[11px] md:text-xs tracking-[0.2em] uppercase px-5 md:px-7 py-2.5 md:py-3 transition-all duration-300"
            style={{
              border: `1px solid ${s.slug === slug ? "#BF8A3D" : "rgba(201,168,76,0.35)"}`,
              background: s.slug === slug ? "rgba(201,168,76,0.12)" : "transparent",
              color: s.slug === slug ? "#BF8A3D" : "rgba(245,240,232,0.6)",
            }}
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* Description */}
      <div className="max-w-3xl mx-auto px-6 pb-16 md:pb-20">
        <p
          className="font-body text-base md:text-lg leading-relaxed"
          style={{ color: "rgba(245,240,232,0.6)" }}
        >
          {th(data.descKey as any, lang)}
        </p>
        <div className="w-16 h-px mt-10" style={{ background: "rgba(201,168,76,0.25)" }} />
      </div>

      {/* Product cards */}
      {data.products.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <p
            className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase mb-10"
            style={{ color: "#BF8A3D" }}
          >
            {th("prodCardAlso", lang)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.products.map((prod, i) => (
              <div
                key={i}
                className="group overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(245,240,232,0.04)",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}
              >
                <div className="overflow-hidden">
                  <img
                    src={prod.img}
                    alt={th(prod.nameKey as any, lang)}
                    className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "brightness(0.9) contrast(1.05)" }}
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3
                    className="font-display text-lg md:text-xl font-semibold tracking-wide mb-2"
                    style={{ color: "#f5f0e8" }}
                  >
                    {th(prod.nameKey as any, lang)}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "rgba(245,240,232,0.5)" }}
                  >
                    {th(prod.descKey as any, lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
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
            style={{ border: "1px solid #BF8A3D", color: "#BF8A3D" }}
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

export default CategoryPage;
