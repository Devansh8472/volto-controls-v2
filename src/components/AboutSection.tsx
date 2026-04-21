import { useEffect, useRef } from "react";

const highlights = [
  { icon: "📅", title: "20+ Years", desc: "Established 2002 as Pantech Controls, now Volto Control LLP" },
  { icon: "🏅", title: "ISO 9001:2015", desc: "Internationally certified quality management system" },
  { icon: "🔧", title: "Turnkey Solutions", desc: "End-to-end engineering from design to commissioning" },
  { icon: "👥", title: "Expert Engineers", desc: "Highly skilled team with deep domain expertise" },
];

const milestones = [
  { year: "2002", event: "Founded as Pantech Controls in Vadodara, Gujarat" },
  { year: "2008", event: "Expanded into PLC/SCADA automation systems" },
  { year: "2012", event: "Achieved ISO 9001 certification" },
  { year: "2016", event: "Began exports to Nigeria, Dubai, and Bangladesh" },
  { year: "2020", event: "Rebranded to Volto Control LLP" },
  { year: "2024", event: "500+ projects delivered across 5+ countries" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("visible");
              }, i * 100);
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
    <section id="about" className="section-white py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1565C0]" />
            <span className="text-xs font-semibold text-[#1565C0] tracking-widest uppercase">Our Story</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-4">
            Engineering Excellence Since 2002
          </h2>
          <p className="text-[#555] max-w-2xl mx-auto text-base leading-relaxed">
            From a local electrical panel manufacturer to a global industrial automation leader — 
            Volto Control LLP has grown into one of India's most trusted engineering companies.
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Timeline */}
          <div className="reveal-left">
            <h3 className="text-xl font-bold text-[#0A1628] mb-8 flex items-center gap-3">
              <div className="w-8 h-0.5 bg-[#1565C0]" />
              Our Journey
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#1565C0] via-[#00BCD4] to-transparent" />
              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-6 pl-12 relative reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-[#0A1628] border-2 border-[#1565C0] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#00BCD4]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1565C0] font-mono-stats mb-0.5">{m.year}</div>
                      <div className="text-sm text-[#444] leading-relaxed">{m.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="reveal-right">
            <blockquote className="cyan-border-left mb-8">
              <p className="text-lg italic text-[#333] leading-relaxed">
                "We don't just manufacture panels — we engineer reliability. Every project we undertake 
                is backed by two decades of precision, passion, and industrial expertise."
              </p>
              <footer className="mt-3 text-sm text-[#1565C0] font-semibold">
                — Volto Control LLP Leadership Team
              </footer>
            </blockquote>

            <p className="text-[#555] leading-relaxed mb-6">
              Incorporated in Vadodara, Gujarat — India's industrial heartland — Volto Control LLP specializes 
              in designing, manufacturing, and supplying high-quality electrical control panels and automation systems 
              for industries across India and internationally.
            </p>

            <p className="text-[#555] leading-relaxed mb-8">
              As an authorized channel partner of ABB UPS and allied with global giants like Siemens, Schneider Electric, 
              Mitsubishi, and Danfoss, we bring world-class technology to every installation.
            </p>

            <div className="flex flex-wrap gap-3">
              {["Vadodara, Gujarat", "Est. 2002", "ABB Authorized Partner", "5+ Export Markets"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium bg-[#F5F7FA] border border-[#E2E8F0] text-[#0A1628] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4 highlight cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <div
              key={item.title}
              className="reveal bg-white border border-[#E2E8F0] rounded-xl p-6 card-hover shadow-sm"
              style={{ transitionDelay: `${i * 100}ms` }}
              data-testid={`about-card-${i}`}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h4 className="font-bold text-[#0A1628] text-lg mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                {item.title}
              </h4>
              <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
