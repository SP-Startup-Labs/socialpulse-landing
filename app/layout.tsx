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
  metadataBase: new URL('https://socialpulse.example.com'),
  title: 'SocialPulse | Investor & Press Early Access',
  description:
    'Emotional intelligence for social media — built for signal, not noise. Early access for investor and press conversations.',
  openGraph: {
    title: 'SocialPulse | Investor & Press Early Access',
    description:
      'Emotional intelligence for social media — built for signal, not noise. Early access for investor and press conversations.',
    url: 'https://socialpulse.example.com',
    siteName: 'SocialPulse',
    locale: 'en_US',
    type: 'website',
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