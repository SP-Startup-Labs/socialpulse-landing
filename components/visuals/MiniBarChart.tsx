import { useId } from 'react';

type MiniBarChartProps = {
  className?: string;
  bars?: number[];
  tone?: 'pink' | 'purple' | 'blue' | 'cyan';
};

const toneMap = {
  pink: ['#F2398A', '#9A33FF'],
  purple: ['#9A33FF', '#3A31FF'],
  blue: ['#3A31FF', '#246BFF'],
  cyan: ['#246BFF', '#14C7E5']
} as const;

export function MiniBarChart({ className = '', bars = [4, 7, 5, 9, 6, 8], tone = 'blue' }: MiniBarChartProps) {
  const gradientId = useId();
  const [start, end] = toneMap[tone];
  const max = Math.max(...bars, 10);

  return (
    <svg
      className={className}
      width="80"
      height="34"
      viewBox="0 0 80 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="80" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor={start} />
          <stop offset="1" stopColor={end} />
        </linearGradient>
      </defs>
      <path d="M2 31 H78" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {bars.map((bar, index) => {
        const h = Math.round((bar / max) * 24);
        const x = 5 + index * 12;
        const y = 30 - h;
        return <rect key={`${bar}-${index}`} x={x} y={y} width="8" height={h} rx="2" fill={`url(#${gradientId})`} />;
      })}
    </svg>
  );
}
