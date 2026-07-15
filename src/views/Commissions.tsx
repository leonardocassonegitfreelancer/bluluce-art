import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import artistaFieraImg from "@/assets/artista_fiera_opere_seduta.webp";
import beforeImg from "@/assets/commissioni_foto_bambina_spiaggia.webp";
import afterImg from "@/assets/commissioni_dipinto_bambina_spiaggia.webp";

const WHATSAPP_BASE = "https://wa.me/34603356284";

const sizes = ["60×50 cm", "80×60 cm", "100×80 cm", "120×100 cm", "150×120 cm"];

const materials: Record<Lang, string[]> = {
  it: ["Lino", "Tela"],
  es: ["Lino", "Lienzo"],
  en: ["Linen", "Canvas"],
};

const copy: Record<Lang, {
  seoTitle: string;
  seoDesc: string;
  label: string;
  heading: string;
  intro: string;
  sizeLabel: string;
  materialLabel: string;
  timelineLabel: string;
  timelineValue: string;
  shippingLabel: string;
  shippingValue: string;
  ctaLabel: string;
  ctaNote: string;
  beforeAfterLabel: string;
  beforeLabel: string;
  afterLabel: string;
  processLabel: string;
  steps: { title: string; desc: string }[];
  waMessage: (size: string, material: string) => string;
}> = {
  it: {
    seoTitle: "Quadro Personalizzato | BLULUCE ART – Opera su misura",
    seoDesc: "Richiedi un quadro personalizzato dipinto a mano su lino o tela, con pigmenti naturali e foglia d'oro, realizzato appositamente per il tuo spazio.",
    label: "QUADRO PERSONALIZZATO",
    heading: "Un dipinto\nfatto per te.",
    intro: "Ogni ricordo può diventare un dipinto. Inviami una foto o raccontami la tua idea, scegli il formato e la interpreterò nel mio stile impressionista lirico, trasformandola in un'opera unica da custodire nel tempo.",
    sizeLabel: "FORMATO",
    materialLabel: "MATERIALE",
    timelineLabel: "Tempi di realizzazione",
    timelineValue: "4–8 settimane dalla conferma",
    shippingLabel: "Spedizione",
    shippingValue: "Tutta Europa · Imballaggio professionale",
    ctaLabel: "RICHIEDI VIA WHATSAPP",
    ctaNote: "Ti rispondo entro 24 ore.",
    beforeAfterLabel: "LA FOTO DIVENTA UN DIPINTO",
    beforeLabel: "Foto originale",
    afterLabel: "Dipinto a mano",
    processLabel: "COME FUNZIONA",
    steps: [
      { title: "Contatto", desc: "Scrivimi descrivendo l'idea: il soggetto, le dimensioni approssimative, lo spazio dove l'opera andrà. Nessun dettaglio è troppo piccolo o troppo vago." },
      { title: "Proposta", desc: "Preparo una proposta con bozzetto iniziale, scelta dei materiali, tempistica e preventivo. Nessun impegno fino alla tua approvazione." },
      { title: "Realizzazione", desc: "Dipingo l'opera a mano e ti invio aggiornamenti durante il processo. La consegno su lino o tela, arrotolata o incorniciata, spedita in tutta Europa." },
    ],
    waMessage: (size, material) =>
      `Ciao Vittoria! Sono interessata/o a un dipinto su commissione.\n\nFormato: ${size}\nMateriale: ${material}\n\nPuoi darmi maggiori informazioni?`,
  },
  es: {
    seoTitle: "Cuadro Personalizado | BLULUCE ART – Obra a medida",
    seoDesc: "Solicita un cuadro personalizado pintado a mano sobre lino o lienzo, con pigmentos naturales y pan de oro, realizado especialmente para tu espacio.",
    label: "CUADRO PERSONALIZADO",
    heading: "Una pintura\nhecha para ti.",
    intro: "Cada recuerdo puede convertirse en un cuadro. Envíame una foto o cuéntame tu idea, elige el formato y lo interpretaré en mi estilo impresionista lírico, convirtiéndolo en una obra única para guardar en el tiempo.",
    sizeLabel: "FORMATO",
    materialLabel: "MATERIAL",
    timelineLabel: "Plazo de realización",
    timelineValue: "4–8 semanas desde la confirmación",
    shippingLabel: "Envío",
    shippingValue: "Toda Europa · Embalaje profesional",
    ctaLabel: "SOLICITAR POR WHATSAPP",
    ctaNote: "Te respondo en menos de 24 horas.",
    beforeAfterLabel: "LA FOTO SE CONVIERTE EN PINTURA",
    beforeLabel: "Foto original",
    afterLabel: "Pintura a mano",
    processLabel: "CÓMO FUNCIONA",
    steps: [
      { title: "Contacto", desc: "Escríbeme describiendo la idea: el tema, las dimensiones aproximadas, el espacio donde irá la obra. Ningún detalle es demasiado pequeño o demasiado vago." },
      { title: "Propuesta", desc: "Preparo una propuesta con boceto inicial, elección de materiales, calendario y presupuesto. Sin compromiso hasta tu aprobación." },
      { title: "Realización", desc: "Pinto la obra a mano y te envío actualizaciones durante el proceso. La entrego sobre lino o lienzo, enrollada o enmarcada, con envío a toda Europa." },
    ],
    waMessage: (size, material) =>
      `¡Hola Vittoria! Me interesa encargar una pintura.\n\nFormato: ${size}\nMaterial: ${material}\n\n¿Puedes darme más información?`,
  },
  en: {
    seoTitle: "Custom Painting | BLULUCE ART – Bespoke artwork",
    seoDesc: "Request a custom painting, hand-painted on linen or canvas with natural pigments and gold leaf, created specifically for your space.",
    label: "CUSTOM PAINTING",
    heading: "A painting\nmade for you.",
    intro: "Every memory can become a painting. Send me a photo or tell me your idea, choose the format and I'll interpret it in my lyrical Impressionist style, turning it into a unique work to treasure forever.",
    sizeLabel: "SIZE",
    materialLabel: "MATERIAL",
    timelineLabel: "Timeline",
    timelineValue: "4–8 weeks from confirmation",
    shippingLabel: "Shipping",
    shippingValue: "All Europe · Professional packaging",
    ctaLabel: "REQUEST VIA WHATSAPP",
    ctaNote: "I'll reply within 24 hours.",
    beforeAfterLabel: "THE PHOTO BECOMES A PAINTING",
    beforeLabel: "Original photo",
    afterLabel: "Hand-painted work",
    processLabel: "HOW IT WORKS",
    steps: [
      { title: "Get in touch", desc: "Write to me describing your idea: the subject, the approximate dimensions, the space where the work will go. No detail is too small or too vague." },
      { title: "Proposal", desc: "I prepare a proposal with an initial sketch, choice of materials, timeline, and quote. No commitment until you approve." },
      { title: "Creation", desc: "I paint the work by hand and send you updates during the process. Delivered on linen or canvas, rolled or framed, shipped across Europe." },
    ],
    waMessage: (size, material) =>
      `Hi Vittoria! I'm interested in commissioning a painting.\n\nSize: ${size}\nMaterial: ${material}\n\nCould you give me more information?`,
  },
};

