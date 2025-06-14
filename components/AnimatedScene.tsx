"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import AIDataFlow from "./AIDataFlow";
import InteractiveAIBrain from "./InteractiveAIBrain";

// Dynamic background with evolving complexity
function DynamicBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  const geometry = useMemo(() => new THREE.PlaneGeometry(100, 100, 50, 50), []);
  
  const vertexShader = `
    uniform float time;
    uniform float scrollProgress;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      
      // Complex wave patterns that evolve with scroll
      float wave1 = sin(pos.x * 0.1 + time * 0.5) * cos(pos.y * 0.1 + time * 0.3);
      float wave2 = sin(pos.x * 0.05 + scrollProgress * 10.0) * sin(pos.y * 0.05 + scrollProgress * 8.0);
      
      pos.z += wave1 * 2.0 + wave2 * scrollProgress * 5.0;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    uniform float scrollProgress;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      // Dynamic color evolution based on scroll
      float r = 0.1 + scrollProgress * 0.3;
      float g = 0.2 + scrollProgress * 0.5;
      float b = 0.8 - scrollProgress * 0.3;
      
      // Add noise and patterns
      float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 20.0 + time * 0.5) * 0.1;
      float pattern = sin(length(uv - 0.5) * 10.0 + scrollProgress * 15.0) * 0.2;
      
      vec3 color = vec3(r, g, b) + noise + pattern;
      color *= 0.3 + scrollProgress * 0.4;
      
      gl_FragColor = vec4(color, 0.6);
    }
  `;

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        scrollProgress: { value: 0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    material.uniforms.time.value = time;
    material.uniforms.scrollProgress.value = scrollOffset;

    meshRef.current.rotation.z = time * 0.01;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -30]} geometry={geometry} material={material} />
  );
}

// Floating data visualization particles
function DataVisualization() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const particleData = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute in space around the scene
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      scales[i] = Math.random() * 2 + 0.5;

      // Data-themed colors
      const hue = Math.random() * 0.3 + 0.5; // Blue to cyan range
      const color = new THREE.Color().setHSL(hue, 1, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, scales, colors };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    // Rotation and movement
    groupRef.current.rotation.y = time * 0.02;
    groupRef.current.position.y = Math.sin(time * 0.5) * 2;

    // Update individual particles
    groupRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        child.rotation.x = time * 0.01 * (index % 3 + 1);
        child.rotation.y = time * 0.02 * (index % 2 + 1);
        
        // Scale based on scroll
        const baseScale = 0.5 + scrollOffset * 2;
        child.scale.setScalar(baseScale * (0.8 + Math.sin(time + index) * 0.2));
      }
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 15
          ]}
        >
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 1, 0.6)}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main scene orchestrator
export default function AnimatedScene() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Calculate current stage based on scroll
  const getCurrentStage = (scrollOffset: number): number => {
    if (scrollOffset < 0.2) return 0; // Discovery
    if (scrollOffset < 0.4) return 1; // Analysis
    if (scrollOffset < 0.6) return 2; // Strategy
    if (scrollOffset < 0.8) return 3; // Implementation
    return 4; // Results
  };

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    // Dynamic camera movement based on scroll
    state.camera.position.z = 15 - scrollOffset * 5;
    state.camera.position.y = Math.sin(scrollOffset * Math.PI) * 3;
    state.camera.position.x = Math.cos(scrollOffset * Math.PI * 0.5) * 2;
    state.camera.lookAt(0, 0, 0);

    // Scene rotation
    groupRef.current.rotation.y = time * 0.05 + scrollOffset * Math.PI * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Advanced lighting setup */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        color="#ffffff"
        castShadow
      />
      <directionalLight 
        position={[-10, -10, -5]} 
        intensity={0.8} 
        color="#00aced" 
      />
      <pointLight 
        position={[0, 5, 5]} 
        intensity={2} 
        color="#ff6b6b"
        distance={20}
        decay={2}
      />

      {/* Dynamic background */}
      <DynamicBackground />

      {/* AI Data Flow - main visual element */}
      <AIDataFlow />

      {/* Interactive AI Brain - changes based on consulting stage */}
      <InteractiveAIBrain stage={getCurrentStage(scroll.offset)} />

      {/* Data visualization particles */}
      <DataVisualization />

      {/* Holographic grid */}
      <group position={[0, -8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <gridHelper args={[40, 40, "#00aced", "#ffffff"]} />
      </group>

      {/* Energy orbs positioned strategically */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin((i / 8) * Math.PI * 2) * 12,
            Math.cos((i / 8) * Math.PI * 2) * 3,
            Math.sin((i / 8) * Math.PI * 4) * 8
          ]}
        >
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(0.6 + i * 0.1, 1, 0.5)}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}
