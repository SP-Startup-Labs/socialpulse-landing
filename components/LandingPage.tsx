'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, BrainCircuit, LineChart, Radar, Target } from 'lucide-react';
import { type Language } from '@/lib/content';
import { LeadModal } from './LeadModal';

type LocalizedContent = {
  brandTagline: string;
  nav: Array<{ label: string; href: string }>;
  badges: { early: string; live: string };
  hero: {
    title: string;
    subtitle: string;
    thesis: string;
    ctaPrimary: string;
    ctaShort: string;
    ctaSecondary: string;
  };
  heroMetrics: Array<{ label: string; value: string }>;
  problem: {
    title: string;
    intro: string;
    points: string[];
    conclusion: string;
  };
  solution: {
    title: string;
    intro: string;
    outputs: string[];
    closing: string;
    frameworkTitle: string;
    frameworkSubtitle: string;
    radarLabels: {
      top: string;
      right: string;
      bottom: string;
      left: string;
    };
  };
  opportunity: {
    title: string;
    intro: string;
    stats: Array<{ value: string; label: string; detail: string }>;
    thesis: string;
  };
  model: {
    title: string;
    intro: string;
    items: Array<{ title: string; detail: string }>;
  };
  roadmap: {
    title: string;
    phases: Array<{ title: string; horizon: string; items: string[] }>;
  };
  positioning: {
    title: string;
    body: string;
    thesis: string;
  };
  platforms: {
    title: string;
    intro: string;
    availableTitle: string;
    roadmapTitle: string;
    available: string[];
    roadmap: string[];
  };
  footer: string;
};

