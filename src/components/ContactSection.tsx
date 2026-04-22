import { useEffect, useRef, useState } from "react";
import { companyContact } from "@/lib/company";

const queryTypes = [
  "Products & Specifications",
  "Automation Solutions",
  "Request a Quote",
  "Export Enquiry",
  "Technical Support",
  "Other",
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    queryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", company: "", email: "", phone: "", queryType: "", message: "" });
  };

  return (
    <section id="contact" className="section-navy py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00BCD4]" />
            <span className="text-xs font-semibold text-[#00BCD4] tracking-widest uppercase">Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let's Power Your Next Project
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            Ready to discuss your electrical panel or automation requirements? 
            Our engineering team will respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Company info */}
          <div className="lg:col-span-2 reveal-left space-y-6">
            {/* Logo */}
            <div className="inline-flex items-center justify-center p-2 mb-8 rounded-xl bg-white/95 border border-white/15 shadow-[0_0_24px_rgba(255,255,255,0.08)]">
              <img
                src="/logos/Volto_logo.png"
                alt="Volto Control LLP"
                className="h-16 w-auto rounded-md object-contain mix-blend-multiply"
                loading="lazy"
              />
            </div>

            <p className="text-white/50 text-sm leading-relaxed">
              India's trusted partner for electrical panel manufacturing, generator control, and turnkey electrical solutions — 
              serving 20+ years across dairy, pharma, sugar, textile, and more.
            </p>

            {/* Contact details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-sm">
                  📍
                </div>
                <div>
                  <div className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Address</div>
                  <div className="text-sm text-white/70 leading-relaxed">
                    {companyContact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-sm">
                  📞
                </div>
                <div>
                  <div className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Phone</div>
                  <a
                    href={companyContact.phoneHref}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {companyContact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-sm">
                  ✉️
                </div>
                <div>
                  <div className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Email</div>
                  <div className="text-sm text-white/70">info@voltocontrol.com</div>
                </div>
              </div>
            </div>

            {/* ISO badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
              <div className="text-xs font-bold text-[#00BCD4]">ISO</div>
              <div className="text-xs text-white/50">9001:2015 Certified</div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 reveal-right">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/50 text-sm">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-testid="contact-form">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#1565C0] transition-colors"
                        placeholder="Your name"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#1565C0] transition-colors"
                        placeholder="Company name"
                        data-testid="input-company"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#1565C0] transition-colors"
                        placeholder="your@email.com"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#1565C0] transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                      Query Type
                    </label>
                    <select
                      value={formState.queryType}
                      onChange={(e) => setFormState({ ...formState, queryType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#1565C0] transition-colors appearance-none"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                      data-testid="select-query-type"
                    >
                      <option value="" className="bg-[#0A1628]">Select query type</option>
                      {queryTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#0A1628]">{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#1565C0] transition-colors resize-none"
                      placeholder="Describe your requirement, project details, or query..."
                      data-testid="input-message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-full bg-[#1565C0] hover:bg-[#1976D2] text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]"
                    data-testid="submit-contact"
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
