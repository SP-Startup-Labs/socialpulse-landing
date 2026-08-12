import Link from 'next/link';
import type { LegalPageContent } from './legal-content';

type Props = {
  page: LegalPageContent;
};

export function LegalPageTemplate({ page }: Props) {
  return (
    <main className="min-h-screen bg-[#091426] px-6 py-16 text-white">
      <section className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-flex text-sm text-[#AAB4C2] transition hover:text-white">
          ← Back to home
        </Link>

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