import { useEffect, useRef } from "react";

const productRange = [
  "Main LT switch board",
  "Power Control Centres (PCC)",
  "Motor Control Centres (MCC)",
  "Intelligent Motor Control Centres",
  "Distribution boards (all types in LT)",
  "Change Over Panel Boards",
  "A.M.F. Panels (for Generators)",
  "Feeder Pillars",
  "Automatic Power Factor Control Panels",
  "Main lighting distribution boards",
  "Emergency lighting distribution boards",
  "Lighting Panels (all types)",
  "HVAC Panels",
  "Fire Fighting System Panels",
  "Crane Control Panels",
  "Welding Socket Distribution Board",
  "GSM based Pump Control Panels",
  "AC Drive panels",
  "DC Drive Panels",
  "PLC based panels",
  "Soft Starter panels",
  "Control & Relay Panels",
  "L.T. Distribution Boxes (16KVA/25KVA)",
  "AC distribution boards",
  "DC distribution boards",
  "Remote Tap Changing Control Panel",
  "Junction Boxes",
  "LT Bus Ducts (all types)",
  "Bay Marshalling Kiosks",
  "Communication Boxes",
  "Power supply Units",
  "Machine Automation Panels",
  "GPRS Based Control Panels",
];

const powerDistributionPortfolio = [
  "Compact Substations",
  "Transformers",
  "UPS (Uninterruptible Power Supply)",
  "Control Panels",
  "Synchronising Panel",
];

const normalizeProductName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

