'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  GaugeCircle,
  Globe,
  LineChart,
  Radar,
  Target
} from 'lucide-react';
import { LeadModal } from './LeadModal';

const navItems = [
  { label: 'Framework', href: '#framework' },
  { label: 'Workflow', href: '#how' },
  { label: 'Opportunity', href: '#opportunity' },
  { label: 'Platforms', href: '#platforms' }
];

const heroMetrics = [
  { label: 'Signal confidence', value: '97%' },
  { label: 'Narratives tracked', value: '18' },
  { label: 'Alert latency', value: '<60s' }
];

const howSteps = [
  {
    title: 'Ingest live public channels',
    description: 'Continuous capture from X and Threads with context-preserving metadata.',
    icon: Globe
  },
  {
    title: 'Model emotional momentum',
    description: 'Emotion-weighted NLP measures acceleration, not just static sentiment.',
    icon: BrainCircuit
  },
  {
    title: 'Detect pressure inflections',
    description: 'Volatility patterns identify narrative turns before consensus forms.',
    icon: Radar
  },
  {
    title: 'Deliver decision signal',
    description: 'Dashboards and alerts structured for investors, press, and strategic teams.',
    icon: Target
  }
];

const capabilities = [
  {
    title: 'Emotion Index Engine',
    description: 'Quantifies intensity, confidence, and direction across public discourse.',
    icon: GaugeCircle
  },
  {
    title: 'Narrative Shift Detection',
    description: 'Flags structural framing changes with timeline-level evidence.',
    icon: LineChart
  },
  {
    title: 'Executive Briefing Layer',
    description: 'Converts noisy streams into disciplined intelligence summaries.',
    icon: BriefcaseBusiness
  }
];

const primaryButtonClass =
  'button-primary rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(58,49,255,0.35)] transition hover:brightness-105';
