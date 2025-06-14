"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedScene from "../components/AnimatedScene";
import SmoothScroller from "../components/SmoothScroller";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from("#hero-overlay", {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: "power3.out",
    });
    gsap.to("#hero-overlay", {
      scrollTrigger: {
        trigger: "#hero-overlay",
        start: "top top",
        end: "+=100%",
        scrub: true,
      },
      opacity: 0,
      y: -200,
    });
  }, []);

  return (
    <SmoothScroller>
      <div className="relative w-screen h-screen">
        <Canvas>
          <ScrollControls pages={3} damping={0.09}>
            <AnimatedScene />
          </ScrollControls>
        </Canvas>
        <div
          id="hero-overlay"
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <h1 className="text-center font-extrabold text-5xl md:text-7xl text-white">
            Strategix&nbsp;AI
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-300">
            AI-native solutions that move business forward
          </p>
          <a
            href="/contact"
            className="pointer-events-auto mt-8 px-6 py-3 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition"
          >
            Let’s Talk
          </a>
        </div>
      </div>
    </SmoothScroller>
  );
}
