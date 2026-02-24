import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://socialpulse.example.com'),
  title: 'SocialPulse | Investor & Press Early Access',
  description:
    'SocialPulse is an early-stage Emotional Intelligence SaaS for social media, focused on narrative and sentiment signal detection.',
  openGraph: {
    title: 'SocialPulse | Investor & Press Early Access',
    description:
      'Emotional intelligence for social media - built for signal, not noise. Early access for investor and press conversations.',
    type: 'website',
    images: [{ url: '/dashboard-mock.svg', width: 1200, height: 720, alt: 'SocialPulse dashboard mock' }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
