"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Custom hook to track scroll position
function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Convert scroll position to a normalized value (0-1)
  const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
  const normalizedScroll = Math.min(Math.max(scrollY / maxScroll, 0), 1);
  
  return {
    offset: normalizedScroll,
    scrollY
  };
}

// Mobile-optimized neural network that evolves with the story
function EvolvedNeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);
  const scroll = useScrollPosition();
  const { viewport } = useThree();

  // Professional node count - cleaner appearance
  const isMobile = viewport.width < 768;
  const nodeCount = isMobile ? 25 : 40;

  const { positions, colors, connections } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const connectionLines: number[] = [];

    // Create nodes in a more organized, professional layout
    for (let i = 0; i < nodeCount; i++) {
      const radius = 3 + Math.random() * 4; // Smaller, more focused cluster
      const theta = (i / nodeCount) * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.6 + Math.PI * 0.2; // More concentrated vertically

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Base color that will evolve
      colors[i * 3] = 0.3;     // R
      colors[i * 3 + 1] = 0.6; // G
      colors[i * 3 + 2] = 1.0; // B
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 5 && Math.random() > 0.7) {
          connectionLines.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    return {
      positions,
      colors,
      connections: new Float32Array(connectionLines)
    };
  }, [nodeCount]);

  // Smooth evolution shader for mobile optimization
  const nodeVertexShader = `
    attribute vec3 color;
    varying vec3 vColor;
    uniform float time;
    uniform float storyProgress;
    uniform float stage;
    
    void main() {
      vColor = color;
      vec3 pos = position;
      
      // Evolve the network shape based on story stage
      if (stage < 1.0) {
        // Discovery: Simple clustering
        pos *= 1.0 + storyProgress * 0.2;
      } else if (stage < 2.0) {
        // Analysis: Analytical grid formation
        float gridInfluence = (stage - 1.0);
        pos.x += sin(pos.y * 2.0) * gridInfluence * 2.0;
        pos.z += cos(pos.x * 2.0) * gridInfluence * 2.0;
      } else if (stage < 3.0) {
        // Strategy: Strategic branching
        float branchInfluence = (stage - 2.0);
        pos *= 1.0 + branchInfluence * 0.5;
        pos.y += sin(length(pos.xz) * 0.5) * branchInfluence * 3.0;
      } else if (stage < 4.0) {
        // Implementation: Dynamic expansion
        float expansionInfluence = (stage - 3.0);
        pos *= 1.0 + expansionInfluence * 0.8;
        pos += normalize(pos) * sin(time + length(pos) * 0.1) * expansionInfluence;
      } else {
        // Results: Success formation
        float successInfluence = (stage - 4.0);
        pos *= 1.0 + successInfluence * 1.2;
        pos.y += sin(time * 0.5 + pos.x * 0.1) * successInfluence * 2.0;
      }
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = ${isMobile ? '20.0' : '30.0'} / -mvPosition.z;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const nodeFragmentShader = `
    varying vec3 vColor;
    uniform float time;
    uniform float stage;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      
      // Evolve colors based on story stage
      vec3 color = vColor;
      if (stage < 1.0) {
        color = mix(vec3(0.3, 0.6, 1.0), vec3(0.2, 0.8, 1.0), stage);
      } else if (stage < 2.0) {
        color = mix(vec3(0.2, 0.8, 1.0), vec3(0.6, 0.4, 1.0), stage - 1.0);
      } else if (stage < 3.0) {
        color = mix(vec3(0.6, 0.4, 1.0), vec3(0.0, 1.0, 0.6), stage - 2.0);
      } else if (stage < 4.0) {
        color = mix(vec3(0.0, 1.0, 0.6), vec3(1.0, 0.6, 0.0), stage - 3.0);
      } else {
        color = mix(vec3(1.0, 0.6, 0.0), vec3(1.0, 0.8, 0.2), stage - 4.0);
      }
      
      alpha *= 0.9;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const nodeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        storyProgress: { value: 0 },
        stage: { value: 0 }
      },
      vertexShader: nodeVertexShader,
      fragmentShader: nodeFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [nodeVertexShader, nodeFragmentShader]);

  // Connection evolution shader
  const connectionVertexShader = `
    varying float vIntensity;
    uniform float time;
    uniform float stage;
    
    void main() {
      vIntensity = 0.5 + 0.5 * sin(time * 2.0 + position.x * 0.1);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const connectionFragmentShader = `
    varying float vIntensity;
    uniform float stage;
    
    void main() {
      vec3 color;
      if (stage < 1.0) {
        color = vec3(0.2, 0.6, 1.0);
      } else if (stage < 2.0) {
        color = vec3(0.5, 0.4, 1.0);
      } else if (stage < 3.0) {
        color = vec3(0.0, 0.8, 0.6);
      } else if (stage < 4.0) {
        color = vec3(0.8, 0.5, 0.0);
      } else {
        color = vec3(1.0, 0.7, 0.0);
      }
      
      float alpha = 0.6 * vIntensity;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const connectionMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        stage: { value: 0 }
      },
      vertexShader: connectionVertexShader,
      fragmentShader: connectionFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const scrollOffset = scroll?.offset || 0;
    const stage = scrollOffset * 5; // 0-5 representing the 5 stages

    // Update materials
    nodeMaterial.uniforms.time.value = time;
    nodeMaterial.uniforms.storyProgress.value = scrollOffset;
    nodeMaterial.uniforms.stage.value = stage;

    connectionMaterial.uniforms.time.value = time;
    connectionMaterial.uniforms.stage.value = stage;

    // Smooth rotation evolution
    groupRef.current.rotation.y = time * 0.02 + scrollOffset * Math.PI * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.01) * 0.05;

    // Scale evolution
    const baseScale = 1 + scrollOffset * 0.3;
    groupRef.current.scale.setScalar(baseScale);
  });

  return (
    <group ref={groupRef}>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <primitive object={nodeMaterial} attach="material" />
      </points>

      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <primitive object={connectionMaterial} attach="material" />
      </lineSegments>
    </group>
  );
}

