"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

export default function AnimatedScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y = scroll.offset * Math.PI * 2;
  });

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    return scroll.subscribe(() => {
      if (scroll.offset > 0.8) {
        gsap.to(mesh.scale, { x: 5, y: 5, z: 5, duration: 1 });
        gsap.to(mesh.material as THREE.Material, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            mesh.visible = false;
          },
        });
      }
    });
  }, [scroll]);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial transparent opacity={1} color="orange" />
    </mesh>
  );
}
