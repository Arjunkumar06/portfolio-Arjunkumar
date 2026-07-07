"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const pinRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.08;
    }
  });

  return (
    <group>
      {/* Globe Sphere Wireframe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          emissive="#005577"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
        {/* Glowing Pin location for Tamil Nadu, India (~11° N, ~78° E) */}
        {/* Spherical coordinate translation: x = r * cos(lat) * sin(lon), etc. */}
        <mesh ref={pinRef} position={[0.2, 0.4, 1.3]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>
      </mesh>

      {/* Pulsing ring around the pin */}
      <mesh position={[0.2, 0.4, 1.3]}>
        <ringGeometry args={[0.1, 0.2, 16]} />
        <meshBasicMaterial color="#ff007f" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function Globe() {
  const [webGLSupported, setWebGLSupported] = useState(true);

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
    // Return a futuristic radar graphic as fallback
    return (
      <div className="w-full h-full flex items-center justify-center relative bg-cyber-dark/40 rounded-2xl border border-white/5">
        <div className="w-48 h-48 rounded-full border border-cyber-pink/30 animate-ping absolute" />
        <div className="w-36 h-36 rounded-full border border-cyber-cyan/40 animate-pulse absolute flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-cyber-cyan animate-spin-slow flex items-center justify-center">
            <span className="text-[10px] font-mono-tech text-cyber-cyan animate-pulse">GRID_LOC</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[320px] md:h-[400px]">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
        <RotatingGlobe />
      </Canvas>
    </div>
  );
}
