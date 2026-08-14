import type { Metadata } from 'next';
import { legalPages } from '../legal-content';
import { LegalPageTemplate } from '../legal-page-template';

export const metadata: Metadata = {
  title: 'Privacy Policy | SocialPulse',
  alternates: { canonical: '/privacy-policy', languages: { en: '/privacy-policy', es: '/es/privacy-policy' } },
};

export default function PrivacyPolicyPage() {
  return <LegalPageTemplate page={legalPages.privacy} />;
}
