"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EvolvedScene from "../components/EvolvedScene";
import LoadingScreen from "../components/LoadingScreen";



interface ConsultingStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
  gradient: string;
}

const consultingStages: ConsultingStage[] = [
  {
    id: "discovery",
    title: "DISCOVERY",
    subtitle: "Understanding Your Vision",
    description: "We dive deep into your business challenges, goals, and current infrastructure to understand exactly where AI can create the most impact.",
    features: [
      "Comprehensive Business Analysis",
      "Technology Assessment",
      "Goal Alignment & Strategy",
      "ROI Opportunity Mapping"
    ],
    color: "#2563eb",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    id: "analysis",
    title: "ANALYSIS",
    subtitle: "Data-Driven Insights",
    description: "Our AI experts analyze your data, processes, and market position to identify the highest-value automation and optimization opportunities.",
    features: [
      "Advanced Data Analytics",
      "Process Optimization Review",
      "Competitive Intelligence",
      "Risk Assessment & Mitigation"
    ],
    color: "#7c3aed",
    gradient: "from-purple-500 to-pink-400"
  },
  {
    id: "strategy",
    title: "STRATEGY",
    subtitle: "Custom AI Roadmap",
    description: "We design a comprehensive AI strategy tailored to your business, complete with implementation timeline, resource requirements, and success metrics.",
    features: [
      "Custom AI Architecture Design",
      "Implementation Roadmap",
      "Resource Planning",
      "Success Metrics Definition"
    ],
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-400"
  },
  {
    id: "implementation",
    title: "IMPLEMENT innovAtIon",
    subtitle: "Building the Future",
    description: "Our team works alongside yours to implement cutting-edge AI solutions, ensuring seamless integration with your existing systems and workflows.",
    features: [
      "AI Model Development",
      "System Integration",
      "Team Training & Support",
      "Performance Monitoring"
    ],
    color: "#f59e0b",
    gradient: "from-orange-500 to-yellow-400"
  },
  {
    id: "results",
    title: "RESULTS",
    subtitle: "Measurable Impact",
    description: "Experience transformational growth through AI-powered efficiency, innovation, and competitive advantage that drives real business results.",
    features: [
      "Increased Operational Efficiency",
      "Cost Reduction & Savings",
      "Revenue Growth Acceleration",
      "Competitive Market Advantage"
    ],
    color: "#eab308",
    gradient: "from-yellow-500 to-amber-400"
  }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      gsap.registerPlugin(ScrollTrigger);
      
      // Hero section animations
      gsap.fromTo("#hero-title", 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          ease: "power3.out",
          delay: 0.5
        }
      );

      gsap.fromTo("#hero-subtitle", 
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 1
        }
      );

      // Animate each consulting stage
      consultingStages.forEach((stage, index) => {
        gsap.fromTo(`#stage-${stage.id}`, 
          { 
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            scale: 0.8
          },
          {
            scrollTrigger: {
              trigger: `#stage-${stage.id}`,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
              onEnter: () => setCurrentStage(index),
              onEnterBack: () => setCurrentStage(index)
            },
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
          }
        );

        // Animate stage features
        gsap.fromTo(`#stage-${stage.id} .feature-item`, 
          { 
            opacity: 0,
            y: 30
          },
          {
            scrollTrigger: {
              trigger: `#stage-${stage.id}`,
              start: "top 60%",
              end: "top 40%",
              scrub: 1,
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2
          }
        );
      });

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
            <div className="max-w-4xl mx-auto breathing">
              <h1 
                id="hero-title" 
                className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 leading-none mb-6 md:mb-8 text-glow-neural"
              >
                STRATEGIX
                <br />
                <span className="text-white text-glow-cyan">AI</span>
              </h1>
              <p 
                id="hero-subtitle" 
                className="text-lg md:text-2xl lg:text-4xl text-gray-300 font-light mb-12 md:mb-16 max-w-4xl leading-relaxed"
              >
                Transforming businesses through
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 font-medium text-glow-cyan">
                  AI-native solutions
                </span>
              </p>
              
              {/* Story Evolution Indicator */}
              <div className="flex flex-col items-center mb-8 md:mb-12">
                <p className="text-sm md:text-base text-gray-400 mb-4">AI Evolution Journey</p>
                <div className="flex justify-center space-x-3 md:space-x-4">
                  {consultingStages.map((stage, index) => (
                    <div
                      key={stage.id}
                      className={`relative transition-all duration-500 ${
                        currentStage === index 
                          ? 'scale-125' 
                          : 'scale-100'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 ${
                          currentStage >= index 
                            ? `bg-gradient-to-r ${stage.gradient}` 
                            : 'bg-gray-600'
                        }`}
                      />
                      {currentStage === index && (
                        <div className={`absolute inset-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r ${stage.gradient} animate-ping opacity-75`} />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  {currentStage < consultingStages.length ? consultingStages[currentStage].title : 'Complete'}
                </p>
              </div>
            </div>
          </section>

          {/* Consulting Process Stages */}
          {consultingStages.map((stage, index) => (
            <section 
              key={stage.id}
              id={`stage-${stage.id}`}
              className="min-h-screen flex items-center justify-center px-4 md:px-6 py-12 md:py-20"
            >
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                
                {/* Content Side */}
                <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="glass-effect p-6 md:p-8 rounded-2xl border border-white/10">
                    <h2 className="responsive-title font-black text-white mb-4 text-glow-neural break-words text-container">
                      {stage.title}
                    </h2>
                    <h3 className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r ${stage.gradient} text-glow-cyan`}>
                      {stage.subtitle}
                    </h3>
                    <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8">
                      {stage.description}
                    </p>
                    
                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {stage.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="feature-item flex items-center space-x-3 p-3 md:p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stage.gradient} consciousness-pulse`} />
                          <span className="text-gray-200 font-medium text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Side */}
                <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative breathing">
                    {/* Dynamic visualization based on stage */}
                    <div className={`w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full bg-gradient-to-r ${stage.gradient} p-1 liquid-morph`}>
                      <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center holographic">
                        <div className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    
                    {/* Simplified floating elements for mobile */}
                    <div className="absolute inset-0 pointer-events-none hidden md:block">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${stage.gradient} opacity-60 organic-float`}
                          style={{
                            top: `${25 + Math.sin(i * 90 * Math.PI / 180) * 25}%`,
                            left: `${25 + Math.cos(i * 90 * Math.PI / 180) * 25}%`,
                            animationDelay: `${i * 0.3}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

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
                Join the AI revolution with Strategix AI. Let's build something extraordinary together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                <a
                  href="/contact"
                  className="group relative px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 btn-neural consciousness-pulse"
                >
                  <span className="relative z-10 text-glow">Start Your AI Journey</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </a>
                
                <a
                  href="/process"
                  className="px-8 md:px-12 py-4 md:py-6 border-2 border-cyan-400 rounded-full text-cyan-400 font-bold text-lg md:text-xl transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:scale-105 holographic breathing"
                >
                  Learn Our Process
                </a>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400 pb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Veteran-Owned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>U.S.-Based</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Security-First</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Progress Indicator */}
        <div className="fixed bottom-8 left-8 z-50 text-white/60">
          <div className="text-sm mb-2">Progress</div>
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-300"
              style={{ width: `${((currentStage + 1) / consultingStages.length) * 100}%` }}
            />
          </div>
          <div className="text-xs mt-1">
            Stage {currentStage + 1} of {consultingStages.length}
          </div>
        </div>

        {/* Scroll Indicator - Hide on final section */}
        {currentStage < consultingStages.length - 1 && (
          <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center text-white/60">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40 mb-2"></div>
            <p className="text-sm">Scroll to explore</p>
          </div>
        )}
      </div>
  );
}
