'use client';

import ShiftBackground from './visuals/ShiftBackground';
import HowItWorks from './HowItWorks';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type MouseEvent } from 'react';
import {
  ArrowRight,
  Activity,
  BarChart3,
  LineChart,
  MessageCircle,
  Newspaper,
  Play,
  Radar,
  Star,
  Target,
  Users,
  UserRound,
  ShieldCheck,
  Globe2,
  X as XGlyph,
  Zap, 
} from 'lucide-react';
import { LeadModal } from './LeadModal';
import { HeroRadarVisual } from './visuals/HeroRadarVisual';
import { CoreCapabilitiesSection } from './sections/CoreCapabilitiesSection';
import { WhoItsForSection } from './sections/WhoItsForSection';
import { IllustrativeUseCaseSection } from './sections/IllustrativeUseCaseSection';
import { VisionSection } from './sections/VisionSection';
import { FinalCtaSection } from './sections/FinalCtaSection';

const content = {
  en: {
    nav: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Who it’s for', href: '#model' },
      { label: 'Use cases', href: '#roadmap' },
      { label: 'Product', href: '#product' }
    ],
    solution: {
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
    footer: 'Early access available for investors, press and strategic partners.'
  }
} as const;


// Placeholder metrics — replace values once validated
const HERO_METRICS = [
  { value: '1.28M+', label: 'Conversations analyzed', Icon: MessageCircle, color: '#246BFF' },
  { value: '35+', label: 'Languages covered', Icon: Globe2, color: '#14C7E5' },
  { value: '45s', label: 'Average detection time', Icon: Zap, color: '#6C8DFF' },
  { value: '99%', label: 'Public data only', Icon: ShieldCheck, color: '#14C7E5' }
];

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);

  const t = content.en;

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleSmoothScroll = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    if (href === '#hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const targetSection = document.querySelector<HTMLElement>(href);

    if (!targetSection) return;

    const navbarOffset = 84;
    const targetPosition =
      targetSection.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className="relative isolate min-h-screen overflow-hidden bg-[#091426] text-white">
        <ShiftBackground />
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_50%_18%,rgba(9,20,38,0.18)_0%,rgba(9,20,38,0.52)_58%,rgba(4,10,20,0.82)_100%)]" />

        {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-36 -top-36 h-[520px] w-[520px] rounded-full bg-[#F2398A]/30 blur-[180px]" />
          <div className="absolute left-1/2 top-[-160px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#9A33FF]/26 blur-[180px]" />
          <div className="absolute -bottom-32 -right-24 h-[540px] w-[540px] rounded-full bg-[#14C7E5]/25 blur-[180px]" />
          <div className="absolute right-[-16%] top-[10%] h-[560px] w-[880px] rounded-[44%_56%_62%_38%/44%_46%_54%_56%] bg-[linear-gradient(125deg,rgba(242,57,138,0.2),rgba(154,51,255,0.16),rgba(20,199,229,0.14))] blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(170,180,194,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(170,180,194,0.025)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,20,38,0)_34%,rgba(9,20,38,0.72)_100%)]" />
        </div> */}

        <header
          className={`fixed inset-x-0 top-0 z-50 border-b bg-[#091426]/78 backdrop-blur-xl transition-all duration-300 ${isNavbarScrolled
            ? 'border-white/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.18)]'
            : 'border-transparent shadow-none'
            }`}>
          <div className="section-wrap flex h-14 items-center justify-between gap-2 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:h-16"
            style={
              isNavbarScrolled
                ? {
                  maxWidth: '100vw',
                  paddingLeft: 'clamp(20px,3vw,40px)',
                  paddingRight: 'clamp(20px,3vw,40px)',
                }
                : undefined
            }
          >
            <div className={`flex items-center gap-4 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isNavbarScrolled ? 'ml-0' : 'ml-0 lg:-ml-20'
              }`}
            >
              <a
                href="#hero"
                onClick={(event) => handleSmoothScroll(event, '#hero')}
                aria-label="Back to top"
                className="relative h-10 w-[140px] sm:h-12 sm:w-[190px] md:h-14 md:w-[230px]"
              >
                <Image
                  src="/logos/logo_banner_fondo_oscuro.webp"
                  alt="SocialPulse"
                  fill
                  priority
                  sizes="(max-width: 768px) 190px, 230px"
                  className="object-contain"
                />
              </a>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-[#AAB4C2] lg:flex">
              {t.nav.map((item) => (
                <a key={item.label}
                  href={item.href}
                  onClick={(event) => handleSmoothScroll(event, item.href)}
                  className="whitespace-nowrap transition-colors duration-200 hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className={`flex items-center gap-4 transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isNavbarScrolled ? 'translate-x-0' : 'translate-x-0 lg:translate-x-20'}`}>
              <button type="button" className="hidden items-center gap-2 text-sm text-[#D2D9E2] transition-colors duration-200 hover:text-white sm:inline-flex">
                <Link href="/login" className="hidden items-center gap-2 text-sm text-[#D2D9E2] transition-colors duration-200 hover:text-white sm:inline-flex">
                  <UserRound className="h-[18px] w-[18px]" stroke="url(#login-icon-gradient)">
                    <defs>
                      <linearGradient id="login-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2D418B" />
                        <stop offset="55%" stopColor="#4B3B8E" />
                        <stop offset="100%" stopColor="#8D6792" />
                      </linearGradient>
                    </defs>
                  </UserRound>

                  <span>Log in</span>
                </Link>
              </button>
              <span className="hidden h-8 w-px bg-white/[0.08] sm:block" />
              <button type="button" onClick={() => setIsModalOpen(true)} className="navbar-cta-button group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-white sm:gap-2.5 sm:rounded-xl sm:px-4 sm:py-3.5 sm:text-sm">
  <span className="whitespace-nowrap">Get in Touch</span>
  <span className="hidden whitespace-nowrap bg-gradient-to-r from-[#8A85AE] via-[#C8BCDD] to-[#AE9DC2] bg-clip-text text-xs font-medium text-transparent sm:inline">For Investors</span>
  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 sm:h-[18px] sm:w-[18px]" />
</button>

            </div>
          </div>
        </header>
        <main className="relative z-10 pt-14 md:pt-16">
          <section id="hero" className="section-wrap !max-w-[1920px] relative isolate overflow-visible pt-8 sm:pt-10 md:pt-10">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
              <div className="absolute -left-24 top-0 h-[280px] w-[280px] rounded-full bg-[#F2398A]/22 blur-[140px]" />
              <div className="absolute left-[35%] top-[8%] h-[220px] w-[300px] rounded-full bg-[#9A33FF]/18 blur-[120px]" />
              <div className="absolute right-[-8%] top-[12%] h-[380px] w-[560px] rounded-[42%_58%_60%_40%/44%_42%_58%_56%] bg-[linear-gradient(124deg,rgba(154,51,255,0.22),rgba(36,107,255,0.16),rgba(20,199,229,0.12))] blur-[130px]" />

              <svg className="absolute inset-0 h-full w-full opacity-[0.16]" viewBox="0 0 1200 640" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

            <div className="mx-auto mt-[90px] flex w-full max-w-[1630px] flex-col">
              <div className="grid items-stretch gap-14 lg:grid-cols-[3fr_4fr] lg:gap-10 xl:gap-14">
                <div className="min-w-0 animate-fade-up">
                  <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#246BFF]/25 bg-[#246BFF]/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#6C8DFF]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#14C7E5]" />
                    Live example
                  </span>
                  <h1 className="max-w-2xl text-[2.2rem] font-bold leading-[1.03] tracking-[-0.03em] sm:text-5xl md:text-6xl xl:text-[3.75rem]">
                    Understand what{' '}
                    <span className="hero-moving-gradient">moves</span>{' '}
                    audiences.
                  </h1>

                  <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-[#AAB4C2] sm:text-base md:mt-6 md:text-lg">
                    SocialPulse analyzes public conversations in real time to reveal the emotions, narratives and shifts shaping audience behavior — so you can understand what is changing, why it matters and act before the moment passes.
                  </p>

                  <div className="mt-12 grid divide-y divide-white/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    <div className="flex min-h-[132px] items-start gap-4 py-6 sm:py-3 sm:pr-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#246BFF]/35 bg-[#246BFF]/10">
                        <Zap className="h-5 w-5 text-[#6C8DFF]" />
                      </span>

                      <div>
                        <p className="min-h-[44px] text-[17px] font-semibold leading-[1.25] text-[#F5F7FA]">Real-time detection</p>
                        <p className="mt-2 text-sm leading-[1.6] text-[#929CAB]">Fresh insights as conversations unfold.</p>
                      </div>
                    </div>

                    <div className="flex min-h-[132px] items-start gap-4 py-6 sm:px-5 sm:py-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#9A33FF]/35 bg-[#9A33FF]/10">
                        <Target className="h-5 w-5 text-[#A968FF]" />
                      </span>

                      <div>
                        <p className="min-h-[44px] text-[17px] font-semibold leading-[1.25] text-[#F5F7FA]">Emotions that matter</p>
                        <p className="mt-2 text-sm leading-[1.6] text-[#929CAB]">Beyond sentiment to the drivers behind opinions.</p>
                      </div>
                    </div>

                    <div className="flex min-h-[132px] items-start gap-4 py-6 sm:py-3 sm:pl-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#14C7E5]/35 bg-[#14C7E5]/10">
                        <ShieldCheck className="h-5 w-5 text-[#14C7E5]" />
                      </span>

                      <div>
                        <p className="min-h-[44px] text-[17px] font-semibold leading-[1.25] text-[#F5F7FA]">Public data only</p>
                        <p className="mt-2 text-sm leading-[1.6] text-[#929CAB]">Ethical, transparent and privacy compliant.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                    <a href="#live-analysis" onClick={(event) => handleSmoothScroll(event, '#live-analysis')} className="navbar-cta-button group inline-flex min-h-[52px] flex-1 items-center justify-center gap-3 rounded-xl px-6 py-4 text-[15px] font-semibold text-white">
                      Explore a live analysis
                      <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>

                    <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-xl border border-white/[0.16] bg-white/[0.02] px-6 py-4 text-[15px] font-medium text-[#D9DEE6] transition hover:border-white/[0.25] hover:bg-white/[0.05] hover:text-white">
                      Request early access
                    </button>
                  </div>
                </div>
                {/* dashboard */}
                <div id="live-analysis" className="w-full max-w-[900px] min-w-0 animate-fade-up lg:pt-12" style={{ animationDelay: '120ms' }}>
                  <div className=" flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[0.1] bg-[#07101F]/95 shadow-[0_28px_90px_rgba(0,0,0,0.38),0_0_70px_rgba(36,107,255,0.08)] backdrop-blur-xl">
                    <div className="flex min-h-12 items-center justify-between gap-3 border-b border-white/[0.08] px-3 sm:px-4">
                      <div className="flex min-w-0 items-center gap-2 text-[10px] text-[#7F8998] sm:text-[11px]">
                        <span>Topics</span>
                        <span className="text-white/25">›</span>
                        <span className="truncate font-medium text-[#E8ECF2]">2026 FIFA World Cup</span>

                        <span className="inline-flex items-center gap-1 rounded-full border border-[#14C7E5]/20 bg-[#14C7E5]/10 px-2 py-0.5 text-[9px] font-medium text-[#14C7E5]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#14C7E5]" />
                          Live
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button type="button" className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-[#AAB4C2]">Last 7 days ▾</button>
                        <button type="button" className="hidden rounded-lg border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-[#AAB4C2] sm:block">Share</button>
                      </div>
                    </div>

                    <div className="flex flex-1">
                      <aside className="hidden w-11 shrink-0 flex-col items-center gap-2 border-r border-white/[0.07] py-3 sm:flex">
                        <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[#246BFF]/10 text-[#6C8DFF]">
                          <Radar className="h-4 w-4" />
                        </span>

                        {[Activity, BarChart3, Play, Users, LineChart, Target].map((Icon, index) => (
                          <button key={index} type="button" className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${index === 0 ? 'border border-[#246BFF]/20 bg-[#246BFF]/10 text-[#6C8DFF]' : 'text-[#657184] hover:bg-white/[0.04] hover:text-[#AAB4C2]'}`}>
                            <Icon className="h-3.5 w-3.5" />
                          </button>
                        ))}
                      </aside>

                      <div className="min-w-0 flex-1 p-3">
                        <div className="grid gap-3 md:grid-cols-[0.86fr_1.14fr]">
                          <article className="relative min-h-[228px] overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xs font-medium text-[#E8ECF2]">Emotion Index</h3>
                              <span className="text-[9px] uppercase tracking-[0.12em] text-[#14C7E5]">Live signal</span>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 top-8 overflow-hidden">
                              <div className="absolute left-1/2 top-1/2 w-[500px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.43] [&_.hero-insight]:hidden">
                                <HeroRadarVisual labels={t.solution.radarLabels} />
                              </div>
                            </div>
                          </article>

                          <article className="min-h-[228px] rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                            <h3 className="text-xs font-medium text-[#E8ECF2]">Trust vs. Skepticism</h3>

                            <div className="mt-2 flex items-center gap-4 text-[9px] text-[#7F8998]">
                              <span className="inline-flex items-center gap-1.5">
                                <span className="h-1.5 w-3 rounded-full bg-[#246BFF]" />
                                Trust
                              </span>

                              <span className="inline-flex items-center gap-1.5">
                                <span className="h-1.5 w-3 rounded-full bg-[#F2398A]" />
                                Skepticism
                              </span>
                            </div>

                            <svg className="mt-2 h-[142px] w-full" viewBox="0 0 360 142" fill="none" aria-hidden="true">
                              {[24, 58, 92, 126].map((y) => <path key={y} d={`M24 ${y} H350`} stroke="rgba(255,255,255,0.055)" strokeWidth="1" />)}
                              {[24, 105, 186, 267, 350].map((x) => <path key={x} d={`M${x} 18 V126`} stroke="rgba(255,255,255,0.035)" strokeWidth="1" />)}

                              <path d="M24 92 L53 83 L82 78 L111 66 L140 73 L169 88 L198 61 L227 74 L256 46 L285 37 L318 50 L350 62" stroke="#246BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M24 112 L53 116 L82 102 L111 98 L140 105 L169 95 L198 117 L227 111 L256 106 L285 99 L318 88 L350 86" stroke="#F2398A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                              {[[24, 92], [53, 83], [82, 78], [111, 66], [140, 73], [169, 88], [198, 61], [227, 74], [256, 46], [285, 37], [318, 50], [350, 62]].map(([cx, cy]) => <circle key={`trust-${cx}`} cx={cx} cy={cy} r="2.6" fill="#246BFF" />)}
                              {[[24, 112], [53, 116], [82, 102], [111, 98], [140, 105], [169, 95], [198, 117], [227, 111], [256, 106], [285, 99], [318, 88], [350, 86]].map(([cx, cy]) => <circle key={`skepticism-${cx}`} cx={cx} cy={cy} r="2.6" fill="#F2398A" />)}
                            </svg>

                            <div className="flex justify-between px-1 text-[8px] text-[#657184]">
                              <span>May 11</span>
                              <span>May 13</span>
                              <span>May 15</span>
                              <span>May 17</span>
                            </div>
                          </article>
                        </div>

                        <div className="mt-3 grid gap-3 md:grid-cols-[1.15fr_0.78fr_1.07fr]">
                          <article className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                            <h3 className="text-xs font-medium text-[#E8ECF2]">Top Sources</h3>

                            <div className="mt-3 flex flex-wrap gap-2">
                              <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-[#246BFF]/20 bg-[#246BFF]/10 px-2 py-1 text-[9px] text-[#AFC6FF]">
                                <XGlyph className="h-3 w-3" /> X <span className="text-[#6C8DFF]">64%</span>
                              </button>

                              <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-[#F2398A]/20 bg-[#F2398A]/10 px-2 py-1 text-[9px] text-[#F6A4C8]">
                                <MessageCircle className="h-3 w-3" /> Reddit <span>18%</span>
                              </button>

                              <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-[9px] text-[#AAB4C2]">
                                <Play className="h-3 w-3 text-[#F2398A]" /> YouTube <span>11%</span>
                              </button>

                              <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-[9px] text-[#AAB4C2]">
                                <Newspaper className="h-3 w-3 text-[#14C7E5]" /> News <span>7%</span>
                              </button>

                              <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-[9px] text-[#AAB4C2]">
                                <Star className="h-3 w-3 text-[#9A33FF]" /> Blogs <span>5%</span>
                              </button>
                            </div>
                          </article>

                          <article className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                            <h3 className="text-xs font-medium text-[#E8ECF2]">Conversation Volume</h3>
                            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">1.28M</p>
                            <p className="text-[9px] text-[#657184]">mentions</p>

                            <div className="mt-4 flex h-10 items-end gap-1.5">
                              {[38, 68, 45, 76, 58, 86, 63, 48, 82, 100].map((height, index) => (
                                <span key={`${height}-${index}`} className="flex-1 rounded-t-sm bg-[linear-gradient(180deg,#246BFF,rgba(154,51,255,0.38))]" style={{ height: `${height}%` }} />
                              ))}
                            </div>
                          </article>

                          <article className="rounded-xl border border-[#9A33FF]/15 bg-[#9A33FF]/[0.065] p-3">
                            <h3 className="text-xs font-medium text-[#B66DFF]">Key Insight</h3>
                            <p className="mt-2 text-[10px] leading-5 text-[#C4CBD5]">
                              Trust is rising while skepticism dips across non-traditional audiences after the opening performance.
                            </p>

                            <button type="button" className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-medium text-[#6C8DFF]">
                              View analysis
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          </article>
                        </div>
                      </div>
                    </div>

                    <div className="flex min-h-9 items-center justify-between gap-3 border-t border-white/[0.07] px-3 text-[8px] text-[#657184] sm:px-4 sm:text-[9px]">
                      <span className="inline-flex min-w-0 items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#14C7E5]" />
                        <span className="truncate">Real-time analysis of public conversations across 35+ languages</span>
                      </span>

                      <span className="shrink-0">Updated 8 minutes ago&nbsp; ↻</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section aria-label="Key metrics" className="mt-12 section-wrap !max-w-[1700px] pb-16 md:pb-[115px]">
            <div className="grid overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#07101F]/80 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
              {HERO_METRICS.map(({ value, label, Icon, color }) => (
                <div key={label} className="flex min-h-[108px] items-center gap-4 border-b border-white/[0.08] px-6 py-5 last:border-b-0 sm:odd:border-r sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:px-8">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-white/[0.025]" style={{ borderColor: `${color}55`, color }}>
                    <Icon className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="text-[22px] font-semibold leading-none tracking-[-0.02em] text-[#F5F7FA]">{value}</p>
                    <p className="mt-2 text-sm leading-snug text-[#AAB4C2]">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          

          {/* otra seccion para los key metrics un pco mas bonita */}
          {/* <section aria-label="Key metrics" className="relative px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
            <div className="mx-auto w-full max-w-[1536px]">
              <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(154,51,255,0.5),rgba(36,107,255,0.42),transparent)]" />

              <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                {HERO_METRICS.map(({ value, label, Icon, color }) => (
                  <div key={label} className="flex min-h-[108px] items-center gap-4 border-b border-white/[0.08] px-4 py-6 transition-colors duration-300 hover:bg-white/[0.018] sm:px-6 sm:odd:border-r sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:px-8">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border" style={{ borderColor: `${color}40`, backgroundColor: `${color}0D`, color }}>
                      <Icon className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-[22px] font-semibold leading-none tracking-[-0.02em] text-[#F5F7FA]">{value}</p>
                      <p className="mt-2 text-sm leading-snug text-[#AAB4C2]">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(36,107,255,0.35),rgba(154,51,255,0.42),transparent)]" />
            </div>
          </section> */}
          {/* otra seccion para los key metrics un pco mas bonita */}



          <HowItWorks />

          <CoreCapabilitiesSection />

          <WhoItsForSection />

          <IllustrativeUseCaseSection />

          <VisionSection onContactUs={() => setIsModalOpen(true)} />

          <FinalCtaSection onEarlyAccess={() => setIsModalOpen(true)} />

        </main>

        <footer className="relative z-10 px-5 pb-12 pt-10 md:px-8">
          <div className="mx-auto w-full max-w-[1536px]">
            <div className="mx-auto mb-8 h-px w-full max-w-5xl bg-[linear-gradient(90deg,transparent,rgba(154,51,255,0.62),rgba(36,107,255,0.48),transparent)]" />
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex h-8 w-8 items-center justify-center">
                    <span className="absolute inset-0 rounded-full" />
                    <Image src="/logos/Logo_fondo_oscuro.webp" alt="SocialPulse" width={160} height={32} className="h-8 w-auto object-contain" />
                  </span>
                  <span className="text-lg font-semibold tracking-tight text-white">SocialPulse</span>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-[#AAB4C2]">
                  Emotional Signal Intelligence for the digital conversation economy.
                </p>
                <a href="mailto:contact@socialpulse.es" className="inline-flex text-sm text-[#D2D9E2] transition hover:text-white">
                  contact@socialpulse.es
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
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#AAB4C2]">Legal</p>
                <div className="mt-3 space-y-2 text-sm text-[#D2D9E2]">
                  <a href="/privacy-policy" className="block transition hover:text-white">
                    Privacy Policy
                  </a>
                  <a href="/terms-and-conditions" className="block transition hover:text-white">
                    Terms & Conditions
                  </a>
                  <a href="/cookie-policy" className="block transition hover:text-white">
                    Cookie Policy
                  </a>
                  <a href="/gdpr" className="block transition hover:text-white">
                    GDPR
                  </a>
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
