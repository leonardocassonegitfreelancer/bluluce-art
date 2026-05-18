import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import { useEffect, useRef, useState } from "react";

const Faq = () => {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const faqs = [
    { q: th("faq1Q", lang), a: th("faq1A", lang) },
    { q: th("faq2Q", lang), a: th("faq2A", lang) },
    { q: th("faq3Q", lang), a: th("faq3A", lang) },
    { q: th("faq4Q", lang), a: th("faq4A", lang) },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-8" style={{ background: "#EBD9B8" }}>
      <div className="max-w-3xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="font-bebas text-xl tracking-[0.12em] text-[#8B3A1A]/70 mb-4">
            {th("faqLabel", lang)}
          </p>
          <h2 className="font-display text-[2.5rem] md:text-[3.8rem] font-normal italic text-[#2A1810] leading-[0.92]" style={{ letterSpacing: "-0.015em" }}>
            {th("faqTitle", lang)}
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className={`border border-[#8B3A1A]/15 px-6 rounded-none transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: visible ? `${(i + 1) * 120}ms` : "0ms" }}
            >
              <AccordionTrigger className="font-display text-lg text-[#2A1810]/90 hover:text-[#8B3A1A] hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-[#5A3820]/70 text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
