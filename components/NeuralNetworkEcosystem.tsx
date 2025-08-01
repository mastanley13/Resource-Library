"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

interface NeuralNode {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  connections: number[];
  energy: number;
  pulsePhase: number;
}

export default function NeuralNetworkEcosystem() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);
  const metaballsRef = useRef<THREE.Mesh[]>([]);
  const scroll = useScroll();
  const { mouse, viewport } = useThree();
  
  // Enhanced neural network with more organic behavior
  const { nodes, nodePositions, nodeColors, connectionLines, energyPulses } = useMemo(() => {
    const nodeCount = 150;
    const nodes: NeuralNode[] = [];
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);
    const connectionLines: number[] = [];
    const energyPulses: number[] = [];
    
    // Create nodes in organic clusters
    for (let i = 0; i < nodeCount; i++) {
      // Create organic clustering patterns
      const cluster = Math.floor(i / 25);
      const clusterAngle = (cluster / 6) * Math.PI * 2;
      const clusterRadius = 8 + cluster * 3;
      const localAngle = (i % 25) * 0.25;
      const localRadius = Math.random() * 4 + 2;
      
      const x = Math.cos(clusterAngle) * clusterRadius + Math.cos(localAngle) * localRadius;
      const y = Math.sin(localAngle) * localRadius + (Math.random() - 0.5) * 6;
      const z = Math.sin(clusterAngle) * clusterRadius + Math.cos(localAngle) * localRadius;
      
      const position = new THREE.Vector3(x, y, z);
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
      
      nodes.push({
        position,
        velocity,
        connections: [],
        energy: Math.random(),
        pulsePhase: Math.random() * Math.PI * 2
      });
      
      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;
      
      // Dynamic colors based on energy and cluster
      const hue = 0.55 + cluster * 0.05 + Math.random() * 0.1;
      const saturation = 0.8 + Math.random() * 0.2;
      const lightness = 0.3 + Math.random() * 0.4;
      
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      nodeColors[i * 3] = color.r;
      nodeColors[i * 3 + 1] = color.g;
      nodeColors[i * 3 + 2] = color.b;
    }
    
    // Create organic connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        
        if (distance < 6 && Math.random() > 0.7) {
          nodes[i].connections.push(j);
          nodes[j].connections.push(i);
          
          connectionLines.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );
          
          // Add energy pulse data
          energyPulses.push(Math.random(), Math.random() * Math.PI * 2);
        }
      }
    }
    
    return {
      nodes,
      nodePositions,
      nodeColors,
      connectionLines: new Float32Array(connectionLines),
      energyPulses: new Float32Array(energyPulses)
    };
  }, []);

  // Advanced organic node shader
  const nodeVertexShader = `
    attribute vec3 customColor;
    attribute float energy;
    varying vec3 vColor;
    varying float vEnergy;
    uniform float time;
    uniform vec2 mouse;
    uniform float mouseInfluence;
    
    void main() {
      vColor = customColor;
      vEnergy = energy;
      
      vec3 pos = position;
      
      // Mouse interaction - organic attraction/repulsion
      vec3 mousePos = vec3(mouse.x * 10.0, mouse.y * 10.0, 0.0);
      vec3 mouseDirection = pos - mousePos;
      float mouseDistance = length(mouseDirection);
      
      if (mouseDistance < 15.0) {
        float influence = (15.0 - mouseDistance) / 15.0;
        pos += normalize(mouseDirection) * influence * mouseInfluence * 2.0;
      }
      
      // Organic breathing motion
      float breathe = sin(time * 0.5 + pos.x * 0.1) * cos(time * 0.3 + pos.z * 0.1);
      pos += normalize(pos) * breathe * 0.5;
      
      // Energy-based pulsing
      pos *= 1.0 + energy * sin(time * 3.0 + length(pos) * 0.2) * 0.1;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (50.0 + energy * 30.0) / -mvPosition.z;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const nodeFragmentShader = `
    varying vec3 vColor;
    varying float vEnergy;
    uniform float time;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      // Organic, pulsing alpha
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      alpha *= 0.8 + 0.4 * sin(time * 2.0 + vEnergy * 10.0);
      
      // Energy-based inner glow
      float innerGlow = 1.0 - smoothstep(0.0, 0.3, dist);
      vec3 color = vColor + vec3(1.0) * innerGlow * vEnergy;
      
      // Synaptic firing effect
      float firing = step(0.95, sin(time * 5.0 + vEnergy * 20.0));
      color += vec3(1.0, 1.0, 0.8) * firing * 0.8;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const nodeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2() },
        mouseInfluence: { value: 1.0 }
      },
      vertexShader: nodeVertexShader,
      fragmentShader: nodeFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);

  // Living connection shader with energy flow
  const connectionVertexShader = `
    attribute float pulsePhase;
    varying float vPulsePhase;
    uniform float time;
    
    void main() {
      vPulsePhase = pulsePhase;
      
      vec3 pos = position;
      
      // Organic wave along connections
      float wave = sin(time * 2.0 + pulsePhase) * 0.1;
      pos += normalize(cross(pos, vec3(0.0, 1.0, 0.0))) * wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const connectionFragmentShader = `
    varying float vPulsePhase;
    uniform float time;
    
    void main() {
      // Energy pulse traveling along connection
      float pulse = sin(time * 4.0 + vPulsePhase * 10.0);
      pulse = smoothstep(-0.8, 1.0, pulse);
      
      vec3 baseColor = vec3(0.2, 0.8, 1.0);
      vec3 pulseColor = vec3(1.0, 0.8, 0.4);
      
      vec3 color = mix(baseColor, pulseColor, pulse);
      float alpha = 0.3 + pulse * 0.7;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const connectionMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: connectionVertexShader,
      fragmentShader: connectionFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      linewidth: 2
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !nodesRef.current || !connectionsRef.current) return;

    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;
    
    // Update mouse position
    nodeMaterial.uniforms.mouse.value.set(mouse.x * viewport.width, mouse.y * viewport.height);
    nodeMaterial.uniforms.mouseInfluence.value = 0.5 + scrollOffset * 1.5;

    // Update materials
    nodeMaterial.uniforms.time.value = time;
    connectionMaterial.uniforms.time.value = time;

    // Organic group movement
    groupRef.current.rotation.y = time * 0.02 + scrollOffset * Math.PI * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
    groupRef.current.rotation.z = Math.cos(time * 0.025) * 0.05;

    // Update node positions with organic movement
    const positions = nodesRef.current.geometry.attributes.position.array as Float32Array;
    const energies = nodesRef.current.geometry.attributes.energy?.array as Float32Array;
    
    if (energies) {
      for (let i = 0; i < positions.length; i += 3) {
        const nodeIndex = i / 3;
        const node = nodes[nodeIndex];
        
        if (node) {
          // Organic movement
          node.velocity.add(new THREE.Vector3(
            (Math.random() - 0.5) * 0.001,
            (Math.random() - 0.5) * 0.001,
            (Math.random() - 0.5) * 0.001
          ));
          
          // Damping
          node.velocity.multiplyScalar(0.98);
          
          // Update position
          node.position.add(node.velocity);
          
          // Boundary constraints with organic bounce
          const maxDistance = 20;
          if (node.position.length() > maxDistance) {
            node.position.normalize().multiplyScalar(maxDistance);
            node.velocity.reflect(node.position.normalize());
          }
          
          positions[i] = node.position.x;
          positions[i + 1] = node.position.y;
          positions[i + 2] = node.position.z;
          
          // Update energy
          node.energy = 0.3 + 0.7 * Math.sin(time * 2 + nodeIndex * 0.1) * 0.5 + 0.5;
          energies[nodeIndex] = node.energy;
        }
      }
      
      nodesRef.current.geometry.attributes.position.needsUpdate = true;
      nodesRef.current.geometry.attributes.energy.needsUpdate = true;
    }

    // Update connections to follow nodes
    const connectionPositions = connectionsRef.current.geometry.attributes.position.array as Float32Array;
    let connectionIndex = 0;
    
    for (let i = 0; i < nodes.length; i++) {
      for (const connectionTarget of nodes[i].connections) {
        if (connectionIndex < connectionPositions.length && connectionTarget > i) {
          connectionPositions[connectionIndex * 6] = nodes[i].position.x;
          connectionPositions[connectionIndex * 6 + 1] = nodes[i].position.y;
          connectionPositions[connectionIndex * 6 + 2] = nodes[i].position.z;
          connectionPositions[connectionIndex * 6 + 3] = nodes[connectionTarget].position.x;
          connectionPositions[connectionIndex * 6 + 4] = nodes[connectionTarget].position.y;
          connectionPositions[connectionIndex * 6 + 5] = nodes[connectionTarget].position.z;
          connectionIndex++;
        }
      }
    }
    
    connectionsRef.current.geometry.attributes.position.needsUpdate = true;

    // Dynamic scaling based on scroll
    const scale = 1 + scrollOffset * 0.3;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {/* Enhanced nodes with organic behavior */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-customColor"
            count={nodeColors.length / 3}
            array={nodeColors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-energy"
            count={nodes.length}
            array={new Float32Array(nodes.map(n => n.energy))}
            itemSize={1}
          />
        </bufferGeometry>
        <primitive object={nodeMaterial} attach="material" />
      </points>

      {/* Living neural connections */}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connectionLines.length / 3}
            array={connectionLines}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-pulsePhase"
            count={energyPulses.length / 2}
            array={energyPulses.filter((_, i) => i % 2 === 1)}
            itemSize={1}
          />
        </bufferGeometry>
        <primitive object={connectionMaterial} attach="material" />
      </lineSegments>

      {/* Organic metaballs around key nodes */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 1.2) * 8,
            Math.cos(i * 0.8) * 4,
            Math.sin(i * 1.5) * 6
          ]}
        >
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(0.6 + i * 0.1, 0.8, 0.4)}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
} 