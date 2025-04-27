'use client';

import { usePathname } from 'next/navigation';

export default function JsonLd() {
  const pathname = usePathname();
  const baseUrl = 'https://3d-gallery-mauve.vercel.app';
  const currentUrl = `${baseUrl}${pathname}`;
  
  // Base organization data
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '3D Gallery',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/3dgallery',
      'https://facebook.com/3dgallery',
      'https://instagram.com/3dgallery'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-123-456-7890',
      contactType: 'customer service',
      email: 'support@3dgallery.com'
    }
  };

  // Website data
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '3D Gallery',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  // Page-specific data
  let pageSpecificData = {};
  
  // Home page
  if (pathname === '/') {
    pageSpecificData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: '3D Gallery | Immersive Interactive 3D Showcase Platform',
      description: 'Create and explore stunning 3D galleries with our immersive platform. Perfect for artists, photographers, museums, and businesses.',
      url: currentUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: '3D Gallery',
        url: baseUrl
      }
    };
  }
  
  // About page
  else if (pathname === '/about') {
    pageSpecificData = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About 3D Gallery',
      description: 'Learn about our mission, team, and the technology behind our 3D Gallery platform.',
      url: currentUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: '3D Gallery',
        url: baseUrl
      }
    };
  }
  
  // Gallery page
  else if (pathname === '/gallery') {
    pageSpecificData = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: '3D Gallery Showcase',
      description: 'Browse our collection of stunning 3D artwork and visualizations.',
      url: currentUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: '3D Gallery',
        url: baseUrl
      }
    };
  }
  
  // Default for other pages
  else {
    pageSpecificData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: '3D Gallery',
      url: currentUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: '3D Gallery',
        url: baseUrl
      }
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSpecificData) }}
      />
    </>
  );
}