const content: Record<Language, LocalizedContent> = {
  en: {
    brandTagline: 'Emotional Signal Intelligence',
    nav: [
      { label: 'Problem', href: '#problem' },
      { label: 'Solution', href: '#solution' },
      { label: 'Opportunity', href: '#opportunity' },
      { label: 'Roadmap', href: '#roadmap' }
    ],
    badges: {
      early: 'Early Access',
      live: 'X + Threads Live'
    },
    hero: {
      title: 'Emotional Signal Intelligence for Digital Markets.',
      subtitle: 'Transforming public conversations into structured emotional intelligence.',
      thesis: "We don't measure noise. We measure signal.",
      ctaPrimary: 'Request Investor / Press Access',
      ctaShort: 'Request Access',
      ctaSecondary: 'Explore the framework'
    },
    heroMetrics: [
      { label: 'Structured index', value: '97%' },
      { label: 'Narratives monitored', value: '18' },
      { label: 'Alert latency', value: '<60s' }
    ],
    problem: {
      title: 'The Problem',
      intro:
        'Traditional social metrics track volume and velocity, but they do not capture emotional intent or narrative pressure.',
      points: [
        'Markets often react before formal reports are published.',
        'Emotion is frequently the first signal, yet it remains invisible in most decision systems.',
        'Narrative shifts can reprice trust faster than conventional dashboards can explain.',
        'Deciding without emotional context means working with incomplete information.'
      ],
      conclusion: 'Emotional context is no longer optional for digital market decisions.'
    },
    solution: {
      title: 'The Solution',
      intro: 'SocialPulse converts public discourse into structured intelligence:',
      outputs: [
        'Structured emotional indices',
        'Narrative shift detection',
        'Inflection alerts',
        'Clear, decision-ready dashboards'
      ],
      closing: 'The objective is strategic clarity: structured intelligence, not surface analytics.',
      frameworkTitle: 'Emotional Pulse Framework',
      frameworkSubtitle: 'Quantifying intensity, volatility, clarity and narrative pressure.',
      radarLabels: {
        top: 'Intensity',
        right: 'Volatility',
        bottom: 'Clarity',
        left: 'Pressure'
      }
    },
    opportunity: {
      title: 'Market Opportunity',
      intro:
        'SocialPulse sits at the intersection of social media analytics and applied emotional intelligence, where demand is expanding across institutional and operator segments.',
      stats: [
        { value: '>$60B', label: 'Social Media Analytics', detail: 'Projected by 2032' },
        { value: '>$25B', label: 'Addressable SME Segment', detail: 'Serviceable demand profile' },
        { value: '2', label: 'Expanding Global Markets', detail: 'SMEs and a professionalizing creator economy' }
      ],
      thesis: 'One platform. Two expanding global markets.'
    },
    model: {
      title: 'Scalable SaaS Model',
      intro: 'The model is designed for disciplined growth, efficient expansion, and margin resilience.',
      items: [
        { title: 'Freemium -> Paid conversion', detail: 'Low-friction onboarding into subscription tiers.' },
        { title: 'EUR 11.99 to Enterprise', detail: 'Pricing ladder from independent operators to institutional teams.' },
        { title: 'Expansion by usage', detail: 'Natural account growth as monitoring scope and workflow depth increase.' },
        { title: '>70% gross margin alignment', detail: 'Economics consistent with scalable B2B SaaS operations.' }
      ]
    },
    roadmap: {
      title: 'Strategic Roadmap',
      phases: [
        {
          title: 'Phase 1 - Validation & Traction',
          horizon: 'Current',
          items: ['Core emotional engine optimization', 'Freemium conversion', 'Early adopter growth']
        },
        {
          title: 'Phase 2 - Scalability',
          horizon: '12-18 months',
          items: ['Multi-platform integration', 'Predictive layers', 'API integrations']
        },
        {
          title: 'Phase 3 - Category Standard',
          horizon: 'Long-term',
          items: ['Emotional Intelligence as digital decision layer', 'Media and fund partnerships']
        }
      ]
    },
    positioning: {
      title: 'Category Positioning',
      body:
        'Emotional Intelligence applied to social media is moving from a nice-to-have capability to a competitive advantage in market-facing decisions.',
      thesis:
        'SocialPulse is building the infrastructure that transforms emotion from intuition into structured signal.'
    },
    platforms: {
      title: 'Supported Platforms',
      intro: 'Coverage starts with high-signal channels and expands through a staged integration roadmap.',
      availableTitle: 'Available Now',
      roadmapTitle: 'Roadmap',
      available: ['X', 'Threads'],
      roadmap: ['Instagram', 'TikTok', 'YouTube', 'Reddit']
    },
    footer: 'Institutional early access for investor and press briefings.'
  },
  es: {
    brandTagline: 'Inteligencia de Senal Emocional',
    nav: [
      { label: 'Problema', href: '#problem' },
      { label: 'Solucion', href: '#solution' },
      { label: 'Mercado', href: '#opportunity' },
      { label: 'Roadmap', href: '#roadmap' }
    ],
    badges: {
      early: 'Acceso temprano',
      live: 'X + Threads en vivo'
    },
    hero: {
      title: 'Inteligencia de Senal Emocional para Mercados Digitales.',
      subtitle: 'Transformamos conversaciones publicas en inteligencia emocional estructurada.',
      thesis: 'No medimos ruido. Medimos senal.',
      ctaPrimary: 'Solicitar acceso para inversion / prensa',
      ctaShort: 'Solicitar acceso',
      ctaSecondary: 'Explorar el framework'
    },
    heroMetrics: [
      { label: 'Indice estructurado', value: '97%' },
      { label: 'Narrativas monitoreadas', value: '18' },
      { label: 'Latencia de alertas', value: '<60s' }
    ],
    problem: {
      title: 'El Problema',
      intro:
        'Las metricas tradicionales de redes sociales miden volumen y velocidad, pero no capturan la intencion emocional ni la presion narrativa.',
      points: [
        'Los mercados suelen reaccionar antes de que existan reportes formales.',
        'La emocion suele ser la primera senal, pero permanece invisible en la mayoria de los sistemas de decision.',
        'Los cambios narrativos pueden reconfigurar la confianza antes de que un dashboard convencional lo refleje.',
        'Decidir sin contexto emocional implica operar con informacion incompleta.'
      ],
      conclusion: 'El contexto emocional ya no es opcional en decisiones de mercado digital.'
    },
    solution: {
      title: 'La Solucion',
      intro: 'SocialPulse transforma el discurso publico en inteligencia estructurada:',
      outputs: [
        'Indices emocionales estructurados',
        'Deteccion de cambios narrativos',
        'Alertas de inflexion',
        'Dashboards claros y listos para decision'
      ],
      closing: 'El objetivo es claridad estrategica: inteligencia estructurada, no analitica superficial.',
      frameworkTitle: 'Framework de Pulso Emocional',
      frameworkSubtitle: 'Cuantificando intensidad, volatilidad, claridad y presion narrativa.',
      radarLabels: {
        top: 'Intensidad',
        right: 'Volatilidad',
        bottom: 'Claridad',
        left: 'Presion'
      }
    },
    opportunity: {
      title: 'Oportunidad de Mercado',
      intro:
        'SocialPulse se posiciona en la interseccion entre analitica social e inteligencia emocional aplicada, con demanda creciente en segmentos institucionales y operativos.',
      stats: [
        { value: '>$60B', label: 'Analitica de Social Media', detail: 'Proyeccion al 2032' },
        { value: '>$25B', label: 'Segmento SME Direccionable', detail: 'Perfil de demanda atendible' },
        { value: '2', label: 'Mercados Globales en Expansion', detail: 'SMEs y economia creator en profesionalizacion' }
      ],
      thesis: 'Una plataforma. Dos mercados globales en expansion.'
    },
    model: {
      title: 'Modelo SaaS Escalable',
      intro: 'El modelo esta diseniado para crecimiento disciplinado, expansion eficiente y resiliencia de margenes.',
      items: [
        { title: 'Freemium -> conversion a pago', detail: 'Adopcion inicial de baja friccion hacia planes de suscripcion.' },
        { title: 'EUR 11.99 a Enterprise', detail: 'Escalera de precios desde operadores individuales a equipos institucionales.' },
        { title: 'Expansion por uso', detail: 'Crecimiento natural de cuentas segun alcance monitoreado y profundidad de workflow.' },
        { title: '>70% de margen bruto', detail: 'Economia alineada con operaciones B2B SaaS escalables.' }
      ]
    },
    roadmap: {
      title: 'Roadmap Estrategico',
      phases: [
        {
          title: 'Fase 1 - Validacion y Traccion',
          horizon: 'Actual',
          items: ['Optimizacion del motor emocional core', 'Conversion freemium', 'Crecimiento de early adopters']
        },
        {
          title: 'Fase 2 - Escalabilidad',
          horizon: '12-18 meses',
          items: ['Integracion multiplataforma', 'Capas predictivas', 'Integraciones API']
        },
        {
          title: 'Fase 3 - Estandar de Categoria',
          horizon: 'Largo plazo',
          items: ['Inteligencia Emocional como capa de decision digital', 'Partnerships con medios y fondos']
        }
      ]
    },
    positioning: {
      title: 'Posicionamiento de Categoria',
      body:
        'La Inteligencia Emocional aplicada a social media esta pasando de ser una capacidad complementaria a una ventaja competitiva en decisiones de mercado.',
      thesis:
        'SocialPulse esta construyendo la infraestructura que transforma la emocion de intuicion en senal estructurada.'
    },
    platforms: {
      title: 'Plataformas Soportadas',
      intro: 'La cobertura inicia en canales de alta senal y se expande con una hoja de ruta de integracion por etapas.',
      availableTitle: 'Disponible ahora',
      roadmapTitle: 'Roadmap',
      available: ['X', 'Threads'],
      roadmap: ['Instagram', 'TikTok', 'YouTube', 'Reddit']
    },
    footer: 'Acceso institucional para briefings de inversion y prensa.'
  }
};

