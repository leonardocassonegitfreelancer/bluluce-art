import { useLanguage } from "@/i18n/LanguageContext";

export const useLangPrefix = () => {
  const { lang } = useLanguage();
  return `/${lang}`;
};

export const useLangPath = (path: string) => {
  const prefix = useLangPrefix();
  // path should start with / or be just a hash
  if (path.startsWith("#")) return `${prefix}${path}`;
  return `${prefix}${path}`;
};
