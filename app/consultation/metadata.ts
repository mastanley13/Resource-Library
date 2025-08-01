import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AI Consultation | Strategix AI - Turn Bottlenecks Into Breakthroughs',
  description: 'Book a free 30-minute Discovery Call and get a no-nonsense game plan for your top 3 operational bottlenecks. Veteran-owned AI consulting with immediate value.',
  keywords: [
    'AI consultation',
    'free discovery call',
    'business automation',
    'operational efficiency',
    'AI strategy',
    'process optimization',
    'business transformation',
    'AI consulting',
    'veteran owned',
    'strategix ai'
  ],
  authors: [{ name: 'Strategix AI' }],
  openGraph: {
    title: 'Free AI Consultation | Turn Bottlenecks Into Breakthroughs',
    description: 'Book a free 30-minute Discovery Call and get a no-nonsense game plan for your top 3 operational bottlenecks.',
    type: 'website',
    url: 'https://strategixai.co/consultation',
    siteName: 'Strategix AI',
    images: [
      {
        url: '/images/consultation-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Strategix AI - Free AI Consultation'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Consultation | Turn Bottlenecks Into Breakthroughs',
    description: 'Book a free 30-minute Discovery Call and get a no-nonsense game plan for your top 3 operational bottlenecks.',
    images: ['/images/consultation-twitter.jpg']
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
  verification: {
    google: 'your-google-verification-code',
  }
} 