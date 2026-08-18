import type { Metadata } from 'next';
import { legalPages } from '../legal-content';
import { LegalPageTemplate } from '../legal-page-template';

export const metadata: Metadata = {
  title: 'Terms & Conditions | SocialPulse',
  alternates: { canonical: '/terms-and-conditions', languages: { en: '/terms-and-conditions', es: '/es/terms-and-conditions' } },
};

export default function TermsAndConditionsPage() {
  return <LegalPageTemplate page={legalPages.terms} />;
}
