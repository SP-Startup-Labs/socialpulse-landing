import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://socialpulse.es'),
  title: 'SocialPulse | AI-Powered Emotional Signal Intelligence',
  description:
    'Move beyond likes and engagement. SocialPulse transforms public conversations into emotional intelligence, helping brands, influencers, and agencies understand how people truly feel and make smarter decisions.',
  openGraph: {
    title: 'SocialPulse | AI-Powered Emotional Signal Intelligence',
    description:
      'Move beyond likes and engagement. SocialPulse transforms public conversations into emotional intelligence, helping brands, influencers, and agencies understand how people truly feel and make smarter decisions.',
    url: 'https://socialpulse.es',
    siteName: 'SocialPulse',
    locale: 'en_US',
    type: 'website',
    images: ['/logos/SocialPulse_Log_v02.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SocialPulse | AI-Powered Emotional Signal Intelligence',
    description:
      'Move beyond likes and engagement. SocialPulse transforms public conversations into emotional intelligence, helping brands, influencers, and agencies understand how people truly feel and make smarter decisions.',
    images: ['/logos/SocialPulse_Log_v02.png'],
  },
  icons: {
    icon: "/logos/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}