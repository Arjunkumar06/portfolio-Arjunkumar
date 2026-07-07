"use client";

import Image from "next/image";
import { BookOpen, Award, Layers, Rocket, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/config/portfolioData";
import { playHoverSound, playClickSound } from "@/utils/audio";

export default function About() {
  const stats = [
    { label: "Years Learning", value: "3+", icon: BookOpen, color: "text-cyber-cyan" },
    { label: "Projects Built", value: "4", icon: Rocket, color: "text-cyber-pink" },
    { label: "Certifications", value: "4+", icon: Award, color: "text-cyber-purple" },
    { label: "Tech Mastered", value: "3", icon: Layers, color: "text-amber-400" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-cyber-dark/40 border-t border-white/5">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-cyber-pink/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono-tech text-cyber-cyan uppercase tracking-widest mb-2">System.getDetails()</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight">
            About <span className="bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Glassmorphic Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group p-1 rounded-2xl bg-gradient-to-tr from-cyber-cyan/30 via-transparent to-cyber-pink/30 border border-white/10 glass-card max-w-sm w-full overflow-hidden shadow-cyan-glow/5">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-cyan" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-pink" />

              <div className="relative h-96 w-full bg-cyber-dark overflow-hidden rounded-xl">
                <Image
                  src={portfolioData.personalInfo.profileImage}
                  alt={portfolioData.personalInfo.name}
                  fill
                  className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                {/* Visual Scanner effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/10 to-transparent h-1/2 w-full top-0 animate-[bounce_4s_infinite] pointer-events-none border-b border-cyber-cyan/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Bottom Overlay stats */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end text-left">
                  <h3 className="text-xl font-bold font-orbitron text-white">{portfolioData.personalInfo.name}</h3>
                  <p className="text-xs text-cyber-cyan font-mono-tech mt-1">{portfolioData.personalInfo.title}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio & Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="glass-card p-6 rounded-2xl border border-white/10 relative">
              <div className="absolute top-0 right-4 -translate-y-1/2 px-3 py-0.5 bg-cyber-pink/20 border border-cyber-pink/40 text-cyber-pink text-[10px] font-mono-tech rounded">
                BIOGRAPHY
              </div>
              <h3 className="text-lg font-bold font-orbitron tracking-wider text-white mb-4 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-cyber-pink" />
                <span>Mission Statement</span>
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                I am a computer science engineering student specializing in frontend development and user interface design. I strive to create high-performing, accessible, and futuristic visual experiences. Combining code with modular structure, I specialize in bringing designs to life using React, Java, and modern CSS environments.
              </p>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-4">
                My objective is to push boundaries by building products that have concrete utility, clean system architectures, and optimized data workflows. Let&apos;s build the future together.
              </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className="glass-card p-4 rounded-xl border border-white/5 hover:border-white/20 text-center flex flex-col items-center justify-center transition-all duration-300 group hover:scale-[1.03] clickable"
                  >
                    <Icon className={`w-6 h-6 mb-2 ${stat.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-2xl font-black font-orbitron text-white">{stat.value}</span>
                    <span className="text-[10px] text-white/40 font-mono-tech mt-1 tracking-wider uppercase">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
