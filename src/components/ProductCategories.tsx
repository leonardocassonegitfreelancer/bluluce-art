import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { th, type Lang } from "@/i18n/homeTranslations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import cardProsciutto from "@/assets/card-prosciutto.webp?url";
import cardFormaggi from "@/assets/card-formaggi.webp?url";
import cardPasta from "@/assets/card-pasta-new.webp?url";
import cardFocaccia from "@/assets/card-focaccia.webp?url";
import cardVino from "@/assets/card-vino-new.webp?url";
import cardConserve from "@/assets/card-conserve.webp?url";

import prodProsciuttoNegroni    from "@/assets/card-prosciutto.webp?url";
import prodProsciuttoSantarello from "@/assets/bruschetta-crudo.webp?url";
import prodParmigiano            from "@/assets/formaggi-pasta.webp?url";
import prodBurrata               from "@/assets/burrata-prosciutto.webp?url";
import prodPaccheri              from "@/assets/paccheri-pescatore.webp?url";
import prodOrecchiette           from "@/assets/amatriciana-pasta.webp?url";
import prodFocacciaRosmarino     from "@/assets/focaccia-molise.webp?url";
import prodFocacciaOlive         from "@/assets/focaccia-bologna.webp?url";
import prodChianti               from "@/assets/card-vino-new.webp?url";
import prodNeroDavola            from "@/assets/card-vino-new.webp?url";
import prodSanMarzano            from "@/assets/pomodoro-pasta.webp?url";
import prodPesto                 from "@/assets/pesto-pasta.webp?url";

const categories = [
  { key: "Prosciutti", label: "PROSCIUTTI" },
  { key: "Formaggi", label: "FORMAGGI" },
  { key: "Pasta", label: "PASTA" },
  { key: "Focaccia", label: "FOCACCIA" },
  { key: "Vini", label: "VINI" },
  { key: "Conserve", label: "CONSERVE" },
];

interface ProductData {
  categoryLabel: string;
  name: string;
  description: string;
  img: string;
}

interface ProductCard {
  name: string;
  description: string;
  img: string;
}

const getProductsByCategory = (lang: Lang): Record<string, ProductData> => ({
  Prosciutti: {
    categoryLabel: th("prodCatProsciuttiLabel", lang),
    name: th("prodCatProsciuttiName", lang),
    description: th("prodCatProsciuttiDesc", lang),
    img: cardProsciutto,
  },
  Formaggi: {
    categoryLabel: th("prodCatFormaggiLabel", lang),
    name: th("prodCatFormaggiName", lang),
    description: th("prodCatFormaggiDesc", lang),
    img: cardFormaggi,
  },
  Pasta: {
    categoryLabel: th("prodCatPastaLabel", lang),
    name: th("prodCatPastaName", lang),
    description: th("prodCatPastaDesc", lang),
    img: cardPasta,
  },
  Focaccia: {
    categoryLabel: th("prodCatFocacciaLabel", lang),
    name: th("prodCatFocacciaName", lang),
    description: th("prodCatFocacciaDesc", lang),
    img: cardFocaccia,
  },
  Vini: {
    categoryLabel: th("prodCatViniLabel", lang),
    name: th("prodCatViniName", lang),
    description: th("prodCatViniDesc", lang),
    img: cardVino,
  },
  Conserve: {
    categoryLabel: th("prodCatConserveLabel", lang),
    name: th("prodCatConserveName", lang),
    description: th("prodCatConserveDesc", lang),
    img: cardConserve,
  },
});