const secondaryButtonClass =
  'button-secondary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm text-white transition';

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#091426] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-36 -top-36 h-[520px] w-[520px] rounded-full bg-[#F2398A]/30 blur-[180px]" />
          <div className="absolute left-1/2 top-[-160px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#9A33FF]/26 blur-[180px]" />
          <div className="absolute -bottom-32 -right-24 h-[540px] w-[540px] rounded-full bg-[#14C7E5]/25 blur-[180px]" />
          <div className="absolute right-[-16%] top-[10%] h-[560px] w-[880px] rounded-[44%_56%_62%_38%/44%_46%_54%_56%] bg-[linear-gradient(125deg,rgba(242,57,138,0.2),rgba(154,51,255,0.16),rgba(20,199,229,0.14))] blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(170,180,194,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(170,180,194,0.025)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,20,38,0)_34%,rgba(9,20,38,0.72)_100%)]" />
        </div>

        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#091426]/78 backdrop-blur-xl">
          <div className="section-wrap flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="SocialPulse"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl object-contain shadow-[0_0_35px_rgba(154,51,255,0.35)]"
              />
              <div>
                <p className="text-base font-semibold tracking-tight md:text-lg">SocialPulse</p>
                <p className="text-xs text-[#AAB4C2]">Emotional Signal Intelligence</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-[#AAB4C2] lg:flex">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>
            <button onClick={() => setIsModalOpen(true)} className="button-primary rounded-full px-5 py-2.5 text-sm font-semibold text-white">
              Request Access
            </button>
          </div>
        </header>

        <main className="relative z-10">
          <section className="section-wrap pb-28 pt-20 md:pb-36 md:pt-28">
            <div className="grid items-center gap-16 lg:min-h-[78vh] lg:grid-cols-[1.03fr_1fr]">
              <div className="animate-fade-up">
                <div className="mb-8 flex flex-wrap gap-2 text-xs font-medium">
                  {['Early Access', 'X + Threads (Live)'].map((badge) => (
                    <span key={badge} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[#AAB4C2]">
                      {badge}
                    </span>
                  ))}
                </div>
                <h1 className="max-w-2xl text-4xl font-bold leading-[1.04] tracking-[-0.025em] md:text-6xl">
                  Emotional intelligence for social media - built for signal, not noise.
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#AAB4C2] md:text-xl">
                  SocialPulse translates the emotional pulse of public conversations into clear, decision-ready
                  insights for investors, press, and strategic partners.
                </p>
                <div className="mt-11 flex flex-wrap gap-3">
                  <button onClick={() => setIsModalOpen(true)} className={primaryButtonClass}>
                    Request Investor / Press Access
                  </button>
                  <a href="#framework" className={secondaryButtonClass}>
                    See the one-minute overview
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[560px] animate-fade-up" style={{ animationDelay: '120ms' }}>
                <div className="absolute inset-5 translate-x-8 translate-y-8 rotate-[1.8deg] rounded-[34px] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] opacity-60 blur-[1px] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(58,49,255,0.2)]" />
                <article className="hero-shell relative rotate-[-1deg] p-5 sm:p-6">
                  <div className="relative overflow-hidden rounded-[26px] border border-white/10">
                    <Image
                      src="/dashboard-mock.svg"
                      alt="SocialPulse dashboard preview"
                      width={1200}
                      height={720}
                      className="h-auto w-full"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(242,57,138,0.14),rgba(154,51,255,0.16),rgba(36,107,255,0.18),rgba(20,199,229,0.08))]" />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {heroMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] px-3.5 py-3"
                      >
                        <p className="text-xs text-[#AAB4C2]">{metric.label}</p>
                        <p className="mt-1 text-lg font-semibold tracking-tight">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section id="why" className="section-wrap section-space">
            <div className="floating-panel animate-fade-up mx-auto max-w-4xl px-7 py-10 text-center md:px-12 md:py-14">
              <div className="mx-auto mb-7 h-px w-28 bg-[linear-gradient(90deg,#F2398A,#9A33FF,#246BFF)]" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">Why It Matters</h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">
                Emotional drift in public discourse often precedes measurable market response. SocialPulse isolates
                intensity and narrative pressure so teams can act from structured signal rather than anecdotal noise.
              </p>
            </div>
          </section>

          <section id="framework" className="section-wrap section-space">
            <div className="floating-panel animate-fade-up relative overflow-hidden px-6 py-11 md:px-10 md:py-14">
              <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(154,51,255,0.16),rgba(36,107,255,0.08),rgba(9,20,38,0.05))]" />
              <div className="relative text-center">
                <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">Emotional Pulse Framework</h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">
                  Quantifying intensity, volatility, clarity and narrative pressure.
                </p>
              </div>
              <div className="relative mx-auto mt-12 w-full max-w-[620px]">
                <div className="absolute -bottom-7 left-1/2 h-16 w-[72%] -translate-x-1/2 rounded-full bg-black/55 blur-2xl" />
                <div className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(154,51,255,0.2),rgba(9,20,38,0.82)_68%)] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_56px_rgba(36,107,255,0.2)]">
                  <div className="absolute inset-[11%] rounded-full border border-white/15" />
                  <div className="absolute inset-[22%] rounded-full border border-white/12" />
                  <div className="absolute inset-[33%] rounded-full border border-white/10" />
                  <div className="absolute inset-[44%] rounded-full border border-white/10" />
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/12" />
                  <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/12" />
                  <div className="absolute left-1/2 top-1/2 h-px w-[135%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/10" />
                  <div className="absolute left-1/2 top-1/2 h-px w-[135%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white/10" />
                  <div
                    className="absolute inset-[16%] bg-[radial-gradient(circle_at_30%_28%,rgba(242,57,138,0.5),rgba(154,51,255,0.4)_45%,rgba(36,107,255,0.32)_72%,rgba(20,199,229,0.08)_100%)] opacity-90"
                    style={{ clipPath: 'polygon(50% 8%, 84% 31%, 76% 80%, 50% 94%, 22% 72%, 14% 31%)' }}
                  />
                  <p className="absolute left-1/2 top-4 -translate-x-1/2 text-[11px] uppercase tracking-[0.16em] text-[#AAB4C2]">
                    Intensity
                  </p>
                  <p className="absolute right-5 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.16em] text-[#AAB4C2]">
                    Volatility
                  </p>
                  <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.16em] text-[#AAB4C2]">
                    Clarity
                  </p>
                  <p className="absolute left-5 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.16em] text-[#AAB4C2]">
                    Pressure
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="how" className="section-wrap section-space">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">How It Works</h2>
              <p className="mt-5 text-base leading-relaxed text-[#AAB4C2] md:text-lg">
                A controlled workflow from raw social activity to decision-grade narrative intelligence.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {howSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article
                    key={step.title}
                    className="floating-panel floating-panel-hover animate-fade-up p-6"
                    style={{ animationDelay: `${index * 85}ms` }}
                  >
                    <p className="text-xs text-[#AAB4C2]">0{index + 1}</p>
                    <Icon className="mt-4 h-5 w-5 text-[#14C7E5]" />
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#AAB4C2]">{step.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="capabilities" className="section-wrap section-space">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">Capabilities</h2>
              <p className="mt-5 text-base leading-relaxed text-[#AAB4C2] md:text-lg">
                Built for teams evaluating reputation-sensitive narratives in high-speed environments.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="floating-panel floating-panel-hover animate-fade-up p-7"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="h-5 w-5 text-[#F2398A]" />
                    <h3 className="mt-5 text-xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#AAB4C2]">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="opportunity" className="section-wrap section-space">
            <div className="floating-panel animate-fade-up relative overflow-hidden px-7 py-10 md:px-12 md:py-14">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(154,51,255,0.19),rgba(36,107,255,0.14),rgba(9,20,38,0.06))]" />
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">Market Opportunity</h2>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">
                  Two high-velocity segments where emotional narrative shifts materially influence outcomes.
                </p>
                <div className="mt-11 grid gap-9 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <article>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#AAB4C2]">SMEs</p>
                    <div className="mt-3 h-0.5 w-20 bg-[linear-gradient(90deg,#F2398A,#9A33FF)]" />
                    <p className="mt-6 text-5xl font-semibold tracking-tight md:text-6xl">52M+</p>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-[#AAB4C2]">
                      Businesses with public-facing trust exposure where narrative acceleration impacts demand and
                      reputation.
                    </p>
                  </article>
                  <div className="hidden h-40 w-px bg-[linear-gradient(to_bottom,rgba(242,57,138,0.08),rgba(154,51,255,0.6),rgba(36,107,255,0.08))] md:block" />
                  <div className="h-px w-full bg-[linear-gradient(90deg,rgba(242,57,138,0.08),rgba(154,51,255,0.6),rgba(36,107,255,0.08))] md:hidden" />
                  <article>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#AAB4C2]">Creators</p>
                    <div className="mt-3 h-0.5 w-20 bg-[linear-gradient(90deg,#9A33FF,#246BFF)]" />
                    <p className="mt-6 text-5xl font-semibold tracking-tight md:text-6xl">200M+</p>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-[#AAB4C2]">
                      Public creator profiles where emotional volatility often leads distribution, partnership, and
                      monetization shifts.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section id="platforms" className="section-wrap pb-28 md:pb-36">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">Supported Platforms</h2>
              <p className="mt-5 text-base leading-relaxed text-[#AAB4C2] md:text-lg">
                Live coverage is focused and deliberate, with staged expansion aligned to investor relevance.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="floating-panel animate-fade-up p-7">
                <h3 className="text-xl font-semibold tracking-tight">Available Now</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['X', 'Threads'].map((platform) => (
                    <span
                      key={platform}
                      className="rounded-full border border-[#14C7E5]/45 bg-[#14C7E5]/10 px-4 py-1.5 text-sm text-white"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </article>
              <article className="floating-panel animate-fade-up p-7 opacity-70" style={{ animationDelay: '90ms' }}>
                <h3 className="text-xl font-semibold tracking-tight">Roadmap</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Instagram', 'TikTok', 'YouTube', 'Reddit'].map((platform) => (
                    <span key={platform} className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-[#AAB4C2]">
                      {platform}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </section>
        </main>

        <footer className="relative z-10 pb-12 pt-10">
          <div className="section-wrap">
            <div className="mx-auto mb-8 h-px w-full max-w-5xl bg-[linear-gradient(90deg,transparent,rgba(154,51,255,0.62),rgba(36,107,255,0.48),transparent)]" />
            <div className="text-center text-sm text-[#AAB4C2]">
              <div className="mx-auto mb-3 flex w-fit items-center gap-2">
                <Image src="/logo.png" alt="SocialPulse" width={14} height={14} className="h-3.5 w-3.5 rounded object-contain" />
                <span className="font-semibold tracking-tight text-white">SocialPulse</span>
              </div>
              <p>Early access for investor and press briefings.</p>
            </div>
          </div>
        </footer>
      </div>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang="en" />
    </>
  );
}
