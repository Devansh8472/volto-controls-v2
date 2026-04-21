import { useState, useEffect, useMemo, useRef } from "react";

const processStages = ["Utility Feed", "PCC Build", "MCC Wiring", "PLC Logic", "Commissioning"];

const liveActivities = [
  "Incoming feeder synchronized and load balanced for Panel Line-03.",
  "PLC ladder block deployed to utility transfer logic and verified.",
  "Panel instrumentation tags refreshed with live telemetry from APFC and MCC sections.",
  "Thermal scan passed for busbar chamber with stable temperature profile.",
  "Power factor correction bank auto-switched to maintain PF above 0.98.",
  "Remote diagnostics heartbeat stable across all active control nodes.",
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type HeroSectionProps = {
  showContent?: boolean;
  onVideoReady?: () => void;
};

export default function HeroSection({ showContent = true, onVideoReady }: HeroSectionProps) {
  const [count20, setCount20] = useState(0);
  const [count500, setCount500] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const hasNotifiedVideoReady = useRef(false);
  const [operationsState, setOperationsState] = useState({
    load: 87.3,
    powerFactor: 0.98,
    outputKw: 95,
    activeStage: 0,
    fabrication: 68,
    plcProgramming: 54,
    siteCommissioning: 72,
  });
  const [activityIndex, setActivityIndex] = useState(0);
  const [liveClock, setLiveClock] = useState(() => new Date());
  const [liveOutputSeries, setLiveOutputSeries] = useState<number[]>([92, 93, 95, 96, 95, 97, 98, 99, 100, 99, 101, 102]);

  const baseUrl = import.meta.env.BASE_URL;
  const heroVideoSrc = `${baseUrl}videos/volto-hero.mp4`;
  const heroVideoDesktopSrc = `${baseUrl}videos/volto-hero-desktop.mp4`;
  const heroVideoMobileSrc = `${baseUrl}videos/volto-hero-mobile.mp4`;
  const heroPosterSrc = `${baseUrl}images/hero-poster.jpg`;
  const abbLogoSrc = `${baseUrl}images/ABB.png`;
  const exideLogoSrc = `${baseUrl}images/Exide.png`;
  const keiLogoSrc = `${baseUrl}images/Kei%20Logo.jpg`;

  useEffect(() => {
    if (hasAnimated) return;
    setHasAnimated(true);
    let start20 = 0;
    const timer20 = setInterval(() => {
      start20 += 1;
      setCount20(start20);
      if (start20 >= 20) clearInterval(timer20);
    }, 60);

    let start500 = 0;
    const timer500 = setInterval(() => {
      start500 += 10;
      setCount500(start500);
      if (start500 >= 500) clearInterval(timer500);
    }, 20);

    return () => {
      clearInterval(timer20);
      clearInterval(timer500);
    };
  }, []);

  useEffect(() => {
    const liveTimer = setInterval(() => {
      setOperationsState((prev) => {
        const drift = () => (Math.random() - 0.5) * 2;

        return {
          load: Number(clamp(prev.load + drift() * 1.6, 78, 94).toFixed(1)),
          powerFactor: Number(clamp(prev.powerFactor + drift() * 0.01, 0.94, 1).toFixed(2)),
          outputKw: Math.round(clamp(prev.outputKw + drift() * 2.8, 84, 118)),
          activeStage: (prev.activeStage + 1) % processStages.length,
          fabrication: Math.round(clamp(prev.fabrication + 0.9 + drift() * 1.2, 55, 98)),
          plcProgramming: Math.round(clamp(prev.plcProgramming + 1.1 + drift() * 1.4, 45, 99)),
          siteCommissioning: Math.round(clamp(prev.siteCommissioning + 0.8 + drift() * 1.1, 52, 97)),
        };
      });

      setLiveOutputSeries((prev) => {
        const last = prev[prev.length - 1] ?? 96;
        const next = Math.round(clamp(last + (Math.random() - 0.48) * 4.5, 84, 118));
        return [...prev.slice(1), next];
      });

      setActivityIndex((prev) => (prev + 1) % liveActivities.length);
      setLiveClock(new Date());
    }, 1800);

    return () => clearInterval(liveTimer);
  }, []);

  const completionScore = Math.round(
    (operationsState.fabrication + operationsState.plcProgramming + operationsState.siteCommissioning) / 3
  );
  const primaryActivity = liveActivities[activityIndex];
  const liveTimeLabel = liveClock.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  
  const latestOutput = liveOutputSeries[liveOutputSeries.length - 1] ?? operationsState.outputKw;
  const previousOutput = liveOutputSeries[liveOutputSeries.length - 2] ?? latestOutput;
  const outputTrendUp = latestOutput >= previousOutput;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const notifyVideoReady = () => {
    if (hasNotifiedVideoReady.current) return;
    hasNotifiedVideoReady.current = true;
    onVideoReady?.();
  };

  return (
    <section id="hero" className="relative min-h-screen hero-bg overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroPosterSrc}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover object-center brightness-110 contrast-105 transition-opacity duration-700 ${videoReady && !videoFailed ? "opacity-0" : "opacity-72"}`}
          loading="eager"
          decoding="async"
        />
        <video
          className={`absolute inset-0 h-full w-full object-cover object-center brightness-110 contrast-105 transition-opacity duration-700 ${videoReady && !videoFailed ? "opacity-58" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPosterSrc}
          aria-hidden="true"
          onLoadedData={() => {
            setVideoReady(true);
            setVideoFailed(false);
            notifyVideoReady();
          }}
          onCanPlay={() => {
            setVideoReady(true);
            setVideoFailed(false);
            notifyVideoReady();
          }}
          onError={() => {
            setVideoReady(false);
            setVideoFailed(true);
            notifyVideoReady();
          }}
        >
          <source media="(max-width: 767px)" srcSet={heroVideoMobileSrc} type="video/mp4" />
          <source media="(min-width: 768px)" srcSet={heroVideoDesktopSrc} type="video/mp4" />
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 ${videoReady && !videoFailed ? "bg-[radial-gradient(120%_95%_at_12%_4%,rgba(255,255,255,0.92)_0%,rgba(237,246,255,0.72)_46%,rgba(228,240,253,0.5)_100%)]" : "bg-[radial-gradient(120%_95%_at_12%_4%,rgba(255,255,255,0.95)_0%,rgba(241,248,255,0.82)_46%,rgba(232,243,255,0.68)_100%)]"}`} />
        <div className={`absolute inset-0 ${videoReady && !videoFailed ? "bg-[linear-gradient(118deg,rgba(255,255,255,0.58)_0%,rgba(235,246,255,0.36)_44%,rgba(194,227,255,0.28)_100%)]" : "bg-[linear-gradient(118deg,rgba(255,255,255,0.72)_0%,rgba(235,246,255,0.5)_44%,rgba(194,227,255,0.32)_100%)]"}`} />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 z-[1] grid-bg opacity-24" />

      {/* Blue gradient orb */}
      <div className="absolute top-1/4 right-1/4 z-[1] w-[30rem] h-[30rem] bg-[#3f8ef7]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 z-[1] w-72 h-72 bg-[#64d3e8]/16 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-14 left-1/3 z-[1] w-56 h-56 bg-white/50 rounded-full blur-3xl" />

      {/* Horizontal lines decoration */}
      <div className="absolute left-0 top-1/3 z-[1] w-1/4 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute right-0 top-2/3 z-[1] w-1/4 h-px bg-gradient-to-l from-transparent via-cyan-400/40 to-transparent" />

      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 transition-all duration-700 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none select-none"
        }`}
      >
        <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] gap-12 lg:gap-14 items-center lg:items-start">
          {/* Left content */}
          <div className="animate-fade-in-left w-full flex flex-col items-center text-center lg:pt-2">
            {/* Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#BCD6F2] mb-6 shadow-[0_8px_24px_rgba(19,72,132,0.1)] backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[#1565C0] animate-pulse" />
              <span className="text-xs font-semibold text-[#1565C0] tracking-[0.15em] uppercase">
                Electrical Turnkey Experts
              </span>
            </div>

            {/* Headline */}
            <div className="relative w-full max-w-[44rem] mb-9 overflow-hidden rounded-[2.1rem] border border-[#D2E3F7] bg-[linear-gradient(118deg,rgba(255,255,255,0.95)_0%,rgba(245,251,255,0.88)_42%,rgba(218,239,255,0.78)_100%)] px-7 py-10 backdrop-blur-2xl shadow-[0_24px_60px_rgba(32,76,126,0.18)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(113,219,255,0.24),transparent_60%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.08)_48%,rgba(7,69,117,0.1)_100%)]" />
              <div className="relative text-center">
                <h1 className="text-6xl sm:text-7xl lg:text-[6.2rem] font-bold text-[#09213E] leading-[0.95]" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Volto
                </h1>
                <p className="mt-4 text-base sm:text-lg lg:text-xl font-semibold tracking-[0.46em] uppercase text-[#1565C0]">
                  Controls
                </p>
                <div className="mx-auto mt-6 h-px w-56 bg-gradient-to-r from-transparent via-[#1f79d5]/70 to-transparent" />
                <p className="mt-6 text-base sm:text-lg text-[#41566F]">
                  India's trusted partner for electrical control systems
                  <br />
                  <span className="inline-block">and turnkey power solutions.</span>
                </p>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-[#4F637E] leading-relaxed mb-9 max-w-3xl">
              Electrical Turnkey Solutions · Generator &amp; DG Panels · Industrial Instrumentation.
              Trusted by Fortune 500 brands for 20+ years.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => scrollToSection("products")}
                className="group px-8 py-3.5 rounded-full bg-[linear-gradient(100deg,#1e5fde_0%,#1f75e7_42%,#00aee8_100%)] text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_16px_34px_rgba(30,95,222,0.45)] hover:scale-[1.03]"
                data-testid="hero-explore-btn"
              >
                Explore Products
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="group px-8 py-3.5 rounded-full bg-white border border-[#C7DFF6] backdrop-blur-md shadow-[0_10px_26px_rgba(12,48,88,0.12)] hover:border-[#6CA9DF] text-[#123155] font-semibold text-sm transition-all duration-300 hover:bg-[#F7FBFF]"
                data-testid="hero-quote-btn"
              >
                Get a Quote
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { num: `${count20}+`, label: "Years" },
                { num: `${count500}+`, label: "Projects" },
                { num: "5+", label: "Countries" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-[#0A1F3B] font-mono-stats">{stat.num}</div>
                  <div className="text-xs text-[#71839B] uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Interactive Stack */}
          <div className="relative w-full max-w-[26rem] mx-auto hidden lg:flex flex-col gap-7 animate-fade-in-right justify-center mt-6 lg:mt-0">
            {/* 1. Electrical Pannels Section */}
            <div className="relative w-full rounded-[24px] border border-[#CFE2F8] bg-white/95 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(22,72,128,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(22,72,128,0.12)]">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.7)_0%,transparent_100%)] rounded-[24px] pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[linear-gradient(120deg,#f0f6ff,#e1eefd)] text-[#1565C0] shadow-sm">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-[14px] font-extrabold uppercase tracking-[0.18em] text-[#0A2540]">Electrical Pannels</h3>
                </div>
                <div className="space-y-3 text-[13px] text-[#41566F] font-medium leading-relaxed">
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F0F6FF] text-[#1565C0] text-[10px] font-bold">1</span>
                    <span>DG Panel Systems</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F0F6FF] text-[#1565C0] text-[10px] font-bold">2</span>
                    <span>ABB UPS <span className="text-[#647C9E] font-normal text-xs ml-0.5">(Uninterruptible Power)</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F0F6FF] text-[#1565C0] text-[10px] font-bold">3</span>
                    <span>ABB VCB <span className="text-[#647C9E] font-normal text-xs ml-0.5">(Vacuum Circuit Breaker)</span></span>
                  </div>
                  <div className="pt-3 mt-1 shrink-0 border-t border-[#E5F0FF]/80">
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F0F6FF] text-[#1565C0] text-[10px] font-bold">4</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#647C9E]">Channel Partners</span>
                    </div>
                    <div className="pl-8 flex items-center gap-3">
                      <img src={abbLogoSrc} alt="ABB" className="h-10 w-auto rounded-lg border border-[#D8E6F5] bg-white px-2.5 py-1.5 shadow-sm" loading="lazy" />
                      <img src={exideLogoSrc} alt="Exide" className="h-10 w-auto rounded-lg border border-[#D8E6F5] bg-white px-2.5 py-1.5 shadow-sm" loading="lazy" />
                    </div>
                  </div>
                  <div className="pt-3 mt-1 shrink-0 border-t border-[#E5F0FF]/80">
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F0F6FF] text-[#1565C0] text-[10px] font-bold">5</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#647C9E]">Cables</span>
                    </div>
                    <div className="pl-8">
                      <img src={keiLogoSrc} alt="KEI Cables" className="h-12 w-auto rounded-lg border border-[#D8E6F5] bg-white px-2.5 py-1.5 shadow-sm" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Live Digital Twin Section (Streamlined) */}
            <div className="relative w-full rounded-[24px] border border-white/10 bg-[#081326] p-6 shadow-[0_24px_70px_rgba(6,15,28,0.5)] blue-glow transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0D1F3C]/95 via-[#0A1A32]/95 to-[#081326]/98 rounded-[24px] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,188,212,0.12),transparent_50%)] rounded-[24px] pointer-events-none" />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-5 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00BCD4]/70" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00BCD4]" />
                    </span>
                    <span className="text-[12px] font-bold tracking-[0.18em] uppercase text-[#8ddcf6]">
                      Live Digital Twin
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-stats text-white/50">{liveTimeLabel}</span>
                </div>

                <div className="grid grid-cols-[auto_1fr] items-center gap-6 mb-5">
                  <div
                    className="relative h-20 w-20 rounded-full p-[4px] shrink-0"
                    style={{
                      background: `conic-gradient(#00BCD4 ${completionScore * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
                    }}
                  >
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/5 bg-[#0B1B33] shadow-inner">
                      <span className="text-[20px] font-bold text-white font-mono-stats leading-none">{completionScore}%</span>
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#00BCD4]/80 mt-1">Exec</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 flex flex-col justify-center">
                      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40 mb-1">Load</div>
                      <div className="text-[13px] font-semibold font-mono-stats text-white">{operationsState.load}%</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 flex flex-col justify-center">
                      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40 mb-1">PF</div>
                      <div className="text-[13px] font-semibold font-mono-stats text-[#1DB954]">{operationsState.powerFactor.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5 flex items-center justify-between mb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Active Stage</span>
                    <span className="text-[12px] text-white/90 font-medium">{processStages[operationsState.activeStage]}</span>
                  </div>
                  <div className="text-right flex flex-col gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Power Output</span>
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className={`text-[10px] ${outputTrendUp ? "text-[#1DB954]" : "text-[#ff9292]"}`}>{outputTrendUp ? "▲" : "▼"}</span>
                      <span className="text-[14px] font-semibold font-mono-stats text-[#9BCBFF]">{latestOutput} kW</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#1DB954] shrink-0 animate-pulse" />
                  <p className="text-[11px] leading-relaxed text-white/60 line-clamp-2">{primaryActivity}</p>
                </div>
              </div>
            </div>

            {/* Floating context widgets */}
            <div className="absolute -right-8 bottom-[28%] z-10 hidden xl:flex flex-col gap-1 w-max rounded-xl border border-white/10 bg-[#0A1A32]/95 px-3.5 py-2.5 backdrop-blur-md shadow-[0_12px_28px_rgba(6,15,28,0.3)] pointer-events-none">
               <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/60">Remote Monitor</div>
               <div className="text-[10px] text-[#00BCD4] font-medium mt-0.5">12 Field Nodes Online</div>
            </div>
          </div>
        </div>
      </div>

      {!showContent && (
        <div className="absolute inset-x-0 bottom-24 z-20 flex justify-center px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C7DCF4] bg-white/95 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2E557D] backdrop-blur-md shadow-[0_10px_24px_rgba(22,72,128,0.12)]">
            <span className="h-2 w-2 rounded-full bg-[#1565C0] animate-pulse" />
            Initializing Hero Experience
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-xs text-[#5E7390]">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-[#AFC9E6] flex items-center justify-center">
          <div className="w-1 h-2 bg-[#4B6F95] rounded-full" />
        </div>
      </div>
    </section>
  );
}
