import { useEffect, useMemo, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Clients", href: "#clients" },
  { label: "Exports", href: "#exports" },
  { label: "Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

const compactLinks = navLinks.slice(0, 4);



export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const desktopNavLinks = useMemo(() => navLinks, []);

  useEffect(() => {
    let frameId = 0;

    const updateState = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrolled(scrollY > 80);

      const currentSection = navLinks
        .map((link) => {
          const id = link.href.slice(1);
          const section = document.getElementById(id);
          if (!section) return null;

          return { id, offsetTop: section.getBoundingClientRect().top };
        })
        .filter((item): item is { id: string; offsetTop: number } => item !== null)
        .filter((item) => item.offsetTop <= 160)
        .sort((a, b) => b.offsetTop - a.offsetTop)[0]?.id ?? "hero";

      setActiveSection(currentSection);
      frameId = 0;
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateState);
    };

    updateState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navShellClasses = scrolled
    ? "mt-[10px] h-[52px] w-[calc(100%-32px)] max-w-[880px] rounded-full border border-sky-200/70 bg-white/74 shadow-[0_18px_50px_rgba(15,23,42,0.16)] backdrop-blur-[20px] saturate-150"
    : "h-16 w-full max-w-none rounded-none border-x-0 border-t-0 border-b border-slate-200/70 bg-white/85 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-md saturate-100";

  const navTextTone = scrolled ? "text-slate-700" : "text-slate-700";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-0 sm:px-4 lg:px-0 pointer-events-none" data-testid="navbar">
        <nav
          aria-label="Primary"
          className={`pointer-events-auto mx-auto overflow-hidden border transition-[width,max-width,height,margin-top,padding,background-color,border-color,border-radius,box-shadow,backdrop-filter,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${navShellClasses}`}
        >
          <div className={`grid h-full w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center ${scrolled ? "px-4 sm:px-5 lg:px-6" : "px-4 sm:px-6 lg:px-8"}`}>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              className="group inline-flex min-w-0 items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              data-testid="logo"
              aria-label="Go to top of page"
            >
              <img
                src="/logos/Volto_logo.jpg"
                alt="Volto Control LLP"
                className={`w-auto object-contain transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] mix-blend-multiply ${scrolled ? "h-10" : "h-12"}`}
              />
            </a>

            <div className="hidden lg:flex items-center justify-center">
              <div className={`flex items-center ${scrolled ? "gap-3" : "gap-7 xl:gap-8"}`}>
                {desktopNavLinks.map((link) => {
                  const active = activeSection === link.href.slice(1);

                  return (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.href)}
                      aria-current={active ? "page" : undefined}
                      className={`group relative rounded-full px-0 py-2 font-medium outline-none transition-[color,transform] duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${scrolled ? "text-[13px]" : "text-[14px]"} ${active ? "text-slate-950" : `${navTextTone} hover:text-slate-950`}`}
                      data-testid={`nav-${link.label.toLowerCase()}`}
                    >
                      <span className="relative inline-flex flex-col items-center">
                        <span>{link.label}</span>
                        <span className={`mt-1 h-[2px] rounded-full bg-sky-500 transition-all duration-[300ms] ${active ? "w-3 opacity-100" : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-70"}`} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <button
                onClick={() => handleNavClick("#contact")}
                className={`hidden sm:inline-flex items-center justify-center rounded-full border border-transparent bg-transparent font-medium text-slate-700 transition-[color,background-color,border-color,transform] duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${scrolled ? "px-3 py-2 text-[12px]" : "px-4 py-2 text-[13px]"}`}
                data-testid="nav-enquire"
              >
                Enquire
              </button>
              <button
                onClick={() => handleNavClick("#contact")}
                className={`inline-flex items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_8px_20px_rgba(15,23,42,0.18)] transition-[padding,transform,box-shadow,background-color] duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-slate-800 hover:shadow-[0_12px_28px_rgba(15,23,42,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${scrolled ? "px-4 py-2 text-[12px]" : "px-5 py-2.5 text-[13px]"}`}
                data-testid="nav-cta"
              >
                <span>Get a Quote</span>
                <span className={`ml-2 inline-block transition-transform duration-[300ms] group-hover:translate-x-0.5 ${scrolled ? "text-[11px]" : "text-[12px]"}`}>→</span>
              </button>
              <button
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition-[background-color,border-color,transform] duration-[300ms] hover:border-sky-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                onClick={() => setMobileOpen((current) => !current)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
                data-testid="mobile-menu-toggle"
              >
                <span className="flex flex-col gap-1.5">
                  <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "w-5 translate-y-2 rotate-45" : "w-5"}`} />
                  <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "w-0 opacity-0" : "w-4"}`} />
                  <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "w-5 -translate-y-2 -rotate-45" : "w-3.5"}`} />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 motion-reduce:transition-none ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute top-0 right-0 bottom-0 w-[min(20rem,88vw)] border-l border-slate-200 bg-white/96 p-6 pt-24 shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          data-testid="mobile-menu"
        >
          <div className="flex flex-col gap-2">
            <div className="mb-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">Navigate</div>
              <div className="mt-2 h-px w-full bg-slate-200" />
            </div>
            {navLinks.map((link, i) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                style={{ animationDelay: `${i * 50}ms` }}
                aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
                data-testid={`mobile-nav-${link.label.toLowerCase()}`}
              >
                <span className="flex items-center justify-between">
                  <span>{link.label}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${activeSection === link.href.slice(1) ? "bg-sky-500" : "bg-transparent"}`} />
                </span>
              </button>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {compactLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-sky-200 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleNavClick("#contact")}
                className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                data-testid="mobile-cta"
              >
                Get a Quote →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
