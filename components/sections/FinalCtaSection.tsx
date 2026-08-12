'use client';

import { ArrowRight } from 'lucide-react';

export function FinalCtaSection({ onEarlyAccess }: { onEarlyAccess: () => void }) {
    return (
        <section className="relative overflow-hidden px-5 pb-24 pt-14 md:px-8 md:py-[115px]">
            <div className="relative mx-auto grid w-full max-w-[1536px] items-center gap-14 xl:grid-cols-[0.82fr_1.18fr]">
                <div className="relative z-10 xl:flex xl:min-h-[280px] xl:flex-col xl:justify-center">
                    <h2 className="max-w-[620px] text-3xl font-semibold leading-[1.15] tracking-tight text-[#F5F7FA] md:text-5xl">
                        See what audiences are{' '}
                        <span className="bg-gradient-to-r from-[#F2398A] via-[#9A33FF] to-[#246BFF] bg-clip-text text-transparent">
                            really feeling.
                        </span>
                    </h2>

                    <p className="mt-5 text-lg leading-7 text-[#AAB4C2]">
                        Explore a live analysis or request early access.
                    </p>

                    <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                        <a href="#live-analysis" className="navbar-cta-button final-cta-button group inline-flex min-h-[52px] flex-1 items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-semibold text-white">
                            Explore a live analysis
                            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </a>

                        <button type="button" onClick={onEarlyAccess} className="navbar-cta-button final-cta-button group inline-flex min-h-[52px] flex-1 items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-semibold text-white">
                            Request early access
                            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

                <div className="relative h-[230px] w-full md:h-[280px] xl:translate-y-[10px]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(154,51,255,0.12),transparent_65%)] blur-2xl" />

                    <svg viewBox="0 0 760 280" className="relative h-full w-full overflow-visible" role="img" aria-label="Audience emotional signal trend">
                        <defs>
                            <linearGradient id="final-cta-line" x1="0%" y1="50%" x2="100%" y2="50%">
                                <stop offset="0%" stopColor="#246BFF" />
                                <stop offset="48%" stopColor="#9A33FF" />
                                <stop offset="100%" stopColor="#F2398A" />
                            </linearGradient>

                            <filter id="final-cta-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        <path d="M20 212 L66 166 L112 126 L158 115 L204 154 L250 128 L296 162 L342 116 L388 58 L434 91 L480 54 L526 30 L572 76 L618 56 L664 104 L710 82 L744 18" fill="none" stroke="url(#final-cta-line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />

                        {[
                            [20, 212], [66, 166], [112, 126], [158, 115], [204, 154], [250, 128],
                            [296, 162], [342, 116], [388, 58], [434, 91], [480, 54], [526, 30],
                            [572, 76], [618, 56], [664, 104], [710, 82], [744, 18]
                        ].map(([cx, cy], index) => (
                            <circle key={index} cx={cx} cy={cy} r="4" fill="#F5F7FA" stroke={index < 7 ? '#726BFF' : '#F239C6'} strokeWidth="2" filter="url(#final-cta-glow)" />
                        ))}
                    </svg>
                </div>
            </div>
        </section>
    );
}