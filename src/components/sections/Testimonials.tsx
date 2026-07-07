"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/config/portfolioData";
import { playHoverSound, playClickSound } from "@/utils/audio";

export default function Testimonials() {
  const testimonials = portfolioData.testimonials;
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    playClickSound();
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playClickSound();
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-cyber-dark/40 border-t border-white/5">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[400px] h-[400px] bg-cyber-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono-tech text-cyber-pink uppercase tracking-widest mb-2">Systems.getFeedback()</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight">
            Recommendations
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-2xl mx-auto relative px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 rounded-2xl border border-white/10 hover:border-cyber-pink/30 relative text-center flex flex-col items-center gap-6 shadow-pink-glow/5"
            >
              {/* Tech Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyber-pink" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyber-cyan" />

              <div className="p-3 bg-white/5 rounded-full text-cyber-pink relative">
                <Quote className="w-8 h-8 rotate-185" />
              </div>

              <p className="text-white/80 text-sm sm:text-base italic leading-relaxed">
                &quot;{testimonials[index].quote}&quot;
              </p>

              <div>
                <h4 className="text-base font-bold font-orbitron text-cyber-cyan">{testimonials[index].author}</h4>
                <p className="text-xs text-white/40 font-mono-tech mt-1">
                  {testimonials[index].role} <span className="text-cyber-pink">@</span> {testimonials[index].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              onMouseEnter={playHoverSound}
              className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:border-cyber-pink hover:bg-cyber-pink/10 text-white transition-all clickable"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={playHoverSound}
              className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:border-cyber-pink hover:bg-cyber-pink/10 text-white transition-all clickable"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
