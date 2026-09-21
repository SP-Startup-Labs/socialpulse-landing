export type Language = 'en' | 'es';

export const roleOptions = [
  'Angel Investor',
  'VC',
  'Corporate VC',
  'Family Office',
  'Strategic Partner',
  'Advisor',
  'Other'
] as const;

export const checkSizeOptions = ['<50k', '50k-100k', '100k-250k', '250k+', 'Exploring'] as const;

export const stageOptions = ['Pre-seed', 'Seed', 'Exploring'] as const;

export const requestTypeOptions = ['Investor', 'Beta Access', 'General Inquiry'] as const;

export const copy = {
  en: {
    nav: ['Why it matters', 'What it does', 'How it works', 'FAQ'],
    badgeEarly: 'Early Access',
    badgePlatforms: 'X + Threads (Live)',
    badgeAudience: 'Investor / Press',
    heroTitle: 'Emotional intelligence for social media - built for signal, not noise.',
    heroSubtitle:
      'SocialPulse translates the emotional pulse of public conversations into clear, decision-ready insights.',
    ctaPrimary: 'Request Investor Deck',
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
    footer: 'Early Access - SocialPulse',
    success: 'Thanks - we will reach out shortly.',
    formCommon: {
      select: 'Select',
      submitting: 'Submitting...'
    },
    formErrors: {
      required: 'Required',
      email: 'Valid email required',
      phone: 'Valid phone required',
      submission: 'Submission failed, please try again.'
    },
    formLabels: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      org: 'Organization / Fund name',
      requestType: 'Request type',
      role: 'Role',
      check: 'Estimated Check Size',
      stage: 'Investment Stage Interest',
      message: 'Short message',
      submit: 'Submit request'
    }
  },
  es: {
    nav: ['Por qué importa', 'Qué hace', 'Cómo funciona', 'Preguntas frecuentes'],
    badgeEarly: 'Acceso anticipado',
    badgePlatforms: 'X + Threads (En directo)',
    badgeAudience: 'Inversores / Prensa',
    heroTitle: 'Inteligencia emocional para redes sociales: creada para detectar señales, no ruido.',
    heroSubtitle:
      'SocialPulse transforma el pulso emocional de las conversaciones públicas en información clara y lista para decidir.',
    ctaPrimary: 'Solicitar presentación para inversores',
    ctaSecondary: 'Ver cómo funciona',
    whyTitle: 'Por qué importa',
    whyText:
      'Las narrativas avanzan más rápido que los paneles. Los cambios emocionales en las conversaciones públicas suelen aparecer antes que sus efectos visibles sobre el mercado y la reputación. SocialPulse ayuda a los equipos a seguir esos cambios con contexto, claridad y rigor.',
    whatTitle: 'Qué hace SocialPulse',
    howTitle: 'Cómo funciona',
    capabilitiesTitle: 'Capacidades',
    platformsTitle: 'Plataformas compatibles',
    roadmapTitle: 'Hoja de ruta',
    faqTitle: 'Preguntas frecuentes',
    finalTitle: 'Acceso anticipado para inversores y prensa',
    finalText:
      'Estamos abriendo un número limitado de sesiones informativas mientras SocialPulse valida su MVP. Comparte tus datos para que podamos contactar contigo.',
    footer: 'Acceso anticipado - SocialPulse',
    success: 'Gracias. Nos pondremos en contacto contigo muy pronto.',
    formCommon: {
      select: 'Seleccionar',
      submitting: 'Enviando...'
    },
    formErrors: {
      required: 'Obligatorio',
      email: 'Introduce un correo electrónico válido',
      phone: 'Introduce un teléfono válido',
      submission: 'El envío ha fallado. Inténtalo de nuevo.'
    },
    formLabels: {
      firstName: 'Nombre',
      lastName: 'Apellidos',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      org: 'Organización / Nombre del fondo',
      requestType: 'Tipo de solicitud',
      role: 'Cargo',
      check: 'Importe estimado de inversión',
      stage: 'Etapa de inversión de interés',
      message: 'Mensaje breve',
      submit: 'Enviar solicitud'
    }
  }
} as const;
