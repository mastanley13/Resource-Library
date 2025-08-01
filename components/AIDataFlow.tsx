"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

// Advanced AI Data Flow Visualization
export default function AIDataFlow() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const scroll = useScroll();

  // Advanced particle system with complex algorithms
  const { positions, connections, colors, sizes } = useMemo(() => {
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const connections = [];

    // Generate data points in multiple layers (representing data processing layers)
    for (let i = 0; i < particleCount; i++) {
      const layer = Math.floor(i / (particleCount / 6)); // 6 layers
      const layerRadius = 5 + layer * 3;
      const angle = (i / (particleCount / 6)) * Math.PI * 2;
      const height = (layer - 2.5) * 4;

      // Spiral formation with noise
      const noise = (Math.random() - 0.5) * 2;
      positions[i * 3] = Math.cos(angle + noise) * layerRadius + noise;
      positions[i * 3 + 1] = height + noise;
      positions[i * 3 + 2] = Math.sin(angle + noise) * layerRadius + noise;

      // Color based on layer (blue to cyan to white gradient)
      const hue = 0.5 + layer * 0.1;
      const saturation = 1 - layer * 0.1;
      const lightness = 0.3 + layer * 0.12;
      
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    // Create neural connections between nearby nodes
    for (let i = 0; i < particleCount; i += 3) {
      for (let j = i + 1; j < Math.min(i + 50, particleCount); j += 5) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 8 && Math.random() > 0.85) {
          connections.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    return {
      positions,
      connections: new Float32Array(connections),
      colors,
      sizes
    };
  }, []);

  // Custom vertex shader for advanced particle effects
  const vertexShader = `
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;
    varying float vSize;
    uniform float time;
    uniform float scrollProgress;
    
    void main() {
      vColor = customColor;
      vSize = size;
      
      vec3 pos = position;
      
      // Complex wave animation based on scroll
      float wave = sin(pos.x * 0.1 + time) * cos(pos.z * 0.1 + time * 0.5) * scrollProgress;
      pos.y += wave * 2.0;
      
      // Rotation based on scroll
      float angle = scrollProgress * 3.14159;
      mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      pos.xz = rotation * pos.xz;
      
      // Expansion effect
      pos *= 1.0 + scrollProgress * 2.0;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + scrollProgress);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    varying float vSize;
    uniform float time;
    uniform float scrollProgress;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      // Create glowing effect
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      alpha *= 0.8 + 0.2 * sin(time * 2.0);
      
      // Energy pulsing based on scroll
      alpha *= 0.5 + 0.5 * scrollProgress;
      
      // Color intensity based on distance from center
      vec3 color = vColor * (1.0 + scrollProgress);
      color *= 0.8 + 0.4 * alpha;
      
      gl_FragColor = vec4(color, alpha);
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
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    // Update shader uniforms
    material.uniforms.time.value = time;
    material.uniforms.scrollProgress.value = scrollOffset;

    // Complex group rotation
    groupRef.current.rotation.y = time * 0.05 + scrollOffset * Math.PI;
    groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.1 + scrollOffset * 0.2;

    // Animate particles
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const originalPositions = pointsRef.current.geometry.userData.originalPositions;
    
    if (originalPositions) {
      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];
        
        // Complex wave patterns
        const wave1 = Math.sin(x * 0.1 + time) * Math.cos(z * 0.1 + time * 0.5);
        const wave2 = Math.cos(x * 0.05 + time * 0.3) * Math.sin(z * 0.05 + time * 0.7);
        
        positions[i] = x + wave1 * scrollOffset * 2;
        positions[i + 1] = y + wave2 * scrollOffset * 3;
        positions[i + 2] = z + Math.sin(time + i * 0.01) * scrollOffset;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Animate connections with energy flow effect
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    const originalConnections = linesRef.current.geometry.userData.originalConnections;
    
    if (originalConnections) {
      for (let i = 0; i < linePositions.length; i += 6) {
        // Get original line endpoints
        const x1 = originalConnections[i];
        const y1 = originalConnections[i + 1];
        const z1 = originalConnections[i + 2];
        const x2 = originalConnections[i + 3];
        const y2 = originalConnections[i + 4];
        const z2 = originalConnections[i + 5];
        
        // Apply same transformations as particles
        const wave1_1 = Math.sin(x1 * 0.1 + time) * Math.cos(z1 * 0.1 + time * 0.5);
        const wave2_1 = Math.cos(x1 * 0.05 + time * 0.3) * Math.sin(z1 * 0.05 + time * 0.7);
        const wave1_2 = Math.sin(x2 * 0.1 + time) * Math.cos(z2 * 0.1 + time * 0.5);
        const wave2_2 = Math.cos(x2 * 0.05 + time * 0.3) * Math.sin(z2 * 0.05 + time * 0.7);
        
        linePositions[i] = x1 + wave1_1 * scrollOffset * 2;
        linePositions[i + 1] = y1 + wave2_1 * scrollOffset * 3;
        linePositions[i + 2] = z1 + Math.sin(time + i * 0.01) * scrollOffset;
        linePositions[i + 3] = x2 + wave1_2 * scrollOffset * 2;
        linePositions[i + 4] = y2 + wave2_2 * scrollOffset * 3;
        linePositions[i + 5] = z2 + Math.sin(time + (i + 3) * 0.01) * scrollOffset;
      }
      
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Scale based on scroll
    const scale = 1 + scrollOffset * 0.5;
    groupRef.current.scale.setScalar(scale);
  });

  useEffect(() => {
    if (pointsRef.current) {
      pointsRef.current.geometry.userData.originalPositions = positions.slice();
    }
    if (linesRef.current) {
      linesRef.current.geometry.userData.originalConnections = connections.slice();
    }
  }, [positions, connections]);

  return (
    <group ref={groupRef}>
      {/* Advanced Particle System */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-customColor"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <primitive object={material} attach="material" />
      </points>

      {/* Neural Network Connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          transparent
          opacity={0.15}
          color="#00aced"
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
} 