const getProductCards = (lang: Lang): Record<string, ProductCard[]> => ({
  Prosciutti: [
    { name: th("prodCard_prosciutti_1_name", lang), description: th("prodCard_prosciutti_1_desc", lang), img: prodProsciuttoNegroni },
    { name: th("prodCard_prosciutti_2_name", lang), description: th("prodCard_prosciutti_2_desc", lang), img: prodProsciuttoSantarello },
  ],
  Formaggi: [
    { name: th("prodCard_formaggi_1_name", lang), description: th("prodCard_formaggi_1_desc", lang), img: prodParmigiano },
    { name: th("prodCard_formaggi_2_name", lang), description: th("prodCard_formaggi_2_desc", lang), img: prodBurrata },
  ],
  Pasta: [
    { name: th("prodCard_pasta_1_name", lang), description: th("prodCard_pasta_1_desc", lang), img: prodPaccheri },
    { name: th("prodCard_pasta_2_name", lang), description: th("prodCard_pasta_2_desc", lang), img: prodOrecchiette },
  ],
  Focaccia: [
    { name: th("prodCard_focaccia_1_name", lang), description: th("prodCard_focaccia_1_desc", lang), img: prodFocacciaRosmarino },
    { name: th("prodCard_focaccia_2_name", lang), description: th("prodCard_focaccia_2_desc", lang), img: prodFocacciaOlive },
  ],
  Vini: [
    { name: th("prodCard_vini_1_name", lang), description: th("prodCard_vini_1_desc", lang), img: prodChianti },
    { name: th("prodCard_vini_2_name", lang), description: th("prodCard_vini_2_desc", lang), img: prodNeroDavola },
  ],
  Conserve: [
    { name: th("prodCard_conserve_1_name", lang), description: th("prodCard_conserve_1_desc", lang), img: prodSanMarzano },
    { name: th("prodCard_conserve_2_name", lang), description: th("prodCard_conserve_2_desc", lang), img: prodPesto },
  ],
});

const ProductCategories = () => {
  const { lang } = useLanguage();
  const [active, setActive] = useState("Prosciutti");
  const product = getProductsByCategory(lang)[active];
  const cards = getProductCards(lang)[active];
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-8"
      style={{ background: "#0C0A08" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p
            className="font-body text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: "#BF8A3D" }}
          >
            {th("prodCatLabel", lang)}
          </p>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-normal italic"
            style={{ color: "#f5f0e8" }}
          >
            {th("prodCatTitle", lang)}
          </h2>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 md:mb-20">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className="font-body text-[11px] md:text-xs tracking-[0.2em] uppercase px-5 md:px-7 py-2.5 md:py-3 rounded-none transition-all duration-300"
              style={{
                border: `1px solid ${active === cat.key ? "#BF8A3D" : "rgba(201,168,76,0.35)"}`,
                background: active === cat.key ? "rgba(201,168,76,0.12)" : "transparent",
                color: active === cat.key ? "#BF8A3D" : "rgba(245,240,232,0.6)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured product */}
        <div key={active} className="animate-fade-in-up">
          {/* Image */}
          <div className="w-full overflow-hidden mb-8 md:mb-10">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-[55vw] md:h-[480px] lg:h-[540px] object-cover"
              style={{ filter: "brightness(0.85) contrast(1.05)" }}
            />
          </div>

          {/* Text */}
          <div className="max-w-2xl">
            <p
              className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "#BF8A3D" }}
            >
              {product.categoryLabel}
            </p>
            <h3
              className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide mb-4"
              style={{ color: "#f5f0e8" }}
            >
              {product.name}
            </h3>
            <p
              className="font-body text-sm md:text-base leading-relaxed"
              style={{ color: "rgba(245,240,232,0.55)" }}
            >
              {product.description}
            </p>
          </div>

          {/* Product cards */}
          <div className="mt-14 md:mt-16">
            <p
              className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8"
              style={{ color: "#BF8A3D" }}
            >
              {th("prodCardAlso", lang)}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="group overflow-hidden transition-all duration-300"
                  style={{
                    background: "rgba(245,240,232,0.04)",
                    border: "1px solid rgba(201,168,76,0.15)",
                  }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.name}
                      className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: "brightness(0.9) contrast(1.05)" }}
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <h4
                      className="font-display text-lg md:text-xl font-semibold tracking-wide mb-2"
                      style={{ color: "#f5f0e8" }}
                    >
                      {card.name}
                    </h4>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: "rgba(245,240,232,0.5)" }}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
