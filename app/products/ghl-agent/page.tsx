"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EvolvedScene from "../../../components/EvolvedScene";
import LoadingScreen from "../../../components/LoadingScreen";



interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: "🧠",
    title: "Complete GoHighLevel Control",
    description: "Access 269+ GHL functions via natural language. Say it or type it — it just works.",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    icon: "🎙️",
    title: "Voice & Text Interface",
    description: "Control your CRM using voice or text. Works just like ChatGPT for GHL.",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: "📱",
    title: "Mobile Apps (Coming Soon)",
    description: "Strategix MCP coming to iOS and Android. Manage business on the go.",
    gradient: "from-green-500 to-teal-600"
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    description: "Instant campaign, conversion, and revenue reports across your CRM.",
    gradient: "from-orange-500 to-red-600"
  },
  {
    icon: "🔐",
    title: "Enterprise-Grade Security",
    description: "Bank-level encryption to protect your business and customer data.",
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    icon: "🧭",
    title: "Natural Language Control",
    description: "No commands needed. Just speak or type — no technical skills required.",
    gradient: "from-teal-500 to-cyan-600"
  }
];

const whyChooseFeatures = [
  {
    title: "269 GHL Functions",
    description: "Every GoHighLevel feature accessible through natural language commands",
    icon: "🔧"
  },
  {
    title: "Voice & Text Interface",
    description: "Control your CRM by typing or speaking - works exactly like ChatGPT",
    icon: "💬"
  },
  {
    title: "Native Mobile Apps",
    description: "Available on Apple and Android - manage your business anywhere",
    icon: "📲"
  },
  {
    title: "Real-time Analytics",
    description: "Get instant reports on campaigns, conversions, and revenue metrics",
    icon: "📈"
  }
];

