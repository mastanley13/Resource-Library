"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PrivacyPolicy() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(
      ".content-section",
      { 
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".content-section",
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          Privacy Policy
        </h1>
        
        <div className="space-y-8">
          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Introduction</h2>
            <p className="text-gray-300 mb-4">
              At Strategix AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Fill out forms on our website</li>
              <li>Sign up for our newsletter</li>
              <li>Request a consultation</li>
              <li>Contact us via email or our contact form</li>
            </ul>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send you marketing and promotional communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Data Security</h2>
            <p className="text-gray-300 mb-4">
              At Strategix AI, security is our top priority. We employ industry-leading security measures including:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>End-to-end encryption for all data transmissions</li>
              <li>Regular security audits and penetration testing</li>
              <li>Multi-factor authentication and access controls</li>
              <li>Compliance with industry security standards</li>
              <li>Continuous monitoring and threat detection</li>
            </ul>
            <p className="text-gray-300 mt-4">
              Our veteran-led team brings military-grade security practices to protect your data and maintain the confidentiality of all client information.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Third-Party Services</h2>
            <p className="text-gray-300 mb-4">
              We may use third-party service providers to help us operate our website and services. These providers have access to your information only to perform specific tasks on our behalf and are obligated to protect your information.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Your Rights</h2>
            <p className="text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="text-gray-300">
              Email: support@strategixai.co
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Updates to This Policy</h2>
            <p className="text-gray-300 mb-4">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.
            </p>
            <p className="text-gray-300">
              Last Updated: June 30, 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 