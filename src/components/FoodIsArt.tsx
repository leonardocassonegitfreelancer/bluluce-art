import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";

const FoodIsArt = () => {
  const { lang } = useLanguage();

  return (
    <section className="bg-espresso py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-body text-lg md:text-xl text-warm-cream/90 leading-relaxed mb-8 whitespace-pre-line">
          {th("foodArtText", lang)}
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-3 bg-gold text-espresso font-body text-sm tracking-widest uppercase hover:bg-gold/80 transition-all duration-300 font-semibold"
        >
          {th("foodArtButton", lang)}
        </a>
      </div>
    </section>
  );
};

export default FoodIsArt;
