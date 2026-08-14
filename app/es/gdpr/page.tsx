import type { Metadata } from 'next';
import { legalPagesEs } from '@/app/legal-content';
import { LegalPageTemplate } from '@/app/legal-page-template';

export const metadata: Metadata = {
  title: 'RGPD | SocialPulse',
  alternates: { canonical: '/es/gdpr', languages: { en: '/gdpr', es: '/es/gdpr' } },
};

export default function SpanishGdprPage() {
  return <LegalPageTemplate page={legalPagesEs.gdpr} locale="es" />;
}
