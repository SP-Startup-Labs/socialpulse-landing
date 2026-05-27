'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  AtSign,
  ArrowRight,
  Activity,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Camera,
  Eye,
  LineChart,
  MessageCircle,
  MessageSquare,
  Music2,
  Newspaper,
  Play,
  Radar,
  Shield,
  Star,
  Target,
  ThumbsUp,
  TrendingUp,
  Users,
  X as XGlyph,
  Zap,
  type LucideIcon
} from 'lucide-react';
import { LeadModal } from './LeadModal';
import { GradientIcon } from './visuals/GradientIcon';
import { HeroRadarVisual } from './visuals/HeroRadarVisual';
import { SocialEngineTablet } from './visuals/SignalEngine';

type SignalEngineVisualLabels = {
  volume: string;
  velocity: string;
  emotionalIntent: string;
  narrativePressure: string;
  engineTitle: string;
  engineInput: string;
  engineCore: string;
  enginePressure: string;
  engineIndex: string;
  outputs: {
    signalVelocity: string;
    predominantNarratives: string;
    emotionalResonance: string;
  };
  funnelFreemium: string;
  funnelPaid: string;
  funnelExpansion: string;
};

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
    title: string;
    subtitle: string;
    measuredTitle: string;
    measuredCaption: string;
    measuredItems: Array<{ label: string; detail: string }>;
    insightFlow: string[];
    insightRejected: string;
    insightMain: string;
    insightSupport: string;
    driversTitle: string;
    driversItems: Array<{ title: string; detail: string }>;
    conclusionPrimary: string;
    conclusionSecondary: string;
    conclusionTertiary: string;
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
      bottomRight: string;
      bottom: string;
      bottomLeft: string;
      left: string;
      topLeft: string;
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
    subtitle: string;
    supporting: string;
    shiftFrom: string;
    shiftTo: string;
    bottomLead: string;
    bottomHighlight: string;
    bottomTail: string;
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

const content: { en: LocalizedContent } = {
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
      title: 'The market is measuring the wrong signal.',
      subtitle: "Activity is visible. But it doesn't explain outcomes.",
      measuredTitle: 'WHAT IS MEASURED',
      measuredCaption: 'Surface metrics',
      measuredItems: [
        { label: 'Likes', detail: '' },
        { label: 'Views', detail: '' },
        { label: 'Engagement', detail: '' },
        { label: 'Volume', detail: '' },
        { label: 'Velocity', detail: '' }
      ],
      insightFlow: ['Activity', 'Emotion', 'Market Reaction'],
      insightRejected: 'Activity drives outcomes',
      insightMain: 'Emotion does.',
      insightSupport: '',
      driversTitle: 'WHAT MOVES OUTCOMES',
      driversItems: [
        {
          title: 'Emotional Intensity',
          detail: ''
        },
        {
          title: 'Narrative Shift',
          detail: ''
        },
        {
          title: 'Audience Activation',
          detail: ''
        },
        {
          title: 'Trust Volatility',
          detail: ''
        }
      ],
      conclusionPrimary: "Capital is being allocated on signals that don't explain outcomes.",
      conclusionSecondary: 'That gap is where advantage is created.',
      conclusionTertiary: ''
    },
    solution: {
      title: 'The Solution',
      intro:
        'SocialPulse works as a structured signal pipeline to translate public discussion into decision-ready insights.',
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
        'From conversation to decision signals',
      frameworkTitle: 'Emotional Signal Map',
      frameworkSubtitle:
        'Real-emotion mapping across live public narratives.',
      radarLabels: {
        topLeft: 'Doubt',
        top: 'Anger',
        topRight: 'Excitement',
        right: 'Support',
        bottomRight: 'Trust',
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
      adoptionSegments: ['Creators / Influencers', 'SMEs', 'Investors'],
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
            'Target: 500 active users'
          ]
        },
        {
          title: 'Product Personalization',
          horizon: '3-9 months',
          items: [
            'User personalization and new NLP models trained by sector: sports, brands, politics, entertainment and research.',
            'Target: 10K active users'
          ]
        },
        {
          title: 'Predictive Intelligence',
          horizon: '9-15 months',
          items: [
            'Launch of reputation prediction engine and public B2B API.',
            'Target: 25K users + 500 paying members'
          ]
        },
        {
          title: 'Global Scale',
          horizon: '15-24 months',
          items: [
            'International expansion and multilingual platform (portuguese, italian, french and asian languages).',
            'Target: 50K users + 3K paying members'
          ]
        }
      ]
    },
    positioning: {
      title: 'Category Positioning',
      subtitle:
        'This is the shift from social media analytics to emotional signal intelligence.',
      supporting:
        'Understanding audiences will soon matter more than measuring them.',
      shiftFrom: 'nice-to-have capability',
      shiftTo: 'competitive advantage',
      bottomLead: 'SocialPulse transforms',
      bottomHighlight: 'emotional signals',
      bottomTail: 'into structured intelligence.'
    },
    platforms: {
      title: 'Supported Platforms',
      intro:
        'Initial coverage focuses on high-signal platforms where public narratives emerge first.',
      availableTitle: 'Social Platforms',
      roadmapTitle: 'Additional Data Sources',
      available: ['X', 'Threads', 'Instagram', 'TikTok', 'YouTube', 'Reddit'],
      roadmap: ['News / Media Sources', 'Forums', 'Google Reviews / TrustPilot']
    },
    footer: 'Early access available for investors, press and strategic partners.'
  }
};