export default function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const baseProductSet = new Set(productRange.map(normalizeProductName));
  const distributionItems = powerDistributionPortfolio.filter((item, index, list) => {
    const normalized = normalizeProductName(item);
    return list.findIndex((entry) => normalizeProductName(entry) === normalized) === index && !baseProductSet.has(normalized);
  });

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

  return (
    <section id="products" className="section-gray py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#1565C0]/10 blur-3xl" />
        <div className="absolute -bottom-16 right-12 h-52 w-52 rounded-full bg-[#00BCD4]/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid xl:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] gap-6 mb-12 items-start">
          <div className="reveal-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#CFE0F8] bg-white/90 px-4 py-1.5 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1565C0]" />
              <span className="text-xs font-semibold text-[#1565C0] tracking-[0.14em] uppercase">OUR PRODUCTS</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-[#0A1628] leading-tight mb-5">
              OUR PRODUCTS
            </h2>

            <p className="text-[#4E5F74] text-lg leading-relaxed max-w-3xl">
              Variety of custom-built LT Panel Boards are being manufactured for use in large/medium/small industry, power plants, utilities, infrastructure projects, commercial buildings, hospitals, hotels, etc.
            </p>
          </div>

          <aside className="reveal-right rounded-2xl border border-[#DCE5F2] bg-white/90 backdrop-blur-sm p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5C7192] mb-4">Product Range</div>
            <div className="space-y-3">
              <div className="rounded-xl border border-[#E6ECF5] bg-[#F8FBFF] px-4 py-3">
                <div className="text-2xl font-bold text-[#0A1628] font-mono-stats">33</div>
                <div className="text-xs text-[#5E7088] tracking-wide">Custom panel categories listed</div>
              </div>
              <div className="rounded-xl border border-[#E6ECF5] bg-[#F8FBFF] px-4 py-3">
                <div className="text-2xl font-bold text-[#0A1628] font-mono-stats">LT</div>
                <div className="text-xs text-[#5E7088] tracking-wide">Low-tension panel focus</div>
              </div>
              <div className="rounded-xl border border-[#E6ECF5] bg-[#F8FBFF] px-4 py-3">
                <div className="text-2xl font-bold text-[#0A1628] font-mono-stats">Custom</div>
                <div className="text-xs text-[#5E7088] tracking-wide">Built to project requirement</div>
              </div>
            </div>
          </aside>
        </div>

        <div className="reveal mb-10 grid lg:grid-cols-2 gap-5">
          <article className="rounded-2xl border border-[#DCE5F2] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <div className="inline-flex items-center rounded-full border border-[#CDE0F8] bg-[#EEF5FF] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#1565C0] mb-3">
              DG POWER RANGE
            </div>
            <h3 className="text-xl font-bold text-[#0A1628] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
              VOLTO CONTROL LLP Diesel Generator Solutions
            </h3>
            <p className="text-sm text-[#4E5F74] leading-relaxed">
              VOLTO CONTROL LLP range provides diesel-powered generator sets from 7.5 kVA to 2250 kVA,
              suitable for standby or emergency power, continuous duty, and prime power applications.
              Backed by an experienced engineering team and Cummins factory-trained technicians, this
              portfolio supports high-availability operations across India and the Middle East.
            </p>
          </article>

          <article className="rounded-2xl border border-[#DCE5F2] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <div className="inline-flex items-center rounded-full border border-[#CDE0F8] bg-[#EEF5FF] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#1565C0] mb-3">
              LIFECYCLE SUPPORT
            </div>
            <h3 className="text-xl font-bold text-[#0A1628] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
              From Load Survey to Maintenance
            </h3>
            <p className="text-sm text-[#4E5F74] leading-relaxed">
              We boast an experienced workforce with integrated professional and technical skills to
              service client needs end-to-end, taking customers from initial load survey through
              installation, commissioning, servicing, and long-term maintenance.
            </p>
          </article>
        </div>

        <div className="reveal mb-12 rounded-2xl border border-[#DCE5F2] bg-white/95 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-6 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#CDE0F8] bg-[#EEF5FF] px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#1565C0] uppercase mb-3">
                Power Generation
              </div>
              <h3 className="text-2xl font-bold text-[#0A1628] mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                Diesel Generator Portfolio
              </h3>
              <p className="text-sm text-[#4E5F74] leading-relaxed mb-4">
                Our DG offering covers engineered power backup for industrial and infrastructure facilities,
                with scalable configurations aligned to site load and operational continuity goals.
              </p>
              <ul className="space-y-2.5 text-sm text-[#2B3A4F] leading-relaxed list-disc pl-5">
                <li>Diesel Generator Model with Rating</li>
                <li>Containerised DG Sets</li>
                <li>Dual Fuel Generating Sets (Diesel & Gas) </li>
                <li>Power Box</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <article className="overflow-hidden rounded-xl border border-[#DCE5F2] bg-[#F8FBFF]">
                <img
                  src="/images/industries/power-plants.jpg"
                  alt="Power generation installation overview"
                  className="h-36 w-full object-cover"
                  loading="lazy"
                />
                <div className="px-3.5 py-2.5 text-xs font-semibold tracking-wide text-[#3A4F69]">Power Generation Installation</div>
              </article>
              <article className="overflow-hidden rounded-xl border border-[#DCE5F2] bg-[#F8FBFF]">
                <img
                  src="/images/industries/textile.jpg"
                  alt="Industrial facility electrical deployment"
                  className="h-36 w-full object-cover"
                  loading="lazy"
                />
                <div className="px-3.5 py-2.5 text-xs font-semibold tracking-wide text-[#3A4F69]">Industrial Deployment Environment</div>
              </article>
            </div>
          </div>
        </div>

        <div className="reveal mb-12 rounded-2xl border border-[#DCE5F2] bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CDE0F8] bg-[#EEF5FF] px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#1565C0] uppercase mb-3">
            Power Distribution
          </div>
          <h3 className="text-2xl font-bold text-[#0A1628] mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
            Power Distribution Portfolio
          </h3>
          <p className="text-sm text-[#4E5F74] leading-relaxed mb-4">
            Distribution-focused systems engineered for reliable power flow, switchgear coordination,
            and uninterrupted supply performance across critical facilities.
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-[#2B3A4F] leading-relaxed">
            {distributionItems.map((item) => (
              <li key={item} className="rounded-lg border border-[#E1EAF6] bg-[#F8FBFF] px-4 py-3 font-medium">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {productRange.map((product, i) => (
            <article
              key={product}
              className="reveal rounded-2xl border border-[#DCE5F2] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] card-hover"
              style={{ transitionDelay: `${i * 45}ms` }}
              data-testid={`product-card-${i}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center rounded-full bg-[#0A1628] px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-white font-mono-stats">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center rounded-full border border-[#CDE0F8] bg-[#EEF5FF] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#1565C0]">
                  LT PANEL
                </span>
              </div>

              <h3 className="text-[1.06rem] font-semibold text-[#0A1628] leading-snug">{product}</h3>

              <div className="mt-5 pt-4 border-t border-[#E8EEF6]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A8CA6] mb-1.5">Custom Built</div>
                <div className="text-sm text-[#2B3A4F]">Manufactured for industrial, commercial, utility, and infrastructure applications.</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
