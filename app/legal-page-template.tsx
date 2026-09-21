import Link from 'next/link';
import type { LegalPageContent } from './legal-content';
import { localizedPath, translate, type Locale } from '@/lib/i18n';

type Props = {
  page: LegalPageContent;
  locale?: Locale;
};

export function LegalPageTemplate({ page, locale = 'en' }: Props) {
  const t = (text: string) => translate(locale, text);

  return (
    <main className="min-h-screen bg-[#091426] px-6 py-16 text-white">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href={localizedPath(locale, '/')} className="inline-flex text-sm text-[#AAB4C2] transition hover:text-white">
            ← {t('Back to home')}
          </Link>

          <Link
            href={locale === 'en' ? `/es${getLegalPath(page)}` : getLegalPath(page)}
            hrefLang={locale === 'en' ? 'es' : 'en'}
            className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-white/[0.1] px-2 text-xs font-semibold text-[#D2D9E2] transition hover:border-white/[0.2] hover:bg-white/[0.04] hover:text-white"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </Link>
        </div>

        <p className="mb-3 text-sm text-[#AAB4C2]">{page.lastUpdated}</p>
        <h1 className="mb-6 text-4xl font-semibold tracking-tight md:text-5xl">{page.title}</h1>

        <p className="mb-10 text-lg leading-8 text-[#D2D9E2]">{page.intro}</p>

        <div className="space-y-9">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-2xl font-semibold">{section.heading}</h2>
              <div className="space-y-3 text-[#D2D9E2]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

function getLegalPath(page: LegalPageContent) {
  const title = page.title.toLowerCase();

  if (title.includes('privacidad') || title.includes('privacy')) return '/privacy-policy';
  if (title.includes('cookie')) return '/cookie-policy';
  if (title.includes('rgpd') || title.includes('gdpr')) return '/gdpr';
  return '/terms-and-conditions';
}
