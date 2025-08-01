"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Terms() {
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
          Terms of Service
        </h1>
        
        <div className="space-y-8">
          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Agreement to Terms</h2>
            <p className="text-gray-300 mb-4">
              By accessing or using Strategix AI's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Services Description</h2>
            <p className="text-gray-300 mb-4">
              Strategix AI provides AI consulting and implementation services, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>AI strategy development and consulting</li>
              <li>Custom AI solution implementation</li>
              <li>AI integration services</li>
              <li>Technical support and maintenance</li>
              <li>Training and documentation</li>
            </ul>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Intellectual Property</h2>
            <p className="text-gray-300 mb-4">
              The content, features, and functionality of our website and services are owned by Strategix AI and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">User Responsibilities</h2>
            <p className="text-gray-300 mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Use our services in compliance with applicable laws</li>
              <li>Not engage in any unauthorized use of our services</li>
              <li>Not interfere with or disrupt our services</li>
            </ul>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Payment Terms</h2>
            <p className="text-gray-300 mb-4">
              Payment terms will be specified in individual service agreements. All fees are non-refundable unless explicitly stated otherwise in the service agreement or required by law.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Limitation of Liability</h2>
            <p className="text-gray-300 mb-4">
              Strategix AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Confidentiality</h2>
            <p className="text-gray-300 mb-4">
              We maintain strict confidentiality of all client information and project details. Detailed confidentiality terms will be specified in individual service agreements.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Termination</h2>
            <p className="text-gray-300 mb-4">
              We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any breach of these Terms of Service.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Changes to Terms</h2>
            <p className="text-gray-300 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our website.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Contact Information</h2>
            <p className="text-gray-300 mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-300">
              Email: support@strategixai.co
            </p>
            <p className="text-gray-300 mt-4">
              Last Updated: June 30, 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 