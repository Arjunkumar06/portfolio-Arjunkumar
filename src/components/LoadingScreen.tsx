"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playLoadingTick, playStartupSound } from "@/utils/audio";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [activeLog, setActiveLog] = useState("");
  const [visible, setVisible] = useState(true);

  const logs = [
    "INITIALIZING COGNITIVE INTERFACE...",
    "RESOLVING GITHUB REPOS FROM ARJUNKUMAR06...",
    "MOUNTING COMPONENT SCHEMATICS...",
    "ESTABLISHING SECURE WEB SOCKET CONNECTIONS...",
    "SPAWNING 3D COORDINATE PARTICLE GRIDS...",
    "PARSING PORTFOLIO STACK SCHEMA...",
    "INJECTING LIGHTWEIGHT WEB AUDIO SYNTHESIZERS...",
    "SYSTEM OVERLOAD AVERTED. INTERFACE STABLE.",
    "DECRYPTING CORE MODULES. LAUNCHING ARJUN-HUD..."
  ];

  useEffect(() => {
    // Increase progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 3; // Step up randomly
        return Math.min(prev + step, 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Sync logs based on progress percentage
    const logIdx = Math.min(
      Math.floor((progress / 100) * logs.length),
      logs.length - 1
    );
    setActiveLog(logs[logIdx]);
    playLoadingTick();

    if (progress === 100) {
      playStartupSound();
      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 400); // Wait for fadeout animation
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100000] bg-[#030308] flex flex-col items-center justify-center p-6 text-cyber-cyan font-mono-tech select-none"
        >
          {/* Cyber grid background inside loader */}
          <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

          {/* Loader Frame */}
          <div className="relative w-full max-w-md p-8 glass-card border border-cyber-cyan/30 rounded-lg flex flex-col gap-6 shadow-cyan-glow/20">
            {/* Tech Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-pink" />

            <div className="flex justify-between items-center text-xs tracking-wider">
              <span className="text-cyber-pink animate-pulse">SYSTEM BOOT SEQUENCING...</span>
              <span>v1.0.0-PROD</span>
            </div>

            {/* Visual Circular/Radial Scan Ring */}
            <div className="relative flex justify-center py-6">
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-cyber-cyan/20 animate-spin-slow flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-cyber-pink/30 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyber-cyan to-cyber-pink animate-ping opacity-60" />
                </div>
              </div>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-black font-orbitron tracking-tighter text-white">
                {progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyber-cyan via-cyber-pink to-cyber-purple"
                style={{ width: `${progress}%` }}
                layoutId="loaderProgress"
              />
            </div>

            {/* Diagnostic Log Terminals */}
            <div className="h-10 text-[10px] text-center text-white/60 font-semibold uppercase tracking-wider flex items-center justify-center px-2">
              <span className="animate-pulse">{activeLog}</span>
            </div>

            {/* Decrypting Hex Key mock */}
            <div className="text-[9px] text-white/20 flex justify-between uppercase">
              <span>MEM_ALLOC: 0x{progress * 4}FF02A</span>
              <span>SECTOR: GRID_{progress}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
