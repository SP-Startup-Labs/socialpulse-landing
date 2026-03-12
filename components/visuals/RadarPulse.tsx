import { useEffect, useId, useMemo, useState } from 'react';

type RadarPulseProps = {
  className?: string;
  labels?: {
    top: string;
    topRight: string;
    right: string;
    bottom: string;
    bottomLeft: string;
    left: string;
  };
  compact?: boolean;
};

type AxisMotion = {
  phase: number;
  speed: number;
  amp: number;
  phase2: number;
  speed2: number;
  amp2: number;
};

const radarCenter = { x: 50, y: 50 };
const baseAxes = [
  { x: 50, y: 12 },
  { x: 79, y: 30 },
  { x: 88, y: 50 },
  { x: 50, y: 88 },
  { x: 21, y: 70 },
  { x: 12, y: 50 }
];

const axisMotion: AxisMotion[] = [
  { phase: 0.3, speed: 0.46, amp: 0.12, phase2: 1.2, speed2: 0.21, amp2: 0.05 },
  { phase: 1.4, speed: 0.39, amp: 0.11, phase2: 2.2, speed2: 0.18, amp2: 0.04 },
  { phase: 2.5, speed: 0.42, amp: 0.1, phase2: 0.6, speed2: 0.24, amp2: 0.05 },
  { phase: 3.4, speed: 0.37, amp: 0.11, phase2: 1.7, speed2: 0.2, amp2: 0.045 },
  { phase: 4.2, speed: 0.41, amp: 0.09, phase2: 2.9, speed2: 0.22, amp2: 0.045 },
  { phase: 5.1, speed: 0.35, amp: 0.1, phase2: 0.9, speed2: 0.19, amp2: 0.05 }
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function RadarPulse({ className = '', labels, compact = false }: RadarPulseProps) {
  const [time, setTime] = useState(0);
  const fillId = useId();
  const strokeId = useId();
  const sizeClass = compact ? 'max-w-[240px]' : 'max-w-[560px]';
  const labelClass = compact ? 'text-[10px] font-medium' : 'text-[11px]';
  const labelToneClass = 'uppercase tracking-[0.16em] text-[#AAB4C2] [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]';

  useEffect(() => {
    let frame = 0;
    const tick = (now: number) => {
      setTime(now / 1000);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const geometry = useMemo(() => {
    const points = baseAxes.map((axis, index) => {
      const motion = axisMotion[index];
      const scale = clamp(
        0.66 +
          Math.sin(time * motion.speed + motion.phase) * motion.amp +
          Math.sin(time * motion.speed2 + motion.phase2) * motion.amp2,
        0.45,
        0.88
      );

      return {
        x: radarCenter.x + (axis.x - radarCenter.x) * scale,
        y: radarCenter.y + (axis.y - radarCenter.y) * scale
      };
    });

    const innerPoints = points.map((point) => ({
      x: radarCenter.x + (point.x - radarCenter.x) * 0.8,
      y: radarCenter.y + (point.y - radarCenter.y) * 0.8
    }));

    return {
      points,
      polygon: points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' '),
      innerPolygon: innerPoints.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ')
    };
  }, [time]);

  return (
    <div className={`relative mx-auto aspect-square w-full ${sizeClass} overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(154,51,255,0.2),rgba(9,20,38,0.82)_68%)] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_56px_rgba(36,107,255,0.2)] ${className}`}>
      <div className="radar-aura absolute inset-[7%] rounded-full" />
      <div className="absolute inset-[11%] rounded-full border border-white/15" />
      <div className="absolute inset-[22%] rounded-full border border-white/12" />
      <div className="absolute inset-[33%] rounded-full border border-white/10" />
      <div className="absolute inset-[44%] rounded-full border border-white/10" />
      <svg
        className="pointer-events-none absolute inset-[16%] h-[68%] w-[68%]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={fillId} x1="14" y1="14" x2="86" y2="86" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2398A" stopOpacity="0.46" />
            <stop offset="0.52" stopColor="#9A33FF" stopOpacity="0.34" />
            <stop offset="1" stopColor="#14C7E5" stopOpacity="0.24" />
          </linearGradient>
          <linearGradient id={strokeId} x1="12" y1="18" x2="84" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2398A" stopOpacity="0.78" />
            <stop offset="0.46" stopColor="#9A33FF" stopOpacity="0.86" />
            <stop offset="1" stopColor="#14C7E5" stopOpacity="0.72" />
          </linearGradient>
        </defs>

        {geometry.points.map((point, index) => (
          <line key={`axis-${index}`} x1={radarCenter.x} y1={radarCenter.y} x2={point.x} y2={point.y} stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" />
        ))}

        <polygon points={geometry.innerPolygon} stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" fill="none" />
        <polygon points={geometry.polygon} fill={`url(#${fillId})`} stroke={`url(#${strokeId})`} strokeWidth="1.3" />
      </svg>
      <div className="radar-center-pulse absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9A33FF]/70" />
      <span className="radar-particle radar-particle-a absolute left-[22%] top-[26%]" />
      <span className="radar-particle radar-particle-b absolute right-[22%] top-[32%]" />
      <span className="radar-particle radar-particle-c absolute left-[30%] bottom-[24%]" />
      <span className="radar-particle radar-particle-d absolute right-[30%] bottom-[20%]" />
      <span className="radar-particle radar-particle-e absolute left-[44%] top-[14%]" />
      <span className="radar-particle radar-particle-f absolute right-[42%] bottom-[14%]" />
      {labels ? (
        <>
          <p className={`absolute left-1/2 top-4 -translate-x-1/2 ${labelToneClass} ${labelClass}`}>{labels.top}</p>
          <p className={`absolute right-[16%] top-[18%] ${labelToneClass} ${labelClass}`}>{labels.topRight}</p>
          <p className={`absolute right-5 top-1/2 -translate-y-1/2 ${labelToneClass} ${labelClass}`}>{labels.right}</p>
          <p className={`absolute bottom-4 left-1/2 -translate-x-1/2 ${labelToneClass} ${labelClass}`}>{labels.bottom}</p>
          <p className={`absolute left-[16%] bottom-[18%] ${labelToneClass} ${labelClass}`}>{labels.bottomLeft}</p>
          <p className={`absolute left-5 top-1/2 -translate-y-1/2 ${labelToneClass} ${labelClass}`}>{labels.left}</p>
        </>
      ) : null}
    </div>
  );
}
