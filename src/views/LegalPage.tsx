import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";

type PageType = "cookie" | "terms";

const cookieCopy: Record<Lang, { title: string; sections: { h: string; p: string }[] }> = {
  it: {
    title: "Cookie Policy",
    sections: [
      {
        h: "Titolare del trattamento",
        p: "Vittoria De Raymondi – BLULUCE ART · bluluceart.com · info@bluluceart.com",
      },
      {
        h: "Cosa sono i cookie",
        p: "I cookie sono piccoli file di testo che i siti visitati inviano al browser e che vengono memorizzati sul tuo dispositivo. Permettono al sito di ricordare le tue azioni e preferenze nel tempo.",
      },
      {
        h: "Cookie tecnici",
        p: "Utilizziamo cookie tecnici strettamente necessari al funzionamento del sito (navigazione, preferenze di lingua). Non raccolgono dati personali e non richiedono consenso.",
      },
      {
        h: "Google Analytics (cookie analitici)",
        p: "Utilizziamo Google Analytics 4 (GA4) per analizzare il comportamento degli utenti in forma aggregata e anonima: pagine visitate, durata della sessione, provenienza geografica. Gli indirizzi IP sono anonimizzati prima della trasmissione a Google. Puoi disattivare questo tracciamento installando il componente aggiuntivo del browser disponibile su tools.google.com/dlpage/gaoptout.",
      },
      {
        h: "Meta Pixel (cookie di marketing)",
        p: "Il sito utilizza il Meta Pixel (Facebook / Instagram) per misurare l'efficacia delle inserzioni pubblicitarie e mostrarti annunci pertinenti sulle piattaforme Meta. I dati raccolti (visite, interazioni) sono trattati da Meta Platforms Ireland Ltd. secondo la propria informativa privacy. Puoi gestire le preferenze pubblicitarie su facebook.com/settings?tab=ads.",
      },
      {
        h: "Google Ads / Remarketing",
        p: "Potremmo utilizzare Google Ads per campagne di remarketing, mostrando annunci a chi ha già visitato il sito. Google utilizza il cookie _gads a questo scopo. Puoi disattivare la pubblicità personalizzata su adssettings.google.com.",
      },
      {
        h: "Durata dei cookie",
        p: "I cookie analitici e di marketing hanno una durata variabile da 30 giorni a 2 anni, come definita dai rispettivi fornitori. I cookie tecnici scadono al termine della sessione.",
      },
      {
        h: "Come gestire o disabilitare i cookie",
        p: "Puoi gestire, bloccare o eliminare i cookie dalle impostazioni del tuo browser. Tieni presente che la disabilitazione di alcuni cookie potrebbe compromettere la corretta navigazione del sito. Per ulteriori informazioni consulta la guida del tuo browser o visita aboutcookies.org.",
      },
      {
        h: "Aggiornamenti",
        p: "Questa Cookie Policy può essere aggiornata in qualsiasi momento. Ti invitiamo a consultarla periodicamente. Ultima revisione: luglio 2026.",
      },
    ],
  },
  es: {
    title: "Política de Cookies",
    sections: [
      {
        h: "Responsable del tratamiento",
        p: "Vittoria De Raymondi – BLULUCE ART · bluluceart.com · info@bluluceart.com",
      },
      {
        h: "¿Qué son las cookies?",
        p: "Las cookies son pequeños archivos de texto que los sitios web envían a tu navegador y se almacenan en tu dispositivo. Permiten al sitio recordar tus acciones y preferencias a lo largo del tiempo.",
      },
      {
        h: "Cookies técnicas",
        p: "Utilizamos cookies técnicas estrictamente necesarias para el funcionamiento del sitio (navegación, preferencias de idioma). No recopilan datos personales y no requieren consentimiento.",
      },
      {
        h: "Google Analytics (cookies analíticas)",
        p: "Utilizamos Google Analytics 4 (GA4) para analizar el comportamiento de los usuarios de forma agregada y anónima: páginas visitadas, duración de la sesión, origen geográfico. Las direcciones IP se anonimizan antes de ser transmitidas a Google. Puedes desactivar este seguimiento instalando el complemento del navegador disponible en tools.google.com/dlpage/gaoptout.",
      },
      {
        h: "Meta Pixel (cookies de marketing)",
        p: "El sitio utiliza el Meta Pixel (Facebook / Instagram) para medir la eficacia de los anuncios publicitarios y mostrarte anuncios relevantes en las plataformas Meta. Los datos recopilados son tratados por Meta Platforms Ireland Ltd. según su propia política de privacidad. Puedes gestionar tus preferencias publicitarias en facebook.com/settings?tab=ads.",
      },
      {
        h: "Google Ads / Remarketing",
        p: "Podemos utilizar Google Ads para campañas de remarketing, mostrando anuncios a quienes ya han visitado el sitio. Google utiliza la cookie _gads para este fin. Puedes desactivar la publicidad personalizada en adssettings.google.com.",
      },
      {
        h: "Duración de las cookies",
        p: "Las cookies analíticas y de marketing tienen una duración variable de 30 días a 2 años, según lo definido por los respectivos proveedores. Las cookies técnicas caducan al final de la sesión.",
      },
      {
        h: "Cómo gestionar o deshabilitar las cookies",
        p: "Puedes gestionar, bloquear o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta que deshabilitar algunas cookies puede afectar a la correcta navegación del sitio. Para más información, consulta la guía de tu navegador o visita aboutcookies.org.",
      },
      {
        h: "Actualizaciones",
        p: "Esta Política de Cookies puede actualizarse en cualquier momento. Te invitamos a consultarla periódicamente. Última revisión: julio 2026.",
      },
    ],
  },
  en: {
    title: "Cookie Policy",
    sections: [
      {
        h: "Data Controller",
        p: "Vittoria De Raymondi – BLULUCE ART · bluluceart.com · info@bluluceart.com",
      },
      {
        h: "What are cookies?",
        p: "Cookies are small text files that websites send to your browser and store on your device. They allow the site to remember your actions and preferences over time.",
      },
      {
        h: "Technical cookies",
        p: "We use strictly necessary technical cookies for the site to function (navigation, language preferences). They do not collect personal data and do not require consent.",
      },
      {
        h: "Google Analytics (analytical cookies)",
        p: "We use Google Analytics 4 (GA4) to analyse user behaviour in aggregated and anonymous form: pages visited, session duration, geographic origin. IP addresses are anonymised before transmission to Google. You can opt out by installing the browser add-on available at tools.google.com/dlpage/gaoptout.",
      },
      {
        h: "Meta Pixel (marketing cookies)",
        p: "The site uses the Meta Pixel (Facebook / Instagram) to measure the effectiveness of advertising campaigns and to show you relevant ads on Meta platforms. Data collected is processed by Meta Platforms Ireland Ltd. under their own privacy policy. You can manage your advertising preferences at facebook.com/settings?tab=ads.",
      },
      {
        h: "Google Ads / Remarketing",
        p: "We may use Google Ads remarketing campaigns to show ads to previous site visitors. Google uses the _gads cookie for this purpose. You can opt out of personalised advertising at adssettings.google.com.",
      },
      {
        h: "Cookie duration",
        p: "Analytical and marketing cookies have a lifetime ranging from 30 days to 2 years, as defined by the respective providers. Technical cookies expire at the end of the session.",
      },
      {
        h: "How to manage or disable cookies",
        p: "You can manage, block or delete cookies from your browser settings. Please note that disabling some cookies may affect the correct functioning of the site. For more information, consult your browser's guide or visit aboutcookies.org.",
      },
      {
        h: "Updates",
        p: "This Cookie Policy may be updated at any time. We invite you to check it periodically. Last revised: July 2026.",
      },
    ],
  },
};

