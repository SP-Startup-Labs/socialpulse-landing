import type { Metadata } from 'next';
import { legalPages } from '../legal-content';
import { LegalPageTemplate } from '../legal-page-template';

export const metadata: Metadata = {
  title: 'Cookie Policy | SocialPulse',
  alternates: { canonical: '/cookie-policy', languages: { en: '/cookie-policy', es: '/es/cookie-policy' } },
};

export default function CookiePolicyPage() {
  return <LegalPageTemplate page={legalPages.cookies} />;
}
