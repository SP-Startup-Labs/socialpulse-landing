import { LandingPage } from '@/components/LandingPage';

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
      <LandingPage />
    </>
  );
}
