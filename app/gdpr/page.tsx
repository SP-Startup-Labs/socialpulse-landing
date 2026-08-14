import type { Metadata } from 'next';
import { legalPages } from '../legal-content';
import { LegalPageTemplate } from '../legal-page-template';

export const metadata: Metadata = {
  title: 'GDPR | SocialPulse',
  alternates: { canonical: '/gdpr', languages: { en: '/gdpr', es: '/es/gdpr' } },
};

export default function GdprPage() {
  return <LegalPageTemplate page={legalPages.gdpr} />;
}
