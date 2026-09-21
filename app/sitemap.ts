import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://socialpulse.es';
  const routes = [
    '',
    '/es',
    '/login',
    '/es/login',
    '/privacy-policy',
    '/es/privacy-policy',
    '/terms-and-conditions',
    '/es/terms-and-conditions',
    '/cookie-policy',
    '/es/cookie-policy',
    '/gdpr',
    '/es/gdpr',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/es' ? 'weekly' : 'monthly',
    priority: route === '' || route === '/es' ? 1 : 0.5,
  }));
}
