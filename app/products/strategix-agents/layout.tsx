import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StrategixAgents | Strategix AI - Voice & Text CRM Control',
  description: 'Control your CRM with natural language. 269+ functions accessible via voice or text commands. Mobile apps coming soon.',
  keywords: [
    'CRM automation',
    'Strategix AI agent',
    'CRM voice control',
    'Strategix MCP',
    'AI CRM assistant',
    'CRM integration',
    'business automation',
    'voice-controlled CRM'
  ],
  openGraph: {
    title: 'StrategixAgents - Complete CRM Control',
    description: 'Transform your workflow with AI. Voice + text control, 269+ functions, mobile apps coming soon.',
    type: 'website',
    url: 'https://strategixai.com/products/strategix-agents',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StrategixAgents - Complete CRM Control',
    description: 'Transform your workflow with AI. Voice + text control, 269+ functions, mobile apps coming soon.',
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