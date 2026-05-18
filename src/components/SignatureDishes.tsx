import { useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carbonara from "@/assets/carbonara-pasta.webp?url";
import burrata from "@/assets/burrata-prosciutto.webp?url";
import focacciaParma from "@/assets/focaccia-parma.webp?url";
import tiramisu from "@/assets/tiramisu.webp?url";

gsap.registerPlugin(ScrollTrigger);

const SignatureDishes = () => {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      img: carbonara,
      tag: th("navMenu", lang),
      title: "Pasta & Primi",
      sub: th("productsPasta", lang),
    },
    {
      img: burrata,
      tag: "Antipasti",
      title: "Antipasti",
      sub: th("productsSalumi", lang),
    },
    {
      img: focacciaParma,
      tag: "Focaccia",
      title: "Focaccia",
      sub: th("productsFocaccia", lang),
    },
    {
      img: tiramisu,
      tag: "Dolci",
      title: "Dolci",
      sub: th("productsDolci", lang),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } }
      );
      const cards = gridRef.current?.querySelectorAll(".dish-card");
      if (cards) {
        gsap.fromTo(cards,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.09,
            scrollTrigger: { trigger: gridRef.current, start: "top 84%", once: true } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#F2E4CB" }} className="py-14 md:py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">

        <div ref={labelRef} className="flex items-center gap-6 mb-8 md:mb-10">
          <span className="font-bebas text-2xl tracking-[0.1em] text-[#BF8A3D]/65">
            {th("productsLabel", lang)}
          </span>
          <div className="flex-1 h-px bg-[#BF8A3D]/15" />
          <a
            href={`/${lang}/menu`}
            className="font-body text-[0.55rem] tracking-[0.3em] uppercase text-[#5A3820]/45 hover:text-[#BF8A3D] transition-colors duration-300"
          >
            {th("productsViewAll", lang)}
          </a>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <a
              key={i}
              href={`/${lang}/menu`}
              className="dish-card group relative overflow-hidden rounded-2xl"
              style={{ height: "clamp(180px, 24vw, 300px)" }}
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                style={{ filter: "brightness(0.75)" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D06]/90 via-[#1A0D06]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-5">
                <p className="font-bebas text-sm tracking-[0.08em] text-[#E8825A]/85 mb-1">
                  {cat.tag}
                </p>
                <p className="font-body font-bold text-sm md:text-base tracking-[0.02em] uppercase text-white leading-tight">
                  {cat.title}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <a
            href={`/${lang}/menu`}
            className="font-body text-[0.6rem] tracking-[0.35em] uppercase text-[#BF8A3D] border-b border-[#BF8A3D]/30 pb-0.5 hover:border-[#BF8A3D] transition-colors duration-300"
          >
            {th("productsViewAll", lang)}
          </a>
        </div>

      </div>
    </section>
  );
};

export default SignatureDishes;
