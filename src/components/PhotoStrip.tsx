import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import amatriciana from "@/assets/amatriciana-pasta.webp?url";
import burrata from "@/assets/burrata-prosciutto.webp?url";
import carbonara from "@/assets/carbonara-pasta.webp?url";
import gnocchi from "@/assets/gnocchi-sorrentina.webp?url";
import lasagna from "@/assets/lasagna.webp?url";
import paccheri from "@/assets/paccheri-pescatore.webp?url";
import polpette from "@/assets/polpette-sugo.webp?url";
import ravioliPorcini from "@/assets/ravioli-porcini.webp?url";
import tiramisu from "@/assets/tiramisu.webp?url";
import focacciaParma from "@/assets/focaccia-parma.webp?url";

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  { src: amatriciana, label: "Amatriciana" },
  { src: carbonara, label: "Carbonara" },
  { src: burrata, label: "Burrata & Prosciutto" },
  { src: lasagna, label: "Lasagna" },
  { src: ravioliPorcini, label: "Ravioli ai Porcini" },
  { src: gnocchi, label: "Gnocchi alla Sorrentina" },
  { src: tiramisu, label: "Tiramisù" },
  { src: polpette, label: "Polpette al Sugo" },
  { src: paccheri, label: "Paccheri del Pescatore" },
  { src: focacciaParma, label: "Focaccia di Parma" },
];

const PhotoStrip = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 88%", once: true },
      }
    );
  }, []);

  const scrollToCard = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement;
    const targetScroll = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left: targetScroll, behavior: "smooth" });
    setActive(i);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(cardCenter - center);
      if (d < minDist) { minDist = d; closest = i; }
    });
    setActive(closest);
  };

  return (
    <section style={{ background: "#F2E4CB" }} className="pb-16 md:pb-20 overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-8 pt-16 pb-10 flex items-center gap-6">
        <span className="font-body text-[0.55rem] tracking-[0.5em] uppercase text-[#BF8A3D]/50">
          Galleria
        </span>
        <div className="flex-1 h-px bg-[#BF8A3D]/12" />
        <span className="font-body text-[0.55rem] tracking-[0.5em] uppercase text-[#BF8A3D]/50">
          Dal menù
        </span>
      </div>

      {/* Scroll track */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingInline: "max(2rem, calc(50vw - 280px))",
          scrollPaddingInline: "max(2rem, calc(50vw - 280px))",
        }}
      >
        {dishes.map((dish, i) => (
          <div
            key={i}
            className="snap-center shrink-0 relative overflow-hidden cursor-pointer"
            style={{ width: "min(560px, 85vw)", height: "clamp(280px, 38vw, 400px)" }}
            onClick={() => scrollToCard(i)}
          >
            <img
              src={dish.src}
              alt={dish.label}
              className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                filter: `brightness(${active === i ? 0.92 : 0.65})`,
                transform: `scale(${active === i ? 1 : 1.06})`,
              }}
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/70 via-transparent to-transparent transition-opacity duration-700"
              style={{ opacity: active === i ? 1 : 0 }}
            />
            <div
              className="absolute bottom-6 left-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                opacity: active === i ? 1 : 0,
                transform: `translateY(${active === i ? 0 : 8}px)`,
              }}
            >
              <p className="font-body text-[0.5rem] tracking-[0.45em] uppercase text-[#BF8A3D]/80 mb-1.5">
                Dal menù
              </p>
              <p className="font-display text-2xl md:text-3xl text-white italic">
                {dish.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {dishes.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Foto ${i + 1}`}
            className="transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-full"
            style={{
              width: i === active ? 28 : 4,
              height: 4,
              background: i === active ? "#BF8A3D" : "rgba(42,24,16,0.2)",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default PhotoStrip;
