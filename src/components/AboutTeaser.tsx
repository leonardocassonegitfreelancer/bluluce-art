import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import artistaImg from "@/assets/artista_tenda_sguardo.webp";

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
    <section className="py-24 md:py-32" style={{ background: "#FAFAF8" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* Portrait photo */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <img
              src={artistaImg.src}
              alt="Vittoria De Raymondi"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 15%" }}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-10">

            <div className="flex items-center gap-5">
              <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#8a6a2e" }}>
                {t.label}
              </p>
              <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
            </div>

            <blockquote
              className="font-display font-normal italic leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#1c1917", margin: 0 }}
            >
              {t.quote}
            </blockquote>

            <div className="flex flex-col gap-6">
              <div className="h-px" style={{ background: "rgba(176,141,78,0.22)" }} />
              <p className="font-body text-sm leading-relaxed" style={{ color: "#78716c" }}>
                {t.bio}
              </p>
              <a
                href={`/${lang}/about`}
                className="font-bebas text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:tracking-[0.4em] self-start"
                style={{ color: "#8a6a2e", borderBottom: "1px solid rgba(176,141,78,0.3)", paddingBottom: "3px" }}
              >
                {t.link}
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
