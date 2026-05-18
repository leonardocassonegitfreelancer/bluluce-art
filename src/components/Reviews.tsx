import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Lang } from "@/i18n/homeTranslations";
import reviewVai from "@/assets/review-vai.webp?url";
import reviewDaniela from "@/assets/review-daniela.webp?url";
import reviewFood1 from "@/assets/review-food-1.webp?url";
import reviewFood2 from "@/assets/review-food-2.webp?url";
import reviewDanielaFood1 from "@/assets/review-daniela-food-1.webp?url";
import reviewDanielaFood2 from "@/assets/review-daniela-food-2.webp?url";
import carbonara from "@/assets/carbonara-pasta.webp?url";
import tiramisu from "@/assets/tiramisu.webp?url";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reviews = [
  {
    text: {
      en: "The highlight of the night were the pasta dishes — especially the one with truffles and the pistachio tiramisu. Sensational. The staff was lovely and very attentive.",
      it: "Il punto forte della serata erano i piatti di pasta — in particolare quello al tartufo e il tiramisù al pistacchio. Sensazionale. Il personale era adorabile e molto premuroso.",
      lt: "Vakaro kulminacija buvo makaronų patiekalai — ypač tas su triufeliais ir pistacijų tiramisù. Sensacinga. Personalas buvo nuostabus ir labai dėmesingas.",
    },
    author: "Vai M.", badge: "Local Guide", photo: reviewVai,
  },
  {
    text: {
      en: "A charming Italian restaurant-shop that instantly transports you to Italy! The atmosphere is cozy and authentic. Staff make you feel like part of the family.",
      it: "Un affascinante ristorante-bottega italiana che ti porta istantaneamente in Italia! L'atmosfera è accogliente e autentica. Il personale ti fa sentire parte della famiglia.",
      lt: "Žavus itališko stiliaus restoranas-parduotuvė, kuri akimirksniu nuneša į Italiją! Atmosfera jauki ir autentiška. Personalas verčia jaustis kaip šeimos dalimi.",
    },
    author: "Justina M.", badge: "Local Guide", photo: reviewFood1,
  },
  {
    text: {
      en: "Food was SO DELICIOUS. We arrived late, but the staff were so kind and made us dinner even when they could have closed. Thank you from Latvia!",
      it: "Il cibo era COSÌ DELIZIOSO. Siamo arrivati tardi, ma il personale è stato così gentile da prepararci la cena anche quando avrebbero potuto chiudere. Grazie dalla Lettonia!",
      lt: "Maistas buvo TOKS SKANUS. Atėjome vėlai, bet personalas buvo toks malonus ir pagamino mums vakarienę net tada, kai galėjo jau uždaryti. Ačiū iš Latvijos!",
    },
    author: "Freds F.", badge: "Local Guide", photo: reviewFood2,
  },
  {
    text: {
      en: "Very cozy and charming place, amazing food 10/10, and a wonderful Italian guy who made us feel truly welcome. Big plus for being pet-friendly.",
      it: "Posto molto accogliente e affascinante, cibo straordinario 10/10, e un meraviglioso ragazzo italiano che ci ha fatto sentire davvero i benvenuti. Grande vantaggio essere pet-friendly.",
      lt: "Labai jauki ir žavinga vieta, nuostabus maistas 10/10, ir nuostabus italas, kuris privertė mus jaustis tikrai laukiamais. Didelis privalumas — draugiška gyvūnams aplinka.",
    },
    author: "Alex", badge: null, photo: reviewDanielaFood1,
  },
  {
    text: {
      en: "I'm so happy about this new opening: exactly the kind of place the city was missing. Great prices, superb service, kindness and smiles everywhere!",
      it: "Sono felicissima di questa nuova apertura: esattamente il tipo di posto che mancava alla città. Prezzi ottimi, servizio super, gentilezza e sorrisi ovunque!",
      lt: "Esu labai laiminga dėl šio naujo atidarymo: būtent tokios vietos miestui trūko. Puikios kainos, puikus aptarnavimas, malonumas ir šypsenos visur!",
    },
    author: "Daniela S.", badge: "Local Guide", photo: reviewDaniela,
  },
  {
    text: {
      en: "Authentic Italian taste in the heart of Vilnius! We loved the truffle pasta, shrimp ravioli, and the incredible cheese & charcuterie board.",
      it: "Gusto italiano autentico nel cuore di Vilnius! Abbiamo adorato la pasta al tartufo, i ravioli ai gamberetti e l'incredibile tagliere di formaggi e salumi.",
      lt: "Autentiškas itališkas skonis Vilniaus širdyje! Mums patiko triufelių makaronai, krevetių ravioliai ir nepaprastai skani sūrių ir dešrelių lenta.",
    },
    author: "FamilyTastesLT", badge: "Local Guide", photo: reviewDanielaFood2,
  },
  {
    text: {
      en: "Amazing atmosphere! Carbonara and home wine is to die for! Vilnius needed this place!",
      it: "Atmosfera incredibile! La carbonara e il vino della casa sono da morire! Vilnius aveva bisogno di questo posto!",
      lt: "Nuostabi atmosfera! Karbonara ir naminis vynas tiesiog dieviški! Vilniui reikėjo šios vietos!",
    },
    author: "Lukas S.", badge: "Local Guide", photo: carbonara,
  },
  {
    text: {
      en: "Truly an amazing gem in the heart of Vilnius — authentic food, top-notch quality. A must visit for real Italian cuisine.",
      it: "Un vero gioiello nel cuore di Vilnius — cibo autentico, qualità eccellente. Una tappa imperdibile per la vera cucina italiana.",
      lt: "Tikras brangakmenis Vilniaus širdyje — autentiškas maistas, aukščiausios kokybės. Privaloma aplankyti tiems, kurie mėgsta tikrą itališką virtuvę.",
    },
    author: "Leonardo C.", badge: "Local Guide", photo: reviewFood1,
  },
  {
    text: {
      en: "The atmosphere, service, and wines are great. The focaccia is nice with fresh ingredients and very reasonable prices.",
      it: "L'atmosfera, il servizio e i vini sono ottimi. La focaccia è deliziosa con ingredienti freschi e prezzi molto ragionevoli.",
      lt: "Atmosfera, aptarnavimas ir vynai puikūs. Fokača skani su šviežiais ingredientais ir labai pagrįstomis kainomis.",
    },
    author: "A.J.", badge: "Local Guide", photo: tiramisu,
  },
];

