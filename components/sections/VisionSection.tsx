'use client';

import { ArrowRight, BarChart3, CheckCircle2, Database, Gem, Globe2, Rocket, ShieldCheck, Target, TrendingUp, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type VisionPoint = {
    label: string;
    icon: LucideIcon;
};

const technologyPoints: VisionPoint[] = [
    { label: 'Proprietary data and models', icon: Database },
    { label: 'Cross-lingual, real-time analysis', icon: Globe2 }
];

const readinessPoints: VisionPoint[] = [
    { label: 'Working product and live landing page', icon: CheckCircle2 },
    { label: 'Dedicated full-stack and Data/ML teams', icon: CheckCircle2 },
    { label: 'Clear path from MVP to a scalable product', icon: CheckCircle2 }
];

const investorPoints: VisionPoint[] = [
    { label: 'Exclusive access to early funding rounds and key milestones', icon: Gem },
    { label: 'Strong category potential with durable moats', icon: Target },
    { label: 'Long-term value with the potential for outsized returns', icon: TrendingUp }
];

function PointList({ items }: { items: VisionPoint[] }) {
    return (
        <ul className="mt-6 w-full space-y-4 border-t border-white/[0.08] pt-5 text-left">
            {items.map(({ label, icon: Icon }) => (
                <li key={label} className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-3 text-base leading-6 text-[#AAB4C2]">
                    <Icon className="mt-1 h-4 w-4 text-[#667085] transition-colors duration-300 group-hover:text-[#7F8BFF]" strokeWidth={1.7} />
                    <span className="min-w-0 text-left">{label}</span>
                </li>
            ))}
        </ul>
    );
}

function GlowCard({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <article className={`group relative min-h-[390px] rounded-xl bg-white/[0.08] p-px transition-all duration-300 hover:shadow-[0_0_24px_rgba(36,107,255,0.16),0_0_42px_rgba(242,57,138,0.11)] ${className}`}>
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(135deg,#246BFF_0%,#9A33FF_52%,#F2398A_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex h-full flex-col overflow-hidden rounded-[11px] bg-[#07101F] p-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(36,107,255,0.18),transparent_45%),radial-gradient(circle_at_100%_100%,rgba(242,57,138,0.16),transparent_48%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col">{children}</div>
            </div>
        </article>
    );
}

export function VisionSection({ onContactUs }: { onContactUs: () => void }) {
    return (
        <section id="opportunity" className="relative px-5 pb-24 pt-12 md:px-8 md:py-[115px]">
            <div className="mx-auto w-full max-w-[1536px]">
                <div className="grid gap-6 xl:grid-cols-[0.95fr_3.15fr_0.95fr]">
                    <div className="flex flex-col justify-center py-6 xl:pr-6">
                        <p className="text-base font-medium text-[#6E9BFF]">Our vision</p>

                        <h2 className="mt-5 text-3xl font-semibold leading-[1.2] tracking-tight text-[#F5F7FA] md:text-4xl">
                            A real-time understanding layer for the world.
                        </h2>

                        <p className="mt-6 text-lg leading-7 text-[#AAB4C2]">
                            We’re building the infrastructure that helps teams understand public sentiment, emotions and narratives across markets and languages. It turns public conversation into clear, explainable signals for faster, better decisions.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        <GlowCard className="text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.12] transition-all duration-300 group-hover:border-[#6E7BFF]/80 group-hover:shadow-[0_0_20px_rgba(36,107,255,0.25)]">
                                <BarChart3 className="h-7 w-7 text-[#69758A] transition-colors duration-300 group-hover:text-[#F2398A]" strokeWidth={1.7} />
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-[#F5F7FA]">Massive opportunity</h3>

                            <p className="mt-3 bg-gradient-to-r from-[#6E9BFF] via-[#9A33FF] to-[#F2398A] bg-clip-text text-lg font-medium text-transparent">
                                €XB market opportunity
                            </p>

                            <p className="mt-5 text-base leading-6 text-[#AAB4C2]">
                                A global market spanning creators, SMEs, agencies and enterprise intelligence teams.
                            </p>

                            <div className="mt-6 border-t border-white/[0.08] pt-5">
                                <p className="text-base leading-6 text-[#AAB4C2]">
                                    Starting with millions of creators and SMEs that are underserved by enterprise intelligence tools.
                                </p>
                            </div>
                        </GlowCard>

                        <GlowCard className="text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.12] transition-all duration-300 group-hover:border-[#246BFF]/80 group-hover:shadow-[0_0_20px_rgba(36,107,255,0.25)]">
                                <ShieldCheck className="h-7 w-7 text-[#69758A] transition-colors duration-300 group-hover:text-[#246BFF]" strokeWidth={1.7} />
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-[#F5F7FA]">Defensible technology</h3>

                            <p className="mt-5 text-base leading-6 text-[#AAB4C2]">
                                Our engine combines multiple signals with emotion-aware analysis to turn noise into clear, explainable insights.
                            </p>

                            <PointList items={technologyPoints} />
                        </GlowCard>

                        <GlowCard className="text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.12] transition-all duration-300 group-hover:border-[#9A33FF]/80 group-hover:shadow-[0_0_20px_rgba(154,51,255,0.25)]">
                                <Rocket className="h-7 w-7 text-[#69758A] transition-colors duration-300 group-hover:text-[#9A33FF]" strokeWidth={1.7} />
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-[#F5F7FA]">Execution readiness</h3>

                            <PointList items={readinessPoints} />
                        </GlowCard>
                    </div>

                    <GlowCard>
                        <h3 className="text-xl font-semibold text-[#F5F7FA]">For investors</h3>

                        <p className="mt-4 text-base leading-6 text-[#AAB4C2]">
                            We’re partnering with a small number of investors who share our long-term vision. Let’s build this category together.
                        </p>

                        <PointList items={investorPoints} />

                        <div className="mt-5">
                            <button type="button" onClick={onContactUs} className="navbar-cta-button final-cta-button group/button mt-auto flex w-full items-center justify-center gap-3 rounded-lg px-5 py-3.5 text-base font-medium text-white">
                                Contact us
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                            </button>
                        </div>
                    </GlowCard>
                </div>
            </div>
        </section>
    );
}