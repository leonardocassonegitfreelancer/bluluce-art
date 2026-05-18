import type { Lang } from "@/i18n/homeTranslations";

/** Localized slug for the "all products" page */
export const productsSlug: Record<Lang, string> = {
  lt: "produktai",
  en: "products",
  it: "prodotti",
};

/** Localized slugs for individual category pages */
export const categorySlugs = [
  "prosciutti",
  "pasta",
  "focaccia",
  "vini",
  "dolci",
  "conserve",
] as const;

export type CategorySlug = (typeof categorySlugs)[number];

/** Build localised path for the products listing */
export const productsPath = (lang: Lang) => `/${lang}/${productsSlug[lang]}`;

/** Build localised path for a category page */
export const categoryPath = (lang: Lang, slug: CategorySlug) =>
  `/${lang}/${productsSlug[lang]}/${slug}`;
