import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Strategix AI - AI Consulting, Automation & Training',
  description: 'AI-powered strategies for modern business growth and optimization.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
          <div className="container mx-auto py-3 md:py-4 px-4 md:px-6">
            <div className="flex justify-between items-center">
              <div className="text-xl md:text-2xl font-bold">
                <Link href="/" className="text-white font-bold text-glow-neural">
                  Strategix<span className="text-cyan-400">AI</span>
                </Link>
              </div>
              <nav className="hidden md:flex space-x-6 lg:space-x-8">
                <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">Home</Link>
                <Link href="/solutions" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">Solutions</Link>
                <Link href="/process" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">Process</Link>
                <Link href="/results" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">Results</Link>
                <Link href="/team" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">Team</Link>
                <Link href="/contact" className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full hover:scale-105 transition-all duration-300 font-bold btn-neural consciousness-pulse">
                  Book Call
                </Link>
              </nav>
              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 rounded-lg glass-effect">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        
        <main className="min-h-screen pt-16 md:pt-20">
          {children}
        </main>
        
        <footer className="relative glass-effect border-t border-white/10 text-gray-300 py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
              <div className="mb-6 md:mb-0">
                <Link href="/" className="text-white font-bold text-xl md:text-2xl text-glow-neural">
                  Strategix<span className="text-cyan-400">AI</span>
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-end">
                <Link href="/" className="hover:text-cyan-400 transition-colors duration-300 text-sm md:text-base">Home</Link>
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors duration-300 text-sm md:text-base">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors duration-300 text-sm md:text-base">Terms</Link>
                <Link href="/accessibility" className="hover:text-cyan-400 transition-colors duration-300 text-sm md:text-base">Accessibility</Link>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <div className="mb-4 md:mb-0">
                <p className="text-xs md:text-sm text-gray-400">&copy; {new Date().getFullYear()} Strategix AI, LLC · New Bern, NC – Veteran-Owned · U.S.-Based · Security-First</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 consciousness-pulse" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 consciousness-pulse" aria-label="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 