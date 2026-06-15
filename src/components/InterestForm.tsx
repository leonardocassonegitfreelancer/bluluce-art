import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/homeTranslations";
import formBg from "@/assets/form_background_paint.webp";

const WA_NUMBER = "34603356284";

const copy: Record<Lang, {
  heading: string;
  sub: string;
  namePlaceholder: string;
  messagePlaceholder: string;
  cta: string;
  sent: string;
}> = {
  es: {
    heading: "¿Hablamos?",
    sub: "Escríbeme directamente por WhatsApp.",
    namePlaceholder: "Tu nombre",
    messagePlaceholder: "¿Qué obra te interesa? ¿Tienes alguna pregunta?",
    cta: "Enviar por WhatsApp",
    sent: "Abriendo WhatsApp...",
  },
  en: {
    heading: "Get in touch",
    sub: "Send me a message directly on WhatsApp.",
    namePlaceholder: "Your name",
    messagePlaceholder: "Which piece interests you? Any questions?",
    cta: "Send via WhatsApp",
    sent: "Opening WhatsApp...",
  },
  it: {
    heading: "Scrivimi",
    sub: "Contattami direttamente su WhatsApp.",
    namePlaceholder: "Il tuo nome",
    messagePlaceholder: "Quale opera ti interessa? Hai domande?",
    cta: "Invia su WhatsApp",
    sent: "Apertura WhatsApp...",
  },
};

export default function InterestForm() {
  const { lang } = useLanguage();
  const t = copy[lang as Lang] ?? copy.es;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = name.trim()
      ? `Hola, soy ${name.trim()}. ${message.trim()}`
      : message.trim();
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      id="interesse"
      aria-label="contact form"
      style={{
        backgroundImage: `url(${formBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      <div className="cf-wrapper">
        <div className="cf-card">
          <h2 className="cf-heading">{t.heading}</h2>
          <p className="cf-sub">{t.sub}</p>

          <form className="cf-form" onSubmit={handleSubmit} noValidate>
            <input
              className="cf-input"
              type="text"
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <textarea
              className="cf-textarea"
              placeholder={t.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
            <button
              className="cf-btn"
              type="submit"
              disabled={!message.trim() || sent}
            >
              <WhatsAppIcon />
              <span>{sent ? t.sent : t.cta}</span>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        #interesse {
          padding: 96px 24px 80px;
          display: flex;
          justify-content: center;
        }

        .cf-wrapper {
          width: 100%;
          max-width: 520px;
        }

        .cf-card {
          background: oklch(98% 0.007 78 / 0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid oklch(90% 0.01 78 / 0.6);
          border-radius: 4px;
          padding: 52px 48px 48px;
        }

        .cf-heading {
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          color: oklch(18% 0.012 78);
          margin: 0 0 10px;
          line-height: 1.1;
        }

        .cf-sub {
          font-size: 0.95rem;
          color: oklch(42% 0.01 78);
          margin: 0 0 36px;
          line-height: 1.5;
        }

        .cf-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cf-input,
        .cf-textarea {
          width: 100%;
          background: oklch(96% 0.006 78 / 0.7);
          border: 1px solid oklch(84% 0.012 78);
          border-radius: 3px;
          padding: 14px 16px;
          font-size: 0.9375rem;
          color: oklch(20% 0.01 78);
          outline: none;
          transition: border-color 0.18s ease, background 0.18s ease;
          font-family: inherit;
          box-sizing: border-box;
        }

        .cf-textarea {
          resize: vertical;
          min-height: 110px;
          line-height: 1.55;
        }

        .cf-input::placeholder,
        .cf-textarea::placeholder {
          color: oklch(58% 0.009 78);
        }

        .cf-input:focus,
        .cf-textarea:focus {
          border-color: oklch(52% 0.025 165);
          background: oklch(98% 0.005 78 / 0.9);
        }

        .cf-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
          padding: 15px 28px;
          background: oklch(52% 0.14 145);
          color: oklch(98% 0.005 78);
          border: none;
          border-radius: 3px;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 0.18s ease, opacity 0.18s ease, transform 80ms ease;
          font-family: inherit;
        }

        .cf-btn:hover:not(:disabled) {
          background: oklch(47% 0.14 145);
        }

        .cf-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .cf-btn:disabled {
          opacity: 0.55;
          cursor: default;
        }

        @media (max-width: 560px) {
          .cf-card {
            padding: 40px 28px 36px;
          }
        }
      `}</style>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