const opportunityIcons: LucideIcon[] = [TrendingUp, BriefcaseBusiness, Users];
const adoptionIcons: LucideIcon[] = [Users, Activity, BriefcaseBusiness, Radar, TrendingUp];
const traditionalMetricIcons: LucideIcon[] = [ThumbsUp, Eye, MessageCircle, BarChart3, Zap];
const roadmapIcons: LucideIcon[] = [Activity, LineChart, Target, Target];

function renderProblemDriverSignal(index: number) {
  const shellClassName =
    'relative h-10 w-11 overflow-hidden rounded-[14px] border border-white/[0.06] bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]';

  switch (index) {
    case 0:
      return (
        <div className={shellClassName}>
          <span className="absolute inset-[11px] rounded-full bg-[radial-gradient(circle,rgba(242,57,138,0.56)_0%,rgba(154,51,255,0.24)_58%,rgba(154,51,255,0)_100%)]" />
          <span className="absolute inset-[6px] rounded-full border border-white/[0.1]" />
          <span className="absolute inset-[2px] rounded-full border border-[#9A33FF]/12" />
        </div>
      );
    case 1:
      return (
        <div className={shellClassName}>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 29 C10 27, 15 22, 21 21 C27 20, 31 24, 40 12" stroke="rgba(255,255,255,0.18)" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M4 32 C10 31, 15 28, 21 25 C28 22, 33 15, 40 14" stroke="#14C7E5" strokeOpacity="0.78" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 25 C9 24, 14 20, 19 18 C25 16, 31 18, 40 9" stroke="#9A33FF" strokeOpacity="0.5" strokeWidth="1.35" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 2:
      return (
        <div className={shellClassName}>
          <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#14C7E5]/82 shadow-[0_0_18px_rgba(20,199,229,0.28)]" />
          <span className="absolute left-[27%] top-[28%] h-1.5 w-1.5 rounded-full bg-white/72" />
          <span className="absolute right-[24%] top-[34%] h-1.5 w-1.5 rounded-full bg-[#9A33FF]/75" />
          <span className="absolute left-[33%] bottom-[23%] h-1.5 w-1.5 rounded-full bg-[#F2398A]/72" />
          <span className="absolute left-[34%] top-[33%] h-px w-4 rotate-[30deg] bg-white/12" />
          <span className="absolute left-1/2 top-[45%] h-px w-3 -translate-x-1/2 rotate-[-22deg] bg-white/12" />
          <span className="absolute left-[42%] top-[58%] h-px w-3 rotate-[58deg] bg-white/12" />
        </div>
      );
    default:
      return (
        <div className={shellClassName}>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 26 C8 28, 12 15, 17 17 C22 19, 25 31, 31 24 C35 19, 38 14, 40 16" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
            <path d="M4 26 C8 28, 12 15, 17 17 C22 19, 25 31, 31 24 C35 19, 38 14, 40 16" stroke="#14C7E5" strokeOpacity="0.82" strokeWidth="1.55" strokeLinecap="round" />
            <path d="M4 30 C10 32, 14 24, 19 23 C24 22, 29 13, 40 12" stroke="#F2398A" strokeOpacity="0.4" strokeWidth="1.15" strokeLinecap="round" />
          </svg>
        </div>
      );
  }
}

function getPlatformIcons(label: string): LucideIcon[] {
  const normalized = label.toLowerCase();

  if (normalized === 'x') return [XGlyph];
  if (normalized.includes('threads')) return [AtSign];
  if (normalized.includes('instagram')) return [Camera];
  if (normalized.includes('tiktok')) return [Music2];
  if (normalized.includes('youtube')) return [Play];
  if (normalized.includes('reddit')) return [MessageCircle];
  if (normalized.includes('news') || normalized.includes('noticias') || normalized.includes('medios') || normalized.includes('media')) {
    return [Newspaper];
  }
  if (normalized.includes('forum') || normalized.includes('foros')) return [MessageSquare];
  if (normalized.includes('google reviews') || normalized.includes('trustpilot')) return [Star, Shield];

  return [Activity];
}

function PlatformBadge({ label, subdued = false }: { label: string; subdued?: boolean }) {
  const icons = getPlatformIcons(label);

  return (
    <span className={`platform-pill ${subdued ? 'platform-pill-subdued' : ''}`}>
      <span className="platform-icon-wrap" aria-hidden="true">
        {icons.map((Icon, index) => (
          <span key={`${label}-icon-${index}`} className="platform-icon-shell">
            <Icon className="h-3.5 w-3.5" />
          </span>
        ))}
      </span>
      <span className="platform-pill-label">{label}</span>
    </span>
  );
}

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
      <div className="capture-tablet relative mt-4 h-20 overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-2.5">
        <article className="capture-post-card">
          <div className="capture-post-head">
            <span className="capture-avatar" />
            <div className="flex-1 space-y-1">
              <span className="capture-line capture-line-type capture-line-type-user capture-line-user" />
              <span className="capture-line capture-line-type capture-line-type-handle capture-line-handle" />
            </div>
          </div>
          <div className="mt-2 space-y-1.5">
            <span className="capture-line capture-line-type capture-line-type-body-a capture-line-body-a" />
            <span className="capture-line capture-line-type capture-line-type-body-b capture-line-body-b" />
          </div>
          <div className="capture-post-foot">
            <span className="capture-line capture-line-time" />
            <span className="capture-post-icon">
              <ThumbsUp className="h-2.5 w-2.5" />
            </span>
            <span className="capture-post-icon">
              <MessageCircle className="h-2.5 w-2.5" />
            </span>
          </div>
        </article>

        <article className="capture-reply-row">
          <span className="capture-reply-avatar" />
          <div className="capture-reply-compose">
            <span className="capture-line capture-line-type capture-line-type-reply capture-reply-line" />
            <span className="capture-reply-cursor" />
            <span className="capture-reply-typing">
              <span className="capture-reply-dot" />
              <span className="capture-reply-dot capture-reply-dot-b" />
              <span className="capture-reply-dot capture-reply-dot-c" />
            </span>
          </div>
          <span className="capture-reply-bubble" />
        </article>
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

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opportunityInView, setOpportunityInView] = useState(false);
  const [opportunityCountProgress, setOpportunityCountProgress] = useState(0);
  const opportunitySectionRef = useRef<HTMLElement | null>(null);
  const t = content.en;

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

  const visualLabels: SignalEngineVisualLabels = {
    volume: 'volume',
    velocity: 'velocity',
    emotionalIntent: 'emotional intent',
    narrativePressure: 'narrative pressure',
    engineTitle: 'Signal Engine',
    engineInput: 'Public Conversations',
    engineCore: 'Emotion Engine',
    enginePressure: 'Narrative Pressure',
    engineIndex: 'Signal Index',
    outputs: {
      signalVelocity: 'Emotion Index',
      predominantNarratives: 'Predominant Narratives',
      emotionalResonance: 'Signal Momentum'
    },
    funnelFreemium: 'Freemium',
    funnelPaid: 'Paid',
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
          <div className="section-wrap flex h-20 items-center justify-between gap-2 md:h-24">
            <div className="flex items-center gap-4">
              <span className="relative inline-flex h-12 w-12 items-center justify-center md:h-16 md:w-16">
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#F2398A,#9A33FF,#246BFF)] opacity-20 blur-[20px]" />
                <Image
                  src="/logo.png"
                  alt="SocialPulse"
                  width={70}
                  height={70}
                  className="relative h-12 w-12 rounded-2xl object-contain shadow-[0_0_35px_rgba(154,51,255,0.35)] md:h-16 md:w-16"
                />
              </span>
              <div>
                <p className="text-base font-bold tracking-tight sm:text-lg md:text-xl">SocialPulse</p>
                <p className="hidden text-xs text-[#AAB4C2] sm:block">{t.brandTagline}</p>
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
              <button onClick={() => setIsModalOpen(true)} className="button-primary rounded-full px-3 py-2 text-xs font-semibold text-white sm:px-4 sm:py-2.5 sm:text-sm md:px-5">
                <span className="hidden md:inline">{t.hero.ctaPrimary}</span>
                <span className="md:hidden">{t.hero.ctaShort}</span>
              </button>
            </div>
          </div>
        </header>

        <main className="relative z-10">
          <section className="section-wrap relative isolate overflow-hidden pb-24 pt-16 sm:pt-20 md:pb-36 md:pt-28">
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
            <div className="flex flex-col lg:min-h-[78vh] lg:justify-center">
              <div className="mb-7 flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#AAB4C2] animate-fade-up sm:mb-8 sm:text-[11px]">
                <span className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5">
                  {t.brandTagline}
                </span>
              </div>

              <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
                <div className="animate-fade-up min-w-0">
                  <h1 className="max-w-2xl text-[2.2rem] font-bold leading-[1.03] tracking-[-0.03em] sm:text-5xl md:text-6xl xl:text-[4.25rem]">
                    Analyze how audiences emotionally react to content in real-time
                  </h1>
                  <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#AAB4C2] sm:text-base md:mt-6 md:text-xl">
                    SocialPulse analyzes public conversations and detects emotional signals behind audience reactions - helping creators understand how content actually lands with their audience.
                  </p>
                  <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed tracking-tight text-[#8C97A8] md:text-base">
                    Traditional metrics show activity. Emotional signals show how people actually feel.
                  </p>
                </div>

                <div className="relative mx-auto mt-2 w-full max-w-[620px] animate-fade-up lg:mt-0" style={{ animationDelay: '120ms' }}>
                  <HeroRadarVisual labels={t.solution.radarLabels} />
                </div>
              </div>
            </div>
          </section>

          <section id="problem" className="section-wrap section-space">
            <article className="floating-panel double-layer-panel animate-fade-up p-6 sm:p-7 md:p-10">
              <SectionHeaderAccent icon={Activity} tone="pink" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.problem.title}</h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.problem.subtitle}</p>

                <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 md:p-6">
                  <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
                    <div className="absolute left-[1.75%] top-[4.5%] h-[90%] w-[31.25%]">
                      <div
                        className="absolute left-[9%] top-[4%] h-[70%] w-[74%] rounded-[48%_48%_40%_40%/56%_56%_32%_32%] opacity-[0.52]"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 40%, rgba(120,136,160,0.12) 0%, rgba(88,100,120,0.08) 22%, rgba(57,66,82,0.045) 46%, rgba(18,23,34,0.01) 72%, rgba(18,23,34,0) 100%)",
                          filter: "blur(18px)",
                        }}
                      />
                      <div
                        className="absolute left-[26%] top-[26%] h-[17%] w-[40%] rounded-full opacity-[0.18]"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 50%, rgba(176,189,208,0.18) 0%, rgba(112,124,144,0.08) 38%, rgba(18,23,34,0) 100%)",
                          filter: "blur(12px)",
                        }}
                      />
                      <div
                        className="absolute left-[36%] top-[66%] h-[10%] w-[22%] rounded-[42%] opacity-[0.24]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(90,103,122,0.18) 0%, rgba(64,74,92,0.12) 52%, rgba(18,23,34,0) 100%)",
                          filter: "blur(8px)",
                        }}
                      />
                      <div
                        className="absolute left-[33.5%] top-[73%] h-[10%] w-[27%] rounded-[44%] opacity-[0.18]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(92,104,122,0.14) 0%, rgba(37,44,57,0.06) 64%, rgba(18,23,34,0) 100%)",
                          filter: "blur(10px)",
                        }}
                      />
                    </div>

                    <div className="absolute right-[1.75%] top-[4.5%] h-[90%] w-[31.25%]">
                      <div
                        className="absolute left-[-18%] top-[1%] h-[84%] w-[112%] rounded-full opacity-[0.44]"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 38%, rgba(238,175,82,0.13) 0%, rgba(129,112,255,0.085) 28%, rgba(44,56,118,0.035) 60%, rgba(11,16,28,0) 100%)",
                          filter: "blur(46px)",
                        }}
                      />
                      <div
                        className="absolute left-[11%] top-[6%] h-[66%] w-[72%] rounded-[50%_50%_39%_39%/58%_58%_30%_30%] opacity-[0.52]"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 40%, rgba(255,226,170,0.12) 0%, rgba(244,178,79,0.1) 22%, rgba(152,118,255,0.06) 46%, rgba(32,40,76,0.025) 70%, rgba(18,23,34,0) 100%)",
                          filter: "blur(24px)",
                        }}
                      />
                      <div
                        className="absolute left-[8%] top-[47%] h-[19%] w-[20%] rounded-full opacity-[0.3]"
                        style={{
                          background:
                            "radial-gradient(circle at 72% 38%, rgba(9,13,22,0.38) 0%, rgba(9,13,22,0.16) 42%, rgba(9,13,22,0) 100%)",
                          filter: "blur(16px)",
                        }}
                      />
                      <div
                        className="absolute right-[8%] top-[47%] h-[19%] w-[20%] rounded-full opacity-[0.3]"
                        style={{
                          background:
                            "radial-gradient(circle at 28% 38%, rgba(9,13,22,0.38) 0%, rgba(9,13,22,0.16) 42%, rgba(9,13,22,0) 100%)",
                          filter: "blur(16px)",
                        }}
                      />
                      <div
                        className="absolute left-[18%] top-[21%] h-[32%] w-[56%] rounded-full opacity-[0.34]"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 55%, rgba(255,232,176,0.42) 0%, rgba(255,204,116,0.28) 34%, rgba(247,179,92,0.12) 66%, rgba(247,179,92,0) 100%)",
                          filter: "blur(30px)",
                        }}
                      />
                      <div
                        className="absolute left-[28%] top-[30%] h-[13%] w-[31%] rounded-full opacity-[0.24]"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 50%, rgba(255,236,190,0.48) 0%, rgba(255,213,137,0.34) 42%, rgba(255,191,97,0.14) 76%, rgba(255,191,97,0) 100%)",
                          filter: "blur(20px)",
                        }}
                      />
                      <div
                        className="absolute left-[38%] top-[34%] h-[5%] w-[11%] rounded-full opacity-[0.18]"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 50%, rgba(255,244,209,0.62) 0%, rgba(255,221,157,0.4) 58%, rgba(255,214,140,0) 100%)",
                          filter: "blur(14px)",
                        }}
                      />
                      <div
                        className="absolute right-[0%] top-[13%] h-[66%] w-[86%] rounded-[2.25rem] opacity-[0.3]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(9,13,22,0.32) 0%, rgba(9,13,22,0.18) 36%, rgba(9,13,22,0.07) 70%, rgba(9,13,22,0) 100%)",
                          filter: "blur(20px)",
                        }}
                      />
                      <div
                        className="absolute left-[35%] top-[62%] h-[11%] w-[23%] rounded-[42%] opacity-[0.24]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,210,142,0.16) 0%, rgba(93,84,133,0.12) 58%, rgba(18,23,34,0) 100%)",
                          filter: "blur(8px)",
                        }}
                      />
                      <div
                        className="absolute left-[34%] top-[71%] h-[9.5%] w-[21%] rounded-[44%] opacity-[0.18]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(161,149,209,0.14) 0%, rgba(39,45,69,0.06) 64%, rgba(18,23,34,0) 100%)",
                          filter: "blur(10px)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="relative z-[1] grid gap-6 lg:grid-cols-[minmax(0,29fr)_minmax(0,28fr)_minmax(0,43fr)] lg:items-start lg:gap-x-7">
                  <section className="space-y-1.5 md:pr-1 lg:w-[88%] lg:max-w-none">
                    {t.problem.measuredCaption ? (
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/28">{t.problem.measuredCaption}</p>
                    ) : null}
                    <p className="text-xs uppercase tracking-[0.18em] text-[#8C97A8]">{t.problem.measuredTitle}</p>
                    <div className="space-y-2.5">
                      {t.problem.measuredItems.map((item, index) => {
                        const Icon = traditionalMetricIcons[index] ?? Activity;
                        return (
                          <article
                            key={item.label}
                            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-2 py-[7px] opacity-[0.84]"
                          >
                            <div className="flex items-center gap-2">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-[#90A0B1]">
                                <Icon className="h-3.5 w-3.5" />
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm font-medium tracking-tight text-white/88">{item.label}</p>
                                {item.detail ? <p className="mt-1 text-sm leading-snug text-[#8A95A6]">{item.detail}</p> : null}
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>

                  <section className="relative flex min-h-[18.75rem] rounded-[28px] border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.055),rgba(7,11,22,0.16))] px-9 py-9 sm:px-10 sm:py-10">
                    <div className="pointer-events-none absolute inset-x-[20%] top-6 h-20 rounded-full bg-[radial-gradient(circle,rgba(154,51,255,0.26)_0%,rgba(154,51,255,0)_72%)] blur-2xl" />
                    <div className="relative flex h-full w-full flex-1 flex-col items-center justify-center text-center">
                      <p className="text-[10px] font-medium tracking-[0.03em] text-white/24 line-through decoration-white/14 md:text-[12px]">
                        {t.problem.insightRejected}
                      </p>
                      <p className="mt-7 max-w-[9ch] text-[1.68rem] font-semibold leading-[0.96] tracking-[-0.05em] text-white [text-shadow:0_0_22px_rgba(255,255,255,0.1)] sm:text-[2.05rem] md:text-[2.38rem]">
                        {t.problem.insightMain}
                      </p>
                      {t.problem.insightSupport ? (
                        <p className="mt-5 max-w-[22rem] text-sm leading-relaxed text-[#C4CEDC] md:text-base">
                          {t.problem.insightSupport}
                        </p>
                      ) : null}
                    </div>
                  </section>

                  <section className="grid grid-rows-[auto_auto] gap-3 lg:col-start-3 lg:w-full lg:max-w-[29.5rem] lg:justify-self-end">
                    <p className="text-right text-xs uppercase tracking-[0.18em] text-[#AAB4C2]">{t.problem.driversTitle}</p>
                    <div className="relative isolate grid w-full gap-x-3.5 gap-y-3.5 before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:z-0 before:h-[54%] before:w-[52%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-[radial-gradient(circle,rgba(245,185,92,0.15)_0%,rgba(245,185,92,0.075)_34%,rgba(129,112,255,0.035)_56%,rgba(245,185,92,0)_74%)] before:opacity-[0.12] before:blur-3xl before:content-[''] sm:grid-cols-2 lg:grid-cols-2">
                      {t.problem.driversItems.map((item, index) => {
                        return (
                          <article
                            key={item.title}
                            className="relative z-[2] flex min-h-[6.875rem] w-full flex-col items-end rounded-2xl border border-white/[0.065] bg-[linear-gradient(160deg,rgba(255,247,235,0.035),rgba(255,255,255,0.052)_22%,rgba(255,255,255,0.02)_100%)] px-4 py-[18px] text-right shadow-[inset_0_1px_0_rgba(255,244,220,0.045),inset_-1px_0_0_rgba(255,213,146,0.03),0_14px_28px_rgba(0,0,0,0.15),0_0_22px_rgba(58,49,255,0.07),0_0_18px_rgba(247,179,92,0.025)]"
                          >
                            {renderProblemDriverSignal(index)}
                            <p className="mt-4 w-full text-right text-sm font-semibold tracking-tight text-white">{item.title}</p>
                            {item.detail ? <p className="mt-1.5 w-full text-right text-sm leading-snug text-[#AEBAC9]">{item.detail}</p> : null}
                          </article>
                        );
                      })}
                    </div>
                  </section>
                </div>

                <div className="pointer-events-none relative z-[1] mt-5 hidden h-8 lg:block" aria-hidden="true">
                  <div className="absolute left-[4%] top-1/2 h-px w-[22%] -translate-y-1/2 bg-[linear-gradient(90deg,rgba(130,145,166,0),rgba(130,145,166,0.18)_18%,rgba(130,145,166,0.16)_76%,rgba(130,145,166,0))]" />
                  <div className="absolute left-[25.5%] top-1/2 h-3.5 w-6 -translate-y-1/2 rounded-r-md border border-white/[0.055] bg-[linear-gradient(90deg,rgba(58,65,78,0.26),rgba(18,23,34,0.12))]" />
                  <div className="absolute right-[47.5%] top-1/2 h-4 w-3.5 -translate-y-1/2 rounded-l-md border border-white/[0.05] bg-[linear-gradient(90deg,rgba(14,19,31,0.18),rgba(76,67,92,0.16))]" />
                  <svg className="absolute right-[5%] top-1/2 h-6 w-[41%] -translate-y-1/2 overflow-visible opacity-75" viewBox="0 0 430 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 14 C70 14 92 8 143 11 C196 14 218 21 270 17 C318 13 352 14 430 14"
                      stroke="url(#problemCableLive)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 14 C70 14 92 8 143 11 C196 14 218 21 270 17 C318 13 352 14 430 14"
                      stroke="rgba(255,211,139,0.14)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="problemCableLive" x1="0" y1="14" x2="430" y2="14" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F7B35C" stopOpacity="0.38" />
                        <stop offset="0.5" stopColor="#14C7E5" stopOpacity="0.32" />
                        <stop offset="1" stopColor="#9A33FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="mt-8 border-t border-white/[0.08] pt-5 text-center md:text-left">
                  <p className="max-w-4xl text-lg font-semibold tracking-tight text-white md:text-2xl">
                    {t.problem.conclusionPrimary}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-base">
                    {t.problem.conclusionSecondary}
                  </p>
                  {t.problem.conclusionTertiary ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#8FA0B3]">
                      {t.problem.conclusionTertiary}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          </section>

          <section id="solution" className="section-wrap section-space">
            <article className="floating-panel double-layer-panel animate-fade-up p-6 sm:p-7 md:p-10">
              <SectionHeaderAccent icon={BrainCircuit} tone="cyan" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.solution.title}</h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.solution.intro}</p>

              <div className="relative mt-10 animate-fade-up" style={{ animationDelay: '60ms' }}>
                <SocialEngineTablet
                  labels={{
                    title: 'SOCIAL ENGINE',
                    input: visualLabels.engineInput,
                    core: visualLabels.engineCore,
                    outputs: visualLabels.outputs
                  }}
                />
              </div>

              <div className="relative mt-10 text-center">
                <div className="pointer-events-none absolute inset-x-[20%] -top-3 h-16 rounded-full bg-[radial-gradient(circle,rgba(154,51,255,0.34)_0%,rgba(154,51,255,0)_72%)] blur-xl" />
                <p className="relative text-lg font-semibold tracking-tight text-white md:text-2xl">{t.solution.closing}</p>
              </div>
            </article>
          </section>

          <section id="opportunity" ref={opportunitySectionRef} className="section-wrap section-space">
            <article className="floating-panel double-layer-panel animate-fade-up relative overflow-hidden p-6 sm:p-7 md:p-12">
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
                      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {row.cards.map((card, index) => (
                          <article
                            key={`${row.label}-${card.label}`}
                            className="floating-panel floating-panel-hover double-layer-panel animate-fade-up min-w-0 p-5 md:p-6"
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
                            <p className="text-[2.05rem] font-semibold leading-none tracking-tight sm:text-4xl md:text-5xl">{formatOpportunityValue(card)}</p>
                            <p className="mt-3 text-sm font-medium leading-snug text-white">{card.label}</p>
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
                      <span key={segment} className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs text-[#D2D9E2]">
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
                <p className="mt-9 text-lg font-medium tracking-tight md:text-xl">{t.opportunity.thesis}</p>
              </div>
            </article>
          </section>

          <section id="model" className="section-wrap section-space">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <SectionHeaderAccent icon={BarChart3} tone="purple" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.model.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.model.intro}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.model.segments.map((segment, index) => (
                <article
                  key={segment.title}
                  className="floating-panel floating-panel-hover double-layer-panel animate-fade-up p-5 md:p-6"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{segment.title}</h3>
                      <p className="mt-1.5 text-sm font-medium text-white/90">{segment.price}</p>
                    </div>
                    <GradientIcon
                      icon={[Users, LineChart, BriefcaseBusiness][index] ?? Users}
                      tone={(['pink', 'blue', 'cyan'][index] as 'pink' | 'purple' | 'blue' | 'cyan') ?? 'purple'}
                      className="h-9 w-9 shrink-0"
                      size={14}
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-[#AAB4C2]">{segment.detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#AAB4C2]">
              <span>{visualLabels.funnelFreemium}</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#9A33FF]/80" />
              <span>{visualLabels.funnelPaid}</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#9A33FF]/80" />
              <span>{visualLabels.funnelExpansion}</span>
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
              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.positioning.subtitle}</p>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/88 md:text-base">{t.positioning.supporting}</p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-[#AAB4C2]">
                  {t.positioning.shiftFrom}
                </span>
                <div className="relative hidden h-px w-11 sm:block">
                  <span className="positioning-shift-line absolute inset-0" />
                  <ArrowRight className="positioning-shift-arrow absolute -right-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9A33FF]/85" />
                </div>
                <ArrowRight className="h-4 w-4 text-[#9A33FF]/75 sm:hidden" />
                <span className="rounded-full border border-[#246BFF]/45 bg-[linear-gradient(120deg,rgba(154,51,255,0.26),rgba(36,107,255,0.2),rgba(20,199,229,0.2))] px-4 py-1.5 text-xs text-white shadow-[0_10px_30px_rgba(36,107,255,0.24)]">
                  {t.positioning.shiftTo}
                </span>
              </div>
              <div className="relative mt-7">
                <div className="pointer-events-none absolute inset-x-[16%] -top-2 h-14 rounded-full bg-[radial-gradient(circle,rgba(154,51,255,0.35)_0%,rgba(154,51,255,0)_72%)] blur-xl" />
                <p className="relative mx-auto max-w-3xl text-base font-medium tracking-tight text-white/90 md:text-lg">
                  {t.positioning.bottomLead}{' '}
                  <span className="gradient-text font-semibold">{t.positioning.bottomHighlight}</span>{' '}
                  {t.positioning.bottomTail}
                </p>
              </div>
            </article>
          </section>

          <section id="platforms" className="section-wrap pb-24 md:pb-36">
            <div className="mb-10 max-w-3xl animate-fade-up">
              <SectionHeaderAccent icon={LineChart} tone="cyan" />
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{t.platforms.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-[#AAB4C2] md:text-lg">{t.platforms.intro}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="floating-panel double-layer-panel animate-fade-up p-6 sm:p-7">
                <h3 className="text-xl font-semibold tracking-tight">{t.platforms.availableTitle}</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.platforms.available.map((platform) => (
                    <PlatformBadge key={platform} label={platform} />
                  ))}
                </div>
              </article>
              <article className="floating-panel double-layer-panel animate-fade-up relative overflow-hidden p-6 sm:p-7" style={{ animationDelay: '90ms' }}>
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12] sm:opacity-[0.18]"
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
                  {t.platforms.roadmap.map((platform) => (
                    <PlatformBadge key={platform} label={platform} subdued />
                  ))}
                </div>
              </article>
            </div>
          </section>
        </main>

        <footer className="relative z-10 pb-12 pt-10">
          <div className="section-wrap">
            <div className="mx-auto mb-8 h-px w-full max-w-5xl bg-[linear-gradient(90deg,transparent,rgba(154,51,255,0.62),rgba(36,107,255,0.48),transparent)]" />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr]">
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
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
