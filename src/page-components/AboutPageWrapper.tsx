import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import AboutView from "@/views/About";

const queryClient = new QueryClient();

interface Props {
  lang: string;
}

export default function AboutPageWrapper({ lang }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider initialLang={lang}>
          <AboutView />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
