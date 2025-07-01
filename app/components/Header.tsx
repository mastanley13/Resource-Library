'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto py-3 md:py-4 px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold">
            <Link href="/" className="text-white font-bold text-glow-neural" onClick={closeMobileMenu}>
              Strategix<span className="text-cyan-400">AI</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link href="/products/strategix-agents" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">
              StrategixAgents
            </Link>
            <Link href="/consultation" className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full hover:scale-105 transition-all duration-300 font-bold btn-neural consciousness-pulse">
              Book Consultation
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg glass-effect focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 text-cyan-400 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <nav className="pt-4 pb-2 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all duration-300 font-medium"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              href="/products/strategix-agents" 
              className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all duration-300 font-medium"
              onClick={closeMobileMenu}
            >
              StrategixAgents
            </Link>
            <Link 
              href="/consultation" 
              className="block mx-4 mt-4 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full text-center font-bold btn-neural consciousness-pulse hover:scale-105 transition-all duration-300"
              onClick={closeMobileMenu}
            >
              Book Consultation
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 