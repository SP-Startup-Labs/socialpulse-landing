'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowRight,
  Activity,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  LayoutDashboard,
  LineChart,
  Radar,
  Target,
  TrendingUp,
  Users,
  type LucideIcon
} from 'lucide-react';
import { type Language } from '@/lib/content';
import { LeadModal } from './LeadModal';
import { GradientIcon } from './visuals/GradientIcon';
import { NoiseToSignalIllustration } from './visuals/NoiseToSignalIllustration';
import { RadarPulse } from './visuals/RadarPulse';
import { SignalSparkline } from './visuals/SignalSparkline';

type LocalizedContent = {
  brandTagline: string;
  nav: Array<{ label: string; href: string }>;
  badges: { early: string; live: string };
  heroSignals: string[];
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
    pipeline: Array<{ title: string; description: string }>;
    closing: string;
    frameworkTitle: string;
    frameworkSubtitle: string;
    radarLabels: {
      top: string;
      topRight: string;
      right: string;
      bottom: string;
      bottomLeft: string;
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
    freemiumCard: {
      title: string;
      descriptions: string[];
    };
    items: Array<{ title: string; price: string; detail: string }>;
    highlights: string[];
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
    heroSignals: ['Emotional Pulse', 'Narrative Context', 'Decision Signals'],
    hero: {
      title: 'Emotional Intelligence for Social Media.',
      subtitle: 'Turning public conversations into clear emotional signals for decision-making.',
      thesis: 'Engagement shows activity. SocialPulse reveals intention and emotional pressure.',
      ctaPrimary: 'Request Investor / Press Access',
      ctaShort: 'Request Access',
      ctaSecondary: 'Explore the framework'
    },
    heroMetrics: [
      { label: 'Emotion Index', value: 'Live analysis' },
      { label: 'Narrative Shift', value: 'Context detected' },
      { label: 'Signal Momentum', value: 'Actionable alerts' }
    ],
    problem: {
      title: 'The Problem',
      intro:
        'Traditional social metrics measure activity — likes, views and engagement — but they do not explain emotional intent or narrative pressure.',
      points: [
        'Perception shifts before dashboards or reports detect it.',
        'Emotion is often the first signal, yet it remains invisible in most decision systems.',
        'Narrative shifts can reshape trust and reputation in hours.',
        'Without emotional context, decisions are made with incomplete information.'
      ],
      conclusion:
        'Understanding audience emotion is becoming essential for digital decision-making.'
    },
    solution: {
      title: 'The Solution',
      intro:
        'SocialPulse transforms public discourse into structured emotional intelligence:',
      outputs: [
        'Audience emotional mapping by topic and narrative',
        'Narrative shift detection',
        'Reputational risk and tension alerts',
        'Executive-ready dashboards and insights'
      ],
      pipeline: [
        {
          title: 'Capture Layer',
          description: 'Real-time ingestion of public discourse across social platforms.'
        },
        {
          title: 'Emotion Modeling',
          description: 'Multi-dimensional emotional signal extraction.'
        },
        {
          title: 'Narrative Detection',
          description: 'Identifies shifts in public framing and narrative pressure.'
        },
        {
          title: 'Decision Signals',
          description: 'Structured signals designed for investors and strategic teams.'
        }
      ],
      closing:
        'Less noise. Clear emotional context for faster and better decisions.',
      frameworkTitle: 'Emotional Signal Map',
      frameworkSubtitle:
        'Multi-dimensional emotional profiling of public narratives.',
      radarLabels: {
        top: 'Intensity',
        topRight: 'Sentiment',
        right: 'Volatility',
        bottom: 'Activation',
        bottomLeft: 'Clarity',
        left: 'Trust'
      }
    },
    opportunity: {
      title: 'Market Opportunity',
      intro:
        'SocialPulse sits at the intersection of Social Media Analytics and Applied Emotional Intelligence.',
      stats: [
        { value: '>$60B', label: 'Social Media Analytics Market', detail: 'Projected by 2032' },
        { value: '>$25B', label: 'Addressable SME Segment', detail: 'Businesses managing brand perception online' },
        { value: '2', label: 'Primary Markets', detail: 'SMEs and professional creators' }
      ],
      thesis: 'One platform. Two expanding global markets.'
    },
    model: {
      title: 'Business Model',
      intro:
        'Recurring SaaS revenue with organic expansion driven by analytical value.',
      freemiumCard: {
        title: 'Freemium Discovery Layer',
        descriptions: [
          'Designed to demonstrate the platform\'s analytical value quickly while maintaining controlled daily usage limits.',
          'Users experience the full intelligence capability early, creating natural upgrade pressure once continuous monitoring becomes necessary.'
        ]
      },
      items: [
        {
          title: 'Freemium',
          price: 'Free',
          detail:
            'Entry tier for first-time users validating emotional signal workflows before moving into continuous monitoring.'
        },
        {
          title: 'Rising Creators',
          price: '\u20AC11.99 / month',
          detail:
            'Built for micro-influencers, independent creators and early adopters who need regular insight into audience sentiment and narrative momentum. Provides consistent emotional signal monitoring for emerging digital brands and creators building their online presence.',
        },
        {
          title: 'Pulse Pro',
          price: '\u20AC49.99 / month',
          detail:
            'Advanced monitoring designed for professional creators, research teams and organizations that rely on continuous narrative tracking. Unlocks higher analysis volumes, deeper emotional signal layers and expanded monitoring capacity.',
        },
        {
          title: 'Agency / Enterprise',
          price: 'starting at \u20AC124.99 / month',
          detail:
            'Designed for agencies, corporate teams and institutional users that require large-scale narrative monitoring and collaborative intelligence workflows. Includes expanded capacity, multi-topic monitoring and customizable analytical layers.',
        }
      ],
      highlights: [
        'Organic Product Growth',
        'Recurring Subscription Revenue',
        'Software-Level Margins (>70%)'
      ]
    },
    roadmap: {
      title: 'Strategic Roadmap',
      phases: [
        {
          title: 'Phase 1 – Validation & Traction',
          horizon: 'Current',
          items: [
            'Product stabilization and core emotional engine',
            'Freemium validation and first paying users',
            'Early adopters: creators and SMEs'
          ]
        },
        {
          title: 'Phase 2 – Expansion',
          horizon: '3–9 months',
          items: [
            'Industry-specific templates and workflows',
            'Pricing optimization and onboarding improvements',
            'Additional platform integrations'
          ]
        },
        {
          title: 'Phase 3 – Scale',
          horizon: '9–15 months',
          items: [
            'Advanced alert systems and executive reporting',
            'API integrations and B2B partnerships',
            'Operational scaling and infrastructure growth'
          ]
        }
      ]
    },
    positioning: {
      title: 'Category Positioning',
      body:
        'Emotional intelligence applied to social media is rapidly becoming a competitive advantage for brands and organizations.',
      thesis:
        'SocialPulse turns emotional signals from intuition into structured intelligence.'
    },
    platforms: {
      title: 'Supported Platforms',
      intro:
        'Initial coverage focuses on high-signal platforms where public narratives emerge first.',
      availableTitle: 'Available Now',
      roadmapTitle: 'Roadmap',
      available: ['X', 'Threads'],
      roadmap: ['Instagram', 'TikTok', 'YouTube', 'Reddit', 'URL', 'Google Reviews']
    },
    footer: 'Early access available for investors, press and strategic partners.'
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
    heroSignals: ['Pulso Emocional', 'Contexto Narrativo', 'Senales de Decision'],
    hero: {
      title: 'Inteligencia Emocional para Social Media.',
      subtitle: 'Convertimos conversacion publica en senal emocional clara para decidir.',
      thesis:
        'El engagement muestra actividad. SocialPulse revela intencion y presion emocional.',
      ctaPrimary: 'Solicitar acceso para inversion / prensa',
      ctaShort: 'Solicitar acceso',
      ctaSecondary: 'Explorar el framework'
    },
    heroMetrics: [
      { label: 'Indice Emocional', value: 'Analisis en vivo' },
      { label: 'Cambio Narrativo', value: 'Contexto detectado' },
      { label: 'Signal Momentum', value: 'Alertas accionables' }
    ],
    problem: {
      title: 'El Problema',
      intro:
        'Las metricas tradicionales de redes sociales miden actividad - likes, views y engagement - pero no explican intencion emocional ni presion narrativa.',
      points: [
        'La percepcion cambia antes que cualquier dashboard.',
        'La emocion suele ser la primera senal, pero hoy no se mide.',
        'Un giro narrativo puede destruir confianza en horas.',
        'Decidir sin contexto emocional implica operar con informacion incompleta.'
      ],
      conclusion:
        'Comprender el estado emocional del publico es clave para tomar decisiones digitales.'
    },
    solution: {
      title: 'La Solucion',
      intro:
        'SocialPulse transforma conversaciones publicas en inteligencia emocional estructurada:',
      outputs: [
        'Mapa emocional del publico por tema y narrativa',
        'Deteccion de cambios narrativos',
        'Alertas de tension y riesgo reputacional',
        'Dashboards ejecutivos listos para decidir'
      ],
      pipeline: [
        {
          title: 'Capa de Captura',
          description: 'Ingestion en tiempo real de discurso publico en plataformas sociales.'
        },
        {
          title: 'Modelado Emocional',
          description: 'Extraccion multidimensional de senales emocionales.'
        },
        {
          title: 'Deteccion Narrativa',
          description: 'Identifica cambios en framing publico y presion narrativa.'
        },
        {
          title: 'Senales de Decision',
          description: 'Senales estructuradas para inversores y equipos estrategicos.'
        }
      ],
      closing:
        'Menos ruido. Mas contexto para actuar.',
      frameworkTitle: 'Mapa de Senal Emocional',
      frameworkSubtitle:
        'Perfilado emocional multidimensional de narrativas publicas.',
      radarLabels: {
        top: 'Intensidad',
        topRight: 'Sentimiento',
        right: 'Volatilidad',
        bottom: 'Activacion',
        bottomLeft: 'Claridad',
        left: 'Confianza'
      }
    },
    opportunity: {
      title: 'Oportunidad de Mercado',
      intro:
        'SocialPulse se posiciona entre la analitica de social media y la inteligencia emocional aplicada.',
      stats: [
        { value: '>$60B', label: 'Mercado de Social Media Analytics', detail: 'Proyeccion al 2032' },
        { value: '>$25B', label: 'Segmento PyME direccionable', detail: 'Empresas que gestionan reputacion digital' },
        { value: '2', label: 'Mercados iniciales', detail: 'PyMEs y economia creator' }
      ],
      thesis: 'Una plataforma. Dos mercados globales en expansion.'
    },
    model: {
      title: 'Modelo de Negocio',
      intro:
        'Ingresos SaaS recurrentes con expansion organica impulsada por valor analitico.',
      freemiumCard: {
        title: 'Capa de Descubrimiento Freemium',
        descriptions: [
          'Disenada para demostrar rapidamente el valor analitico de la plataforma, manteniendo limites de uso diario controlados.',
          'Los usuarios acceden temprano a la capacidad completa de inteligencia, generando una presion natural de upgrade cuando el monitoreo continuo se vuelve necesario.'
        ]
      },
      items: [
        {
          title: 'Freemium',
          price: 'Gratis',
          detail:
            'Capa de entrada para validar el flujo de senales emocionales antes de pasar a monitoreo continuo.',
        },
        {
          title: 'Rising Creators',
          price: '\u20AC11.99 / mes',
          detail:
            'Pensado para microinfluencers, creadores independientes y early adopters que necesitan lectura continua de sentimiento y momentum narrativo. Aporta monitoreo emocional consistente para marcas digitales emergentes y creadores que construyen su presencia online.',
        },
        {
          title: 'Pulse Pro',
          price: '\u20AC49.99 / mes',
          detail:
            'Monitoreo avanzado para creadores profesionales, equipos de research y organizaciones que dependen de seguimiento narrativo continuo. Habilita mayor volumen de analisis, capas emocionales mas profundas y mas capacidad de monitoreo.',
        },
        {
          title: 'Agency / Enterprise',
          price: 'desde \u20AC124.99 / mes',
          detail:
            'Dirigido a agencias, equipos corporativos y usuarios institucionales que requieren monitoreo narrativo a escala y flujos colaborativos de inteligencia. Incluye capacidad expandida, monitoreo multi-tema y capas analiticas personalizables.',
        }
      ],
      highlights: [
        'Crecimiento organico del producto',
        'Ingresos recurrentes por suscripcion',
        'Margenes de software (>70%)'
      ]
    },
    roadmap: {
      title: 'Roadmap Estrategico',
      phases: [
        {
          title: 'Fase 1 - Validacion y Traccion',
          horizon: 'Actual',
          items: [
            'Producto estable y motor emocional optimizado',
            'Validacion del modelo freemium',
            'Primeros usuarios pagos: creators y PyMEs'
          ]
        },
        {
          title: 'Fase 2 - Expansion',
          horizon: '3-9 meses',
          items: [
            'Plantillas por industria',
            'Optimizacion de onboarding y pricing',
            'Integracion con nuevas plataformas'
          ]
        },
        {
          title: 'Fase 3 - Escala',
          horizon: '9-15 meses',
          items: [
            'Alertas avanzadas y reporting ejecutivo',
            'API e integraciones B2B',
            'Escalado de infraestructura'
          ]
        }
      ]
    },
    positioning: {
      title: 'Posicionamiento de Categoria',
      body:
        'La inteligencia emocional aplicada a social media se esta convirtiendo en una ventaja competitiva.',
      thesis:
        'SocialPulse transforma la emocion de intuicion en senal estructurada.'
    },
    platforms: {
      title: 'Plataformas Soportadas',
      intro:
        'La cobertura inicial se enfoca en plataformas de alta senal donde las narrativas emergen primero.',
      availableTitle: 'Disponible ahora',
      roadmapTitle: 'Roadmap',
      available: ['X', 'Threads'],
      roadmap: ['Instagram', 'TikTok', 'YouTube', 'Reddit', 'URL', 'Google Reviews']
    },
    footer:
      'Acceso temprano disponible para inversores, prensa y partners estrategicos.'
  }
};


