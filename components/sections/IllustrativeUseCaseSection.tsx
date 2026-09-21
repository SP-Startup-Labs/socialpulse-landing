'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../LocaleProvider';

const conversationTimeline = [
    { date: 'May 1', text: 'Proposal announced' },
    { date: 'May 4', text: 'Strong engagement' },
    { date: 'May 6', text: 'Feasibility doubts' },
    { date: 'May 10', text: 'Funding clarified' }
];

export function IllustrativeUseCaseSection() {
    const { t } = useLocale();
    const sectionRef = useRef<HTMLElement>(null);
    const hasAnimated = useRef(false);
    const [afterTrust, setAfterTrust] = useState(32);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let animationFrame: number | null = null;

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || hasAnimated.current) return;

            hasAnimated.current = true;
            observer.disconnect();

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                setAfterTrust(54);
                return;
            }

            const startValue = 32;
            const endValue = 54;
            const duration = 1200;
            const startTime = performance.now();

            const animateValue = (currentTime: number) => {
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                setAfterTrust(Math.round(startValue + (endValue - startValue) * easedProgress));

                if (progress < 1) animationFrame = requestAnimationFrame(animateValue);
            };

            animationFrame = requestAnimationFrame(animateValue);
        }, { threshold: 0.35 });

        observer.observe(section);

        return () => {
            observer.disconnect();
            if (animationFrame !== null) cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <section ref={sectionRef} id="roadmap" className="relative overflow-hidden px-5 py-24 md:px-8 md:py-[115px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#246BFF]/[0.04] blur-[150px]" />

            <div className="relative mx-auto w-full max-w-[1536px]">
                <p className="mb-5 text-base font-medium text-[#6E9BFF]">{t('Illustrative use case')}</p>

                <div className="grid xl:grid-cols-[1.12fr_1fr_0.86fr]">
                    <div className="relative pb-10 xl:min-h-[350px] xl:pr-10">
                        <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#246BFF]/[0.09] blur-[100px]" />

                        <div className="relative">
                            <h2 className="max-w-[520px] text-3xl font-semibold leading-[1.12] tracking-tight text-[#F5F7FA] sm:text-4xl">
                                {t('From emerging voice to credible public figure')}
                            </h2>

                            <p className="mt-3 text-lg leading-7 text-[#AAB4C2]">{t('Public reaction to an affordable housing proposal')}</p>

                            <div className="mt-8">
                                <h3 className="text-base font-semibold text-[#F5F7FA]">{t('The conversation')}</h3>

                                <div className="relative mt-5">
                                    <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[10px] hidden h-px bg-[linear-gradient(90deg,rgba(36,107,255,0.35),rgba(154,51,255,0.9),rgba(36,107,255,0.35))] sm:block" />

                                    <div className="relative grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
                                        {conversationTimeline.map((item) => (
                                            <div key={item.date} className="min-w-0 sm:text-center">
                                                <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border border-[#769DFF] bg-[#081426] text-base leading-none text-[#F5F7FA] shadow-[0_0_14px_rgba(36,107,255,0.45)] sm:mx-auto">+</span>
                                                <p className="mt-3 text-base font-medium text-[#F5F7FA]">{t(item.date)}</p>
                                                <p className="mt-2 min-h-[48px] text-base leading-6 text-[#AAB4C2]">{t(item.text)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/[0.12] py-10 xl:min-h-[350px] xl:border-l xl:border-t-0 xl:px-10 xl:py-0">
                        <h3 className="text-base font-semibold text-[#F5F7FA]">{t('Emotional shift')}</h3>
                        <p className="mt-3 text-base leading-6 text-[#AAB4C2]">
                            {t('Clearer information shifted the conversation from skepticism toward trust.')}
                        </p>

                        <div className="mt-7 grid grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] gap-x-2">
                            <p className="col-start-1 row-start-1 text-center text-base leading-6 text-[#AAB4C2]">{t('Before clarification')}</p>
                            <p className="col-start-3 row-start-1 text-center text-base leading-6 text-[#AAB4C2]">{t('After clarification')}</p>

                            <p className="col-start-1 row-start-2 mt-3 text-center text-5xl font-semibold tracking-tight text-[#397BFF]">32%</p>
                            <span aria-hidden="true" className="col-start-2 row-start-2 mt-3 self-center text-center text-4xl font-light text-[#AAB4C2]">→</span>
                            <p className="col-start-3 row-start-2 mt-3 text-center text-5xl font-semibold tracking-tight text-[#2FD19B]">{afterTrust}%</p>

                            <p className="col-start-1 row-start-3 mt-1 text-center text-base text-[#AAB4C2]">{t('Trust')}</p>
                            <p className="col-start-3 row-start-3 mt-1 text-center text-base text-[#AAB4C2]">{t('Trust')}</p>
                        </div>

                        <div className="mt-10 grid gap-3 sm:grid-cols-2">
                            <div className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.08] bg-white/[0.035] px-4 py-4">
                                <span className="text-base text-[#D5DAE2]">{t('Skepticism')}</span>
                                <span className="text-base font-semibold text-[#F2398A]">-19%</span>
                            </div>

                            <div className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.08] bg-white/[0.035] px-4 py-4">
                                <span className="text-base text-[#D5DAE2]">{t('Credibility')}</span>
                                <span className="text-base font-semibold text-[#2FD19B]">+27%</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/[0.12] py-10 xl:min-h-[350px] xl:border-l xl:border-t-0 xl:py-0 xl:pl-10">
                        <h3 className="text-base font-semibold text-[#F5F7FA]">{t('Key insight')}</h3>

                        <p className="mt-4 text-base leading-6 text-[#AAB4C2]">
                            {t('Support centered on housing affordability. Doubts focused on funding—not the proposal itself.')}
                        </p>

                        <div className="my-7 h-px bg-white/[0.1]" />

                        <h3 className="text-base font-semibold text-[#F5F7FA]">{t('Potential outcome')}</h3>
                        <p className="mt-4 text-base leading-6 text-[#AAB4C2]">{t('Positive narrative momentum')}</p>
                        <p className="mt-2 text-5xl font-semibold tracking-tight text-[#397BFF]">+41%</p>
                    </div>
                </div>

                <p className="mt-6 text-base leading-6 text-[#6F7B8C]">{t('(*) Illustrative scenario.')}</p>
            </div>
        </section>
    );
}
