import type { Metadata } from 'next';
import { legalPagesEs } from '@/app/legal-content';
import { LegalPageTemplate } from '@/app/legal-page-template';

export const metadata: Metadata = {
  title: 'Política de privacidad | SocialPulse',
  alternates: { canonical: '/es/privacy-policy', languages: { en: '/privacy-policy', es: '/es/privacy-policy' } },
};

export default function SpanishPrivacyPolicyPage() {
  return <LegalPageTemplate page={legalPagesEs.privacy} locale="es" />;
}
