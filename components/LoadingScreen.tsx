"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING");

  useEffect(() => {
    const texts = [
      "INITIALIZING",
      "LOADING NEURAL NETWORKS",
      "CONNECTING AI NODES",
      "CALIBRATING SYSTEMS",
      "READY TO LAUNCH"
    ];

    let textIndex = 0;
    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += Math.random() * 15 + 5;
      
      if (progressValue >= 100) {
        progressValue = 100;
        setText("READY TO LAUNCH");
        setTimeout(() => {
          onComplete();
        }, 500);
        clearInterval(interval);
      } else {
        setProgress(progressValue);
        if (progressValue > textIndex * 20 && textIndex < texts.length - 1) {
          textIndex++;
          setText(texts[textIndex]);
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 particles-bg"></div>
      
      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
            STRATEGIX AI
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-cyan-400 font-mono tracking-wider">
            {text}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-md mx-auto mb-6">
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>0%</span>
            <span className="font-mono">{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-3">
          <div className="loading-dots flex space-x-1">
            <span className="w-3 h-3 bg-cyan-400 rounded-full"></span>
            <span className="w-3 h-3 bg-cyan-400 rounded-full"></span>
            <span className="w-3 h-3 bg-cyan-400 rounded-full"></span>
          </div>
        </div>

        {/* Neural Network Visualization */}
        <div className="absolute -top-20 -left-20 w-40 h-40 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00aced" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
            {/* Connections */}
            <g stroke="url(#nodeGradient)" strokeWidth="1" fill="none" opacity="0.3">
              <line x1="50" y1="50" x2="150" y2="50" className="animate-pulse" />
              <line x1="50" y1="150" x2="150" y2="150" className="animate-pulse" />
              <line x1="50" y1="50" x2="50" y2="150" className="animate-pulse" />
              <line x1="150" y1="50" x2="150" y2="150" className="animate-pulse" />
              <line x1="50" y1="50" x2="150" y2="150" className="animate-pulse" />
              <line x1="50" y1="150" x2="150" y2="50" className="animate-pulse" />
            </g>
            {/* Nodes */}
            <g fill="url(#nodeGradient)">
              <circle cx="50" cy="50" r="4" className="animate-pulse" />
              <circle cx="150" cy="50" r="4" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
              <circle cx="50" cy="150" r="4" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
              <circle cx="150" cy="150" r="4" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
            </g>
          </svg>
        </div>

        <div className="absolute -bottom-20 -right-20 w-40 h-40 opacity-20 rotate-45">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="nodeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#00aced" />
              </linearGradient>
            </defs>
            {/* Connections */}
            <g stroke="url(#nodeGradient2)" strokeWidth="1" fill="none" opacity="0.3">
              <line x1="50" y1="50" x2="150" y2="50" className="animate-pulse" />
              <line x1="50" y1="150" x2="150" y2="150" className="animate-pulse" />
              <line x1="50" y1="50" x2="50" y2="150" className="animate-pulse" />
              <line x1="150" y1="50" x2="150" y2="150" className="animate-pulse" />
            </g>
            {/* Nodes */}
            <g fill="url(#nodeGradient2)">
              <circle cx="50" cy="50" r="3" className="animate-pulse" />
              <circle cx="150" cy="50" r="3" className="animate-pulse" style={{ animationDelay: '0.1s' }} />
              <circle cx="50" cy="150" r="3" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
              <circle cx="150" cy="150" r="3" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
} 