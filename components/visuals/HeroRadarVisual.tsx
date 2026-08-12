'use client';

type HeroRadarVisualProps = {
  labels: {
    top: string;
    topRight: string;
    right: string;
    bottomRight: string;
    bottom: string;
    bottomLeft: string;
    left: string;
    topLeft: string;
  };
};

type LabelKey = keyof HeroRadarVisualProps['labels'];

// Vértices del polígono emocional (irregular, para que no parezca un octágono perfecto/genérico)
const RADAR_AXES: Array<{
  key: LabelKey;
  end: { x: number; y: number };
  spoke: { x: number; y: number };
  label: {
    x: number;
    y: number;
    anchor: 'start' | 'middle' | 'end';
  };
}> = [
    { key: 'top', end: { x: 200, y: 72 }, spoke: { x: 200, y: 48 }, label: { x: 200, y: 34, anchor: 'middle' } },
    { key: 'topRight', end: { x: 296, y: 104 }, spoke: { x: 318, y: 82 }, label: { x: 326, y: 86, anchor: 'start' } },
    { key: 'right', end: { x: 338, y: 200 }, spoke: { x: 366, y: 200 }, label: { x: 374, y: 204, anchor: 'start' } },
    { key: 'bottomRight', end: { x: 296, y: 296 }, spoke: { x: 318, y: 318 }, label: { x: 326, y: 326, anchor: 'start' } },
    { key: 'bottom', end: { x: 200, y: 338 }, spoke: { x: 200, y: 362 }, label: { x: 200, y: 378, anchor: 'middle' } },
    { key: 'bottomLeft', end: { x: 104, y: 296 }, spoke: { x: 82, y: 318 }, label: { x: 74, y: 326, anchor: 'end' } },
    { key: 'left', end: { x: 62, y: 200 }, spoke: { x: 34, y: 200 }, label: { x: 26, y: 204, anchor: 'end' } },
    { key: 'topLeft', end: { x: 104, y: 104 }, spoke: { x: 82, y: 82 }, label: { x: 74, y: 86, anchor: 'end' } },
  ];

const RADAR_LEVELS = [0.25, 0.5, 0.75, 1];

function pointOnAxis(point: { x: number; y: number }, level: number) {
  return {
    x: 200 + (point.x - 200) * level,
    y: 200 + (point.y - 200) * level,
  };
}

const SIGNAL_LEVELS = [
  [0.58, 0.9, 0.72, 0.82, 0.42, 0.46, 0.52, 0.88],
  [0.42, 0.56, 0.88, 0.92, 0.66, 0.5, 0.42, 0.54],
  [0.5, 0.44, 0.48, 0.46, 0.42, 0.86, 0.78, 0.92],
  [0.66, 0.7, 0.62, 0.6, 0.54, 0.58, 0.52, 0.68],
];

const SIGNAL_SHAPES = SIGNAL_LEVELS.map((levels) =>
  levels.map((level, index) => pointOnAxis(RADAR_AXES[index].end, level))
);

const POLYGON_POINTS = SIGNAL_SHAPES[0];

const SIGNAL_SNAPSHOT_SEQUENCE = [
  SIGNAL_SHAPES[0],
  SIGNAL_SHAPES[0],
  SIGNAL_SHAPES[1],
  SIGNAL_SHAPES[1],
  SIGNAL_SHAPES[2],
  SIGNAL_SHAPES[2],
  SIGNAL_SHAPES[3],
  SIGNAL_SHAPES[3],
  SIGNAL_SHAPES[0],
];

const SIGNAL_MORPH_KEY_TIMES = '0;0.2;0.26;0.45;0.51;0.7;0.76;0.94;1';
const SIGNAL_MORPH_DURATION = '6s';

const POLYGON_D_VALUES = SIGNAL_SNAPSHOT_SEQUENCE.map((shape) => toPolygonPath(shape)).join('; ');

const NODE_MORPH_VALUES = POLYGON_POINTS.map((_, index) => ({
  x: SIGNAL_SNAPSHOT_SEQUENCE.map((shape) => shape[index].x).join('; '),
  y: SIGNAL_SNAPSHOT_SEQUENCE.map((shape) => shape[index].y).join('; '),
}));

const FLOW_COLORS = ['#F2398A', '#9A33FF', '#14C7E5', '#246BFF'];

const INCOMING_PATHS = RADAR_AXES.map((axis, index) => ({
  d: `M${axis.spoke.x},${axis.spoke.y} L200,200`,
  delay: `${index * 0.42}s`,
  color: FLOW_COLORS[index % FLOW_COLORS.length],
}));

const MICRO_INSIGHTS: Array<{ text: string; x: number; y: number; delay: string }> = [
  { text: 'Trust signal detected', x: 288, y: 164, delay: '0s' },
  { text: 'Narrative pressure rising', x: 236, y: 288, delay: '-2.7s' },
  { text: 'Skepticism increasing', x: 112, y: 164, delay: '-5.3s' },
];

function toPolygonPath(points: { x: number; y: number }[]) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
}

