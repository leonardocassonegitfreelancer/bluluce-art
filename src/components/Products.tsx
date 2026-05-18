import cardFormaggi from "@/assets/card-formaggi.webp";
import cardVino from "@/assets/card-vino-new.webp";
import cardPasta from "@/assets/card-pasta-new.webp";
import cardFocaccia from "@/assets/card-focaccia.webp";
import cardDolci from "@/assets/card-tiramisu.webp";
import cardConserve from "@/assets/card-conserve.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import { productsPath } from "@/i18n/slugs";

const Products = () => {
  const { lang } = useLanguage();

  return (
    <section id="prodotti" className="bg-card">
      {/* Header */}
      <div className="pt-24 pb-12 px-6 text-center">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
          {th("productsLabel", lang)}
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
          {th("productsTitle", lang)}
        </h2>
        <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
          {th("productsDesc", lang)}
        </p>
      </div>

      {/* Section 1: Prosciutti & Formaggi — text left, staggered photos right */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">
              {th("prodSectionLabel1", lang)}
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Prosciutti &<br />Formaggi
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              {th("productsNarrativeSalumi", lang)}
            </p>
            <a
              href={productsPath(lang)}
              className="font-body text-sm text-primary hover:text-primary/80 tracking-wider uppercase transition-colors"
            >
              {th("productsViewAll", lang)}
            </a>
          </div>
          {/* Staggered photos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-sm overflow-hidden">
              <img
                src={cardFormaggi}
                alt="Prosciutti & Formaggi"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div className="rounded-sm overflow-hidden mt-8">
              <img
                src={cardPasta}
                alt="Fresh Pasta"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Pasta & Focaccia — photos left, text right */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Staggered photos (first on mobile via order) */}
          <div className="grid grid-cols-2 gap-4 order-2 md:order-1">
            <div className="rounded-sm overflow-hidden mt-8">
              <img
                src={cardFocaccia}
                alt="Focaccia"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div className="rounded-sm overflow-hidden">
              <img
                src={cardConserve}
                alt="Conserve"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
          {/* Text */}
          <div className="order-1 md:order-2">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">
              {th("prodSectionLabel2", lang)}
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Pasta Fresca &<br />Focaccia
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              {th("productsNarrativePasta", lang)}
            </p>
            <a
              href={productsPath(lang)}
              className="font-body text-sm text-primary hover:text-primary/80 tracking-wider uppercase transition-colors"
            >
              {th("productsViewAll", lang)}
            </a>
          </div>
        </div>
      </div>

      {/* Section 3: Two columns side-by-side — Wine / Dolci & Conserve */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16">
          {/* Wine */}
          <div className="text-center sm:text-left">
            <div className="rounded-sm overflow-hidden mb-6">
              <img
                src={cardVino}
                alt="Wine"
                className="w-full h-56 md:h-72 object-cover"
              />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Vino...
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {th("productsNarrativeVino", lang)}
            </p>
          </div>
          {/* Dolci & Conserve */}
          <div className="text-center sm:text-left">
            <div className="rounded-sm overflow-hidden mb-6">
              <img
                src={cardDolci}
                alt="Dolci & Conserve"
                className="w-full h-56 md:h-72 object-cover"
              />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
              ...Dolci & Conserve
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {th("productsNarrativeDolci", lang)}
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to={productsPath(lang)}
            className="font-body text-sm text-primary hover:text-primary/80 tracking-wider uppercase transition-colors"
          >
            {th("productsViewAll", lang)}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
