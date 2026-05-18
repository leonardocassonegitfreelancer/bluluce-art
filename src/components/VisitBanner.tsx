import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";

const VisitBanner = () => {
  const { lang } = useLanguage();

  return (
    <section className="py-20 px-6 bg-espresso text-warm-cream">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
          {th("visitTitle", lang)}
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mb-8" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+37066408338"
            className="border border-gold text-gold px-8 py-3 font-body text-sm tracking-widest uppercase hover:bg-gold hover:text-espresso transition-colors duration-300"
          >
            {th("visitCall", lang)}
          </a>
          <a
            href="#contact"
            className="border border-warm-cream text-warm-cream px-8 py-3 font-body text-sm tracking-widest uppercase hover:bg-warm-cream hover:text-espresso transition-colors duration-300"
          >
            {th("visitFind", lang)}
          </a>
        </div>
      </div>
    </section>
  );
};

export default VisitBanner;
