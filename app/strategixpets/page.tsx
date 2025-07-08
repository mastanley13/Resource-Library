"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

interface SolutionFeature {
  title: string;
  description: string;
  benefits: string[];
  visual: string;
}

interface CoreSolution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: SolutionFeature[];
  gradient: string;
  icon: string;
}

const coreSolutions: CoreSolution[] = [
  {
    id: "daycare",
    title: "Smart Daycare Operations",
    subtitle: "AI-Powered Daily Care Management",
    description: "Complete daycare management with streamlined check-ins, real-time photo updates, and intelligent activity tracking that keeps pets safe and parents informed.",
    features: [
      {
        title: "Streamlined Check-in/Check-out",
        description: "Efficient arrival and departure processing with automated notifications to parents",
        benefits: ["Quick check-ins", "Parent notifications", "Attendance tracking"],
        visual: "✅"
      },
      {
        title: "Real-time Photo & Video Updates",
        description: "Live photo/video updates during daycare sessions with in-app messaging",
        benefits: ["Live session updates", "Direct staff chat", "Activity documentation"],
        visual: "📸"
      },
      {
        title: "Activity & Feeding Logs",
        description: "Comprehensive tracking of activities, feeding, snack times, and behavioral notes",
        benefits: ["Activity logging", "Feeding tracking", "Behavior insights"],
        visual: "📋"
      }
    ],
    gradient: "from-blue-500 to-cyan-400",
    icon: "🐕"
  },
  {
    id: "boarding",
    title: "Comprehensive Boarding Management",
    subtitle: "Visual Kennel Management & Care Coordination",
    description: "Advanced boarding operations with visual kennel mapping, automated feeding reminders, and comprehensive care tracking for optimal pet management.",
    features: [
      {
        title: "Visual Kennel Dashboard",
        description: "Color-coded kennel map showing occupancy, cleaning status, and special needs flags",
        benefits: ["Visual occupancy tracking", "Cleaning schedules", "Special needs alerts"],
        visual: "🗺️"
      },
      {
        title: "Automated Feeding & Medication",
        description: "Scheduled reminders for meals and medications with staff sign-off logs",
        benefits: ["Medication reminders", "Feeding schedules", "Staff accountability"],
        visual: "💊"
      },
      {
        title: "Kennel Assignment & Rotation",
        description: "Smart kennel assignment with rotation tracking and overnight care notes",
        benefits: ["Optimal kennel use", "Rotation tracking", "Detailed care notes"],
        visual: "🔄"
      }
    ],
    gradient: "from-purple-500 to-pink-400",
    icon: "🏠"
  },
  {
    id: "grooming",
    title: "AI-Powered Grooming Operations",
    subtitle: "Intelligent Time Estimation & Breed Recognition",
    description: "Revolutionary grooming management with AI time estimation, photo-based breed recognition, and step-by-step workflow tracking for optimal efficiency.",
    features: [
      {
        title: "AI Cut-Time Estimator",
        description: "Predicts precise grooming duration by breed, coat length, and temperament for accurate scheduling",
        benefits: ["Accurate time estimates", "Optimized scheduling", "Reduced overruns"],
        visual: "🤖"
      },
      {
        title: "Smart Breed Recognition",
        description: "Photo-upload auto-tags breed and recommends service add-ons like nail trims and blueberry facials",
        benefits: ["Auto breed detection", "Service recommendations", "Upsell opportunities"],
        visual: "📷"
      },
      {
        title: "Step-by-Step Workflows",
        description: "Grooming checklists (wash, dry, cut style) with photo sign-off and time-tracking",
        benefits: ["Quality control", "Time tracking", "Before/after photos"],
        visual: "✅"
      }
    ],
    gradient: "from-cyan-500 to-teal-400",
    icon: "✂️"
  },
  {
    id: "training",
    title: "Intelligent Training Management",
    subtitle: "Behavioral Analytics & Progress Tracking",
    description: "Advanced training programs with AI-powered behavior insights, detailed session plans, and comprehensive progress metrics for optimal learning outcomes.",
    features: [
      {
        title: "AI Behavior Insights",
        description: "Flag potential anxiety/aggression patterns from logs and recommend training adjustments",
        benefits: ["Behavior pattern detection", "Risk alerts", "Training optimization"],
        visual: "🧠"
      },
      {
        title: "Session Plans & Progress Metrics",
        description: "Detailed session plans with progress tracking and treat/reward logging for measurable results",
        benefits: ["Structured sessions", "Progress tracking", "Reward optimization"],
        visual: "📊"
      },
      {
        title: "Training Package Management",
        description: "Comprehensive training packages with milestone tracking and subscription plan integration",
        benefits: ["Package tracking", "Milestone goals", "Subscription billing"],
        visual: "📦"
      }
    ],
    gradient: "from-orange-500 to-yellow-400",
    icon: "🎓"
  }
];

