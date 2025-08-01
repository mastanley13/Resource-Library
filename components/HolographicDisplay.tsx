"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Text } from "@react-three/drei";
import * as THREE from "three";

interface HolographicPanel {
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  content: string;
  type: 'data' | 'code' | 'neural' | 'analysis';
}

export default function HolographicDisplay() {
  const groupRef = useRef<THREE.Group>(null);
  const codeRainRef = useRef<THREE.Points>(null);
  const dataNodesRef = useRef<THREE.Group>(null);
  const hologramRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();
  const { mouse, viewport } = useThree();

  // Holographic panels floating in space
  const holographicPanels: HolographicPanel[] = useMemo(() => [
    {
      position: new THREE.Vector3(-10, 5, 2),
      rotation: new THREE.Vector3(0, 0.3, 0),
      content: "NEURAL PATHWAYS\nACTIVE: 98.7%\nSYNAPSES: 2.4M",
      type: 'neural'
    },
    {
      position: new THREE.Vector3(8, 3, -1),
      rotation: new THREE.Vector3(0, -0.2, 0),
      content: "DATA FLOW\nTHROUGHPUT: 15.2 GB/s\nLATENCY: 0.3ms",
      type: 'data'
    },
    {
      position: new THREE.Vector3(-6, -2, 3),
      rotation: new THREE.Vector3(0.1, 0.5, 0),
      content: "AI PROCESSING\nTASKS: 847\nEFFICIENCY: 97.3%",
      type: 'analysis'
    },
    {
      position: new THREE.Vector3(5, -4, 1),
      rotation: new THREE.Vector3(-0.1, -0.4, 0),
      content: "SYSTEM STATUS\nONLINE\nUPTIME: 99.9%",
      type: 'code'
    }
  ], []);

  // Code rain effect geometry
  const codeRainGeometry = useMemo(() => {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);
    const chars = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Distribute across the scene
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 60 - 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      velocities[i] = Math.random() * 2 + 1;
      opacities[i] = Math.random();
      chars[i] = Math.floor(Math.random() * 10); // 0-9 digits
    }
    
    return { positions, velocities, opacities, chars };
  }, []);

  // Code rain shader
  const codeRainVertexShader = `
    attribute float velocity;
    attribute float opacity;
    attribute float charIndex;
    varying float vOpacity;
    varying float vCharIndex;
    uniform float time;
    uniform float digitalRain;
    
    void main() {
      vOpacity = opacity;
      vCharIndex = charIndex;
      
      vec3 pos = position;
      
      // Falling motion
      pos.y -= time * velocity * digitalRain;
      
      // Wrap around
      if (pos.y < -30.0) {
        pos.y = 30.0;
        pos.x = (pos.x + sin(time) * 10.0);
      }
      
      // Slight horizontal drift
      pos.x += sin(time * 0.5 + pos.y * 0.1) * 0.5;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (20.0 + sin(time + charIndex) * 5.0) / -mvPosition.z;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const codeRainFragmentShader = `
    varying float vOpacity;
    varying float vCharIndex;
    uniform float time;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      alpha *= vOpacity * (0.7 + 0.3 * sin(time * 3.0 + vCharIndex));
      
      // Matrix-style green tint
      vec3 color = vec3(0.0, 1.0, 0.3);
      
      // Different brightness based on character
      float brightness = 0.3 + vCharIndex * 0.1;
      color *= brightness;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const codeRainMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        digitalRain: { value: 1.0 }
      },
      vertexShader: codeRainVertexShader,
      fragmentShader: codeRainFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);

  // Holographic panel material
  const holoPanelVertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    uniform float glitch;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      
      // Holographic distortion
      pos.x += sin(pos.y * 10.0 + time * 2.0) * glitch * 0.1;
      pos.y += cos(pos.x * 8.0 + time * 1.5) * glitch * 0.05;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const holoPanelFragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    uniform float glitch;
    uniform vec3 panelColor;
    
    void main() {
      vec2 uv = vUv;
      
      // Holographic scanlines
      float scanlines = sin(uv.y * 200.0 + time * 10.0) * 0.1;
      
      // Border glow
      vec2 center = uv - 0.5;
      float border = 1.0 - smoothstep(0.45, 0.5, max(abs(center.x), abs(center.y)));
      
      // Panel interior
      float interior = 1.0 - smoothstep(0.4, 0.45, max(abs(center.x), abs(center.y)));
      
      // Glitch effect
      float glitchLine = step(0.98, sin(uv.y * 50.0 + time * 20.0)) * glitch;
      
      vec3 color = panelColor;
      color += vec3(1.0) * border * 0.8;
      color += vec3(0.0, 1.0, 1.0) * glitchLine;
      color += scanlines;
      
      float alpha = border + interior * 0.1;
      alpha += glitchLine * 0.5;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const createPanelMaterial = (color: THREE.Vector3) => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glitch: { value: 0 },
        panelColor: { value: color }
      },
      vertexShader: holoPanelVertexShader,
      fragmentShader: holoPanelFragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });
  };

  // Data visualization nodes
  const dataNodeGeometry = useMemo(() => {
    const nodeCount = 30;
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);
    
    for (let i = 0; i < nodeCount; i++) {
      // Position in 3D space around the scene
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 12 + Math.random() * 8;
      
      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi);
      
      // Color based on data type
      const hue = 0.6 + Math.random() * 0.2;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 2 + 1;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Holographic main display
  const holoDisplayVertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform float time;
    uniform float activation;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec3 pos = position;
      
      // Holographic projection effect
      pos += normal * sin(time * 2.0 + pos.y * 0.1) * activation * 0.3;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const holoDisplayFragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform float time;
    uniform float activation;
    
    void main() {
      vec2 uv = vUv;
      
      // Holographic interference pattern
      float interference = sin(uv.x * 30.0 + time) * cos(uv.y * 30.0 + time * 0.7);
      
      // Fresnel effect
      float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
      fresnel = pow(fresnel, 2.0);
      
      // Main holographic color
      vec3 color = vec3(0.0, 0.8, 1.0) * activation;
      color += vec3(1.0) * fresnel * 0.5;
      color += interference * 0.1;
      
      // Scanning effect
      float scan = sin(uv.y * 20.0 - time * 10.0) * 0.2;
      color += scan;
      
      float alpha = 0.3 + fresnel * 0.4 + activation * 0.3;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const holoDisplayMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        activation: { value: 0 }
      },
      vertexShader: holoDisplayVertexShader,
      fragmentShader: holoDisplayFragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !codeRainRef.current || !hologramRef.current) return;

    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;
    const activation = scrollOffset;

    // Update code rain
    codeRainMaterial.uniforms.time.value = time;
    codeRainMaterial.uniforms.digitalRain.value = 0.5 + scrollOffset * 1.5;

    // Update holographic display
    holoDisplayMaterial.uniforms.time.value = time;
    holoDisplayMaterial.uniforms.activation.value = activation;

    // Rotate holographic display
    hologramRef.current.rotation.y = time * 0.1;
    hologramRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;

    // Mouse interaction with data nodes
    if (dataNodesRef.current) {
      const mouseVector = new THREE.Vector3(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      );

      dataNodesRef.current.children.forEach((node, index) => {
        if (node instanceof THREE.Mesh) {
          const distance = node.position.distanceTo(mouseVector);
          const influence = Math.max(0, 1 - distance / 10);
          
          node.scale.setScalar(1 + influence * 0.5);
          node.rotation.y = time + index * 0.1;
          node.rotation.z = time * 0.5 + influence;
        }
      });
    }

    // Group animations
    groupRef.current.rotation.y = time * 0.01;
    groupRef.current.position.y = Math.sin(time * 0.2) * 0.5;
  });

  // Panel colors for different types
  const getPanelColor = (type: string): THREE.Vector3 => {
    switch (type) {
      case 'neural': return new THREE.Vector3(0.0, 0.8, 1.0);
      case 'data': return new THREE.Vector3(0.0, 1.0, 0.3);
      case 'analysis': return new THREE.Vector3(1.0, 0.5, 0.0);
      case 'code': return new THREE.Vector3(0.8, 0.0, 1.0);
      default: return new THREE.Vector3(0.5, 0.5, 1.0);
    }
  };

  return (
    <group ref={groupRef} position={[0, 0, 5]}>
      {/* Code rain effect */}
      <points ref={codeRainRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={codeRainGeometry.positions.length / 3}
            array={codeRainGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-velocity"
            count={codeRainGeometry.velocities.length}
            array={codeRainGeometry.velocities}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-opacity"
            count={codeRainGeometry.opacities.length}
            array={codeRainGeometry.opacities}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-charIndex"
            count={codeRainGeometry.chars.length}
            array={codeRainGeometry.chars}
            itemSize={1}
          />
        </bufferGeometry>
        <primitive object={codeRainMaterial} attach="material" />
      </points>

      {/* Holographic information panels */}
      {holographicPanels.map((panel, index) => (
        <group key={index} position={panel.position.toArray()} rotation={panel.rotation.toArray()}>
          <mesh>
            <planeGeometry args={[4, 3]} />
            <primitive object={createPanelMaterial(getPanelColor(panel.type))} attach="material" />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {panel.content}
          </Text>
        </group>
      ))}

      {/* Central holographic display */}
      <mesh ref={hologramRef} position={[0, 2, 0]}>
        <cylinderGeometry args={[3, 3, 0.1, 32]} />
        <primitive object={holoDisplayMaterial} attach="material" />
      </mesh>

      {/* Data visualization nodes */}
      <group ref={dataNodesRef}>
        {[...Array(dataNodeGeometry.positions.length / 3)].map((_, i) => (
          <mesh
            key={i}
            position={[
              dataNodeGeometry.positions[i * 3],
              dataNodeGeometry.positions[i * 3 + 1],
              dataNodeGeometry.positions[i * 3 + 2]
            ]}
          >
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial
              color={new THREE.Color(
                dataNodeGeometry.colors[i * 3],
                dataNodeGeometry.colors[i * 3 + 1],
                dataNodeGeometry.colors[i * 3 + 2]
              )}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Floating UI elements */}
      {[...Array(6)].map((_, i) => (
        <group
          key={i}
          position={[
            Math.sin(i * 1.047) * 15,
            Math.cos(i * 0.8) * 3,
            Math.cos(i * 1.2) * 8
          ]}
        >
          <mesh>
            <ringGeometry args={[1, 1.2, 16]} />
            <meshBasicMaterial
              color={new THREE.Color().setHSL(0.6 + i * 0.1, 0.8, 0.5)}
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
} 