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

const outputIcons = [Activity, Radar, TrendingUp] as const;
const outputTones = ['pink', 'purple', 'blue'] as const;
const outputSparklines = ['smooth', 'step', 'spike'] as const;

const particles = [
  { top: 10, size: 5, endY: -18, delay: 0, duration: 8.2, opacity: 0.45 },
  { top: 18, size: 6, endY: -12, delay: 0.9, duration: 9.1, opacity: 0.5 },
  { top: 28, size: 4, endY: -8, delay: 0.4, duration: 8.6, opacity: 0.42 },
  { top: 38, size: 7, endY: 2, delay: 1.7, duration: 10.2, opacity: 0.52 },
  { top: 48, size: 4, endY: 6, delay: 0.2, duration: 7.7, opacity: 0.38 },
  { top: 56, size: 5, endY: 11, delay: 1.1, duration: 9.6, opacity: 0.46 },
  { top: 68, size: 6, endY: 15, delay: 2.1, duration: 10.4, opacity: 0.55 },
  { top: 78, size: 4, endY: 19, delay: 0.7, duration: 8.8, opacity: 0.4 },
  { top: 86, size: 5, endY: 16, delay: 1.4, duration: 9.3, opacity: 0.44 }
];

export function SignalEngine({ labels }: { labels: SignalEngineLabels }) {
  const linkGradientId = useId();
  const linkSoftGradientId = useId();

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-5 translate-x-8 translate-y-8 rotate-[1.5deg] rounded-[34px] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] opacity-60 blur-[1px] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(58,49,255,0.2)]" />
      <article className="hero-shell double-layer-panel relative overflow-hidden p-5 sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_36%,rgba(154,51,255,0.18),rgba(9,20,38,0)_52%)]" />
        <div className="hero-signal-trails pointer-events-none absolute inset-0" />

        <div className="relative h-[400px] sm:h-[430px]">
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
            <path d="M58 214 C120 188, 178 188, 238 214" stroke={`url(#${linkGradientId})`} strokeWidth="1.6" />
            <path d="M238 214 C292 210, 340 166, 392 136 C430 114, 462 106, 518 106" stroke={`url(#${linkGradientId})`} strokeWidth="1.6" />
            <path d="M238 214 C300 222, 350 216, 518 212" stroke={`url(#${linkSoftGradientId})`} strokeWidth="1.4" />
            <path d="M238 214 C296 220, 344 252, 394 286 C432 310, 464 320, 518 320" stroke={`url(#${linkGradientId})`} strokeWidth="1.6" />
          </svg>

          <div className="absolute left-1 top-3 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#AAB4C2]">
            {labels.title}
          </div>

          <div className="absolute left-3 top-[20%] h-[50%] w-[30%] sm:left-5">
            {particles.map((particle, index) => (
              <span
                key={`${particle.top}-${index}`}
                className="engine-particle"
                style={
                  {
                    top: `${particle.top}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    '--engine-delay': `${particle.delay}s`,
                    '--engine-duration': `${particle.duration}s`,
                    '--engine-end-y': `${particle.endY}px`,
                    '--engine-opacity': particle.opacity
                  } as CSSProperties
                }
              />
            ))}
            <p className="absolute -bottom-9 left-0 text-[10px] uppercase tracking-[0.16em] text-[#AAB4C2]">{labels.input}</p>
          </div>

          <div className="absolute left-[43%] top-[48%] -translate-x-1/2 -translate-y-1/2 sm:left-[44%]">
            <div className="engine-core-breath relative flex h-32 w-32 items-center justify-center rounded-full border border-white/18 bg-[radial-gradient(circle,rgba(242,57,138,0.32)_0%,rgba(154,51,255,0.23)_40%,rgba(36,107,255,0.2)_70%,rgba(9,20,38,0.24)_100%)] sm:h-36 sm:w-36">
              <div className="absolute inset-[7px] rounded-full border border-white/20" />
              <div className="absolute inset-[16px] rounded-full border border-white/20" />
              <svg
                className="pointer-events-none absolute inset-[18px] h-[calc(100%-36px)] w-[calc(100%-36px)]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="41" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 4" />
                <path className="engine-pulse-line" d="M10 50 C18 44, 26 58, 34 50 C42 42, 48 56, 56 50 C64 44, 72 56, 90 50" stroke="#14C7E5" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90">Core</span>
            </div>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-[#AAB4C2]">{labels.core}</p>
          </div>

          <div className="absolute inset-x-2 bottom-12 grid grid-cols-3 gap-2 sm:inset-x-auto sm:bottom-auto sm:right-1 sm:top-14 sm:w-[188px] sm:grid-cols-1 sm:gap-3">
            {labels.outputs.map((output, index) => (
              <article
                key={output}
                className="engine-output-card rounded-xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] px-2.5 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.35),0_0_30px_rgba(58,49,255,0.18)] backdrop-blur sm:rounded-2xl sm:px-3.5 sm:py-2.5"
              >
                <div className="flex items-center gap-2">
                  <GradientIcon icon={outputIcons[index]} tone={outputTones[index]} className="hidden h-7 w-7 sm:inline-flex" size={11} />
                  <p className="text-[10px] font-medium tracking-tight text-white sm:text-sm">{output}</p>
                </div>
                <SignalSparkline tone={outputTones[index]} variant={outputSparklines[index]} className="mt-1.5 h-4 w-full sm:mt-2 sm:h-5" />
              </article>
            ))}
          </div>

          <div className="absolute inset-x-3 bottom-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur">
            <p className="text-center text-[9px] uppercase tracking-[0.14em] text-[#AAB4C2]">
              {labels.input} <span className="text-white/35">{'->'}</span> {labels.core} <span className="text-white/35">{'->'}</span> {labels.pressure}{' '}
              <span className="text-white/35">{'->'}</span> {labels.index}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
