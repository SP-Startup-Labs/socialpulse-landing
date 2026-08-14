'use client';

import type { FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { localizedPath, translate, type Locale } from '@/lib/i18n';

export function LoginView({ locale }: { locale: Locale }) {
  const t = (text: string) => translate(locale, text);
  const path = (href: string) => localizedPath(locale, href);
  const fieldBase =
    'mt-2 w-full rounded-xl border border-white/[0.08] bg-transparent px-3.5 py-2.5 text-sm text-[#F5F7FA] placeholder:text-[#667085] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-[border-color,box-shadow] duration-200 focus:bg-transparent focus:outline-none [-webkit-tap-highlight-color:transparent]';

  const fieldChrome =
    'hover:border-white/[0.14] hover:bg-white/[0.015]';

  const focusChrome =
    'focus:border-[#8D6792]/70 focus:bg-transparent focus:ring-4 focus:ring-[#4B3B8E]/[0.08]';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#050912] text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9A33FF]/[0.06] blur-[120px]" />

      <div className="relative z-10 flex min-h-screen flex-col px-5 py-5 md:px-8 md:py-7">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={path('/')}
            className="flex w-fit items-center gap-2 text-sm text-[#AAB4C2] transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('Back to home')}
          </Link>

          <Link
            href={locale === 'en' ? '/es/login' : '/login'}
            hrefLang={locale === 'en' ? 'es' : 'en'}
            className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-white/[0.1] px-2 text-xs font-semibold text-[#D2D9E2] transition hover:border-white/[0.2] hover:bg-white/[0.04] hover:text-white"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </Link>
        </div>

        <main className="flex flex-1 items-center justify-center py-10 md:py-12">
          <div className="relative flex w-full justify-center">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[calc(100%-18px)] h-[190px] w-screen -translate-x-1/2 overflow-visible"
              viewBox="0 0 1440 190"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="login-horizon-line"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="#F2398A"
                    stopOpacity="0.12"
                  />
                  <stop
                    offset="27%"
                    stopColor="#9A33FF"
                    stopOpacity="0.55"
                  />
                  <stop
                    offset="50%"
                    stopColor="#F5F7FA"
                    stopOpacity="0.95"
                  />
                  <stop
                    offset="73%"
                    stopColor="#246BFF"
                    stopOpacity="0.6"
                  />
                  <stop
                    offset="100%"
                    stopColor="#14C7E5"
                    stopOpacity="0.14"
                  />
                </linearGradient>

                <linearGradient
                  id="login-horizon-fill"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#9A33FF"
                    stopOpacity="0.12"
                  />
                  <stop
                    offset="45%"
                    stopColor="#246BFF"
                    stopOpacity="0.07"
                  />
                  <stop
                    offset="100%"
                    stopColor="#14C7E5"
                    stopOpacity="0.025"
                  />
                </linearGradient>

                <filter
                  id="login-horizon-glow"
                  x="-20%"
                  y="-150%"
                  width="140%"
                  height="400%"
                >
                  <feGaussianBlur stdDeviation="10" />
                </filter>
              </defs>

              <path
                d="M-80 198 C300 140 470 66 720 62 C970 66 1140 140 1520 198 L1520 230 L-80 230 Z"
                fill="url(#login-horizon-fill)"
              />

              <path
                d="M-80 198 C300 140 470 66 720 62 C970 66 1140 140 1520 198"
                fill="none"
                stroke="url(#login-horizon-line)"
                strokeWidth="22"
                opacity="0.45"
                filter="url(#login-horizon-glow)"
              />

              <path
                d="M-80 198 C300 140 470 66 720 62 C970 66 1140 140 1520 198"
                fill="none"
                stroke="url(#login-horizon-line)"
                strokeWidth="1.6"
                opacity="0.9"
              />
            </svg>

            <div className="relative z-10 w-full max-w-[430px] overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(145deg,rgba(15,17,42,0.98),rgba(6,18,34,0.98))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-8">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-[#9A33FF]/20 blur-3xl" />

              <div className="relative mb-7 text-center">
                <Image
                  src="/logos/icon.png"
                  alt="SocialPulse"
                  width={108}
                  height={108}
                  className="mx-auto mb-0"
                  priority
                />

                <h1 className="text-2xl font-semibold tracking-tight text-[#F5F7FA]">
                  {t('Welcome back')}
                </h1>

                <p className="mt-2 text-sm text-[#AAB4C2]">
                  {t('Log in to access SocialPulse')}
                </p>
              </div>

              <form
                className="relative space-y-5"
                onSubmit={handleSubmit}
              >
                <label className="block">
                  <span className="text-sm text-[#AAB4C2]">
                    {t('Email')}
                  </span>

                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    className={`${fieldBase} ${fieldChrome} ${focusChrome}`}
                    required
                  />
                </label>

                <label className="block">
                  <span className="flex items-center justify-between">
                    <span className="text-sm text-[#AAB4C2]">
                      {t('Password')}
                    </span>

                    <button
                      type="button"
                      className="text-xs text-[#9A8FB0] transition hover:text-[#C9A7FF]"
                    >
                      {t('Forgot password?')}
                    </button>
                  </span>

                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder={t('Enter your password')}
                    className={`${fieldBase} ${fieldChrome} ${focusChrome}`}
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="navbar-cta-button w-full rounded-xl px-4 py-3.5 text-sm font-semibold text-white"
                >
                  {t('Log in')}
                </button>
              </form>

              <p className="relative mt-6 text-center text-sm text-[#7F8998]">
                {t('Not registered yet?')}{' '}
                <button
                  type="button"
                  className="font-medium text-[#B88CFF] transition hover:text-[#D5BAFF]"
                >
                  {t('Request access')}
                </button>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
