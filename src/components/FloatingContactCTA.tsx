import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { companyContact } from "@/lib/company";

export default function FloatingContactCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 right-0 z-[120] flex flex-col items-end gap-3 p-4 sm:p-6"
      style={{
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
      }}
    >
      <div
        id={menuId}
        role="menu"
        aria-hidden={!isOpen}
        className={`flex flex-col items-end gap-2 transition-all duration-200 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <a
          href={companyContact.phoneHref}
          role="menuitem"
          tabIndex={isOpen ? 0 : -1}
          onClick={() => setIsOpen(false)}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0A1628]/95 px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(6,15,30,0.45)] backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02] hover:border-[#00BCD4]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BCD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]"
          aria-label={`Call ${companyContact.phone}`}
        >
          <Phone className="h-4 w-4 text-[#00BCD4]" aria-hidden="true" />
          <span>Call Us</span>
        </a>

        <a
          href={companyContact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          tabIndex={isOpen ? 0 : -1}
          onClick={() => setIsOpen(false)}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0A1628]/95 px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(6,15,30,0.45)] backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02] hover:border-[#00BCD4]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BCD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </div>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close quick contact options" : "Open quick contact options"}
        className="inline-flex items-center gap-2 rounded-full border border-[#00BCD4]/50 bg-gradient-to-r from-[#1565C0] to-[#0f87b5] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(21,101,192,0.45)] transition-all duration-300 hover:scale-[1.03] hover:from-[#1976D2] hover:to-[#00BCD4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BCD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]"
      >
        {isOpen ? (
          <X className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Phone className="h-4 w-4" aria-hidden="true" />
        )}
        <span>{isOpen ? "Close" : "Quick Contact"}</span>
      </button>
    </div>
  );
}
