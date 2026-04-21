import { useEffect, useRef, useState } from "react";

type ProductTab = "manufacturing" | "supply";

const manufacturingProducts = [
  {
    title: "Power Control Centre (PCC)",
    desc: "Main distribution and demand management for utility and captive power.",
    useCase: "Incoming LT room and plant feeder architecture.",
  },
  {
    title: "Motor Control Centre (MCC)",
    desc: "Centralized motor starter and protection architecture for process lines.",
    useCase: "Dairy, textile, and heavy rotating equipment bays.",
  },
  {
    title: "Smart IMCC Panel",
    desc: "Intelligent motor diagnostics with event logging and network visibility.",
    useCase: "Predictive maintenance enabled motor clusters.",
  },
  {
    title: "APFC Panel",
    desc: "Automatic power factor correction with capacitor bank intelligence.",
    useCase: "Reactive power optimization for utility savings.",
  },
  {
    title: "Bus Duct System",
    desc: "High current busway distribution for safe and modular expansion.",
    useCase: "Large production blocks and utility corridors.",
  },
  {
    title: "Synchronizing Panel",
    desc: "Generator and utility synchronization with secure transfer logic.",
    useCase: "Critical uptime plants and backup integration.",
  },
  {
    title: "Distribution Panel",
    desc: "Low voltage distribution architecture with selective protection design.",
    useCase: "Process buildings, admin blocks, and auxiliaries.",
  },
  {
    title: "PLC Control Panel",
    desc: "Structured PLC panel builds for deterministic machine automation.",
    useCase: "Conveying, batching, and process sequencing.",
  },
  {
    title: "Relay and Control Panel",
    desc: "Protection relay integration for reliable switching and isolation.",
    useCase: "Substation and mission-critical feeder protection.",
  },
  {
    title: "Lighting Distribution Panel",
    desc: "Engineered lighting distribution with zoned fault protection.",
    useCase: "Industrial floors, utility blocks, and campuses.",
  },
  {
    title: "Operator Control Desk",
    desc: "Ergonomic console stations for plant command and monitoring.",
    useCase: "Control rooms and supervisory stations.",
  },
  {
    title: "SS Process Panel",
    desc: "Stainless steel enclosures for corrosive and hygienic environments.",
    useCase: "Food, pharma, and washdown process zones.",
  },
];

const supplyProducts = [
  {
    title: "Electrical Switchgear and UPS Systems",
    desc: "Reliable switching and critical backup power continuity.",
    focus: "Power reliability",
  },
  {
    title: "AC Drives and Variable Frequency Drives",
    desc: "Precision motor control with process efficiency improvements.",
    focus: "Energy optimization",
  },
  {
    title: "DG Sets and Power Backup",
    desc: "High availability backup architecture for uninterrupted operation.",
    focus: "Redundancy planning",
  },
  {
    title: "Pressure Transmitters",
    desc: "Industrial-grade transmitters for stable process measurements.",
    focus: "Process instrumentation",
  },
  {
    title: "Level Sensing Instruments",
    desc: "Accurate level detection for tanks, silos, and utilities.",
    focus: "Storage monitoring",
  },
  {
    title: "Temperature Sensors and Controllers",
    desc: "Thermal control components for quality and safety assurance.",
    focus: "Thermal management",
  },
  {
    title: "Magnetic Flow Meters",
    desc: "Electromagnetic flow measurement for conductive liquids.",
    focus: "Flow analytics",
  },
  {
    title: "Mass Flow and Density Meters",
    desc: "High precision flow-density measurement for critical processes.",
    focus: "Quality measurement",
  },
];

const deliveryMetrics = [
  { value: "12+", label: "Engineered Panel Families" },
  { value: "8+", label: "Supply Categories" },
  { value: "20+", label: "Years of Delivery" },
];

