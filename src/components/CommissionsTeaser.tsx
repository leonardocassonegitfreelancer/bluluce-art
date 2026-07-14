import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";

const copy: Record<Lang, {
  label: string;
  heading: string;
  body: string;
  link: string;
}> = {
  it: {
    label: "QUADRO PERSONALIZZATO",
    heading: "Un'opera dipinta\napposta per te",
    body: "Se hai in mente uno spazio, un soggetto, un'emozione — possiamo lavorarlo insieme. Ogni opera su commissione nasce da un dialogo: ascolto la tua idea e dipingo qualcosa che non esiste ancora da nessuna parte.",
    link: "Scopri il processo →",
  },
  es: {
    label: "CUADRO PERSONALIZADO",
    heading: "Una obra pintada\nexpresamente para ti",
    body: "Si tienes en mente un espacio, un tema, una emoción — podemos trabajarlo juntos. Cada obra por encargo nace de un diálogo: escucho tu idea y pinto algo que aún no existe en ningún lugar.",
    link: "Descubrir el proceso →",
  },
  en: {
    label: "CUSTOM PAINTING",
    heading: "A painting made\nfor you",
    body: "If you have a space, a subject, an emotion in mind — we can work it through together. Every commissioned work begins with a conversation: I listen to your idea and paint something that doesn't yet exist anywhere.",
    link: "Discover the process →",
  },
};

export default function CommissionsTeaser() {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.it;
  const headingLines = t.heading.split("\n");

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-10"
      style={{ borderTop: "1px solid rgba(176,141,78,0.15)", background: "#FAFAF8" }}
    >
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-5 mb-14">
          <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#b08d4e" }}>
            {t.label}
          </p>
          <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-20 items-start">

          <div className="md:col-span-3">
            <h2
              className="font-bebas font-light uppercase leading-none"
              style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)", color: "#1c1917", letterSpacing: "0.03em" }}
            >
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>

          <div className="md:col-span-2 flex flex-col gap-8">
            <div className="h-px" style={{ background: "rgba(176,141,78,0.22)" }} />
            <p className="font-body text-sm leading-relaxed" style={{ color: "#78716c" }}>
              {t.body}
            </p>
            <a
              href={`/${lang}/commissioni`}
              className="font-bebas text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:tracking-[0.4em] self-start"
              style={{ color: "#b08d4e", borderBottom: "1px solid rgba(176,141,78,0.3)", paddingBottom: "3px" }}
            >
              {t.link}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
