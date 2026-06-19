import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";

const WHATSAPP = "https://wa.me/34600000000";

const copy: Record<Lang, {
  seoTitle: string;
  seoDesc: string;
  label: string;
  heading: string;
  intro: string;
  processLabel: string;
  steps: { title: string; desc: string }[];
  detailsLabel: string;
  details: { label: string; value: string }[];
  ctaLabel: string;
  ctaNote: string;
}> = {
  it: {
    seoTitle: "Commissioni | BLULUCE ART – Opere su misura",
    seoDesc: "Richiedi un'opera originale su commissione. Dipinti a mano su lino o tela, con pigmenti naturali e foglia d'oro, realizzati appositamente per il tuo spazio.",
    label: "COMMISSIONI",
    heading: "Un'opera dipinta\napposta per te.",
    intro: "Se hai in mente uno spazio, un'emozione, un soggetto — possiamo lavorarlo insieme. Ogni opera su commissione nasce da un dialogo: ascolto la tua idea, propongo una composizione, e dipingo qualcosa che non esiste ancora da nessuna parte.",
    processLabel: "COME FUNZIONA",
    steps: [
      {
        title: "Contatto",
        desc: "Scrivimi descrivendo l'idea: il soggetto, le dimensioni approssimative, lo spazio dove l'opera andrà. Nessun dettaglio è troppo piccolo o troppo vago.",
      },
      {
        title: "Proposta",
        desc: "Preparo una proposta con bozzetto iniziale, scelta dei materiali, tempistica e preventivo. Nessun impegno fino alla tua approvazione.",
      },
      {
        title: "Realizzazione",
        desc: "Dipingo l'opera a mano e ti invio aggiornamenti durante il processo. La consegno su lino o tela, arrotolata o incorniciata, spedita in tutta Europa.",
      },
    ],
    detailsLabel: "DETTAGLI",
    details: [
      { label: "Tempi", value: "4–8 settimane dalla conferma" },
      { label: "Formati", value: "Da 60×50 cm fino a 200×150 cm" },
      { label: "Materiali", value: "Lino · Tela · Pigmenti naturali · Foglia d'oro" },
      { label: "Spedizione", value: "Tutta Europa · Imballaggio professionale" },
    ],
    ctaLabel: "INIZIA LA TUA COMMISSIONE",
    ctaNote: "Ti rispondo entro 24 ore.",
  },
  es: {
    seoTitle: "Encargos | BLULUCE ART – Obras a medida",
    seoDesc: "Solicita una obra original por encargo. Pinturas a mano sobre lino o lienzo, con pigmentos naturales y pan de oro, realizadas especialmente para tu espacio.",
    label: "ENCARGOS",
    heading: "Una obra pintada\nexpresamente para ti.",
    intro: "Si tienes en mente un espacio, una emoción, un tema — podemos trabajarlo juntos. Cada obra por encargo nace de un diálogo: escucho tu idea, propongo una composición y pinto algo que aún no existe en ningún lugar.",
    processLabel: "CÓMO FUNCIONA",
    steps: [
      {
        title: "Contacto",
        desc: "Escríbeme describiendo la idea: el tema, las dimensiones aproximadas, el espacio donde irá la obra. Ningún detalle es demasiado pequeño o demasiado vago.",
      },
      {
        title: "Propuesta",
        desc: "Preparo una propuesta con boceto inicial, elección de materiales, calendario y presupuesto. Sin compromiso hasta tu aprobación.",
      },
      {
        title: "Realización",
        desc: "Pinto la obra a mano y te envío actualizaciones durante el proceso. La entrego sobre lino o lienzo, enrollada o enmarcada, con envío a toda Europa.",
      },
    ],
    detailsLabel: "DETALLES",
    details: [
      { label: "Plazos", value: "4–8 semanas desde la confirmación" },
      { label: "Formatos", value: "De 60×50 cm hasta 200×150 cm" },
      { label: "Materiales", value: "Lino · Lienzo · Pigmentos naturales · Pan de oro" },
      { label: "Envío", value: "Toda Europa · Embalaje profesional" },
    ],
    ctaLabel: "EMPIEZA TU ENCARGO",
    ctaNote: "Te respondo en menos de 24 horas.",
  },
  en: {
    seoTitle: "Commissions | BLULUCE ART – Bespoke artworks",
    seoDesc: "Request an original commissioned artwork. Hand-painted on linen or canvas with natural pigments and gold leaf, created specifically for your space.",
    label: "COMMISSIONS",
    heading: "A painting made\nfor you.",
    intro: "If you have a space, an emotion, a subject in mind — we can work it through together. Every commissioned work begins with a conversation: I listen to your idea, propose a composition, and paint something that doesn't yet exist anywhere.",
    processLabel: "HOW IT WORKS",
    steps: [
      {
        title: "Get in touch",
        desc: "Write to me describing your idea: the subject, the approximate dimensions, the space where the work will go. No detail is too small or too vague.",
      },
      {
        title: "Proposal",
        desc: "I prepare a proposal with an initial sketch, choice of materials, timeline, and quote. No commitment until you approve.",
      },
      {
        title: "Creation",
        desc: "I paint the work by hand and send you updates during the process. Delivered on linen or canvas, rolled or framed, shipped across Europe.",
      },
    ],
    detailsLabel: "DETAILS",
    details: [
      { label: "Timeline", value: "4–8 weeks from confirmation" },
      { label: "Sizes", value: "From 60×50 cm up to 200×150 cm" },
      { label: "Materials", value: "Linen · Canvas · Natural pigments · Gold leaf" },
      { label: "Shipping", value: "All Europe · Professional packaging" },
    ],
    ctaLabel: "START YOUR COMMISSION",
    ctaNote: "I'll reply within 24 hours.",
  },
};

export default function CommissionsView() {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.it;
  const headingLines = t.heading.split("\n");

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        path={`/${lang}/commissioni`}
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

      {/* Intro */}
      <div className="px-6 pb-20" style={{ borderBottom: "1px solid rgba(176,141,78,0.15)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-20">
          <div className="md:col-span-3">
            <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: "#1c1917" }}>
              {t.intro}
            </p>
          </div>
          <div className="md:col-span-2 flex flex-col gap-4">
            {t.details.map((d) => (
              <div key={d.label} className="py-4" style={{ borderBottom: "1px solid rgba(28,25,23,0.07)" }}>
                <p className="font-bebas text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color: "#b08d4e" }}>
                  {d.label}
                </p>
                <p className="font-body text-sm" style={{ color: "#1c1917" }}>
                  {d.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process steps */}
      <div className="py-20 px-6" style={{ borderBottom: "1px solid rgba(176,141,78,0.15)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-5 mb-14">
            <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#b08d4e" }}>
              {t.processLabel}
            </p>
            <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {t.steps.map((step, i) => (
              <div key={i}>
                <p
                  className="font-display font-normal italic leading-none mb-4 select-none"
                  style={{ fontSize: "3rem", color: "rgba(176,141,78,0.13)" }}
                >
                  {["I", "II", "III"][i]}
                </p>
                <div className="h-px mb-5" style={{ background: "rgba(176,141,78,0.22)" }} />
                <h3
                  className="font-body text-sm font-semibold mb-3 uppercase tracking-wider"
                  style={{ color: "#1c1917", fontSize: "0.7rem", letterSpacing: "0.15em" }}
                >
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#78716c" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 px-6 text-center">
        <p className="font-body text-xs tracking-widest uppercase mb-8" style={{ color: "#a8a29e" }}>
          {t.ctaNote}
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-12 py-4 font-body text-xs tracking-widest uppercase transition-all duration-500"
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
