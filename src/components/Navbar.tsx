import { useState, useEffect, useCallback } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import type { Lang } from "@/i18n/homeTranslations";
import { productsSlug } from "@/i18n/slugs";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const prefix = `/${lang}`;
  const isHome = currentPath === prefix || currentPath === `${prefix}/` || currentPath === "/" || currentPath === "";
  const isDarkPage = !isHome;

  const textBurgerColor = (scrolled || mobileOpen || isDarkPage) ? "#ffffff" : "#0E0804";
  const secondaryBurgerColor = (scrolled || mobileOpen || isDarkPage) ? "rgba(255,255,255,0.6)" : "rgba(14,8,4,0.5)";

  const navLinks = [
    { label: th("navHome", lang), href: prefix },
    { label: th("navMenu", lang), href: `${prefix}/${productsSlug[lang]}` },
    { label: th("navGallery", lang), href: `${prefix}/gallery` },
  ];
  const langs: Lang[] = ["es", "en", "it"];

  const isActive = (href: string) => {
    return currentPath === href || currentPath === `${href}/`;
  };

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  const handleLangSwitch = (l: Lang) => {
    const currentLangMatch = currentPath.match(/^\/(es|en|it)(\/.*)?$/);
    let subPath = currentLangMatch ? (currentLangMatch[2] || "") : "";
    const fromSlug = productsSlug[lang];
    const toSlug = productsSlug[l];
    if (subPath.startsWith(`/${fromSlug}`)) {
      subPath = subPath.replace(`/${fromSlug}`, `/${toSlug}`);
    }
    setLang(l);
    window.location.href = `/${l}${subPath}`;
  };

  return (
    <>
      {/* Mobile nav — full-width bar */}
      <nav className={`md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-[14px] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        scrolled || mobileOpen
          ? "bg-[#0E0804] border-b border-white/10"
          : "bg-transparent"
      }`}>
        <a href={prefix}
          className="font-display text-[1.05rem] font-bold tracking-[0.18em] transition-colors duration-300"
          style={{ color: textBurgerColor }}>
          BLULUCE
        </a>
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="relative w-8 h-8 flex items-center justify-center" aria-label="Menu">
            <span className={`absolute w-5 h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "rotate-45" : "-translate-y-[7px]"}`}
              style={{ background: textBurgerColor }} />
            <span className={`absolute w-3.5 h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "opacity-0" : ""}`}
              style={{ background: secondaryBurgerColor }} />
            <span className={`absolute w-5 h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "-rotate-45" : "translate-y-[7px]"}`}
              style={{ background: textBurgerColor }} />
          </button>
        </div>
      </nav>

      {/* Desktop nav — floating pill */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 px-8 pt-5">
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between ease-[cubic-bezier(0.32,0.72,0,1)] rounded-xl transition-all duration-700 ${
            scrolled || mobileOpen
              ? "bg-[#0E0804]/90 backdrop-blur-2xl border border-white/[0.08] px-6 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
              : "bg-[#0E0804]/70 backdrop-blur-xl border border-white/[0.05] px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          }`}
        >
          {/* Logo */}
          <a href={prefix} className="font-display text-base font-bold text-white tracking-[0.15em]">
            BLULUCE
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`font-body text-[0.6rem] tracking-[0.22em] uppercase transition-colors duration-300 ${
                  isActive(item.href) ? "text-[#BF8A3D]" : "text-white/55 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right: lang + CTA */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-0.5">
              <Globe className="w-3 h-3 text-white/25 mr-1.5" />
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangSwitch(l)}
                  className={`font-body text-[0.55rem] tracking-[0.18em] uppercase px-1.5 py-0.5 transition-colors duration-300 ${
                    lang === l ? "text-[#BF8A3D]" : "text-white/35 hover:text-white/70"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href={`${prefix}/${productsSlug[lang]}`}
              className="font-body text-[0.55rem] tracking-[0.25em] uppercase px-5 py-2 border border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#040D18] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              {th("navMenu", lang)}
            </a>
          </div>

        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-[49] bg-[#0E0804] flex flex-col justify-center px-10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="space-y-3 mb-16">
          {navLinks.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={`block font-display text-3xl font-normal py-1.5 transition-all duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } ${isActive(item.href) ? "text-[#BF8A3D]" : "text-white"}`}
              style={{ transitionDelay: mobileOpen ? `${80 + i * 70}ms` : "0ms" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div
          className={`border-t border-white/5 pt-10 flex flex-col gap-8 transition-all duration-500 ${
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: mobileOpen ? "380ms" : "0ms" }}
        >
          <div className="flex items-center gap-4">
            <Globe className="w-4 h-4 text-[#BF8A3D]/40" />
            <div className="flex gap-4">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangSwitch(l)}
                  className={`font-bebas text-lg tracking-[0.15em] uppercase transition-colors ${
                    lang === l ? "text-[#BF8A3D]" : "text-white/30 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <a
            href={`${prefix}/${productsSlug[lang]}`}
            onClick={handleNavClick}
            className="w-full py-4 border text-[#C9A96E] font-body text-[0.6rem] tracking-[0.3em] uppercase flex items-center justify-center transition-all duration-500"
            style={{ background: "rgba(201,169,110,0.08)", borderColor: "rgba(201,169,110,0.25)" }}
          >
            {th("navMenu", lang)}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