const Stars = () => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 12 12" width={13} height={13} style={{ fill: "#8B3A1A" }}>
        <path d="M6 0l1.5 4H12L8.5 7l1.5 4L6 8.5 2 11l1.5-4L0 4h4.5z" />
      </svg>
    ))}
  </div>
);

const STACK_POSITIONS = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 4 },
  { x: 28, y: -18, rotate: 6, scale: 0.93, opacity: 0.7, zIndex: 3 },
  { x: 50, y: -34, rotate: 12, scale: 0.86, opacity: 0.45, zIndex: 2 },
];

export default function Reviews() {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const n = reviews.length;

  useGSAP(() => {
    gsap.fromTo(headerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } }
    );
    gsap.fromTo(".reviews-body",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } }
    );
  }, { scope: sectionRef });

  const applyStack = (activeIdx: number) => {
    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      const offset = (i - activeIdx + n) % n;
      const pos = STACK_POSITIONS[offset] ?? { x: 60, y: -48, rotate: 18, scale: 0.78, opacity: 0, zIndex: 1 };
      gsap.set(el, { x: pos.x, y: pos.y, rotate: pos.rotate, scale: pos.scale, opacity: pos.opacity, zIndex: pos.zIndex });
    });
  };

  useEffect(() => { applyStack(0); }, []);

  const navigate = (dir: number) => {
    if (animating) return;
    setAnimating(true);
    const next = (active + dir + n) % n;

    gsap.to(textRef.current, { y: dir > 0 ? -24 : 24, opacity: 0, duration: 0.28, ease: "power2.in" });

    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      const offset = (i - next + n) % n;
      const pos = STACK_POSITIONS[offset] ?? { x: 60, y: -48, rotate: 18, scale: 0.78, opacity: 0, zIndex: 1 };
      gsap.to(el, { x: pos.x, y: pos.y, rotate: pos.rotate, scale: pos.scale, opacity: pos.opacity, zIndex: pos.zIndex, duration: 0.55, ease: "power3.inOut" });
    });

    gsap.delayedCall(0.3, () => {
      setActive(next);
      gsap.fromTo(textRef.current,
        { y: dir > 0 ? 24 : -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", onComplete: () => setAnimating(false) }
      );
    });
  };

  const r = reviews[active];

  // MOBILE — horizontal scroll with snap
  if (!isDesktop) {
    return (
      <section ref={sectionRef} style={{ background: "#F5EDE0" }} className="py-16 overflow-hidden">

        {/* Header */}
        <div ref={headerRef} className="px-6 mb-8">
          <span className="font-bebas text-lg tracking-[0.12em] text-[#8B3A1A]/70 block mb-3">
            {th("reviewsLabel", lang)}
          </span>
          <div className="flex items-center justify-between">
            <h2
              className="font-display font-normal italic text-[#2A1810] leading-[0.9]"
              style={{ fontSize: "clamp(2.2rem, 9vw, 3rem)", letterSpacing: "-0.015em" }}
            >
              {th("reviewsTitle", lang)}
            </h2>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 shrink-0"
              style={{ border: "1px solid rgba(139,58,26,0.22)" }}
            >
              <svg viewBox="0 0 12 12" width={10} height={10} style={{ fill: "#8B3A1A" }}>
                <path d="M6 0l1.5 4H12L8.5 7l1.5 4L6 8.5 2 11l1.5-4L0 4h4.5z" />
              </svg>
              <span className="font-bebas text-xs tracking-[0.12em] text-[#8B3A1A]">4.8</span>
            </div>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div
          className="reviews-body"
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            gap: "12px",
            paddingLeft: "24px",
            paddingRight: "24px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {reviews.map((rev, i) => (
            <div
              key={i}
              style={{
                scrollSnapAlign: "start",
                flexShrink: 0,
                width: "78vw",
                background: "rgba(139,58,26,0.04)",
                border: "1px solid rgba(139,58,26,0.12)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {/* Photo */}
              <div style={{ height: "140px", overflow: "hidden" }}>
                <img
                  src={reviews[i].photo}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88) contrast(1.06) saturate(1.08)" }}
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </div>

              <Stars />

              <p
                className="font-display italic text-[#2A1810] leading-[1.2]"
                style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
              >
                "{rev.text[lang as Lang]}"
              </p>

              <div className="flex items-center gap-2.5 mt-auto">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(196,96,59,0.12)" }}
                >
                  <span className="font-bebas text-xs text-[#8B3A1A]">
                    {rev.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-[#2A1810]">{rev.author}</p>
                  {rev.badge && <p className="font-body text-xs text-[#8B3A1A]/60">{rev.badge}</p>}
                </div>
              </div>
            </div>
          ))}

          {/* Trailing spacer so last card snaps cleanly */}
          <div style={{ flexShrink: 0, width: "8px" }} />
        </div>

        {/* Scroll hint dots */}
        <div className="flex justify-center gap-1.5 mt-6 px-6">
          {reviews.map((_, i) => (
            <div
              key={i}
              style={{
                width: 5, height: 5, borderRadius: 99,
                background: "rgba(139,58,26,0.25)",
              }}
            />
          ))}
        </div>
      </section>
    );
  }

  // DESKTOP — card stack (unchanged)
  return (
    <section ref={sectionRef} style={{ background: "#F5EDE0" }} className="py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div ref={headerRef} className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <span className="font-bebas text-xl tracking-[0.12em] text-[#8B3A1A]/70 block mb-4">
              {th("reviewsLabel", lang)}
            </span>
            <h2
              className="font-display font-normal italic text-[#2A1810] leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.2rem)", letterSpacing: "-0.015em" }}
            >
              {th("reviewsTitle", lang)}
            </h2>
          </div>
          <div
            className="hidden md:flex items-center gap-2 px-4 py-2 shrink-0"
            style={{ border: "1px solid rgba(196,96,59,0.22)" }}
          >
            <svg viewBox="0 0 12 12" width={12} height={12} style={{ fill: "#8B3A1A" }}>
              <path d="M6 0l1.5 4H12L8.5 7l1.5 4L6 8.5 2 11l1.5-4L0 4h4.5z" />
            </svg>
            <span className="font-bebas text-sm tracking-[0.15em] text-[#8B3A1A]">
              4.8 · 165 recensioni Google
            </span>
          </div>
        </div>

        <div className="reviews-body flex flex-col md:flex-row items-center gap-8 md:gap-20">

          <div className="relative shrink-0 md:ml-12" style={{ width: "min(340px, 88vw)", height: "min(420px, 88vw)" }}>
            {reviews.map((_, i) => (
              <div
                key={i}
                ref={el => { imgRefs.current[i] = el; }}
                className="absolute inset-0 overflow-hidden"
                style={{ transformOrigin: "bottom left", boxShadow: "0 20px 60px rgba(42,24,16,0.18)" }}
              >
                <img
                  src={reviews[i].photo}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.88) contrast(1.06) saturate(1.08)" }}
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,8,4,0.55) 0%, transparent 55%)" }} />
              </div>
            ))}
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <div ref={textRef}>
              <Stars />
              <blockquote
                className="font-display italic text-[#2A1810] leading-[1.2] my-8"
                style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)", letterSpacing: "-0.012em", maxWidth: "36ch" }}
              >
                "{r.text[lang as Lang]}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(196,96,59,0.12)" }}
                >
                  <span className="font-bebas text-xs text-[#8B3A1A]">
                    {r.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-[#2A1810]">{r.author}</p>
                  {r.badge && <p className="font-body text-xs text-[#8B3A1A]/60">{r.badge}</p>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={() => navigate(-1)}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{ border: "1px solid rgba(196,96,59,0.30)", color: "#8B3A1A" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,96,59,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                aria-label="Precedente"
              >
                <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{ border: "1px solid rgba(196,96,59,0.30)", color: "#8B3A1A" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,96,59,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                aria-label="Successiva"
              >
                <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex items-center gap-1.5 ml-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(i - active)}
                    style={{
                      width: i === active ? 20 : 5, height: 5, borderRadius: 99,
                      background: i === active ? "#8B3A1A" : "rgba(196,96,59,0.22)",
                      border: "none", padding: 0, cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.32,0.72,0,1)",
                    }}
                    aria-label={`Recensione ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
