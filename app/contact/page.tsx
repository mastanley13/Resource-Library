'use client';

import { useState } from 'react';

// Form state type
interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

// Form submission result
interface SubmissionResult {
  success: boolean;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email) {
      setResult({
        success: false,
        message: 'Please fill in your name and email.'
      });
      return;
    }
    
    // For consultation booking, redirect to consultation page
    if (window.location.href.includes('book') || formData.message.toLowerCase().includes('call') || formData.message.toLowerCase().includes('consultation')) {
      window.location.href = '/consultation';
      return;
    }
    
    setIsSubmitting(true);
    setResult(null);
    
    try {
      // Simple email mailto link for general inquiries
      const emailSubject = encodeURIComponent(`Contact from ${formData.name} - ${formData.company || 'Website'}`);
      const emailBody = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}

Message:
${formData.message || 'No message provided'}
      `);
      
      const mailtoLink = `mailto:info@strategixai.co?subject=${emailSubject}&body=${emailBody}`;
      
      // Try to open email client
      window.location.href = mailtoLink;
      
      // Show success message
      setResult({
        success: true,
        message: 'Your email client should open with your message. If not, please email us directly at info@strategixai.co'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      
    } catch (error) {
      setResult({
        success: false,
        message: 'Please email us directly at info@strategixai.co or use the consultation booking page.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <div className="container mx-auto p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-6">
              Ready to book a consultation? Use the button below to schedule your free Discovery Call.
              <br />
              For other inquiries, fill out the form and we'll get back to you via email.
            </p>
            
            {/* Primary CTA for Consultation */}
            <div className="mb-8">
              <a
                href="/consultation"
                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                🗓️ Book Your Free 30-Minute Discovery Call
              </a>
              <p className="text-sm text-gray-500 mt-2">No commitment • Immediate value • 90-day roadmap</p>
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold mb-4">Other Inquiries</h2>
              <p className="text-gray-600 mb-6">Have questions or need general information? Send us a message below.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            {result && (
              <div className={`p-4 mb-6 rounded-lg ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p>{result.message}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  What's your biggest operational challenge?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about your challenges"
                ></textarea>
              </div>
              
              <div className="space-y-4">
                <a
                  href="/consultation"
                  className="w-full py-3 px-6 text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-md font-medium hover:scale-105 transition-all duration-300 text-center block"
                >
                  Book My Free Consultation Call
                </a>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 text-white bg-blue-600 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending Email...' : 'Send Email Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Email Us</h3>
            <p className="text-gray-600">
              For general inquiries: <a href="mailto:info@strategixai.co" className="text-blue-600 hover:underline">info@strategixai.co</a>
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Call Us</h3>
            <p className="text-gray-600">
              Call our team: <a href="tel:+12524182428" className="text-blue-600 hover:underline">(252) 418-2428</a>
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to reclaim your hours?</h2>
              <p className="text-xl text-gray-300 mb-8">Book a free 30-minute Discovery Call and walk away with a no-nonsense game-plan for your top three bottlenecks—on us.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/consultation"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-md font-medium hover:scale-105 transition-all duration-300"
                >
                  Book Free Consultation
                </a>
                <a 
                  href="mailto:info@strategixai.co"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border-transparent rounded-md"
                >
                  Email
                </a>
                <a 
                  href="https://linkedin.com/company/strategix-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border-transparent rounded-md"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 