// Enhanced 3D grid background component
function GridBackground() {
  const meshRef = useRef<THREE.Group>(null);
  const scroll = useScrollPosition();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll?.offset || 0;
    
    // Subtle rotation and movement
    meshRef.current.rotation.y = time * 0.005 + scrollOffset * 0.1;
    meshRef.current.position.z = -30 + Math.sin(time * 0.1) * 2;
  });

  return (
    <group ref={meshRef}>
      {/* Vertical grid planes */}
      <mesh position={[0, 0, -40]} rotation={[0, 0, 0]}>
        <planeGeometry args={[100, 100, 20, 20]} />
        <meshBasicMaterial 
          color="#00aced" 
          transparent 
          opacity={0.1} 
          wireframe 
        />
      </mesh>
      
      <mesh position={[-30, 0, -20]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[80, 80, 16, 16]} />
        <meshBasicMaterial 
          color="#9333ea" 
          transparent 
          opacity={0.08} 
          wireframe 
        />
      </mesh>
      
      <mesh position={[30, 0, -20]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[80, 80, 16, 16]} />
        <meshBasicMaterial 
          color="#06b6d4" 
          transparent 
          opacity={0.08} 
          wireframe 
        />
      </mesh>
    </group>
  );
}

// Connection lines component
function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null);
  const scroll = useScrollPosition();

  useFrame((state) => {
    if (!linesRef.current) return;
    
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll?.offset || 0;
    
    // Animate the connection lines
    linesRef.current.rotation.z = Math.sin(time * 0.1) * 0.1;
    linesRef.current.scale.setScalar(1 + scrollOffset * 0.2);
  });

  // Create connection lines between nodes
  const connectionPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const nodeCount = 8;
    
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.7) { // Only connect some nodes
          const radius1 = 15;
          const radius2 = 15;
          
          const pos1 = new THREE.Vector3(
            Math.sin((i / nodeCount) * Math.PI * 2) * radius1,
            Math.cos((i / nodeCount) * Math.PI * 3) * 10,
            Math.sin((i / nodeCount) * Math.PI * 4) * 10
          );
          
          const pos2 = new THREE.Vector3(
            Math.sin((j / nodeCount) * Math.PI * 2) * radius2,
            Math.cos((j / nodeCount) * Math.PI * 3) * 10,
            Math.sin((j / nodeCount) * Math.PI * 4) * 10
          );
          
          points.push(pos1, pos2);
        }
      }
    }
    
    return points;
  }, []);

  return (
    <group ref={linesRef}>
      {connectionPoints.length > 0 && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={connectionPoints.length}
              array={new Float32Array(connectionPoints.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color="#00aced" 
            transparent 
            opacity={0.4}
          />
        </line>
      )}
    </group>
  );
}