const termsCopy: Record<Lang, { title: string; sections: { h: string; p: string }[] }> = {
  it: {
    title: "Termini di utilizzo",
    sections: [
      {
        h: "Titolare",
        p: "Vittoria De Raymondi – BLULUCE ART · bluluceart.com · info@bluluceart.com",
      },
      {
        h: "Proprietà intellettuale",
        p: "Tutti i contenuti presenti su questo sito — immagini, dipinti, testi, loghi e materiali grafici — sono di proprietà esclusiva di Vittoria De Raymondi e protetti dalle leggi sul diritto d'autore. È vietata qualsiasi riproduzione, distribuzione, modifica o utilizzo commerciale senza autorizzazione scritta.",
      },
      {
        h: "Uso del sito",
        p: "Il sito ha finalità informativa e commerciale. L'utente si impegna a utilizzarlo in modo lecito, senza interferire con il suo corretto funzionamento né tentare di accedere a sezioni riservate.",
      },
      {
        h: "Acquisti e commissioni",
        p: "Le opere in vendita e le commissioni private vengono gestite tramite contatto diretto (WhatsApp o email). Non è presente un sistema di pagamento online. Ogni vendita è soggetta ad accordo individuale tra l'acquirente e l'artista.",
      },
      {
        h: "Disponibilità delle opere",
        p: "Le immagini presenti sul sito mostrano opere originali che potrebbero già essere state vendute. Contattaci per verificare la disponibilità prima di procedere con qualsiasi richiesta.",
      },
      {
        h: "Limitazione di responsabilità",
        p: "BLULUCE ART non garantisce la disponibilità continua del sito e non è responsabile di eventuali danni derivanti dall'utilizzo dello stesso. I colori delle opere mostrate online possono differire leggermente dall'originale a causa delle variabili di calibrazione dei monitor.",
      },
      {
        h: "Legge applicabile",
        p: "I presenti Termini sono regolati dalla legge spagnola. Per qualsiasi controversia è competente il foro di Málaga, Spagna.",
      },
      {
        h: "Modifiche",
        p: "Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. Le modifiche saranno efficaci dalla data di pubblicazione sul sito. Ultima revisione: luglio 2026.",
      },
    ],
  },
  es: {
    title: "Términos de uso",
    sections: [
      {
        h: "Titular",
        p: "Vittoria De Raymondi – BLULUCE ART · bluluceart.com · info@bluluceart.com",
      },
      {
        h: "Propiedad intelectual",
        p: "Todos los contenidos de este sitio web — imágenes, pinturas, textos, logotipos y materiales gráficos — son propiedad exclusiva de Vittoria De Raymondi y están protegidos por las leyes de propiedad intelectual. Queda prohibida cualquier reproducción, distribución, modificación o uso comercial sin autorización escrita.",
      },
      {
        h: "Uso del sitio",
        p: "El sitio tiene una finalidad informativa y comercial. El usuario se compromete a utilizarlo de forma lícita, sin interferir en su correcto funcionamiento ni intentar acceder a secciones restringidas.",
      },
      {
        h: "Compras y encargos",
        p: "Las obras en venta y los encargos privados se gestionan mediante contacto directo (WhatsApp o correo electrónico). No existe un sistema de pago en línea. Cada venta está sujeta a un acuerdo individual entre el comprador y la artista.",
      },
      {
        h: "Disponibilidad de las obras",
        p: "Las imágenes del sitio muestran obras originales que podrían haber sido vendidas. Contáctanos para verificar la disponibilidad antes de realizar cualquier consulta.",
      },
      {
        h: "Limitación de responsabilidad",
        p: "BLULUCE ART no garantiza la disponibilidad continua del sitio y no se hace responsable de los daños derivados de su uso. Los colores de las obras mostradas en línea pueden diferir ligeramente del original debido a las variables de calibración de los monitores.",
      },
      {
        h: "Ley aplicable",
        p: "Los presentes Términos se rigen por la ley española. Para cualquier controversia, serán competentes los juzgados de Málaga, España.",
      },
      {
        h: "Modificaciones",
        p: "Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones serán efectivas desde su publicación en el sitio. Última revisión: julio 2026.",
      },
    ],
  },
  en: {
    title: "Terms of Use",
    sections: [
      {
        h: "Owner",
        p: "Vittoria De Raymondi – BLULUCE ART · bluluceart.com · info@bluluceart.com",
      },
      {
        h: "Intellectual property",
        p: "All content on this website — images, paintings, texts, logos and graphic materials — is the exclusive property of Vittoria De Raymondi and is protected by copyright law. Any reproduction, distribution, modification or commercial use without written permission is strictly prohibited.",
      },
      {
        h: "Use of the site",
        p: "The site has an informational and commercial purpose. Users agree to use it lawfully, without interfering with its correct operation or attempting to access restricted sections.",
      },
      {
        h: "Purchases and commissions",
        p: "Artworks for sale and private commissions are handled through direct contact (WhatsApp or email). There is no online payment system. Each sale is subject to an individual agreement between the buyer and the artist.",
      },
      {
        h: "Availability of works",
        p: "Images on the site show original works that may already have been sold. Please contact us to verify availability before making any request.",
      },
      {
        h: "Limitation of liability",
        p: "BLULUCE ART does not guarantee continuous availability of the site and is not liable for any damages arising from its use. Colours of works shown online may differ slightly from the original due to monitor calibration variables.",
      },
      {
        h: "Governing law",
        p: "These Terms are governed by Spanish law. Any disputes shall be subject to the jurisdiction of the courts of Málaga, Spain.",
      },
      {
        h: "Changes",
        p: "We reserve the right to modify these Terms at any time. Changes take effect from the date of publication on the site. Last revised: July 2026.",
      },
    ],
  },
};

