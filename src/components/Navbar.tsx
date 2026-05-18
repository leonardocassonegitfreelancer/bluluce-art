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
  const navLinks = [
    { label: th("navHome", lang), href: prefix },
    { label: th("navMenu", lang), href: `${prefix}/menu` },
    { label: th("navGallery", lang), href: `${prefix}/gallery` },
    { label: th("navContacts", lang), href: `${prefix}#contact` },
  ];
  const langs: Lang[] = ["lt", "en", "it"];

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return currentPath === href || currentPath === `${href}/`;
  };

  const handleNavClick = useCallback((e: React.MouseEvent, href: string) => {
    if (href.includes("#")) {
      e.preventDefault();
      const [path, hash] = href.split("#");
      const effectivePath = path || prefix;
      const isOnPage = currentPath === effectivePath || currentPath === `${effectivePath}/`;
      if (isOnPage) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        sessionStorage.setItem("scrollToHash", hash);
        window.location.href = effectivePath;
      }
      setMobileOpen(false);
    } else if (currentPath === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileOpen(false);
    }
  }, [currentPath, prefix]);

  const handleLangSwitch = (l: Lang) => {
    const currentLangMatch = currentPath.match(/^\/(lt|en|it)(\/.*)?$/);
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
          : "bg-gradient-to-b from-[#0E0804]/70 to-transparent"
      }`}>
        <a href={prefix} className="font-display text-[0.9rem] font-bold text-white tracking-[0.18em]"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
          LALIMENTARI
        </a>
        <div className="flex items-center gap-4">
          <a href="tel:+37066408338" aria-label="Chiama"
            className="flex items-center gap-1.5 text-[#BF8A3D]"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
            <svg viewBox="0 0 20 20" width={16} height={16} fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <span className="font-bebas text-sm tracking-[0.06em]">+370 664 08338</span>
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="relative w-8 h-8 flex items-center justify-center" aria-label="Menu">
            <span className={`absolute w-5 h-[1.5px] bg-white transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "rotate-45" : "-translate-y-[7px]"}`} />
            <span className={`absolute w-3.5 h-[1.5px] bg-white/60 transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`absolute w-5 h-[1.5px] bg-white transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "-rotate-45" : "translate-y-[7px]"}`} />
          </button>
        </div>
      </nav>

      {/* Desktop nav — floating pill */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 px-8 pt-5">
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-4 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-xl ${
            scrolled || mobileOpen || currentPath.includes("/menu")
              ? "bg-[#0E0804]/88 backdrop-blur-2xl border border-white/[0.07]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <a href={prefix} className="font-display text-base font-bold text-white tracking-[0.15em]">
            LALIMENTARI
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
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
              href="tel:+37066408338"
              className="font-body text-[0.55rem] tracking-[0.25em] uppercase px-5 py-2 border border-[#BF8A3D]/40 text-[#BF8A3D] hover:bg-[#BF8A3D] hover:text-black transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              {th("heroBookTable", lang)}
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
              onClick={(e) => handleNavClick(e, item.href)}
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
            href="tel:+37066408338"
            className="w-full py-4 bg-[#BF8A3D]/10 border border-[#BF8A3D]/30 text-[#BF8A3D] font-bebas text-xl tracking-[0.15em] uppercase flex items-center justify-center gap-3 hover:bg-[#BF8A3D] hover:text-black transition-all duration-500"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57a1 1 0 01-.28 1.11l-2.29 2.31z" />
            </svg>
            {th("heroBookTable", lang)}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
