import { useId } from 'react';

type SparkVariant = 'smooth' | 'step' | 'spike';

type SignalSparklineProps = {
  className?: string;
  tone?: 'pink' | 'purple' | 'blue' | 'cyan';
  variant?: SparkVariant;
};

const toneMap = {
  pink: ['#F2398A', '#9A33FF'],
  purple: ['#9A33FF', '#3A31FF'],
  blue: ['#3A31FF', '#246BFF'],
  cyan: ['#246BFF', '#14C7E5']
} as const;

const pathMap: Record<SparkVariant, string> = {
  smooth: 'M2 22 C8 20, 12 15, 18 16 C24 18, 28 10, 34 11 C40 12, 44 6, 50 8 C56 10, 60 6, 66 7',
  step: 'M2 22 L12 22 L12 18 L22 18 L22 14 L32 14 L32 9 L42 9 L42 7 L52 7 L52 6 L66 6',
  spike: 'M2 21 C9 20, 14 19, 21 18 C28 17, 33 16, 40 15 C44 14, 47 4, 50 12 C53 19, 58 13, 66 10'
};

export function SignalSparkline({ className = '', tone = 'purple', variant = 'smooth' }: SignalSparklineProps) {
  const gradientId = useId();
  const [start, end] = toneMap[tone];

  return (
    <svg
      className={className}
      width="68"
      height="26"
      viewBox="0 0 68 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="2" y1="2" x2="66" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor={start} />
          <stop offset="1" stopColor={end} />
        </linearGradient>
      </defs>
      <path d="M2 24 H66" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <path d={pathMap[variant]} stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