const primaryButtonClass =
  'button-primary rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(58,49,255,0.35)] transition hover:brightness-105';
const secondaryButtonClass =
  'button-secondary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm text-white transition';

const opportunityIcons: LucideIcon[] = [TrendingUp, BriefcaseBusiness, Users];
const modelIcons: LucideIcon[] = [TrendingUp, BarChart3, Activity, LineChart];
const roadmapIcons: LucideIcon[] = [Activity, LineChart, Target];
const platformIcons: LucideIcon[] = [Activity, Radar, LineChart, Target];

function SectionHeaderAccent({ icon, tone }: { icon: LucideIcon; tone: 'pink' | 'purple' | 'blue' | 'cyan' }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <GradientIcon icon={icon} tone={tone} className="h-8 w-8" size={14} />
      <div className="h-px w-16 bg-[linear-gradient(90deg,#F2398A,#9A33FF,#246BFF)]" />
    </div>
  );
}

export function LandingPage() {
  const [lang, setLang] = useState<Language>('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = content[lang];
  const visualLabels =
    lang === 'en'
      ? {
          volume: 'volume',
          velocity: 'velocity',
          emotionalIntent: 'emotional intent',
          narrativePressure: 'narrative pressure',
          heroMicroOne: 'Narrative Pressure',
          heroMicroOneValue: 'Elevated',
          heroMicroTwo: 'Volatility Lens',
          heroMicroTwoValue: 'Watching',
          socialAnalytics: 'social media analytics',
          appliedEI: 'applied emotional intelligence',
          funnelFreemium: 'Freemium',
          funnelPaid: 'Paid',
          funnelExpansion: 'Expansion'
        }
      : {
          volume: 'volumen',
          velocity: 'velocidad',
          emotionalIntent: 'intencion emocional',
          narrativePressure: 'presion narrativa',
          heroMicroOne: 'Presion Narrativa',
          heroMicroOneValue: 'Elevada',
          heroMicroTwo: 'Lente de Volatilidad',
          heroMicroTwoValue: 'Seguimiento',
          socialAnalytics: 'analitica de social media',
          appliedEI: 'inteligencia emocional aplicada',
          funnelFreemium: 'Freemium',
          funnelPaid: 'Pago',
          funnelExpansion: 'Expansion'
        };

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
          <div className="section-wrap flex h-24 items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="relative inline-flex h-16 w-16 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#F2398A,#9A33FF,#246BFF)] opacity-20 blur-[20px]" />
                <Image
                  src="/logo.png"
                  alt="SocialPulse"
                  width={70}
                  height={70}
                  className="relative h-16 w-16 rounded-2xl object-contain shadow-[0_0_35px_rgba(154,51,255,0.35)]"
                />
              </span>
              <div>
                <p className="text-lg font-bold tracking-tight md:text-xl">SocialPulse</p>
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
                  {t.heroSignals.map((badge) => (
                    <span key={badge} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[#AAB4C2]">
                      {badge}
                    </span>
                  ))}
                </div>
                <h1 className="max-w-2xl text-4xl font-bold leading-[1.04] tracking-[-0.025em] md:text-6xl">{t.hero.title}</h1>
                <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#AAB4C2] md:text-xl">{t.hero.subtitle}</p>
                <NoiseToSignalIllustration className="mt-6 h-auto w-full max-w-[250px] opacity-90" />
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
                <article className="double-layer-panel absolute -left-10 top-16 z-20 rounded-2xl border border-white/10 bg-[#0D1A31]/85 px-3 py-2 backdrop-blur sm:-left-16">
                  <div className="flex items-center gap-2">
                    <GradientIcon icon={Activity} tone="cyan" className="h-7 w-7" size={12} />
                    <p className="text-[10px] text-[#AAB4C2]">{visualLabels.heroMicroOne}</p>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{visualLabels.heroMicroOneValue}</p>
                    <SignalSparkline tone="cyan" className="h-5 w-12" />
                  </div>
                </article>
                <article className="double-layer-panel absolute -right-8 bottom-10 z-20 rounded-2xl border border-white/10 bg-[#0D1A31]/85 px-3 py-2 backdrop-blur sm:-right-12">
                  <div className="flex items-center gap-2">
                    <GradientIcon icon={LineChart} tone="pink" className="h-7 w-7" size={12} />
                    <p className="text-[10px] text-[#AAB4C2]">{visualLabels.heroMicroTwo}</p>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{visualLabels.heroMicroTwoValue}</p>
                    <SignalSparkline tone="pink" variant="spike" className="h-5 w-12" />
                  </div>
                </article>
                <div className="absolute inset-5 translate-x-8 translate-y-8 rotate-[1.8deg] rounded-[34px] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] opacity-60 blur-[1px] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(58,49,255,0.2)]" />
                <article className="hero-shell double-layer-panel relative rotate-[-1deg] p-5 sm:p-6">
                  <div className="relative overflow-hidden rounded-[26px] border border-white/10">
                    <Image
                      src="/dashboard-mock.svg"
                      alt="SocialPulse dashboard preview"
                      width={1200}
                      height={720}
                      className="h-auto w-full"
                      priority
                    />
                    <div className="signal-particles pointer-events-none absolute inset-0" />
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
              <article className="floating-panel double-layer-panel animate-fade-up p-7 md:p-10">
                <SectionHeaderAccent icon={Activity} tone="pink" />
                <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.problem.title}</h2>
                <p className="mt-6 text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.problem.intro}</p>
                <p className="mt-6 text-base font-medium tracking-tight text-white/90 md:text-lg">{t.problem.conclusion}</p>
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <GradientIcon icon={BarChart3} tone="purple" className="h-7 w-7" size={12} />
                        <span className="text-xs text-[#AAB4C2]">{visualLabels.volume}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <GradientIcon icon={TrendingUp} tone="blue" className="h-7 w-7" size={12} />
                        <span className="text-xs text-[#AAB4C2]">{visualLabels.velocity}</span>
                      </div>
                    </div>
                    <svg
                      className="mx-auto hidden sm:block"
                      width="96"
                      height="56"
                      viewBox="0 0 96 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M4 28 H92" stroke="url(#problemLine)" strokeWidth="1.5" strokeDasharray="4 4" />
                      <circle cx="28" cy="28" r="2.5" fill="#9A33FF" />
                      <circle cx="48" cy="28" r="2.5" fill="#3A31FF" />
                      <circle cx="68" cy="28" r="2.5" fill="#14C7E5" />
                      <defs>
                        <linearGradient id="problemLine" x1="4" y1="28" x2="92" y2="28" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#F2398A" stopOpacity="0.3" />
                          <stop offset="0.5" stopColor="#9A33FF" stopOpacity="0.9" />
                          <stop offset="1" stopColor="#14C7E5" stopOpacity="0.4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 rounded-xl border border-[#246BFF]/35 bg-[#246BFF]/10 px-3 py-2">
                        <GradientIcon icon={BrainCircuit} tone="cyan" className="h-7 w-7" size={12} />
                        <span className="text-xs text-white/90">{visualLabels.emotionalIntent}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-[#F2398A]/35 bg-[#F2398A]/10 px-3 py-2">
                        <GradientIcon icon={Radar} tone="pink" className="h-7 w-7" size={12} />
                        <span className="text-xs text-white/90">{visualLabels.narrativePressure}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.problem.points.map((point, index) => (
                  <article
                    key={point}
                    className="floating-panel floating-panel-hover double-layer-panel animate-fade-up p-5"
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
              <article className="floating-panel double-layer-panel animate-fade-up p-7 md:p-10">
                <SectionHeaderAccent icon={BrainCircuit} tone="cyan" />
                <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.solution.title}</h2>
                <p className="mt-6 text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.solution.intro}</p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {t.solution.pipeline.map((step, index) => (
                    <article key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <GradientIcon
                          icon={[Activity, BrainCircuit, Radar, Target][index] ?? Activity}
                          tone={(['cyan', 'purple', 'pink', 'blue'][index] as 'pink' | 'purple' | 'blue' | 'cyan') ?? 'purple'}
                          className="h-7 w-7"
                          size={12}
                        />
                        <h3 className="text-sm font-semibold tracking-tight text-white">{step.title}</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-[#AAB4C2] md:text-sm">{step.description}</p>
                    </article>
                  ))}
                </div>
                <p className="mt-7 text-sm leading-relaxed text-[#AAB4C2] md:text-base">{t.solution.closing}</p>
              </article>

              <article className="floating-panel double-layer-panel animate-fade-up relative overflow-hidden p-6 md:p-8" style={{ animationDelay: '80ms' }}>
                <SectionHeaderAccent icon={Radar} tone="purple" />
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.solution.frameworkTitle}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#AAB4C2] md:text-base">{t.solution.frameworkSubtitle}</p>
                <div className="relative mx-auto mt-9 w-full max-w-[420px]">
                  <div className="absolute -bottom-6 left-1/2 h-16 w-[72%] -translate-x-1/2 rounded-full bg-black/55 blur-2xl" />
                  <RadarPulse labels={t.solution.radarLabels} compact />
                </div>
              </article>
            </div>
          </section>

          <section id="opportunity" className="section-wrap section-space">
            <article className="floating-panel double-layer-panel animate-fade-up relative overflow-hidden p-7 md:p-12">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(154,51,255,0.19),rgba(36,107,255,0.14),rgba(9,20,38,0.06))]" />
              <svg
                className="pointer-events-none absolute inset-x-0 top-12 h-36 w-full opacity-35"
                viewBox="0 0 800 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M0 170 C90 156, 160 146, 220 134 C280 122, 350 118, 420 96 C500 70, 580 66, 680 34 C730 18, 770 10, 800 4" stroke="url(#opGrowth)" strokeWidth="2" />
                <path d="M0 170 C80 164, 160 154, 240 148 C320 142, 400 124, 480 110 C560 96, 640 72, 720 52 C760 42, 785 36, 800 30" stroke="rgba(170,180,194,0.18)" strokeWidth="1.2" strokeDasharray="4 4" />
                <defs>
                  <linearGradient id="opGrowth" x1="0" y1="170" x2="800" y2="4" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F2398A" stopOpacity="0.2" />
                    <stop offset="0.5" stopColor="#9A33FF" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#14C7E5" stopOpacity="0.35" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="relative">
                <SectionHeaderAccent icon={TrendingUp} tone="blue" />
                <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.opportunity.title}</h2>
                <p className="mt-6 max-w-4xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.opportunity.intro}</p>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {t.opportunity.stats.map((stat, index) => (
                    <article
                      key={stat.label}
                      className="floating-panel floating-panel-hover double-layer-panel animate-fade-up p-5 md:p-6"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <GradientIcon icon={opportunityIcons[index] ?? TrendingUp} tone={index === 0 ? 'purple' : index === 1 ? 'blue' : 'cyan'} />
                      <p className="text-4xl font-semibold tracking-tight md:text-5xl">{stat.value}</p>
                      <p className="mt-3 text-sm font-medium text-white">{stat.label}</p>
                      <p className="mt-2 text-xs text-[#AAB4C2]">{stat.detail}</p>
                    </article>
                  ))}
                </div>
                <p className="mt-8 text-lg font-medium tracking-tight md:text-xl">{t.opportunity.thesis}</p>
                <article className="floating-panel double-layer-panel mt-8 p-4 md:p-5">
                  <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                      <div className="h-1 rounded-full bg-[linear-gradient(90deg,#F2398A,#9A33FF)]" />
                      <p className="mt-2 text-xs text-[#AAB4C2]">{visualLabels.socialAnalytics}</p>
                    </div>
                    <svg
                      className="mx-auto"
                      width="76"
                      height="44"
                      viewBox="0 0 76 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M4 8 C22 12, 22 32, 38 22" stroke="#9A33FF" strokeWidth="2" />
                      <path d="M4 36 C22 32, 22 12, 38 22" stroke="#14C7E5" strokeWidth="2" />
                      <path d="M38 22 H72" stroke="url(#mergeStream)" strokeWidth="2" />
                      <defs>
                        <linearGradient id="mergeStream" x1="38" y1="22" x2="72" y2="22" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#9A33FF" />
                          <stop offset="1" stopColor="#246BFF" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                      <div className="h-1 rounded-full bg-[linear-gradient(90deg,#246BFF,#14C7E5)]" />
                      <p className="mt-2 text-xs text-[#AAB4C2]">{visualLabels.appliedEI}</p>
                    </div>
                  </div>
                </article>
              </div>
            </article>
          </section>

          <section id="model" className="section-wrap section-space">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <SectionHeaderAccent icon={BarChart3} tone="purple" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.model.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.model.intro}</p>
            </div>
            <div className="mb-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <article className="floating-panel double-layer-panel animate-fade-up p-6">
                <div className="flex items-center justify-between">
                  <GradientIcon icon={TrendingUp} tone="cyan" />
                  <SignalSparkline tone="cyan" className="h-8 w-24" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{t.model.freemiumCard.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#AAB4C2]">{t.model.freemiumCard.descriptions[0]}</p>
                <svg
                  className="mt-5 w-full"
                  viewBox="0 0 360 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="10" y="22" width="92" height="24" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
                  <rect x="134" y="46" width="92" height="24" rx="12" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" />
                  <rect x="258" y="70" width="92" height="24" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" />
                  <path d="M102 34 H128 V58" stroke="url(#funnelLine)" strokeWidth="2" />
                  <path d="M226 58 H252 V82" stroke="url(#funnelLine)" strokeWidth="2" />
                  <text x="56" y="38" fill="rgba(255,255,255,0.8)" fontSize="10" textAnchor="middle">{visualLabels.funnelFreemium}</text>
                  <text x="180" y="62" fill="rgba(255,255,255,0.8)" fontSize="10" textAnchor="middle">{visualLabels.funnelPaid}</text>
                  <text x="304" y="86" fill="rgba(255,255,255,0.8)" fontSize="10" textAnchor="middle">{visualLabels.funnelExpansion}</text>
                  <defs>
                    <linearGradient id="funnelLine" x1="102" y1="34" x2="252" y2="82" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F2398A" />
                      <stop offset="0.5" stopColor="#9A33FF" />
                      <stop offset="1" stopColor="#14C7E5" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="mt-2 text-sm leading-relaxed text-[#AAB4C2]">{t.model.freemiumCard.descriptions[1]}</p>
              </article>
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[TrendingUp, LayoutDashboard, LineChart].map((Icon, index) => (
                  <article key={index} className="floating-panel double-layer-panel animate-fade-up p-4" style={{ animationDelay: `${index * 70}ms` }}>
                    <div className="flex items-center gap-3">
                      <GradientIcon icon={Icon} tone={index === 0 ? 'pink' : index === 1 ? 'blue' : 'cyan'} />
                      <SignalSparkline tone={index === 0 ? 'pink' : index === 1 ? 'blue' : 'cyan'} variant={index === 2 ? 'step' : 'smooth'} className="h-6 w-16" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#AAB4C2]">{t.model.highlights[index]}</p>
                    {t.model.highlights[index]?.includes('70%') ? (
                      <div className="mt-3 rounded-full border border-white/10 bg-white/5 p-1">
                        <div className="h-1.5 w-[72%] rounded-full bg-[linear-gradient(90deg,#14C7E5,#246BFF,#9A33FF)]" />
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {t.model.items.map((item, index) => (
                <article
                  key={item.title}
                  className="floating-panel floating-panel-hover double-layer-panel animate-fade-up p-6"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <GradientIcon icon={modelIcons[index] ?? Activity} tone={index === 0 ? 'pink' : index === 1 ? 'purple' : index === 2 ? 'blue' : 'cyan'} />
                    <SignalSparkline tone={index === 0 ? 'pink' : index === 1 ? 'purple' : index === 2 ? 'blue' : 'cyan'} variant={index === 3 ? 'spike' : 'smooth'} className="h-6 w-16" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium text-white/90">{item.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#AAB4C2]">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="roadmap" className="section-wrap section-space">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <SectionHeaderAccent icon={Target} tone="blue" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.roadmap.title}</h2>
            </div>
            <div className="relative grid gap-5 md:grid-cols-3">
              <div className="pointer-events-none absolute left-[8%] right-[8%] top-10 hidden h-px bg-[linear-gradient(90deg,rgba(242,57,138,0.2),rgba(154,51,255,0.75),rgba(20,199,229,0.2))] md:block" />
              {t.roadmap.phases.map((phase, index) => (
                <article
                  key={phase.title}
                  className="floating-panel floating-panel-hover double-layer-panel animate-fade-up relative overflow-hidden p-6"
                  style={{ animationDelay: `${index * 95}ms` }}
                >
                  <p className="pointer-events-none absolute right-4 top-2 text-6xl font-semibold text-white/[0.04]">0{index + 1}</p>
                  <div className="mb-4 flex items-center justify-between">
                    <GradientIcon icon={roadmapIcons[index] ?? Target} tone={index === 0 ? 'pink' : index === 1 ? 'purple' : 'cyan'} />
                    <span className="hidden h-2 w-2 rounded-full bg-[#9A33FF] md:block" />
                  </div>
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
            <article className="floating-panel double-layer-panel animate-fade-up mx-auto max-w-4xl p-8 text-center md:p-12">
              <SectionHeaderAccent icon={Radar} tone="purple" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.positioning.title}</h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.positioning.body}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-[#AAB4C2]">
                  {lang === 'en' ? 'nice-to-have capability' : 'capacidad complementaria'}
                </span>
                <ArrowRight className="h-4 w-4 text-[#AAB4C2]" />
                <span className="rounded-full border border-[#246BFF]/45 bg-[#246BFF]/12 px-4 py-1.5 text-xs text-white">
                  {lang === 'en' ? 'competitive advantage' : 'ventaja competitiva'}
                </span>
              </div>
              <div className="relative mt-7">
                <div className="pointer-events-none absolute inset-x-[16%] -top-2 h-14 rounded-full bg-[radial-gradient(circle,rgba(154,51,255,0.35)_0%,rgba(154,51,255,0)_72%)] blur-xl" />
                <p className="relative mx-auto max-w-3xl text-base font-medium tracking-tight text-white/90 md:text-lg">{t.positioning.thesis}</p>
              </div>
            </article>
          </section>

          <section id="platforms" className="section-wrap pb-28 md:pb-36">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <SectionHeaderAccent icon={LineChart} tone="cyan" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.platforms.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.platforms.intro}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="floating-panel double-layer-panel animate-fade-up p-7">
                <h3 className="text-xl font-semibold tracking-tight">{t.platforms.availableTitle}</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.platforms.available.map((platform, index) => (
                    <span
                      key={platform}
                      className="inline-flex items-center gap-2 rounded-full border border-[#14C7E5]/45 bg-[#14C7E5]/14 px-4.5 py-2 text-sm font-medium text-white"
                    >
                      <GradientIcon icon={platformIcons[index] ?? Activity} tone="cyan" className="h-5 w-5" size={10} />
                      {platform}
                    </span>
                  ))}
                </div>
              </article>
              <article className="floating-panel double-layer-panel animate-fade-up relative overflow-hidden p-7 opacity-70" style={{ animationDelay: '90ms' }}>
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
                  viewBox="0 0 420 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="74" cy="98" r="3" fill="#14C7E5" />
                  <circle cx="180" cy="62" r="3" fill="#9A33FF" />
                  <circle cx="268" cy="116" r="3" fill="#246BFF" />
                  <circle cx="340" cy="84" r="3" fill="#F2398A" />
                  <path d="M74 98 C120 84, 134 72, 180 62 C206 56, 236 104, 268 116 C292 126, 320 94, 340 84" stroke="url(#platformMap)" strokeWidth="1.5" />
                  <defs>
                    <linearGradient id="platformMap" x1="74" y1="98" x2="340" y2="84" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#14C7E5" />
                      <stop offset="0.5" stopColor="#9A33FF" />
                      <stop offset="1" stopColor="#246BFF" />
                    </linearGradient>
                  </defs>
                </svg>
                <h3 className="text-xl font-semibold tracking-tight">{t.platforms.roadmapTitle}</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.platforms.roadmap.map((platform, index) => (
                    <span key={platform} className="inline-flex items-center gap-2 rounded-full border border-white/24 px-4.5 py-2 text-sm font-medium text-[#AAB4C2]">
                      <GradientIcon icon={platformIcons[index] ?? Radar} tone="purple" className="h-5 w-5" size={10} />
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
            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex h-8 w-8 items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(154,51,255,0.5)_0%,rgba(154,51,255,0)_72%)] blur-sm" />
                    <Image src="/logo.png" alt="SocialPulse" width={26} height={26} className="relative h-6.5 w-6.5 rounded object-contain" />
                  </span>
                  <span className="text-lg font-semibold tracking-tight text-white">SocialPulse</span>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-[#AAB4C2]">
                  Emotional Signal Intelligence for the digital conversation economy.
                </p>
                <a href="mailto:contact@socialpulse.ai" className="inline-flex text-sm text-[#D2D9E2] transition hover:text-white">
                  contact@socialpulse.ai
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#AAB4C2]">Product</p>
                <div className="mt-3 space-y-2 text-sm text-[#D2D9E2]">
                  <p>Signal Engine</p>
                  <p>Emotional Index</p>
                  <p>Narrative Detection</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#AAB4C2]">Company</p>
                <div className="mt-3 space-y-2 text-sm text-[#D2D9E2]">
                  <p>About</p>
                  <p>Research</p>
                  <p>Press</p>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-white/10 pt-4 text-sm text-[#AAB4C2]">
              <p>{t.footer}</p>
            </div>
          </div>
        </footer>
      </div>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang={lang} />
    </>
  );
}

