import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';
  const lastModified = new Date();
  
  const routes = [
    '',
    '/about',
    '/services', 
    '/gallery',
    '/testimonials',
    '/faq',
    '/contact',
  ];

  const locales = ['en', 'hi'];
  
  const sitemap: MetadataRoute.Sitemap = [];
  
  // Add all routes for each locale
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            hi: `${baseUrl}/hi${route}`,
          },
        },
      });
    });
  });

  return sitemap;
}