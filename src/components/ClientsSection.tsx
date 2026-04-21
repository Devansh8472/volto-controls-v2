import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";

const clients = [
  { name: "Amul", category: "Dairy", logoSrc: "/logos/amul.svg" },
  { name: "Coca-Cola", category: "Beverages", logoSrc: "/logos/coca-cola.svg" },
  { name: "Cadbury", category: "FMCG", logoSrc: "/logos/cadbury.svg" },
  { name: "Britannia", category: "Food", logoSrc: "/logos/britannia.svg" },
  { name: "Unilever", category: "FMCG", logoSrc: "/logos/unilever.png" },
  { name: "Parle Agro", category: "Beverages", logoSrc: "/logos/parle-agro.png" },
  { name: "Bajaj Hindusthan", category: "Sugar", logoSrc: "/logos/bajaj-hindusthan.png" },
  { name: "Tang", category: "Beverages", logoSrc: "/logos/tang.png" },
  { name: "Kissan", category: "Food", logoSrc: "/logos/kissan.png" },
  { name: "Horlicks", category: "Health", logoSrc: "/logos/horlicks.png" },
  { name: "Patanjali", category: "FMCG", logoSrc: "/logos/patanjali.png" },
  { name: "Pearl Dairy", category: "Dairy", logoSrc: "/logos/pearl-dairy.png" },
];

const techPartners = [
  { name: "Siemens", color: "#009999", logoSrc: "/logos/partners/siemens.svg" },
  { name: "ABB", color: "#FF0000", logoSrc: "/logos/partners/abb.svg" },
  { name: "Schneider Electric", color: "#3DCD58", logoSrc: "/logos/partners/schneider-electric.svg" },
  { name: "Mitsubishi", color: "#D0021B", logoSrc: "/logos/partners/mitsubishi.svg" },
  { name: "Danfoss", color: "#E2000F", logoSrc: "/logos/partners/danfoss.svg" },
  { name: "Yaskawa", color: "#003B73", logoSrc: "/logos/partners/yaskawa.png" },
  { name: "Fuji Electric", color: "#E62234", logoSrc: "/logos/partners/fuji-electric.svg" },
  { name: "Endress+Hauser", color: "#00A650", logoSrc: "/logos/partners/endress-hauser.png" },
  { name: "Yokogawa", color: "#005BAC", logoSrc: "/logos/partners/yokogawa.png" },
];

