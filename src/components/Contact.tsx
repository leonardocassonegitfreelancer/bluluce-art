import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";

const Contact = () => {
  const { lang } = useLanguage();

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-8" style={{ background: "#F5EDE0" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span className="font-bebas text-xl tracking-[0.12em] text-[#BF8A3D]/70 block mb-4">
            {th("contactLabel", lang)}
          </span>
          <h2
            className="font-display text-[2.5rem] md:text-[3.8rem] font-normal italic text-[#2A1810] leading-[0.92]"
            style={{ letterSpacing: "-0.015em" }}
          >
            {th("contactTitle", lang)}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left: info */}
          <div className="space-y-10">
            <div>
              <p className="font-body text-[0.55rem] tracking-[0.4em] uppercase text-[#BF8A3D]/55 mb-3">
                {th("contactAddress", lang)}
              </p>
              <p className="font-display text-lg text-[#2A1810]">Gedimino pr. 37, Vilnius</p>
            </div>
            <div>
              <p className="font-body text-[0.55rem] tracking-[0.4em] uppercase text-[#BF8A3D]/55 mb-3">
                {th("contactPhone", lang)}
              </p>
              <a
                href="tel:+37066408338"
                className="font-display text-lg text-[#2A1810] hover:text-[#BF8A3D] transition-colors duration-300"
              >
                +370 664 08338
              </a>
            </div>
            <div>
              <p className="font-body text-[0.55rem] tracking-[0.4em] uppercase text-[#BF8A3D]/55 mb-3">
                {th("contactHours", lang)}
              </p>
              <div className="font-body text-sm text-[#5A3820]/75 space-y-1.5 leading-relaxed">
                <p>{th("hoursMF", lang)}</p>
                <p>{th("hoursFri", lang)}</p>
                <p>{th("hoursSat", lang)}</p>
                <p>{th("hoursSun", lang)}</p>
              </div>
            </div>
            <a
              href="tel:+37066408338"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#BF8A3D] text-white font-body text-[0.6rem] tracking-[0.3em] uppercase font-bold hover:bg-[#D4703E] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              {th("heroBookTable", lang)}
            </a>
          </div>

          {/* Right: map */}
          <div className="p-1.5 bg-[#BF8A3D]/[0.06] ring-1 ring-[#BF8A3D]/20">
            <div className="overflow-hidden" style={{ height: "380px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2306.2!2d25.2798!3d54.6872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd9413c2e7b0a1%3A0x0!2sGedimino+pr.+37%2C+Vilnius!5e0!3m2!1sen!2slt!4v1700000000000"
                width="100%"
                height="380"
                style={{ border: 0, filter: "grayscale(100%) contrast(1.05) brightness(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LALIMENTARI location"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
