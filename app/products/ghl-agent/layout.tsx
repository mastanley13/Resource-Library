import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GoHighLevel MCP AI Agent | Strategix AI - Voice & Text CRM Control',
  description: 'Control your GoHighLevel CRM with natural language. 269+ GHL functions accessible via voice or text commands. Mobile apps coming soon.',
  keywords: [
    'GoHighLevel automation',
    'GHL AI agent',
    'CRM voice control',
    'GoHighLevel MCP',
    'AI CRM assistant',
    'GoHighLevel integration',
    'business automation',
    'voice-controlled CRM'
  ],
  openGraph: {
    title: 'GoHighLevel MCP AI Agent - Complete CRM Control',
    description: 'Transform your GoHighLevel workflow with AI. Voice + text control, 269+ functions, mobile apps coming soon.',
    type: 'website',
    url: 'https://strategixai.com/products/ghl-agent',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoHighLevel MCP AI Agent - Complete CRM Control',
    description: 'Transform your GoHighLevel workflow with AI. Voice + text control, 269+ functions, mobile apps coming soon.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GHLAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 