export default function CommissionsView() {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.it;
  const headingLines = t.heading.split("\n");
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[lang as Lang]?.[0] ?? "Lino");

  const waUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(t.waMessage(selectedSize, selectedMaterial))}`;

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        path={`/${lang}/commissioni`}
      />
      <Navbar />

      {/* Before / After — shown first so the user sees the result before anything else */}
      <div className="px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-5 mb-14">
            <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#8a6a2e" }}>
              {t.beforeAfterLabel}
            </p>
            <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
            {/* After (painting) */}
            <div>
              <div style={{ background: "#f0ece5", padding: "14px 14px 22px" }}>
                <img
                  src={afterImg.src}
                  alt={t.afterLabel}
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
              <p className="font-bebas text-[10px] tracking-[0.35em] uppercase mt-4 text-center" style={{ color: "#8a6a2e" }}>
                {t.afterLabel}
              </p>
            </div>
            {/* Before (photo) */}
            <div>
              <div style={{ background: "#f0ece5", padding: "14px 14px 22px" }}>
                <img
                  src={beforeImg.src}
                  alt={t.beforeLabel}
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
              <p className="font-bebas text-[10px] tracking-[0.35em] uppercase mt-4 text-center" style={{ color: "#a8a29e" }}>
                {t.beforeLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product block — split layout */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: "1px solid rgba(176,141,78,0.15)" }}>

        {/* Left: artist photo */}
        <div className="relative" style={{ minHeight: "60vw" }}>
          <img
            src={artistaFieraImg.src}
            alt="Vittoria De Raymondi — Bluluce Art"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 48%" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-20 hidden md:block"
            style={{ background: "linear-gradient(to left, #FAFAF8, transparent)" }}
          />
        </div>

        {/* Right: product details */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 md:py-24">
          <p className="font-bebas text-[10px] tracking-[0.45em] uppercase mb-8" style={{ color: "#8a6a2e" }}>
            {t.label}
          </p>

          <h1
            className="font-display font-normal italic mb-8"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", color: "#1c1917", lineHeight: "1.1" }}
          >
            {headingLines.map((line, i) => {
              const isLast = i === headingLines.length - 1;
              return (
                <span key={i} className={isLast ? "not-italic font-semibold" : ""} style={isLast ? { color: "#8a6a2e" } : {}}>
                  {line}
                  {!isLast && <br />}
                </span>
              );
            })}
          </h1>

          <p className="font-body text-sm leading-relaxed mb-10" style={{ color: "#78716c", maxWidth: "420px" }}>
            {t.intro}
          </p>

          <div className="h-px mb-10" style={{ background: "rgba(176,141,78,0.2)" }} />

          {/* Size selector */}
          <div className="mb-8">
            <p className="font-bebas text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "#8a6a2e" }}>
              {t.sizeLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className="font-body text-[0.7rem] tracking-[0.12em] px-4 py-2 transition-all duration-200"
                  style={{
                    border: `1px solid ${selectedSize === s ? "#8a6a2e" : "rgba(176,141,78,0.3)"}`,
                    background: selectedSize === s ? "#8a6a2e" : "transparent",
                    color: selectedSize === s ? "#FAFAF8" : "#78716c",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Material selector */}
          <div className="mb-10">
            <p className="font-bebas text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "#8a6a2e" }}>
              {t.materialLabel}
            </p>
            <div className="flex gap-2">
              {(materials[lang as Lang] ?? materials.it).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMaterial(m)}
                  className="font-body text-[0.7rem] tracking-[0.12em] px-5 py-2 transition-all duration-200"
                  style={{
                    border: `1px solid ${selectedMaterial === m ? "#8a6a2e" : "rgba(176,141,78,0.3)"}`,
                    background: selectedMaterial === m ? "#8a6a2e" : "transparent",
                    color: selectedMaterial === m ? "#FAFAF8" : "#78716c",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="mb-10 space-y-4">
            <div className="flex items-start gap-3">
              <span className="font-bebas text-[9px] tracking-[0.3em] uppercase mt-0.5 flex-shrink-0" style={{ color: "#8a6a2e", minWidth: "120px" }}>
                {t.timelineLabel}
              </span>
              <span className="font-body text-sm" style={{ color: "#1c1917" }}>{t.timelineValue}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-bebas text-[9px] tracking-[0.3em] uppercase mt-0.5 flex-shrink-0" style={{ color: "#8a6a2e", minWidth: "120px" }}>
                {t.shippingLabel}
              </span>
              <span className="font-body text-sm" style={{ color: "#1c1917" }}>{t.shippingValue}</span>
            </div>
          </div>

          <div className="h-px mb-10" style={{ background: "rgba(176,141,78,0.2)" }} />

          {/* WhatsApp CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 font-body text-xs tracking-widest uppercase transition-all duration-500 mb-4"
            style={{ background: "#8a6a2e", color: "#FAFAF8", border: "1px solid #8a6a2e" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8a6a2e"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#8a6a2e"; e.currentTarget.style.color = "#FAFAF8"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t.ctaLabel}
          </a>
          <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase" style={{ color: "#a8a29e" }}>
            {t.ctaNote}
          </p>
        </div>
      </div>

      {/* Process steps */}
      <div className="py-20 px-6" style={{ borderTop: "1px solid rgba(176,141,78,0.15)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-5 mb-14">
            <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#8a6a2e" }}>
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
                <h3 className="font-body font-semibold mb-3 uppercase tracking-wider" style={{ color: "#1c1917", fontSize: "0.7rem", letterSpacing: "0.15em" }}>
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

      <Footer />
    </div>
  );
}