const impactMetrics = [
  { value: "Grooming", label: "AI-Powered Scheduling & Breed Recognition", icon: "✂️" },
  { value: "Boarding", label: "Intuitive Kennel Management", icon: "🏠" },
  { value: "Daycare", label: "Check-ins & Real-Time Updates", icon: "🐕" },
  { value: "Training", label: "Progress Tracking & Improved Dog Behaviors", icon: "🎓" }
];

export default function PetSolutionsPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
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

    // Animate core solutions
    coreSolutions.forEach((solution, index) => {
      gsap.fromTo(`#solution-${solution.id}`, 
        { 
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          scale: 0.9
        },
        {
          scrollTrigger: {
            trigger: `#solution-${solution.id}`,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            onEnter: () => setActiveSection(index),
            onEnterBack: () => setActiveSection(index)
          },
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
        }
      );
    });

    // Animate impact metrics
    gsap.fromTo(".metric-item", 
      { 
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        scrollTrigger: {
          trigger: "#impact-metrics",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2
      }
    );

  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
            >
              ✕
            </button>
            <img 
              src={lightboxImage} 
              alt="Dashboard Preview - Large View" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center neural-particles-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative flex items-center justify-center h-40 w-40 md:h-56 md:w-56 rounded-full bg-gradient-to-br from-orange-400/30 to-cyan-400/20 shadow-2xl ring-4 ring-orange-400/30 ring-offset-2 ring-offset-black animate-pulse-slow">
              <img
                src="https://storage.googleapis.com/msgsndr/8lQAYS7QatKYV3ENYdl1/media/686c761a15ce2aa35e51b038.png"
                alt="StrategixPets Logo"
                className="h-32 w-32 md:h-48 md:w-48 object-cover rounded-full shadow-xl border-4 border-black/40"
                style={{ background: 'rgba(0,0,0,0.7)', filter: 'drop-shadow(0 0 32px rgba(255,140,0,0.45))' }}
              />
            </div>
          </div>
          <div id="hero-title" className="mb-6 md:mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-glow-neural leading-tight">
              Revolutionizing Pet Care
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                with AI-Powered Solutions
              </span>
            </h1>
          </div>
          
          <div id="hero-subtitle" className="mb-8 md:mb-12">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Complete pet care management with AI breed recognition, streamlined check-ins, real-time photo updates, 
              and intelligent workflow automation—all in one unified platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#solutions" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full hover:scale-105 transition-all duration-300 font-bold btn-neural consciousness-pulse text-lg"
            >
              See Our StrategixPets in Action
            </Link>
            <Link 
              href="/consultation" 
              className="px-8 py-4 glass-effect border border-cyan-400/30 text-cyan-400 rounded-full hover:bg-cyan-400/10 transition-all duration-300 font-semibold text-lg"
            >
              Schedule a Demo
            </Link>
          </div>

          {/* Stats Preview */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="glass-effect p-4 md:p-6 rounded-lg text-center">
                <div className="text-2xl md:text-3xl mb-2">{metric.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">{metric.value}</div>
                <div className="text-xs md:text-sm text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Spotlight Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-glow-cyan">
            Powering Success for Industry Leaders
          </h2>
          
          <div className="glass-effect p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Leading Pet Care Provider Partnership
              </p>
              
              {/* Champs Logos */}
              <a 
                href="https://www.championpuppytraining.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-105 duration-300 mb-8"
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                  <img 
                    src="https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/67dd91e8e3e486cf0e3b481b.png" 
                    alt="Champs Main Logo" 
                    className="h-16 md:h-20 w-auto object-contain"
                  />
                  <img 
                    src="https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/67dd920076f60cf046fdb918.png" 
                    alt="Champs Dog Logo" 
                    className="h-16 md:h-20 w-auto object-contain"
                  />
                </div>
              </a>
            </div>
            
            <div className="text-cyan-400 font-semibold">
              Trusted by leading pet care providers nationwide
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions Showcase */}
      <section id="solutions" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-glow-purple">
              Comprehensive Pet Care Solutions
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform covers every aspect of pet care business management, 
              from daily operations to long-term growth strategies.
            </p>
          </div>

          {coreSolutions.map((solution, index) => (
            <div 
              key={solution.id}
              id={`solution-${solution.id}`}
              className={`mb-20 md:mb-32 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} flex flex-col md:flex-row items-center gap-8 md:gap-16`}
            >
              <div className="flex-1">
                <div className="glass-effect p-8 md:p-12 rounded-2xl">
                  <div className="flex items-center mb-6">
                    <span className="text-4xl md:text-5xl mr-4">{solution.icon}</span>
                    <div>
                      <h3 className={`text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${solution.gradient} bg-clip-text text-transparent`}>
                        {solution.title}
                      </h3>
                      <p className="text-lg md:text-xl text-cyan-400 font-semibold">{solution.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="space-y-6">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="feature-item glass-effect p-6 rounded-lg">
                        <div className="flex items-start mb-3">
                          <span className="text-2xl mr-3 mt-1">{feature.visual}</span>
                          <div>
                            <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                            <p className="text-gray-300 mb-3">{feature.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <span 
                              key={benefitIndex}
                              className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="glass-effect p-8 rounded-2xl text-center">
                  <div className="text-8xl md:text-9xl mb-4 consciousness-pulse">{solution.icon}</div>
                  <div className="text-lg text-gray-400 mb-4">System Dashboard Preview</div>
                  <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700/50">
                    {solution.id === 'boarding' ? (
                      <div className="space-y-4">
                        <div className="text-cyan-400 font-bold text-lg mb-4">Boarding System Previews</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <img
                            src="https://storage.googleapis.com/msgsndr/8lQAYS7QatKYV3ENYdl1/media/686cb6dd1ceb7bb944ebf1e0.png"
                            alt="Kennel, Boarding Drag & Drop"
                            className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setLightboxImage("https://storage.googleapis.com/msgsndr/8lQAYS7QatKYV3ENYdl1/media/686cb6dd1ceb7bb944ebf1e0.png")}
                          />
                          <img
                            src="https://storage.googleapis.com/msgsndr/8lQAYS7QatKYV3ENYdl1/media/686cb6dd6f8caf65ef4c2760.png"
                            alt="Employee Dashboard"
                            className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setLightboxImage("https://storage.googleapis.com/msgsndr/8lQAYS7QatKYV3ENYdl1/media/686cb6dd6f8caf65ef4c2760.png")}
                          />
                        </div>
                        <div className="text-center text-sm text-gray-400 mt-4">
                          Drag & drop kennel management and employee dashboard views
                        </div>
                      </div>
                    ) : solution.id === 'training' ? (
                      <img 
                        src="https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/6818cfa8f36e2035a64551f9.png" 
                        alt="Training Dashboard Preview" 
                        className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setLightboxImage("https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/6818cfa8f36e2035a64551f9.png")}
                      />
                    ) : solution.id === 'grooming' ? (
                      <img 
                        src="https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/6818cfa8ae2ec6b9f3612b10.png" 
                        alt="Grooming Dashboard Preview" 
                        className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setLightboxImage("https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/6818cfa8ae2ec6b9f3612b10.png")}
                      />
                    ) : solution.id === 'daycare' ? (
                      <div className="space-y-4">
                        <div className="text-cyan-400 font-bold text-lg mb-4">Customer Portal Preview</div>
                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-3">
                             <img 
                               src="https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/6818cfa8ae2ec674b6612b11.png" 
                               alt="Customer Portal Dashboard" 
                               className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                               onClick={() => setLightboxImage("https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/6818cfa8ae2ec674b6612b11.png")}
                             />
                             <img 
                               src="https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/6818cfa8417763b7ba2bf609.png" 
                               alt="Customer Portal Interface" 
                               className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                               onClick={() => setLightboxImage("https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/6818cfa8417763b7ba2bf609.png")}
                             />
                           </div>
                           <div className="flex items-center justify-center">
                             <img 
                               src="https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/6818cfa8f36e2079234551f8.png" 
                               alt="Pet Card in Customer Portal" 
                               className="w-full h-auto rounded-lg shadow-lg max-w-sm cursor-pointer hover:opacity-90 transition-opacity"
                               onClick={() => setLightboxImage("https://storage.googleapis.com/msgsndr/mGAU84INytusQO0Fo5P9/media/6818cfa8f36e2079234551f8.png")}
                             />
                           </div>
                         </div>
                        <div className="text-center text-sm text-gray-400 mt-4">
                          Real-time updates and pet information accessible to customers
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-gray-500 text-sm mb-4">
                          [Screenshot placeholder: {solution.title} Interface]
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded"></div>
                          <div className="h-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded w-3/4"></div>
                          <div className="h-2 bg-gradient-to-r from-cyan-500/30 to-teal-500/30 rounded w-1/2"></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Integration Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-glow">
              Seamless Integration & Advanced Features
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Built on cutting-edge technology with enterprise-grade security and scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Multi-Role Staff Management",
                description: "Secure login system for Groomers, Daycare Attendants, Trainers, and Kennel Staff",
                icon: "👥",
                features: ["Role-based access", "Auto-staff assignment", "Skill-based scheduling"]
              },
              {
                title: "Payment & Subscription Integration",
                description: "Comprehensive payment processing with subscription management",
                icon: "💳",
                features: ["Stripe & Authorize.net", "Apple/Google Pay", "Subscription plans"]
              },
              {
                title: "Predictive Capacity Planning",
                description: "AI forecasting for optimal resource allocation and scheduling",
                icon: "📈",
                features: ["Demand forecasting", "Auto-waitlist management", "Overtime alerts"]
              },
              {
                title: "Calendar & CRM Integration",
                description: "Seamless integration with existing business tools and workflows",
                icon: "📅",
                features: ["Google/Outlook sync", "Mailchimp integration", "Klaviyo campaigns"]
              },
              {
                title: "SOC-2 Security & Compliance",
                description: "Enterprise-grade security with end-to-end encryption",
                icon: "🔒",
                features: ["SOC-2 compliance", "End-to-end encryption", "Secure data handling"]
              },
              {
                title: "Inventory & Supply Management",
                description: "Smart inventory tracking with automated reorder alerts",
                icon: "📦",
                features: ["Low-stock alerts", "Auto-order thresholds", "Supply tracking"]
              }
            ].map((tech, index) => (
              <div key={index} className="glass-effect p-6 md:p-8 rounded-2xl hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-5xl mb-4 consciousness-pulse">{tech.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-cyan-400">{tech.title}</h3>
                <p className="text-gray-300 mb-6">{tech.description}</p>
                <div className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-400">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Impact Section */}
      <section id="impact-metrics" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-glow-neural">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the complete transformation with our unified, AI-driven pet care management platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="metric-item text-center">
                <div className="glass-effect p-8 rounded-2xl">
                  <div className="text-5xl md:text-6xl mb-4 consciousness-pulse">{metric.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">{metric.value}</div>
                  <div className="text-gray-300 font-medium">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-effect p-8 md:p-12 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400">
              Platform Benefits
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              Transform your pet care business with our comprehensive, scalable solution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-6 rounded-lg border border-blue-500/30">
                <div className="text-cyan-400 font-bold mb-2">Unified Experience</div>
                <div className="text-sm text-gray-300">One app for staff, one for customers, one website—zero friction</div>
              </div>
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-lg border border-purple-500/30">
                <div className="text-purple-400 font-bold mb-2">AI-Driven Efficiency</div>
                <div className="text-sm text-gray-300">Reduce over-booking, optimize staff time, improve ROI</div>
              </div>
              <div className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 p-6 rounded-lg border border-orange-500/30">
                <div className="text-orange-400 font-bold mb-2">Scalable & Customizable</div>
                <div className="text-sm text-gray-300">Plug-and-play modules for any size operation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-purple-900/30 to-pink-900/30"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-glow-cyan">
            Ready to Transform Your Pet Care Business?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Join the leading pet care providers who trust Strategix AI to power their success. 
            See how our comprehensive solutions can revolutionize your operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link 
              href="/consultation" 
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full hover:scale-105 transition-all duration-300 font-bold btn-neural consciousness-pulse text-xl"
            >
              Schedule a Demo
            </Link>
            <Link 
              href="/contact" 
              className="px-10 py-5 glass-effect border border-cyan-400/30 text-cyan-400 rounded-full hover:bg-cyan-400/10 transition-all duration-300 font-semibold text-xl"
            >
              Download Case Study
            </Link>
          </div>

          <div className="glass-effect p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Get Started Today</h3>
            <p className="text-gray-300 mb-4">
              Ready to see our pet care solutions in action? Contact our team for a personalized demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-400">
              <span>📧 info@strategixai.co</span>
              <span>📞 +1 252-427-0115</span>
              <span>🌐 Available nationwide</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}