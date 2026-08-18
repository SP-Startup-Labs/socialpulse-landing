'use client';

import { useEffect, useMemo, useState } from 'react';
import {
    Activity,
    BellRing,
    MessageSquareText,
    Search,
    TriangleAlert,
    ArrowRight,
} from 'lucide-react';
import { useLocale } from './LocaleProvider';


export default function HowItWorks() {
    const { t } = useLocale();

    const trendingTopics = useMemo(
        () => ['Ceuta border surge', 'Colombia earthquake', 'Strait of Hormuz'].map(t),
        [t],
    );

    const searches = useMemo(
        () => [
            t('Paris 2024 opening ceremony'),
            'https://www.youtube.com/watch',
            t('New product launch reactions'),
            t('Brand campaign audience response'),
            ...trendingTopics,
        ],
        [t, trendingTopics],
    );

    const [searchIndex, setSearchIndex] = useState(0);
    const [typedSearch, setTypedSearch] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentSearch = searches[searchIndex];

        const timeout = window.setTimeout(
            () => {
                if (!isDeleting) {
                    const nextText = currentSearch.slice(0, typedSearch.length + 1);
                    setTypedSearch(nextText);

                    if (nextText === currentSearch) {
                        window.setTimeout(() => setIsDeleting(true), 1400);
                    }
                } else {
                    const nextText = currentSearch.slice(0, typedSearch.length - 1);
                    setTypedSearch(nextText);

                    if (nextText === '') {
                        setIsDeleting(false);
                        setSearchIndex((current) => (current + 1) % searches.length);
                    }
                }
            },
            isDeleting ? 35 : 65,
        );

        return () => window.clearTimeout(timeout);
    }, [typedSearch, isDeleting, searchIndex, searches]);

    // estados apra analyze puublic conversations

    const analysisSteps = useMemo(
        () => [
            t('Filtering irrelevant noise'),
            t('Detecting emotional signals'),
            t('Measuring emotional intensity'),
            t('Connecting reactions to context'),
            t('Tracking emotional shifts'),
            t('Preparing decision-ready insights'),
        ],
        [t],
    );

    const [analysisIndex, setAnalysisIndex] = useState(0);
    const [isAnalysisMoving, setIsAnalysisMoving] = useState(false);

    useEffect(() => {
        let finishAnimation: number | undefined;

        const interval = window.setInterval(() => {
            setIsAnalysisMoving(true);

            finishAnimation = window.setTimeout(() => {
                setAnalysisIndex(
                    (current) => (current + 1) % analysisSteps.length,
                );
                setIsAnalysisMoving(false);
            }, 500);
        }, 1900);

        return () => {
            window.clearInterval(interval);

            if (finishAnimation) {
                window.clearTimeout(finishAnimation);
            }
        };
    }, [analysisSteps.length]);

    const visibleAnalysisSteps = Array.from(
        { length: 5 },
        (_, offset) =>
            analysisSteps[(analysisIndex + offset) % analysisSteps.length],
    );


    //ANIMACIÓN STEP 04 Hace aparecer la alerta suavemente y reinicia el ciclo

    const actionAlerts = useMemo(
        () => [
            t('Skepticism around safety measures is increasing.'),
            t('Concern grows over Venezuela.'),
            t('Oil prices rise amid Strait of Hormuz tensions.'),
        ],
        [t],
    );

    const [actionAlertIndex, setActionAlertIndex] = useState(0);
    const [isActionAlertMoving, setIsActionAlertMoving] =
        useState(false);

    useEffect(() => {
        let finishTimer: number | undefined;

        const interval = window.setInterval(() => {
            setIsActionAlertMoving(true);

            finishTimer = window.setTimeout(() => {
                setActionAlertIndex(
                    (current) => (current + 1) % actionAlerts.length,
                );

                setIsActionAlertMoving(false);
            }, 700);
        }, 4500);

        return () => {
            window.clearInterval(interval);

            if (finishTimer) {
                window.clearTimeout(finishTimer);
            }
        };
    }, [actionAlerts.length]);

    const nextActionAlertIndex =
        (actionAlertIndex + 1) % actionAlerts.length;

    return (
        <section
            id="how-it-works"
            className="relative overflow-hidden px-5 py-24 md:px-8 md:py-[115px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9A33FF]/[0.05] blur-[150px]" />

            <div className="relative mx-auto w-full max-w-[1536px]">
                <div className="mb-14 max-w-2xl">
                    <p className="mb-4 text-base font-semibold uppercase tracking-[0.22em] text-[#9A8FB0]">
                        {t('How it works')}
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight text-[#F5F7FA] md:text-5xl">
                        {t('From public conversation to')}{' '}
                        <span className="bg-gradient-to-r from-[#F2398A] via-[#9A33FF] to-[#246BFF] bg-clip-text text-transparent">
                            {t('decision-ready signals')}
                        </span>
                    </h2>

                    <p className="mt-5 max-w-xl text-lg leading-7 text-[#AAB4C2]">
                        {t('SocialPulse turns audience reactions into clear emotional signals you can understand and act on.')}
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {/* Step 01 */}
                    <article className="group relative min-h-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#091426]/70 p-4 transition duration-300 hover:border-[#9A33FF]/30 sm:p-6 lg:min-h-[370px] lg:p-8">
                        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#9A33FF]/10 blur-3xl" />

                        <div className="relative flex h-full flex-col">
                            <span className="absolute right-0 top-0 text-base font-medium tracking-[0.18em] text-white/30">
                                01
                            </span>

                            <div className="mb-2 grid min-h-0 grid-cols-[44px_minmax(0,1fr)] items-start gap-4 pt-7 lg:min-h-[124px] lg:gap-5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#9A33FF]/25 bg-[#9A33FF]/10">
                                    <Search className="h-[22px] w-[22px] text-[#B875FF]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-[#F5F7FA]">
                                        {t('Choose what to analyze')}
                                    </h3>

                                    <p className="mt-1 max-w-md text-base leading-6 text-[#AAB4C2]">
                                        {t('Select a topic, campaign or conversation you want to understand.')}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-7 min-h-[232px] rounded-xl border border-white/[0.08] bg-[#050912]/35 p-4">
                                <div className="flex min-h-[46px] items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.025] px-4 py-3">
                                    <Search className="h-4 w-4 shrink-0 text-[#7F8998]" />

                                    <span className="min-w-0 flex-1 truncate text-base text-[#D3D8E0]">
                                        {typedSearch}
                                        <span className="ml-0.5 animate-pulse text-[#14C7E5]">|</span>
                                    </span>

                                    <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#14C7E5] shadow-[0_0_12px_#14C7E5]" />
                                </div>

                                {/* <div className="mt-3 flex flex-wrap gap-2">
                                    {['Brand', 'Launch', 'Audience'].map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-[#9A33FF]/20 bg-[#9A33FF]/[0.08] px-3 py-1 text-base text-[#C7A4FF]"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div> */}

                                <div className="mt-5 border-t border-white/[0.07] pt-4">
                                    <p className="text-[15px] font-semibold uppercase tracking-[0.16em] text-[#7F8998]">
                                        {t('Trending topics')}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
                                        {trendingTopics.map((topic, index) => (
                                            <button type="button" key={topic} onClick={() => {
                                                setSearchIndex(searches.indexOf(topic));
                                                setTypedSearch(topic);
                                                setIsDeleting(false);
                                            }} className="trending-topic cursor-pointer rounded-full border border-[#9A33FF]/25 bg-[#9A33FF]/[0.08] px-3 py-1 text-base text-[#C7A4FF] transition-colors hover:border-[#B875FF]/55 hover:bg-[#9A33FF]/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A33FF]/50" style={{ animationDelay: `${index * 180}ms` }}>
                                                {topic}
                                            </button>
                                        ))}
                                    </div>

                                    <p className="mt-4 text-base leading-5 text-[#7F8998]">
                                        {t('Enter a topic, keyword or URL, or explore a trending conversation.')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Step 02 */}
                    <article className="group relative min-h-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#091426]/70 p-4 transition duration-300 hover:border-[#246BFF]/30 sm:p-6 lg:min-h-[370px] lg:p-8">
                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#246BFF]/10 blur-3xl" />

                        <div className="relative flex h-full flex-col">
                            <span className="absolute right-0 top-0 text-base font-medium tracking-[0.18em] text-white/30">
                                02
                            </span>

                            <div className="mb-2 grid min-h-0 grid-cols-[44px_minmax(0,1fr)] items-start gap-4 pt-7 lg:min-h-[124px] lg:gap-5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#246BFF]/25 bg-[#246BFF]/10">
                                    <MessageSquareText className="h-[22px] w-[22px] text-[#5D91FF]" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#F5F7FA]">
                                        {t('Analyze public conversations')}
                                    </h3>

                                    <p className="mt-1 max-w-md text-base leading-6 text-[#AAB4C2]">
                                        {t('SocialPulse analyzes relevant public conversations across platforms and languages.')}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-7 min-h-[232px] rounded-xl border border-white/[0.08] bg-[#050912]/35 p-4">
                                <p className="text-base font-medium text-[#D3D8E0]">
                                    {t('Analyzing..')}
                                    <span className="animate-[pulse_0.8s_ease-in-out_infinite] text-[#FFFFFF]">.</span>
                                </p>

                                <div className="relative mt-3 h-[144px] overflow-hidden">
                                    <div
                                        className={
                                            isAnalysisMoving
                                                ? 'transition-transform duration-500 ease-out'
                                                : 'transition-none'
                                        }
                                        style={{
                                            transform: isAnalysisMoving
                                                ? 'translateY(-36px)'
                                                : 'translateY(0)',
                                        }}
                                    >
                                        {visibleAnalysisSteps.map((step, index) => (
                                            <div
                                                key={`${analysisIndex}-${index}-${step}`}
                                                className="flex h-9 items-center gap-3 text-base text-[#AAB4C2]"
                                            >
                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#246BFF] shadow-[0_0_8px_rgba(36,107,255,0.7)]" />
                                                <span className="min-w-0 truncate">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Step 03 */}
                    <article className="group relative min-h-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#091426]/70 p-4 transition duration-300 hover:border-[#F2398A]/30 sm:p-6 lg:min-h-[370px] lg:p-8">
                        <div className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-[#F2398A]/10 blur-3xl" />

                        <div className="relative flex h-full flex-col">
                            <span className="absolute right-0 top-0 text-base font-medium tracking-[0.18em] text-white/30">
                                03
                            </span>

                            <div className="mb-2 grid min-h-0 grid-cols-[44px_minmax(0,1fr)] items-start gap-4 pt-7 lg:min-h-[124px] lg:gap-5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#F2398A]/25 bg-[#F2398A]/10">
                                    <Activity className="h-[22px] w-[22px] text-[#F75BA2]" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#F5F7FA]">
                                        {t('Detect a shift')}
                                    </h3>

                                    <p className="mt-1 max-w-md text-base leading-6 text-[#AAB4C2]">
                                        {t('We surface meaningful emotional shifts and emerging narratives early.')}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 min-h-[222px] rounded-xl border border-white/[0.08] bg-[#050912]/35 p-4">
                                <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
                                    <div className="flex min-w-0 items-center gap-2">
                                        <TriangleAlert className="h-4 w-4 text-[#F2398A]" />

                                        <span className="text-base font-medium text-[#D3D8E0]">
                                            {t('Skepticism rising')}
                                        </span>
                                    </div>

                                    <span className="rounded-md border border-[#F2398A]/30 bg-[#F2398A]/15 px-2.5 py-1 text-[15px] font-medium text-[#FF72B1]">
                                        {t('Shift detected')}
                                    </span>
                                </div>

                                <svg
                                    className="mt-3 h-[120px] w-full"
                                    viewBox="0 0 420 120"
                                    preserveAspectRatio="none"
                                    aria-hidden="true"
                                >
                                    <defs>
                                        <linearGradient id="shift-line" x1="0" x2="1">
                                            <stop offset="0%" stopColor="#246BFF" />
                                            <stop offset="52%" stopColor="#9A33FF" />
                                            <stop offset="100%" stopColor="#F2398A" />
                                        </linearGradient>

                                        <linearGradient id="shift-area" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#F2398A" stopOpacity="0.24" />
                                            <stop offset="100%" stopColor="#F2398A" stopOpacity="0" />
                                        </linearGradient>

                                        <pattern
                                            id="shift-grid"
                                            width="52.5"
                                            height="30"
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <path
                                                d="M 52.5 0 L 0 0 0 30"
                                                fill="none"
                                                stroke="rgba(255,255,255,0.055)"
                                                strokeWidth="1"
                                            />
                                        </pattern>

                                        <clipPath id="shift-reveal">
                                            <rect x="0" y="0" width="0" height="120">
                                                <animate
                                                    attributeName="width"
                                                    values="0;420;420;0;0"
                                                    keyTimes="0;0.7;0.9;0.901;1"
                                                    dur="10s"
                                                    repeatCount="indefinite"
                                                />
                                            </rect>
                                        </clipPath>
                                    </defs>

                                    <rect width="420" height="120" fill="url(#shift-grid)" />

                                    <g clipPath="url(#shift-reveal)">
                                        <path
                                            d="M0 105 L28 88 L52 92 L78 71 L105 84 L135 54 L164 76 L194 45 L222 69 L250 39 L278 51 L306 24 L334 34 L363 12 L391 25 L420 5 L420 120 L0 120 Z"
                                            fill="url(#shift-area)"
                                        />

                                        <path
                                            d="M0 105 L28 88 L52 92 L78 71 L105 84 L135 54 L164 76 L194 45 L222 69 L250 39 L278 51 L306 24 L334 34 L363 12 L391 25 L420 5"
                                            fill="none"
                                            stroke="url(#shift-line)"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />

                                        <circle
                                            cx="420"
                                            cy="5"
                                            r="4"
                                            fill="#F2398A"
                                            className="animate-pulse"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </article>

                    {/* Step 04 */}
                    <article className="group relative min-h-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#091426]/70 p-4 transition duration-300 hover:border-[#14C7E5]/30 sm:p-6 lg:min-h-[370px] lg:p-8">
                        <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-[#14C7E5]/10 blur-3xl" />

                        <div className="relative flex h-full flex-col">
                            <span className="absolute right-0 top-0 text-base font-medium tracking-[0.18em] text-white/30">
                                04
                            </span>

                            <div className="mb-2 grid min-h-0 grid-cols-[44px_minmax(0,1fr)] items-start gap-4 pt-7 lg:min-h-[124px] lg:gap-5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#14C7E5]/25 bg-[#14C7E5]/10">
                                    <BellRing className="h-[22px] w-[22px] text-[#3AD6EC]" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#F5F7FA]">
                                        {t('Act on the signal')}
                                    </h3>

                                    <p className="mt-1 max-w-md text-base leading-6 text-[#AAB4C2]">
                                        {t('We deliver insights your team can act on.')}
                                    </p>
                                </div>
                            </div>

                            <div className="relative mt-3 h-[244px] overflow-hidden sm:h-[232px]">
                                {[actionAlertIndex, nextActionAlertIndex].map((alertIndex, position) => (
                                    <div key={`${alertIndex}-${position}`}                                       
                                        className={`absolute inset-x-0 top-0 flex flex-col rounded-xl border border-[#14C7E5]/20 bg-[linear-gradient(135deg,rgba(20,199,229,0.08),rgba(36,107,255,0.04))] p-4 shadow-[0_15px_45px_rgba(20,199,229,0.05)] transition-all duration-700 ease-in-out overflow-hidden ${position === 0
                                                ? isActionAlertMoving
                                                    ? 'z-20 h-[164px] -translate-y-[120%] opacity-0 sm:h-[150px]'
                                                    : 'z-20 h-[164px] translate-y-0 scale-100 opacity-100 sm:h-[150px]' 
                                                : isActionAlertMoving
                                                    ? 'z-30 h-[164px] translate-y-0 scale-100 opacity-100 sm:h-[150px]' 
                                                    : 'z-10 h-[56px] translate-y-[180px] scale-100 opacity-60 sm:translate-y-[166px]' 
                                            }`}>

                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14C7E5] opacity-50" />
                                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#14C7E5]" />
                                            </span>

                                            <span className="text-base font-medium text-[#3AD6EC]">{t('New alert')}</span>
                                        </div>                                       
                                        <p className={`mt-3 text-base leading-6 text-[#D3D8E0] transition-opacity duration-700 ${position === 0 || isActionAlertMoving ? 'opacity-100' : 'opacity-0'
                                            }`}>
                                            {actionAlerts[alertIndex]}
                                        </p>                                        
                                        <button type="button"
                                            className={`mt-auto flex items-center gap-2 text-base font-medium text-[#F5F7FA] transition-all duration-700 hover:text-[#14C7E5] ${position === 0 || isActionAlertMoving ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                }`}>{t('View details')}
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
