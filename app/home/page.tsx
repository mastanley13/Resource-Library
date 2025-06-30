"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EvolvedScene from "../../components/EvolvedScene";
import LoadingScreen from "../../components/LoadingScreen";

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
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 
              id="hero-title"
              className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 leading-none mb-6 md:mb-8 text-glow-neural"
            >
              TRANSFORM YOUR
              <br />
              BUSINESS WITH
              <br />
              <span className="text-white text-glow-cyan">AI INNOVATION</span>
            </h1>
            <p 
              id="hero-subtitle"
              className="text-lg md:text-2xl lg:text-3xl text-gray-300 font-light mb-8 md:mb-12 max-w-4xl leading-relaxed"
            >
              Unlock your company's potential with our
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 font-medium text-glow-cyan">AI consulting and implementation services</span>
            </p>
            
            {/* Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
              <div className="glass-effect p-4 rounded-lg border border-cyan-400/30">
                <div className="text-cyan-400 font-bold text-sm">✓ PROVEN EXPERTISE</div>
                <div className="text-white text-xs">Veteran-owned</div>
              </div>
              <div className="glass-effect p-4 rounded-lg border border-purple-400/30">
                <div className="text-purple-400 font-bold text-sm">✓ RAPID RESULTS</div>
                <div className="text-white text-xs">30-day sprints</div>
              </div>
              <div className="glass-effect p-4 rounded-lg border border-green-400/30">
                <div className="text-green-400 font-bold text-sm">✓ GUARANTEED ROI</div>
                <div className="text-white text-xs">Or money back</div>
              </div>
            </div>

            {/* Primary CTA */}
            <a
              href="/consultation"
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

        {/* Process Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 text-glow-neural">
                Our Process
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 text-glow-cyan">
                  From Vision to Reality
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                We transform your business through a proven methodology that delivers measurable results.
              </p>
            </div>

            {/* Stages */}
            <div className="space-y-24">
              {consultingStages.map((stage, index) => (
                <div 
                  key={stage.id}
                  id={`stage-${stage.id}`}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}
                >
                  {/* Stage Content */}
                  <div className="w-full md:w-1/2">
                    <div className={`glass-effect p-8 rounded-2xl border border-white/10 hover:border-${stage.gradient.split(' ')[1]}/30 transition-all duration-300`}>
                      <h3 className={`text-2xl md:text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stage.gradient}`}>
                        {stage.title}
                      </h3>
                      <h4 className="text-white text-lg md:text-xl mb-4">{stage.subtitle}</h4>
                      <p className="text-gray-300 mb-6">{stage.description}</p>
                      <ul className="space-y-3">
                        {stage.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="feature-item flex items-center text-gray-200">
                            <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${stage.gradient} mr-3`}></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Stage Visualization */}
                  <div className="w-full md:w-1/2 h-64 md:h-96">
                    {/* Add your stage visualization component here */}
                    <div className={`w-full h-full rounded-2xl bg-gradient-to-r ${stage.gradient} opacity-20`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="final-cta" className="py-20 px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 text-glow-neural">
              Ready to Transform Your Business?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 text-glow-cyan">
                Let's Get Started
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Book your free discovery call today and take the first step towards AI-powered growth.
            </p>
            <a
              href="/consultation"
              className="group relative px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 btn-neural consciousness-pulse inline-block"
            >
              <span className="relative z-10 text-glow">Book Your Free Discovery Call →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
} 