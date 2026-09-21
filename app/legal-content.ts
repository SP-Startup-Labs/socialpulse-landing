export type LegalPageContent = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
};

export const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'Draft version - pending legal review',
    intro:
      'This Privacy Policy explains how SocialPulse may collect, use and protect personal data submitted through this website. This is a provisional version and will be reviewed by the legal team.',
    sections: [
      {
        heading: 'Data controller',
        paragraphs: [
          'The data controller details are pending confirmation. This section should include the legal name of the company, registered address and privacy contact email.'
        ]
      },
      {
        heading: 'Data we collect',
        paragraphs: [
          'We may collect personal data submitted through website forms, such as name, surname, email address, phone number, organization, role and message content.'
        ]
      },
      {
        heading: 'Purpose of processing',
        paragraphs: [
          'The information may be used to respond to access requests, investor or press enquiries, product interest and other communications related to SocialPulse.'
        ]
      },
      {
        heading: 'Data retention',
        paragraphs: [
          'Personal data will be kept only for as long as necessary for the purposes described above, unless a longer retention period is required by law.'
        ]
      },
      {
        heading: 'User rights',
        paragraphs: [
          'Users may request access, rectification, deletion, restriction, objection or portability of their personal data. The final legal contact email is pending confirmation.'
        ]
      }
    ]
  },

  terms: {
    title: 'Terms & Conditions',
    lastUpdated: 'Draft version - pending legal review',
    intro:
      'These Terms & Conditions define the basic rules for using the SocialPulse website. This is a provisional version and will be reviewed by the legal team.',
    sections: [
      {
        heading: 'Use of the website',
        paragraphs: [
          'Users agree to use this website lawfully and not to interfere with its normal operation, security or availability.'
        ]
      },
      {
        heading: 'Website content',
        paragraphs: [
          'The content provided on this website is for general information purposes and may change as the SocialPulse product evolves.'
        ]
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'All trademarks, branding, design elements, text, graphics and other materials related to SocialPulse remain the property of their respective owners.'
        ]
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'SocialPulse does not guarantee that the website will always be available, error-free or uninterrupted.'
        ]
      }
    ]
  },

  cookies: {
    title: 'Cookie Policy',
    lastUpdated: 'Draft version - pending legal review',
    intro:
      'This Cookie Policy explains how cookies and similar technologies may be used on the SocialPulse website. This is a provisional version and will be reviewed by the legal team.',
    sections: [
      {
        heading: 'What are cookies?',
        paragraphs: [
          'Cookies are small text files stored on a user device when visiting a website. They can help websites function, remember preferences and understand site usage.'
        ]
      },
      {
        heading: 'Types of cookies',
        paragraphs: [
          'The website may use strictly necessary cookies required for basic functionality. Analytics or marketing cookies should only be enabled once the final tools and consent mechanism are confirmed.'
        ]
      },
      {
        heading: 'Managing cookies',
        paragraphs: [
          'Users can manage or block cookies through their browser settings. If non-essential cookies are used, a cookie consent solution should be implemented.'
        ]
      },
      {
        heading: 'Pending confirmation',
        paragraphs: [
          'This section should be updated after confirming whether the website uses Google Analytics, Microsoft Clarity, Meta Pixel, Vercel Analytics or any other tracking tool.'
        ]
      }
    ]
  },

  gdpr: {
    title: 'GDPR',
    lastUpdated: 'Draft version - pending legal review',
    intro:
      'This page summarizes provisional GDPR-related information for users located in the European Economic Area. This is a draft and will be reviewed by the legal team.',
    sections: [
      {
        heading: 'Legal basis',
        paragraphs: [
          'Depending on the context, data may be processed based on user consent, legitimate interest or pre-contractual communication. The final legal basis should be confirmed during legal review.'
        ]
      },
      {
        heading: 'Data subject rights',
        paragraphs: [
          'Users may have the right to access, correct, delete, restrict, object to processing or request portability of their personal data.'
        ]
      },
      {
        heading: 'International transfers',
        paragraphs: [
          'If personal data is stored or processed outside the European Economic Area, appropriate safeguards should be identified and documented.'
        ]
      },
      {
        heading: 'Contact',
        paragraphs: [
          'The final privacy contact email is pending confirmation. Provisional contact: contact@socialpulse.es.'
        ]
      }
    ]
  }
} satisfies Record<string, LegalPageContent>;

