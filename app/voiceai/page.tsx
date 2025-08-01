"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import EvolvedScene from "../../components/EvolvedScene";
import LoadingScreen from "../../components/LoadingScreen";

interface VoiceAIFeature {
  title: string;
  description: string;
  benefits: string[];
  accentColor: string;
  icon: string;
}

interface VoiceAIProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: VoiceAIFeature[];
  accentColor: string;
  icon: string;
  stats: {
    metric: string;
    value: string;
    description: string;
  }[];
}

const voiceAIProducts: VoiceAIProduct[] = [
  {
    id: "inbound",
    title: "Never Miss a Customer Call Again",
    subtitle: "We'll Build Your 24/7 AI Voice Agent",
    description: "Every missed call is a potential lead lost and a direct hit to your bottom line. We provide a fully managed, 'done-for-you' Inbound VoiceAI Agent that answers every call, day or night. Our team of experts will design, train, and deploy an intelligent assistant that becomes a seamless extension of your team.",
    features: [
      {
        title: "The 24/7 Inbound Sales Agent",
        description: "Your AI Agent answers, asks qualifying questions, collects contact information, and sends instant follow-up texts. All interactions are logged in your CRM with notifications sent to your sales team.",
        benefits: ["Warm qualified leads", "Instant follow-ups", "CRM integration"],
        accentColor: "blue-500",
        icon: "💼"
      },
      {
        title: "The Automated Appointment Booker",
        description: "AI Agent accesses your calendar in real-time, offers open slots, books appointments directly, and sends calendar invites with confirmation texts to reduce no-shows.",
        benefits: ["Real-time booking", "Automatic confirmations", "Reduced no-shows"],
        accentColor: "emerald-500",
        icon: "📅"
      },
      {
        title: "The Executive Assistant for Service Businesses",
        description: "Perfect for plumbers, electricians, or landscapers. Answers common questions, gathers job details, collects addresses, and creates job tickets for faster, more accurate quotes.",
        benefits: ["Service inquiries", "Job ticket creation", "Faster quotes"],
        accentColor: "violet-500",
        icon: "🔧"
      },
      {
        title: "The Tireless Customer Support Agent",
        description: "Trained on your FAQs to handle routine inquiries instantly. For complex issues, it gathers caller details and creates support tickets, ensuring no customer concern is ignored.",
        benefits: ["Instant FAQ responses", "Support ticket creation", "Zero ignored calls"],
        accentColor: "amber-500",
        icon: "🛠️"
      }
    ],
    accentColor: "blue-500",
    icon: "📞",
    stats: [
      { metric: "100%", value: "Calls Answered", description: "Never miss another opportunity" },
      { metric: "24/7", value: "Always Available", description: "Even when you can't be" },
      { metric: "0", value: "Tech Hassle", description: "We handle everything for you" },
      { metric: "Custom", value: "Built for You", description: "Tailored to your business" }
    ]
  },
  {
    id: "outbound",
    title: "Outbound VoiceAI",
    subtitle: "AI-Powered Sales & Marketing Automation",
    description: "Scale your outbound sales and marketing efforts with AI voice agents that make personalized calls, follow up on leads, conduct surveys, and nurture prospects with natural conversations.",
    features: [
      {
        title: "Personalized Sales Calls",
        description: "AI agents make personalized sales calls using customer data and conversation history",
        benefits: ["Personalized messaging", "Dynamic scripting", "Conversion optimization"],
        accentColor: "purple-500",
        icon: "🎯"
      },
      {
        title: "Lead Follow-up Automation",
        description: "Automated follow-up calls for leads at optimal timing based on behavior and engagement",
        benefits: ["Timely follow-ups", "Behavioral triggers", "Engagement tracking"],
        accentColor: "pink-500",
        icon: "📈"
      },
      {
        title: "Survey & Feedback Collection",
        description: "Conduct customer surveys and collect feedback with natural voice conversations",
        benefits: ["Higher response rates", "Detailed insights", "Real-time analysis"],
        accentColor: "orange-500",
        icon: "📊"
      },
      {
        title: "Appointment Setting & Nurturing",
        description: "Set appointments with prospects and nurture them through the sales funnel",
        benefits: ["Pipeline acceleration", "Consistent nurturing", "Meeting optimization"],
        accentColor: "teal-500",
        icon: "🚀"
      }
    ],
    accentColor: "purple-500",
    icon: "📢",
    stats: [
      { metric: "300%", value: "Call Volume Increase", description: "More calls without more staff" },
      { metric: "40%", value: "Conversion Improvement", description: "Optimized messaging & timing" },
      { metric: "50%", value: "Cost Savings", description: "Vs traditional sales teams" },
      { metric: "24/7", value: "Campaign Execution", description: "Across all time zones" }
    ]
  }
];

