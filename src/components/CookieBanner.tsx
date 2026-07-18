import { useState, useEffect } from "react";

const STORAGE_KEY = "bluluce_cookie_consent";

const copy = {
  it: {
    text: "Utilizziamo cookie tecnici necessari al funzionamento del sito. Con il tuo consenso usiamo anche cookie analitici per migliorare l'esperienza.",
    policy: "Cookie Policy",
    accept: "Accetta",
    decline: "Solo necessari",
  },
  es: {
    text: "Usamos cookies técnicas necesarias para el funcionamiento del sitio. Con tu consentimiento también usamos cookies analíticas para mejorar la experiencia.",
    policy: "Política de Cookies",
    accept: "Aceptar",
    decline: "Solo necesarias",
  },
  en: {
    text: "We use technical cookies necessary for the site to function. With your consent we also use analytics cookies to improve your experience.",
    policy: "Cookie Policy",
    accept: "Accept",
    decline: "Essential only",
  },
};

type Lang = keyof typeof copy;

interface Props {
  lang?: string;
}

export default function CookieBanner({ lang = "es" }: Props) {
  const [visible, setVisible] = useState(false);
  const t = copy[(lang as Lang) in copy ? (lang as Lang) : "es"];
  const policyHref = `/${lang}/cookie-policy`;

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#1c1917",
        borderTop: "1px solid rgba(201,169,110,0.2)",
        padding: "1.25rem 1.5rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "1rem",
        justifyContent: "space-between",
      }}
    >
      <p
        style={{
          fontFamily: "'Crimson Pro', serif",
          fontSize: "0.9rem",
          color: "rgba(250,248,245,0.8)",
          margin: 0,
          maxWidth: "680px",
          lineHeight: 1.6,
        }}
      >
        {t.text}{" "}
        <a
          href={policyHref}
          style={{ color: "#C9A96E", textDecoration: "underline" }}
        >
          {t.policy}
        </a>
      </p>

      <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "0.6rem 1.25rem",
            border: "1px solid rgba(201,169,110,0.3)",
            background: "transparent",
            color: "rgba(250,248,245,0.6)",
            cursor: "pointer",
          }}
        >
          {t.decline}
        </button>
        <button
          onClick={accept}
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "0.6rem 1.25rem",
            border: "1px solid #C9A96E",
            background: "#C9A96E",
            color: "#1c1917",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
