'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, LineChart, Radar, Sparkles } from 'lucide-react';

type Emotion = {
    name: string;
    value: number;
};

type Narrative = {
    label: string;
    value: number;
    color: string;
};

type AudienceRow = {
    signal: string;
    values: number[];
};

const EMOTION_SCENARIOS: { label: string; emotions: Emotion[] }[] = [
    {
        label: 'Ceuta border surge',
        emotions: [
            { name: 'Joy', value: 14 },
            { name: 'Trust', value: 37 },
            { name: 'Surprise', value: 66 },
            { name: 'Sadness', value: 51 },
            { name: 'Fear', value: 78 },
            { name: 'Anger', value: 63 },
            { name: 'Skepticism', value: 72 },
        ],
    },
    {
        label: 'Colombia earthquake',
        emotions: [
            { name: 'Joy', value: 11 },
            { name: 'Trust', value: 56 },
            { name: 'Surprise', value: 74 },
            { name: 'Sadness', value: 82 },
            { name: 'Fear', value: 77 },
            { name: 'Anger', value: 24 },
            { name: 'Skepticism', value: 35 },
        ],
    },
    {
        label: 'Strait of Hormuz',
        emotions: [
            { name: 'Joy', value: 8 },
            { name: 'Trust', value: 29 },
            { name: 'Surprise', value: 61 },
            { name: 'Sadness', value: 28 },
            { name: 'Fear', value: 81 },
            { name: 'Anger', value: 54 },
            { name: 'Skepticism', value: 76 },
        ],
    },
];

const NARRATIVE_SCENARIOS: { label: string; narratives: Narrative[] }[] = [
    {
        label: 'Ceuta border surge',
        narratives: [
            { label: 'Border pressure intensifies', value: 36, color: '#246BFF' },
            { label: 'Humanitarian response', value: 28, color: '#F2398A' },
            { label: 'Security concerns', value: 24, color: '#9A33FF' },
            { label: 'Government coordination', value: 18, color: '#14C7E5' },
            { label: 'Local capacity strain', value: 12, color: '#246BFF' },
        ],
    },
    {
        label: 'Colombia earthquake',
        narratives: [
            { label: 'Damage assessment', value: 39, color: '#246BFF' },
            { label: 'Aftershock concerns', value: 31, color: '#F2398A' },
            { label: 'Emergency response', value: 27, color: '#9A33FF' },
            { label: 'Infrastructure disruption', value: 19, color: '#14C7E5' },
            { label: 'Community support', value: 14, color: '#246BFF' },
        ],
    },
    {
        label: 'Strait of Hormuz',
        narratives: [
            { label: 'Oil supply disruption', value: 42, color: '#246BFF' },
            { label: 'Shipping route risk', value: 34, color: '#F2398A' },
            { label: 'Price volatility', value: 29, color: '#9A33FF' },
            { label: 'Regional escalation', value: 21, color: '#14C7E5' },
            { label: 'Energy security', value: 16, color: '#246BFF' },
        ],
    },
];

const AUDIENCE_SCENARIOS: { label: string; audiences: string[]; rows: AudienceRow[] }[] = [
    {
        label: 'Ceuta border surge',
        audiences: ['Spain', 'EU', 'North Africa'],
        rows: [
            { signal: 'Concern', values: [68, 61, 57] },
            { signal: 'Fear', values: [72, 66, 63] },
            { signal: 'Trust', values: [37, 41, 34] },
            { signal: 'Anger', values: [63, 55, 49] },
        ],
    },
    {
        label: 'Colombia earthquake',
        audiences: ['Colombia', 'LatAm', 'US'],
        rows: [
            { signal: 'Sadness', values: [82, 74, 59] },
            { signal: 'Fear', values: [77, 69, 52] },
            { signal: 'Trust', values: [56, 48, 44] },
            { signal: 'Solidarity', values: [70, 64, 51] },
        ],
    },
    {
        label: 'Strait of Hormuz',
        audiences: ['Europe', 'Gulf', 'US'],
        rows: [
            { signal: 'Concern', values: [76, 83, 69] },
            { signal: 'Skepticism', values: [71, 68, 63] },
            { signal: 'Trust', values: [29, 34, 38] },
            { signal: 'Anger', values: [54, 61, 49] },
        ],
    },
];

