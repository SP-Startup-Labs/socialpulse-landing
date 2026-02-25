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
  { label: 'Why it matters', href: '#why' },
  { label: 'How it works', href: '#how' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Platforms', href: '#platforms' }
];

const heroMetrics = [
  { label: 'Signal confidence', value: '97%' },
  { label: 'Active narratives', value: '18' },
  { label: 'Alert latency', value: '<60s' }
];

const howSteps = [
  {
    title: 'Capture public discourse',
    description: 'Live ingestion from X and Threads to map emerging market conversation themes.',
    icon: Globe
  },
  {
    title: 'Model emotional momentum',
    description: 'Emotion-weighted NLP identifies intensity shifts behind surface-level sentiment.',
    icon: BrainCircuit
  },
  {
    title: 'Detect narrative inflection',
    description: 'Pattern detection flags volatility, pressure zones, and turning points early.',
    icon: Radar
  },
  {
    title: 'Deliver decision-ready signal',
    description: 'Concise dashboards and alerts built for investors, press, and strategic teams.',
    icon: Target
  }
];

const capabilities = [
  {
    title: 'Emotion Index Engine',
    description: 'Quantifies direction, confidence, and emotional velocity across public narratives.',
    icon: GaugeCircle
  },
  {
    title: 'Narrative Shift Alerts',
    description: 'Detects structural changes in conversation framing before broad market reaction.',
    icon: LineChart
  },
  {
    title: 'Executive Briefing Layer',
    description: 'Transforms noisy social streams into concise, evidence-based daily intelligence.',
    icon: BriefcaseBusiness
  }
];

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#091426] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-[440px] w-[440px] rounded-full bg-[#F2398A]/30 blur-[150px]" />
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#9A33FF]/25 blur-[150px]" />
          <div className="absolute -bottom-20 -right-12 h-[420px] w-[420px] rounded-full bg-[#14C7E5]/25 blur-[160px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(170,180,194,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(170,180,194,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,20,38,0.84)_0%,rgba(9,20,38,0.24)_30%,rgba(9,20,38,0.28)_68%,rgba(9,20,38,0.9)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,20,38,0)_0%,rgba(9,20,38,0.3)_60%,rgba(9,20,38,0.88)_100%)]" />
        </div>

        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#091426]/80 backdrop-blur-xl">
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-[linear-gradient(120deg,#F2398A_0%,#9A33FF_52%,#246BFF_100%)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_45px_rgba(36,107,255,0.35)] transition hover:brightness-110"
            >
              Request Access
            </button>
          </div>
        </header>

        <main className="relative z-10">
          <section className="section-wrap pb-24 pt-16 md:pb-28 md:pt-24">
            <div className="grid items-center gap-14 lg:min-h-[76vh] lg:grid-cols-[1.05fr_1fr]">
              <div className="animate-fade-up">
                <div className="mb-7 flex flex-wrap gap-2 text-xs font-medium">
                  {['Early Access', 'X + Threads (Live)'].map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[#AAB4C2]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                  Emotional intelligence for social media - built for signal, not noise.
                </h1>
                <p className="mt-6 max-w-2xl text-base text-[#AAB4C2] md:text-xl">
                  SocialPulse translates the emotional pulse of public conversations into clear, decision-ready
                  insights for investors, press, and strategic partners.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-full bg-[linear-gradient(120deg,#F2398A_0%,#9A33FF_52%,#246BFF_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(58,49,255,0.35)] transition hover:brightness-110"
                  >
                    Request Investor / Press Access
                  </button>
                  <a
                    href="#how"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.02] px-7 py-3.5 text-sm text-white transition hover:bg-white/[0.08]"
                  >
                    See the one-minute overview
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
                <div className="absolute -inset-7 -z-10 rounded-[2rem] bg-[linear-gradient(135deg,rgba(242,57,138,0.28),rgba(154,51,255,0.28),rgba(20,199,229,0.22))] blur-3xl" />
                <div className="rounded-[1.9rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src="/dashboard-mock.svg"
                      alt="SocialPulse dashboard preview"
                      width={1200}
                      height={720}
                      className="h-auto w-full"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(242,57,138,0.14),rgba(58,49,255,0.2),rgba(20,199,229,0.12))]" />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {heroMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-white/10 bg-[#0D1A31]/85 px-3 py-3 backdrop-blur"
                      >
                        <p className="text-xs text-[#AAB4C2]">{metric.label}</p>
                        <p className="mt-1 text-lg font-semibold tracking-tight">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="why" className="section-wrap pb-20 md:pb-24">
            <div className="mx-auto max-w-4xl animate-fade-up rounded-3xl border border-white/10 bg-[#0B1A31]/90 px-7 py-10 text-center backdrop-blur md:px-12 md:py-14">
              <div className="mx-auto mb-6 h-px w-28 bg-brand-gradient" />
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why It Matters</h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">
                Market perception can shift long before formal reports catch up. SocialPulse reveals emotional momentum
                and narrative pressure in real time, helping decision-makers respond with context and timing, not
                guesswork.
              </p>
            </div>
          </section>

          <section id="how" className="section-wrap pb-20 md:pb-24">
            <div className="mb-8 max-w-3xl animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
              <p className="mt-4 text-[#AAB4C2]">
                A four-step pipeline built for clarity under pressure, from raw public chatter to structured strategic
                intelligence.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {howSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article
                    key={step.title}
                    className="animate-fade-up rounded-[1.7rem] bg-[linear-gradient(140deg,rgba(242,57,138,0.4),rgba(154,51,255,0.3),rgba(20,199,229,0.35))] p-[1px]"
                    style={{ animationDelay: `${index * 85}ms` }}
                  >
                    <div className="h-full rounded-[calc(1.7rem-1px)] bg-[#0B1A31]/95 p-6">
                      <p className="text-xs text-[#AAB4C2]">0{index + 1}</p>
                      <Icon className="mt-4 h-5 w-5 text-[#14C7E5]" />
                      <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#AAB4C2]">{step.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="capabilities" className="section-wrap pb-20 md:pb-24">
            <div className="mb-8 max-w-3xl animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Capabilities</h2>
              <p className="mt-4 text-[#AAB4C2]">
                Purpose-built AI components engineered for investor and media intelligence workflows.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="animate-fade-up rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_18px_45px_rgba(58,49,255,0.25)]"
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

          <section id="platforms" className="section-wrap pb-24 md:pb-28">
            <div className="mb-8 max-w-3xl animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Supported Platforms</h2>
              <p className="mt-4 text-[#AAB4C2]">Current coverage is live for core channels, with rapid expansion queued.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="animate-fade-up rounded-3xl border border-[#246BFF]/45 bg-[#0F213F]/95 p-7 shadow-[0_18px_55px_rgba(36,107,255,0.22)]">
                <h3 className="text-xl font-semibold tracking-tight">Available Now</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['X', 'Threads'].map((platform) => (
                    <span
                      key={platform}
                      className="rounded-full border border-[#14C7E5]/40 bg-[#14C7E5]/10 px-4 py-1.5 text-sm text-white"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </article>
              <article
                className="animate-fade-up rounded-3xl border border-white/10 bg-white/[0.03] p-7 opacity-70"
                style={{ animationDelay: '100ms' }}
              >
                <h3 className="text-xl font-semibold tracking-tight">Roadmap</h3>
                <div className="mt-5 flex flex-wrap gap-2">
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

        <footer className="relative z-10 border-t border-white/10 py-10">
          <div className="section-wrap text-center text-sm text-[#AAB4C2]">
            <div className="mx-auto mb-3 flex w-fit items-center gap-2">
              <Image
                src="/logo.png"
                alt="SocialPulse"
                width={14}
                height={14}
                className="h-3.5 w-3.5 rounded object-contain"
              />
              <span className="font-semibold tracking-tight text-white">SocialPulse</span>
            </div>
            <p>Early access for investor and press briefings.</p>
          </div>
        </footer>
      </div>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang="en" />
    </>
  );
}
