import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Care Management Solutions | Strategix AI - Daycare, Boarding, Grooming & Training',
  description: 'Transform your pet care business with AI-powered management solutions. Streamline daycare operations, boarding services, grooming appointments, and training programs with comprehensive automation.',
  keywords: [
    'pet care management software',
    'veterinary practice management',
    'pet daycare software',
    'pet boarding system',
    'grooming appointment software',
    'pet training management',
    'animal care technology',
    'pet business automation',
    'veterinary software solutions',
    'pet care AI solutions'
  ],
  openGraph: {
    title: 'Pet Care Management Solutions | Strategix AI',
    description: 'AI-powered solutions for pet daycare, boarding, grooming, and training businesses. Increase efficiency, improve customer satisfaction, and grow your revenue.',
    type: 'website',
    url: 'https://strategixai.com/pet-solutions',
    images: [
      {
        url: '/og-pet-solutions.jpg',
        width: 1200,
        height: 630,
        alt: 'Strategix AI Pet Care Management Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Care Management Solutions | Strategix AI',
    description: 'Transform your pet care business with AI-powered management solutions for daycare, boarding, grooming, and training.',
    images: ['/og-pet-solutions.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}; 