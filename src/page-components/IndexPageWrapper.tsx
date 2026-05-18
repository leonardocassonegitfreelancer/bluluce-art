import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "@/views/Index";
import gsap from "gsap";

const queryClient = new QueryClient();

interface Props {
  lang: string;
}

export default function IndexPageWrapper({ lang }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  return (
    <div ref={wrapperRef} style={{ opacity: 0 }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LanguageProvider initialLang={lang}>
            <Index />
          </LanguageProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}
