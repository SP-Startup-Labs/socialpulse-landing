import type { Metadata } from 'next';
<<<<<<< ours
<<<<<<< ours
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
=======
=======
>>>>>>> theirs
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-poppins' });
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs

export const metadata: Metadata = {
  metadataBase: new URL('https://socialpulse.example.com'),
  title: 'SocialPulse | Investor & Press Early Access',
  description:
    'SocialPulse is an early-stage Emotional Intelligence SaaS for social media, focused on narrative and sentiment signal detection.',
  openGraph: {
    title: 'SocialPulse | Investor & Press Early Access',
    description:
<<<<<<< ours
<<<<<<< ours
      'Emotional intelligence for social media - built for signal, not noise. Early access for investor and press conversations.',
=======
      'Emotional intelligence for social media — built for signal, not noise. Early access for investor and press conversations.',
>>>>>>> theirs
=======
      'Emotional intelligence for social media — built for signal, not noise. Early access for investor and press conversations.',
>>>>>>> theirs
    type: 'website',
    images: [{ url: '/dashboard-mock.svg', width: 1200, height: 720, alt: 'SocialPulse dashboard mock' }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< ours
<<<<<<< ours
    <html lang="en" className={inter.variable}>
=======
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
>>>>>>> theirs
=======
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
>>>>>>> theirs
      <body>{children}</body>
    </html>
  );
}
