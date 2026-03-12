import { Activity, Radar, TrendingUp } from 'lucide-react';
import { type CSSProperties, useId } from 'react';
import { GradientIcon } from './GradientIcon';
import { SignalSparkline } from './SignalSparkline';

type SignalEngineLabels = {
  title: string;
  input: string;
  core: string;
  pressure: string;
  index: string;
  outputs: [string, string, string];
};

const outputTones = ['pink', 'purple', 'blue'] as const;
const outputSparklines = ['smooth', 'step', 'spike'] as const;

const outputSignalIcons = [Radar, Activity, TrendingUp] as const;
const inputParticles = Array.from({ length: 44 }, (_, index) => {
  const row = index % 11;
  const lane = Math.floor(index / 11);
  const top = 4 + row * 8.6 + (lane % 2 === 0 ? 0 : 1.8);
  const left = 2 + lane * 9.4 + (row % 3) * 1.15;
  const tier = index % 9;
  const size = tier === 0 ? 7.2 : tier <= 2 ? 5.7 : tier <= 5 ? 4.2 : 2.8;
  const duration = 6 + (index % 7) * 0.48;
  const delay = (index % 8) * 0.36;
  const opacity = tier === 0 ? 0.96 : tier <= 2 ? 0.78 : 0.38 + (index % 4) * 0.12;
  const glow = tier === 0 ? 24 : tier <= 2 ? 18 : 10 + (index % 3) * 3;
  const targetX = 158 + lane * 12 + (row % 4) * 2.4;
  const targetY = (44 - top) * 1.22;
  const tone = ['#14C7E5', '#9A33FF', '#F2398A'][index % 3];
  return { top, left, size, duration, delay, opacity, glow, targetX, targetY, tone };
});

function MiniRadarSignal({ className = '' }: { className?: string }) {
  const fillId = useId();
  const strokeId = useId();

  return (
    <div className={`engine-mini-radar ${className}`}>
      <span className="engine-mini-radar-pulse" />
      <svg
        className="h-full w-full"
        viewBox="0 0 86 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={fillId} x1="10" y1="10" x2="78" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2398A" stopOpacity="0.3" />
            <stop offset="0.55" stopColor="#9A33FF" stopOpacity="0.26" />
            <stop offset="1" stopColor="#14C7E5" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={strokeId} x1="8" y1="10" x2="76" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2398A" stopOpacity="0.78" />
            <stop offset="0.45" stopColor="#9A33FF" stopOpacity="0.86" />
            <stop offset="1" stopColor="#14C7E5" stopOpacity="0.82" />
          </linearGradient>
        </defs>

        <polygon points="43,7 66,18 72,31 56,46 30,46 14,31 20,18" className="engine-mini-radar-grid" />
        <polygon points="43,13 60,21 64,31 53,41 33,41 22,31 26,21" className="engine-mini-radar-grid" />
        <polygon points="43,19 54,24 57,31 50,36 36,36 29,31 32,24" className="engine-mini-radar-grid" />

        <line x1="43" y1="31" x2="43" y2="8" className="engine-mini-radar-axis" />
        <line x1="43" y1="31" x2="66" y2="18" className="engine-mini-radar-axis" />
        <line x1="43" y1="31" x2="72" y2="31" className="engine-mini-radar-axis" />
        <line x1="43" y1="31" x2="56" y2="46" className="engine-mini-radar-axis" />
        <line x1="43" y1="31" x2="30" y2="46" className="engine-mini-radar-axis" />
        <line x1="43" y1="31" x2="14" y2="31" className="engine-mini-radar-axis" />

        <polygon
          points="43,13 57,21 61,32 50,41 34,39 27,30"
          className="engine-mini-radar-shape"
          fill={`url(#${fillId})`}
          stroke={`url(#${strokeId})`}
        />
        <circle cx="43" cy="31" r="2" className="engine-mini-radar-center" />
      </svg>
    </div>
  );
}

