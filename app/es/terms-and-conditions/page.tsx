import type { Metadata } from 'next';
import { legalPagesEs } from '@/app/legal-content';
import { LegalPageTemplate } from '@/app/legal-page-template';

export const metadata: Metadata = {
  title: 'Términos y condiciones | SocialPulse',
  alternates: { canonical: '/es/terms-and-conditions', languages: { en: '/terms-and-conditions', es: '/es/terms-and-conditions' } },
};

export default function SpanishTermsAndConditionsPage() {
  return <LegalPageTemplate page={legalPagesEs.terms} locale="es" />;
}
