import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import type { Lang } from "@/i18n/homeTranslations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const heading: Record<Lang, [string, string]> = {
  it: ["Vieni,", "ti aspettiamo."],
  en: ["Come in,", "we're waiting."],
  lt: ["Ateik,", "laukiame."],
};

const blocks: Record<Lang, { phone: string; address: string; hours: string }> = {
  it: { phone: "Telefono", address: "Indirizzo", hours: "Orari" },
  en: { phone: "Phone", address: "Address", hours: "Hours" },
  lt: { phone: "Telefonas", address: "Adresas", hours: "Valandos" },
};

const hours: { day: Record<Lang, string>; time: string }[] = [
  { day: { it: "Lun – Gio", en: "Mon – Thu", lt: "Pir – Ket" }, time: "10:00 – 21:00" },
  { day: { it: "Venerdì", en: "Friday", lt: "Penktadienis" }, time: "10:00 – 22:00" },
  { day: { it: "Sabato", en: "Saturday", lt: "Šeštadienis" }, time: "10:00 – 22:00" },
  { day: { it: "Domenica", en: "Sunday", lt: "Sekmadienis" }, time: "11:00 – 21:00" },
];

export default function HoursSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [h1, h2] = heading[lang as Lang];
  const b = blocks[lang as Lang];

  useGSAP(() => {
    gsap.fromTo(leftRef.current,
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } }
    );
    gsap.fromTo(rightRef.current,
      { scale: 1.04, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ background: "#F5EDE0", position: "relative", overflow: "hidden" }}
    >
      <div className="grid md:grid-cols-2" style={{ minHeight: "680px" }}>

        {/* Left — info */}
        <div
          ref={leftRef}
          className="flex flex-col justify-center px-8 py-16 md:px-14 lg:px-16 md:py-20"
        >
          {/* Eyebrow */}
          <span
            className="font-bebas tracking-[0.22em] block mb-4"
            style={{ fontSize: "0.68rem", color: "#8B3A1A" }}
          >
            Bistro Italiano · Gedimino pr. · Vilnius
          </span>

          {/* Heading */}
          <h2
            className="font-display font-normal italic mb-12 leading-[0.88]"
            style={{
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              letterSpacing: "-0.025em",
              color: "#1A0A06",
            }}
          >
            {h1}<br />
            <span style={{ color: "#8B3A1A" }}>{h2}</span>
          </h2>

          {/* Info blocks */}
          <div className="space-y-8" style={{ maxWidth: "38ch" }}>

            {/* Phone */}
            <div>
              <p
                className="font-bebas tracking-[0.22em] mb-1"
                style={{ fontSize: "0.65rem", color: "#8B3A1A" }}
              >
                {b.phone}
              </p>
              <a
                href="tel:+37066408338"
                className="font-bebas tracking-[0.04em] transition-colors duration-300"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", color: "#1A0A06" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#8B3A1A"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#1A0A06"; }}
              >
                +370 664 08338
              </a>
            </div>

            {/* Address */}
            <div>
              <p
                className="font-bebas tracking-[0.22em] mb-1"
                style={{ fontSize: "0.65rem", color: "#8B3A1A" }}
              >
                {b.address}
              </p>
              <a
                href="https://maps.app.goo.gl/e6wLibn3uXbb4WG37"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body transition-colors duration-300"
                style={{ fontSize: "0.95rem", color: "#3D2010", lineHeight: 1.5, display: "inline-block", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationColor: "rgba(139,58,26,0.35)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#8B3A1A"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#3D2010"; }}
              >
                Gedimino pr. 37<br />Vilnius, Lithuania
              </a>
            </div>

            {/* Hours */}
            <div>
              <p
                className="font-bebas tracking-[0.22em] mb-2"
                style={{ fontSize: "0.65rem", color: "#8B3A1A" }}
              >
                {b.hours}
              </p>
              <div className="space-y-1.5">
                {hours.map((h, i) => (
                  <div key={i} className="flex gap-3">
                    <span
                      className="font-body shrink-0"
                      style={{ fontSize: "0.85rem", color: "#5A3020", minWidth: "6rem" }}
                    >
                      {h.day[lang as Lang]}
                    </span>
                    <span
                      className="font-body"
                      style={{ fontSize: "0.85rem", color: "#3D2010" }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <a
              href="tel:+37066408338"
              className="inline-flex items-center px-8 py-4 font-body text-[0.6rem] tracking-[0.3em] uppercase font-bold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
              style={{ background: "#1A0A06" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#8B3A1A"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#1A0A06"; }}
            >
              {th("heroBookTable", lang as Lang)}
            </a>
          </div>
        </div>

        {/* Right — Google Maps */}
        <div ref={rightRef} className="relative overflow-hidden" style={{ minHeight: "420px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2306.2!2d25.2798!3d54.6872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd9413c2e7b0a1%3A0x0!2sGedimino+pr.+37%2C+Vilnius!5e0!3m2!1sen!2slt!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, position: "absolute", inset: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="L'Alimentari location"
          />
        </div>

      </div>
    </section>
  );
}
