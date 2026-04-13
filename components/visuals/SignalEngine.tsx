import { Activity, ArrowDownRight, ArrowUpRight, Radar, TrendingUp } from 'lucide-react';
import { type CSSProperties, type ReactNode, useEffect, useId, useMemo, useRef, useState } from 'react';
import { GradientIcon } from './GradientIcon';

type SignalEngineLabels = {
  title: string;
  input: string;
  core: string;
  pressure: string;
  index: string;
  outputs: {
    signalVelocity: string;
    predominantNarratives: string;
    emotionalResonance: string;
  };
};

type SocialEngineTabletLabels = {
  title: string;
  input: string;
  core: string;
  outputs: SignalEngineLabels['outputs'];
};

type RankedEmotion = {
  label: string;
  score: number;
  tone: 'cyan' | 'violet' | 'pink';
};

type NarrativeLine = {
  emotion: string;
  direction: 'up' | 'down';
};

type RankedNarrative = {
  label: string;
  score: number;
  direction: 'up' | 'down' | 'steady';
};

type MomentumSignal = {
  emotion: string;
  delta: number;
  window: string;
};

type MomentumPanelFrame = {
  label: string;
  emotion: string;
  window: string;
  delta: number;
  linePath: string;
  fillPath: string;
  markerX: number;
  markerY: number;
};

type IntensityPoint = {
  emotion: string;
  x: number;
  y: number;
  baseRadius: number;
  phase: number;
  tone: 'cyan' | 'violet' | 'pink';
};

const outputTones = ['pink', 'purple', 'blue'] as const;
const outputSignalIcons = [Radar, Activity, TrendingUp] as const;

const inputParticles = Array.from({ length: 660 }, (_, index) => {
  const columns = 15;
  const rows = Math.ceil(660 / columns);
  const row = Math.floor(index / columns);
  const column = index % columns;
  const fieldWidth = 178;
  const fieldHeight = 238;
  const engineCenterX = 214;
  const engineCenterY = 72;
  const verticalProgress = row / Math.max(1, rows - 1);
  const top = Math.min(95, Math.max(4, 4 + verticalProgress * 88 + Math.sin((column + 1) * 1.18 + row * 0.42) * 1.9 + Math.cos(index * 0.37) * 0.9));
  const left = Math.min(94, Math.max(3, 4 + column * 6.05 + (row % 2) * 1.65 + Math.cos(row * 0.55 + column * 0.9) * 2.1));
  const startX = (left / 100) * fieldWidth;
  const startY = (top / 100) * fieldHeight;
  const tier = index % 13;
  const size = tier === 0 ? 6.4 : tier <= 3 ? 4.8 : tier <= 8 ? 3.2 : 1.9;
  const duration = 5 + (index % 11) * 0.34 + (column % 2) * 0.24;
  const delay = (index % 18) * 0.14;
  const opacity = tier === 0 ? 0.94 : tier <= 3 ? 0.72 : tier <= 8 ? 0.4 : 0.2;
  const glow = tier === 0 ? 22 : tier <= 3 ? 15 : tier <= 8 ? 9 : 6;
  const targetX = engineCenterX - startX + Math.sin(index * 0.17) * 2.2;
  const targetY = engineCenterY - startY + Math.cos(index * 0.23) * 2.4;
  const curveMidX = targetX * 0.34 + (column - (columns - 1) / 2) * 0.42;
  const curveMidY = targetY * 0.16 + ((row % 6) - 2.5) * 4.6;
  const curveNearX = targetX * 0.72 + Math.sin(index * 0.41) * 8.4;
  const curveNearY = targetY * 0.72 + Math.cos(index * 0.39) * 8.8;
  const absorbX = targetX * 0.92 + Math.sin(index * 0.63) * 3.2;
  const absorbY = targetY * 0.92 + Math.cos(index * 0.57) * 3.2;
  const tone = ['#14C7E5', '#9A33FF', '#F2398A', '#14C7E5'][index % 4];
  return {
    top,
    left,
    size,
    duration,
    delay,
    opacity,
    glow,
    targetX,
    targetY,
    curveMidX,
    curveMidY,
    curveNearX,
    curveNearY,
    absorbX,
    absorbY,
    tone
  };
});

const socialEngineParticles = Array.from({ length: 560 }, (_, index) => {
  const fieldWidth = 246;
  const fieldHeight = 234;
  const engineCenterX = 302;
  const engineCenterY = 114;
  const randomA = (Math.sin(index * 12.9898 + 4.1414) + 1) / 2;
  const randomB = (Math.cos(index * 78.233 + 2.357) + 1) / 2;
  const randomC = (Math.sin(index * 37.719 + 0.618) + 1) / 2;
  const randomD = (Math.cos(index * 19.113 + 1.732) + 1) / 2;
  const left = Math.min(97, Math.max(2, 3 + randomA * 92 + (randomC - 0.5) * 8.2));
  const top = Math.min(96, Math.max(4, 5 + randomB * 86 + (randomD - 0.5) * 7.4));
  const startX = (left / 100) * fieldWidth;
  const startY = (top / 100) * fieldHeight;
  const signalStrength = Math.pow(randomC, 1.65);
  const size = 1.15 + signalStrength * 6.5;
  const duration = 6.6 + randomB * 3.6;
  const delay = (index % 24) * 0.16;
  const opacity = 0.06 + signalStrength * 0.78;
  const glow = 6 + signalStrength * 30;
  const driftX = (randomA - 0.5) * 9.4;
  const driftY = (randomB - 0.5) * 10.2;
  const driftDuration = 13.8 + randomD * 6.8;
  const driftDelay = (index % 19) * 0.31;
  const spiralBias = (randomD - 0.5) * 42;
  const targetX = engineCenterX - startX + Math.sin(index * 0.23) * 5.4;
  const targetY = engineCenterY - startY + Math.cos(index * 0.21) * 6.2;
  const curveMidX = targetX * 0.28 + spiralBias;
  const curveMidY = targetY * 0.24 + (randomB - 0.5) * 58;
  const curveNearX = targetX * 0.66 + spiralBias * 0.6;
  const curveNearY = targetY * 0.72 + (randomA - 0.5) * 26;
  const absorbX = targetX * 0.9 + spiralBias * 0.18;
  const absorbY = targetY * 0.92 + (randomD - 0.5) * 14;
  const tone = ['#14C7E5', '#9A33FF', '#F2398A', '#8CE9D8'][index % 4];

  return {
    top,
    left,
    size,
    duration,
    delay,
    opacity,
    glow,
    targetX,
    targetY,
    curveMidX,
    curveMidY,
    curveNearX,
    curveNearY,
    absorbX,
    absorbY,
    tone,
    driftX,
    driftY,
    driftDuration,
    driftDelay
  };
});

