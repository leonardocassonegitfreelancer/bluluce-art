import { useState, useEffect, useCallback } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { th } from "@/i18n/homeTranslations";
import type { Lang } from "@/i18n/homeTranslations";
import { productsSlug } from "@/i18n/slugs";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
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

  const textBurgerColor = "#0E0804";
  const secondaryBurgerColor = "rgba(14,8,4,0.5)";

  const navLinks = [
    { label: th("navHome", lang), href: prefix },
    { label: th("navMenu", lang), href: `${prefix}/${productsSlug[lang]}` },
    { label: th("navAbout", lang), href: `${prefix}/about` },
    { label: th("navCommissions", lang), href: `${prefix}/commissioni` },
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
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-[14px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isHome && !pastHero ? "opacity-0 pointer-events-none -translate-y-4" : "opacity-100 translate-y-0"
        }`}
        style={{
          background: mobileOpen ? "transparent" : scrolled ? "rgba(250,248,245,0.97)" : "transparent",
          borderBottom: scrolled && !mobileOpen ? "1px solid rgba(176,141,78,0.12)" : "1px solid transparent",
          backdropFilter: scrolled && !mobileOpen ? "blur(12px)" : "none",
        }}
      >
        <a href={prefix} className="flex flex-col leading-none transition-colors duration-300" style={{ textDecoration: "none" }}>
          <span className="font-display text-[1.35rem] font-semibold tracking-[0.18em]" style={{ color: textBurgerColor }}>BLULUCE</span>
          <span className="font-body text-[0.65rem] tracking-[0.22em] uppercase mt-[2px]" style={{ color: "#8a6a2e" }}>Vittoria De Raimondi</span>
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


      {/* Desktop Header with Logo and Menu Trigger */}
      <header className={`hidden md:flex fixed top-0 left-0 right-0 z-50 justify-between items-center px-12 py-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        isHome && !pastHero ? "opacity-0 pointer-events-none -translate-y-4" : "opacity-100 translate-y-0"
      }`}>
        <a href={prefix} className="flex flex-col leading-none" style={{ textDecoration: "none" }}>
          <span className="font-display text-[1rem] font-semibold text-[#1c1917] tracking-[0.24em]">BLULUCE</span>
          <span className="font-body text-[0.5rem] tracking-[0.22em] uppercase mt-[3px]" style={{ color: "#8a6a2e" }}>Vittoria De Raimondi</span>
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="group flex items-center gap-3 bg-transparent border-none cursor-pointer focus:outline-none"
        >
          <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-[#57534e] group-hover:text-[#1c1917] transition-colors duration-300">
            {mobileOpen ? "CLOSE" : "MENU"}
          </span>
          <div className="relative w-6 h-4 flex flex-col justify-between">
            <span className={`w-6 h-[1.5px] bg-[#57534e] group-hover:bg-[#1c1917] transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`w-4 h-[1.5px] bg-[#a8a29e] group-hover:bg-[#1c1917] transition-all duration-400 self-end ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[1.5px] bg-[#57534e] group-hover:bg-[#1c1917] transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </div>
        </button>
      </header>

      {/* Backdrop overlay (Desktop) */}
      <div
        className={`hidden md:block fixed inset-0 z-[48] bg-[#0E0804]/50 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Side Menu Drawer (Desktop) */}
      <div
        className={`hidden md:flex fixed top-0 right-0 bottom-0 w-[420px] max-w-full z-[49] bg-[#fafaf8] border-l border-[#8a6a2e]/15 flex-col justify-between px-16 py-20 shadow-[-10px_0_40px_rgba(0,0,0,0.04)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Header inside Drawer */}
        <div className="flex justify-between items-center mb-12">
          <span className="font-display text-[0.85rem] tracking-[0.25em] text-[#8a6a2e] uppercase">{th("navExplore", lang)}</span>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-6 my-auto">
          {navLinks.map((item, i) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`font-display text-[2.4rem] font-normal italic leading-none transition-all duration-500 hover:translate-x-3 text-decoration-none ${
                  active ? "text-[#8a6a2e]" : "text-[#1c1917] hover:text-[#8a6a2e]"
                }`}
                style={{ textDecoration: "none", transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Bottom Drawer Content */}
        <div className="border-t border-[#8a6a2e]/15 pt-10 flex flex-col gap-8">
          {/* Languages */}
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#a8a29e] mr-2" />
            <div className="flex gap-2.5">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangSwitch(l)}
                  className={`font-body text-[0.68rem] tracking-[0.15em] uppercase border-none bg-transparent cursor-pointer transition-colors ${
                    lang === l ? "text-[#8a6a2e] font-semibold" : "text-[#78716c] hover:text-[#1c1917]"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href={`${prefix}/#interesse`}
            onClick={handleNavClick}
            className="w-full py-4 border border-[#8a6a2e]/40 text-[#8a6a2e] hover:bg-[#8a6a2e] hover:text-[#fafaf8] hover:border-[#8a6a2e] font-body text-[0.62rem] tracking-[0.3em] uppercase flex items-center justify-center transition-all duration-500"
            style={{ textDecoration: "none" }}
          >
            {th("navContacts", lang)}
          </a>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[49] bg-[#fafaf8] flex flex-col justify-center px-10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
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
              } ${isActive(item.href) ? "text-[#8a6a2e]" : "text-[#1c1917]"}`}
              style={{ transitionDelay: mobileOpen ? `${80 + i * 70}ms` : "0ms" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div
          className={`border-t border-[#8a6a2e]/15 pt-10 flex flex-col gap-8 transition-all duration-500 ${
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: mobileOpen ? "380ms" : "0ms" }}
        >
          <div className="flex items-center gap-4">
            <Globe className="w-4 h-4 text-[#8a6a2e]/60" />
            <div className="flex gap-4">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangSwitch(l)}
                  className={`font-bebas text-lg tracking-[0.15em] uppercase transition-colors ${
                    lang === l ? "text-[#8a6a2e] font-semibold" : "text-[#78716c] hover:text-[#1c1917]"
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
            className="w-full py-4 border text-[#8a6a2e] font-body text-[0.6rem] tracking-[0.3em] uppercase flex items-center justify-center transition-all duration-500"
            style={{ background: "rgba(176,141,78,0.06)", borderColor: "rgba(176,141,78,0.25)" }}
          >
            {th("navMenu", lang)}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
