import { useEffect, useRef } from "react";

const capabilities = [
  {
    icon: "📡",
    title: "Remote SCADA & Telemetry",
    desc: "Pipeline SCADA systems with remote monitoring, real-time telemetry, and advanced data visualization for distributed infrastructure.",
    tags: ["SCADA", "Telemetry", "Real-time"],
  },
  {
    icon: "🔬",
    title: "PLC/SCADA Process Automation",
    desc: "Full-lifecycle automation from consultation through commissioning — programming, integration, and long-term maintenance support.",
    tags: ["PLC", "SCADA", "Commissioning"],
  },
  {
    icon: "🔗",
    title: "Industrial Protocol Integration",
    desc: "Seamless integration across Profinet, Profibus, Fieldbus, Modbus, and ASI Interface for complex multi-vendor environments.",
    tags: ["Profinet", "Modbus", "Fieldbus"],
  },
];

const lifecycle = [
  {
    step: "01",
    phase: "Discover",
    title: "Consultation",
    desc: "Site assessment, load profile analysis, and requirement capture.",
    deliverable: "Requirement baseline and execution scope",
  },
  {
    step: "02",
    phase: "Engineer",
    title: "Design",
    desc: "Electrical architecture, panel drawings, and interlock logic design.",
    deliverable: "Approved engineering package",
  },
  {
    step: "03",
    phase: "Build",
    title: "Manufacturing",
    desc: "Precision fabrication, busbar processing, and structured panel wiring.",
    deliverable: "Factory-built panels ready for FAT",
  },
  {
    step: "04",
    phase: "Validate",
    title: "Testing",
    desc: "Point-to-point checks, functional simulation, and quality verification.",
    deliverable: "Test records and compliance sign-off",
  },
  {
    step: "05",
    phase: "Deploy",
    title: "Installation",
    desc: "On-site erection, cable termination, and system integration works.",
    deliverable: "Installed and integrated infrastructure",
  },
  {
    step: "06",
    phase: "Stabilize",
    title: "Commissioning",
    desc: "Startup sequencing, parameterization, and performance tuning.",
    deliverable: "Operational handover-ready system",
  },
  {
    step: "07",
    phase: "Enable",
    title: "Training",
    desc: "Operator and maintenance coaching with practical SOP coverage.",
    deliverable: "Trained team and documented procedures",
  },
  {
    step: "08",
    phase: "Sustain",
    title: "Support",
    desc: "After-sales support, preventive maintenance, and AMC continuity.",
    deliverable: "Long-term reliability partnership",
  },
];

const vfdPartners = ["Siemens", "Schneider Electric", "Danfoss", "Delta", "Fuji Electric", "Mitsubishi", "Yaskawa", "ABB", "Allen-Bradley"];
const processPartners = ["Yokogawa", "Endress+Hauser", "Chino", "ABB"];

