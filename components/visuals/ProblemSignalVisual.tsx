'use client';

const SIGNAL_MORPH_DURATION = '6s';

type ProblemSignalVisualProps = {
  title: string;
  items: Array<{
    title: string;
    detail: string;
  }>;
};

function TrustVolatilityChart() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 164 64" className="mt-2 w-full" aria-hidden="true">
        <path
          d="M2 20H162 M2 40H162 M2 60H162"
          stroke="rgba(255,255,255,0.07)"
        />

        <path
          d="M2 48 C22 40 34 43 48 34 C64 24 74 32 90 23 C106 14 120 22 136 16 C148 12 156 14 162 10"
          fill="none"
          stroke="#246BFF"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="1;1;0;0;1"
            keyTimes="0;0.01;0.38;0.84;1"
            dur={SIGNAL_MORPH_DURATION}
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M2 55 C22 54 36 47 52 49 C68 51 80 44 96 47 C114 49 128 39 142 42 C150 44 157 39 162 37"
          fill="none"
          stroke="#F2398A"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="1;1;0;0;1"
            keyTimes="0;0.05;0.43;0.84;1"
            dur={SIGNAL_MORPH_DURATION}
            repeatCount="indefinite"
          />
        </path>

        {[
          [2, 48],
          [48, 34],
          [90, 23],
          [136, 16],
          [162, 10],
        ].map(([x, y], index) => {
          const appearsAt = 0.08 + index * 0.07;

          return (
            <circle
              key={`trust-${index}`}
              cx={x}
              cy={y}
              r="2.4"
              fill="#246BFF"
              stroke="white"
              strokeWidth="0.8"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0;1;1;0"
                keyTimes={`0;${appearsAt};${appearsAt + 0.03};0.84;1`}
                dur={SIGNAL_MORPH_DURATION}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}

        {[
          [2, 55],
          [52, 49],
          [96, 47],
          [142, 42],
          [162, 37],
        ].map(([x, y], index) => {
          const appearsAt = 0.12 + index * 0.07;

          return (
            <circle
              key={`skepticism-${index}`}
              cx={x}
              cy={y}
              r="2.4"
              fill="#F2398A"
              stroke="white"
              strokeWidth="0.8"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0;1;1;0"
                keyTimes={`0;${appearsAt};${appearsAt + 0.03};0.84;1`}
                dur={SIGNAL_MORPH_DURATION}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </svg>

      <div className="mt-1 flex gap-3 text-[9px] text-white/60">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#246BFF]" />
          Trust
        </span>

        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F2398A]" />
          Skepticism
        </span>
      </div>
    </div>
  );
}

function renderProblemDriverSignal(index: number) {
  const shellClassName =
    'relative h-10 w-11 overflow-hidden rounded-[14px] border border-white/[0.06] bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]';

  switch (index) {
    case 0:
      return (
        <div className={shellClassName}>
          <span className="absolute inset-[11px] rounded-full bg-[radial-gradient(circle,rgba(242,57,138,0.56)_0%,rgba(154,51,255,0.24)_58%,rgba(154,51,255,0)_100%)]" />
          <span className="absolute inset-[6px] rounded-full border border-white/[0.1]" />
          <span className="absolute inset-[2px] rounded-full border border-[#9A33FF]/12" />
        </div>
      );

    case 1:
      return (
        <div className={shellClassName}>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 44 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 29 C10 27, 15 22, 21 21 C27 20, 31 24, 40 12"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M4 32 C10 31, 15 28, 21 25 C28 22, 33 15, 40 14"
              stroke="#14C7E5"
              strokeOpacity="0.78"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M4 25 C9 24, 14 20, 19 18 C25 16, 31 18, 40 9"
              stroke="#9A33FF"
              strokeOpacity="0.5"
              strokeWidth="1.35"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    case 2:
      return (
        <div className={shellClassName}>
          <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#14C7E5]/82 shadow-[0_0_18px_rgba(20,199,229,0.28)]" />
          <span className="absolute left-[27%] top-[28%] h-1.5 w-1.5 rounded-full bg-white/72" />
          <span className="absolute right-[24%] top-[34%] h-1.5 w-1.5 rounded-full bg-[#9A33FF]/75" />
          <span className="absolute left-[33%] bottom-[23%] h-1.5 w-1.5 rounded-full bg-[#F2398A]/72" />
          <span className="absolute left-[34%] top-[33%] h-px w-4 rotate-[30deg] bg-white/12" />
          <span className="absolute left-1/2 top-[45%] h-px w-3 -translate-x-1/2 rotate-[-22deg] bg-white/12" />
          <span className="absolute left-[42%] top-[58%] h-px w-3 rotate-[58deg] bg-white/12" />
        </div>
      );

    default:
      return <TrustVolatilityChart />;
  }
}

export default function ProblemSignalVisual({
  title,
  items,
}: ProblemSignalVisualProps) {
  return (
    <section className="grid grid-rows-[auto_auto] gap-3 lg:col-start-3 lg:w-full lg:max-w-[29.5rem] lg:justify-self-end">
      <p className="text-right text-xs uppercase tracking-[0.18em] text-[#AAB4C2]">
        {title}
      </p>

      <div className="relative isolate grid w-full gap-x-3.5 gap-y-3.5 before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:z-0 before:h-[54%] before:w-[52%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-[radial-gradient(circle,rgba(245,185,92,0.15)_0%,rgba(245,185,92,0.075)_34%,rgba(129,112,255,0.035)_56%,rgba(245,185,92,0)_74%)] before:opacity-[0.12] before:blur-3xl before:content-[''] sm:grid-cols-2 lg:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="relative z-[2] flex min-h-[6.875rem] w-full flex-col items-end rounded-2xl border border-white/[0.065] bg-[linear-gradient(160deg,rgba(255,247,235,0.035),rgba(255,255,255,0.052)_22%,rgba(255,255,255,0.02)_100%)] px-4 py-[18px] text-right shadow-[inset_0_1px_0_rgba(255,244,220,0.045),inset_-1px_0_0_rgba(255,213,146,0.03),0_14px_28px_rgba(0,0,0,0.15),0_0_22px_rgba(58,49,255,0.07),0_0_18px_rgba(247,179,92,0.025)]"
          >
            {renderProblemDriverSignal(index)}

            <p className="mt-4 w-full text-right text-sm font-semibold tracking-tight text-white">
              {item.title}
            </p>

            {item.detail ? (
              <p className="mt-1.5 w-full text-right text-sm leading-snug text-[#AEBAC9]">
                {item.detail}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}