export function HeroRadarVisual({ labels }: HeroRadarVisualProps) {
  const polygonD = toPolygonPath(POLYGON_POINTS);

  return (
    <div className="relative isolate overflow-visible">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(154,51,255,0.18)_0%,rgba(36,107,255,0.1)_38%,rgba(20,199,229,0.05)_56%,rgba(9,20,38,0)_74%)] blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[620px] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] bg-[radial-gradient(ellipse,rgba(242,57,138,0.12)_0%,rgba(154,51,255,0.08)_36%,rgba(9,20,38,0)_72%)] blur-2xl" />

      <div className="relative flex h-[438px] items-center justify-center overflow-visible sm:h-[484px]">
        <div className="hero-radar-wrap relative w-[88%] max-w-[390px] sm:max-w-[460px]">
          {/* halo ambiental detrás del radar */}
          <div className="hero-radar-glow pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(154,51,255,0.32)_0%,rgba(36,107,255,0.14)_46%,rgba(9,20,38,0)_74%)] blur-2xl" />

          <svg
            className="hero-radar-svg relative"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="SocialPulse emotional signal radar"
          >
            <defs>
              <radialGradient id="heroCoreGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#F2398A" />
                <stop offset="70%" stopColor="#9A33FF" />
                <stop offset="100%" stopColor="#246BFF" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="heroPolygonGradient"
                x1="60"
                y1="60"
                x2="340"
                y2="340"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F2398A" />
                <stop offset="0.5" stopColor="#9A33FF" />
                <stop offset="1" stopColor="#14C7E5" />
              </linearGradient>
            </defs>

            {/* telaraña guía */}
            <g aria-hidden="true">
              {RADAR_LEVELS.map((level) => (
                <path
                  key={level}
                  d={toPolygonPath(RADAR_AXES.map((axis) => pointOnAxis(axis.end, level)))}
                  stroke={level === 1 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.075)'}
                  strokeWidth={level === 1 ? '1.15' : '0.9'}
                  fill="none"
                />
              ))}

              {RADAR_AXES.map((axis) => (
                <path
                  key={axis.key}
                  d={`M200,200 L${axis.spoke.x},${axis.spoke.y}`}
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth="1"
                  fill="none"
                />
              ))}
            </g>
            {/* señales / conversaciones públicas entrando por los ejes de la telaraña */}
            {INCOMING_PATHS.map((p, i) => (
              <circle key={i} r="3.2" fill={p.color} className="hero-flow-dot">
                <animateMotion dur="3.6s" begin={p.delay} repeatCount="indefinite" path={p.d} />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.18;0.82;1"
                  dur="3.6s"
                  begin={p.delay}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* polígono emocional: relleno + trazo dibujándose */}
            <path d={polygonD} fill="url(#heroPolygonGradient)" className="hero-polygon-fill" opacity="0">
              <animate
                attributeName="d"
                values={POLYGON_D_VALUES}
                keyTimes={SIGNAL_MORPH_KEY_TIMES}
                dur={SIGNAL_MORPH_DURATION}
                repeatCount="indefinite"
              />
            </path>

            <path
              d={polygonD}
              stroke="url(#heroPolygonGradient)"
              strokeWidth="8"
              strokeLinejoin="round"
              fill="none"
              pathLength={1}
              className="hero-polygon-glow"
            >
              <animate
                attributeName="d"
                values={POLYGON_D_VALUES}
                keyTimes={SIGNAL_MORPH_KEY_TIMES}
                dur={SIGNAL_MORPH_DURATION}
                repeatCount="indefinite"
              />
            </path>

            <path
              d={polygonD}
              stroke="url(#heroPolygonGradient)"
              strokeWidth="1.6"
              strokeLinejoin="round"
              fill="none"
              pathLength={1}
              className="hero-polygon-line"
            >
              <animate
                attributeName="d"
                values={POLYGON_D_VALUES}
                keyTimes={SIGNAL_MORPH_KEY_TIMES}
                dur={SIGNAL_MORPH_DURATION}
                repeatCount="indefinite"
              />
            </path>

            {/* nodos emocionales pulsando */}
            {POLYGON_POINTS.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#ffffff"
                className="hero-radar-node"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <animate
                  attributeName="cx"
                  values={NODE_MORPH_VALUES[i].x}
                  keyTimes={SIGNAL_MORPH_KEY_TIMES}
                  dur={SIGNAL_MORPH_DURATION}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={NODE_MORPH_VALUES[i].y}
                  keyTimes={SIGNAL_MORPH_KEY_TIMES}
                  dur={SIGNAL_MORPH_DURATION}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* núcleo de procesamiento */}
            <circle cx="200" cy="200" r="22" fill="url(#heroCoreGradient)" className="hero-radar-core" />

            {/* labels emocionales alineados con cada eje de la telaraña */}
            {RADAR_AXES.map(({ key, label }) => (
              <text
                key={key}
                x={label.x}
                y={label.y}
                textAnchor={label.anchor}
                fontSize="11"
                fill="rgba(210,217,226,0.82)"
                style={{ fontWeight: 500, letterSpacing: '0.02em' }}
              >
                {labels[key]}
              </text>
            ))}
          </svg>

          {/* micro-insights accionables */}
          {MICRO_INSIGHTS.map((insight) => (
            <span
              key={insight.text}
              className="hero-insight pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm"
              style={{
                left: `${(insight.x / 400) * 100}%`,
                top: `${(insight.y / 400) * 100}%`,
                animationDelay: insight.delay,
              }}
            >
              {insight.text}
            </span>
          ))}
        </div>
        
      </div>
    </div >
  );
}