const AUDIENCE_COLORS = ['#246BFF', '#9A33FF', '#F2398A'];
const RADAR_CENTER = 150;
const RADAR_RADIUS = 82;

function getRadarPoint(value: number, index: number, total: number) {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const distance = RADAR_RADIUS * (value / 100);

    return {
        x: RADAR_CENTER + Math.cos(angle) * distance,
        y: RADAR_CENTER + Math.sin(angle) * distance,
    };
}

function getRadarGridPoint(index: number, total: number, scale: number) {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;

    return {
        x: RADAR_CENTER + Math.cos(angle) * RADAR_RADIUS * scale,
        y: RADAR_CENTER + Math.sin(angle) * RADAR_RADIUS * scale,
    };
}

function useAnimatedValues(values: number[], duration = 650) {
    const displayedValues = useRef(values);
    const [animatedValues, setAnimatedValues] = useState(values);

    useEffect(() => {
        const from = displayedValues.current;
        const startedAt = performance.now();
        let animationFrame = 0;

        function animate(now: number) {
            const progress = Math.min((now - startedAt) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const nextValues = values.map((value, index) => from[index] + (value - from[index]) * easedProgress);

            displayedValues.current = nextValues;
            setAnimatedValues(nextValues);

            if (progress < 1) animationFrame = requestAnimationFrame(animate);
        }

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [duration, values]);

    return animatedValues;
}

function ScenarioSelector({ label, onPrevious, onNext }: { label: string; onPrevious: () => void; onNext: () => void }) {
    return (
        <div className="inline-flex max-w-full items-center rounded-lg border border-white/[0.08] bg-[#050B16]/80 text-[#AAB4C2] shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur-sm">
            <button type="button" className="grid h-8 w-8 shrink-0 place-items-center transition-colors duration-200 hover:bg-white/[0.06] hover:text-[#F5F7FA]" onClick={onPrevious} aria-label="Previous example">
                <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <span className="max-w-[190px] truncate border-x border-white/[0.07] px-3 text-[12px] font-medium tracking-[0.01em] text-[#C5CCD6] sm:max-w-[230px]">{label}</span>

            <button type="button" className="grid h-8 w-8 shrink-0 place-items-center transition-colors duration-200 hover:bg-white/[0.06] hover:text-[#F5F7FA]" onClick={onNext} aria-label="Next example">
                <ChevronRight className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}

function EmotionRadar({ emotions }: { emotions: Emotion[] }) {
    const values = useAnimatedValues(emotions.map((emotion) => emotion.value));
    const radarPoints = values.map((value, index) => {
        const point = getRadarPoint(value, index, emotions.length);
        return `${point.x},${point.y}`;
    }).join(' ');

    return (
        <svg viewBox="0 0 300 300" className="mx-auto h-auto w-full max-w-[300px] origin-center overflow-visible lg:scale-[1.2]">
            <defs>
                <linearGradient id="emotion-radar-fill" x1="70" y1="60" x2="235" y2="240" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#246BFF" stopOpacity="0.72" />
                    <stop offset="0.52" stopColor="#465CFF" stopOpacity="0.62" />
                    <stop offset="1" stopColor="#9A33FF" stopOpacity="0.55" />
                </linearGradient>

                <linearGradient id="emotion-radar-stroke" x1="70" y1="60" x2="235" y2="240" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6D7BFF" />
                    <stop offset="0.55" stopColor="#246BFF" />
                    <stop offset="1" stopColor="#9A33FF" />
                </linearGradient>

                <radialGradient id="emotion-radar-glow">
                    <stop stopColor="#246BFF" stopOpacity="0.14" />
                    <stop offset="1" stopColor="#246BFF" stopOpacity="0" />
                </radialGradient>
            </defs>

            <circle cx="150" cy="150" r="108" fill="url(#emotion-radar-glow)" />

            {[0.25, 0.5, 0.75, 1].map((scale) => (
                <polygon key={scale} points={emotions.map((_, index) => {
                    const point = getRadarGridPoint(index, emotions.length, scale);
                    return `${point.x},${point.y}`;
                }).join(' ')} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
            ))}

            {emotions.map((_, index) => {
                const point = getRadarGridPoint(index, emotions.length, 1);
                return <line key={index} x1="150" y1="150" x2={point.x} y2={point.y} stroke="rgba(255,255,255,0.075)" strokeWidth="1" />;
            })}

            <polygon points={radarPoints} fill="url(#emotion-radar-fill)" stroke="url(#emotion-radar-stroke)" strokeWidth="2" strokeLinejoin="round" />

            {emotions.map((emotion, index) => {
                const point = getRadarPoint(values[index], index, emotions.length);
                return <circle key={emotion.name} cx={point.x} cy={point.y} r="2.8" fill="#5D6CFF" stroke="#B9C3FF" strokeWidth="1" />;
            })}

            {emotions.map((emotion, index) => {
                const angle = (Math.PI * 2 * index) / emotions.length - Math.PI / 2;
                const x = RADAR_CENTER + Math.cos(angle) * 112;
                const y = RADAR_CENTER + Math.sin(angle) * 112;
                const anchor = x < 130 ? 'end' : x > 170 ? 'start' : 'middle';

                return (
                    <text key={emotion.name} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fill="#AAB4C2" fontSize="12">
                        <tspan x={x}>{emotion.name}</tspan>
                        <tspan x={x} dy="14" fill="#F5F7FA" fontWeight="600">{Math.round(values[index])}</tspan>
                    </text>
                );
            })}
        </svg>
    );
}

const MOMENTUM_VALUES = [45, 49, 47, 50, 48, 49, 46, 52, 48, 53, 56, 50, 57, 59, 62, 65, 55, 62, 60, 66, 68];
const MOMENTUM_TIMES = ['02:00', '10:00', '18:00'];
const MOMENTUM_DAYS = ['May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16', 'May 17'];
const MOMENTUM_POINTS = MOMENTUM_VALUES.map((value, index) => ({ value, date: `May ${11 + Math.floor(index / 3)}`, time: index === 20 ? '16:00' : MOMENTUM_TIMES[index % 3] }));
const CHART_WIDTH = 720;
const PLOT_LEFT = 0;
const PLOT_RIGHT = 720;
const PLOT_BOTTOM = 174;
const DEFAULT_ACTIVE_POINT = 15;

function MomentumChart() {
    const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_POINT);
    const chartPoints = MOMENTUM_POINTS.map((point, index) => ({
        ...point,
        x: PLOT_LEFT + (index / (MOMENTUM_POINTS.length - 1)) * (PLOT_RIGHT - PLOT_LEFT),
        y: 166 - ((point.value - 42) / 26) * 84,
    }));
    const linePath = chartPoints.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ');
    const firstPoint = chartPoints[0];
    const lastPoint = chartPoints[chartPoints.length - 1];
    const areaPath = `${linePath} L${lastPoint.x} ${PLOT_BOTTOM} L${firstPoint.x} ${PLOT_BOTTOM} Z`;
    const activePoint = chartPoints[activeIndex];
    const tooltipWidth = 112;
    const tooltipHeight = 42;
    const tooltipX = Math.min(Math.max(activePoint.x - tooltipWidth / 2, 6), CHART_WIDTH - tooltipWidth - 6);
    const tooltipY = Math.max(activePoint.y - tooltipHeight - 10, 7);

    function handlePointerMove(event: ReactPointerEvent<SVGSVGElement>) {
        const bounds = event.currentTarget.getBoundingClientRect();
        const pointerX = ((event.clientX - bounds.left) / bounds.width) * CHART_WIDTH;
        const pointDistance = (PLOT_RIGHT - PLOT_LEFT) / (chartPoints.length - 1);
        const nearestIndex = Math.round((pointerX - PLOT_LEFT) / pointDistance);

        setActiveIndex(Math.min(Math.max(nearestIndex, 0), chartPoints.length - 1));
    }

    return (
        <div className="h-full min-h-[220px] overflow-x-auto bg-[#06101D]">
            <svg viewBox="0 0 720 210" className="block h-auto w-full min-w-[620px] cursor-crosshair" role="img" aria-label="Skepticism momentum chart" onPointerMove={handlePointerMove} onPointerDown={handlePointerMove} onPointerLeave={() => setActiveIndex(DEFAULT_ACTIVE_POINT)}>
                <defs>
                    <linearGradient id="momentum-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F2398A" stopOpacity="0.26" />
                        <stop offset="100%" stopColor="#F2398A" stopOpacity="0" />
                    </linearGradient>

                    <filter id="momentum-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.25" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <rect width="720" height="210" fill="#06101D" />

                {Array.from({ length: 8 }, (_, index) => {
                    const x = index * (CHART_WIDTH / 7);
                    return <line key={`vertical-${index}`} x1={x} y1="0" x2={x} y2="210" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />;
                })}

                {[24, 62, 100, 138, 176].map((y) => (
                    <line key={y} x1="0" y1={y} x2="720" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                ))}

                <text x="12" y="21" fill="#AAB4C2" fontSize="12" fontWeight="500">Skepticism momentum</text>
                <text x="12" y="51" fill="#F5F7FA" fontSize="27" fontWeight="600">+42%</text>
                <text x="12" y="67" fill="#AAB4C2" fontSize="11">vs. previous 3 days</text>

                <path d={areaPath} fill="url(#momentum-area)" />
                <path d={linePath} fill="none" stroke="#F2398A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" filter="url(#momentum-glow)" />

                {chartPoints.map((point, index) => (
                    <circle key={`${point.date}-${point.time}`} cx={point.x} cy={point.y} r={index === activeIndex ? 3.2 : 2} fill="#F2398A" stroke={index === activeIndex ? '#F5F7FA' : 'none'} strokeWidth="0.9" />
                ))}

                <line x1={activePoint.x} y1={tooltipY + tooltipHeight} x2={activePoint.x} y2={PLOT_BOTTOM} stroke="rgba(255,255,255,0.84)" strokeWidth="0.9" strokeDasharray="3 3" />

                <g pointerEvents="none">
                    <rect x={tooltipX} y={tooltipY} width={tooltipWidth} height={tooltipHeight} rx="6" fill="#1A2735" stroke="rgba(255,255,255,0.12)" />
                    <text x={tooltipX + 10} y={tooltipY + 16} fill="#F5F7FA" fontSize="11.5" fontWeight="500">Shift detected</text>
                    <text x={tooltipX + 10} y={tooltipY + 31} fill="#AAB4C2" fontSize="10.5">{activePoint.date}, {activePoint.time}</text>
                </g>

                {MOMENTUM_DAYS.map((day, index) => {
                    const x = (index * 3 + 1) * (CHART_WIDTH / (chartPoints.length - 1));
                    return <text key={day} x={x} y="200" textAnchor="middle" fill="#AAB4C2" fontSize="11">{day}</text>;
                })}
            </svg>
        </div>
    );
}

function nextIndex(current: number, length: number) {
    return (current + 1) % length;
}

function previousIndex(current: number, length: number) {
    return (current - 1 + length) % length;
}

export function CoreCapabilitiesSection() {
    const [emotionScenario, setEmotionScenario] = useState(0);
    const [narrativeScenario, setNarrativeScenario] = useState(0);
    const [audienceScenario, setAudienceScenario] = useState(0);
    const currentEmotionScenario = EMOTION_SCENARIOS[emotionScenario];
    const currentNarrativeScenario = NARRATIVE_SCENARIOS[narrativeScenario];
    const currentAudienceScenario = AUDIENCE_SCENARIOS[audienceScenario];
    const largestNarrative = Math.max(...currentNarrativeScenario.narratives.map((narrative) => narrative.value));

    return (
        <section id="product" className="relative overflow-hidden px-5 py-24 md:px-8 md:py-[115px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9A33FF]/[0.05] blur-[150px]" />

            <div className="relative mx-auto w-full max-w-[1536px]">
                <div className="mb-14 max-w-2xl">
                    <p className="mb-4 text-base font-semibold uppercase tracking-[0.22em] text-[#9A8FB0]">Product Intelligence</p>

                    <h2 className="text-3xl font-semibold tracking-tight text-[#F5F7FA] md:text-5xl">
                        Beyond sentiment. Understand{' '}
                        <span className="bg-gradient-to-r from-[#F2398A] via-[#9A33FF] to-[#246BFF] bg-clip-text text-transparent">what is driving it.</span>
                    </h2>

                    <p className="mt-5 max-w-xl text-lg leading-7 text-[#AAB4C2]">
                        SocialPulse moves beyond mentions and positive/negative sentiment to reveal emotions, narratives, audience differences and emerging shifts.
                    </p>
                </div>

                <div className="space-y-5">
                    <div className="relative grid overflow-hidden rounded-2xl border border-white/[0.08] bg-[#091426]/70 shadow-[0_24px_70px_rgba(0,0,0,0.22)] lg:grid-cols-[1.12fr_0.88fr]">
                        <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[#9A33FF]/[0.13] blur-[95px]" />

                        <article className="group relative flex min-h-[360px] border-b border-white/[0.08] p-6 transition-colors duration-500 hover:bg-white/[0.018] sm:p-8 lg:order-2 lg:border-b-0">
                            <div className="flex h-full w-full flex-col">

                                <div className="flex flex-1 items-center">
                                    <div className="flex max-w-[460px] gap-4">
                                        <Radar className="mt-0.5 h-8 w-8 shrink-0 text-[#9A33FF] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />

                                        <div>
                                            <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#F5F7FA] sm:text-2xl">Emotion Index</h3>
                                            <p className="mt-3 text-base leading-6 text-[#AAB4C2]">Go beyond positive or negative. Our emotion analysis reveals the nuanced feelings driving the conversation.</p>
                                            <p className="mt-3 text-base leading-6 text-[#AAB4C2]">Understand the emotional drivers behind engagement and reputation.</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden px-5 sm:px-8 lg:order-1 lg:border-r lg:border-white/[0.08]">
                            <div className="absolute left-5 top-5 z-10 sm:left-8 sm:top-8">
                                <ScenarioSelector label={currentEmotionScenario.label} onPrevious={() => setEmotionScenario(previousIndex(emotionScenario, EMOTION_SCENARIOS.length))} onNext={() => setEmotionScenario(nextIndex(emotionScenario, EMOTION_SCENARIOS.length))} />
                            </div>

                            <EmotionRadar emotions={currentEmotionScenario.emotions} />
                        </div>
                    </div>

                    <div className="relative grid overflow-hidden rounded-2xl border border-white/[0.08] bg-[#091426]/70 shadow-[0_24px_70px_rgba(0,0,0,0.22)] lg:grid-cols-[1.12fr_0.88fr]">
                        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#246BFF]/[0.13] blur-[100px]" />

                        <div className="relative min-h-[250px] border-b border-white/[0.08] p-5 sm:p-7 lg:border-b-0 lg:border-r">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <h4 className="text-base font-medium text-[#F5F7FA]">Narrative Clusters</h4>
                                <ScenarioSelector label={currentNarrativeScenario.label} onPrevious={() => setNarrativeScenario(previousIndex(narrativeScenario, NARRATIVE_SCENARIOS.length))} onNext={() => setNarrativeScenario(nextIndex(narrativeScenario, NARRATIVE_SCENARIOS.length))} />
                            </div>

                            <div className="mt-5 space-y-3.5">
                                {currentNarrativeScenario.narratives.map(({ label, value, color }, index) => (
                                    <div key={index} className="grid grid-cols-[minmax(130px,1.3fr)_minmax(110px,1fr)_38px] items-center gap-3 text-base sm:grid-cols-[minmax(170px,1.2fr)_minmax(150px,1fr)_42px]">
                                        <span className="truncate text-[#C5CCD6]">{label}</span>

                                        <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                                            <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${Math.max((value / largestNarrative) * 82, 8)}%`, background: `linear-gradient(90deg, ${color}, ${color === '#F2398A' ? '#9A33FF' : '#465CFF'})` }} />
                                        </div>

                                        <span className="text-right font-medium text-[#DCE1E8]">{value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <article className="group relative flex min-h-[250px] items-center p-6 transition-colors duration-500 hover:bg-white/[0.018] sm:p-8">
                            <div className="flex max-w-[520px] gap-4">
                                <Sparkles className="mt-0.5 h-8 w-8 shrink-0 text-[#246BFF] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" strokeWidth={1.5} />

                                <div>
                                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#F5F7FA] sm:text-2xl">Narrative Detection</h3>
                                    <p className="mt-3 text-base leading-6 text-[#AAB4C2]">Automatically discover the themes and stories people are discussing — without manual tagging.</p>
                                    <p className="mt-3 text-base leading-6 text-[#AAB4C2]">See which narratives are growing, fading or influencing sentiment.</p>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="relative grid overflow-hidden rounded-2xl border border-white/[0.08] bg-[#091426]/70 shadow-[0_24px_70px_rgba(0,0,0,0.22)] lg:grid-cols-[0.86fr_1.14fr]">
                        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#F2398A]/[0.12] blur-[100px]" />

                        <article className="group relative flex min-h-[230px] items-center border-b border-white/[0.08] p-6 transition-colors duration-500 hover:bg-white/[0.018] sm:p-8 lg:border-b-0 lg:border-r">
                            <div className="flex max-w-[470px] gap-4">
                                <LayoutGrid className="mt-0.5 h-8 w-8 shrink-0 text-[#F2398A] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />

                                <div>
                                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#F5F7FA] sm:text-2xl">Momentum &amp; Early Warnings</h3>
                                    <p className="mt-3 text-base leading-6 text-[#AAB4C2]">Track momentum over time and get early warnings when the conversation shifts.</p>
                                    <p className="mt-3 text-base leading-6 text-[#AAB4C2]">Spot inflection points before they become widespread.</p>
                                </div>
                            </div>
                        </article>

                        <MomentumChart />
                    </div>

                    <div className="relative grid overflow-hidden rounded-2xl border border-white/[0.08] bg-[#091426]/70 shadow-[0_24px_70px_rgba(0,0,0,0.22)] lg:grid-cols-[1.12fr_0.88fr]">
                        <div className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-[#14C7E5]/[0.11] blur-[100px]" />

                        <div className="relative min-h-[255px] overflow-hidden border-b border-white/[0.08] p-5 sm:p-7 lg:border-b-0 lg:border-r">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <h4 className="text-base font-medium text-[#F5F7FA]">Audience Comparison</h4>
                                <ScenarioSelector label={currentAudienceScenario.label} onPrevious={() => setAudienceScenario(previousIndex(audienceScenario, AUDIENCE_SCENARIOS.length))} onNext={() => setAudienceScenario(nextIndex(audienceScenario, AUDIENCE_SCENARIOS.length))} />
                            </div>

                            <div className="mt-5 overflow-x-auto pb-1 lg:overflow-x-visible">
                                <div className="min-w-[590px] lg:min-w-0">
                                    <div className="grid grid-cols-[105px_repeat(3,minmax(0,1fr))] items-center gap-x-4 text-[12px] text-[#AAB4C2]">
                                        <span />

                                        {currentAudienceScenario.audiences.map((audience, index) => (
                                            <span key={audience} className="flex items-center justify-start gap-1.5">
                                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: AUDIENCE_COLORS[index] }} />
                                                {audience}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-3 space-y-3.5">
                                        {currentAudienceScenario.rows.map((row, rowIndex) => (
                                            <div key={rowIndex} className="grid grid-cols-[105px_repeat(3,minmax(0,1fr))] items-center gap-x-4 text-base">
                                                <span className="text-[#C5CCD6]">{row.signal}</span>

                                                {row.values.map((value, audienceIndex) => (
                                                    <div key={audienceIndex} className="flex items-center gap-2">
                                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                                                            <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${Math.min((value / 70) * 100, 100)}%`, background: `linear-gradient(90deg, ${AUDIENCE_COLORS[audienceIndex]}, ${AUDIENCE_COLORS[audienceIndex]}CC)` }} />
                                                        </div>

                                                        <span className="w-7 text-right font-medium text-[#DCE1E8]">{value}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <article className="group relative flex min-h-[255px] items-center p-6 transition-colors duration-500 hover:bg-white/[0.018] sm:p-8">
                            <div className="flex max-w-[520px] gap-4">
                                <LineChart className="mt-0.5 h-8 w-8 shrink-0 text-[#14C7E5] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />

                                <div>
                                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#F5F7FA] sm:text-2xl">Audience Comparison</h3>
                                    <p className="mt-3 text-base leading-6 text-[#AAB4C2]">Compare how different audiences feel about the same topic across countries, languages or segments.</p>
                                    <p className="mt-3 text-base leading-6 text-[#AAB4C2]">Tailor your message to what each audience cares about.</p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}