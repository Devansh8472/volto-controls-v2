import { useEffect, useRef, useState } from "react";

const qualityChecks = [
  "Raw material inspection & vendor qualification",
  "Powder coating verification & surface treatment",
  "Panel wiring continuity & insulation check",
  "IR & Megger testing",
  "BOM (Bill of Materials) verification",
  "Dielectric test — 2KV/1 minute",
  "Functional & simulation testing",
  "Proper documentation & secure packing",
];

const standards = [
  { code: "IS/IEC 60439", label: "LV Switchgear" },
  { code: "IS/IEC 60204", label: "Machine Safety" },
  { code: "IEC 61511", label: "Safety Systems" },
  { code: "IEC 62443", label: "Industrial Security" },
];

export default function QualitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(qualityChecks.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
            // Animate checkmarks
            qualityChecks.forEach((_, i) => {
              setTimeout(() => {
                setCheckedItems((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, 400 + i * 200);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="quality" className="section-gray py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1565C0]" />
            <span className="text-xs font-semibold text-[#1565C0] tracking-widest uppercase">Quality Assurance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-4">
            Built to the Highest Standards
          </h2>
          <p className="text-[#555] max-w-2xl mx-auto text-base leading-relaxed">
            ISO 9001:2015 certified processes with stage-by-stage inspection ensure every 
            Volto Control panel meets global quality and safety benchmarks.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Quality checklist */}
          <div className="reveal-left">
            <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1565C0]/10 flex items-center justify-center text-xl">🔍</div>
                <div>
                  <h3 className="font-bold text-[#0A1628]" style={{ fontFamily: 'Syne, sans-serif' }}>Quality Inspection Protocol</h3>
                  <div className="text-xs text-[#888]">Stage-by-stage verification</div>
                </div>
              </div>

              <div className="space-y-3">
                {qualityChecks.map((check, i) => (
                  <div
                    key={check}
                    className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300"
                    style={{
                      background: checkedItems[i] ? '#F0FDF4' : 'transparent',
                      borderLeft: checkedItems[i] ? '3px solid #1DB954' : '3px solid transparent',
                    }}
                    data-testid={`quality-check-${i}`}
                  >
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 shrink-0 ${
                        checkedItems[i]
                          ? 'bg-[#1DB954] border-[#1DB954]'
                          : 'border-[#DDD]'
                      }`}
                    >
                      {checkedItems[i] && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm leading-relaxed ${checkedItems[i] ? 'text-[#0A1628] font-medium' : 'text-[#888]'}`}>
                      {check}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="space-y-6 reveal-right">
            {/* ISO Badge */}
            <div className="bg-[#0A1628] rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-[#1565C0]/20 border border-[#1565C0]/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs font-bold text-[#00BCD4] leading-none">ISO</div>
                    <div className="text-[9px] text-white/50">9001:2015</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">ISO 9001:2015 Certified</h3>
                  <p className="text-sm text-white/50">International quality management standard</p>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Our ISO certification confirms a systematic approach to quality — from raw material procurement 
                to final delivery, every process is documented, monitored, and continuously improved.
              </p>
            </div>

            {/* Standards */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm">
              <h4 className="font-bold text-[#0A1628] mb-4 text-sm uppercase tracking-wider">
                Design Standards Compliance
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {standards.map((s) => (
                  <div key={s.code} className="bg-[#F5F7FA] rounded-lg p-3 border border-[#E2E8F0]">
                    <div className="text-xs font-bold text-[#1565C0] font-mono-stats">{s.code}</div>
                    <div className="text-xs text-[#666] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing statement */}
            <div className="bg-gradient-to-br from-[#1565C0]/5 to-[#00BCD4]/5 rounded-2xl p-6 border border-[#1565C0]/10">
              <p className="text-sm text-[#333] leading-relaxed">
                "Through continuous monitoring, Volto Control ensures{" "}
                <strong className="text-[#1565C0]">high-quality standards</strong>,{" "}
                <strong className="text-[#00BCD4]">operational reliability</strong>, and{" "}
                <strong className="text-[#1DB954]">complete customer satisfaction</strong>."
              </p>
            </div>

            {/* Key quality metrics */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "100%", label: "Factory Tested" },
                { value: "8-Stage", label: "Inspection" },
                { value: "2KV", label: "Dielectric Test" },
              ].map((metric) => (
                <div key={metric.label} className="text-center p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
                  <div className="text-lg font-bold text-[#0A1628] font-mono-stats">{metric.value}</div>
                  <div className="text-xs text-[#888] mt-0.5">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
