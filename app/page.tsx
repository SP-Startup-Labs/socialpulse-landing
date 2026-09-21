import { LandingPage } from '@/components/LandingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SocialPulse | AI-Powered Emotional Signal Intelligence',
  description:
    'Move beyond likes and engagement. SocialPulse transforms public conversations into emotional intelligence, helping brands, influencers, and agencies understand how people truly feel and make smarter decisions.',
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      es: '/es',
    },
  },
  openGraph: {
    title: 'SocialPulse | AI-Powered Emotional Signal Intelligence',
    description:
      'Move beyond likes and engagement. SocialPulse transforms public conversations into emotional intelligence, helping brands, influencers, and agencies understand how people truly feel and make smarter decisions.',
    url: 'https://socialpulse.es',
    locale: 'en_US',
  },
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SocialPulse',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'SocialPulse analyzes emotional tone in public social conversations to surface narrative shifts and emerging reputation risks.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder'
  }
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <LandingPage locale="en" />
    </>
  );
}
