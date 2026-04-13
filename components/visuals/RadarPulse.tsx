import { type CSSProperties, useEffect, useId, useMemo, useRef, useState } from 'react';

type RadarLabels = {
  top: string;
  topRight: string;
  right: string;
  bottomRight: string;
  bottom: string;
  bottomLeft: string;
  left: string;
  topLeft: string;
};

type RadarPulseProps = {
  className?: string;
  labels?: RadarLabels;
  compact?: boolean;
  transparent?: boolean;
};

type LabelPlacement = {
  key: keyof RadarLabels;
};

type AxisRuntime = {
  base: number;
  baseTarget: number;
  baseRate: number;
  nextBaseShiftAt: number;
  nextSpikeAt: number;
  noisePhase: number;
  noiseSpeed: number;
  noiseAmount: number;
  jitterXPhase: number;
  jitterYPhase: number;
  jitterXSpeed: number;
  jitterYSpeed: number;
  jitterAmount: number;
};

type PeakEvent = {
  id: number;
  center: number;
  weights: number[];
  intensity: number;
  riseDuration: number;
  holdDuration: number;
  decayDuration: number;
  createdAt: number;
  flutterPhase: number;
  flutterSpeed: number;
  major: boolean;
};

type RadarFrame = {
  values: number[];
  previousValues: number[];
  trailValues: number[];
  pointJitterX: number[];
  pointJitterY: number[];
  axisNoise: number[];
  axisEnergy: number[];
  dominantIndices: number[];
  tension: number;
};

type SimulationState = {
  axes: AxisRuntime[];
  peaks: PeakEvent[];
  time: number;
  lastTimestamp: number | null;
  nextMajorPeakAt: number;
  eventId: number;
  lastFrame: RadarFrame;
  lastValues: number[];
};

type RadarPoint = {
  x: number;
  y: number;
  value: number;
  delta: number;
  rising: number;
  dominant: boolean;
  glow: number;
  energy: number;
};

const AXIS_COUNT = 8;
const MOTION_SPEED = 0.25;
const radarCenter = { x: 50, y: 50 };
const axisRadius = 38;
const axisTones = ['#F2398A', '#D544FF', '#9B68FF', '#14C7E5', '#42D5F2', '#7E8FFF'];
const axisBaselineSignature = [0.34, 0.48, 0.27, 0.41, 0.18, 0.35, 0.22, 0.44];
const axisVarianceSignature = [0.14, 0.2, -0.05, 0.11, -0.16, 0.06, -0.1, 0.12];
const oppositePairSignature = [0.08, -0.07, 0.09, -0.08];
const gridRingScales = [0.92, 0.72, 0.52, 0.32];
const labelPlacements: LabelPlacement[] = [
  { key: 'top' },
  { key: 'topRight' },
  { key: 'right' },
  { key: 'bottomRight' },
  { key: 'bottom' },
  { key: 'bottomLeft' },
  { key: 'left' },
  { key: 'topLeft' }
];

const baseAxes = Array.from({ length: AXIS_COUNT }, (_, index) => {
  const angle = ((-90 + index * 45) * Math.PI) / 180;

  return {
    x: radarCenter.x + Math.cos(angle) * axisRadius,
    y: radarCenter.y + Math.sin(angle) * axisRadius
  };
});

