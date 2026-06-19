import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";

const copy: Record<Lang, {
  seoTitle: string;
  seoDesc: string;
  label: string;
  heading: string;
  quote: string;
  bio1: string;
  bio2: string;
  techniqueLabel: string;
  facts: { title: string; desc: string }[];
  ctaLabel: string;
  ctaHref: (lang: string) => string;
}> = {
  it: {
    seoTitle: "Chi sono | BLULUCE ART – Pittrice Italiana a Málaga",
    seoDesc: "Pittrice italiana a Málaga ispirata dall'arte impressionista. Opere originali su lino e tela con pigmenti naturali e foglia d'oro.",
    label: "L'ARTISTA",
    heading: "Italiana.\nA Málaga.\nInnamorata della luce.",
    quote: "La luce del Mediterraneo non si descrive. Si dipinge.",
    bio1: "Sono una pittrice italiana trapiantata a Málaga, dove la qualità della luce e il carattere del paesaggio mediterraneo hanno trasformato radicalmente il mio modo di vedere e dipingere. La tradizione impressionista — il suo approccio istintivo alla luce, alla pennellata libera, alla cattura dell'attimo — è il filo che guida ogni mio lavoro.",
    bio2: "Il Mediterraneo è il mio studio a cielo aperto. Il modo in cui la luce cambia sul mare all'alba, il calore della terra andalusa, il fruscio argentato degli ulivi sotto il sole di mezzogiorno — tutto diventa pigmento, pennellata, tela. Ogni opera nasce dall'osservazione diretta e dal desiderio di fermare qualcosa di effimero.",
    techniqueLabel: "TECNICA E MATERIALI",
    facts: [
      { title: "Dipinto a mano", desc: "Ogni opera è unica, realizzata interamente a mano su lino grezzo o tela. Non esistono copie o riproduzioni." },
      { title: "Pigmenti naturali", desc: "Lavoro con pigmenti naturali del Mediterraneo, oli e, in alcune opere, dettagli in foglia d'oro a 24 carati." },
      { title: "Tradizione impressionista", desc: "La pennellata visibile, la luce diretta e la spontaneità del gesto: l'impressionismo è la mia lingua madre pittorica." },
    ],
    ctaLabel: "ESPLORA LE OPERE",
    ctaHref: (l) => `/${l}/collezione`,
  },
  es: {
    seoTitle: "Sobre mí | BLULUCE ART – Pintora Italiana en Málaga",
    seoDesc: "Pintora italiana en Málaga inspirada por el arte impresionista. Obras originales sobre lino y tela con pigmentos naturales y pan de oro.",
    label: "LA ARTISTA",
    heading: "Italiana.\nEn Málaga.\nEnamorada de la luz.",
    quote: "La luz del Mediterráneo no se describe. Se pinta.",
    bio1: "Soy una pintora italiana afincada en Málaga, donde la calidad de la luz y el carácter del paisaje mediterráneo han transformado radicalmente mi forma de ver y pintar. La tradición impresionista — su enfoque instintivo hacia la luz, la pincelada libre, la captura del instante — es el hilo que guía cada uno de mis trabajos.",
    bio2: "El Mediterráneo es mi estudio al aire libre. La forma en que la luz cambia sobre el mar al amanecer, el calor de la tierra andaluza, el susurro plateado de los olivos bajo el sol del mediodía — todo se convierte en pigmento, pincelada, lienzo. Cada obra nace de la observación directa y del deseo de detener algo efímero.",
    techniqueLabel: "TÉCNICA Y MATERIALES",
    facts: [
      { title: "Pintado a mano", desc: "Cada obra es única, realizada íntegramente a mano sobre lino crudo o lienzo. No existen copias ni reproducciones." },
      { title: "Pigmentos naturales", desc: "Trabajo con pigmentos naturales del Mediterráneo, aceites y, en algunas obras, detalles en pan de oro de 24 quilates." },
      { title: "Tradición impresionista", desc: "La pincelada visible, la luz directa y la espontaneidad del gesto: el impresionismo es mi lengua materna pictórica." },
    ],
    ctaLabel: "EXPLORAR LAS OBRAS",
    ctaHref: (l) => `/${l}/tienda`,
  },
  en: {
    seoTitle: "About | BLULUCE ART – Italian Painter in Málaga",
    seoDesc: "Italian painter in Málaga inspired by Impressionist art. Original works on linen and canvas with natural pigments and gold leaf.",
    label: "THE ARTIST",
    heading: "Italian.\nIn Málaga.\nIn love with light.",
    quote: "Mediterranean light cannot be described. It must be painted.",
    bio1: "I am an Italian painter based in Málaga, where the quality of light and the character of the Mediterranean landscape have radically transformed the way I see and paint. The Impressionist tradition — its instinctive approach to light, free brushwork, the capture of the moment — is the thread running through all my work.",
    bio2: "The Mediterranean is my open-air studio. The way light shifts across the sea at dawn, the warmth of Andalusian earth, the silver rustle of olive trees under the midday sun — everything becomes pigment, brushstroke, canvas. Every work is born from direct observation and the desire to hold something ephemeral still.",
    techniqueLabel: "TECHNIQUE & MATERIALS",
    facts: [
      { title: "Hand-painted", desc: "Every work is unique, painted entirely by hand on raw linen or canvas. No copies or reproductions exist." },
      { title: "Natural pigments", desc: "I work with natural Mediterranean pigments, oils and, in some works, 24-carat gold leaf details." },
      { title: "Impressionist tradition", desc: "Visible brushwork, direct light and spontaneity of gesture: Impressionism is my native pictorial language." },
    ],
    ctaLabel: "EXPLORE THE WORKS",
    ctaHref: (l) => `/${l}/shop`,
  },
};

