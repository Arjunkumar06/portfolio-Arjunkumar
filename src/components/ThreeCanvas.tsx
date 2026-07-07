"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function RotatingKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.15;
    meshRef.current.rotation.y = time * 0.2;
    // Add pulsing scale on hover
    const targetScale = hovered ? 1.2 : 1;
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusKnotGeometry args={[1, 0.35, 120, 16, 2, 3]} />
      <meshStandardMaterial
        color={hovered ? "#ff007f" : "#00f0ff"}
        wireframe
        emissive={hovered ? "#ff007f" : "#00f0ff"}
        emissiveIntensity={hovered ? 0.8 : 0.4}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.02;
  });

  if (!positions) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export default function ThreeCanvas() {
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Detect WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGLSupported(support);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) {
    // Elegant fallback animation if WebGL fails
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="absolute w-[240px] h-[240px] rounded-full border border-cyber-cyan/30 animate-spin-slow flex items-center justify-center">
          <div className="w-[180px] h-[180px] rounded-full border-2 border-dashed border-cyber-pink/40 animate-pulse flex items-center justify-center">
            <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-r from-cyber-cyan/10 to-cyber-pink/10 border border-cyber-cyan animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3.8], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff007f" />
        <directionalLight position={[0, 5, 2]} intensity={0.5} />
        <RotatingKnot />
        <ParticleNetwork />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0.5} fade speed={1.5} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
