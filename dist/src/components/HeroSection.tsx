import { useState, useEffect, useMemo, useRef } from "react";

const processStages = ["Utility Feed", "PCC Build", "MCC Wiring", "PLC Logic", "Commissioning"];

const liveActivities = [
  "Incoming feeder synchronized and load balanced for Panel Line-03.",
  "PLC ladder block deployed to utility transfer logic and verified.",
  "SCADA tags refreshed with live telemetry from APFC and MCC sections.",
  "Thermal scan passed for busbar chamber with stable temperature profile.",
  "Power factor correction bank auto-switched to maintain PF above 0.98.",
  "Remote diagnostics heartbeat stable across all active control nodes.",
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const chartWidth = 320;
const chartHeight = 128;
const chartMin = 84;
const chartMax = 118;

const mapValueToY = (value: number, min: number, max: number, height: number) => {
  if (max === min) return height / 2;
  return height - ((value - min) / (max - min)) * height;
};

const buildLinePath = (values: number[], width: number, height: number, min: number, max: number) => {
  if (!values.length) return "";
  const step = values.length > 1 ? width / (values.length - 1) : 0;

  return values
    .map((value, index) => {
      const x = index * step;
      const y = mapValueToY(value, min, max, height);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
};

const buildAreaPath = (values: number[], width: number, height: number, min: number, max: number) => {
  if (!values.length) return "";
  const linePath = buildLinePath(values, width, height, min, max);
  return `${linePath} L ${width} ${height} L 0 ${height} Z`;
};

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
    scadaCommissioning: 72,
  });
  const [activityIndex, setActivityIndex] = useState(0);
  const [liveClock, setLiveClock] = useState(() => new Date());
  const [liveOutputSeries, setLiveOutputSeries] = useState<number[]>([92, 93, 95, 96, 95, 97, 98, 99, 100, 99, 101, 102]);
  const [targetOutputSeries, setTargetOutputSeries] = useState<number[]>([94, 94, 95, 95, 96, 96, 97, 97, 98, 98, 99, 99]);

  const baseUrl = import.meta.env.BASE_URL;
  const heroVideoSrc = `${baseUrl}videos/volto-hero.mp4`;
  const heroVideoDesktopSrc = `${baseUrl}videos/volto-hero-desktop.mp4`;
  const heroVideoMobileSrc = `${baseUrl}videos/volto-hero-mobile.mp4`;
  const heroPosterSrc = `${baseUrl}images/hero-poster.jpg`;

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
          scadaCommissioning: Math.round(clamp(prev.scadaCommissioning + 0.8 + drift() * 1.1, 52, 97)),
        };
      });

      setLiveOutputSeries((prev) => {
        const last = prev[prev.length - 1] ?? 96;
        const next = Math.round(clamp(last + (Math.random() - 0.48) * 4.5, chartMin, chartMax));
        return [...prev.slice(1), next];
      });

      setTargetOutputSeries((prev) => {
        const last = prev[prev.length - 1] ?? 98;
        const next = Number(clamp(last + (Math.random() - 0.5) * 1.2, 92, 104).toFixed(1));
        return [...prev.slice(1), next];
      });

      setActivityIndex((prev) => (prev + 1) % liveActivities.length);
      setLiveClock(new Date());
    }, 1800);

    return () => clearInterval(liveTimer);
  }, []);

  const stageProgress = (operationsState.activeStage / (processStages.length - 1)) * 100;
  const completionScore = Math.round(
    (operationsState.fabrication + operationsState.plcProgramming + operationsState.scadaCommissioning) / 3
  );
  const primaryActivity = liveActivities[activityIndex];
  const secondaryActivity = liveActivities[(activityIndex + 1) % liveActivities.length];
  const liveTimeLabel = liveClock.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const outputLinePath = useMemo(
    () => buildLinePath(liveOutputSeries, chartWidth, chartHeight, chartMin, chartMax),
    [liveOutputSeries]
  );
  const targetLinePath = useMemo(
    () => buildLinePath(targetOutputSeries, chartWidth, chartHeight, chartMin, chartMax),
    [targetOutputSeries]
  );
  const outputAreaPath = useMemo(
    () => buildAreaPath(liveOutputSeries, chartWidth, chartHeight, chartMin, chartMax),
    [liveOutputSeries]
  );
  const latestOutput = liveOutputSeries[liveOutputSeries.length - 1] ?? operationsState.outputKw;
  const previousOutput = liveOutputSeries[liveOutputSeries.length - 2] ?? latestOutput;
  const latestTarget = targetOutputSeries[targetOutputSeries.length - 1] ?? 99;
  const outputTrendUp = latestOutput >= previousOutput;
  const outputDelta = Number((latestOutput - latestTarget).toFixed(1));
  const lastPointY = mapValueToY(latestOutput, chartMin, chartMax, chartHeight);

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
                Industrial Automation Leaders
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
                  <span className="inline-block">and industrial automation.</span>
                </p>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-[#4F637E] leading-relaxed mb-9 max-w-3xl">
              Electrical Control Panels · PLC &amp; SCADA Automation · Industrial Instrumentation.
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

          {/* Right - Live digital twin mockup */}
          <div className="relative animate-fade-in-right hidden lg:block">
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-6 rounded-[38px] bg-[radial-gradient(circle_at_top_right,rgba(0,188,212,0.16),transparent_60%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-[#0D1F3C]/95 via-[#0A1A32]/95 to-[#081326]/98 p-6 shadow-[0_24px_70px_rgba(6,15,28,0.45)] blue-glow">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(21,101,192,0.18),transparent_58%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),transparent_45%,rgba(0,188,212,0.08)_100%)]" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00BCD4]/70" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00BCD4]" />
                      </span>
                      <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8ddcf6]">
                        Live Digital Twin
                      </span>
                    </div>
                    <span className="text-[11px] font-mono-stats text-white/60">PLANT 03 · {liveTimeLabel}</span>
                  </div>

                  <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-4">
                    <div
                      className="relative h-24 w-24 rounded-full p-[5px]"
                      style={{
                        background: `conic-gradient(#00BCD4 ${completionScore * 3.6}deg, rgba(255,255,255,0.14) 0deg)`,
                      }}
                    >
                      <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/10 bg-[#0B1B33]">
                        <span className="text-xl font-bold text-white font-mono-stats">{completionScore}%</span>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Execution</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Load", value: `${operationsState.load}%`, tone: "text-[#00BCD4]" },
                        { label: "PF", value: operationsState.powerFactor.toFixed(2), tone: "text-[#1DB954]" },
                        { label: "Output", value: `${operationsState.outputKw}kW`, tone: "text-[#9BCBFF]" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                          <div className="text-[9px] uppercase tracking-[0.14em] text-white/45">{item.label}</div>
                          <div className={`mt-1 text-sm font-semibold font-mono-stats ${item.tone}`}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Live Workstream</span>
                      <span className="text-[10px] font-mono-stats text-[#00BCD4]">
                        {processStages[operationsState.activeStage]}
                      </span>
                    </div>

                    <div className="relative mx-2">
                      <div className="absolute inset-x-0 top-3 h-[2px] rounded-full bg-white/10" />
                      <div
                        className="absolute left-0 top-3 h-[2px] rounded-full bg-gradient-to-r from-[#1565C0] to-[#00BCD4] transition-all duration-700"
                        style={{ width: `${stageProgress}%` }}
                      />

                      <div className="relative z-10 flex justify-between">
                        {processStages.map((stage, i) => {
                          const active = i <= operationsState.activeStage;
                          return (
                            <div key={stage} className="flex w-[72px] flex-col items-center text-center">
                              <div
                                className={`h-6 w-6 rounded-full border text-[10px] font-bold font-mono-stats flex items-center justify-center transition-all duration-700 ${
                                  active
                                    ? "border-[#00BCD4] bg-[#00BCD4]/20 text-[#00BCD4] shadow-[0_0_12px_rgba(0,188,212,0.45)]"
                                    : "border-white/20 bg-white/5 text-white/45"
                                }`}
                              >
                                {i + 1}
                              </div>
                              <span className={`mt-2 text-[10px] leading-tight ${active ? "text-white/85" : "text-white/40"}`}>
                                {stage}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Live Power Output Curve</span>
                      <span className={`text-[11px] font-mono-stats ${outputTrendUp ? "text-[#1DB954]" : "text-[#ff9292]"}`}>
                        {latestOutput}kW {outputTrendUp ? "▲" : "▼"}
                      </span>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#071427]/75 p-3">
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,101,192,0.16)_0%,rgba(6,12,24,0)_100%)]" />
                      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="relative h-36 w-full" preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                          <linearGradient id="volto-output-line" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#1565C0" />
                            <stop offset="100%" stopColor="#00BCD4" />
                          </linearGradient>
                          <linearGradient id="volto-output-area" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgba(0,188,212,0.35)" />
                            <stop offset="100%" stopColor="rgba(0,188,212,0)" />
                          </linearGradient>
                        </defs>

                        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                          <line
                            key={i}
                            x1={0}
                            y1={ratio * chartHeight}
                            x2={chartWidth}
                            y2={ratio * chartHeight}
                            stroke="rgba(255,255,255,0.09)"
                            strokeWidth="1"
                          />
                        ))}

                        <path d={outputAreaPath} fill="url(#volto-output-area)" />
                        <path d={targetLinePath} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" strokeDasharray="5 4" />
                        <path d={outputLinePath} fill="none" stroke="url(#volto-output-line)" strokeWidth="2.8" strokeLinecap="round" />
                        <circle cx={chartWidth} cy={lastPointY} r="4.5" fill="#00BCD4" />
                        <circle cx={chartWidth} cy={lastPointY} r="9" fill="rgba(0,188,212,0.28)" />
                      </svg>

                      <div className="relative mt-2 flex items-center justify-between text-[10px] text-white/45 font-mono-stats">
                        <span>{chartMin}kW</span>
                        <span>{Math.round((chartMin + chartMax) / 2)}kW</span>
                        <span>{chartMax}kW</span>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                        <div className="text-[9px] uppercase tracking-[0.14em] text-white/45">Live Output</div>
                        <div className="mt-1 text-[11px] font-semibold text-[#00BCD4] font-mono-stats">{latestOutput}kW</div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                        <div className="text-[9px] uppercase tracking-[0.14em] text-white/45">Target Curve</div>
                        <div className="mt-1 text-[11px] font-semibold text-white/80 font-mono-stats">{latestTarget}kW</div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                        <div className="text-[9px] uppercase tracking-[0.14em] text-white/45">Variance</div>
                        <div className={`mt-1 text-[11px] font-semibold font-mono-stats ${outputDelta >= 0 ? "text-[#1DB954]" : "text-[#ff9292]"}`}>
                          {outputDelta >= 0 ? "+" : ""}{outputDelta}kW
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        label: "Panel Fabrication",
                        value: operationsState.fabrication,
                        gradient: "linear-gradient(90deg, #1565C0, #4A8CE0)",
                      },
                      {
                        label: "PLC Programming",
                        value: operationsState.plcProgramming,
                        gradient: "linear-gradient(90deg, #00BCD4, #38D8EC)",
                      },
                      {
                        label: "SCADA Commissioning",
                        value: operationsState.scadaCommissioning,
                        gradient: "linear-gradient(90deg, #1DB954, #5EDB84)",
                      },
                    ].map((stream) => (
                      <div key={stream.label}>
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-[11px] text-white/75">{stream.label}</span>
                          <span className="text-[11px] font-mono-stats text-white/65">{stream.value}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${stream.value}%`,
                              background: stream.gradient,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[#08172d]/70 p-4">
                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Live Activity Feed</div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#1DB954] animate-pulse" />
                        <p className="text-xs leading-relaxed text-white/82">{primaryActivity}</p>
                      </div>
                      <div className="flex items-start gap-2.5 opacity-75">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#00BCD4]" />
                        <p className="text-xs leading-relaxed text-white/72">{secondaryActivity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-8 top-8 rounded-xl border border-[#CFE2F8] bg-white/95 px-3 py-2 backdrop-blur-md shadow-[0_10px_22px_rgba(22,72,128,0.12)]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#00BCD4]">Live QA</div>
                <div className="text-[11px] text-[#38506D]">Auto-test sequence running</div>
              </div>

              <div className="absolute -right-8 bottom-10 rounded-xl border border-[#BDD9F8] bg-[#ECF5FF]/95 px-3 py-2 backdrop-blur-md shadow-[0_10px_22px_rgba(22,72,128,0.12)]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12355A]">Remote Monitor</div>
                <div className="text-[11px] text-[#2F5B87]">12 active field nodes</div>
              </div>
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
