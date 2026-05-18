import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import CategoryPage from "@/views/CategoryPage";
import type { CategorySlug } from "@/i18n/slugs";

const queryClient = new QueryClient();

interface Props {
  lang: string;
  category: CategorySlug;
}

export default function CategoryPageWrapper({ lang, category }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider initialLang={lang}>
          <CategoryPage category={category} />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