export default function AutomationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="automation" className="section-white py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <div className="reveal-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00BCD4]" />
              <span className="text-xs font-semibold text-[#00BCD4] tracking-widest uppercase">Automation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-5">
              End-to-End Industrial{" "}
              <span className="gradient-text">Automation Solutions</span>
            </h2>
            <p className="text-[#555] leading-relaxed text-base">
              From initial consultation to long-term maintenance — we provide complete automation 
              lifecycle management. Our expertise spans PLC programming, SCADA development, 
              and multi-protocol industrial networking.
            </p>
          </div>

          {/* SCADA diagram */}
          <div className="reveal-right">
            <div className="bg-[#0A1628] rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              {/* Grid bg */}
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="relative">
                <div className="text-xs text-[#00BCD4] font-mono-stats mb-3">SCADA ARCHITECTURE</div>
                {/* Network diagram */}
                <div className="space-y-3">
                  {/* Level 3 */}
                  <div className="flex justify-center">
                    <div className="bg-[#1565C0]/30 border border-[#1565C0]/50 rounded-lg px-4 py-2 text-xs text-white font-mono-stats text-center">
                      MES / ERP LEVEL
                    </div>
                  </div>
                  {/* Connector */}
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-[#1565C0]/50" />
                  </div>
                  {/* Level 2 */}
                  <div className="flex justify-center gap-4">
                    {["SCADA Server", "HMI Station"].map((node) => (
                      <div key={node} className="bg-[#00BCD4]/20 border border-[#00BCD4]/40 rounded-lg px-3 py-2 text-xs text-[#00BCD4] font-mono-stats">
                        {node}
                      </div>
                    ))}
                  </div>
                  {/* Connector line */}
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-[#00BCD4]/50" />
                  </div>
                  {/* Level 1 */}
                  <div className="flex justify-center gap-3">
                    {["PLC-01", "PLC-02", "PLC-03"].map((plc, i) => (
                      <div key={plc} className="flex flex-col items-center gap-1">
                        <div className="bg-[#1DB954]/20 border border-[#1DB954]/40 rounded-lg px-3 py-1.5 text-xs text-[#1DB954] font-mono-stats flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
                          {plc}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Level 0 */}
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-white/20" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                    <div className="text-[10px] text-white/40 font-mono-stats">Field Devices & Sensors</div>
                    <div className="flex justify-center gap-2 mt-1">
                      {["Profinet", "Modbus", "Fieldbus"].map((p) => (
                        <span key={p} className="text-[9px] px-1.5 py-0.5 bg-white/10 rounded text-white/60">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Capability blocks */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className="reveal bg-white rounded-xl p-6 border border-[#E2E8F0] card-hover shadow-sm"
              style={{ transitionDelay: `${i * 100}ms` }}
              data-testid={`capability-${i}`}
            >
              <div className="text-3xl mb-4">{cap.icon}</div>
              <h4 className="font-bold text-[#0A1628] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                {cap.title}
              </h4>
              <p className="text-sm text-[#666] leading-relaxed mb-4">{cap.desc}</p>
              <div className="flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-[#1565C0] border border-blue-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Lifecycle */}
        <div className="mb-20 reveal">
          <div className="relative overflow-hidden rounded-3xl border border-[#D8E3F2] bg-[linear-gradient(145deg,#f8fbff,#f2f7ff)] p-6 sm:p-8 lg:p-10 shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#1565C0]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-12 w-44 h-44 rounded-full bg-[#00BCD4]/10 blur-3xl pointer-events-none" />

            <div className="relative grid xl:grid-cols-[minmax(0,1.25fr)_minmax(240px,0.75fr)] gap-6 items-start mb-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#CCE0F8] bg-white px-3.5 py-1.5 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1565C0]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1565C0]">Execution Framework</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-3">Project Lifecycle</h3>
                <p className="text-[#53657D] text-sm sm:text-base leading-relaxed max-w-3xl">
                  A disciplined 8-stage delivery model that moves from requirement discovery to long-term operational support, with clear accountability and measurable handover points.
                </p>
              </div>

              <aside className="rounded-2xl border border-[#D7E4F4] bg-white/90 p-4 sm:p-5">
                <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#7084A2] mb-3">Lifecycle Assurance</div>
                <div className="space-y-2.5">
                  <div className="rounded-lg border border-[#E7EEF8] bg-[#F8FBFF] px-3 py-2.5">
                    <div className="text-xl font-bold text-[#0A1628] font-mono-stats">8</div>
                    <div className="text-[11px] text-[#60738E]">Defined execution stages</div>
                  </div>
                  <div className="rounded-lg border border-[#E7EEF8] bg-[#F8FBFF] px-3 py-2.5">
                    <div className="text-xl font-bold text-[#0A1628] font-mono-stats">1</div>
                    <div className="text-[11px] text-[#60738E]">Single accountability flow</div>
                  </div>
                  <div className="rounded-lg border border-[#E7EEF8] bg-[#F8FBFF] px-3 py-2.5">
                    <div className="text-xl font-bold text-[#0A1628] font-mono-stats">24/7</div>
                    <div className="text-[11px] text-[#60738E]">Support readiness coverage</div>
                  </div>
                </div>
              </aside>
            </div>

            <div className="relative grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {lifecycle.map((step, i) => (
                <article
                  key={step.step}
                  className="group rounded-2xl border border-[#DCE7F6] bg-white p-4 sm:p-5 shadow-[0_10px_26px_rgba(15,23,42,0.07)] card-hover"
                  style={{ transitionDelay: `${i * 45}ms` }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A1628] text-[#00BCD4] text-xs font-bold font-mono-stats">
                      {step.step}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[#D3E5FC] bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1565C0]">
                      {step.phase}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-[15px] font-bold text-[#0A1628] leading-snug mb-2">{step.title}</h4>
                  <p className="text-xs sm:text-[13px] text-[#61748F] leading-relaxed mb-4">{step.desc}</p>

                  <div className="pt-3 border-t border-[#E7EEF8]">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7B8EA9] mb-1.5">Deliverable</div>
                    <div className="text-[12px] text-[#334760] leading-relaxed">{step.deliverable}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="reveal bg-[#F5F7FA] rounded-xl p-6 border border-[#E2E8F0]">
            <div className="text-xs font-bold text-[#0A1628] uppercase tracking-widest mb-4">
              VFD & Drive Integration Partners
            </div>
            <div className="flex flex-wrap gap-3">
              {vfdPartners.map((p) => (
                <span key={p} className="px-3 py-1.5 text-xs font-semibold bg-white border border-[#E2E8F0] text-[#333] rounded-lg hover:border-[#1565C0] hover:text-[#1565C0] transition-colors cursor-default">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal bg-[#F5F7FA] rounded-xl p-6 border border-[#E2E8F0]" style={{ transitionDelay: '100ms' }}>
            <div className="text-xs font-bold text-[#0A1628] uppercase tracking-widest mb-4">
              Process Automation Partners
            </div>
            <div className="flex flex-wrap gap-3">
              {processPartners.map((p) => (
                <span key={p} className="px-3 py-1.5 text-xs font-semibold bg-white border border-[#E2E8F0] text-[#333] rounded-lg hover:border-[#00BCD4] hover:text-[#00BCD4] transition-colors cursor-default">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
