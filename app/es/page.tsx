import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'SocialPulse | Inteligencia emocional impulsada por IA',
  description:
    'Ve más allá de los likes y la interacción. SocialPulse transforma conversaciones públicas en inteligencia emocional para ayudar a marcas, creadores y agencias a comprender cómo se siente realmente su audiencia y tomar mejores decisiones.',
  alternates: {
    canonical: '/es',
    languages: {
      en: '/',
      es: '/es',
    },
  },
  openGraph: {
    title: 'SocialPulse | Inteligencia emocional impulsada por IA',
    description:
      'SocialPulse transforma conversaciones públicas en inteligencia emocional para comprender cómo se sienten realmente las audiencias.',
    url: 'https://socialpulse.es/es',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SocialPulse | Inteligencia emocional impulsada por IA',
    description:
      'SocialPulse transforma conversaciones públicas en inteligencia emocional para comprender cómo se sienten realmente las audiencias.',
    images: ['/logos/SocialPulse_Log_v02.png'],
  },
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SocialPulse',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'SocialPulse analiza el tono emocional de las conversaciones sociales públicas para detectar cambios narrativos y riesgos de reputación emergentes.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/PreOrder',
  },
};

export default function SpanishLandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <LandingPage locale="es" />
    </>
  );
}