const capabilityHighlights = [
  "Factory acceptance testing before dispatch",
  "Documentation-ready panel engineering packages",
  "Component traceability and quality checkpoints",
  "Retrofit and expansion compatibility planning",
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ProductTab>("manufacturing");

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
              <span className="text-xs font-semibold text-[#1565C0] tracking-[0.14em] uppercase">Solutions Architecture</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-[#0A1628] leading-tight mb-5">
              Comprehensive Electrical Solutions
            </h2>

            <p className="text-[#4E5F74] text-lg leading-relaxed max-w-3xl">
              A structured portfolio of engineered control systems and supply components, crafted for
              uptime, safety, and scale across modern industrial operations.
            </p>
          </div>

          <aside className="reveal-right rounded-2xl border border-[#DCE5F2] bg-white/90 backdrop-blur-sm p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5C7192] mb-4">Portfolio Snapshot</div>
            <div className="space-y-3">
              {deliveryMetrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-[#E6ECF5] bg-[#F8FBFF] px-4 py-3">
                  <div className="text-2xl font-bold text-[#0A1628] font-mono-stats">{metric.value}</div>
                  <div className="text-xs text-[#5E7088] tracking-wide">{metric.label}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="reveal mb-10">
          <div className="inline-flex rounded-full border border-[#D7E2F0] bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("manufacturing")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === "manufacturing"
                  ? "bg-[#1565C0] text-white shadow-[0_8px_20px_rgba(21,101,192,0.28)]"
                  : "text-[#5A6A81] hover:text-[#0A1628]"
              }`}
              data-testid="tab-manufacturing"
            >
              Engineered Manufacturing
            </button>
            <button
              onClick={() => setActiveTab("supply")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === "supply"
                  ? "bg-[#1565C0] text-white shadow-[0_8px_20px_rgba(21,101,192,0.28)]"
                  : "text-[#5A6A81] hover:text-[#0A1628]"
              }`}
              data-testid="tab-supply"
            >
              Supply Chain Components
            </button>
          </div>
        </div>

        {activeTab === "manufacturing" && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {manufacturingProducts.map((product, i) => (
              <article
                key={product.title}
                className="reveal rounded-2xl border border-[#DCE5F2] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] card-hover"
                style={{ transitionDelay: `${i * 45}ms` }}
                data-testid={`product-card-${i}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-[#0A1628] px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-white font-mono-stats">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#CDE0F8] bg-[#EEF5FF] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#1565C0]">
                    ENGINEERED
                  </span>
                </div>

                <h3 className="text-[1.06rem] font-semibold text-[#0A1628] leading-snug mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-[#5A6B81] leading-relaxed">{product.desc}</p>

                <div className="mt-5 pt-4 border-t border-[#E8EEF6]">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A8CA6] mb-1.5">Use Case</div>
                  <div className="text-sm text-[#2B3A4F]">{product.useCase}</div>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === "supply" && (
          <div className="grid md:grid-cols-2 gap-4">
            {supplyProducts.map((item, i) => (
              <article
                key={item.title}
                className="reveal rounded-2xl border border-[#DCE5F2] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.08)] card-hover"
                style={{ transitionDelay: `${i * 55}ms` }}
                data-testid={`supply-item-${i}`}
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1565C0]/10 text-[#1565C0] font-semibold font-mono-stats text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#0A1628] leading-snug mb-1.5">{item.title}</h3>
                    <p className="text-sm text-[#5A6B81] leading-relaxed">{item.desc}</p>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1565C0]">{item.focus}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 reveal">
          <div className="rounded-2xl border border-[#CFE0F8] bg-[linear-gradient(108deg,#0A1628,#12325C)] px-6 py-6 text-white shadow-[0_18px_44px_rgba(10,22,40,0.28)]">
            <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-7 items-start">
              <div>
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#8EC9FF] mb-3">
                  Delivery Assurance
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                  Engineered for uptime. Delivered for scale.
                </h3>
                <p className="text-sm text-white/75 leading-relaxed max-w-2xl">
                  Every solution is designed with maintainability, safety, and performance benchmarks to ensure reliable plant operations from day one.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {capabilityHighlights.map((item) => (
                  <div key={item} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/86 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
