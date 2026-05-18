import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Lang } from "./homeTranslations";

const VALID_LANGS: Lang[] = ["lt", "en", "it"];

function getInitialLang(override?: string): Lang {
  if (override && VALID_LANGS.includes(override as Lang)) return override as Lang;
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored && VALID_LANGS.includes(stored)) return stored;
  }
  return "lt";
}

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: "lt", setLang: () => {} });

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: string;
}) => {
  const [lang, setLangState] = useState<Lang>(() => getInitialLang(initialLang));

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