interface Props {
  type: PageType;
}

export default function LegalPage({ type }: Props) {
  const { lang } = useLanguage();
  const l = lang as Lang;
  const data = type === "cookie" ? cookieCopy[l] : termsCopy[l];

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-24">

        <div className="flex items-center gap-5 mb-12">
          <p className="font-bebas text-[10px] tracking-[0.45em] uppercase flex-shrink-0" style={{ color: "#8a6a2e" }}>
            {l === "it" ? "LEGALE" : l === "es" ? "LEGAL" : "LEGAL"}
          </p>
          <div className="h-px flex-1" style={{ background: "rgba(176,141,78,0.2)" }} />
        </div>

        <h1
          className="font-display font-normal italic leading-tight mb-16"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#1c1917" }}
        >
          {data.title}
        </h1>

        <div className="flex flex-col gap-10">
          {data.sections.map((s, i) => (
            <div key={i}>
              <h2
                className="font-bebas text-[11px] tracking-[0.35em] uppercase mb-3"
                style={{ color: "#8a6a2e" }}
              >
                {s.h}
              </h2>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#57534e" }}>
                {s.p}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10" style={{ borderTop: "1px solid rgba(176,141,78,0.15)" }}>
          <a
            href={`/${lang}`}
            className="font-bebas text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:tracking-[0.4em]"
            style={{ color: "#8a6a2e", borderBottom: "1px solid rgba(176,141,78,0.3)", paddingBottom: "3px" }}
          >
            ← {l === "it" ? "Torna alla home" : l === "es" ? "Volver al inicio" : "Back to home"}
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