export function SignalEngine({ labels }: { labels: SignalEngineLabels }) {
  const linkGradientId = useId();
  const linkSoftGradientId = useId();
  const outputPathTopId = useId();
  const outputPathMidId = useId();
  const outputPathBottomId = useId();

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-4 translate-x-5 translate-y-5 rotate-[1.5deg] rounded-[34px] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] opacity-60 blur-[1px] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(58,49,255,0.2)] sm:inset-5 sm:translate-x-8 sm:translate-y-8" />
      <article className="hero-shell double-layer-panel relative overflow-hidden p-4 sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_36%,rgba(154,51,255,0.18),rgba(9,20,38,0)_52%)]" />
        <div className="hero-signal-trails pointer-events-none absolute inset-0" />

        <div className="relative h-[404px] sm:h-[430px]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 560 430"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={linkGradientId} x1="70" y1="210" x2="520" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="#14C7E5" stopOpacity="0.1" />
                <stop offset="0.45" stopColor="#9A33FF" stopOpacity="0.75" />
                <stop offset="1" stopColor="#246BFF" stopOpacity="0.32" />
              </linearGradient>
              <linearGradient id={linkSoftGradientId} x1="70" y1="210" x2="520" y2="260" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2398A" stopOpacity="0.1" />
                <stop offset="0.55" stopColor="#9A33FF" stopOpacity="0.35" />
                <stop offset="1" stopColor="#14C7E5" stopOpacity="0.12" />
              </linearGradient>
            </defs>
            <path className="engine-input-link" d="M58 112 C122 72, 174 156, 246 202" stroke={`url(#${linkSoftGradientId})`} strokeWidth="1.2" />
            <path className="engine-input-link-soft" d="M56 200 C128 164, 178 196, 246 206" stroke={`url(#${linkGradientId})`} strokeWidth="1.4" />
            <path className="engine-input-link" d="M54 286 C126 320, 176 248, 246 212" stroke={`url(#${linkSoftGradientId})`} strokeWidth="1.2" />

            <path
              id={outputPathTopId}
              className="engine-output-beam"
              d="M246 206 C300 190, 350 136, 518 106"
              stroke={`url(#${linkGradientId})`}
              strokeWidth="1.8"
            />
            <path
              id={outputPathMidId}
              className="engine-output-beam-soft"
              d="M246 206 C302 212, 352 210, 518 212"
              stroke={`url(#${linkSoftGradientId})`}
              strokeWidth="1.5"
            />
            <path
              id={outputPathBottomId}
              className="engine-output-beam"
              d="M246 206 C302 226, 350 284, 518 320"
              stroke={`url(#${linkGradientId})`}
              strokeWidth="1.8"
            />

            <circle className="engine-output-tracer" r="2.1" fill="#14C7E5">
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.2;0.8;1" dur="4.4s" begin="0.2s" repeatCount="indefinite" />
              <animateMotion dur="4.4s" begin="0.2s" rotate="auto" repeatCount="indefinite">
                <mpath href={`#${outputPathTopId}`} />
              </animateMotion>
            </circle>
            <circle className="engine-output-tracer" r="2" fill="#9A33FF">
              <animate attributeName="opacity" values="0;0.88;0.88;0" keyTimes="0;0.22;0.8;1" dur="4.6s" begin="1.05s" repeatCount="indefinite" />
              <animateMotion dur="4.6s" begin="1.05s" rotate="auto" repeatCount="indefinite">
                <mpath href={`#${outputPathMidId}`} />
              </animateMotion>
            </circle>
            <circle className="engine-output-tracer" r="2.1" fill="#F2398A">
              <animate attributeName="opacity" values="0;0.86;0.86;0" keyTimes="0;0.2;0.82;1" dur="4.8s" begin="1.8s" repeatCount="indefinite" />
              <animateMotion dur="4.8s" begin="1.8s" rotate="auto" repeatCount="indefinite">
                <mpath href={`#${outputPathBottomId}`} />
              </animateMotion>
            </circle>
          </svg>

          <div className="absolute left-1.5 top-2 rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-[#AAB4C2] sm:left-1 sm:top-3 sm:px-3 sm:text-[10px]">
            {labels.title}
          </div>

          <div className="absolute left-1.5 top-[17%] h-[56%] w-[39%] sm:left-4 sm:w-[34%]">
            <div className="engine-input-field absolute inset-0 rounded-2xl" />
            {inputParticles.map((particle, index) => (
              <span
                key={`particle-${index}`}
                className={`engine-input-particle ${index > 19 ? 'hidden sm:block' : ''}`}
                style={
                  {
                    top: `${particle.top}%`,
                    left: `${particle.left}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    '--engine-delay': `${particle.delay}s`,
                    '--engine-duration': `${particle.duration}s`,
                    '--engine-target-x': `${particle.targetX}px`,
                    '--engine-target-y': `${particle.targetY}px`,
                    '--engine-target-x-mid': `${(particle.targetX * 0.55).toFixed(2)}px`,
                    '--engine-target-y-mid': `${(particle.targetY * 0.52).toFixed(2)}px`,
                    '--engine-target-x-near': `${(particle.targetX * 0.96).toFixed(2)}px`,
                    '--engine-target-y-near': `${(particle.targetY * 0.92).toFixed(2)}px`,
                    '--engine-opacity': particle.opacity,
                    '--engine-glow': `${particle.glow}px`,
                    '--engine-tone': particle.tone
                  } as CSSProperties
                }
              />
            ))}
            <p className="absolute left-1.5 top-1.5 max-w-[90%] rounded-full border border-white/12 bg-black/25 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em] text-[#AAB4C2] sm:hidden">
              {labels.input}
            </p>
            <p className="absolute -bottom-9 left-0 hidden text-[10px] uppercase tracking-[0.16em] text-[#AAB4C2] sm:block">{labels.input}</p>
          </div>

          <div className="absolute left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2 sm:left-[44%] sm:top-[48%]">
            <div className="engine-core-breath relative flex h-28 w-28 items-center justify-center rounded-full border border-white/18 bg-[radial-gradient(circle,rgba(242,57,138,0.4)_0%,rgba(154,51,255,0.34)_34%,rgba(36,107,255,0.24)_62%,rgba(9,20,38,0.28)_100%)] sm:h-36 sm:w-36">
              <span className="engine-core-halo engine-core-halo-a" />
              <span className="engine-core-halo engine-core-halo-b" />
              <div className="absolute inset-[6px] rounded-full border border-white/20 sm:inset-[7px]" />
              <div className="absolute inset-[13px] rounded-full border border-white/16 sm:inset-[16px]" />
              <span className="engine-core-singularity" />
              <span className="engine-core-orbit engine-core-orbit-a" />
              <span className="engine-core-orbit engine-core-orbit-b" />
              <svg
                className="pointer-events-none absolute inset-[16px] h-[calc(100%-32px)] w-[calc(100%-32px)] sm:inset-[18px] sm:h-[calc(100%-36px)] sm:w-[calc(100%-36px)]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="41" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 4" />
                <path className="engine-pulse-line" d="M10 50 C18 44, 26 58, 34 50 C42 42, 48 56, 56 50 C64 44, 72 56, 90 50" stroke="#14C7E5" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/92 sm:text-[10px]">Core</span>
            </div>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-[#AAB4C2]">{labels.core}</p>
          </div>

          <div className="absolute bottom-5 right-1.5 top-12 grid w-[44%] grid-rows-3 gap-2 sm:bottom-auto sm:right-1 sm:top-14 sm:w-[188px] sm:grid-cols-1 sm:grid-rows-none sm:gap-3">
            {labels.outputs.map((output, index) => (
              <article
                key={output}
                className="engine-output-card h-full rounded-xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] px-2 py-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.35),0_0_30px_rgba(58,49,255,0.18)] backdrop-blur sm:rounded-2xl sm:px-3.5 sm:py-2.5"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <GradientIcon icon={outputSignalIcons[index]} tone={outputTones[index]} className="hidden h-7 w-7 sm:inline-flex" size={11} />
                  <p className="max-h-[2.35em] overflow-hidden text-[9px] font-medium leading-[1.15] tracking-tight text-white sm:max-h-none sm:text-sm sm:leading-tight">{output}</p>
                </div>
                {index === 0 ? (
                  <MiniRadarSignal className="mt-1 h-3.5 w-full sm:mt-2 sm:h-7" />
                ) : (
                  <SignalSparkline tone={outputTones[index]} variant={outputSparklines[index]} className="mt-1 h-3 w-full sm:mt-2 sm:h-5" />
                )}
              </article>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