export default function VoiceAIPage() {
  const [activeProduct, setActiveProduct] = useState<string>("inbound");
  const [activeSection, setActiveSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Subtle hero animations
    gsap.fromTo("#hero-title", 
      { 
        opacity: 0, 
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.3
      }
    );

    gsap.fromTo("#hero-subtitle", 
      { 
        opacity: 0, 
        y: 20 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.6
      }
    );

    // Product section animations
    voiceAIProducts.forEach((product, index) => {
      gsap.fromTo(`#product-${product.id}`, 
        { 
          opacity: 0,
          y: 60
        },
        {
          scrollTrigger: {
            trigger: `#product-${product.id}`,
            start: "top 85%",
            end: "top 30%",
            onEnter: () => setActiveSection(index),
            onEnterBack: () => setActiveSection(index)
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    });

  }, []);

  const scrollToProduct = (productId: string) => {
    const element = document.getElementById(`product-${productId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveProduct(productId);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative w-full bg-black text-white">
      {/* Fixed 3D Canvas Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <EvolvedScene />
        </Canvas>
      </div>

      {/* Content Overlays */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Modern background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-slate-950/40"></div>
          
          {/* Subtle animated background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.05)_0%,transparent_50%)] animate-pulse [animation-duration:8s]"></div>
          
          <div className="relative z-10 container mx-auto px-4 md:px-6 text-center max-w-6xl">
            <div id="hero-title" className="mb-6 md:mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
                VoiceAI Agents
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_8s_ease-in-out_infinite]">
                  Revolutionize Your Calls
                </span>
              </h1>
            </div>
            
            <div id="hero-subtitle" className="mb-8 md:mb-12">
              <p className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Stop losing opportunities to missed calls. We build and manage custom AI voice agents that answer every call, 
                qualify leads, and handle customer service - so you can focus on running your business.
              </p>
            </div>

            {/* Modern Product Selection */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={() => scrollToProduct('inbound')}
                className={`group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm border ${
                  activeProduct === 'inbound' 
                    ? 'bg-blue-500/20 border-blue-400/50 text-blue-300 shadow-lg shadow-blue-500/20'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <span className="mr-2">📞</span>
                Inbound VoiceAI
              </button>
              <button 
                onClick={() => scrollToProduct('outbound')}
                className={`group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm border ${
                  activeProduct === 'outbound' 
                    ? 'bg-purple-500/20 border-purple-400/50 text-purple-300 shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <span className="mr-2">📢</span>
                Outbound VoiceAI
              </button>
            </div>

            {/* Modern CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/consultation" 
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Schedule a Demo
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 font-semibold text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Product Sections */}
        {voiceAIProducts.map((product, index) => (
          <section 
            key={product.id}
            id={`product-${product.id}`}
            className="py-16 md:py-24 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-950/50"></div>
            
            <div className="relative z-10 container mx-auto px-4 md:px-6">
              <div className={`mb-16 md:mb-20 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} flex flex-col md:flex-row items-center gap-8 md:gap-16`}>
                
                {/* Content Side */}
                <div className="flex-1">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl hover:bg-white/[0.06] transition-all duration-500 shadow-2xl">
                    <div className="flex items-center mb-6">
                      <span className="text-4xl md:text-5xl mr-4">{product.icon}</span>
                      <div>
                        <h2 className={`text-3xl md:text-5xl font-bold mb-2 text-${product.accentColor === 'blue-500' ? 'blue' : 'purple'}-300`}>
                          {product.title}
                        </h2>
                        <p className={`text-lg md:text-xl text-${product.accentColor === 'blue-500' ? 'blue' : 'purple'}-400 font-medium`}>{product.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Modern Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {product.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                          <div className={`text-2xl md:text-3xl font-bold text-${product.accentColor === 'blue-500' ? 'blue' : 'purple'}-400 mb-1`}>
                            {stat.metric}
                          </div>
                          <div className="text-sm text-white font-medium">{stat.value}</div>
                          <div className="text-xs text-slate-400">{stat.description}</div>
                        </div>
                      ))}
                    </div>

                    {/* Modern Features */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                          <div className="flex items-start mb-3">
                            <span className="text-2xl mr-3 mt-1">{feature.icon}</span>
                            <div>
                              <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                              <p className="text-slate-300 mb-3">{feature.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {feature.benefits.map((benefit, benefitIndex) => (
                              <span 
                                key={benefitIndex}
                                className={`px-3 py-1 bg-${feature.accentColor}/20 text-${feature.accentColor} rounded-full text-sm border border-${feature.accentColor}/30 font-medium`}
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

                {/* Visual Side */}
                <div className="flex-1">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center shadow-2xl">
                    <div className="text-8xl md:text-9xl mb-4 animate-bounce [animation-duration:3s]">{product.icon}</div>
                    <div className="text-lg text-slate-400 mb-4">{product.title} in Action</div>
                    <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
                      <div className="space-y-4">
                        <div className={`text-${product.accentColor === 'blue-500' ? 'blue' : 'purple'}-400 font-bold text-lg mb-4`}>
                          {product.id === 'inbound' ? 'Incoming Call Flow' : 'Outbound Campaign Flow'}
                        </div>
                        <div className="space-y-3">
                          {product.id === 'inbound' ? (
                            <>
                              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <span className="text-slate-300">📞 Call received</span>
                                <span className="text-blue-400 font-medium">Instant</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <span className="text-slate-300">🎯 Intent recognition</span>
                                <span className="text-emerald-400 font-medium">2-3 seconds</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
                                <span className="text-slate-300">💬 Natural conversation</span>
                                <span className="text-violet-400 font-medium">Human-like</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                <span className="text-slate-300">✅ Task completion</span>
                                <span className="text-amber-400 font-medium">95% success</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                <span className="text-slate-300">📊 Campaign launch</span>
                                <span className="text-purple-400 font-medium">Scheduled</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
                                <span className="text-slate-300">📞 Personalized calls</span>
                                <span className="text-pink-400 font-medium">Dynamic</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                <span className="text-slate-300">📈 Lead qualification</span>
                                <span className="text-orange-400 font-medium">Real-time</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
                                <span className="text-slate-300">🎯 Conversion tracking</span>
                                <span className="text-teal-400 font-medium">Automated</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Modern White-Glove Setup Section */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-950/70"></div>
          <div className="relative z-10 container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-white">
                Our White-Glove Setup Process
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                You don't need to worry about the technical details—that's our job. We handle everything so you get a powerful, custom solution without the headache.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Custom Persona & Voice",
                  description: "We work with you to select the perfect voice and craft scripts that match your brand's personality, from strictly professional to warm and friendly.",
                  icon: "🎭",
                  features: ["Voice selection", "Brand matching", "Script creation"],
                  accentColor: "blue-500"
                },
                {
                  title: "Intelligent Information Capture",
                  description: "We train your agent to ask the right questions and accurately collect the essential details you need from every call.",
                  icon: "🎯",
                  features: ["Question scripting", "Data collection", "Lead qualification"],
                  accentColor: "emerald-500"
                },
                {
                  title: "Seamless CRM Integration",
                  description: "All caller data, transcripts, and call summaries are automatically logged in your CRM, eliminating manual data entry forever.",
                  icon: "🔗",
                  features: ["Auto data entry", "CRM sync", "Call transcripts"],
                  accentColor: "violet-500"
                },
                {
                  title: "Automated Workflow Triggers",
                  description: "We connect your agent to trigger any action you need—from sending emails and texts to launching entire marketing campaigns.",
                  icon: "⚡",
                  features: ["Email automation", "Text messaging", "Campaign triggers"],
                  accentColor: "amber-500"
                },
                {
                  title: "Smart Call Routing",
                  description: "When callers need human support, we program the agent to transfer calls to the right team member under conditions you define.",
                  icon: "📞",
                  features: ["Intelligent routing", "Team assignments", "Escalation rules"],
                  accentColor: "rose-500"
                },
                {
                  title: "Detailed Reporting",
                  description: "We set up notifications that provide you with full summaries and transcripts of every call, so you're always in the loop.",
                  icon: "📊",
                  features: ["Call summaries", "Email notifications", "Performance metrics"],
                  accentColor: "indigo-500"
                }
              ].map((service, index) => (
                <div key={index} className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl hover:scale-105">
                  <div className="text-4xl md:text-5xl mb-4">{service.icon}</div>
                  <h3 className={`text-xl md:text-2xl font-bold mb-4 text-${service.accentColor}`}>{service.title}</h3>
                  <p className="text-slate-300 mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-slate-400">
                        <span className={`w-2 h-2 bg-${service.accentColor} rounded-full mr-3`}></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modern Final CTA Section */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/30 to-slate-950/50"></div>
          <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-white">
              Ready to Revolutionize Your Customer Communication?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12">
              Stop letting missed calls dictate your success. With our fully managed VoiceAI Agent service, you can provide 
              a superior customer experience, capture every lead, and build a more efficient, automated, and profitable business.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link 
                href="/consultation" 
                className="group px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 font-bold text-xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
              >
                Schedule Your Demo
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl max-w-4xl mx-auto shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                The Possibilities Are Endless
              </h3>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                From event registrations to staff rostering and beyond, we can design and implement an AI voice solution 
                for virtually any business challenge. Every solution is custom-built for your specific needs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 hover:bg-blue-500/15 transition-all duration-300">
                  <div className="text-blue-400 font-bold mb-2 text-lg">Zero Tech Hassle</div>
                  <div className="text-sm text-slate-300">We handle all the technical setup, training, and maintenance</div>
                </div>
                <div className="bg-purple-500/10 p-6 rounded-2xl border border-purple-500/20 hover:bg-purple-500/15 transition-all duration-300">
                  <div className="text-purple-400 font-bold mb-2 text-lg">Custom Built for You</div>
                  <div className="text-sm text-slate-300">Every agent is tailored to your business, brand, and workflow</div>
                </div>
                <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 hover:bg-emerald-500/15 transition-all duration-300">
                  <div className="text-emerald-400 font-bold mb-2 text-lg">Results from Day One</div>
                  <div className="text-sm text-slate-300">Start capturing every opportunity immediately after deployment</div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xl text-slate-300 font-medium">
                  Let's discuss how we can transform your business communication.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}