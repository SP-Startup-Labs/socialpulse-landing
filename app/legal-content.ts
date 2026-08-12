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