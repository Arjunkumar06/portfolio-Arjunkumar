"use client";

import { useState } from "react";
import { Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/config/portfolioData";
import { playHoverSound, playClickSound } from "@/utils/audio";

function SkillIcon({ name }: { name: string }) {
  const normName = name.toLowerCase();

  if (normName.includes("react")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 animate-[spin_12s_linear_infinite] text-cyber-cyan">
        <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(0, 12, 12)" />
        <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60, 12, 12)" />
        <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120, 12, 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (normName.includes("html") || normName.includes("css")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-cyber-cyan">
        <path d="M12 2L2 5l1.5 14 8.5 3 8.5-3L22 5z" />
        <path d="M12 2v20l8.5-3L22 5z" fill="currentColor" className="opacity-15" />
      </svg>
    );
  }

  if (normName.includes("javascript") || normName.includes("js")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-cyber-cyan">
        <rect width="20" height="20" x="2" y="2" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="6" y="15" fill="currentColor" fontSize="9" fontWeight="black" fontFamily="monospace">JS</text>
      </svg>
    );
  }

  if (normName.includes("java")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-cyber-cyan">
        <path d="M17 8h1a3 3 0 0 1 0 6h-1" />
        <path d="M3 8h13v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
        <path d="M6 2v2M10 2v2M13 2v2" />
      </svg>
    );
  }

  if (normName.includes("mysql") || normName.includes("dbms") || normName.includes("database")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-cyber-cyan">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    );
  }

  if (normName.includes("figma")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-cyber-cyan">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
        <path d="M12 9V2h3.5A3.5 3.5 0 0 1 19 5.5 3.5 3.5 0 0 1 15.5 9H12z" />
        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
        <path d="M12 16v6H8.5A3.5 3.5 0 0 1 5 18.5a3.5 3.5 0 0 1 3.5-3.5H12z" />
        <path d="M19 12.5a3.5 3.5 0 0 1-3.5 3.5H12V9h3.5a3.5 3.5 0 0 1 3.5 3.5z" />
      </svg>
    );
  }

  if (normName.includes("design") || normName.includes("ui/ux")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-cyber-cyan">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M12 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM6 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" />
      </svg>
    );
  }

  if (normName.includes("sap")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-cyber-cyan">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="4" y="14" fill="currentColor" fontSize="7" fontWeight="black" fontFamily="monospace">SAP</text>
      </svg>
    );
  }

  if (normName.includes("git")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-cyber-cyan">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M6 9v6M9 15l9-3" />
      </svg>
    );
  }

  if (normName.includes("vs code") || normName.includes("code")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-cyber-cyan">
        <path d="M17 3l-8 5-4-3-2 2 5 5-5 5 2 2 4-3 8 5V3z" />
      </svg>
    );
  }

  if (normName.includes("cloud")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-cyber-cyan">
        <path d="M17.5 19A5.5 5.5 0 0 0 18 8.02A7.5 7.5 0 0 0 3.5 11.5A5.5 5.5 0 0 0 4.5 22h13a4.5 4.5 0 0 0 0-9z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-cyber-cyan">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export default function Skills() {
  const skillCategories = portfolioData.skills;
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-cyber-dark/40 border-t border-white/5">
      {/* Backdrops */}
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-purple/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating particles background representation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-2 h-2 bg-cyber-cyan rounded-full opacity-30 shadow-cyan-glow"
        />
        <motion.div
          animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-12 w-3.5 h-3.5 bg-cyber-pink rounded-full opacity-20 shadow-pink-glow"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-xs font-mono-tech text-cyber-cyan uppercase tracking-widest mb-2">Systems.getMatrix()</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight">
            Technical <span className="bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        </div>

        {/* Categories Tab selector */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap font-mono-tech text-sm">
          {skillCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(idx);
                playClickSound();
              }}
              onMouseEnter={playHoverSound}
              className={`px-5 py-2.5 rounded-lg border transition-all duration-300 flex items-center gap-2 clickable ${
                activeCategory === idx
                  ? "bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 border-cyber-cyan text-cyber-cyan shadow-cyan-glow/20"
                  : "bg-white/5 border-white/10 hover:border-white/20 text-white/60"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skill grid with card items */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {skillCategories[activeCategory].skills.map((skill, idx) => {
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onMouseEnter={playHoverSound}
                    className="glass-card p-6 rounded-2xl border border-white/5 hover:border-cyber-cyan/40 text-center flex flex-col items-center justify-center group transition-all duration-300 hover:scale-[1.04]"
                  >
                    {/* Visual Tech Emblem */}
                    <div className="w-14 h-14 mb-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyber-cyan/50 flex items-center justify-center text-cyber-cyan group-hover:text-cyber-pink transition-all duration-300 relative">
                      <SkillIcon name={skill.name} />
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyber-cyan group-hover:border-cyber-pink opacity-50" />
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-sm font-bold font-orbitron text-white/95 tracking-wide">
                      {skill.name}
                    </h3>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
