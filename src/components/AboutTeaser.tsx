import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";

const copy: Record<Lang, {
  label: string;
  quote: string;
  bio: string;
  link: string;
}> = {
  it: {
    label: "L'ARTISTA",
    quote: "La luce del Mediterraneo non si descrive. Si dipinge.",
    bio: "Pittrice italiana innamorata di Málaga, lavoro ogni giorno con luce, colore e materia seguendo la tradizione impressionista — trasformando il mare, la terra e gli ulivi in pigmento e pennellata.",
    link: "La mia storia →",
  },
  es: {
    label: "LA ARTISTA",
    quote: "La luz del Mediterráneo no se describe. Se pinta.",
    bio: "Pintora italiana enamorada de Málaga, trabajo cada día con luz, color y materia siguiendo la tradición impresionista — transformando el mar, la tierra y los olivos en pigmento y pincelada.",
    link: "Mi historia →",
  },
  en: {
    label: "THE ARTIST",
    quote: "Mediterranean light cannot be described. It must be painted.",
    bio: "An Italian painter in love with Málaga, I work daily with light, colour and texture drawing on the Impressionist tradition — turning the sea, the earth and the olive trees into pigment and brushstroke.",
    link: "My story →",
  },
};

export default function AboutTeaser() {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.it;

  return (
    <section className="py-24 md:py-32 px-6 md:px-10" style={{ background: "#FAFAF8" }}>
      <div className="max-w-5xl mx-auto">

        {/* Label + rule */}
        <div className="flex items-center gap-5 mb-14">
          <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#b08d4e" }}>
            {t.label}
          </p>
          <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-20 items-start">

          {/* Quote — large left column */}
          <div className="md:col-span-3">
            <blockquote
              className="font-display font-normal italic leading-tight mb-0"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#1c1917", margin: 0 }}
            >
              {t.quote}
            </blockquote>
          </div>

          {/* Bio + link — right column */}
          <div className="md:col-span-2 flex flex-col justify-between gap-8">
            <div className="h-px" style={{ background: "rgba(176,141,78,0.22)" }} />
            <p className="font-body text-sm leading-relaxed" style={{ color: "#78716c" }}>
              {t.bio}
            </p>
            <a
              href={`/${lang}/about`}
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
