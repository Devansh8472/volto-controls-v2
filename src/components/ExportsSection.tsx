import { useEffect, useMemo, useRef } from "react";
import { Globe, MapPin } from "lucide-react";

type OperationalHub = {
  name: string;
  role: string;
  lat: number;
  lon: number;
  primary?: boolean;
};

type HubPoint = OperationalHub & {
  x: number;
  y: number;
};

const operationalHubs: OperationalHub[] = [
  { name: "India", role: "Primary Hub", lat: 20.5937, lon: 78.9629, primary: true },
  { name: "Nepal", role: "Deployment Center", lat: 28.3949, lon: 84.124, primary: false },
  { name: "Bangladesh", role: "Deployment Center", lat: 23.685, lon: 90.3563, primary: false },
  { name: "UAE (Dubai)", role: "Deployment Center", lat: 25.2048, lon: 55.2708, primary: false },
  { name: "Nigeria", role: "Deployment Center", lat: 9.082, lon: 8.6753, primary: false },
  { name: "Tanzania", role: "Deployment Center", lat: -6.369, lon: 34.8888, primary: false },
];

const industries = [
  { image: "/images/industries/dairy.jpg", name: "Dairy", desc: "Amul, Pearl Dairy & leading dairies across India" },
  { image: "/images/industries/fec-hotels.jpg", name: "FEC / Hotels", desc: "Multiplexes, hospitality & entertainment complexes" },
  { image: "/images/industries/packaging-paper.jpg", name: "Packaging & Paper", desc: "Automated packaging lines and paper mills" },
  { image: "/images/industries/rubber-tyre.jpg", name: "Rubber & Tyre", desc: "Precision process control for rubber manufacturing" },
  { image: "/images/industries/pharmaceuticals.jpg", name: "Pharmaceuticals", desc: "GMP-compliant automation for pharma plants" },
  { image: "/images/industries/power-plants.jpg", name: "Power Plants", desc: "Utilities, captive power, and sub-station control" },
  { image: "/images/industries/textile.jpg", name: "Textile", desc: "Spinning, weaving, and processing automation" },
  { image: "/images/industries/sugar.jpg", name: "Sugar", desc: "Bajaj Hindusthan and leading sugar refineries" },
];

// Use geographic coordinates to avoid manual plotting errors in map markers.
const toMapPoint = (lat: number, lon: number) => {
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  const adjustedY = y * 0.82 + 9;
  return {
    x: Math.max(2, Math.min(98, x)),
    y: Math.max(8, Math.min(92, adjustedY)),
  };
};

const buildConnectionPath = (origin: HubPoint, target: HubPoint, index: number) => {
  const controlX = (origin.x + target.x) / 2 + (target.x < origin.x ? -2.8 : 2.8);
  const arcHeight = Math.max(8, Math.abs(target.x - origin.x) * 0.22) + index * 0.28;
  const controlY = Math.min(origin.y, target.y) - arcHeight;

  return `M ${origin.x.toFixed(2)} ${origin.y.toFixed(2)} Q ${controlX.toFixed(2)} ${controlY.toFixed(2)} ${target.x.toFixed(2)} ${target.y.toFixed(2)}`;
};