const emotionIntensityPoints: IntensityPoint[] = [
  { emotion: 'HOPE', x: 22, y: 16, baseRadius: 2.2, phase: 0.6, tone: 'cyan' },
  { emotion: 'ANGER', x: 33, y: 39, baseRadius: 2.4, phase: 1.5, tone: 'pink' },
  { emotion: 'TRUST', x: 44, y: 24, baseRadius: 2.1, phase: 0.3, tone: 'violet' },
  { emotion: 'SKEPTICISM', x: 56, y: 37, baseRadius: 2.5, phase: 2.2, tone: 'pink' },
  { emotion: 'EXCITEMENT', x: 66, y: 18, baseRadius: 2.3, phase: 1.1, tone: 'cyan' },
  { emotion: 'DISAPPOINTMENT', x: 18, y: 31, baseRadius: 2.1, phase: 2.8, tone: 'violet' },
  { emotion: 'RELIEF', x: 51, y: 14, baseRadius: 2.0, phase: 3.3, tone: 'cyan' },
  { emotion: 'DOUBT', x: 69, y: 30, baseRadius: 2.2, phase: 4.0, tone: 'violet' }
];

const intensitySignalPairs: Array<[{ index: number; direction: 'up' | 'down' }, { index: number; direction: 'up' | 'down' }]> = [
  [{ index: 4, direction: 'up' }, { index: 1, direction: 'down' }],
  [{ index: 2, direction: 'up' }, { index: 3, direction: 'down' }],
  [{ index: 0, direction: 'up' }, { index: 7, direction: 'down' }],
  [{ index: 6, direction: 'up' }, { index: 5, direction: 'down' }]
];

const narrativeSequences: NarrativeLine[][] = [
  [
    { emotion: 'TRUST', direction: 'up' },
    { emotion: 'DISAPPOINTMENT', direction: 'down' }
  ],
  [
    { emotion: 'HOPE', direction: 'up' },
    { emotion: 'SKEPTICISM', direction: 'down' }
  ],
  [
    { emotion: 'EXCITEMENT', direction: 'up' },
    { emotion: 'ANGER', direction: 'up' }
  ],
  [
    { emotion: 'TRUST', direction: 'down' },
    { emotion: 'HOPE', direction: 'up' }
  ]
];

const momentumSignals: MomentumSignal[] = [
  { emotion: 'HOPE', delta: 89, window: 'LAST HOUR' },
  { emotion: 'SKEPTICISM', delta: -55, window: 'LAST DAY' },
  { emotion: 'TRUST', delta: 42, window: 'LAST 30 MIN' },
  { emotion: 'ANGER', delta: -31, window: 'LAST 2 HOURS' }
];

const emotionIndexSets: RankedEmotion[][] = [
  [
    { label: 'Trust', score: 82, tone: 'cyan' },
    { label: 'Curiosity', score: 64, tone: 'violet' },
    { label: 'Tension', score: 38, tone: 'pink' }
  ],
  [
    { label: 'Excitement', score: 86, tone: 'pink' },
    { label: 'Confidence', score: 61, tone: 'cyan' },
    { label: 'Doubt', score: 34, tone: 'violet' }
  ],
  [
    { label: 'Hope', score: 78, tone: 'cyan' },
    { label: 'Skepticism', score: 53, tone: 'violet' },
    { label: 'Relief', score: 42, tone: 'pink' }
  ]
];

const narrativeRankingSets: RankedNarrative[][] = [
  [
    { label: 'TRUST', score: 92, direction: 'up' },
    { label: 'SKEPTICISM', score: 74, direction: 'down' },
    { label: 'DOUBT', score: 48, direction: 'down' }
  ],
  [
    { label: 'HOPE', score: 88, direction: 'up' },
    { label: 'FEAR', score: 67, direction: 'down' },
    { label: 'DISAPPOINTMENT', score: 58, direction: 'down' }
  ],
  [
    { label: 'CONFIDENCE', score: 84, direction: 'up' },
    { label: 'DOUBT', score: 63, direction: 'down' },
    { label: 'OPTIMISM', score: 41, direction: 'up' }
  ]
];

const momentumPanelFrames: MomentumPanelFrame[] = [
  {
    label: 'Acceleration',
    emotion: 'TRUST',
    window: 'LAST 60 MIN',
    delta: 27,
    linePath: 'M12 46 C44 44, 72 38, 102 28 C132 18, 166 14, 208 10',
    fillPath: 'M12 46 C44 44, 72 38, 102 28 C132 18, 166 14, 208 10 L208 52 L12 52 Z',
    markerX: 208,
    markerY: 10
  },
  {
    label: 'Breakout',
    emotion: 'HOPE',
    window: 'LAST 3 HOURS',
    delta: 18,
    linePath: 'M12 48 C46 47, 76 43, 108 34 C140 24, 170 20, 208 16',
    fillPath: 'M12 48 C46 47, 76 43, 108 34 C140 24, 170 20, 208 16 L208 52 L12 52 Z',
    markerX: 208,
    markerY: 16
  },
  {
    label: 'Cooling',
    emotion: 'ANGER',
    window: 'LAST DAY',
    delta: -11,
    linePath: 'M12 16 C48 19, 78 24, 112 32 C146 40, 176 44, 208 48',
    fillPath: 'M12 16 C48 19, 78 24, 112 32 C146 40, 176 44, 208 48 L208 52 L12 52 Z',
    markerX: 208,
    markerY: 48
  }
];

function easeInOutQuad(value: number) {
  if (value < 0.5) return 2 * value * value;
  return 1 - Math.pow(-2 * value + 2, 2) / 2;
}

function useFadingCycle(length: number, intervalMs = 5200, fadeMs = 420) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const swapTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (length <= 1) return;

    const interval = window.setInterval(() => {
      setFading(true);
      if (swapTimeoutRef.current !== null) window.clearTimeout(swapTimeoutRef.current);

      swapTimeoutRef.current = window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % length);
        setFading(false);
      }, fadeMs);
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
      if (swapTimeoutRef.current !== null) window.clearTimeout(swapTimeoutRef.current);
    };
  }, [fadeMs, intervalMs, length]);

  return { index, fading };
}

function useAnimatedMetric(target: number, durationMs = 1700) {
  const [value, setValue] = useState(target);
  const previousRef = useRef(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = previousRef.current;

    const step = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = easeInOutQuad(progress);
      const next = from + (target - from) * eased;
      setValue(next);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(step);
    previousRef.current = target;

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [durationMs, target]);

  return value;
}

