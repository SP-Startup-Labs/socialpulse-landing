'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  Bell,
  Globe,
  Languages,
  Layers,
  MessageSquareText,
  Radar,
  Sparkle,
  Waypoints
} from 'lucide-react';
import { copy, Language } from '@/lib/content';
import { LeadModal } from './LeadModal';

const navAnchors = ['why', 'what', 'how', 'faq'];

export function LandingPage() {
  const [lang, setLang] = useState<Language>('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = copy[lang];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-dark/90 backdrop-blur">
        <div className="section-wrap flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-brand-gradient" />
            <div>
              <p className="text-lg font-semibold">SocialPulse</p>
              <p className="text-xs text-brand-muted">Early Access</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-brand-muted md:flex">
            {t.nav.map((item, index) => (
              <a key={item} href={`#${navAnchors[index]}`} className="hover:text-white">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-xs"
              onClick={() => setLang((prev) => (prev === 'en' ? 'es' : 'en'))}
            >
              <Languages className="h-4 w-4" /> EN / ES
            </button>
            <button onClick={() => setIsModalOpen(true)} className="hidden rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold md:block">
              {t.ctaPrimary}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="section-wrap pb-20 pt-16">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <div className="mb-6 flex flex-wrap gap-2 text-xs">
                {[t.badgeEarly, t.badgePlatforms, t.badgeAudience].map((badge) => (
                  <span key={badge} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-brand-muted">
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="font-heading text-4xl font-semibold leading-tight text-white md:text-5xl">{t.heroTitle}</h1>
              <p className="mt-5 max-w-2xl text-lg text-brand-muted">{t.heroSubtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => setIsModalOpen(true)} className="rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold">
                  {t.ctaPrimary}
                </button>
                <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm">
                  {t.ctaSecondary}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="glass-card p-4">
              <Image src="/dashboard-mock.svg" alt="Dashboard preview" width={1200} height={720} className="h-auto w-full rounded-xl" priority />
            </div>
          </div>
        </section>

        <section id="why" className="section-wrap pb-16">
          <div className="glass-card bg-micro-grid bg-grid p-8">
            <h2 className="text-3xl font-semibold">{t.whyTitle}</h2>
            <p className="mt-4 max-w-4xl text-brand-muted">{t.whyText}</p>
          </div>
        </section>

        <section id="what" className="section-wrap pb-16">
          <h2 className="text-3xl font-semibold">{t.whatTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ['Emotional signal detection', MessageSquareText],
              ['Trend shifts', Activity],
              ['Narrative drivers', Waypoints],
              ['Context-aware summaries', Layers]
            ].map(([title, Icon]) => (
              <article key={String(title)} className="glass-card p-6">
                <Icon className="h-5 w-5 text-brand-cyan" />
                <h3 className="mt-4 text-lg font-medium">{title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="section-wrap pb-16">
          <h2 className="text-3xl font-semibold">{t.howTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ['Select topic/account', Radar],
              ['Ingest public posts (X/Threads)', Globe],
              ['NLP + emotion modeling', Sparkle],
              ['Dashboard with trends & alerts', Bell]
            ].map(([title, Icon], idx) => (
              <article key={String(title)} className="glass-card p-5">
                <p className="text-xs text-brand-muted">0{idx + 1}</p>
                <Icon className="mt-2 h-5 w-5 text-brand-pink" />
                <h3 className="mt-4 text-base">{title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap pb-16">
          <h2 className="text-3xl font-semibold">{t.capabilitiesTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {['Emotional trend tracking', 'Narrative shift alerts', 'Contextual summaries', 'Benchmarking (Planned)', 'API access (Roadmap)'].map((item) => (
              <div key={item} className="glass-card p-5 text-sm text-brand-muted">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="section-wrap pb-16">
          <h2 className="text-3xl font-semibold">{t.platformsTitle}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="glass-card p-6">
              <h3 className="font-medium">Available Now</h3>
              <ul className="mt-3 space-y-2 text-brand-muted"><li>X</li><li>Threads</li></ul>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-medium">Roadmap</h3>
              <ul className="mt-3 space-y-2 text-brand-muted"><li>Instagram</li><li>TikTok</li><li>YouTube</li><li>Reddit</li></ul>
            </div>
          </div>
        </section>

        <section className="section-wrap pb-16">
          <h2 className="text-3xl font-semibold">{t.roadmapTitle}</h2>
          <div className="mt-6 space-y-3 text-brand-muted">
            <div className="glass-card p-4">Platform expansion</div>
            <div className="glass-card p-4">Domain-adapted models</div>
            <div className="glass-card p-4">API</div>
            <div className="glass-card p-4">Multilingual</div>
          </div>
        </section>

        <section id="faq" className="section-wrap pb-16">
          <h2 className="text-3xl font-semibold">{t.faqTitle}</h2>
          <div className="mt-6 space-y-4">
            {[
              'What platforms are supported?',
              'What stage is the company?',
              'Is this real-time?',
              'How is privacy handled?',
              'Who is this for?',
              'How can investors access more information?'
            ].map((q) => (
              <details key={q} className="glass-card p-5">
                <summary className="cursor-pointer font-medium">{q}</summary>
                <p className="mt-3 text-sm text-brand-muted">SocialPulse is in early access and focused on clear signal extraction from public social data, currently on X and Threads.</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section-wrap pb-20">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-brand-violet/20 to-brand-cyan/20 p-10 text-center">
            <h2 className="text-3xl font-semibold">{t.finalTitle}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-brand-muted">{t.finalText}</p>
            <button onClick={() => setIsModalOpen(true)} className="mt-7 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold">
              {t.ctaPrimary}
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="section-wrap flex flex-wrap items-center justify-between gap-3 text-sm text-brand-muted">
          <span>{t.footer}</span>
          <a href="mailto:contact@socialpulse.ai" className="hover:text-white">contact@socialpulse.ai</a>
        </div>
      </footer>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang={lang} />
    </>
  );
}
