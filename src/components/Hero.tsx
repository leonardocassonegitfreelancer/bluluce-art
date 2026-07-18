import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import { productsSlug } from "@/i18n/slugs";
import HeroTimedCards from "@/components/HeroTimedCards";
import img1 from "@/assets/pittura_mare_donna_spiaggia_dune.webp?url";
import img2 from "@/assets/pittura_ritratto_flamenca_rosa_scura.webp?url";
import img3 from "@/assets/pittura_ulivo_donna_sotto_albero.webp?url";
import img4 from "@/assets/pittura_mare_donna_schiena_acqua.webp?url";
import img5 from "@/assets/pittura_ritratto_donna_fiore_oro.webp?url";
import img6 from "@/assets/pittura_mare_madre_figlia_acqua.webp?url";

const copy: Record<Lang, { line1: string; highlight: string; line2: string; desc: string; cta1: string; cta2: string }> = {
  es: {
    line1: "Donde el mar",
    highlight: "encuentra",
    line2: "el arte.",
    desc: "Pinturas originales inspiradas en la luz, las mujeres y los paisajes del Mediterráneo. Creaciones únicas pintadas a mano.",
    cta1: "Descubrir Colección",
    cta2: "Sobre mí",
  },
  en: {
    line1: "Where the sea",
    highlight: "meets",
    line2: "art.",
    desc: "Original paintings inspired by the light, women and landscapes of the Mediterranean. Unique hand-painted works of art.",
    cta1: "Shop Collection",
    cta2: "About me",
  },
  it: {
    line1: "Dove il mare",
    highlight: "incontra",
    line2: "l'arte.",
    desc: "Dipinti originali ispirati alla luce, alle donne e ai paesaggi del Mediterraneo. Opere uniche dipinte a mano.",
    cta1: "Scopri la Collezione",
    cta2: "Chi sono",
  },
};

const Hero = () => {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.es;
  const prefix = `/${lang}`;
  const collectionUrl = `${prefix}/${productsSlug[lang as Lang] || productsSlug.es}`;
  const aboutUrl = `${prefix}/about`;

  return (
    <HeroTimedCards
      images={[img1, img2, img3, img4, img5, img6]}
      line1={t.line1}
      highlight={t.highlight}
      line2={t.line2}
      description={t.desc}
      ctas={[
        { label: t.cta1, href: collectionUrl },
        { label: t.cta2, href: aboutUrl },
      ]}
      accent="#C9A96E"
      background="#0E0804"
      autoMs={6000}
    />
  );
};

export default Hero;
