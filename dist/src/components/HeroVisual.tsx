import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  operationsState: {
    load: number;
    powerFactor: number;
    outputKw: number;
    activeStage: number;
  };
  liveTimeLabel: string;
  completionScore: number;
  primaryActivity: string;
}

const processStages = ["Utility Feed", "PCC Build", "MCC Wiring", "PLC Logic", "Commissioning"];

export default function HeroVisual({ operationsState, liveTimeLabel, completionScore, primaryActivity }: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pulseOffset, setPulseOffset] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let last = performance.now();
    const tick = (now: number) => {
      if (now - last > 16) {
        setPulseOffset((p) => (p + 0.5) % 100);
        last = now;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [reducedMotion]);

  const trendUp = useMemo(() => {
    const vals = [92, 93, 95, 96, 95, 97, 98, 99, 100, 99, 101, 102];
    return vals[vals.length - 1] >= vals[vals.length - 2];
  }, []);

  const activeLabel = processStages[operationsState.activeStage];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#00BCD4]/6 rounded-full blur-3xl pointer-events-none" />

      {/* Main container */}
      <div className="relative w-[92%] h-[86%] min-h-[460px] max-h-[640px] rounded-[28px] border border-[#1e3a5f]/40 bg-gradient-to-br from-[#0a1321]/95 via-[#0d1b2e]/95 to-[#0a1321]/95 overflow-hidden shadow-[0_20px_60px_rgba(6,15,28,0.45)]">
        {/* Subtle radial highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,188,212,0.06),transparent_50%)]" />

        {/* SVG Layer - cable paths and indicators */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#00BCD4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Cable from Power to Panel */}
          <path d="M 85 220 C 120 220, 130 200, 160 200" fill="none" stroke="#1e3a5f" strokeWidth="3" />
          <path d="M 85 235 C 120 235, 130 215, 160 215" fill="none" stroke="#1e3a5f" strokeWidth="3" />
          <path d="M 85 250 C 120 250, 130 230, 160 230" fill="none" stroke="#1e3a5f" strokeWidth="3" />

          {/* Cable from Panel to Motor */}
          <path d="M 260 200 C 290 200, 300 220, 330 220" fill="none" stroke="#1e3a5f" strokeWidth="3" />
          <path d="M 260 215 C 290 215, 300 235, 330 235" fill="none" stroke="#1e3a5f" strokeWidth="3" />

          {/* Animated pulse on cables */}
          {!reducedMotion && (
            <>
              <circle r="3" fill="#00BCD4" filter="url(#glow)">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M 85 220 C 120 220, 130 200, 160 200" />
              </circle>
              <circle r="2.5" fill="#00BCD4" filter="url(#glow)" opacity="0.7">
                <animateMotion dur="2.5s" begin="0.8s" repeatCount="indefinite" path="M 85 235 C 120 235, 130 215, 160 215" />
              </circle>
              <circle r="3" fill="#00BCD4" filter="url(#glow)">
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M 260 200 C 290 200, 300 220, 330 220" />
              </circle>
            </>
          )}

          {/* LED indicators on panel */}
          <circle cx="170" cy="170" r="3" fill="#22c55e" filter="url(#glow)">
            {!reducedMotion && <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />}
          </circle>
          <circle cx="182" cy="170" r="3" fill="#22c55e" filter="url(#glow)" />
          <circle cx="194" cy="170" r="3" fill="#00BCD4" filter="url(#glow)">
            {!reducedMotion && <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />}
          </circle>
        </svg>

        {/* Power Source (Transformer) - Left */}
        <div className="absolute left-[6%] top-[35%] w-[16%] aspect-[0.7] rounded-lg bg-gradient-to-b from-[#2d3748] to-[#1a202c] border border-[#4a5568]/50 shadow-xl">
          {/* Cooling fins */}
          <div className="absolute inset-x-0 top-[15%] flex justify-center gap-[2px]">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-[2px] h-[70%] bg-[#4a5568]/40 rounded-full" />
            ))}
          </div>
          {/* Bushings on top */}
          <div className="absolute -top-[12%] left-[25%] w-[12%] h-[15%] rounded-t bg-[#718096]" />
          <div className="absolute -top-[12%] right-[25%] w-[12%] h-[15%] rounded-t bg-[#718096]" />
          {/* Status light */}
          <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        </div>
        <div className="absolute left-[6%] top-[52%] text-[9px] text-[#8A9AB0] font-medium tracking-wide">Power In</div>

        {/* Control Panel Cabinet - Center (Hero) */}
        <div className="absolute left-[38%] top-[22%] w-[26%] aspect-[0.65] rounded-xl bg-gradient-to-br from-[#1a2332] via-[#0f1724] to-[#1a2332] border border-[#2d3748] shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          {/* Cabinet depth/3D effect */}
          <div className="absolute -top-[6%] left-[5%] right-[5%] h-[8%] bg-gradient-to-b from-[#3d526b] to-[#2a3a4d] rounded-t-lg transform skew-x-6 origin-bottom" />
          <div className="absolute top-[5%] -right-[4%] w-[6%] bottom-[5%] bg-[#1a2332] rounded-r-lg transform skew-y-3" />

          {/* Door outline */}
          <div className="absolute inset-[6%] rounded-lg border border-[#2d3748]/60 bg-[#0d111a]/50">
            {/* Panel label */}
            <div className="absolute top-[8%] left-[10%] right-[10%] h-[10%] rounded bg-[#1a2332] border border-[#00BCD4]/20 flex items-center justify-center">
              <span className="text-[7px] text-[#00BCD4] font-mono tracking-wider">VOLTO-MCC-01</span>
            </div>

            {/* Digital display area */}
            <div className="absolute top-[25%] left-[10%] right-[10%] h-[35%] rounded bg-[#050810] border border-[#1e3a5f]/50 p-[6%]">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[6px] text-[#647C9E] uppercase">Load</span>
                <span className="text-[10px] text-white font-mono">{operationsState.load.toFixed(1)}%</span>
              </div>
              <div className="w-full h-[2px] bg-[#1e3a5f] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00BCD4] to-[#22c55e] rounded-full transition-all duration-700" style={{ width: `${operationsState.load}%` }} />
              </div>
              <div className="flex justify-between items-baseline mt-2 mb-1">
                <span className="text-[6px] text-[#647C9E] uppercase">PF</span>
                <span className="text-[9px] text-[#22c55e] font-mono">{operationsState.powerFactor.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline mt-2">
                <span className="text-[6px] text-[#647C9E] uppercase">Stage</span>
                <span className="text-[7px] text-white truncate max-w-[70%]">{activeLabel}</span>
              </div>
            </div>

            {/* Control buttons */}
            <div className="absolute bottom-[12%] left-[10%] right-[10%] flex justify-center gap-[8%]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#ef4444]/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#eab308]/80" />
            </div>
          </div>

          {/* Status LEDs above panel */}
          <div className="absolute -top-[3%] left-[20%] flex gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.8)] animate-pulse" />
            <div className="w-[6px] h-[6px] rounded-full bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
            <div className="w-[6px] h-[6px] rounded-full bg-[#00BCD4] shadow-[0_0_6px_rgba(0,188,212,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Motor/Pump - Right */}
        <div className="absolute right-[8%] top-[38%] w-[18%] aspect-square">
          {/* Motor body */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2d3748] via-[#4a5568] to-[#2d3748] border-2 border-[#4a5568]/60 shadow-xl flex items-center justify-center">
            {/* Rotating fan/shaft indicator */}
            <div
              className="w-[40%] h-[40%] rounded-full border-2 border-[#00BCD4]/40 flex items-center justify-center"
              style={{
                animation: reducedMotion ? 'none' : 'spin 3s linear infinite',
              }}
            >
              <div className="w-full h-[2px] bg-[#00BCD4]/60 absolute" />
              <div className="w-[2px] h-full bg-[#00BCD4]/60 absolute" />
            </div>
            {/* Center cap */}
            <div className="absolute w-[16%] h-[16%] rounded-full bg-[#1a202c] border border-[#4a5568]" />
          </div>
          {/* Motor base */}
          <div className="absolute -bottom-[15%] left-[15%] right-[15%] h-[20%] rounded bg-[#2d3748] border border-[#4a5568]/50" />
        </div>
        <div className="absolute right-[8%] top-[58%] text-[9px] text-[#8A9AB0] font-medium tracking-wide">Process Out</div>

        {/* Animated output pulse from motor */}
        {!reducedMotion && (
          <div className="absolute right-[5%] top-[45%] w-[30px] h-[30px] pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-[#00BCD4]/40 animate-ping" style={{ animationDuration: '2s' }} />
          </div>
        )}

        {/* Telemetry Chip - Load */}
        <div className="absolute top-[8%] left-[8%] rounded-xl border border-[#00BCD4]/30 bg-[#0a1321]/90 backdrop-blur-md px-3 py-2 shadow-lg">
          <div className="text-[8px] text-[#647C9E] uppercase tracking-wider mb-0.5">System Load</div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-mono text-white font-semibold">{operationsState.load.toFixed(1)}</span>
            <span className="text-[9px] text-[#647C9E]">%</span>
          </div>
        </div>

        {/* Telemetry Chip - Power Factor */}
        <div className="absolute top-[12%] right-[10%] rounded-xl border border-[#22c55e]/30 bg-[#0a1321]/90 backdrop-blur-md px-3 py-2 shadow-lg">
          <div className="text-[8px] text-[#647C9E] uppercase tracking-wider mb-0.5">Power Factor</div>
          <div className="flex items-baseline gap-1">
            <span className={`text-sm font-mono font-semibold ${operationsState.powerFactor >= 0.95 ? 'text-[#22c55e]' : 'text-[#eab308]'}`}>
              {operationsState.powerFactor.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Telemetry Chip - Output */}
        <div className="absolute bottom-[12%] left-[12%] rounded-xl border border-[#00BCD4]/30 bg-[#0a1321]/90 backdrop-blur-md px-3 py-2 shadow-lg">
          <div className="text-[8px] text-[#647C9E] uppercase tracking-wider mb-0.5">Power Output</div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-mono text-white font-semibold">{operationsState.outputKw}</span>
            <span className="text-[9px] text-[#647C9E]">kW</span>
            <span className={`text-[10px] ml-1 ${trendUp ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>{trendUp ? '▲' : '▼'}</span>
          </div>
        </div>

        {/* Telemetry Chip - Active Stage */}
        <div className="absolute bottom-[18%] right-[8%] rounded-xl border border-white/10 bg-[#0a1321]/90 backdrop-blur-md px-3 py-2 shadow-lg max-w-[100px]">
          <div className="text-[8px] text-[#647C9E] uppercase tracking-wider mb-0.5">Active Stage</div>
          <div className="text-[10px] text-white font-medium truncate">{activeLabel}</div>
          <div className="mt-1 w-full h-[2px] bg-[#1e3a5f] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00BCD4] rounded-full transition-all duration-500"
              style={{ width: `${((operationsState.activeStage + 1) / processStages.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Live indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e]/70" style={{ animationDuration: '2s' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
          </span>
          <span className="text-[9px] font-semibold text-[#22c55e] uppercase tracking-wider">Live System</span>
          <span className="text-[8px] text-[#647C9E] font-mono">{liveTimeLabel}</span>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