const INITIAL_FRAME: RadarFrame = {
  values: [0.86, 0.38, 0.74, 0.24, 0.6, 0.28, 0.82, 0.33],
  previousValues: [0.82, 0.42, 0.68, 0.28, 0.55, 0.32, 0.76, 0.38],
  trailValues: [0.76, 0.46, 0.62, 0.33, 0.49, 0.37, 0.69, 0.42],
  pointJitterX: [0.24, -0.18, 0.1, -0.12, 0.16, -0.1, 0.22, -0.15],
  pointJitterY: [-0.22, 0.1, -0.18, 0.14, -0.12, 0.18, -0.2, 0.12],
  axisNoise: [0.03, -0.02, 0.015, -0.018, 0.012, -0.024, 0.02, -0.016],
  axisEnergy: [0.9, 0.2, 0.7, 0.15, 0.55, 0.18, 0.82, 0.24],
  dominantIndices: [0, 2, 6],
  tension: 0.62
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function mix(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInCubic(value: number) {
  return value * value * value;
}

function toPolygon(points: Array<{ x: number; y: number }>) {
  return points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ');
}

function createScaledPolygon(scale: number) {
  return toPolygon(
    baseAxes.map((axis) => ({
      x: radarCenter.x + (axis.x - radarCenter.x) * scale,
      y: radarCenter.y + (axis.y - radarCenter.y) * scale
    }))
  );
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function circularDistance(a: number, b: number, count = AXIS_COUNT) {
  const raw = Math.abs(a - b);
  return Math.min(raw, count - raw);
}

function signedCircularDistance(index: number, center: number, count = AXIS_COUNT) {
  let distance = index - center;

  if (distance > count / 2) {
    distance -= count;
  } else if (distance < -count / 2) {
    distance += count;
  }

  return distance;
}

function pickWeightedIndex(weights: number[]) {
  const sanitized = weights.map((weight) => Math.max(weight, 0));
  const total = sanitized.reduce((sum, weight) => sum + weight, 0);

  if (total <= 0) {
    return Math.floor(Math.random() * weights.length);
  }

  let roll = Math.random() * total;

  for (let index = 0; index < sanitized.length; index += 1) {
    roll -= sanitized[index];

    if (roll <= 0) {
      return index;
    }
  }

  return sanitized.length - 1;
}

function buildPeakWeights(center: number, span: number, skew: number, fracture: number) {
  return Array.from({ length: AXIS_COUNT }, (_, index) => {
    const distance = signedCircularDistance(index, center);
    const absoluteDistance = Math.abs(distance);
    let weight = 0;

    if (absoluteDistance === 0) {
      weight = 1;
    } else if (absoluteDistance <= span) {
      const faceWeight = span === 2 ? 0.84 - (absoluteDistance - 1) * 0.22 : 0.7 - (absoluteDistance - 1) * 0.18;
      weight = clamp(faceWeight, 0.34, 0.84);
    } else if (absoluteDistance === span + 1) {
      weight = -fracture * (0.16 + span * 0.04);
    } else if (absoluteDistance === span + 2) {
      weight = -fracture * 0.05;
    }

    if (distance < 0) {
      weight *= 1 + skew * 0.22;
    } else if (distance > 0) {
      weight *= 1 - skew * 0.18;
    }

    return weight;
  });
}

function getPeakEnvelope(peak: PeakEvent, time: number) {
  const age = time - peak.createdAt;

  if (age <= 0) {
    return 0;
  }

  if (age < peak.riseDuration) {
    return easeOutCubic(age / peak.riseDuration);
  }

  if (age < peak.riseDuration + peak.holdDuration) {
    return 1;
  }

  const decayAge = age - peak.riseDuration - peak.holdDuration;

  if (decayAge < peak.decayDuration) {
    const progress = decayAge / peak.decayDuration;
    const decay = 1 - easeInCubic(progress);
    const flutter = 0.94 + Math.sin(decayAge * peak.flutterSpeed + peak.flutterPhase) * 0.06;

    return clamp(decay * flutter, 0, 1);
  }

  return 0;
}

function getPeakLifetime(peak: PeakEvent) {
  return peak.riseDuration + peak.holdDuration + peak.decayDuration;
}

function createAxisRuntime(index: number): AxisRuntime {
  const base = clamp(axisBaselineSignature[index] + randomBetween(-0.07, 0.07), 0.14, 0.58);

  return {
    base,
    baseTarget: base,
    baseRate: randomBetween(1.4, 3.4),
    nextBaseShiftAt: randomBetween(0.28, 1.5) + index * 0.06,
    nextSpikeAt: randomBetween(0.22, 1.8) + index * 0.1,
    noisePhase: randomBetween(0, Math.PI * 2),
    noiseSpeed: randomBetween(0.85, 1.95),
    noiseAmount: randomBetween(0.014, 0.032),
    jitterXPhase: randomBetween(0, Math.PI * 2),
    jitterYPhase: randomBetween(0, Math.PI * 2),
    jitterXSpeed: randomBetween(1.8, 3.6),
    jitterYSpeed: randomBetween(1.7, 3.4),
    jitterAmount: randomBetween(0.12, 0.34)
  };
}

function getActiveMajorCenters(simulation: SimulationState) {
  return Array.from(
    new Set(
      simulation.peaks
        .filter((peak) => peak.major && getPeakEnvelope(peak, simulation.time) > 0.18)
        .map((peak) => peak.center)
    )
  );
}

function pickPeakCenter(simulation: SimulationState, major: boolean, forcedCenter?: number) {
  if (typeof forcedCenter === 'number') {
    return forcedCenter;
  }

  const activeCenters = getActiveMajorCenters(simulation);
  const weights = Array.from({ length: AXIS_COUNT }, (_, index) => {
    const currentValue = simulation.lastValues[index] ?? axisBaselineSignature[index];
    let score = 0.9 + (1 - currentValue) * 0.72 + Math.max(axisVarianceSignature[index], -0.04) * 0.24 + Math.random() * 0.45;

    activeCenters.forEach((center) => {
      const distance = circularDistance(index, center);

      if (distance === 0) {
        score *= 0.08;
      } else if (distance === 1) {
        score *= major ? 0.24 : 0.58;
      } else if (distance === 2) {
        score *= 0.72;
      } else if (distance === 4) {
        score *= 0.6;
      } else {
        score *= 1.14;
      }
    });

    return score;
  });

  return pickWeightedIndex(weights);
}

function spawnPeak(simulation: SimulationState, options?: { major?: boolean; center?: number; matured?: boolean }) {
  const major = options?.major ?? false;
  const center = pickPeakCenter(simulation, major, options?.center);
  const spanRoll = Math.random();
  const span = spanRoll > 0.86 ? 2 : spanRoll > 0.42 ? 1 : 0;
  const skew = randomBetween(-1, 1);
  const fracture = randomBetween(0.72, 1.14);
  const intensity = major
    ? randomBetween(span === 0 ? 0.32 : 0.26, span === 2 ? 0.4 : 0.46)
    : randomBetween(span === 0 ? 0.12 : 0.1, span === 2 ? 0.22 : 0.28);
  const riseDuration = randomBetween(0.08, 0.18);
  const holdDuration = randomBetween(0.12, major ? 0.34 : 0.26);
  const decayDuration = randomBetween(major ? 0.45 : 0.3, major ? 1.15 : 0.82);
  const maturedOffset = options?.matured ? randomBetween(riseDuration * 0.45, riseDuration + holdDuration * 0.8) : 0;

  simulation.peaks.push({
    id: simulation.eventId,
    center,
    weights: buildPeakWeights(center, span, skew, fracture),
    intensity,
    riseDuration,
    holdDuration,
    decayDuration,
    createdAt: simulation.time - maturedOffset,
    flutterPhase: randomBetween(0, Math.PI * 2),
    flutterSpeed: randomBetween(6.5, 11.5),
    major
  });

  simulation.eventId += 1;
}

function enforceAsymmetry(values: number[]) {
  const adjusted = values.map((value, index) => value + axisVarianceSignature[index] * 0.24);
  const average = adjusted.reduce((sum, value) => sum + value, 0) / adjusted.length;

  for (let pairIndex = 0; pairIndex < adjusted.length / 2; pairIndex += 1) {
    const oppositeIndex = pairIndex + adjusted.length / 2;
    const pairDelta = adjusted[pairIndex] - adjusted[oppositeIndex];

    if (Math.abs(pairDelta) < 0.12) {
      adjusted[pairIndex] += oppositePairSignature[pairIndex];
      adjusted[oppositeIndex] -= oppositePairSignature[pairIndex];
    }
  }

  const spread = Math.max(...adjusted) - Math.min(...adjusted);

  if (spread < 0.3) {
    const ranked = adjusted.map((value, index) => ({ value, index })).sort((left, right) => right.value - left.value);

    adjusted[ranked[0].index] += 0.08;
    adjusted[ranked[1].index] += 0.06;
    adjusted[ranked[ranked.length - 1].index] -= 0.08;
    adjusted[ranked[ranked.length - 2].index] -= 0.06;
  }

  return adjusted.map((value, index) => {
    const lowSideBias = value < average ? Math.min(axisVarianceSignature[index], 0) * 0.08 : 0;
    return clamp(value + lowSideBias, 0.12, 0.97);
  });
}

function reinforceDominantPeaks(values: number[]) {
  const ranked = values.map((value, index) => ({ value, index })).sort((left, right) => right.value - left.value);
  const strengthened = [...values];
  const chosen: number[] = [];

  for (const entry of ranked) {
    if (chosen.length === 0) {
      strengthened[entry.index] = clamp(strengthened[entry.index] + 0.06, 0.12, 0.97);
      chosen.push(entry.index);
      continue;
    }

    if (chosen.length >= 4) {
      break;
    }

    const tooClose = chosen.some((index) => circularDistance(index, entry.index) <= 1);

    if (!tooClose || chosen.length < 2) {
      strengthened[entry.index] = clamp(strengthened[entry.index] + (chosen.length < 2 ? 0.05 : 0.02), 0.12, 0.97);
      chosen.push(entry.index);
    }
  }

  return strengthened;
}

function buildFrame(simulation: SimulationState) {
  const previousValues = simulation.lastFrame.values;
  const trailValues = simulation.lastFrame.trailValues.map((value, index) => mix(value, previousValues[index], 0.34));
  const axisNoise = simulation.axes.map((axis) => {
    const drift =
      Math.sin(simulation.time * axis.noiseSpeed + axis.noisePhase) * axis.noiseAmount +
      Math.cos(simulation.time * (axis.noiseSpeed * 0.61) + axis.noisePhase * 1.7) * axis.noiseAmount * 0.58;

    return drift;
  });
  const pointJitterX = simulation.axes.map((axis) => {
    return (
      Math.sin(simulation.time * axis.jitterXSpeed + axis.jitterXPhase) * axis.jitterAmount +
      Math.cos(simulation.time * (axis.jitterXSpeed * 0.67) + axis.jitterYPhase) * axis.jitterAmount * 0.45
    );
  });
  const pointJitterY = simulation.axes.map((axis) => {
    return (
      Math.cos(simulation.time * axis.jitterYSpeed + axis.jitterYPhase) * axis.jitterAmount * 0.9 +
      Math.sin(simulation.time * (axis.jitterYSpeed * 0.73) + axis.jitterXPhase) * axis.jitterAmount * 0.42
    );
  });
  let values = simulation.axes.map((axis, index) => axis.base + axisNoise[index]);
  const axisEnergy = Array.from({ length: AXIS_COUNT }, () => 0);

  simulation.peaks = simulation.peaks.filter((peak) => simulation.time - peak.createdAt < getPeakLifetime(peak));

  simulation.peaks.forEach((peak) => {
    const envelope = getPeakEnvelope(peak, simulation.time);

    if (envelope <= 0) {
      return;
    }

    peak.weights.forEach((weight, index) => {
      const contribution = weight * peak.intensity * envelope;
      values[index] += contribution;

      if (contribution > 0) {
        axisEnergy[index] = Math.max(axisEnergy[index], clamp(contribution / 0.46, 0, 1));
      }
    });
  });

  values = reinforceDominantPeaks(enforceAsymmetry(values));

  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const rankedValues = values
    .map((value, index) => ({ value, index }))
    .sort((left, right) => right.value - left.value);
  const dominantIndices = Array.from(
    new Set(
      rankedValues
        .filter((entry, index, entries) => index < 4 && (entry.value > average + 0.12 || index < 2 || entries[0].value - entry.value < 0.14))
        .map((entry) => entry.index)
    )
  ).slice(0, 4);
  const stabilizedDominantIndices = dominantIndices.length >= 2
    ? dominantIndices
    : Array.from(new Set([...dominantIndices, ...rankedValues.slice(0, 2).map((entry) => entry.index)])).slice(0, 4);

  const normalizedEnergy = axisEnergy.map((energy, index) => {
    return clamp(energy + Math.max(values[index] - average, 0) * 0.92, 0, 1);
  });

  return {
    values,
    previousValues,
    trailValues,
    pointJitterX,
    pointJitterY,
    axisNoise,
    axisEnergy: normalizedEnergy,
    dominantIndices: stabilizedDominantIndices,
    tension: Math.max(...values) - Math.min(...values)
  } satisfies RadarFrame;
}

function updateSimulation(simulation: SimulationState, timestamp: number) {
  if (simulation.lastTimestamp === null) {
    simulation.lastTimestamp = timestamp;
    simulation.lastFrame = buildFrame(simulation);
    simulation.lastValues = simulation.lastFrame.values;
    return simulation.lastFrame;
  }

  const deltaTime = clamp((timestamp - simulation.lastTimestamp) / 1000, 0.012, 0.08) * MOTION_SPEED;
  simulation.lastTimestamp = timestamp;
  simulation.time += deltaTime;

  simulation.axes.forEach((axis, index) => {
    if (simulation.time >= axis.nextBaseShiftAt) {
      axis.baseTarget = clamp(axisBaselineSignature[index] + randomBetween(-0.11, 0.12), 0.14, 0.6);
      axis.baseRate = randomBetween(1.4, 3.8);
      axis.nextBaseShiftAt = simulation.time + randomBetween(0.55, 2.2);
    }

    axis.base += (axis.baseTarget - axis.base) * clamp(deltaTime * axis.baseRate, 0, 1);

    if (simulation.time >= axis.nextSpikeAt) {
      spawnPeak(simulation, { center: index, major: false });
      axis.nextSpikeAt = simulation.time + randomBetween(0.7, 2.5) * (0.88 + (index % 3) * 0.16);
    }
  });

  while (getActiveMajorCenters(simulation).length < 2) {
    spawnPeak(simulation, { major: true, matured: true });
  }

  if (getActiveMajorCenters(simulation).length < 4 && simulation.time >= simulation.nextMajorPeakAt) {
    spawnPeak(simulation, { major: true });
    simulation.nextMajorPeakAt = simulation.time + randomBetween(0.22, 0.78);
  }

  simulation.lastFrame = buildFrame(simulation);
  simulation.lastValues = simulation.lastFrame.values;

  return simulation.lastFrame;
}

function createSimulation(): SimulationState {
  const simulation: SimulationState = {
    axes: Array.from({ length: AXIS_COUNT }, (_, index) => createAxisRuntime(index)),
    peaks: [],
    time: 0,
    lastTimestamp: null,
    nextMajorPeakAt: randomBetween(0.16, 0.48),
    eventId: 0,
    lastFrame: INITIAL_FRAME,
    lastValues: INITIAL_FRAME.values
  };

  spawnPeak(simulation, { major: true, center: 0, matured: true });
  spawnPeak(simulation, { major: true, center: 3, matured: true });
  spawnPeak(simulation, { major: true, center: 6, matured: true });

  return simulation;
}

export function RadarPulse({ className = '', labels, compact = false, transparent = false }: RadarPulseProps) {
  const [frame, setFrame] = useState<RadarFrame>(INITIAL_FRAME);
  const [reducedMotion, setReducedMotion] = useState(false);
  const simulationRef = useRef<SimulationState | null>(null);
  const fillId = useId();
  const sheenId = useId();
  const strokeId = useId();
  const polygonGlowId = useId();
  const dominantGlowId = useId();
  const sizeClass = compact ? 'max-w-[240px]' : 'max-w-[560px]';
  const labelClass = compact ? 'text-[10px] font-medium' : 'text-[11px]';
  const labelToneClass = 'pointer-events-none uppercase tracking-[0.16em]';
  const surfaceClass = transparent
    ? 'overflow-visible border-transparent bg-transparent shadow-none'
    : 'overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_center,rgba(154,51,255,0.18),rgba(9,20,38,0.84)_66%)] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_56px_rgba(36,107,255,0.18)]';

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(mediaQuery.matches);

    handleChange();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      simulationRef.current = null;
      setFrame(INITIAL_FRAME);
      return;
    }

    simulationRef.current = createSimulation();
    let animationFrame = 0;

    const tick = (timestamp: number) => {
      if (!simulationRef.current) {
        simulationRef.current = createSimulation();
      }

      setFrame(updateSimulation(simulationRef.current, timestamp));
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [reducedMotion]);

  const geometry = useMemo(() => {
    const dominantSet = new Set(frame.dominantIndices);
    const averageValue = frame.values.reduce((sum, value) => sum + value, 0) / frame.values.length;
    const points: RadarPoint[] = baseAxes.map((axis, index) => {
      const value = frame.values[index];
      const delta = value - frame.previousValues[index];

      return {
        x: radarCenter.x + (axis.x - radarCenter.x) * value + frame.pointJitterX[index],
        y: radarCenter.y + (axis.y - radarCenter.y) * value + frame.pointJitterY[index],
        value,
        delta,
        rising: clamp(delta * 9.5, 0, 1),
        dominant: dominantSet.has(index),
        glow: clamp(0.28 + frame.axisEnergy[index] * 0.8 + (dominantSet.has(index) ? 0.18 : 0), 0.18, 1.2),
        energy: frame.axisEnergy[index]
      };
    });

    const trailPoints = baseAxes.map((axis, index) => {
      return {
        x: radarCenter.x + (axis.x - radarCenter.x) * frame.trailValues[index] + frame.pointJitterX[index] * 0.3,
        y: radarCenter.y + (axis.y - radarCenter.y) * frame.trailValues[index] + frame.pointJitterY[index] * 0.3
      };
    });

    const innerPoints = points.map((point) => {
      const innerScale = 0.68 + point.energy * 0.08;

      return {
        x: radarCenter.x + (point.x - radarCenter.x) * innerScale,
        y: radarCenter.y + (point.y - radarCenter.y) * innerScale
      };
    });

    const centroid = points.reduce(
      (accumulator, point) => ({
        x: accumulator.x + point.x,
        y: accumulator.y + point.y
      }),
      { x: 0, y: 0 }
    );
    const centroidX = centroid.x / points.length - radarCenter.x;
    const centroidY = centroid.y / points.length - radarCenter.y;
    const signalHeat = clamp(0.22 + frame.tension * 0.74, 0.24, 1.05);

    return {
      points,
      trailPolygon: toPolygon(trailPoints),
      polygon: toPolygon(points),
      innerPolygon: toPolygon(innerPoints),
      signalHeat,
      fillOpacity: clamp(0.54 + frame.tension * 0.26, 0.54, 0.82),
      trailOpacity: clamp(0.16 + frame.tension * 0.22, 0.16, 0.36),
      auraStyle: {
        transform: `translate(calc(-50% + ${(centroidX * 0.32).toFixed(2)}px), calc(-50% + ${(centroidY * 0.32).toFixed(2)}px))`,
        opacity: 0.16 + signalHeat * 0.26
      } satisfies CSSProperties,
      coreStyle: {
        transform: `translate(calc(-50% + ${(centroidX * 0.14).toFixed(2)}px), calc(-50% + ${(centroidY * 0.14).toFixed(2)}px))`,
        opacity: 0.2 + signalHeat * 0.16
      } satisfies CSSProperties,
      segments: points.map((point, index) => {
        const nextPoint = points[(index + 1) % points.length];
        const edgeContrast = Math.abs(nextPoint.value - point.value);
        const facet = point.value > averageValue + 0.05 && nextPoint.value > averageValue + 0.02;
        const dominant = point.dominant || nextPoint.dominant;

        return {
          index,
          x1: point.x,
          y1: point.y,
          x2: nextPoint.x,
          y2: nextPoint.y,
          dominant,
          facet,
          strokeWidth: clamp(1.1 + edgeContrast * 2.1 + (facet ? 0.36 : 0) + (dominant ? 0.26 : 0), 1.1, 2.7),
          opacity: clamp(0.3 + edgeContrast * 1.2 + (facet ? 0.16 : 0) + (dominant ? 0.14 : 0), 0.32, 1),
          glowOpacity: clamp(0.06 + (point.energy + nextPoint.energy) * 0.16 + edgeContrast * 0.22 + (facet ? 0.1 : 0), 0.06, 0.44)
        };
      }),
      labelStyles: points.map((point, index) => {
        const axis = baseAxes[index];
        const vectorX = (axis.x - radarCenter.x) / axisRadius;
        const vectorY = (axis.y - radarCenter.y) / axisRadius;
        const labelRadius = compact ? 48.4 : 50.6;
        const labelX = clamp(radarCenter.x + vectorX * labelRadius, 6.5, 93.5);
        const labelY = clamp(radarCenter.y + vectorY * labelRadius, 6.8, 93.2);
        const translateX = vectorX > 0.35 ? '-100%' : vectorX < -0.35 ? '0%' : '-50%';
        const translateY = vectorY > 0.35 ? '-100%' : vectorY < -0.35 ? '0%' : '-50%';
        const textAlign = vectorX > 0.35 ? 'right' : vectorX < -0.35 ? 'left' : 'center';
        const flicker = frame.axisNoise[index] * 2.4;
        const opacity = clamp(0.44 + flicker + point.energy * 0.26 + (point.dominant ? 0.18 : 0), 0.32, 1);
        const glowStrength = point.dominant ? 14 + point.glow * 9 : 6 + point.energy * 10;

        return {
          left: `${labelX.toFixed(2)}%`,
          top: `${labelY.toFixed(2)}%`,
          transform: `translate(${translateX}, ${translateY})`,
          opacity,
          color: point.dominant ? '#F7FBFF' : 'rgba(220,228,239,0.86)',
          filter: `brightness(${(point.dominant ? 1.12 : 1 + point.rising * 0.05).toFixed(2)})`,
          textShadow: `0 1px 8px rgba(0,0,0,0.46), 0 0 ${glowStrength.toFixed(1)}px rgba(154,51,255,${(0.08 + point.energy * 0.22).toFixed(3)})`,
          textAlign,
          whiteSpace: 'nowrap',
          lineHeight: compact ? 1.14 : 1.18
        } satisfies CSSProperties;
      })
    };
  }, [frame, compact]);

  return (
    <div className={`relative mx-auto aspect-square w-full ${sizeClass} rounded-full ${surfaceClass} ${className}`}>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[54%] w-[54%] rounded-full bg-[radial-gradient(circle,rgba(154,51,255,0.16)_0%,rgba(36,107,255,0.08)_44%,rgba(9,20,38,0)_76%)] blur-3xl"
        style={geometry.auraStyle}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26%] w-[26%] rounded-full bg-[radial-gradient(circle,rgba(242,57,138,0.1)_0%,rgba(154,51,255,0.14)_58%,rgba(9,20,38,0)_78%)] blur-2xl"
        style={geometry.coreStyle}
      />

      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 h-[96%] w-[96%] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={fillId} x1="10" y1="14" x2="88" y2="86" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2398A" stopOpacity="0.36" />
            <stop offset="0.5" stopColor="#9A33FF" stopOpacity="0.32" />
            <stop offset="1" stopColor="#14C7E5" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id={sheenId} x1="18" y1="16" x2="82" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.14" />
            <stop offset="0.46" stopColor="#DCAEFF" stopOpacity="0.08" />
            <stop offset="1" stopColor="#54E1F4" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id={strokeId} x1="12" y1="18" x2="84" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F99BC6" stopOpacity="0.98" />
            <stop offset="0.46" stopColor="#D28CFF" stopOpacity="0.96" />
            <stop offset="1" stopColor="#74ECF6" stopOpacity="0.9" />
          </linearGradient>
          <filter id={polygonGlowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
          <filter id={dominantGlowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>

        {gridRingScales.map((scale, index) => (
          <polygon
            key={`grid-ring-${scale}`}
            points={createScaledPolygon(scale)}
            fill="none"
            stroke="rgba(255,255,255,0.055)"
            strokeWidth={index === 0 ? 0.75 : 0.62}
            opacity={index === 0 ? 0.86 : 0.72 - index * 0.08}
            strokeLinejoin="miter"
            strokeMiterlimit={10}
          />
        ))}

        {baseAxes.map((axis, index) => (
          <line
            key={`guide-axis-${index}`}
            x1={radarCenter.x}
            y1={radarCenter.y}
            x2={axis.x}
            y2={axis.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.55"
            strokeLinecap="square"
          />
        ))}

        <circle
          cx={radarCenter.x}
          cy={radarCenter.y}
          r="7.8"
          fill="rgba(154,51,255,0.1)"
          opacity={0.18 + geometry.signalHeat * 0.12}
          filter={`url(#${polygonGlowId})`}
        />

        <polygon
          points={geometry.trailPolygon}
          fill="none"
          stroke="rgba(183,116,255,0.24)"
          strokeWidth="1.2"
          opacity={geometry.trailOpacity}
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          filter={`url(#${polygonGlowId})`}
        />

        <polygon
          points={geometry.polygon}
          fill={`url(#${fillId})`}
          opacity={geometry.fillOpacity}
          stroke="none"
          filter={`url(#${polygonGlowId})`}
        />
        <polygon points={geometry.polygon} fill={`url(#${sheenId})`} opacity={0.08 + geometry.signalHeat * 0.1} />
        <polygon
          points={geometry.innerPolygon}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
          opacity="0.8"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
        />
        <polygon
          points={geometry.polygon}
          fill="none"
          stroke={`url(#${strokeId})`}
          strokeWidth="1.12"
          opacity="0.92"
          strokeLinejoin="miter"
          strokeMiterlimit={12}
        />

        {geometry.segments.map((segment) => (
          <g key={`segment-${segment.index}`}>
            <line
              x1={segment.x1}
              y1={segment.y1}
              x2={segment.x2}
              y2={segment.y2}
              stroke={segment.dominant ? 'rgba(242,232,255,0.78)' : 'rgba(210,218,232,0.34)'}
              strokeWidth={segment.strokeWidth + 1.05}
              opacity={segment.glowOpacity}
              strokeLinecap="square"
              filter={`url(#${dominantGlowId})`}
            />
            <line
              x1={segment.x1}
              y1={segment.y1}
              x2={segment.x2}
              y2={segment.y2}
              stroke={segment.dominant ? `url(#${strokeId})` : 'rgba(223,230,241,0.78)'}
              strokeWidth={segment.strokeWidth}
              opacity={segment.opacity}
              strokeLinecap="square"
            />
          </g>
        ))}

        {geometry.points.map((point, index) => (
          <g key={`point-${index}`}>
            <line
              x1={radarCenter.x}
              y1={radarCenter.y}
              x2={point.x}
              y2={point.y}
              stroke={point.dominant ? 'rgba(236,245,255,0.76)' : 'rgba(255,255,255,0.28)'}
              strokeWidth={point.dominant ? 1.2 : 0.8}
              opacity={point.dominant ? 0.76 : 0.48}
              strokeLinecap="square"
            />
            <rect
              x={point.x - (point.dominant ? 2.2 : 1.6)}
              y={point.y - (point.dominant ? 2.2 : 1.6)}
              width={point.dominant ? 4.4 : 3.2}
              height={point.dominant ? 4.4 : 3.2}
              rx="0.34"
              fill={axisTones[index % axisTones.length]}
              opacity={0.12 + point.glow * 0.16}
              transform={`rotate(45 ${point.x} ${point.y})`}
              filter={`url(#${dominantGlowId})`}
            />
            <rect
              x={point.x - (point.dominant ? 1.15 : 0.95)}
              y={point.y - (point.dominant ? 1.15 : 0.95)}
              width={point.dominant ? 2.3 : 1.9}
              height={point.dominant ? 2.3 : 1.9}
              rx="0.22"
              fill={axisTones[index % axisTones.length]}
              opacity={0.5 + point.energy * 0.28}
              transform={`rotate(45 ${point.x} ${point.y})`}
            />
          </g>
        ))}

        <circle
          cx={radarCenter.x}
          cy={radarCenter.y}
          r="1.45"
          fill="#D89DFF"
          opacity={0.34 + geometry.signalHeat * 0.12}
          filter={`url(#${dominantGlowId})`}
        />
        <circle cx={radarCenter.x} cy={radarCenter.y} r="0.72" fill="#F7FBFF" opacity="0.88" />
      </svg>

      {labels
        ? labelPlacements.map((placement, index) => (
            <p
              key={placement.key}
              className={`absolute ${labelToneClass} ${labelClass}`}
              style={geometry.labelStyles[index]}
            >
              {labels[placement.key]}
            </p>
          ))
        : null}
    </div>
  );
}
