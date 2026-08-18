import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Iniciar sesión | SocialPulse',
  robots: { index: false, follow: false },
};

export default function SpanishLoginLayout({ children }: { children: ReactNode }) {
  return children;
}