export default function ExportsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 70);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const plottedHubs = useMemo<HubPoint[]>(() => {
    return operationalHubs.map((hub) => ({
      ...hub,
      ...toMapPoint(hub.lat, hub.lon),
    }));
  }, []);

  const primaryHub = plottedHubs[0];
  const connectionPaths = useMemo(() => {
    return plottedHubs.slice(1).map((hub, index) => ({
      hub,
      path: buildConnectionPath(primaryHub, hub, index),
    }));
  }, [plottedHubs, primaryHub]);

  return (
    <section id="exports" className="py-24 bg-[#F6F5EF]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 reveal">
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#D6DEE9] bg-[#ECF2FB] px-3 py-2 mb-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-[#D3DEEE] text-[#2D6FE1]">
              <Globe className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold text-[#2D6FE1] tracking-[0.15em] uppercase">Global Footprint</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[#1962D3] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
            Multi-Regional Delivery Network
          </h2>
          <p className="text-[#5A677A] max-w-3xl text-lg leading-relaxed">
            Engineering support and active deployment infrastructure across South Asia, Middle
            East, and Africa - enabling rapid response and localized expertise.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)] gap-7 mb-20">
          <div className="reveal-left rounded-2xl border border-[#E0E5EE] bg-[#F7F9FC] p-6">
            <div className="rounded-2xl border border-[#E1E6EF] bg-[#EEF3F9] p-5">
              <div className="relative overflow-hidden rounded-xl border border-[#DAE2ED] aspect-[16/9] bg-[#E8EEF5]">
                <img
                  src="/images/world-map.svg"
                  alt="World map with deployment links from India to Nepal, Bangladesh, UAE, Nigeria, and Tanzania"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.22] contrast-125 saturate-0"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_48%,rgba(11,191,241,0.18),rgba(231,238,246,0.28)_42%,rgba(231,238,246,0.56)_100%)]" />

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {connectionPaths.map(({ hub, path }) => (
                    <path
                      key={hub.name}
                      d={path}
                      fill="none"
                      stroke="rgba(8,177,231,0.86)"
                      strokeWidth="0.42"
                      strokeLinecap="round"
                    />
                  ))}

                  {plottedHubs.map((hub, index) => (
                    <g key={hub.name} transform={`translate(${hub.x}, ${hub.y})`}>
                      {index === 0 ? (
                        <>
                          <circle r="1.95" fill="rgba(8,177,231,0.25)" className="animate-pulse" />
                          <circle r="0.7" fill="#08B1E7" />
                        </>
                      ) : (
                        <>
                          <circle r="1.25" fill="rgba(8,177,231,0.17)" />
                          <circle r="0.45" fill="#08B1E7" />
                        </>
                      )}
                    </g>
                  ))}
                </svg>

                <div className="absolute left-3 bottom-3 rounded-lg border border-[#D4E1F2] bg-white/80 px-2.5 py-1.5 text-[10px] font-semibold text-[#3474DE] tracking-wider uppercase">
                  Global Presence - Volto Control LLP
                </div>
              </div>
            </div>
          </div>

          <aside className="reveal-right rounded-2xl border border-[#E0E5EE] bg-[#FBFCFE] p-5 sm:p-6">
            <h3 className="text-[30px] leading-none font-semibold text-[#111C2D]" style={{ fontFamily: "Syne, sans-serif" }}>
              Operational Hubs
            </h3>
            <p className="mt-2 text-sm text-[#66768B]">6 active deployment and support centers</p>

            <div className="mt-6 space-y-3">
              {operationalHubs.map((hub, index) => {
                const isPrimary = index === 0;
                return (
                  <div
                    key={hub.name}
                    className={`rounded-xl border px-4 py-3 transition-colors duration-200 ${
                      isPrimary
                        ? "border-[#9FC1F7] bg-[#ECF3FF]"
                        : "border-[#E4E8EF] bg-white"
                    }`}
                    data-testid={`hub-${hub.name.toLowerCase().replace(/[()\s]+/g, '-')}`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className={`h-4 w-4 mt-0.5 ${isPrimary ? "text-[#2D6FE1]" : "text-[#111C2D]"}`} aria-hidden="true" />
                      <div>
                        <div className="text-[24px] leading-none font-semibold text-[#111C2D]" style={{ fontFamily: "Syne, sans-serif" }}>
                          {hub.name}
                        </div>
                        <div className="mt-1 text-sm text-[#66768B]">{hub.role}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        {/* Industries grid */}
        <div className="reveal rounded-[28px] border border-[#d8e0ea] bg-[radial-gradient(circle_at_top,#f5f8fc_0%,#edf3f8_42%,#e4ebf4_100%)] p-5 sm:p-7 lg:p-8 shadow-[0_18px_50px_rgba(10,22,40,0.08)]">
          <div className="text-center mb-7 sm:mb-9">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-[0.28em] uppercase text-[#0A1628]">
              Industry Expertise
            </h3>
            <div className="mt-4 h-px w-full max-w-5xl mx-auto bg-[#1565C0]/45" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {industries.map((ind, i) => (
              <div
                key={ind.name}
                className="reveal group"
                style={{ transitionDelay: `${i * 60}ms` }}
                data-testid={`industry-${ind.name.toLowerCase().replace(/[\s/&]+/g, '-')}`}
              >
                <div className="overflow-hidden border border-[#c7d4e4] bg-white shadow-[0_10px_24px_rgba(10,22,40,0.08)]">
                  <div className="aspect-[4/3] overflow-hidden bg-[#dfe9f4]">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="h-full w-full object-cover grayscale contrast-110 saturate-0 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="pt-3 text-center">
                  <h4 className="font-semibold uppercase tracking-[0.08em] text-[#0A1628] text-sm sm:text-[15px]">
                    {ind.name}
                  </h4>
                  <p className="mt-1 text-[11px] sm:text-xs text-[#5b6777] leading-relaxed max-w-[250px] mx-auto">
                    {ind.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
