"use client";

import { useEffect, useState, useRef } from "react";
import { Award, Medal, Landmark, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/config/portfolioData";
import { playHoverSound, playClickSound } from "@/utils/audio";

interface CounterProps {
  value: number;
  duration?: number;
  decimals?: number;
}

function CountUp({ value, duration = 1.5, decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentVal = progress * value;
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

export default function Achievements() {
  const certifications = portfolioData.certifications;
  const achievements = portfolioData.achievements;

  const stats = [
    { label: "CGPA (CSE)", value: 8.24, prefix: "", suffix: "", decimals: 2, icon: Landmark, color: "text-cyber-cyan" },
    { label: "LeetCode SQL Solved", value: 50, prefix: "", suffix: "+", decimals: 0, icon: Medal, color: "text-cyber-pink" },
    { label: "Certifications Earned", value: 4, prefix: "0", suffix: "", decimals: 0, icon: Award, color: "text-cyber-purple" },
    { label: "System Uptime", value: 99.9, prefix: "", suffix: "%", decimals: 1, icon: Sparkles, color: "text-green-400" },
  ];

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-cyber-dark/40 border-t border-white/5">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-96 h-96 bg-cyber-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono-tech text-cyber-cyan uppercase tracking-widest mb-2">Systems.getAchievements()</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight">
            Awards & <span className="bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent">Certifications</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        </div>

        {/* Counters / Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-cyber-cyan/30 text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.03]"
              >
                <div className={`p-3 rounded-full bg-white/5 mb-3 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black font-orbitron text-white">
                  {stat.prefix}
                  <CountUp value={stat.value} decimals={stat.decimals} />
                  {stat.suffix}
                </h3>
                <span className="text-[10px] text-white/40 font-mono-tech mt-2 tracking-wider uppercase">{stat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Grid layout for Certificates & bullet list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Certifications cards */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold font-orbitron tracking-wider text-white mb-6 uppercase flex items-center gap-2">
              <Award className="w-5 h-5 text-cyber-cyan" />
              <span>Verified Certificates</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="glass-card p-5 rounded-xl border border-white/5 hover:border-cyber-pink/30 hover:scale-[1.02] transition-all duration-300 relative group flex flex-col justify-between clickable"
                >
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-pink opacity-50 group-hover:opacity-100" />
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono-tech text-cyber-pink uppercase tracking-widest">
                      {cert.issuer}
                    </span>
                    <h4 className="text-sm font-bold font-orbitron text-white leading-snug group-hover:text-cyber-pink transition-colors">
                      {cert.title}
                    </h4>
                  </div>
                  {cert.date && (
                    <span className="text-[10px] text-white/30 font-mono-tech mt-4 block">
                      Date Issued: {cert.date}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements list */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold font-orbitron tracking-wider text-white mb-6 uppercase flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyber-pink" />
              <span>Core Accomplishments</span>
            </h3>

            <div className="glass-card p-6 rounded-2xl border border-white/10 relative h-full">
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-cyber-cyan" />
              <ul className="space-y-4">
                {achievements.map((ach, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-3 text-xs sm:text-sm text-white/70 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyber-cyan mt-0.5 flex-shrink-0" />
                    <span>{ach}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
