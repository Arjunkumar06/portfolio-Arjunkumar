"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { setSoundEnabled, playClickSound, playStartupSound } from "@/utils/audio";

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-sound") === "true";
    setEnabled(saved);
    setSoundEnabled(saved);
  }, []);

  const handleToggle = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    localStorage.setItem("portfolio-sound", String(nextState));
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => {
        playStartupSound();
      }, 100);
    } else {
      playClickSound();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-5 left-5 z-[999] p-3 rounded-full glass-card hover:cyber-glow-border-cyan text-cyber-cyan transition-all duration-300"
      aria-label="Toggle Sound Effects"
      title="Toggle Cyber Sound FX"
    >
      {enabled ? (
        <div className="relative">
          <Volume2 className="w-5 h-5 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-pink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-pink"></span>
          </span>
        </div>
      ) : (
        <VolumeX className="w-5 h-5 opacity-60" />
      )}
    </button>
  );
}