export default function GHLAgentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      gsap.registerPlugin(ScrollTrigger);
      
      // No hero animations - text appears immediately

      // Animate feature cards
      features.forEach((feature, index) => {
        gsap.fromTo(`#feature-${index}`, 
          { 
            opacity: 0,
            y: 100,
            scale: 0.8
          },
          {
            scrollTrigger: {
              trigger: `#feature-${index}`,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
              onEnter: () => setCurrentFeature(index),
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
          }
        );
      });

      // Why Choose section animation
      gsap.fromTo("#why-choose", 
        { 
          opacity: 0,
          y: 50
        },
        {
          scrollTrigger: {
            trigger: "#why-choose",
            start: "top 90%",
            end: "top 60%",
            scrub: false,
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }
      );

      // Final CTA animation
      gsap.fromTo("#final-cta", 
        { 
          opacity: 0,
          scale: 0.8,
          y: 100
        },
        {
          scrollTrigger: {
            trigger: "#final-cta",
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
        }
      );
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative w-full bg-black">
        {/* Fixed 3D Canvas Background */}
        <div className="fixed inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <EvolvedScene />
          </Canvas>
        </div>

        {/* Content Overlays */}
        <div className="relative z-10 overflow-hidden">
          
          {/* Hero Section */}
          <section className="h-screen flex flex-col items-center justify-center text-center px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 leading-tight mb-6 md:mb-8 text-glow-neural"
              >
                GoHighLevel
                <br />
                <span className="text-white text-glow-cyan">MCP AI Agent</span>
              </h1>
              <p 
                className="text-lg md:text-2xl lg:text-3xl text-gray-300 font-light mb-8 md:mb-12 max-w-4xl leading-relaxed"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 font-medium text-glow-cyan">
                  269+ GHL Functions
                </span>
                <br />
                Full Control · Voice + Text · Coming Soon to Mobile
              </p>
              
              {/* Coming Soon Badge */}
              <div className="mb-8 md:mb-12">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 consciousness-pulse">
                  <span className="text-cyan-400 font-semibold">Download on Mobile: COMING SOON!</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="#waitlist"
                className="group relative px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 btn-neural consciousness-pulse inline-block"
              >
                <span className="relative z-10 text-glow">Join The Waitlist To Get Early Access →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </a>
            </div>
          </section>

          {/* Features Grid Section */}
          <section className="min-h-screen py-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 text-glow-neural">
                  Complete GoHighLevel
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 text-glow-cyan">
                    Control
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  Every GoHighLevel feature accessible through natural language commands
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    id={`feature-${index}`}
                    className="group glass-effect p-8 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 breathing"
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl consciousness-pulse`}>
                        {feature.icon}
                      </div>
                      <h3 className={`text-xl md:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient} text-glow-cyan`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Section */}
          <section id="why-choose" className="min-h-screen py-20 px-4 md:px-6 relative z-20 evolving-background">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 text-glow-neural">
                  Why Choose Our
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 text-glow-cyan">
                    HighLevel AI Agent?
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  Built specifically for GoHighLevel users who want to maximize their efficiency and scale their operations.
                </p>
              </div>

              {/* Why Choose Features */}
              <div className="space-y-8">
                {whyChooseFeatures.map((item, index) => (
                  <div key={index} className="flex items-center p-6 glass-effect rounded-xl border border-white/10 group hover:border-cyan-400/30 transition-all duration-300">
                    <div className="text-4xl mr-6 consciousness-pulse">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-2 text-glow-cyan">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile App Preview */}
              <div className="mt-16 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-glow-neural">
                  Download on Mobile: COMING SOON!
                </h3>
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                  <div className="flex items-center p-4 glass-effect rounded-xl border border-white/10 opacity-50">
                    <div className="w-8 h-8 mr-3">
                      📱
                    </div>
                    <div>
                      <div className="font-medium text-gray-400">Download on the</div>
                      <div className="text-white font-bold">App Store</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 glass-effect rounded-xl border border-white/10 opacity-50">
                    <div className="w-8 h-8 mr-3">
                      📱
                    </div>
                    <div>
                      <div className="font-medium text-gray-400">Get it on</div>
                      <div className="text-white font-bold">Google Play</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 glass-effect rounded-xl border border-white/10 opacity-50">
                    <div className="w-8 h-8 mr-3">
                      🌐
                    </div>
                    <div>
                      <div className="font-medium text-gray-400">Available in</div>
                      <div className="text-white font-bold">GHL Marketplace</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Instant Results Section */}
          <section className="min-h-screen py-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-3xl consciousness-pulse">
                  📈
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 text-glow-neural">
                  Instant Results
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                  Execute complex workflows in seconds. What used to take hours now happens with a simple voice command.
                </p>
              </div>

              {/* Before/After Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Before */}
                <div className="glass-effect p-8 rounded-2xl border border-red-500/30">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-2xl">
                      ⏰
                    </div>
                    <h3 className="text-2xl font-bold text-red-400 mb-2">Before: Manual Process</h3>
                    <p className="text-gray-400">Traditional GoHighLevel workflow</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                      <span className="text-gray-300">Create new opportunity</span>
                      <span className="text-red-400 font-semibold">5-10 mins</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                      <span className="text-gray-300">Add to pipeline</span>
                      <span className="text-red-400 font-semibold">2-3 mins</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                      <span className="text-gray-300">Trigger workflows</span>
                      <span className="text-red-400 font-semibold">3-5 mins</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                      <span className="text-gray-300">Schedule follow-up</span>
                      <span className="text-red-400 font-semibold">2-4 mins</span>
                    </div>
                    <div className="border-t border-red-500/30 pt-4 mt-4">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-white">Total Time:</span>
                        <span className="text-red-400 text-xl">12-22 minutes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="glass-effect p-8 rounded-2xl border border-green-500/30">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 flex items-center justify-center text-2xl consciousness-pulse">
                      ⚡
                    </div>
                    <h3 className="text-2xl font-bold text-green-400 mb-2">After: MCP AI Agent</h3>
                    <p className="text-gray-400">Voice command workflow</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                      <span className="text-gray-300">Create new opportunity</span>
                      <span className="text-green-400 font-semibold">Instant</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                      <span className="text-gray-300">Add to pipeline</span>
                      <span className="text-green-400 font-semibold">Instant</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                      <span className="text-gray-300">Trigger workflows</span>
                      <span className="text-green-400 font-semibold">Instant</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                      <span className="text-gray-300">Schedule follow-up</span>
                      <span className="text-green-400 font-semibold">Instant</span>
                    </div>
                    <div className="border-t border-green-500/30 pt-4 mt-4">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-white">Total Time:</span>
                        <span className="text-green-400 text-xl">15 seconds</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voice Command Examples */}
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 text-glow-neural">
                  Just Say It, And It's Done
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-lg consciousness-pulse">
                        🎤
                      </div>
                      <div className="flex-1">
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-3">
                          <p className="text-cyan-400 font-medium">"Create a new opportunity for John Smith, add to the new leads pipeline, trigger the welcome workflow and add an onboarding appointment tomorrow."</p>
                        </div>
                        <div className="flex items-center text-green-400 text-sm">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                          Task completed successfully!
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg consciousness-pulse">
                        💬
                      </div>
                      <div className="flex-1">
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-3">
                          <p className="text-purple-400 font-medium">"Show me all campaigns from last month with conversion rates above 15% and total revenue generated."</p>
                        </div>
                        <div className="flex items-center text-green-400 text-sm">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                          Report generated in 3 seconds!
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-lg consciousness-pulse">
                        📊
                      </div>
                      <div className="flex-1">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-3">
                          <p className="text-green-400 font-medium">"Send a follow-up text to all leads who haven't responded in 3 days using the reactivation sequence."</p>
                        </div>
                        <div className="flex items-center text-green-400 text-sm">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                          147 messages queued and sent!
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-lg consciousness-pulse">
                        🎯
                      </div>
                      <div className="flex-1">
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mb-3">
                          <p className="text-orange-400 font-medium">"Update all hot leads to high priority, assign them to Sarah, and schedule calls for next week."</p>
                        </div>
                        <div className="flex items-center text-green-400 text-sm">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                          23 leads updated and calls scheduled!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection Message */}
                <div className="mt-16 text-center">
                  <div className="max-w-3xl mx-auto">
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                      Stay connected to your business from anywhere. Whether you're in meetings, traveling, or away from your desk, 
                      your GoHighLevel CRM responds instantly to your voice. 
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 font-semibold text-glow-cyan">
                        {" "}Reclaim your time and never miss an opportunity again.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section id="final-cta" className="h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 consciousness-bg relative">
            <div className="max-w-4xl mx-auto breathing">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 text-glow-neural">
                Ready to Transform
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 text-glow-cyan">
                  Your Business?
                </span>
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 md:mb-12">
                Join thousands of businesses already using AI to automate their operations and scale faster than ever.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                <a
                  id="waitlist"
                  href="/contact"
                  className="group relative px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 btn-neural consciousness-pulse"
                >
                  <span className="relative z-10 text-glow">Get Early Access Now →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </a>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full consciousness-pulse"></div>
                  <span>Natural Language Control</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full consciousness-pulse"></div>
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full consciousness-pulse"></div>
                  <span>Bank-level Encryption</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
} 