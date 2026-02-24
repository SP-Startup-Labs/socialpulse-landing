export type Language = 'en' | 'es';

export const roleOptions = [
  'Angel Investor',
  'VC',
  'Corporate VC',
  'Family Office',
  'Press',
  'Strategic Partner',
  'Advisor',
  'Other'
] as const;

export const checkSizeOptions = ['<50k', '50k–100k', '100k–250k', '250k+', 'Exploring'] as const;

export const stageOptions = ['Pre-seed', 'Seed', 'Exploring'] as const;

export const copy = {
  en: {
    nav: ['Why it matters', 'What it does', 'How it works', 'FAQ'],
    badgeEarly: 'Early Access',
    badgePlatforms: 'X + Threads (Live)',
    badgeAudience: 'Investor / Press',
    heroTitle: 'Emotional intelligence for social media — built for signal, not noise.',
    heroSubtitle:
      'SocialPulse translates the emotional pulse of public conversations into clear, decision-ready insights.',
    ctaPrimary: 'Request Investor / Press Access',
    ctaSecondary: 'See how it works',
    whyTitle: 'Why It Matters',
    whyText:
      'Narratives move faster than dashboards. Emotional shifts in public conversations often surface before visible market and reputation outcomes. SocialPulse helps teams track those shifts with context, clarity, and discipline.',
    whatTitle: 'What SocialPulse Does',
    howTitle: 'How It Works',
    capabilitiesTitle: 'Capabilities',
    platformsTitle: 'Supported Platforms',
    roadmapTitle: 'Roadmap',
    faqTitle: 'FAQ',
    finalTitle: 'Early access for investor and press conversations',
    finalText:
      'We are opening a limited set of briefings while SocialPulse is in MVP validation. Share your details to receive a follow-up.',
    footer: 'Early Access — SocialPulse',
    success: 'Thanks — we’ll reach out shortly.',
    formLabels: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      org: 'Organization / Fund name',
      role: 'Role',
      check: 'Estimated Check Size',
      stage: 'Investment Stage Interest',
      message: 'Short message',
      submit: 'Submit request'
    }
  },
  es: {
    nav: ['Por qué importa', 'Qué hace', 'Cómo funciona', 'Preguntas'],
    badgeEarly: 'Acceso temprano',
    badgePlatforms: 'X + Threads (Activo)',
    badgeAudience: 'Inversión / Prensa',
    heroTitle: 'Inteligencia emocional para redes sociales — diseñada para señal, no ruido.',
    heroSubtitle:
      'SocialPulse traduce el pulso emocional de conversaciones públicas en información clara y útil para decisiones.',
    ctaPrimary: 'Solicitar acceso para inversión / prensa',
    ctaSecondary: 'Ver cómo funciona',
    whyTitle: 'Por qué importa',
    whyText:
      'Las narrativas cambian más rápido que los reportes. Los movimientos emocionales en conversaciones públicas suelen aparecer antes de impactos visibles en mercado y reputación. SocialPulse ayuda a seguir esos cambios con contexto y claridad.',
    whatTitle: 'Qué hace SocialPulse',
    howTitle: 'Cómo funciona',
    capabilitiesTitle: 'Capacidades',
    platformsTitle: 'Plataformas compatibles',
    roadmapTitle: 'Hoja de ruta',
    faqTitle: 'Preguntas frecuentes',
    finalTitle: 'Acceso temprano para conversaciones con inversión y prensa',
    finalText:
      'Estamos abriendo una cantidad limitada de briefings mientras SocialPulse valida su MVP. Comparte tus datos para recibir seguimiento.',
    footer: 'Acceso temprano — SocialPulse',
    success: 'Gracias — nos pondremos en contacto pronto.',
    formLabels: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      org: 'Organización / Fondo',
      role: 'Rol',
      check: 'Cheque estimado',
      stage: 'Interés por etapa',
      message: 'Mensaje breve',
      submit: 'Enviar solicitud'
    }
  }
} as const;
