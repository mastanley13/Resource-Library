"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedScene from "../components/AnimatedScene";
import LoadingScreen from "../components/LoadingScreen";

const SmoothScroller = dynamic(() => import("../components/SmoothScroller"), {
  ssr: false,
});

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
    title: "IMPLEMENTATION",
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
    <SmoothScroller>
      <div className="relative w-screen min-h-screen bg-black overflow-hidden">
        {/* Fixed 3D Canvas Background */}
        <div className="fixed inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <ScrollControls pages={6} damping={0.1}>
              <AnimatedScene />
            </ScrollControls>
          </Canvas>
        </div>

        {/* Content Overlays */}
        <div className="relative z-10 min-h-screen">
          
          {/* Hero Section */}
          <section className="h-screen flex flex-col items-center justify-center text-center px-6">
            <div className="max-w-7xl mx-auto">
              <h1 
                id="hero-title" 
                className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 leading-none mb-8"
              >
                STRATEGIX
                <br />
                <span className="text-white">AI</span>
              </h1>
              <p 
                id="hero-subtitle" 
                className="text-2xl md:text-4xl lg:text-5xl text-gray-300 font-light mb-16 max-w-5xl leading-relaxed"
              >
                Transforming businesses through
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 font-medium">
                  AI-native solutions
                </span>
              </p>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-4 mb-12">
                {consultingStages.map((stage, index) => (
                  <div
                    key={stage.id}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentStage === index 
                        ? `bg-gradient-to-r ${stage.gradient} scale-150` 
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Consulting Process Stages */}
          {consultingStages.map((stage, index) => (
            <section 
              key={stage.id}
              id={`stage-${stage.id}`}
              className="min-h-screen flex items-center justify-center px-6 py-20"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Content Side */}
                <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="glass-effect p-8 rounded-2xl border border-white/10">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
                      {stage.title}
                    </h2>
                    <h3 className={`text-2xl md:text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r ${stage.gradient}`}>
                      {stage.subtitle}
                    </h3>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                      {stage.description}
                    </p>
                    
                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {stage.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="feature-item flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stage.gradient}`} />
                          <span className="text-gray-200 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Side */}
                <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative">
                    {/* Dynamic visualization based on stage */}
                    <div className={`w-80 h-80 mx-auto rounded-full bg-gradient-to-r ${stage.gradient} p-1`}>
                      <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center">
                        <div className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stage.gradient}`}>
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-4 h-4 rounded-full bg-gradient-to-r ${stage.gradient} opacity-60 animate-pulse`}
                          style={{
                            top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 30}%`,
                            left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 30}%`,
                            animationDelay: `${i * 0.2}s`
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
          <section id="final-cta" className="h-screen flex flex-col items-center justify-center text-center px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
                Ready to Transform
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600">
                  Your Business?
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12">
                Join the AI revolution with Strategix AI. Let's build something extraordinary together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/contact"
                  className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50"
                >
                  <span className="relative z-10">Start Your AI Journey</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </a>
                
                <a
                  href="/process"
                  className="px-12 py-6 border-2 border-cyan-400 rounded-full text-cyan-400 font-bold text-xl transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:scale-110"
                >
                  Learn Our Process
                </a>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400">
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

        {/* Floating Navigation */}
        <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center space-x-8 px-8 py-4 glass-effect rounded-full border border-white/10">
            <a href="/" className="text-white font-bold text-lg">Strategix AI</a>
            <div className="flex space-x-6">
              <a href="/solutions" className="text-gray-300 hover:text-cyan-400 transition-colors">Solutions</a>
              <a href="/process" className="text-gray-300 hover:text-cyan-400 transition-colors">Process</a>
              <a href="/results" className="text-gray-300 hover:text-cyan-400 transition-colors">Results</a>
              <a href="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
        </nav>

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

        {/* Scroll Indicator */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center text-white/60">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40 mb-2"></div>
          <p className="text-sm">Scroll to explore</p>
        </div>
      </div>
    </SmoothScroller>
  );
}
