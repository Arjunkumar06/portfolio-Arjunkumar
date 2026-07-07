"use client";

import { Briefcase, MapPin, Calendar, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/config/portfolioData";
import { playHoverSound, playClickSound } from "@/utils/audio";

export default function Experience() {
  const experiences = portfolioData.experiences;

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-cyber-dark/20 border-t border-white/5">
      {/* Background FX */}
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />
      <div className="absolute right-0 bottom-10 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono-tech text-cyber-pink uppercase tracking-widest mb-2">History.fetchLog()</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight">
            Work <span className="bg-gradient-to-r from-cyber-pink to-cyber-purple bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyber-pink to-cyber-purple mt-4 rounded-full" />
        </div>

        {/* Timeline container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical central path line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />
          {/* Glowing active path line filler */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-pink to-transparent -translate-x-1/2 pointer-events-none shadow-cyan-glow" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-stretch ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline point indicator */}
                  <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      onClick={playClickSound}
                      className="w-8 h-8 rounded-full bg-cyber-dark border-2 border-cyber-pink flex items-center justify-center shadow-pink-glow/50 clickable"
                    >
                      <Briefcase className="w-4 h-4 text-cyber-pink" />
                    </motion.div>
                  </div>

                  {/* Left spacer for desktop */}
                  <div className="hidden sm:block w-1/2" />

                  {/* Right/Left content card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    onMouseEnter={playHoverSound}
                    className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8 mt-1"
                  >
                    <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyber-cyan/40 transition-all duration-300 relative group">
                      {/* Tech Corner Accent */}
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyber-pink opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex flex-col gap-1 mb-4">
                        <span className="text-[10px] font-mono-tech text-cyber-cyan uppercase tracking-wider">
                          {exp.date}
                        </span>
                        <h3 className="text-xl font-bold font-orbitron text-white group-hover:text-cyber-cyan transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50 font-mono-tech mt-1">
                          <span className="flex items-center gap-1">
                            <span className="text-cyber-pink">@</span> {exp.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-cyber-pink" /> {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Bullet points list */}
                      <ul className="space-y-2">
                        {exp.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex gap-2.5 text-xs sm:text-sm text-white/70 leading-relaxed">
                            <CheckSquare className="w-4 h-4 mt-0.5 text-cyber-cyan flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
