import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://3d-gallery-mauve.vercel.app';

  // Define all routes in the application
  const routes = [
    '',
    '/about',
    '/animations',
    '/features',
    '/gallery',
    '/inspiration',
    '/models',
    '/tutorial',
  ];

  // Create sitemap entries with lastModified dates and priorities
  return routes.map(route => {
    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1 : 0.8,
    };
  });
}