export const legalPagesEs = {
  privacy: {
    title: 'Política de privacidad',
    lastUpdated: 'Versión provisional pendiente de revisión legal',
    intro:
      'Esta Política de privacidad explica cómo SocialPulse puede recopilar, utilizar y proteger los datos personales enviados a través de este sitio web. Es una versión provisional que será revisada por el equipo legal.',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        paragraphs: [
          'Los datos del responsable del tratamiento están pendientes de confirmación. Esta sección deberá incluir la denominación legal de la empresa, su domicilio social y el correo electrónico de contacto en materia de privacidad.'
        ]
      },
      {
        heading: 'Datos que recopilamos',
        paragraphs: [
          'Podemos recopilar los datos personales enviados mediante los formularios del sitio web, como nombre, apellidos, correo electrónico, teléfono, organización, cargo y contenido del mensaje.'
        ]
      },
      {
        heading: 'Finalidad del tratamiento',
        paragraphs: [
          'La información podrá utilizarse para responder a solicitudes de acceso, consultas de inversores o prensa, interés por el producto y otras comunicaciones relacionadas con SocialPulse.'
        ]
      },
      {
        heading: 'Conservación de los datos',
        paragraphs: [
          'Los datos personales se conservarán únicamente durante el tiempo necesario para las finalidades descritas, salvo que la legislación exija un periodo de conservación superior.'
        ]
      },
      {
        heading: 'Derechos de las personas usuarias',
        paragraphs: [
          'Las personas usuarias podrán solicitar el acceso, rectificación, supresión, limitación, oposición o portabilidad de sus datos personales. El correo electrónico legal definitivo está pendiente de confirmación.'
        ]
      }
    ]
  },

  terms: {
    title: 'Términos y condiciones',
    lastUpdated: 'Versión provisional pendiente de revisión legal',
    intro:
      'Estos Términos y condiciones establecen las reglas básicas para utilizar el sitio web de SocialPulse. Es una versión provisional que será revisada por el equipo legal.',
    sections: [
      {
        heading: 'Uso del sitio web',
        paragraphs: [
          'Las personas usuarias se comprometen a utilizar este sitio web de forma legal y a no interferir en su funcionamiento, seguridad o disponibilidad.'
        ]
      },
      {
        heading: 'Contenido del sitio web',
        paragraphs: [
          'El contenido de este sitio web se ofrece con fines informativos generales y puede cambiar a medida que evolucione el producto SocialPulse.'
        ]
      },
      {
        heading: 'Propiedad intelectual',
        paragraphs: [
          'Todas las marcas, elementos de identidad, diseños, textos, gráficos y demás materiales relacionados con SocialPulse continúan siendo propiedad de sus respectivos titulares.'
        ]
      },
      {
        heading: 'Limitación de responsabilidad',
        paragraphs: [
          'SocialPulse no garantiza que el sitio web esté siempre disponible, libre de errores o sin interrupciones.'
        ]
      }
    ]
  },

  cookies: {
    title: 'Política de cookies',
    lastUpdated: 'Versión provisional pendiente de revisión legal',
    intro:
      'Esta Política de cookies explica cómo pueden utilizarse cookies y tecnologías similares en el sitio web de SocialPulse. Es una versión provisional que será revisada por el equipo legal.',
    sections: [
      {
        heading: '¿Qué son las cookies?',
        paragraphs: [
          'Las cookies son pequeños archivos de texto que se almacenan en el dispositivo de una persona al visitar un sitio web. Pueden ayudar al funcionamiento de la web, recordar preferencias y comprender cómo se utiliza el sitio.'
        ]
      },
      {
        heading: 'Tipos de cookies',
        paragraphs: [
          'El sitio web puede utilizar cookies estrictamente necesarias para sus funciones básicas. Las cookies analíticas o publicitarias solo deberán activarse cuando se hayan confirmado las herramientas definitivas y el mecanismo de consentimiento.'
        ]
      },
      {
        heading: 'Gestión de cookies',
        paragraphs: [
          'Las personas usuarias pueden gestionar o bloquear las cookies desde la configuración de su navegador. Si se utilizan cookies no esenciales, deberá implementarse una solución para recabar el consentimiento.'
        ]
      },
      {
        heading: 'Pendiente de confirmación',
        paragraphs: [
          'Esta sección deberá actualizarse cuando se confirme si el sitio utiliza Google Analytics, Microsoft Clarity, Meta Pixel, Vercel Analytics u otra herramienta de seguimiento.'
        ]
      }
    ]
  },

  gdpr: {
    title: 'RGPD',
    lastUpdated: 'Versión provisional pendiente de revisión legal',
    intro:
      'Esta página resume información provisional relacionada con el RGPD para personas usuarias ubicadas en el Espacio Económico Europeo. Es un borrador que será revisado por el equipo legal.',
    sections: [
      {
        heading: 'Base jurídica',
        paragraphs: [
          'Según el contexto, los datos podrán tratarse con base en el consentimiento de la persona usuaria, el interés legítimo o una comunicación precontractual. La base jurídica definitiva deberá confirmarse durante la revisión legal.'
        ]
      },
      {
        heading: 'Derechos de las personas interesadas',
        paragraphs: [
          'Las personas usuarias pueden tener derecho a acceder, rectificar, suprimir, limitar u oponerse al tratamiento de sus datos personales, así como a solicitar su portabilidad.'
        ]
      },
      {
        heading: 'Transferencias internacionales',
        paragraphs: [
          'Si los datos personales se almacenan o tratan fuera del Espacio Económico Europeo, deberán identificarse y documentarse las garantías adecuadas.'
        ]
      },
      {
        heading: 'Contacto',
        paragraphs: [
          'El correo electrónico definitivo de privacidad está pendiente de confirmación. Contacto provisional: contact@socialpulse.es.'
        ]
      }
    ]
  }
} satisfies Record<string, LegalPageContent>;