const testimonials = [
  { quote: "Volto Control delivered a complete MCC panel setup for our dairy plant — on time, within budget, and with impeccable quality.", author: "Plant Head", company: "Amul Processing Unit" },
  { quote: "Their control integration expertise has transformed how we monitor our bottling line. Real-time visibility we never had before.", author: "Engineering Manager", company: "Leading Beverage Brand" },
  { quote: "ISO certified, responsive support, and panels that simply work. Volto Control is our go-to automation partner.", author: "VP Operations", company: "Pharmaceutical Manufacturer" },
];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueePointerState = useRef({ isDown: false, startX: 0, startScrollLeft: 0, pointerId: -1 });
  const [brokenLogos, setBrokenLogos] = useState<Record<string, boolean>>({});
  const [brokenPartnerLogos, setBrokenPartnerLogos] = useState<Record<string, boolean>>({});
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const marqueePartners = useMemo(() => [...techPartners, ...techPartners], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 60);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    let frameId = 0;
    let lastTime = 0;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;
      lastTime = time;

      if (!isMarqueePaused && !marqueePointerState.current.isDown) {
        const halfWidth = container.scrollWidth / 2;
        container.scrollLeft += elapsed * 0.04;

        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [isMarqueePaused]);

  const markLogoAsBroken = (clientName: string) => {
    setBrokenLogos((prev) => (prev[clientName] ? prev : { ...prev, [clientName]: true }));
  };

  const markPartnerLogoAsBroken = (partnerName: string) => {
    setBrokenPartnerLogos((prev) => (prev[partnerName] ? prev : { ...prev, [partnerName]: true }));
  };

  const focusPartnerCard = (currentIndex: number, direction: -1 | 1) => {
    const cards = marqueeRef.current?.querySelectorAll<HTMLButtonElement>('[data-partner-card="true"]');
    if (!cards || cards.length === 0) return;

    const visibleCount = techPartners.length;
    const nextIndex = (currentIndex + direction + visibleCount) % visibleCount;
    const nextCard = cards[nextIndex];

    if (nextCard) {
      nextCard.focus();
      nextCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const handleMarqueePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const container = marqueeRef.current;
    if (!container) return;

    marqueePointerState.current = {
      isDown: true,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
      pointerId: event.pointerId,
    };

    container.setPointerCapture(event.pointerId);
    setIsMarqueePaused(true);
  };

  const handleMarqueePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const container = marqueeRef.current;
    const pointerState = marqueePointerState.current;
    if (!container || !pointerState.isDown) return;

    const deltaX = event.clientX - pointerState.startX;
    container.scrollLeft = pointerState.startScrollLeft - deltaX;
  };

  const handleMarqueePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const container = marqueeRef.current;
    const pointerState = marqueePointerState.current;
    if (container && pointerState.pointerId !== -1) {
      try {
        container.releasePointerCapture(pointerState.pointerId);
      } catch {
        // ignore pointer capture release failures
      }
    }

    marqueePointerState.current = { isDown: false, startX: 0, startScrollLeft: 0, pointerId: -1 };
    setIsMarqueePaused(false);
  };

  return (
    <section id="clients" className="section-gray py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1565C0]" />
            <span className="text-xs font-semibold text-[#1565C0] tracking-widest uppercase">Clients & Partners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-[#555] max-w-xl mx-auto text-base">
            From Fortune 500 global brands to leading Indian conglomerates — 
            our panels power the best.
          </p>
        </div>

        {/* Client logos grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {clients.map((client, i) => (
            <div
              key={client.name}
              className="reveal bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-col items-center justify-center gap-1 card-hover shadow-sm group cursor-default"
              style={{ transitionDelay: `${i * 40}ms` }}
              data-testid={`client-${client.name.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className="w-24 h-12 rounded-lg border border-[#E2E8F0] bg-white px-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                {brokenLogos[client.name] ? (
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #1565C0, #00BCD4)" }}
                  >
                    {client.name[0]}
                  </span>
                ) : (
                  <img
                    src={client.logoSrc}
                    alt={`${client.name} logo`}
                    className="max-h-9 w-full object-contain"
                    loading="lazy"
                    onError={() => markLogoAsBroken(client.name)}
                  />
                )}
              </div>
              <div className="text-xs font-semibold text-[#0A1628] text-center">{client.name}</div>
              <div className="text-[10px] text-[#999]">{client.category}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-5 mb-16 reveal">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm relative"
              style={{ transitionDelay: `${i * 100}ms` }}
              data-testid={`testimonial-${i}`}
            >
              <div className="text-3xl text-[#1565C0]/20 font-serif mb-3">"</div>
              <p className="text-sm text-[#555] leading-relaxed italic mb-4">{t.quote}</p>
              <div className="pt-4 border-t border-[#F0F0F0]">
                <div className="text-xs font-bold text-[#0A1628]">{t.author}</div>
                <div className="text-xs text-[#888]">{t.company}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8 reveal">
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-xs text-[#999] uppercase tracking-widest font-semibold">Technology Partners</span>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </div>

        {/* Tech partner marquee */}
        <div
          ref={marqueeRef}
          className="tech-partner-marquee reveal"
          role="region"
          aria-label="Technology partner navigation"
          tabIndex={0}
          onMouseEnter={() => setIsMarqueePaused(true)}
          onMouseLeave={() => setIsMarqueePaused(false)}
          onFocus={() => setIsMarqueePaused(true)}
          onBlur={() => setIsMarqueePaused(false)}
          onKeyDown={(event) => {
            const activeElement = document.activeElement as HTMLElement | null;
            const activeCard = activeElement?.closest("[data-partner-index]") as HTMLElement | null;
            const currentIndex = activeCard ? Number(activeCard.dataset.partnerIndex ?? 0) : 0;

            if (event.key === "ArrowRight") {
              event.preventDefault();
              focusPartnerCard(currentIndex, 1);
            }

            if (event.key === "ArrowLeft") {
              event.preventDefault();
              focusPartnerCard(currentIndex, -1);
            }
          }}
          onPointerDown={handleMarqueePointerDown}
          onPointerMove={handleMarqueePointerMove}
          onPointerUp={handleMarqueePointerUp}
          onPointerCancel={handleMarqueePointerUp}
        >
          <div className="flex w-max items-stretch gap-4 px-3 py-2 select-none">
            {marqueePartners.map((partner, i) => {
              const isDuplicate = i >= techPartners.length;
              return (
                <button
                  key={`${partner.name}-${i}`}
                  type="button"
                  data-partner-card="true"
                  data-partner-index={i % techPartners.length}
                  aria-hidden={isDuplicate}
                  tabIndex={isDuplicate ? -1 : 0}
                  className="reveal tech-partner-chip group"
                  style={{ transitionDelay: `${(i % techPartners.length) * 50}ms` }}
                  onClick={() => {
                    const visibleCards = marqueeRef.current?.querySelectorAll<HTMLButtonElement>('[data-partner-card="true"]');
                    const focusedIndex = i % techPartners.length;
                    const target = visibleCards?.[focusedIndex];
                    target?.focus();
                  }}
                  data-testid={`partner-${partner.name.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <span className="tech-partner-chip__icon">
                    {brokenPartnerLogos[partner.name] ? (
                      <span
                        className="tech-partner-chip__fallback"
                        style={{ background: `linear-gradient(135deg, #1565C0, ${partner.color})` }}
                      >
                        {partner.name.slice(0, 1)}
                      </span>
                    ) : (
                      <img
                        src={partner.logoSrc}
                        alt=""
                        aria-hidden="true"
                        className="h-6 w-6 object-contain"
                        loading="lazy"
                        onError={() => markPartnerLogoAsBroken(partner.name)}
                      />
                    )}
                  </span>
                  <span className="tech-partner-chip__label">{partner.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
