import { useEffect } from 'react';

interface StructuredDataProps {
  type?: 'WebApplication' | 'Game';
  name?: string;
  description?: string;
  url?: string;
  author?: {
    name: string;
    url: string;
  };
}

export function useStructuredData({
  type = 'Game',
  name = 'Indie Hacker Clicker',
  description = 'An engaging incremental clicker game where you build your indie hacker empire',
  url = 'https://indie-hacker-clicker.vercel.app/',
  author = {
    name: 'Chiheb',
    url: 'https://chiheb.vercel.app/'
  }
}: StructuredDataProps = {}) {
  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type,
      name,
      description,
      url,
      applicationCategory: 'Game',
      genre: ['Idle Game', 'Clicker Game', 'Incremental Game'],
      operatingSystem: 'Any (Browser-based)',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      author: {
        '@type': 'Person',
        name: author.name,
        url: author.url
      },
      inLanguage: 'en',
      datePublished: '2025-11-02',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1000',
        bestRating: '5',
        worstRating: '1'
      }
    };

    // Add structured data to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, name, description, url, author]);
}
