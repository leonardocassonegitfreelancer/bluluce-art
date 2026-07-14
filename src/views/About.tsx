import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import artistaTerrazzoImg from "@/assets/artista_terrazzo_cavalletto_malaga.webp";
import artistaColoriImg from "@/assets/artista_ritratto_colori_viso.webp";
import artistaMijasImg from "@/assets/artista_mijas_pueblo_bianco_andalusia.webp";

const copy: Record<Lang, {
  seoTitle: string;
  seoDesc: string;
  label: string;
  heading: string;
  quote: string;
  bio1: string;
  bio2: string;
  bio3: string;
  techniqueLabel: string;
  facts: { title: string; desc: string }[];
  ctaLabel: string;
  ctaHref: (lang: string) => string;
}> = {
  it: {
    seoTitle: "Chi sono | BLULUCE ART – Pittrice Italiana a Málaga",
    seoDesc: "Artista italiana a Málaga. Dipingo figure immerse nella natura mediterranea con uno stile impressionista lirico — luce, pennellate libere, emozione.",
    label: "L'ARTISTA",
    heading: "Italiana.\nA Málaga.\nAlla ricerca della luce.",
    quote: "La luce del Mediterraneo non si descrive. Si dipinge.",
    bio1: "Sono un'artista italiana che ha trovato nella luce del Mediterraneo la sua più grande fonte di ispirazione. Vivo a Málaga, dove il mare, il vento e la terra dell'Andalusia hanno trasformato il mio modo di osservare il mondo e di dipingere.",
    bio2: "Credo che la natura non sia uno sfondo, ma il luogo a cui apparteniamo. È questa connessione che cerco di raccontare in ogni mia opera. Le figure che dipingo non dominano mai il paesaggio: ne fanno parte. Camminano nell'acqua, si perdono tra gli alberi, respirano la luce, diventando un tutt'uno con ciò che le circonda.",
    bio3: "Attraverso uno stile impressionista lirico interpreto la realtà con pennellate libere, colori vibranti e una luce che non descrive soltanto un luogo, ma un'emozione. Non cerco la perfezione del dettaglio, ma la poesia di un istante, la memoria di una sensazione, la bellezza silenziosa di ciò che spesso passa inosservato. Ogni dipinto nasce dal desiderio di fermare quella luce e custodirla nel tempo.",
    techniqueLabel: "TECNICA E MATERIALI",
    facts: [
      { title: "Dipinto a mano", desc: "Ogni opera è unica, realizzata interamente a mano su lino grezzo o tela. Non esistono copie o riproduzioni." },
      { title: "Pigmenti naturali", desc: "Lavoro con pigmenti naturali del Mediterraneo, oli e, in alcune opere, dettagli in foglia d'oro a 24 carati." },
      { title: "Stile impressionista lirico", desc: "Pennellate libere, colori vibranti e luce che non descrive un luogo ma un'emozione — la poesia di un istante fermata sulla tela." },
    ],
    ctaLabel: "ESPLORA LE OPERE",
    ctaHref: (l) => `/${l}/collezione`,
  },
  es: {
    seoTitle: "Sobre mí | BLULUCE ART – Pintora Italiana en Málaga",
    seoDesc: "Artista italiana en Málaga. Pinto figuras inmersas en la naturaleza mediterránea con un estilo impresionista lírico — luz, pinceladas libres, emoción.",
    label: "LA ARTISTA",
    heading: "Italiana.\nEn Málaga.\nEn busca de la luz.",
    quote: "La luz del Mediterráneo no se describe. Se pinta.",
    bio1: "Soy una artista italiana que ha encontrado en la luz del Mediterráneo su mayor fuente de inspiración. Vivo en Málaga, donde el mar, el viento y la tierra de Andalucía han transformado mi forma de observar el mundo y de pintar.",
    bio2: "Creo que la naturaleza no es un fondo, sino el lugar al que pertenecemos. Es esta conexión la que busco contar en cada una de mis obras. Las figuras que pinto nunca dominan el paisaje: forman parte de él. Caminan en el agua, se pierden entre los árboles, respiran la luz, convirtiéndose en uno con lo que les rodea.",
    bio3: "A través de un estilo impresionista lírico interpreto la realidad con pinceladas libres, colores vibrantes y una luz que no solo describe un lugar, sino una emoción. No busco la perfección del detalle, sino la poesía de un instante, la memoria de una sensación, la belleza silenciosa de lo que a menudo pasa desapercibido. Cada pintura nace del deseo de detener esa luz y custodiarla en el tiempo.",
    techniqueLabel: "TÉCNICA Y MATERIALES",
    facts: [
      { title: "Pintado a mano", desc: "Cada obra es única, realizada íntegramente a mano sobre lino crudo o lienzo. No existen copias ni reproducciones." },
      { title: "Pigmentos naturales", desc: "Trabajo con pigmentos naturales del Mediterráneo, aceites y, en algunas obras, detalles en pan de oro de 24 quilates." },
      { title: "Estilo impresionista lírico", desc: "Pinceladas libres, colores vibrantes y una luz que no describe un lugar sino una emoción — la poesía de un instante detenida en el lienzo." },
    ],
    ctaLabel: "EXPLORAR LAS OBRAS",
    ctaHref: (l) => `/${l}/tienda`,
  },
  en: {
    seoTitle: "About | BLULUCE ART – Italian Painter in Málaga",
    seoDesc: "Italian artist in Málaga. I paint figures immersed in Mediterranean nature with a lyrical Impressionist style — light, free brushstrokes, emotion.",
    label: "THE ARTIST",
    heading: "Italian.\nIn Málaga.\nIn search of light.",
    quote: "Mediterranean light cannot be described. It must be painted.",
    bio1: "I am an Italian artist who found in the light of the Mediterranean her greatest source of inspiration. I live in Málaga, where the sea, the wind and the land of Andalusia have transformed the way I observe the world and paint.",
    bio2: "I believe that nature is not a backdrop, but the place we belong to. It is this connection I seek to tell in each of my works. The figures I paint never dominate the landscape: they are part of it. They walk in the water, get lost among the trees, breathe the light, becoming one with everything around them.",
    bio3: "Through a lyrical Impressionist style I interpret reality with free brushstrokes, vibrant colours and a light that does not only describe a place, but an emotion. I do not seek the perfection of detail, but the poetry of a moment, the memory of a feeling, the silent beauty of what often goes unnoticed. Every painting is born from the desire to stop that light and keep it forever.",
    techniqueLabel: "TECHNIQUE & MATERIALS",
    facts: [
      { title: "Hand-painted", desc: "Every work is unique, painted entirely by hand on raw linen or canvas. No copies or reproductions exist." },
      { title: "Natural pigments", desc: "I work with natural Mediterranean pigments, oils and, in some works, 24-carat gold leaf details." },
      { title: "Lyrical Impressionist style", desc: "Free brushstrokes, vibrant colours and a light that describes not a place but an emotion — the poetry of a moment held on canvas." },
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

      {/* Hero — split layout */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ paddingTop: "80px", minHeight: "85vh" }}>

        {/* Photo — first on mobile, second on desktop */}
        <div className="relative order-first md:order-last" style={{ height: "88vw", maxHeight: "520px" }}>
          <img
            src={artistaTerrazzoImg.src}
            alt="Vittoria De Raymondi — studio a cielo aperto, Málaga"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 18%" }}
          />
          {/* Desktop: blend left edge into text column */}
          <div
            className="absolute inset-y-0 left-0 w-20 hidden md:block"
            style={{ background: "linear-gradient(to right, #FAFAF8, transparent)" }}
          />
          {/* Mobile: strong fade at bottom into background */}
          <div
            className="absolute inset-x-0 bottom-0 md:hidden"
            style={{
              height: "45%",
              background: "linear-gradient(to top, #FAFAF8 20%, rgba(250,248,245,0.6) 60%, transparent 100%)",
            }}
          />
        </div>

        {/* Text — second on mobile, first on desktop */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-14 md:py-20 order-last md:order-first">
          <div className="flex items-center gap-5 mb-10 md:mb-14">
            <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#b08d4e" }}>
              {t.label}
            </p>
            <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
          </div>
          <h1
            className="font-display font-normal italic leading-[1.08]"
            style={{ fontSize: "clamp(1.7rem, 6vw, 6rem)", color: "#1c1917" }}
          >
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <div className="mt-10 md:mt-12 h-px w-12" style={{ background: "rgba(176,141,78,0.35)" }} />
          <p
            className="font-display font-normal italic mt-6 md:mt-8"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.35rem)", color: "#b08d4e", maxWidth: "420px" }}
          >
            "{t.quote}"
          </p>
        </div>

      </div>

      {/* Bio */}
      <div className="py-20 md:py-28 px-6" style={{ borderTop: "1px solid rgba(176,141,78,0.15)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-20">
          {/* Text */}
          <div className="md:col-span-3 space-y-6">
            <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: "#1c1917" }}>
              {t.bio1}
            </p>
            <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: "#78716c" }}>
              {t.bio2}
            </p>
            <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: "#78716c" }}>
              {t.bio3}
            </p>
          </div>

          {/* Sidebar: photo + facts */}
          <div className="md:col-span-2 flex flex-col gap-0">
            {/* Photo with mat */}
            <div className="mb-8 overflow-hidden" style={{ background: "#f0ece5", padding: "10px 10px 18px" }}>
              <img
                src={artistaColoriImg.src}
                alt="Vittoria De Raymondi"
                className="w-full object-cover"
                style={{ aspectRatio: "3/4" }}
              />
            </div>
            {/* Facts */}
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

      {/* Full-width photo band */}
      <div className="w-full overflow-hidden" style={{ height: "clamp(260px, 38vw, 520px)" }}>
        <img
          src={artistaMijasImg.src}
          alt="Vittoria De Raymondi — Mijas, Andalusia"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 38%" }}
        />
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
                <h3 className="font-body font-semibold mb-3 uppercase tracking-wider" style={{ color: "#1c1917", fontSize: "0.7rem", letterSpacing: "0.15em" }}>
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
