"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

interface AIBrainProps {
  stage: number; // 0: Discovery, 1: Analysis, 2: Strategy, 3: Implementation, 4: Results
}

export default function InteractiveAIBrain({ stage }: AIBrainProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const synapseRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  // Advanced brain geometry with morphing capabilities
  const { coreGeometry, synapsePositions, synapseColors } = useMemo(() => {
    // Core brain structure
    const coreGeometry = new THREE.IcosahedronGeometry(3, 3);
    
    // Synapse network
    const synapseCount = 800;
    const positions = new Float32Array(synapseCount * 3);
    const colors = new Float32Array(synapseCount * 3);
    
    for (let i = 0; i < synapseCount; i++) {
      // Distribute synapses in a brain-like pattern
      const radius = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      // Color based on depth and activity
      const hue = 0.6 + Math.random() * 0.2;
      const saturation = 0.8 + Math.random() * 0.2;
      const lightness = 0.4 + Math.random() * 0.4;
      
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { coreGeometry, synapsePositions: positions, synapseColors: colors };
  }, []);

  // Advanced shader for morphing brain core
  const brainVertexShader = `
    uniform float time;
    uniform float morphProgress;
    uniform int stage;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vIntensity;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      
      vec3 pos = position;
      
      // Stage-based morphing
      if (stage == 0) {
        // Discovery: gentle pulsing
        pos *= 1.0 + 0.1 * sin(time * 2.0 + pos.x * 0.5);
      } else if (stage == 1) {
        // Analysis: complex folding patterns
        float fold = sin(pos.x * 3.0 + time) * cos(pos.y * 3.0 + time) * 0.2;
        pos += normal * fold * morphProgress;
      } else if (stage == 2) {
        // Strategy: crystalline structure
        float crystal = abs(sin(pos.x * 5.0) * cos(pos.y * 5.0) * sin(pos.z * 5.0)) * 0.3;
        pos += normal * crystal * morphProgress;
      } else if (stage == 3) {
        // Implementation: dynamic expansion
        pos *= 1.0 + morphProgress * 0.5;
        float wave = sin(time * 3.0 + length(pos) * 0.1) * 0.2;
        pos += normal * wave;
      } else if (stage == 4) {
        // Results: explosive transformation
        pos *= 1.0 + morphProgress * 1.5;
        float explosion = sin(time + length(pos) * 0.2) * morphProgress;
        pos += normalize(pos) * explosion;
      }
      
      vPosition = pos;
      vIntensity = 0.5 + 0.5 * sin(time * 2.0 + pos.x * 0.1);
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const brainFragmentShader = `
    uniform float time;
    uniform float morphProgress;
    uniform int stage;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vIntensity;
    
    void main() {
      vec3 baseColor;
      
      // Stage-specific colors
      if (stage == 0) {
        baseColor = vec3(0.2, 0.6, 1.0); // Discovery: blue
      } else if (stage == 1) {
        baseColor = vec3(0.8, 0.4, 1.0); // Analysis: purple
      } else if (stage == 2) {
        baseColor = vec3(0.0, 1.0, 0.8); // Strategy: cyan
      } else if (stage == 3) {
        baseColor = vec3(1.0, 0.6, 0.0); // Implementation: orange
      } else {
        baseColor = vec3(1.0, 0.8, 0.0); // Results: gold
      }
      
      // Fresnel-like effect
      float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
      fresnel = pow(fresnel, 2.0);
      
      // Energy patterns
      float energy = vIntensity * (0.8 + 0.4 * morphProgress);
      
      vec3 color = baseColor * energy;
      color += vec3(1.0) * fresnel * 0.5;
      
      // Glowing edges
      float edge = 1.0 - abs(dot(vNormal, normalize(vPosition)));
      edge = pow(edge, 3.0);
      color += vec3(1.0) * edge * morphProgress;
      
      gl_FragColor = vec4(color, 0.8 + 0.2 * morphProgress);
    }
  `;

  const brainMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        morphProgress: { value: 0 },
        stage: { value: stage }
      },
      vertexShader: brainVertexShader,
      fragmentShader: brainFragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, [stage]);

  // Synapse particle shader
  const synapseVertexShader = `
    attribute vec3 color;
    varying vec3 vColor;
    uniform float time;
    uniform float activity;
    uniform int stage;
    
    void main() {
      vColor = color;
      
      vec3 pos = position;
      
      // Activity-based animation
      float pulse = sin(time * 3.0 + length(pos) * 0.1) * activity;
      pos += normalize(pos) * pulse * 0.5;
      
      // Stage-specific behavior
      if (stage >= 2) {
        // More active from Strategy stage onwards
        float wave = sin(time * 5.0 + pos.x * 0.1 + pos.z * 0.1) * activity;
        pos.y += wave * 0.3;
      }
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (20.0 + activity * 30.0) / -mvPosition.z;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const synapseFragmentShader = `
    varying vec3 vColor;
    uniform float time;
    uniform float activity;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      alpha *= 0.6 + 0.4 * sin(time * 4.0);
      alpha *= activity;
      
      vec3 color = vColor * (1.0 + activity);
      color += vec3(1.0) * alpha * 0.3;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const synapseMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        activity: { value: 0 },
        stage: { value: stage }
      },
      vertexShader: synapseVertexShader,
      fragmentShader: synapseFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [stage]);

  useFrame((state) => {
    if (!groupRef.current || !coreRef.current || !synapseRef.current) return;

    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;
    
    // Calculate morph progress based on scroll and stage
    const morphProgress = Math.min(scrollOffset * 2 + stage * 0.2, 1);
    const activity = morphProgress * (0.5 + 0.5 * Math.sin(time * 2));

    // Update brain material uniforms
    brainMaterial.uniforms.time.value = time;
    brainMaterial.uniforms.morphProgress.value = morphProgress;
    brainMaterial.uniforms.stage.value = stage;

    // Update synapse material uniforms
    synapseMaterial.uniforms.time.value = time;
    synapseMaterial.uniforms.activity.value = activity;
    synapseMaterial.uniforms.stage.value = stage;

    // Rotation based on stage and scroll
    groupRef.current.rotation.y = time * 0.1 + scrollOffset * Math.PI * 0.5;
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.2 + scrollOffset * 0.1;
    groupRef.current.rotation.z = Math.cos(time * 0.03) * 0.1;

    // Scale animation
    const baseScale = 1 + morphProgress * 0.3;
    const pulseScale = 1 + Math.sin(time * 2) * 0.1 * activity;
    groupRef.current.scale.setScalar(baseScale * pulseScale);

    // Dynamic lighting effect
    const intensity = 0.8 + 0.4 * Math.sin(time * 3) * activity;
    if (groupRef.current.children[0] && groupRef.current.children[0].type === 'PointLight') {
      (groupRef.current.children[0] as THREE.PointLight).intensity = intensity;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Internal lighting */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#00aced" />
      
      {/* Brain core */}
      <mesh ref={coreRef} geometry={coreGeometry} material={brainMaterial} />
      
      {/* Synapse network */}
      <points ref={synapseRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={synapsePositions.length / 3}
            array={synapsePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={synapseColors.length / 3}
            array={synapseColors}
            itemSize={3}
          />
        </bufferGeometry>
        <primitive object={synapseMaterial} attach="material" />
      </points>
    </group>
  );
} 