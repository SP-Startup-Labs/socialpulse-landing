import type { Metadata } from 'next';
import { legalPagesEs } from '@/app/legal-content';
import { LegalPageTemplate } from '@/app/legal-page-template';

export const metadata: Metadata = {
  title: 'Política de cookies | SocialPulse',
  alternates: { canonical: '/es/cookie-policy', languages: { en: '/cookie-policy', es: '/es/cookie-policy' } },
};

export default function SpanishCookiePolicyPage() {
  return <LegalPageTemplate page={legalPagesEs.cookies} locale="es" />;
}