// Evolving background that transforms with the story
function EvolvedBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScrollPosition();
  const { viewport } = useThree();

  const isMobile = viewport.width < 768;

  const geometry = useMemo(() => 
    new THREE.PlaneGeometry(60, 60, isMobile ? 30 : 50, isMobile ? 30 : 50), 
    [isMobile]
  );

  const vertexShader = `
    varying vec2 vUv;
    uniform float time;
    uniform float storyStage;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Background evolves based on story stage
      float wave = sin(pos.x * 0.05 + time * 0.3) * cos(pos.y * 0.05 + time * 0.2);
      pos.z += wave * (0.5 + storyStage * 0.5);
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform float time;
    uniform float storyStage;
    
    void main() {
      vec2 uv = vUv;
      
      // Background evolves based on story stage with professional colors
      vec3 color1 = vec3(0.02, 0.08, 0.15); // Discovery - Deep blue
      vec3 color2 = vec3(0.08, 0.02, 0.18); // Analysis - Deep purple
      vec3 color3 = vec3(0.02, 0.12, 0.08); // Strategy - Deep teal
      vec3 color4 = vec3(0.15, 0.08, 0.02); // Implementation - Deep orange
      vec3 color5 = vec3(0.12, 0.12, 0.02); // Results - Deep gold
      
      vec3 finalColor;
      if (storyStage < 1.0) {
        finalColor = mix(color1, color2, storyStage);
      } else if (storyStage < 2.0) {
        finalColor = mix(color2, color3, storyStage - 1.0);
      } else if (storyStage < 3.0) {
        finalColor = mix(color3, color4, storyStage - 2.0);
      } else if (storyStage < 4.0) {
        finalColor = mix(color4, color5, storyStage - 3.0);
      } else {
        finalColor = color5;
      }
      
      // Add subtle depth patterns
      float pattern = sin(uv.x * 15.0 + time * 0.5) * cos(uv.y * 15.0 + time * 0.3) * 0.015;
      finalColor += pattern;
      
      gl_FragColor = vec4(finalColor, 0.5);
    }
  `;

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        storyStage: { value: 0 }
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
    const scrollOffset = scroll?.offset || 0;

    material.uniforms.time.value = time;
    material.uniforms.storyStage.value = scrollOffset * 5;

    meshRef.current.rotation.z = time * 0.003;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -30]} geometry={geometry} material={material} />
  );
}

// Main evolved scene component
export default function EvolvedScene() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScrollPosition();
  const { viewport } = useThree();

  const isMobile = viewport.width < 768;

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const scrollOffset = scroll?.offset || 0;

    // Subtle, professional camera movement
    const cameraZ = 15 - scrollOffset * 1;
    const cameraY = Math.sin(scrollOffset * Math.PI * 0.5) * 0.5;

    state.camera.position.lerp(new THREE.Vector3(0, cameraY, cameraZ), 0.02);
    state.camera.lookAt(0, 0, 0);

    // Very gentle scene rotation
    groupRef.current.rotation.y = time * 0.005;
  });

  return (
    <group ref={groupRef}>
      {/* Clean, professional lighting */}
      <ambientLight intensity={isMobile ? 0.4 : 0.3} color="#0f0f23" />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={isMobile ? 1.0 : 1.5} 
        color="#ffffff"
      />
      <pointLight 
        position={[0, 0, 8]} 
        intensity={isMobile ? 2.0 : 3.0} 
        color="#00aced"
        distance={25}
      />

      {/* Simple, clean background */}
      <EvolvedBackground />

      {/* Main neural network - zoomed in and focused */}
      <group position={[0, 0, 2]} scale={[1.5, 1.5, 1.5]}>
        <EvolvedNeuralNetwork />
      </group>



      {/* Minimal floating accent nodes */}
      {[...Array(isMobile ? 3 : 5)].map((_, i) => {
        const radius = isMobile ? 8 : 12;
        return (
          <mesh
            key={i}
            position={[
              Math.sin((i / (isMobile ? 3 : 5)) * Math.PI * 2) * radius,
              Math.cos((i / (isMobile ? 3 : 5)) * Math.PI * 2) * 4,
              Math.sin((i / (isMobile ? 3 : 5)) * Math.PI * 1.5) * 6
            ]}
          >
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshBasicMaterial
              color={new THREE.Color().setHSL(0.55, 0.7, 0.8)}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
} 