type ProblemSignalFieldProps = {
  title: string;
  labels: string[];
  className?: string;
};

const fallbackLabels = [
  'Emotional Intensity',
  'Narrative Pressure',
  'Audience Activation',
  'Trust Volatility'
];

export function ProblemSignalField({ title, labels, className = '' }: ProblemSignalFieldProps) {
  const signalLabels = fallbackLabels.map((fallback, index) => labels[index] ?? fallback);

  return (
    <div className={`space-y-3 ${className}`}>
      <p className="text-xs uppercase tracking-[0.18em] text-[#DCE2EC]">{title}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="problem-signal-tile rounded-2xl px-3 py-3.5">
          <div className="mb-2 flex items-center justify-center">
            <div className="relative h-11 w-11">
              <span className="problem-intensity-halo absolute inset-0 rounded-full" />
              <span className="problem-intensity-orb absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            </div>
          </div>
          <p className="text-center text-[11px] font-medium tracking-tight text-white/92">{signalLabels[0]}</p>
        </article>

        <article className="problem-signal-tile rounded-2xl px-3 py-3.5">
          <div className="mb-2 flex items-center justify-center">
            <div className="problem-pressure-shell relative h-10 w-10 overflow-hidden rounded-xl border border-white/12 bg-white/[0.02]">
              <div className="problem-pressure-fill absolute inset-x-1 bottom-1 rounded-md bg-[linear-gradient(180deg,rgba(20,199,229,0.85),rgba(154,51,255,0.95),rgba(242,57,138,0.88))]" />
              <span className="problem-pressure-cap absolute left-1 right-1 h-[2px] rounded-full bg-white/70" />
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path className="problem-pressure-curve" d="M3 30 C10 27, 16 21, 22 18 C27 15, 32 12, 37 10" stroke="#14C7E5" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <p className="text-center text-[11px] font-medium tracking-tight text-white/92">{signalLabels[1]}</p>
        </article>

        <article className="problem-signal-tile rounded-2xl px-3 py-3.5">
          <div className="mb-2 flex items-center justify-center">
            <div className="relative h-10 w-10">
              <span className="problem-activation-core absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
              <span className="problem-activation-ring problem-activation-ring-a absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#14C7E5]/55" />
              <span className="problem-activation-ring problem-activation-ring-b absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9A33FF]/50" />
              <span className="problem-activation-ring problem-activation-ring-c absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F2398A]/45" />
              <span className="problem-activation-dot problem-activation-dot-a absolute left-[18%] top-[20%] h-1 w-1 rounded-full bg-[#14C7E5]/80" />
              <span className="problem-activation-dot problem-activation-dot-b absolute right-[16%] top-[30%] h-1 w-1 rounded-full bg-[#9A33FF]/75" />
              <span className="problem-activation-dot problem-activation-dot-c absolute left-[26%] bottom-[18%] h-1 w-1 rounded-full bg-[#F2398A]/75" />
            </div>
          </div>
          <p className="text-center text-[11px] font-medium tracking-tight text-white/92">{signalLabels[2]}</p>
        </article>

        <article className="problem-signal-tile rounded-2xl px-3 py-3.5">
          <div className="mb-2 flex items-center justify-center">
            <svg className="h-10 w-12" viewBox="0 0 78 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2 30 H76" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
              <path
                className="problem-volatility-line-jitter"
                d="M2 24 C8 26, 12 12, 18 14 C24 16, 29 28, 36 23 C43 18, 47 10, 54 14 C61 18, 67 26, 76 20"
                stroke="#9A33FF"
                strokeOpacity="0.4"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="3 3"
              />
              <path
                className="problem-volatility-line"
                d="M2 24 C8 26, 12 12, 18 14 C24 16, 29 28, 36 23 C43 18, 47 10, 54 14 C61 18, 67 26, 76 20"
                stroke="#14C7E5"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                className="problem-volatility-line-soft"
                d="M2 24 C8 26, 12 12, 18 14 C24 16, 29 28, 36 23 C43 18, 47 10, 54 14 C61 18, 67 26, 76 20"
                stroke="#F2398A"
                strokeOpacity="0.35"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-center text-[11px] font-medium tracking-tight text-white/92">{signalLabels[3]}</p>
        </article>
      </div>
    </div>
  );
}
