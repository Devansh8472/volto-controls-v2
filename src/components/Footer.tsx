const navLinks = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Clients", href: "#clients" },
  { label: "Exports", href: "#exports" },
  { label: "Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#060F1E] border-t border-white/5 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="inline-flex items-center justify-center p-2 mb-6 rounded-xl bg-white/95 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <img
                src="/logos/Volto_logo.jpg"
                alt="Volto Control LLP"
                className="h-12 w-auto rounded-md object-contain mix-blend-multiply"
              />
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-4">
              Powering Industry. Delivering Reliability. — Electrical panel manufacturing, generator solutions, and turnkey execution since 2002.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/30">
              <div className="px-2 py-1 border border-white/10 rounded text-[10px] font-mono-stats text-[#00BCD4]">ISO 9001:2015</div>
              <span>Certified Quality Management</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Navigation</h4>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="block text-sm text-white/40 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Industries</h4>
            <div className="space-y-2">
              {["Dairy & Food", "Pharmaceuticals", "Sugar & Distillery", "Textile", "Packaging", "Power Plants", "Rubber & Tyre", "FEC / Hotels"].map((ind) => (
                <div key={ind} className="text-sm text-white/40">{ind}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-white/20">
            © {new Date().getFullYear()} Volto Control LLP. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/20">Made in India 🇮🇳</span>
            <div className="flex gap-3">
              {["LinkedIn", "Twitter", "YouTube"].map((social) => (
                <button key={social} className="text-xs text-white/20 hover:text-white/60 transition-colors">
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
