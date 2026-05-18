import React from "react";
import { Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";

const Footer = React.forwardRef<HTMLElement>((_, ref) => {
  const { lang } = useLanguage();

  return (
    <footer ref={ref} style={{ background: "#0E0804" }} className="py-20 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Top rule */}
        <div className="h-px bg-white/[0.08] mb-16" />

        <div className="grid md:grid-cols-3 gap-0 md:gap-12 mb-16">

          {/* Brand */}
          <div className="text-center md:text-left pb-10 md:pb-0">
            <p className="font-display text-2xl font-bold tracking-[0.12em] text-[#F0E6D0] mb-1">LALIMENTARI</p>
            <p className="font-body text-[0.55rem] tracking-[0.4em] uppercase text-[#BF8A3D]/60 mb-6">
              {th("footerTagline", lang)}
            </p>
            <p className="font-body text-sm text-[#D4C4B0]/55 leading-relaxed mx-auto md:mx-0 max-w-xs">
              {th("footerDesc", lang)}
            </p>
          </div>

          {/* Divider mobile */}
          <div className="md:hidden h-px bg-gradient-to-r from-transparent via-[#BF8A3D]/20 to-transparent mb-10" />

          {/* Hours */}
          <div className="text-center md:text-left pb-10 md:pb-0">
            <p className="font-body text-[0.55rem] tracking-[0.4em] uppercase text-[#BF8A3D]/60 mb-5">
              {th("footerHours", lang)}
            </p>
            <div className="font-body text-sm text-[#D4C4B0]/55 space-y-1.5 leading-relaxed">
              <p>{th("hoursMF", lang)}</p>
              <p>{th("hoursFri", lang)}</p>
              <p>{th("hoursSat", lang)}</p>
              <p>{th("hoursSun", lang)}</p>
            </div>
          </div>

          {/* Divider mobile */}
          <div className="md:hidden h-px bg-gradient-to-r from-transparent via-[#BF8A3D]/20 to-transparent mb-10" />

          {/* Contact */}
          <div className="text-center md:text-left">
            <p className="font-body text-[0.55rem] tracking-[0.4em] uppercase text-[#BF8A3D]/60 mb-5">
              {th("footerContact", lang)}
            </p>
            <div className="font-body text-sm text-[#D4C4B0]/55 space-y-1.5 leading-relaxed">
              <p>Gedimino pr. 37, Vilnius</p>
              <p>info@lalimentari.lt</p>
              <p>+370 664 08338</p>
              <div className="flex gap-5 mt-7 justify-center md:justify-start">
                <a
                  href="https://www.instagram.com/lalimentari.vilnius/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/5 rounded-full text-[#D4C4B0]/35 hover:text-[#BF8A3D] hover:border-[#BF8A3D]/30 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={18} strokeWidth={1.5} />
                </a>
                <a
                  href="https://www.facebook.com/LalimentariVilnius/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/5 rounded-full text-[#D4C4B0]/35 hover:text-[#BF8A3D] hover:border-[#BF8A3D]/30 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={18} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="h-px bg-white/[0.05] mb-8" />
        <p className="font-body text-[0.55rem] tracking-[0.3em] uppercase text-[#D4C4B0]/25 text-center">
          © 2026 LALIMENTARI. {th("footerRights", lang)}
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
