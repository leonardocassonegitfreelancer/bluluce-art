import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LegalPage from "@/views/LegalPage";

const queryClient = new QueryClient();

interface Props {
  lang: string;
  type: "cookie" | "terms";
}

export default function LegalPageWrapper({ lang, type }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider initialLang={lang}>
          <LegalPage type={type} />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
