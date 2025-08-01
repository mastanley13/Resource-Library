import { NextRequest, NextResponse } from 'next/server';

// Set edge runtime for better performance
export const runtime = 'edge';

// Form validation 
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message?: string;
}

function validateFormData(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  
  if (!data) {
    return { valid: false, errors: ['Missing form data'] };
  }
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push('Name is required');
  }
  
  if (!data.email || typeof data.email !== 'string' || data.email.trim() === '') {
    errors.push('Email is required');
  } else {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }
  
  // Optional fields validation
  if (data.company && typeof data.company !== 'string') {
    errors.push('Company must be a string');
  }
  
  if (data.message && typeof data.message !== 'string') {
    errors.push('Message must be a string');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

/**
 * POST handler for the contact form
 * Proxies submission to Go High Level form
 */
export async function POST(request: NextRequest) {
  try {
    // This endpoint is deprecated - contact form now uses mailto links
    // and consultation bookings are handled via the /consultation page
    return NextResponse.json(
      { 
        success: false, 
        message: 'Please use the consultation booking page at /consultation or email us directly at info@strategixai.co',
        redirect: '/consultation'
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { success: false, message: 'Please visit /consultation to book a call or email us at info@strategixai.co' },
      { status: 200 }
    );
  }
} 