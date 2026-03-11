'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Activity,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Eye,
  LayoutDashboard,
  LineChart,
  MessageCircle,
  Radar,
  Target,
  ThumbsUp,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon
} from 'lucide-react';
import { type Language } from '@/lib/content';
import { LeadModal } from './LeadModal';
import { GradientIcon } from './visuals/GradientIcon';
import { ProblemSignalField } from './visuals/ProblemSignalField';
import { RadarPulse } from './visuals/RadarPulse';
import { SignalEngine } from './visuals/SignalEngine';
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
    credibility: string;
    ctaPrimary: string;
    ctaShort: string;
    ctaSecondary: string;
  };
  heroMetrics: Array<{ label: string; value: string }>;
  problem: {
    eyebrow: string;
    title: string;
    thesisLead: string;
    thesisBody: string;
    traditionalLabel: string;
    traditionalItems: string[];
    transitionLabel: string;
    emotionalLabel: string;
    emotionalItems: string[];
    conclusionLead: string;
    conclusionBody: string;
  };
  solution: {
    title: string;
    intro: string;
    outputs: string[];
    pipeline: Array<{ title: string; subtitle: string; description: string }>;
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
    subtitle: string;
    intro: string;
    categoryLead: string;
    categorySub: string;
    rows: Array<{
      label: string;
      cards: Array<{
        value: string;
        label: string;
        detail: string;
        countTo?: number;
        countSuffix?: string;
      }>;
    }>;
    adoptionTitle: string;
    adoptionSegments: string[];
    positioning: {
      leftTitle: string;
      leftSub: string;
      rightTitle: string;
      rightSub: string;
      centerTitle: string;
      centerSub: string;
    };
    thesis: string;
  };
  model: {
    title: string;
    intro: string;
    loop: Array<{ title: string; detail: string }>;
    segments: Array<{ title: string; price: string; detail: string }>;
    economics: string[];
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
      title: 'Understand the emotion moving the market.',
      subtitle:
        'SocialPulse transforms public conversations into structured emotional signals - revealing direction, intensity, narrative pressure and momentum.',
      thesis: 'Metrics measure activity. Emotion reveals intent.',
      credibility: 'Backed by XXX · Advised by XXX · Supported by XXX',
      ctaPrimary: 'Request Investor Access',
      ctaShort: 'Request Access',
      ctaSecondary: 'Explore the Emotional Index'
    },
    heroMetrics: [
      { label: 'Emotion Index', value: 'Live analysis' },
      { label: 'Narrative Shift', value: 'Context detected' },
      { label: 'Signal Momentum', value: 'Actionable alerts' }
    ],
    problem: {
      eyebrow: 'THE PROBLEM',
      title: 'The Hidden Signal in Digital Markets',
      thesisLead: 'Markets react to emotion long before metrics reflect it.',
      thesisBody:
        'Traditional analytics measure activity - likes, views and engagement. But they fail to capture the emotional pressure shaping narratives in real time.',
      traditionalLabel: 'Traditional Metrics',
      traditionalItems: ['Likes', 'Views', 'Engagement', 'Volume', 'Velocity'],
      transitionLabel: 'Activity -> Emotion -> Market Reaction',
      emotionalLabel: 'Emotional Signals',
      emotionalItems: ['Emotional Intensity', 'Narrative Pressure', 'Audience Activation', 'Trust Volatility'],
      conclusionLead: 'Emotion is often the first signal.',
      conclusionBody: 'Yet it remains invisible in most decision systems.'
    },
    solution: {
      title: 'The Solution',
      intro:
        'SocialPulse works as a structured signal pipeline from raw conversation to decision-ready intelligence.',
      outputs: [
        'Audience emotional mapping by topic and narrative',
        'Narrative shift detection',
        'Reputational risk and tension alerts',
        'Executive-ready dashboards and insights'
      ],
      pipeline: [
        {
          title: 'Social Conversations',
          subtitle: 'Signal Capture',
          description:
            'Collects public conversations around any topic, brand or narrative across connected social platforms in real time.'
        },
        {
          title: 'Emotion Engine',
          subtitle: 'Emotion Modeling',
          description:
            'Transforms public discourse into structured emotional signals.'
        },
        {
          title: 'Narrative Pressure',
          subtitle: 'Narrative Detection',
          description:
            'Detects shifts in framing, sentiment momentum and narrative pressure.'
        },
        {
          title: 'Decision Signals',
          subtitle: 'Actionable Insights',
          description:
            'Converts emotional dynamics into clear signals for investors, brands and strategic teams.'
        }
      ],
      closing:
        'From signal capture to decision signals, every layer is designed for clarity and strategic action.',
      frameworkTitle: 'Emotional Signal Map',
      frameworkSubtitle:
        'Real-emotion mapping across live public narratives.',
      radarLabels: {
        top: 'Anger',
        topRight: 'Excitement',
        right: 'Support',
        bottom: 'Hope',
        bottomLeft: 'Skepticism',
        left: 'Disappointment'
      }
    },
    opportunity: {
      title: 'Emotion Is the Next Data Layer',
      subtitle:
        'Understanding audiences will define the next generation of digital intelligence.',
      intro:
        'SocialPulse defines a new category: Emotional Signal Intelligence.',
      categoryLead:
        'SocialPulse defines a new category: Emotional Signal Intelligence.',
      categorySub:
        'Positioned at the intersection of Social Media Analytics and Applied Emotional Intelligence.',
      rows: [
        {
          label: 'SMEs and Agencies',
          cards: [
            {
              value: '$61.9B',
              label: 'Global Social Media Analytics Market',
              detail: 'Projected by 2032',
              countTo: 61.9,
              countSuffix: 'B'
            },
            {
              value: '$25.5B',
              label: 'Serviceable Market',
              detail: '(SMEs & Agencies managing brand perception)',
              countTo: 25.5,
              countSuffix: 'B'
            },
            {
              value: '$25-50M',
              label: 'Initial Target Market',
              detail: 'Expected capture within 24-36 months'
            }
          ]
        },
        {
          label: 'Creators & Influencers',
          cards: [
            {
              value: '$14.9B',
              label: 'Creator Economy Spending',
              detail: 'Projected by 2032',
              countTo: 14.9,
              countSuffix: 'B'
            },
            {
              value: '$0.6-1.2B',
              label: 'Serviceable Analytics Market for Creators',
              detail: ''
            },
            {
              value: '$3-18M',
              label: 'Initial Creator Segment Capture',
              detail: ''
            }
          ]
        }
      ],
      adoptionTitle: 'Primary Adoption Segments',
      adoptionSegments: ['Creators', 'Brands', 'Agencies', 'Media', 'Investors'],
      positioning: {
        leftTitle: 'Traditional Social Analytics',
        leftSub: '(Measures engagement)',
        rightTitle: 'Applied Emotional Intelligence',
        rightSub: '(Measures audience sentiment)',
        centerTitle: 'SocialPulse',
        centerSub: 'Transforms emotion into decision signals.'
      },
      thesis: 'One platform capturing value across two rapidly expanding global markets.'
    },
    model: {
      title: 'REVENUE ENGINE',
      intro: 'Freemium discovery powering subscription expansion.',
      loop: [
        {
          title: 'Discovery',
          detail: 'Free searches and topic exploration.'
        },
        {
          title: 'Insight',
          detail: 'Users discover emotional signal intelligence.'
        },
        {
          title: 'Monitoring',
          detail: 'Users begin tracking narratives continuously.'
        },
        {
          title: 'Subscription',
          detail: 'Upgrade to unlock deeper monitoring.'
        },
        {
          title: 'Expansion',
          detail: 'More topics, more teams, higher plans.'
        }
      ],
      segments: [
        {
          title: 'Creators',
          price: '\u20AC11.99 / month',
          detail: 'Micro-influencers and early adopters monitoring audience sentiment.'
        },
        {
          title: 'Professional',
          price: '\u20AC49.99 / month',
          detail: 'Advanced monitoring for creators, analysts and research teams.'
        },
        {
          title: 'Enterprise',
          price: 'Starting \u20AC124.99 / month',
          detail: 'Agencies, corporations and institutions requiring multi-topic monitoring.'
        }
      ],
      economics: [
        'Organic Product Growth',
        'Recurring Subscription Revenue',
        'Software-Level Margins (>70%)'
      ]
    },
    roadmap: {
      title: 'Roadmap & Traction',
      phases: [
        {
          title: 'MVP Launch',
          horizon: '0-3 months',
          items: [
            'Functional MVP with real-time sentiment analysis, first dashboard and reputation comparison.',
            'Languages supported: English and Spanish.',
            '\u{1F3AF} Target: 500 active users'
          ]
        },
        {
          title: 'Product Personalization',
          horizon: '3-9 months',
          items: [
            'User personalization and new NLP models trained by sector: sports, brands, politics, entertainment and research.',
            '\u{1F3AF} Target: 10K active users'
          ]
        },
        {
          title: 'Predictive Intelligence',
          horizon: '9-15 months',
          items: [
            'Launch of reputation prediction engine and public B2B API.',
            '\u{1F3AF} Target: 25K users + 500 paying members'
          ]
        },
        {
          title: 'Global Scale',
          horizon: '15-24 months',
          items: [
            'International expansion and multilingual platform (portuguese, italian, french and asian languages).',
            '\u{1F3AF} Target: 50K users + 3K paying members'
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
      title: 'Comprende la emocion que mueve el mercado.',
      subtitle:
        'SocialPulse transforma conversaciones publicas en senales emocionales estructuradas: revela direccion, intensidad, presion narrativa y momentum.',
      thesis:
        'Las metricas miden actividad. La emocion revela intencion.',
      credibility: 'Respaldado por XXX · Asesorado por XXX · Impulsado por XXX',
      ctaPrimary: 'Solicitar acceso para inversion',
      ctaShort: 'Solicitar acceso',
      ctaSecondary: 'Explorar el Indice Emocional'
    },
    heroMetrics: [
      { label: 'Indice Emocional', value: 'Analisis en vivo' },
      { label: 'Cambio Narrativo', value: 'Contexto detectado' },
      { label: 'Signal Momentum', value: 'Alertas accionables' }
    ],
    problem: {
      eyebrow: 'EL PROBLEMA',
      title: 'La Senal Oculta en los Mercados Digitales',
      thesisLead: 'Los mercados reaccionan a la emocion mucho antes de que las metricas la reflejen.',
      thesisBody:
        'La analitica tradicional mide actividad - likes, views y engagement. Pero no captura la presion emocional que moldea las narrativas en tiempo real.',
      traditionalLabel: 'Metricas Tradicionales',
      traditionalItems: ['Likes', 'Views', 'Engagement', 'Volumen', 'Velocidad'],
      transitionLabel: 'Actividad -> Emocion -> Reaccion de Mercado',
      emotionalLabel: 'Senales Emocionales',
      emotionalItems: ['Intensidad Emocional', 'Presion Narrativa', 'Activacion de Audiencia', 'Volatilidad de Confianza'],
      conclusionLead: 'La emocion suele ser la primera senal.',
      conclusionBody: 'Sin embargo, sigue siendo invisible en la mayoria de los sistemas de decision.'
    },
    solution: {
      title: 'La Solucion',
      intro:
        'SocialPulse funciona como un pipeline estructurado que convierte conversacion publica en inteligencia accionable.',
      outputs: [
        'Mapa emocional del publico por tema y narrativa',
        'Deteccion de cambios narrativos',
        'Alertas de tension y riesgo reputacional',
        'Dashboards ejecutivos listos para decidir'
      ],
      pipeline: [
        {
          title: 'Conversaciones Sociales',
          subtitle: 'Signal Capture',
          description:
            'Recoge conversaciones publicas sobre cualquier tema, marca o narrativa en plataformas sociales conectadas, en tiempo real.'
        },
        {
          title: 'Motor Emocional',
          subtitle: 'Modelado Emocional',
          description:
            'Transforma el discurso publico en senales emocionales estructuradas.'
        },
        {
          title: 'Presion Narrativa',
          subtitle: 'Deteccion Narrativa',
          description:
            'Detecta cambios de framing, momentum de sentimiento y presion narrativa.'
        },
        {
          title: 'Senales de Decision',
          subtitle: 'Insights Accionables',
          description:
            'Convierte la dinamica emocional en senales claras para inversores, marcas y equipos estrategicos.'
        }
      ],
      closing:
        'Del capture de senal a la decision, cada capa esta disenada para claridad estrategica.',
      frameworkTitle: 'Mapa de Senal Emocional',
      frameworkSubtitle:
        'Mapeo de emociones reales sobre narrativas publicas en vivo.',
      radarLabels: {
        top: 'Enojo',
        topRight: 'Entusiasmo',
        right: 'Apoyo',
        bottom: 'Esperanza',
        bottomLeft: 'Escepticismo',
        left: 'Decepcion'
      }
    },
    opportunity: {
      title: 'La Emocion Es la Proxima Capa de Datos',
      subtitle:
        'Entender audiencias definira la proxima generacion de inteligencia digital.',
      intro:
        'SocialPulse define una nueva categoria: Inteligencia de Senales Emocionales.',
      categoryLead:
        'SocialPulse define una nueva categoria: Inteligencia de Senales Emocionales.',
      categorySub:
        'Posicionado en la interseccion entre Social Media Analytics e Inteligencia Emocional Aplicada.',
      rows: [
        {
          label: 'PyMEs y Agencias',
          cards: [
            {
              value: '$61.9B',
              label: 'Mercado Global de Social Media Analytics',
              detail: 'Proyeccion al 2032',
              countTo: 61.9,
              countSuffix: 'B'
            },
            {
              value: '$25.5B',
              label: 'Mercado Servible',
              detail: '(PyMEs y agencias que gestionan percepcion de marca)',
              countTo: 25.5,
              countSuffix: 'B'
            },
            {
              value: '$25-50M',
              label: 'Mercado Objetivo Inicial',
              detail: 'Captura esperada en 24-36 meses'
            }
          ]
        },
        {
          label: 'Creators e Influencers',
          cards: [
            {
              value: '$14.9B',
              label: 'Gasto en Creator Economy',
              detail: 'Proyeccion al 2032',
              countTo: 14.9,
              countSuffix: 'B'
            },
            {
              value: '$0.6-1.2B',
              label: 'Mercado Servible de Analitica para Creators',
              detail: ''
            },
            {
              value: '$3-18M',
              label: 'Captura Inicial del Segmento Creator',
              detail: ''
            }
          ]
        }
      ],
      adoptionTitle: 'Segmentos Primarios de Adopcion',
      adoptionSegments: ['Creators', 'Marcas', 'Agencias', 'Medios', 'Inversores'],
      positioning: {
        leftTitle: 'Analitica Social Tradicional',
        leftSub: '(Mide engagement)',
        rightTitle: 'Inteligencia Emocional Aplicada',
        rightSub: '(Mide sentimiento de audiencia)',
        centerTitle: 'SocialPulse',
        centerSub: 'Transforma emocion en senales de decision.'
      },
      thesis: 'Una plataforma que captura valor en dos mercados globales de rapido crecimiento.'
    },
    model: {
      title: 'MOTOR DE INGRESOS',
      intro: 'Descubrimiento freemium que impulsa expansion por suscripcion.',
      loop: [
        {
          title: 'Discovery',
          detail: 'Busquedas gratuitas y exploracion de temas.'
        },
        {
          title: 'Insight',
          detail: 'Los usuarios descubren inteligencia emocional accionable.'
        },
        {
          title: 'Monitoring',
          detail: 'Comienzan a seguir narrativas de forma continua.'
        },
        {
          title: 'Subscription',
          detail: 'Actualizan para desbloquear monitoreo mas profundo.'
        },
        {
          title: 'Expansion',
          detail: 'Mas temas, mas equipos, planes superiores.'
        }
      ],
      segments: [
        {
          title: 'Creators',
          price: '\u20AC11.99 / mes',
          detail: 'Microinfluencers y early adopters monitoreando sentimiento de audiencia.'
        },
        {
          title: 'Professional',
          price: '\u20AC49.99 / mes',
          detail: 'Monitoreo avanzado para creators, analistas y equipos de research.'
        },
        {
          title: 'Enterprise',
          price: 'Desde \u20AC124.99 / mes',
          detail: 'Agencias, corporaciones e instituciones con monitoreo multi-tema.'
        }
      ],
      economics: [
        'Crecimiento organico del producto',
        'Ingresos recurrentes por suscripcion',
        'Margenes de software (>70%)'
      ]
    },
    roadmap: {
      title: 'Roadmap y Traccion',
      phases: [
        {
          title: 'Lanzamiento MVP',
          horizon: '0-3 meses',
          items: [
            'MVP funcional con analisis de sentimiento en tiempo real, primer dashboard y comparacion de reputacion.',
            'Idiomas soportados: ingles y espanol.',
            '\u{1F3AF} Meta: 500 usuarios activos'
          ]
        },
        {
          title: 'Personalizacion del Producto',
          horizon: '3-9 meses',
          items: [
            'Personalizacion de usuario y nuevos modelos NLP entrenados por sector: deportes, marcas, politica, entretenimiento e investigacion.',
            '\u{1F3AF} Meta: 10K usuarios activos'
          ]
        },
        {
          title: 'Inteligencia Predictiva',
          horizon: '9-15 meses',
          items: [
            'Lanzamiento del motor de prediccion reputacional y API B2B publica.',
            '\u{1F3AF} Meta: 25K usuarios + 500 miembros de pago'
          ]
        },
        {
          title: 'Escala Global',
          horizon: '15-24 meses',
          items: [
            'Expansion internacional y plataforma multilingue (portugues, italiano, frances y lenguas asiaticas).',
            '\u{1F3AF} Meta: 50K usuarios + 3K miembros de pago'
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
const adoptionIcons: LucideIcon[] = [Users, Activity, BriefcaseBusiness, Radar, TrendingUp];
const traditionalMetricIcons: LucideIcon[] = [ThumbsUp, Eye, MessageCircle, BarChart3, Zap];
const categoryTraditionalIcons: LucideIcon[] = [ThumbsUp, Eye, Users, Target];
const categorySignalIcons: LucideIcon[] = [BrainCircuit, Activity, Radar, TrendingUp];
const roadmapIcons: LucideIcon[] = [Activity, LineChart, Target, Target];
const platformIcons: LucideIcon[] = [Activity, Radar, LineChart, Target];

function SectionHeaderAccent({ icon, tone }: { icon: LucideIcon; tone: 'pink' | 'purple' | 'blue' | 'cyan' }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <GradientIcon icon={icon} tone={tone} className="h-8 w-8" size={14} />
      <div className="h-px w-16 bg-[linear-gradient(90deg,#F2398A,#9A33FF,#246BFF)]" />
    </div>
  );
}

function PipelineMicroVisual({ stepIndex }: { stepIndex: number }) {
  if (stepIndex === 0) {
    return (
      <div className="relative mt-4 h-16 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        <span className="solution-thread-glow absolute inset-y-1 left-0 w-8 rounded-r-full" />
        <div className="solution-thread-feed absolute inset-x-2 bottom-2 top-2">
          <article className="solution-thread-message solution-thread-message-a">
            <p className="solution-thread-user">User A</p>
            <p className="solution-thread-text solution-thread-text-a">"This brand is gaining momentum"</p>
          </article>
          <article className="solution-thread-message solution-thread-message-b">
            <p className="solution-thread-user">User B</p>
            <p className="solution-thread-text solution-thread-text-b">"I see a lot of excitement around this launch"</p>
          </article>
          <article className="solution-thread-message solution-thread-message-c">
            <p className="solution-thread-user">User C</p>
            <p className="solution-thread-text solution-thread-text-c">"Some skepticism in the replies though"</p>
          </article>
        </div>
        <span className="solution-thread-typing absolute bottom-2.5 right-3 inline-flex items-center gap-1">
          <span className="solution-typing-dot h-1.5 w-1.5 rounded-full bg-white/55" />
          <span className="solution-typing-dot solution-typing-dot-b h-1.5 w-1.5 rounded-full bg-white/45" />
          <span className="solution-typing-dot solution-typing-dot-c h-1.5 w-1.5 rounded-full bg-white/35" />
        </span>
      </div>
    );
  }

  if (stepIndex === 1) {
    return (
      <div className="relative mt-4 h-16 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        <span className="solution-emotion-core absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,57,138,0.45)_0%,rgba(154,51,255,0.28)_55%,rgba(36,107,255,0)_100%)]" />
        <span className="solution-emotion-orbit solution-emotion-orbit-a">
          <span className="solution-emotion-particle bg-[#F2398A]/80" />
        </span>
        <span className="solution-emotion-orbit solution-emotion-orbit-b">
          <span className="solution-emotion-particle bg-[#9A33FF]/78" />
        </span>
        <span className="solution-emotion-orbit solution-emotion-orbit-c">
          <span className="solution-emotion-particle bg-[#14C7E5]/75" />
        </span>
        <span className="solution-emotion-label solution-emotion-label-a absolute left-[7%] top-[14%] text-[8px] text-white/45">anger</span>
        <span className="solution-emotion-label solution-emotion-label-b absolute right-[7%] top-[16%] text-[8px] text-white/45">support</span>
        <span className="solution-emotion-label solution-emotion-label-c absolute left-[11%] bottom-[14%] text-[8px] text-white/45">excitement</span>
        <span className="solution-emotion-label solution-emotion-label-d absolute right-[12%] bottom-[12%] text-[8px] text-white/45">doubt</span>
      </div>
    );
  }

  if (stepIndex === 2) {
    return (
      <div className="relative mt-4 h-16 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        <svg className="solution-wavefield h-full w-full" viewBox="0 0 180 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g className="solution-wave-shift">
            <path className="solution-wave-glow" d="M0 40 C18 36, 30 22, 46 24 C62 26, 70 44, 88 42 C106 40, 112 20, 130 22 C148 24, 160 38, 180 34" stroke="url(#solutionWaveGradient)" strokeWidth="3.2" strokeLinecap="round" opacity="0.22" />
            <path className="solution-wave-main" d="M0 40 C18 36, 30 22, 46 24 C62 26, 70 44, 88 42 C106 40, 112 20, 130 22 C148 24, 160 38, 180 34" stroke="url(#solutionWaveGradient)" strokeWidth="1.8" strokeLinecap="round" />
            <path className="solution-wave-trail" d="M0 42 C18 38, 30 24, 46 26 C62 28, 70 46, 88 44 C106 42, 112 22, 130 24 C148 26, 160 40, 180 36" stroke="url(#solutionWaveGradientSoft)" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
          </g>
          <defs>
            <linearGradient id="solutionWaveGradient" x1="0" y1="32" x2="180" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F2398A" stopOpacity="0.28" />
              <stop offset="0.5" stopColor="#9A33FF" stopOpacity="0.85" />
              <stop offset="1" stopColor="#14C7E5" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="solutionWaveGradientSoft" x1="0" y1="32" x2="180" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#246BFF" stopOpacity="0.18" />
              <stop offset="1" stopColor="#14C7E5" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative mt-4 h-16 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
      <div className="relative flex h-full items-end justify-between gap-2">
        {[42, 64, 52, 74, 58].map((height, index) => (
          <span key={height} className="relative h-full w-full">
            <span className="absolute bottom-0 left-1/2 w-[72%] -translate-x-1/2" style={{ height: `${height}%` }}>
              <span
                className="solution-decision-bar block h-full w-full rounded-sm bg-[linear-gradient(180deg,rgba(20,199,229,0.72),rgba(154,51,255,0.3))]"
                style={{ animationDelay: `${index * 220}ms` }}
              />
              <span className="solution-decision-cap absolute -top-0.5 left-1/2 h-1 w-2 -translate-x-1/2 rounded-full bg-[#14C7E5]/70" style={{ animationDelay: `${index * 220}ms` }} />
            </span>
          </span>
        ))}
        <span className="solution-decision-dot solution-decision-dot-a" />
        <span className="solution-decision-dot solution-decision-dot-b" />
      </div>
    </div>
  );
}

function RevenueMetricMiniGraph({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="revenue-metric-graph revenue-metric-graph-line">
        <svg className="h-full w-full" viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path className="revenue-metric-line-glow" d="M2 38 C16 34, 26 30, 38 32 C50 34, 62 42, 78 34 C94 26, 108 16, 124 20 C138 23, 150 28, 158 18" />
          <path className="revenue-metric-line-main" d="M2 38 C16 34, 26 30, 38 32 C50 34, 62 42, 78 34 C94 26, 108 16, 124 20 C138 23, 150 28, 158 18" />
        </svg>
        <span className="revenue-metric-line-dot" />
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="revenue-metric-graph revenue-metric-graph-bars">
        {[42, 64, 56, 74, 62].map((height, barIndex) => (
          <span key={height} className="revenue-metric-bar-wrap">
            <span className="revenue-metric-bar" style={{ height: `${height}%`, animationDelay: `${barIndex * 180}ms` }} />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="revenue-metric-graph revenue-metric-graph-band">
      <span className="revenue-metric-band-base" />
      <span className="revenue-metric-band-fill" />
      <span className="revenue-metric-band-pulse" />
    </div>
  );
}

export function LandingPage() {
  const [lang, setLang] = useState<Language>('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opportunityInView, setOpportunityInView] = useState(false);
  const [opportunityCountProgress, setOpportunityCountProgress] = useState(0);
  const opportunitySectionRef = useRef<HTMLElement | null>(null);
  const t = content[lang];

  useEffect(() => {
    const target = opportunitySectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setOpportunityInView(true);
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!opportunityInView) return;

    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setOpportunityCountProgress(progress);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [opportunityInView]);

  const formatOpportunityValue = (card: {
    value: string;
    countTo?: number;
    countSuffix?: string;
  }) => {
    if (!card.countTo || !opportunityInView) return card.value;
    const current = card.countTo * opportunityCountProgress;
    return `$${current.toFixed(1)}${card.countSuffix ?? ''}`;
  };

  const visualLabels =
    lang === 'en'
      ? {
          volume: 'volume',
          velocity: 'velocity',
          emotionalIntent: 'emotional intent',
          narrativePressure: 'narrative pressure',
          engineTitle: 'Signal Engine',
          engineInput: 'Public Conversations',
          engineCore: 'Emotion Engine',
          enginePressure: 'Narrative Pressure',
          engineIndex: 'Signal Index',
          outputEmotionIndex: 'Emotion Index',
          outputNarrativePressure: 'Narrative Pressure',
          outputSignalMomentum: 'Signal Momentum',
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
          engineTitle: 'Motor de Senal',
          engineInput: 'Conversaciones Publicas',
          engineCore: 'Motor Emocional',
          enginePressure: 'Presion Narrativa',
          engineIndex: 'Indice de Senal',
          outputEmotionIndex: 'Indice Emocional',
          outputNarrativePressure: 'Presion Narrativa',
          outputSignalMomentum: 'Momentum de Senal',
          socialAnalytics: 'analitica de social media',
          appliedEI: 'inteligencia emocional aplicada',
          funnelFreemium: 'Freemium',
          funnelPaid: 'Pago',
          funnelExpansion: 'Expansion'
        };

  const categoryPositioningCopy =
    lang === 'en'
      ? {
          title: 'CATEGORY POSITIONING',
          headlineLine1: 'Most platforms measure engagement.',
          headlineLine2: 'SocialPulse reveals emotional signals.',
          subheadline:
            'This is the moment that defines who will understand their audience - and who will only measure it.',
          supporting:
            'The next generation of social intelligence will separate those who measure audiences from those who understand them.',
          traditional: ['Likes', 'Views', 'Reach', 'CTR'],
          emotional: ['Emotion', 'Trust', 'Narrative Pressure', 'Momentum'],
          bottomLead: 'From Social Media Analytics to',
          bottomHighlight: 'Emotional Signal Intelligence.'
        }
      : {
          title: 'POSICIONAMIENTO DE CATEGORIA',
          headlineLine1: 'La mayoria de plataformas mide engagement.',
          headlineLine2: 'SocialPulse revela senales emocionales.',
          subheadline:
            'Este es el momento que define quien entendera a su audiencia y quien solo la medira.',
          supporting:
            'La proxima generacion de inteligencia social separara a quienes miden audiencias de quienes realmente las entienden.',
          traditional: ['Likes', 'Views', 'Alcance', 'CTR'],
          emotional: ['Emocion', 'Confianza', 'Presion Narrativa', 'Momentum'],
          bottomLead: 'De Social Media Analytics a',
          bottomHighlight: 'Inteligencia de Senales Emocionales.'
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
          <section className="section-wrap relative isolate overflow-hidden pb-28 pt-20 md:pb-36 md:pt-28">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -left-24 top-0 h-[280px] w-[280px] rounded-full bg-[#F2398A]/22 blur-[140px]" />
              <div className="absolute left-[35%] top-[8%] h-[220px] w-[300px] rounded-full bg-[#9A33FF]/18 blur-[120px]" />
              <div className="absolute right-[-8%] top-[12%] h-[380px] w-[560px] rounded-[42%_58%_60%_40%/44%_42%_58%_56%] bg-[linear-gradient(124deg,rgba(154,51,255,0.22),rgba(36,107,255,0.16),rgba(20,199,229,0.12))] blur-[130px]" />
              <svg
                className="absolute inset-0 h-full w-full opacity-[0.16]"
                viewBox="0 0 1200 640"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M-24 428 C148 372, 248 402, 368 354 C492 304, 614 300, 742 248 C862 198, 988 226, 1224 118" stroke="url(#heroWaveA)" strokeWidth="1.2" />
                <path d="M-24 478 C132 444, 256 448, 392 414 C528 380, 650 336, 790 328 C938 320, 1040 276, 1224 236" stroke="url(#heroWaveB)" strokeWidth="1" strokeDasharray="7 8" />
                <defs>
                  <linearGradient id="heroWaveA" x1="-24" y1="428" x2="1224" y2="118" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F2398A" stopOpacity="0.14" />
                    <stop offset="0.48" stopColor="#9A33FF" stopOpacity="0.36" />
                    <stop offset="1" stopColor="#246BFF" stopOpacity="0.14" />
                  </linearGradient>
                  <linearGradient id="heroWaveB" x1="-24" y1="478" x2="1224" y2="236" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#14C7E5" stopOpacity="0.08" />
                    <stop offset="0.5" stopColor="#9A33FF" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#F2398A" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="grid items-center gap-14 lg:min-h-[78vh] lg:grid-cols-[1.02fr_0.98fr]">
              <div className="animate-fade-up">
                <div className="mb-8 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#AAB4C2]">
                  {[t.badges.early, t.badges.live, t.brandTagline].map((badge) => (
                    <span key={badge} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5">
                      {badge}
                    </span>
                  ))}
                </div>
                <h1 className="max-w-2xl text-[2.65rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl xl:text-[4.25rem]">
                  {t.hero.title}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#AAB4C2] md:text-xl">{t.hero.subtitle}</p>
                <p className="mt-5 text-base font-semibold tracking-tight text-white/90 md:text-lg">{t.hero.thesis}</p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#solution" className={`${primaryButtonClass} inline-flex items-center gap-2`}>
                    {t.hero.ctaSecondary}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <button onClick={() => setIsModalOpen(true)} className={secondaryButtonClass}>
                    {t.hero.ctaPrimary}
                  </button>
                </div>
                <p className="mt-8 inline-flex rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs tracking-[0.01em] text-[#AAB4C2]">
                  {t.hero.credibility}
                </p>
              </div>

              <div className="relative mx-auto w-full max-w-[620px] animate-fade-up" style={{ animationDelay: '120ms' }}>
                <SignalEngine
                  labels={{
                    title: visualLabels.engineTitle,
                    input: visualLabels.engineInput,
                    core: visualLabels.engineCore,
                    pressure: visualLabels.enginePressure,
                    index: visualLabels.engineIndex,
                    outputs: [
                      visualLabels.outputEmotionIndex,
                      visualLabels.outputNarrativePressure,
                      visualLabels.outputSignalMomentum
                    ]
                  }}
                />
              </div>
            </div>
          </section>

          <section id="problem" className="section-wrap section-space">
            <article className="floating-panel double-layer-panel animate-fade-up p-7 md:p-10">
              <SectionHeaderAccent icon={Activity} tone="pink" />
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#8C97A8]">{t.problem.eyebrow}</p>
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.problem.title}</h2>
              <div className="mt-6 max-w-4xl space-y-4">
                <p className="text-lg font-medium leading-relaxed text-white/95 md:text-xl md:leading-[1.4]">{t.problem.thesisLead}</p>
                <p className="text-sm leading-relaxed text-[#AAB4C2] md:text-base">{t.problem.thesisBody}</p>
              </div>

              <div className="mt-10 rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 md:p-6">
                <div className="grid gap-7 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <div className="space-y-3 animate-fade-up" style={{ animationDelay: '30ms' }}>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#8C97A8]">{t.problem.traditionalLabel}</p>
                    <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
                      {t.problem.traditionalItems.map((item, index) => {
                        const Icon = traditionalMetricIcons[index] ?? Activity;
                        return (
                          <div key={item} className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-xs text-[#7F8B9A]">
                            <Icon className="h-3.5 w-3.5 text-[#7F8B9A]/90" />
                            <span>{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mx-auto flex w-full max-w-[250px] flex-col items-center gap-3 text-center animate-fade-up" style={{ animationDelay: '150ms' }}>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#AAB4C2]">{t.problem.transitionLabel}</p>
                    <div className="relative hidden h-9 w-[220px] md:block">
                      <div className="problem-flow-track absolute left-2 right-8 top-1/2 h-px -translate-y-1/2" />
                      <span className="problem-flow-emotion-glow absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                      <span className="problem-flow-emotion-core absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                      <span className="problem-flow-dot problem-flow-dot-a" />
                      <span className="problem-flow-dot problem-flow-dot-b" />
                      <span className="problem-flow-dot problem-flow-dot-c" />
                      <ArrowRight className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A33FF]/85" />
                    </div>
                    <div className="relative h-16 w-8 md:hidden">
                      <div className="problem-flow-track-vertical absolute bottom-2 left-1/2 top-1 -translate-x-1/2 w-px" />
                      <span className="problem-flow-emotion-glow absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                      <span className="problem-flow-emotion-core absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                      <span className="problem-flow-dot-v problem-flow-dot-v-a" />
                      <span className="problem-flow-dot-v problem-flow-dot-v-b" />
                      <span className="problem-flow-dot-v problem-flow-dot-v-c" />
                      <ArrowRight className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 rotate-90 text-[#9A33FF]/85" />
                    </div>
                  </div>

                  <div className="animate-fade-up" style={{ animationDelay: '280ms' }}>
                    <ProblemSignalField title={t.problem.emotionalLabel} labels={t.problem.emotionalItems} />
                  </div>
                </div>
              </div>

              <div className="relative mt-10 text-center">
                <div className="pointer-events-none absolute inset-x-[20%] -top-3 h-16 rounded-full bg-[radial-gradient(circle,rgba(154,51,255,0.34)_0%,rgba(154,51,255,0)_72%)] blur-xl" />
                <p className="relative text-lg font-semibold tracking-tight text-white md:text-2xl">{t.problem.conclusionLead}</p>
                <p className="relative mt-2 text-sm leading-relaxed text-[#AAB4C2] md:text-base">{t.problem.conclusionBody}</p>
              </div>
            </article>
          </section>

          <section id="category-positioning" className="section-wrap section-space">
            <article className="floating-panel double-layer-panel animate-fade-up relative overflow-hidden p-7 text-center md:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(154,51,255,0.08),rgba(36,107,255,0.06),rgba(9,20,38,0.04))]" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.2em] text-[#AAB4C2]">{categoryPositioningCopy.title}</p>
                <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-bold tracking-[-0.02em] md:text-5xl">
                  {categoryPositioningCopy.headlineLine1}
                  <span className="block">{categoryPositioningCopy.headlineLine2}</span>
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">{categoryPositioningCopy.subheadline}</p>
                <p className="mx-auto mt-5 max-w-4xl text-sm leading-relaxed text-white/90 md:text-base">{categoryPositioningCopy.supporting}</p>

                <div className="mt-10 rounded-3xl border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 md:p-7">
                  <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
                    <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1">
                      {categoryPositioningCopy.traditional.map((label, index) => {
                        const Icon = categoryTraditionalIcons[index] ?? Activity;
                        return (
                          <div
                            key={label}
                            className="flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-xs text-[#7F8B9A] md:justify-start"
                          >
                            <Icon className="h-3.5 w-3.5 text-[#7F8B9A]/90" />
                            <span>{label}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mx-auto flex w-full max-w-[320px] items-center justify-center md:max-w-[360px]">
                      <div className="category-signal-bridge relative hidden h-24 w-[340px] md:block">
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 340 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <defs>
                            <linearGradient id="categorySignalGradient" x1="0" y1="48" x2="340" y2="48" gradientUnits="userSpaceOnUse">
                              <stop stopColor="rgba(170,180,194,0.36)" />
                              <stop offset="0.38" stopColor="rgba(170,180,194,0.22)" />
                              <stop offset="0.62" stopColor="#9A33FF" />
                              <stop offset="0.82" stopColor="#246BFF" />
                              <stop offset="1" stopColor="#14C7E5" />
                            </linearGradient>
                          </defs>
                          <path className="category-signal-wave-glow" d="M8 48 C52 36, 86 60, 128 48 C170 36, 212 60, 256 48 C286 40, 314 52, 332 48" />
                          <path className="category-signal-wave" d="M8 48 C52 36, 86 60, 128 48 C170 36, 212 60, 256 48 C286 40, 314 52, 332 48" />
                        </svg>
                        <span className="category-signal-dot" />
                      </div>

                      <div className="category-signal-bridge-vertical relative h-24 w-10 md:hidden">
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 40 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <defs>
                            <linearGradient id="categorySignalGradientVertical" x1="20" y1="0" x2="20" y2="96" gradientUnits="userSpaceOnUse">
                              <stop stopColor="rgba(170,180,194,0.34)" />
                              <stop offset="0.42" stopColor="rgba(170,180,194,0.2)" />
                              <stop offset="0.68" stopColor="#9A33FF" />
                              <stop offset="1" stopColor="#14C7E5" />
                            </linearGradient>
                          </defs>
                          <path className="category-signal-wave-glow-v" d="M20 8 C14 22, 28 32, 20 48 C12 64, 30 72, 20 88" />
                          <path className="category-signal-wave-v" d="M20 8 C14 22, 28 32, 20 48 C12 64, 30 72, 20 88" />
                        </svg>
                        <span className="category-signal-dot-v" />
                      </div>
                    </div>

                    <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1">
                      {categoryPositioningCopy.emotional.map((label, index) => {
                        const Icon = categorySignalIcons[index] ?? Activity;
                        return (
                          <div
                            key={label}
                            className="category-emotional-chip flex items-center justify-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2.5 text-xs text-white md:justify-start"
                            style={{ animationDelay: `${index * 480}ms` }}
                          >
                            <Icon className="h-3.5 w-3.5 text-white/90" />
                            <span>{label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <p className="mt-8 text-lg font-medium tracking-tight md:text-2xl">
                  {categoryPositioningCopy.bottomLead}{' '}
                  <span className="gradient-text font-semibold">{categoryPositioningCopy.bottomHighlight}</span>
                </p>
              </div>
            </article>
          </section>

          <section id="solution" className="section-wrap section-space">
            <article className="floating-panel double-layer-panel animate-fade-up p-7 md:p-10">
              <SectionHeaderAccent icon={BrainCircuit} tone="cyan" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.solution.title}</h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.solution.intro}</p>

              <div className="relative mt-10">
                <div className="grid items-stretch gap-4 md:grid-cols-4 md:gap-5">
                  {t.solution.pipeline.map((step, index) => {
                    const isLast = index === t.solution.pipeline.length - 1;
                    return (
                      <div key={step.title} className="relative flex h-full flex-col">
                        <article className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
                          <div className="mb-3 flex items-start gap-2.5">
                            <GradientIcon
                              icon={[MessageCircle, BrainCircuit, Radar, Target][index] ?? Activity}
                              tone={(['blue', 'purple', 'pink', 'cyan'][index] as 'pink' | 'purple' | 'blue' | 'cyan') ?? 'purple'}
                              className="h-7 w-7"
                              size={12}
                            />
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.16em] text-[#AAB4C2]">{step.subtitle}</p>
                              <h3 className="mt-1 text-sm font-semibold tracking-tight text-white">{step.title}</h3>
                            </div>
                          </div>
                          <p className="text-xs leading-relaxed text-[#AAB4C2] md:text-sm">{step.description}</p>
                          <PipelineMicroVisual stepIndex={index} />
                        </article>

                        {!isLast ? (
                          <>
                            <div className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-1 md:flex">
                              <span className="h-px w-5 animate-pulse bg-[linear-gradient(90deg,rgba(154,51,255,0.2),rgba(20,199,229,0.75))]" />
                              <ArrowRight className="h-3.5 w-3.5 text-[#9A33FF]/85 drop-shadow-[0_0_10px_rgba(154,51,255,0.45)]" />
                            </div>
                            <div className="pointer-events-none mt-3 flex justify-center md:hidden">
                              <ArrowRight className="h-4 w-4 rotate-90 text-[#9A33FF]/80" />
                            </div>
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="mt-8 text-sm leading-relaxed text-[#AAB4C2] md:text-base">{t.solution.closing}</p>
            </article>

            <article className="floating-panel double-layer-panel animate-fade-up relative mt-6 overflow-hidden p-6 md:p-8" style={{ animationDelay: '80ms' }}>
              <div className="grid items-center gap-7 md:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <SectionHeaderAccent icon={Radar} tone="purple" />
                  <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.solution.frameworkTitle}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#AAB4C2] md:text-base">{t.solution.frameworkSubtitle}</p>
                </div>
                <div className="flex h-full items-center justify-center">
                  <div className="relative mx-auto w-full max-w-[420px]">
                    <div className="absolute -bottom-6 left-1/2 h-16 w-[72%] -translate-x-1/2 rounded-full bg-black/55 blur-2xl" />
                    <RadarPulse labels={t.solution.radarLabels} compact />
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section id="opportunity" ref={opportunitySectionRef} className="section-wrap section-space">
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
                <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.opportunity.subtitle}</p>
                <p className="mt-6 max-w-4xl text-sm leading-relaxed text-white/95 md:text-base">{t.opportunity.categoryLead}</p>
                <p className="mt-2 max-w-4xl text-sm leading-relaxed text-[#AAB4C2] md:text-base">{t.opportunity.categorySub}</p>

                <div className="mt-10 space-y-8">
                  {t.opportunity.rows.map((row, rowIndex) => (
                    <div key={row.label}>
                      <p className="text-xs uppercase tracking-[0.16em] text-[#AAB4C2]">{row.label}</p>
                      <div className="mt-4 grid gap-4 md:grid-cols-3">
                        {row.cards.map((card, index) => (
                          <article
                            key={`${row.label}-${card.label}`}
                            className="floating-panel floating-panel-hover double-layer-panel animate-fade-up p-5 md:p-6"
                            style={{ animationDelay: `${rowIndex * 80 + index * 70}ms` }}
                          >
                            <GradientIcon
                              icon={opportunityIcons[index] ?? TrendingUp}
                              tone={
                                (rowIndex === 0
                                  ? (['purple', 'blue', 'cyan'][index] ?? 'purple')
                                  : (['pink', 'purple', 'blue'][index] ?? 'purple')) as 'pink' | 'purple' | 'blue' | 'cyan'
                              }
                            />
                            <p className="text-4xl font-semibold tracking-tight md:text-5xl">{formatOpportunityValue(card)}</p>
                            <p className="mt-3 text-sm font-medium text-white">{card.label}</p>
                            {card.detail ? <p className="mt-2 text-xs text-[#AAB4C2]">{card.detail}</p> : null}
                          </article>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#AAB4C2]">{t.opportunity.adoptionTitle}</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {t.opportunity.adoptionSegments.map((segment, index) => (
                      <span key={segment} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs text-[#D2D9E2]">
                        <GradientIcon
                          icon={adoptionIcons[index] ?? Users}
                          tone={(['pink', 'purple', 'blue', 'cyan', 'purple'][index] as 'pink' | 'purple' | 'blue' | 'cyan') ?? 'purple'}
                          className="h-5 w-5"
                          size={10}
                        />
                        {segment}
                      </span>
                    ))}
                  </div>
                </div>

                <article className="floating-panel double-layer-panel mt-8 p-4 md:p-5">
                  <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                      <div className="h-1 rounded-full bg-[linear-gradient(90deg,#F2398A,#9A33FF)]" />
                      <p className="mt-2 text-xs font-medium text-white">{t.opportunity.positioning.leftTitle}</p>
                      <p className="mt-1 text-[11px] text-[#AAB4C2]">{t.opportunity.positioning.leftSub}</p>
                    </div>
                    <div className="mx-auto flex items-center gap-2">
                      <span className="h-px w-8 bg-[linear-gradient(90deg,rgba(242,57,138,0.2),rgba(154,51,255,0.85))]" />
                      <span className="rounded-full border border-[#9A33FF]/40 bg-[#9A33FF]/14 px-3 py-1 text-xs font-medium text-white">
                        {t.opportunity.positioning.centerTitle}
                      </span>
                      <span className="h-px w-8 bg-[linear-gradient(90deg,rgba(154,51,255,0.85),rgba(36,107,255,0.4))]" />
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                      <div className="h-1 rounded-full bg-[linear-gradient(90deg,#246BFF,#14C7E5)]" />
                      <p className="mt-2 text-xs font-medium text-white">{t.opportunity.positioning.rightTitle}</p>
                      <p className="mt-1 text-[11px] text-[#AAB4C2]">{t.opportunity.positioning.rightSub}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-sm text-[#D2D9E2]">{t.opportunity.positioning.centerSub}</p>
                </article>
                <p className="mt-8 text-lg font-medium tracking-tight md:text-xl">{t.opportunity.thesis}</p>
              </div>
            </article>
          </section>

          <section id="model" className="section-wrap section-space">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <SectionHeaderAccent icon={BarChart3} tone="purple" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.model.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.model.intro}</p>
            </div>
            <article className="floating-panel double-layer-panel animate-fade-up relative overflow-hidden p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-5 md:gap-5">
                {t.model.loop.map((step, index) => {
                  const isLast = index === t.model.loop.length - 1;
                  return (
                    <div key={step.title} className="relative">
                      <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
                        <div className="mb-3 flex items-start gap-2.5">
                          <GradientIcon
                            icon={[Activity, BrainCircuit, Radar, LayoutDashboard, TrendingUp][index] ?? Activity}
                            tone={(['pink', 'purple', 'blue', 'cyan', 'purple'][index] as 'pink' | 'purple' | 'blue' | 'cyan') ?? 'purple'}
                            className="h-7 w-7"
                            size={12}
                          />
                          <h3 className="text-sm font-semibold tracking-tight">{step.title}</h3>
                        </div>
                        <p className="text-xs leading-relaxed text-[#AAB4C2]">{step.detail}</p>
                      </article>
                      {!isLast ? (
                        <>
                          <div className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-1 md:flex">
                            <span className="revenue-loop-connector-line h-px w-5" />
                            <ArrowRight className="revenue-loop-connector-arrow h-3.5 w-3.5" />
                          </div>
                          <div className="pointer-events-none mt-3 flex justify-center md:hidden">
                            <ArrowRight className="h-4 w-4 rotate-90 text-[#9A33FF]/80" />
                          </div>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </article>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {t.model.segments.map((segment, index) => (
                <article
                  key={segment.title}
                  className="floating-panel floating-panel-hover double-layer-panel animate-fade-up p-6"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <GradientIcon icon={[Users, LineChart, BriefcaseBusiness][index] ?? Users} tone={(['pink', 'blue', 'cyan'][index] as 'pink' | 'purple' | 'blue' | 'cyan') ?? 'purple'} />
                    <SignalSparkline tone={(['pink', 'blue', 'cyan'][index] as 'pink' | 'purple' | 'blue' | 'cyan') ?? 'purple'} variant={index === 2 ? 'step' : 'smooth'} className="h-6 w-16" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{segment.title}</h3>
                  <p className="mt-2 text-sm font-medium text-white/90">{segment.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#AAB4C2]">{segment.detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {t.model.economics.map((item, index) => (
                <article key={item} className="floating-panel double-layer-panel animate-fade-up p-4" style={{ animationDelay: `${index * 70}ms` }}>
                  <RevenueMetricMiniGraph index={index} />
                  <p className="mt-3 text-sm leading-relaxed text-[#AAB4C2]">{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="roadmap" className="section-wrap section-space">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <SectionHeaderAccent icon={Target} tone="blue" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.roadmap.title}</h2>
            </div>
            <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="pointer-events-none absolute left-[8%] right-[8%] top-10 hidden h-px bg-[linear-gradient(90deg,rgba(242,57,138,0.2),rgba(154,51,255,0.75),rgba(20,199,229,0.2))] xl:block" />
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