export default function AboutView() {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.it;
  const headingLines = t.heading.split("\n");

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        path={`/${lang}/about`}
      />
      <Navbar />

      {/* Hero header */}
      <div className="pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-5 mb-12">
            <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#b08d4e" }}>
              {t.label}
            </p>
            <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
          </div>
          <h1
            className="font-display font-normal italic leading-[1.1]"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "#1c1917" }}
          >
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Quote band */}
      <div className="py-14 px-6" style={{ borderTop: "1px solid rgba(176,141,78,0.15)", borderBottom: "1px solid rgba(176,141,78,0.15)" }}>
        <div className="max-w-5xl mx-auto">
          <blockquote
            className="font-display font-normal italic"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#b08d4e", margin: 0 }}
          >
            "{t.quote}"
          </blockquote>
        </div>
      </div>

      {/* Bio */}
      <div className="py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-20">
          <div className="md:col-span-3 space-y-6">
            <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: "#1c1917" }}>
              {t.bio1}
            </p>
            <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: "#78716c" }}>
              {t.bio2}
            </p>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6 pt-1">
            {[
              { label: lang === "it" ? "Nazionalità" : lang === "es" ? "Nacionalidad" : "Nationality", value: lang === "it" ? "Italiana" : "Italian / Italiana" },
              { label: lang === "it" ? "Basata a" : lang === "es" ? "Basada en" : "Based in", value: "Málaga, España" },
              { label: lang === "it" ? "Influenze" : lang === "es" ? "Influencias" : "Influences", value: lang === "it" ? "Impressionismo" : lang === "es" ? "Impresionismo" : "Impressionism" },
              { label: lang === "it" ? "Supporto" : lang === "es" ? "Soporte" : "Surface", value: lang === "it" ? "Lino · Tela" : "Linen · Canvas" },
            ].map((fact) => (
              <div key={fact.label} className="py-4" style={{ borderBottom: "1px solid rgba(28,25,23,0.07)" }}>
                <p className="font-bebas text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color: "#b08d4e" }}>
                  {fact.label}
                </p>
                <p className="font-body text-sm" style={{ color: "#1c1917" }}>
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technique */}
      <div className="py-20 px-6" style={{ borderTop: "1px solid rgba(176,141,78,0.15)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-5 mb-14">
            <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#b08d4e" }}>
              {t.techniqueLabel}
            </p>
            <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {t.facts.map((fact, i) => (
              <div key={i}>
                <p
                  className="font-display font-normal italic leading-none mb-4 select-none"
                  style={{ fontSize: "3rem", color: "rgba(176,141,78,0.13)" }}
                >
                  {["I", "II", "III"][i]}
                </p>
                <div className="h-px mb-5" style={{ background: "rgba(176,141,78,0.22)" }} />
                <h3 className="font-body text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "#1c1917", fontSize: "0.7rem", letterSpacing: "0.15em" }}>
                  {fact.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#78716c" }}>
                  {fact.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-6 text-center" style={{ borderTop: "1px solid rgba(176,141,78,0.15)" }}>
        <a
          href={t.ctaHref(lang)}
          className="inline-block px-10 py-4 font-body text-xs tracking-widest uppercase transition-all duration-500"
          style={{ border: "1px solid #b08d4e", color: "#b08d4e" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#b08d4e"; e.currentTarget.style.color = "#FAFAF8"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#b08d4e"; }}
        >
          {t.ctaLabel}
        </a>
      </div>

      <Footer />
    </div>
  );
}