function MomentumMicroChart({ positive }: { positive: boolean }) {
  const gradientId = useId();

  return (
    <svg
      className="h-5 w-[54px] shrink-0 sm:h-6 sm:w-[62px]"
      viewBox="0 0 68 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="3" y1="3" x2="65" y2="21" gradientUnits="userSpaceOnUse">
          {positive ? (
            <>
              <stop stopColor="#14C7E5" stopOpacity="0.9" />
              <stop offset="1" stopColor="#64E6C5" stopOpacity="0.7" />
            </>
          ) : (
            <>
              <stop stopColor="#F18A52" stopOpacity="0.9" />
              <stop offset="1" stopColor="#F2398A" stopOpacity="0.7" />
            </>
          )}
        </linearGradient>
      </defs>
      <path d="M3 22 H65" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <path
        d={positive
          ? 'M4 20 C14 18, 20 14, 28 13 C36 12, 44 8, 64 5'
          : 'M4 5 C14 7, 20 10, 28 11 C36 12, 44 17, 64 20'}
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MiniRadarSignal({ className = '' }: { className?: string }) {
  const neutralCyanId = useId();
  const neutralVioletId = useId();
  const neutralPinkId = useId();
  const positiveId = useId();
  const negativeId = useId();
  const clusterFieldClipId = useId();
  const cycleMs = 5400;
  const { index: pairIndex, fading } = useFadingCycle(intensitySignalPairs.length, cycleMs, 520);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameRef: number | null = null;
    const start = performance.now();

    const step = (now: number) => {
      const next = (now - start) / cycleMs;
      setProgress(next >= 1 ? 1 : next);
      if (next < 1.02) frameRef = requestAnimationFrame(step);
    };

    frameRef = requestAnimationFrame(step);
    return () => {
      if (frameRef !== null) cancelAnimationFrame(frameRef);
    };
  }, [cycleMs, pairIndex]);

  const activePair = intensitySignalPairs[pairIndex];
  const activeMap = useMemo(() => {
    return new Map(activePair.map((signal) => [signal.index, signal.direction] as const));
  }, [activePair]);

  const pulse = 0.5 - 0.5 * Math.cos(progress * Math.PI * 2);
  const labelOpacity = fading ? 0 : Math.max(0, 1 - Math.abs(progress - 0.5) * 2.6);
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

  const points = useMemo(() => {
    const leftZone = { minX: 13, maxX: 27, minY: 14, maxY: 42 };
    return emotionIntensityPoints.map((point, index) => {
      const direction = activeMap.get(index);
      const ambient = 0.32 * Math.sin(progress * Math.PI * 2 + point.phase);
      let radius = point.baseRadius + ambient;
      const normalizedX = clamp((point.x - 16) / 56, 0, 1);
      const normalizedY = clamp((point.y - 14) / 28, 0, 1);
      const mappedX = leftZone.minX + normalizedX * (leftZone.maxX - leftZone.minX);
      const mappedY = leftZone.minY + normalizedY * (leftZone.maxY - leftZone.minY);

      if (direction === 'up') radius += 1.42 * pulse;
      if (direction === 'down') radius -= 1.02 * pulse;

      return {
        ...point,
        x: mappedX,
        y: mappedY,
        direction,
        radius: clamp(radius, 1.2, 4.9)
      };
    });
  }, [activeMap, progress, pulse]);

  const dominantClusters = useMemo(() => {
    const ranked = points
      .map((point, index) => {
        const direction = activeMap.get(index);
        const score = point.radius + (direction === 'up' ? 2.2 : direction === 'down' ? 1.8 : 0);
        return { point, index, direction, score };
      })
      .sort((left, right) => right.score - left.score)
      .slice(0, 2);

    const highestScore = ranked[0]?.score ?? 1;

    return ranked.map((entry, clusterIndex) => {
      const relatedPoints = points
        .map((point, index) => {
          const distance = Math.hypot(point.x - entry.point.x, point.y - entry.point.y);
          const affinity = point.tone === entry.point.tone ? -6 : 0;
          return { point, index, sortKey: distance + affinity };
        })
        .filter(({ index }) => index !== entry.index)
        .sort((left, right) => left.sortKey - right.sortKey)
        .slice(0, 3)
        .map(({ point }, satelliteIndex) => {
          const blend = 0.4 + satelliteIndex * 0.1;
          return {
            x: entry.point.x + (point.x - entry.point.x) * blend,
            y: entry.point.y + (point.y - entry.point.y) * blend,
            radius: clamp(point.radius * 0.72, 0.9, 1.9)
          };
        });

      return {
        key: entry.point.emotion,
        label: entry.point.emotion,
        displayLabel: entry.point.emotion.charAt(0) + entry.point.emotion.slice(1).toLowerCase(),
        direction: entry.direction ?? (clusterIndex === 0 ? 'up' : 'down'),
        anchor: {
          x: entry.point.x,
          y: entry.point.y
        },
        haloRadius: clamp(5.2 + (entry.score / highestScore) * 3.2, 5.2, 8.4),
        coreRadius: clamp(entry.point.radius + 0.35, 1.8, 4.1),
        satellites: relatedPoints,
        strength: clamp((entry.score / highestScore) * 100, 58, 100)
      };
    });
  }, [activeMap, points, clamp]);

  return (
    <div className={`flex h-full min-w-0 items-center justify-between gap-2 overflow-hidden rounded-md p-2 sm:gap-2.5 sm:p-2.5 ${className}`}>
      <div className="engine-mini-radar relative flex min-w-0 basis-[40%] items-center justify-center self-stretch overflow-hidden rounded-md border border-white/10 bg-white/[0.03]">
        <span className="engine-mini-radar-pulse" />
        <svg
          className="h-full w-full"
          viewBox="0 0 44 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={neutralCyanId} cx="0.5" cy="0.5" r="0.7">
              <stop offset="0" stopColor="#8CE9D8" stopOpacity="0.95" />
              <stop offset="1" stopColor="#14C7E5" stopOpacity="0.16" />
            </radialGradient>
            <radialGradient id={neutralVioletId} cx="0.5" cy="0.5" r="0.7">
              <stop offset="0" stopColor="#C8A1FF" stopOpacity="0.92" />
              <stop offset="1" stopColor="#9A33FF" stopOpacity="0.15" />
            </radialGradient>
            <radialGradient id={neutralPinkId} cx="0.5" cy="0.5" r="0.7">
              <stop offset="0" stopColor="#FF93C4" stopOpacity="0.9" />
              <stop offset="1" stopColor="#F2398A" stopOpacity="0.14" />
            </radialGradient>
            <radialGradient id={positiveId} cx="0.5" cy="0.5" r="0.7">
              <stop offset="0" stopColor="#9EF3DE" stopOpacity="0.98" />
              <stop offset="1" stopColor="#14C7E5" stopOpacity="0.22" />
            </radialGradient>
            <radialGradient id={negativeId} cx="0.5" cy="0.5" r="0.7">
              <stop offset="0" stopColor="#FFC19A" stopOpacity="0.94" />
              <stop offset="1" stopColor="#F18A52" stopOpacity="0.22" />
            </radialGradient>
            <clipPath id={clusterFieldClipId}>
              <rect x="4" y="4" width="36" height="48" rx="6" />
            </clipPath>
          </defs>

          <rect x="1" y="1" width="42" height="54" rx="7" stroke="rgba(255,255,255,0.08)" fill="rgba(11,22,42,0.28)" />
          <g clipPath={`url(#${clusterFieldClipId})`}>
            {points.map((point, index) => {
              const activeDirection = point.direction;
              const gradientId =
                activeDirection === 'up'
                  ? positiveId
                  : activeDirection === 'down'
                  ? negativeId
                  : point.tone === 'cyan'
                  ? neutralCyanId
                  : point.tone === 'violet'
                  ? neutralVioletId
                  : neutralPinkId;

              return (
                <circle
                  key={`${point.emotion}-${index}`}
                  cx={point.x + 2}
                  cy={point.y}
                  r={clamp(point.radius * 0.44, 0.7, 1.45)}
                  fill={`url(#${gradientId})`}
                  opacity={activeDirection ? 0.22 : 0.12}
                />
              );
            })}

            {dominantClusters.map((cluster) => {
              const glowGradientId = cluster.direction === 'up' ? positiveId : negativeId;
              const lineColor = cluster.direction === 'up' ? 'rgba(123,231,214,0.34)' : 'rgba(241,138,82,0.34)';

              return (
                <g key={cluster.key} opacity={labelOpacity}>
                  <circle cx={cluster.anchor.x + 2} cy={cluster.anchor.y} r={cluster.haloRadius} fill={`url(#${glowGradientId})`} opacity="0.22" />
                  {cluster.satellites.map((satellite, satelliteIndex) => (
                    <g key={`${cluster.key}-${satelliteIndex}`}>
                      <line
                        x1={cluster.anchor.x + 2}
                        y1={cluster.anchor.y}
                        x2={satellite.x + 2}
                        y2={satellite.y}
                        stroke={lineColor}
                        strokeWidth="0.7"
                        strokeLinecap="round"
                      />
                      <circle cx={satellite.x + 2} cy={satellite.y} r={satellite.radius + 0.9} fill={`url(#${glowGradientId})`} opacity="0.18" />
                      <circle cx={satellite.x + 2} cy={satellite.y} r={satellite.radius} fill={`url(#${glowGradientId})`} opacity="0.85" />
                    </g>
                  ))}
                  <circle cx={cluster.anchor.x + 2} cy={cluster.anchor.y} r={cluster.coreRadius + 1.4} fill={`url(#${glowGradientId})`} opacity="0.26" />
                  <circle cx={cluster.anchor.x + 2} cy={cluster.anchor.y} r={cluster.coreRadius} fill={`url(#${glowGradientId})`} />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="flex min-w-0 basis-[60%] flex-col justify-center gap-1.5 self-stretch overflow-hidden">
        {dominantClusters.map((cluster) => (
          <div
            key={cluster.key}
            className={`flex min-w-0 flex-1 items-center justify-center overflow-hidden rounded-md border px-1.5 py-1 sm:px-2 sm:py-1.5 ${
              cluster.direction === 'up'
                ? 'border-[#7BE7D6]/25 bg-[#14C7E5]/[0.07]'
                : 'border-[#F18A52]/28 bg-[#F18A52]/[0.07]'
            }`}
            style={{ opacity: labelOpacity }}
          >
            <p
              className={`max-w-full break-words text-center text-[6.5px] font-semibold leading-[1.15] tracking-[0.01em] sm:text-[7px] ${
                cluster.direction === 'up' ? 'text-[#8CE9D8]' : 'text-[#FFB48A]'
              }`}
            >
              {cluster.displayLabel}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NarrativeSignalFeed() {
  const { index, fading } = useFadingCycle(narrativeSequences.length, 5600, 480);
  const activeLines = narrativeSequences[index];

  return (
    <div className={`mt-1.5 space-y-1.5 overflow-hidden pr-0.5 transition-all duration-500 ${fading ? 'translate-y-0.5 opacity-0' : 'translate-y-0 opacity-100'}`}>
      {activeLines.map((line) => {
        const isPositive = line.direction === 'up';
        return (
          <div
            key={`${line.emotion}-${line.direction}`}
            className={`flex items-center gap-1 rounded-md border px-1.5 py-1 ${
              isPositive
                ? 'border-[#7BE7D6]/25 bg-[#14C7E5]/[0.07] text-[#8CE9D8]'
                : 'border-[#F18A52]/28 bg-[#F18A52]/[0.07] text-[#FFB48A]'
            }`}
          >
            {isPositive ? <ArrowUpRight className="h-3 w-3 shrink-0" /> : <ArrowDownRight className="h-3 w-3 shrink-0" />}
            <p className="min-w-0 truncate whitespace-nowrap text-[8px] leading-tight sm:text-[9px]">
              <span className="font-semibold">{line.emotion}</span> sentiment {isPositive ? 'rising' : 'decreasing'}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function MomentumSignalTicker() {
  const { index, fading } = useFadingCycle(momentumSignals.length, 5600, 480);
  const active = momentumSignals[index];
  const animatedDelta = useAnimatedMetric(active.delta, 2400);
  const roundedDelta = Math.round(animatedDelta);
  const isPositive = active.delta >= 0;
  const metricText = `${roundedDelta >= 0 ? '+' : ''}${roundedDelta}% ${active.emotion}`;

  return (
    <div className={`mt-1.5 overflow-hidden transition-all duration-500 ${fading ? 'translate-y-0.5 opacity-0' : 'translate-y-0 opacity-100'}`}>
      <div className="flex items-center justify-between gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-1.5 sm:px-2">
        <div className="min-w-0">
          <p className={`truncate whitespace-nowrap text-[9px] font-semibold leading-tight sm:text-[10px] ${isPositive ? 'text-[#8CE9D8]' : 'text-[#FFB48A]'}`}>{metricText}</p>
          <p className="mt-0.5 truncate whitespace-nowrap text-[8px] uppercase tracking-[0.1em] text-[#AAB4C2] sm:tracking-[0.12em]">in {active.window}</p>
        </div>
        <MomentumMicroChart positive={isPositive} />
      </div>
    </div>
  );
}

function SocialEngineOutputCard({
  title,
  children,
  strictGridAlignment = false,
  contentSpacingClassName = 'mt-6'
}: {
  title: string;
  children: ReactNode;
  strictGridAlignment?: boolean;
  contentSpacingClassName?: string;
}) {
  return (
    <article
      className={`social-engine-output-card flex h-full min-h-[112px] flex-col overflow-hidden rounded-[1.08rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] shadow-[0_18px_50px_rgba(0,0,0,0.35),0_0_30px_rgba(58,49,255,0.18)] backdrop-blur ${
        strictGridAlignment ? 'px-6 py-5' : 'px-6 py-5'
      }`}
    >
      <h4 className="text-[11px] font-semibold leading-none tracking-tight text-white">{title}</h4>
      <div className={`${contentSpacingClassName} flex min-h-0 flex-1 overflow-hidden ${strictGridAlignment ? 'items-start' : 'items-stretch'}`}>{children}</div>
    </article>
  );
}

function EmotionIndexPanel() {
  const { index, fading } = useFadingCycle(emotionIndexSets.length, 5600, 420);
  const featuredEmotions = emotionIndexSets[index].slice(0, 2);
  const toneStyles = {
    cyan: { color: '#4FD1C5', glow: 'rgba(79,209,197,0.38)' },
    violet: { color: '#8B5CF6', glow: 'rgba(139,92,246,0.36)' },
    pink: { color: '#EC4899', glow: 'rgba(236,72,153,0.36)' }
  } as const;
  const clusterToneStyles = {
    cyan: {
      color: '#7DFF72',
      glow: 'rgba(125,255,114,0.42)',
      minColor: '#FFD84A',
      minGlow: 'rgba(255,216,74,0.34)'
    },
    violet: {
      color: '#FFD84A',
      glow: 'rgba(255,216,74,0.4)',
      minColor: '#FF6156',
      minGlow: 'rgba(255,97,86,0.34)'
    },
    pink: {
      color: '#FF6156',
      glow: 'rgba(255,97,86,0.44)',
      minColor: '#8CFF62',
      minGlow: 'rgba(140,255,98,0.34)'
    }
  } as const;

  const clusterParticles = useMemo(() => {
    const fallback = ['cyan', 'violet', 'pink'] as const;
    return Array.from({ length: 5 }, (_, particleIndex) => {
      const emotionTone = featuredEmotions[particleIndex % featuredEmotions.length]?.tone ?? fallback[particleIndex % fallback.length];
      return {
        tone: emotionTone,
        size: particleIndex === 0 ? 10 : particleIndex === 1 ? 8 : 6,
        distance: [16, 18, 11, 14, 9][particleIndex],
        duration: `${7 + particleIndex * 0.8}s`,
        delay: `${particleIndex * 0.35}s`,
        start: `${particleIndex * 72}deg`,
        driftX: [3.2, -4.4, 3.8, -3.1, 4.6][particleIndex],
        driftY: [-3.4, 2.8, 3.6, -4.1, 2.4][particleIndex],
        driftDuration: `${8.4 + particleIndex * 0.7}s`,
        driftDelay: `${particleIndex * 0.28}s`
      };
    });
  }, [featuredEmotions]);

  return (
    <div className={`flex h-full w-full items-center gap-5 transition-all duration-500 ${fading ? 'translate-y-0.5 opacity-0' : 'translate-y-0 opacity-100'}`}>
      <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center">
        <div className="relative h-[64px] w-[64px]">
          <span className="absolute inset-[10px] rounded-full border border-white/8" />
          <span className="absolute inset-[20px] rounded-full border border-white/6" />
          <span className="absolute inset-[28px] rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.18)]" />
          {clusterParticles.map((particle) => (
            <span
              key={`${particle.tone}-${particle.start}`}
              className="social-engine-cluster-particle"
              style={
                {
                  '--cluster-start': particle.start,
                  '--cluster-distance': `${particle.distance}px`,
                  '--cluster-duration': particle.duration,
                  '--cluster-delay': particle.delay,
                  '--cluster-scale': 1,
                  '--cluster-drift-x': `${particle.driftX}px`,
                  '--cluster-drift-y': `${particle.driftY}px`,
                  '--cluster-drift-duration': particle.driftDuration,
                  '--cluster-drift-delay': particle.driftDelay,
                  '--cluster-glow': clusterToneStyles[particle.tone].glow,
                  '--cluster-min-glow': clusterToneStyles[particle.tone].minGlow,
                  '--cluster-color': clusterToneStyles[particle.tone].color,
                  '--cluster-min-color': clusterToneStyles[particle.tone].minColor,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: 0.96
                } as CSSProperties
              }
            >
              <span className="social-engine-cluster-core" />
            </span>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
        {featuredEmotions.map((emotion) => (
          <div key={emotion.label} className="grid min-w-0 grid-cols-[minmax(76px,auto)_minmax(68px,1fr)_44px] items-center gap-3">
            <p className="truncate whitespace-nowrap text-[12px] font-medium tracking-tight text-[#E6EDF3]">{emotion.label}</p>
            <div className="h-[4px] w-full overflow-hidden rounded-full bg-white/10">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${emotion.score}%`,
                  background: `linear-gradient(90deg, ${toneStyles[emotion.tone].color}, rgba(255,255,255,0.72))`,
                  boxShadow: `0 0 12px ${toneStyles[emotion.tone].glow}`
                }}
              />
            </div>
            <span className="text-right text-[12px] font-semibold text-[#E6EDF3]">{emotion.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NarrativeRankingPanel() {
  const { index, fading } = useFadingCycle(narrativeRankingSets.length, 5600, 420);
  const activeNarratives = narrativeRankingSets[index].slice(0, 2);

  return (
    <div className={`flex h-full min-h-0 w-full flex-col gap-2 transition-all duration-500 ${fading ? 'translate-y-0.5 opacity-0' : 'translate-y-0 opacity-100'}`}>
      {activeNarratives.map((narrative, narrativeIndex) => {
        const movement = narrative.direction === 'up' ? 'rising' : narrative.direction === 'down' ? 'easing' : 'stabilizing';
        const isPositive = narrative.direction === 'up';
        const borderColor = isPositive ? 'rgba(79,209,197,0.38)' : narrative.direction === 'down' ? 'rgba(249,115,22,0.4)' : 'rgba(159,176,195,0.26)';
        const background = isPositive ? 'rgba(36,107,255,0.12)' : narrative.direction === 'down' ? 'rgba(18,23,35,0.82)' : 'rgba(159,176,195,0.06)';
        const textColor = isPositive ? '#4FD1C5' : narrative.direction === 'down' ? '#F97316' : '#9FB0C3';

        return (
          <div
            key={`${narrative.label}-${narrativeIndex}`}
            className="flex min-h-0 w-full flex-1 items-center gap-2.5 rounded-[8px] border px-3.5 py-2.5 transition-all duration-500 ease-out"
            style={{
              borderColor,
              background,
              boxShadow: isPositive
                ? '0 0 16px rgba(79,209,197,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
                : narrative.direction === 'down'
                ? '0 0 16px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.04)'
                : '0 0 12px rgba(159,176,195,0.05), inset 0 1px 0 rgba(255,255,255,0.04)'
            }}
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center">
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 text-[#4FD1C5]" />
              ) : narrative.direction === 'down' ? (
                <ArrowDownRight className="h-3 w-3 text-[#F97316]" />
              ) : (
                <span className="text-[10px] font-semibold text-[#9FB0C3]">•</span>
              )}
            </span>
            <p className="min-w-0 flex-1 truncate text-[11px] font-semibold tracking-tight" style={{ color: textColor }}>
              {`${narrative.label} sentiment ${movement}`}
            </p>
            <span className="h-4 w-px shrink-0 rounded-full" style={{ background: isPositive ? 'rgba(79,209,197,0.5)' : narrative.direction === 'down' ? 'rgba(249,115,22,0.5)' : 'rgba(159,176,195,0.4)' }} />
          </div>
        );
      })}
    </div>
  );
}

function MomentumSignalPanel() {
  const areaId = useId();
  const { index, fading } = useFadingCycle(momentumPanelFrames.length, 5600, 420);
  const active = momentumPanelFrames[index];
  const animatedDelta = useAnimatedMetric(active.delta, 2200);
  const roundedDelta = Math.round(animatedDelta);
  const isPositive = active.delta >= 0;
  const contextLabel = `IN ${active.window}`;
  const deltaText = `${roundedDelta >= 0 ? '+' : ''}${roundedDelta}%`;
  const chartGradientId = useId();
  const chartGlowId = useId();

  return (
    <div className={`grid h-full min-h-0 w-full grid-cols-[0.4fr_0.6fr] items-center gap-4 overflow-hidden transition-all duration-500 ${fading ? 'translate-y-0.5 opacity-0' : 'translate-y-0 opacity-100'}`}>
      <div className="flex min-w-0 flex-col justify-center">
        <p className={`${isPositive ? 'text-[#8CE9D8]' : 'text-[#FFB48A]'} text-[0.92rem] font-semibold leading-none tracking-tight`}>
          <span className="block whitespace-nowrap">{deltaText}</span>
          <span className="mt-0.5 block whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#E6EDF3]">{active.emotion}</span>
        </p>
        <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-[#9FB0C3]">{contextLabel}</p>
      </div>

      <div className="flex min-w-0 items-center">
        <div
          className="w-full overflow-hidden rounded-[0.95rem] border border-white/10 bg-[linear-gradient(160deg,rgba(6,14,28,0.72),rgba(20,30,48,0.42))] px-2.5 py-[7px]"
          style={{
            boxShadow: isPositive
              ? '0 0 24px rgba(79,209,197,0.07), inset 0 1px 0 rgba(255,255,255,0.04)'
              : '0 0 24px rgba(249,115,22,0.07), inset 0 1px 0 rgba(255,255,255,0.04)'
          }}
        >
          <svg
            key={`${active.emotion}-${active.window}`}
            className="block h-[36px] w-full"
            viewBox="0 0 220 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={chartGradientId} x1="12" y1="10" x2="208" y2="50" gradientUnits="userSpaceOnUse">
                {isPositive ? (
                  <>
                    <stop stopColor="#4FD1C5" stopOpacity="0.92" />
                    <stop offset="1" stopColor="#10B981" stopOpacity="0.74" />
                  </>
                ) : (
                  <>
                    <stop stopColor="#F97316" stopOpacity="0.88" />
                    <stop offset="1" stopColor="#FB7185" stopOpacity="0.72" />
                  </>
                )}
              </linearGradient>
              <linearGradient id={chartGlowId} x1="12" y1="10" x2="208" y2="50" gradientUnits="userSpaceOnUse">
                {isPositive ? (
                  <>
                    <stop stopColor="#4FD1C5" stopOpacity="0.16" />
                    <stop offset="1" stopColor="#10B981" stopOpacity="0.22" />
                  </>
                ) : (
                  <>
                    <stop stopColor="#F97316" stopOpacity="0.16" />
                    <stop offset="1" stopColor="#FB7185" stopOpacity="0.22" />
                  </>
                )}
              </linearGradient>
              <linearGradient id={areaId} x1="12" y1="6" x2="12" y2="54" gradientUnits="userSpaceOnUse">
                {isPositive ? (
                  <>
                    <stop stopColor="#4FD1C5" stopOpacity="0.08" />
                    <stop offset="1" stopColor="#4FD1C5" stopOpacity="0" />
                  </>
                ) : (
                  <>
                    <stop stopColor="#F97316" stopOpacity="0.08" />
                    <stop offset="1" stopColor="#F97316" stopOpacity="0" />
                  </>
                )}
              </linearGradient>
            </defs>

            <path d="M12 52 H208" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <path d={active.fillPath} fill={`url(#${areaId})`} />
            <path d={active.linePath} stroke={`url(#${chartGlowId})`} strokeWidth="3" strokeLinecap="round" opacity="0.18" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.55s" fill="freeze" />
            </path>
            <path d={active.linePath} stroke={`url(#${chartGradientId})`} strokeWidth="1.3" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset="100">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.55s" fill="freeze" />
            </path>
            <circle cx={active.markerX} cy={active.markerY} r="2" fill={isPositive ? '#4FD1C5' : '#F97316'}>
              <animate attributeName="r" values="1.9;2.5;1.9" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.72;1;0.72" dur="2.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function SocialEngineTablet({ labels }: { labels: SocialEngineTabletLabels }) {
  const linkGradientId = useId();
  const linkSoftGradientId = useId();
  const outputPathTopId = useId();
  const outputPathMidId = useId();
  const outputPathBottomId = useId();

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-4 hidden translate-x-5 translate-y-5 rotate-[1deg] rounded-[34px] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] opacity-60 blur-[1px] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(58,49,255,0.2)] sm:block sm:inset-5 sm:translate-x-8 sm:translate-y-8" />
      <article className="hero-shell double-layer-panel relative overflow-hidden px-4 py-5 sm:px-6 sm:py-6 md:px-7 md:py-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_44%,rgba(20,199,229,0.14),rgba(9,20,38,0)_34%),radial-gradient(circle_at_49%_48%,rgba(154,51,255,0.22),rgba(9,20,38,0)_38%),radial-gradient(circle_at_84%_22%,rgba(242,57,138,0.14),rgba(9,20,38,0)_30%)]" />
        <div className="hero-signal-trails pointer-events-none absolute inset-0" />

        <div className="relative h-[560px] sm:h-[520px] lg:h-[470px]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 760 430"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={linkGradientId} x1="76" y1="212" x2="704" y2="112" gradientUnits="userSpaceOnUse">
                <stop stopColor="#14C7E5" stopOpacity="0.08" />
                <stop offset="0.45" stopColor="#9A33FF" stopOpacity="0.48" />
                <stop offset="1" stopColor="#246BFF" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id={linkSoftGradientId} x1="76" y1="212" x2="704" y2="286" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2398A" stopOpacity="0.08" />
                <stop offset="0.55" stopColor="#9A33FF" stopOpacity="0.24" />
                <stop offset="1" stopColor="#14C7E5" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            <path className="social-engine-link" d="M82 112 C152 76, 208 154, 264 176 S320 206, 344 208" stroke={`url(#${linkSoftGradientId})`} strokeWidth="1.2" />
            <path className="social-engine-link-soft" d="M78 210 C150 186, 214 234, 272 214 S324 196, 344 210" stroke={`url(#${linkGradientId})`} strokeWidth="1.4" />
            <path className="social-engine-link" d="M84 308 C156 336, 216 254, 270 244 S322 222, 344 214" stroke={`url(#${linkSoftGradientId})`} strokeWidth="1.2" />

            <path
              id={outputPathTopId}
              className="social-engine-output-beam"
              d="M404 208 C452 170, 492 168, 544 138 S634 112, 698 110"
              stroke={`url(#${linkGradientId})`}
              strokeWidth="1.55"
            />
            <path
              id={outputPathMidId}
              className="social-engine-output-beam-soft"
              d="M404 208 C452 186, 496 236, 548 214 S636 194, 698 214"
              stroke={`url(#${linkSoftGradientId})`}
              strokeWidth="1.35"
            />
            <path
              id={outputPathBottomId}
              className="social-engine-output-beam"
              d="M404 208 C452 242, 496 252, 546 286 S634 316, 698 318"
              stroke={`url(#${linkGradientId})`}
              strokeWidth="1.55"
            />

            <circle className="social-engine-output-tracer" r="1.8" fill="#14C7E5">
              <animate attributeName="opacity" values="0;0.64;0.64;0" keyTimes="0;0.2;0.8;1" dur="4.4s" begin="0.2s" repeatCount="indefinite" />
              <animateMotion dur="4.4s" begin="0.2s" rotate="auto" repeatCount="indefinite">
                <mpath href={`#${outputPathTopId}`} />
              </animateMotion>
            </circle>
            <circle className="social-engine-output-tracer" r="1.7" fill="#9A33FF">
              <animate attributeName="opacity" values="0;0.58;0.58;0" keyTimes="0;0.22;0.8;1" dur="4.6s" begin="1.05s" repeatCount="indefinite" />
              <animateMotion dur="4.6s" begin="1.05s" rotate="auto" repeatCount="indefinite">
                <mpath href={`#${outputPathMidId}`} />
              </animateMotion>
            </circle>
            <circle className="social-engine-output-tracer" r="1.8" fill="#F2398A">
              <animate attributeName="opacity" values="0;0.56;0.56;0" keyTimes="0;0.2;0.82;1" dur="4.8s" begin="1.8s" repeatCount="indefinite" />
              <animateMotion dur="4.8s" begin="1.8s" rotate="auto" repeatCount="indefinite">
                <mpath href={`#${outputPathBottomId}`} />
              </animateMotion>
            </circle>
          </svg>

          <div className="absolute left-1.5 top-1.5 rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-[#AAB4C2] sm:left-2 sm:top-2 sm:px-3 sm:text-[10px]">
            {labels.title}
          </div>

          <div className="absolute left-0 top-[16%] h-[62%] w-[39%] sm:left-2 sm:w-[34%] lg:left-4 lg:w-[32%]">
            {socialEngineParticles.map((particle, index) => (
              <span
                key={`social-engine-particle-${index}`}
                className={`social-engine-particle-anchor ${index > 390 ? 'hidden lg:block' : index > 240 ? 'hidden sm:block' : ''}`}
                style={
                  {
                    top: `${particle.top}%`,
                    left: `${particle.left}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    '--social-engine-drift-x': `${particle.driftX.toFixed(2)}px`,
                    '--social-engine-drift-y': `${particle.driftY.toFixed(2)}px`,
                    '--social-engine-drift-duration': `${particle.driftDuration.toFixed(2)}s`,
                    '--social-engine-drift-delay': `${particle.driftDelay.toFixed(2)}s`,
                    '--engine-delay': `${particle.delay}s`,
                    '--engine-duration': `${particle.duration}s`,
                    '--engine-target-x': `${particle.targetX}px`,
                    '--engine-target-y': `${particle.targetY}px`,
                    '--engine-target-x-mid': `${particle.curveMidX.toFixed(2)}px`,
                    '--engine-target-y-mid': `${particle.curveMidY.toFixed(2)}px`,
                    '--engine-target-x-near': `${particle.curveNearX.toFixed(2)}px`,
                    '--engine-target-y-near': `${particle.curveNearY.toFixed(2)}px`,
                    '--engine-target-x-absorb': `${particle.absorbX.toFixed(2)}px`,
                    '--engine-target-y-absorb': `${particle.absorbY.toFixed(2)}px`,
                    '--engine-opacity': particle.opacity,
                    '--engine-glow': `${particle.glow}px`,
                    '--engine-tone': particle.tone
                  } as CSSProperties
                }
              >
                <span
                  className="social-engine-particle"
                  style={
                    {
                      '--engine-delay': `${particle.delay}s`,
                      '--engine-duration': `${particle.duration}s`,
                      '--engine-target-x': `${particle.targetX}px`,
                      '--engine-target-y': `${particle.targetY}px`,
                      '--engine-target-x-mid': `${particle.curveMidX.toFixed(2)}px`,
                      '--engine-target-y-mid': `${particle.curveMidY.toFixed(2)}px`,
                      '--engine-target-x-near': `${particle.curveNearX.toFixed(2)}px`,
                      '--engine-target-y-near': `${particle.curveNearY.toFixed(2)}px`,
                      '--engine-target-x-absorb': `${particle.absorbX.toFixed(2)}px`,
                      '--engine-target-y-absorb': `${particle.absorbY.toFixed(2)}px`,
                      '--engine-opacity': particle.opacity,
                      '--engine-glow': `${particle.glow}px`,
                      '--engine-tone': particle.tone
                    } as CSSProperties
                  }
                />
              </span>
            ))}

            <p className="absolute left-2 top-2 max-w-[84%] rounded-full border border-white/12 bg-black/25 px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-[#AAB4C2] sm:hidden">
              {labels.input}
            </p>
            <p className="absolute -bottom-9 left-1 hidden text-[10px] uppercase tracking-[0.16em] text-[#AAB4C2] sm:block">{labels.input}</p>
          </div>

          <div className="absolute left-[50%] top-[48%] -translate-x-1/2 -translate-y-1/2 sm:left-[48%]">
            <div className="social-engine-core-shell relative flex h-[12rem] w-[12rem] items-center justify-center rounded-full border border-white/18 bg-[radial-gradient(circle,rgba(242,57,138,0.46)_0%,rgba(154,51,255,0.38)_34%,rgba(36,107,255,0.26)_62%,rgba(9,20,38,0.2)_100%)] sm:h-[14.25rem] sm:w-[14.25rem]">
              <span className="social-engine-core-ring social-engine-core-ring-a" />
              <span className="social-engine-core-ring social-engine-core-ring-b" />
              <span className="social-engine-core-ring social-engine-core-ring-c" />
              <span className="social-engine-core-vortex social-engine-core-vortex-a" />
              <span className="social-engine-core-vortex social-engine-core-vortex-b" />
              <div className="absolute inset-[8px] rounded-full border border-white/20 sm:inset-[10px]" />
              <div className="absolute inset-[18px] rounded-full border border-white/14 sm:inset-[22px]" />
              <span className="social-engine-core-well" />
              <span className="social-engine-core-orbit social-engine-core-orbit-a" />
              <span className="social-engine-core-orbit social-engine-core-orbit-b" />
              <svg
                className="pointer-events-none absolute inset-[17px] h-[calc(100%-34px)] w-[calc(100%-34px)] sm:inset-[21px] sm:h-[calc(100%-42px)] sm:w-[calc(100%-42px)]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="41" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="2.5 4.5" />
                <circle cx="50" cy="50" r="29" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 5" />
                <path className="social-engine-pulse-line" d="M10 50 C18 41, 26 59, 34 50 C42 40, 49 58, 56 50 C64 42, 72 60, 90 50" stroke="#14C7E5" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/92 sm:text-[10px]">Core</span>
            </div>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-[#AAB4C2] sm:text-[11px]">{labels.core}</p>
          </div>

          <div className="social-engine-output-stack absolute grid grid-rows-3">
            <SocialEngineOutputCard title={labels.outputs.signalVelocity} strictGridAlignment>
              <EmotionIndexPanel />
            </SocialEngineOutputCard>

            <SocialEngineOutputCard title={labels.outputs.predominantNarratives} strictGridAlignment contentSpacingClassName="mt-3 !items-stretch">
              <NarrativeRankingPanel />
            </SocialEngineOutputCard>

            <SocialEngineOutputCard title={labels.outputs.emotionalResonance}>
              <MomentumSignalPanel />
            </SocialEngineOutputCard>
          </div>
        </div>
      </article>
    </div>
  );
}

export function SignalEngine({ labels }: { labels: SignalEngineLabels }) {
  const linkGradientId = useId();
  const linkSoftGradientId = useId();
  const outputPathTopId = useId();
  const outputPathMidId = useId();
  const outputPathBottomId = useId();
  const outputTitles: [string, string, string] = [
    labels.outputs.signalVelocity,
    labels.outputs.predominantNarratives,
    labels.outputs.emotionalResonance
  ];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-4 translate-x-5 translate-y-5 rotate-[1.5deg] rounded-[34px] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] opacity-60 blur-[1px] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(58,49,255,0.2)] sm:inset-5 sm:translate-x-8 sm:translate-y-8" />
      <article className="hero-shell double-layer-panel relative overflow-hidden p-4 sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_36%,rgba(154,51,255,0.18),rgba(9,20,38,0)_52%)]" />
        <div className="hero-signal-trails pointer-events-none absolute inset-0" />

        <div className="relative h-[438px] sm:h-[484px]">
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

          <div className="absolute left-1 top-[19%] h-[62%] w-[34.2%] sm:left-3 sm:w-[30.4%]">
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
                    '--engine-target-x-mid': `${particle.curveMidX.toFixed(2)}px`,
                    '--engine-target-y-mid': `${particle.curveMidY.toFixed(2)}px`,
                    '--engine-target-x-near': `${particle.curveNearX.toFixed(2)}px`,
                    '--engine-target-y-near': `${particle.curveNearY.toFixed(2)}px`,
                    '--engine-target-x-absorb': `${particle.absorbX.toFixed(2)}px`,
                    '--engine-target-y-absorb': `${particle.absorbY.toFixed(2)}px`,
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

          <div className="absolute left-[50%] top-[47%] -translate-x-1/2 -translate-y-1/2 sm:left-[47%] sm:top-[48%]">
            <div className="engine-core-breath relative flex h-[8.25rem] w-[8.25rem] items-center justify-center rounded-full border border-white/18 bg-[radial-gradient(circle,rgba(242,57,138,0.4)_0%,rgba(154,51,255,0.34)_34%,rgba(36,107,255,0.24)_62%,rgba(9,20,38,0.28)_100%)] sm:h-44 sm:w-44">
              <span className="engine-core-halo engine-core-halo-a" />
              <span className="engine-core-halo engine-core-halo-b" />
              <div className="absolute inset-[7px] rounded-full border border-white/20 sm:inset-[8px]" />
              <div className="absolute inset-[15px] rounded-full border border-white/16 sm:inset-[19px]" />
              <span className="engine-core-singularity" />
              <span className="engine-core-orbit engine-core-orbit-a" />
              <span className="engine-core-orbit engine-core-orbit-b" />
              <svg
                className="pointer-events-none absolute inset-[17px] h-[calc(100%-34px)] w-[calc(100%-34px)] sm:inset-[21px] sm:h-[calc(100%-42px)] sm:w-[calc(100%-42px)]"
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

      <div className="absolute bottom-[12%] right-0 top-[18%] grid w-[36%] grid-rows-3 gap-3.5 sm:right-0 sm:w-[186px] sm:gap-4">
            {outputTitles.map((output, index) => (
              <article
                key={output}
                className="engine-output-card h-full min-h-[104px] overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] px-2.5 py-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.35),0_0_30px_rgba(58,49,255,0.18)] backdrop-blur sm:rounded-2xl sm:px-4 sm:py-3"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <GradientIcon icon={outputSignalIcons[index]} tone={outputTones[index]} className="hidden h-7 w-7 sm:inline-flex" size={11} />
                  <p className="max-h-[2.35em] min-w-0 overflow-hidden text-[9px] font-medium leading-[1.15] tracking-tight text-white sm:max-h-none sm:text-[12px] sm:leading-tight">{output}</p>
                </div>

                {index === 0 ? <MiniRadarSignal className="mt-0.5 h-[52px] w-full sm:mt-1 sm:h-[60px]" /> : null}
                {index === 1 ? <NarrativeSignalFeed /> : null}
                {index === 2 ? <MomentumSignalTicker /> : null}
              </article>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