const primaryButtonClass =
  'button-primary rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(58,49,255,0.35)] transition hover:brightness-105';
const secondaryButtonClass =
  'button-secondary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm text-white transition';

export function LandingPage() {
  const [lang, setLang] = useState<Language>('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = content[lang];

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
          <div className="section-wrap flex h-20 items-center justify-between gap-3">
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
                <p className="text-xs text-[#AAB4C2]">{t.brandTagline}</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-[#AAB4C2] lg:flex">
              {t.nav.map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <div className="flex rounded-full border border-white/15 bg-white/5 p-1 text-xs">
                <button
                  onClick={() => setLang('en')}
                  className={`rounded-full px-3 py-1 ${lang === 'en' ? 'bg-white text-[#091426]' : 'text-[#AAB4C2] hover:text-white'}`}
                  aria-pressed={lang === 'en'}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('es')}
                  className={`rounded-full px-3 py-1 ${lang === 'es' ? 'bg-white text-[#091426]' : 'text-[#AAB4C2] hover:text-white'}`}
                  aria-pressed={lang === 'es'}
                >
                  ES
                </button>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="button-primary rounded-full px-4 py-2.5 text-sm font-semibold text-white md:px-5">
                <span className="hidden md:inline">{t.hero.ctaPrimary}</span>
                <span className="md:hidden">{t.hero.ctaShort}</span>
              </button>
            </div>
          </div>
        </header>

        <main className="relative z-10">
          <section className="section-wrap pb-28 pt-20 md:pb-36 md:pt-28">
            <div className="grid items-center gap-16 lg:min-h-[78vh] lg:grid-cols-[1.03fr_1fr]">
              <div className="animate-fade-up">
                <div className="mb-8 flex flex-wrap gap-2 text-xs font-medium">
                  {[t.badges.early, t.badges.live].map((badge) => (
                    <span key={badge} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[#AAB4C2]">
                      {badge}
                    </span>
                  ))}
                </div>
                <h1 className="max-w-2xl text-4xl font-bold leading-[1.04] tracking-[-0.025em] md:text-6xl">{t.hero.title}</h1>
                <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#AAB4C2] md:text-xl">{t.hero.subtitle}</p>
                <p className="mt-5 text-base font-medium tracking-tight text-white/90 md:text-lg">{t.hero.thesis}</p>
                <div className="mt-11 flex flex-wrap gap-3">
                  <button onClick={() => setIsModalOpen(true)} className={primaryButtonClass}>
                    {t.hero.ctaPrimary}
                  </button>
                  <a href="#solution" className={secondaryButtonClass}>
                    {t.hero.ctaSecondary}
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
                    {t.heroMetrics.map((metric) => (
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

          <section id="problem" className="section-wrap section-space">
            <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
              <article className="floating-panel animate-fade-up p-7 md:p-10">
                <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.problem.title}</h2>
                <p className="mt-6 text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.problem.intro}</p>
                <p className="mt-6 text-base font-medium tracking-tight text-white/90 md:text-lg">{t.problem.conclusion}</p>
              </article>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.problem.points.map((point, index) => (
                  <article
                    key={point}
                    className="floating-panel floating-panel-hover animate-fade-up p-5"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <p className="text-sm leading-relaxed text-[#D2D9E2]">{point}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="solution" className="section-wrap section-space">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
              <article className="floating-panel animate-fade-up p-7 md:p-10">
                <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.solution.title}</h2>
                <p className="mt-6 text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.solution.intro}</p>
                <ul className="mt-7 space-y-3">
                  {t.solution.outputs.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#D2D9E2] md:text-base">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#14C7E5]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 text-sm leading-relaxed text-[#AAB4C2] md:text-base">{t.solution.closing}</p>
              </article>

              <article className="floating-panel animate-fade-up relative overflow-hidden p-6 md:p-8" style={{ animationDelay: '80ms' }}>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.solution.frameworkTitle}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#AAB4C2] md:text-base">{t.solution.frameworkSubtitle}</p>
                <div className="relative mx-auto mt-9 w-full max-w-[420px]">
                  <div className="absolute -bottom-6 left-1/2 h-16 w-[72%] -translate-x-1/2 rounded-full bg-black/55 blur-2xl" />
                  <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(154,51,255,0.2),rgba(9,20,38,0.82)_68%)] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_56px_rgba(36,107,255,0.2)]">
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
                    <p className="absolute left-1/2 top-4 -translate-x-1/2 text-[11px] uppercase tracking-[0.16em] text-[#AAB4C2]">{t.solution.radarLabels.top}</p>
                    <p className="absolute right-5 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.16em] text-[#AAB4C2]">{t.solution.radarLabels.right}</p>
                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.16em] text-[#AAB4C2]">{t.solution.radarLabels.bottom}</p>
                    <p className="absolute left-5 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.16em] text-[#AAB4C2]">{t.solution.radarLabels.left}</p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section id="opportunity" className="section-wrap section-space">
            <article className="floating-panel animate-fade-up relative overflow-hidden p-7 md:p-12">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(154,51,255,0.19),rgba(36,107,255,0.14),rgba(9,20,38,0.06))]" />
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.opportunity.title}</h2>
                <p className="mt-6 max-w-4xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.opportunity.intro}</p>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {t.opportunity.stats.map((stat, index) => (
                    <article
                      key={stat.label}
                      className="floating-panel floating-panel-hover animate-fade-up p-5 md:p-6"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <p className="text-4xl font-semibold tracking-tight md:text-5xl">{stat.value}</p>
                      <p className="mt-3 text-sm font-medium text-white">{stat.label}</p>
                      <p className="mt-2 text-xs text-[#AAB4C2]">{stat.detail}</p>
                    </article>
                  ))}
                </div>
                <p className="mt-8 text-lg font-medium tracking-tight md:text-xl">{t.opportunity.thesis}</p>
              </div>
            </article>
          </section>

          <section id="model" className="section-wrap section-space">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.model.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.model.intro}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {t.model.items.map((item, index) => (
                <article
                  key={item.title}
                  className="floating-panel floating-panel-hover animate-fade-up p-6"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#AAB4C2]">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="roadmap" className="section-wrap section-space">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.roadmap.title}</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {t.roadmap.phases.map((phase, index) => (
                <article
                  key={phase.title}
                  className="floating-panel floating-panel-hover animate-fade-up p-6"
                  style={{ animationDelay: `${index * 95}ms` }}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-[#AAB4C2]">{phase.horizon}</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{phase.title}</h3>
                  <ul className="mt-5 space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#AAB4C2]">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#9A33FF]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="positioning" className="section-wrap section-space">
            <article className="floating-panel animate-fade-up mx-auto max-w-4xl p-8 text-center md:p-12">
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.positioning.title}</h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.positioning.body}</p>
              <p className="mx-auto mt-7 max-w-3xl text-base font-medium tracking-tight text-white/90 md:text-lg">{t.positioning.thesis}</p>
            </article>
          </section>

          <section id="platforms" className="section-wrap pb-28 md:pb-36">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.platforms.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.platforms.intro}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="floating-panel animate-fade-up p-7">
                <h3 className="text-xl font-semibold tracking-tight">{t.platforms.availableTitle}</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.platforms.available.map((platform) => (
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
                <h3 className="text-xl font-semibold tracking-tight">{t.platforms.roadmapTitle}</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.platforms.roadmap.map((platform) => (
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
              <p>{t.footer}</p>
            </div>
          </div>
        </footer>
      </div>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang={lang} />
    </>
  );
}
