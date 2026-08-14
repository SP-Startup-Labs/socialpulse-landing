'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { localizedPath, translate, type Locale } from '@/lib/i18n';

type LocaleContextValue = {
  locale: Locale;
  t: (text: string) => string;
  path: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    t: (text) => translate(locale, text),
    path: (path) => localizedPath(locale, path),
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);

  if (!value) {
    throw new Error('useLocale must be used inside LocaleProvider');
  }

  return value;
}
