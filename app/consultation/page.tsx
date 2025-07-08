"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EvolvedScene from "../../components/EvolvedScene";
import LoadingScreen from "../../components/LoadingScreen";

interface ConsultationBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
  gradient: string;
  value: string;
}

const consultationBenefits: ConsultationBenefit[] = [
  {
    id: "analysis",
    icon: "🔍",
    title: "Deep-Dive Analysis",
    description: "We identify your top 3 operational bottlenecks and map out exactly how AI can solve them.",
    gradient: "from-cyan-500 to-blue-600",
    value: "Save 10-15 hours per week"
  },
  {
    id: "strategy",
    icon: "📋",
    title: "Playbook & Plan of Action",
    description: "Walk away with a clear roadmap, timeline, and budget to transform your operations.",
    gradient: "from-purple-500 to-pink-600",
    value: "Worth $5,000 value"
  },
  {
    id: "prototype",
    icon: "🛠️",
    title: "Preview Prototype",
    description: "See exactly how your solution will work with a design prototype after the call per request. This will allow you to preview exactly how the solution fits your company operations.",
    gradient: "from-orange-500 to-red-600",
    value: "Custom design available"
  }
];



export default function ConsultationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentBenefit, setCurrentBenefit] = useState(0);
  
  // Clean component without testimonials

  useEffect(() => {
    if (!isLoading) {
      gsap.registerPlugin(ScrollTrigger);
      
      // No hero animations - text appears immediately

      // Animate benefit cards
      consultationBenefits.forEach((benefit, index) => {
        gsap.fromTo(`#benefit-${benefit.id}`, 
          { 
            opacity: 0,
            y: 100,
            scale: 0.8
          },
          {
            scrollTrigger: {
              trigger: `#benefit-${benefit.id}`,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
              onEnter: () => setCurrentBenefit(index),
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
          }
        );
      });

      // Booking widget animation
      gsap.fromTo("#booking-widget", 
        { 
          opacity: 0,
          scale: 0.8,
          y: 100
        },
        {
          scrollTrigger: {
            trigger: "#booking-widget",
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
              className="text-4xl md:text-6xl lg:text-8xl font-black text-white text-glow-cyan leading-none mb-6 md:mb-8"
            >
              BOOK A
              <br />
              CONSULTATION
            </h1>
            <p 
              className="text-lg md:text-2xl lg:text-3xl text-gray-300 font-light mb-8 md:mb-12 max-w-4xl leading-relaxed"
            >
              Walk away with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 font-medium text-glow-cyan">no-nonsense game plan</span>
              <br />
              for your business
            </p>
            
            {/* Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl">
              <div className="glass-effect p-4 rounded-lg border border-cyan-400/30">
                <div className="text-cyan-400 font-bold text-sm">✓ FREE CONSULTATION</div>
                <div className="text-white text-xs">No sales pitch</div>
              </div>
              <div className="glass-effect p-4 rounded-lg border border-purple-400/30">
                <div className="text-purple-400 font-bold text-sm">✓ IMMEDIATE VALUE</div>
                <div className="text-white text-xs">Actionable insights</div>
              </div>
              <div className="glass-effect p-4 rounded-lg border border-green-400/30">
                <div className="text-green-400 font-bold text-sm">✓ TAILORED ROADMAP</div>
                <div className="text-white text-xs">Clear next steps</div>
              </div>
            </div>

            {/* Primary CTA */}
            <a
              href="#booking-widget"
              className="group relative px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 btn-neural consciousness-pulse inline-block mb-6"
            >
              <span className="relative z-10 text-glow">Book Your Free Discovery Call →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </a>
            
            <p className="text-sm text-gray-400">
              No commitment • Veteran-owned • Security-first
            </p>
          </div>
        </section>

        {/* What You'll Get Section */}
        <section className="min-h-screen py-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 text-glow-neural">
                What You'll Get
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 text-glow-cyan">
                  In Your Consultation
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                This isn't a sales call. It's a strategic session designed to deliver immediate value.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {consultationBenefits.map((benefit, index) => (
                <div 
                  key={benefit.id}
                  id={`benefit-${benefit.id}`}
                  className="group glass-effect p-8 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 breathing"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${benefit.gradient} flex items-center justify-center text-2xl consciousness-pulse`}>
                      {benefit.icon}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${benefit.gradient} text-glow-cyan`}>
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {benefit.description}
                    </p>
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <span className="text-white font-semibold text-sm">{benefit.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Process Preview */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-glow-neural">
                Our "Consult First, Build Second" Process
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">1</div>
                  <span className="text-gray-300">Identify bottlenecks</span>
                </div>
                <div className="hidden md:block text-gray-500">→</div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">2</div>
                  <span className="text-gray-300">Design solution</span>
                </div>
                <div className="hidden md:block text-gray-500">→</div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">3</div>
                  <span className="text-gray-300">Deliver results</span>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Booking Widget Section */}
        <section id="booking-widget" className="min-h-screen py-20 px-4 md:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 text-glow-neural">
                Ready to
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 text-glow-cyan">
                  Transform Your Business?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Book your free Discovery Call now. No commitment, no sales pitch—just actionable insights you can implement immediately.
              </p>
            </div>

            {/* Booking Widget Container */}
            <div className="max-w-4xl mx-auto">
              <div className="glass-effect p-8 rounded-2xl border border-cyan-400/30 consciousness-pulse">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Schedule Your Discovery Call</h3>
                  <p className="text-gray-300">Choose a time that works best for you</p>
                </div>
                
                {/* Booking Widget Iframe */}
                <div className="booking-iframe-container w-full h-[1250px] sm:h-[1200px] md:h-[1100px] lg:h-[1150px] xl:h-[1200px] rounded-lg overflow-hidden border border-white/10 relative">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/4CbKPiR94XGRIlGtarcU"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="w-full h-full border-none outline-none"
                    title="Book Your Discovery Call"
                    style={{
                      minHeight: '1100px',
                      touchAction: 'auto',
                      overflow: 'hidden',
                      WebkitOverflowScrolling: 'touch',
                      border: 'none',
                      outline: 'none'
                    }}
                    allow="fullscreen"
                    loading="lazy"
                    scrolling="no"
                  />
                </div>
                
                {/* Backup CTA */}
                <div className="text-center mt-8">
                  <p className="text-gray-400 mb-4">Having trouble with the booking widget?</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:info@strategixai.co"
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Email Us: info@strategixai.co
                    </a>
                    <a
                      href="tel:+12526756327"
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Call Us: (252) 675-6327
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}