"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Code } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/config/portfolioData";
import { playClickSound, playHoverSound } from "@/utils/audio";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Dynamically import ThreeCanvas to prevent server-side rendering errors
const ThreeCanvas = dynamic(() => import("../ThreeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-dashed border-cyber-cyan animate-spin"></div>
    </div>
  ),
});

export default function Hero() {
  const [typingText, setTypingText] = useState("");
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const subtitles = portfolioData.personalInfo.subtitles;
  const TYPING_SPEED = 100;
  const DELETING_SPEED = 50;
  const DELAY_BETWEEN = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = subtitles[subtitleIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypingText((prev) => prev.slice(0, -1));
      }, DELETING_SPEED);
    } else {
      timer = setTimeout(() => {
        setTypingText(currentFullText.slice(0, typingText.length + 1));
      }, TYPING_SPEED);
    }

    // Handle full string typed
    if (!isDeleting && typingText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), DELAY_BETWEEN);
    }
    // Handle full string deleted
    else if (isDeleting && typingText === "") {
      setIsDeleting(false);
      setSubtitleIdx((prev) => (prev + 1) % subtitles.length);
    }

    return () => clearTimeout(timer);
  }, [typingText, isDeleting, subtitleIdx, subtitles]);

  const handleActionClick = (targetId: string) => {
    playClickSound();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socials = [
    { icon: GithubIcon, href: portfolioData.personalInfo.github, label: "GitHub", color: "hover:text-white" },
    { icon: LinkedinIcon, href: portfolioData.personalInfo.linkedin, label: "LinkedIn", color: "hover:text-cyber-blue" },
    { icon: Code, href: portfolioData.personalInfo.leetcode, label: "LeetCode", color: "hover:text-amber-500" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-cyber-dark/30 pt-16"
    >
      {/* Background cyber grid & scanlines */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cyber-cyan/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 items-center">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono-tech w-max">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
            <span>Full Stack Developer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-orbitron">
            <span className="bg-gradient-to-r from-cyber-cyan via-cyber-pink to-cyber-purple bg-clip-text text-transparent cyber-glow-cyan">
              {portfolioData.personalInfo.name}
            </span>
          </h1>

          {/* Typing Subtitle */}
          <div className="h-8 flex items-center">
            <p className="text-lg sm:text-xl font-mono-tech text-white/80">
              <span className="text-cyber-pink">&gt; </span>
              {typingText}
              <span className="inline-block w-2.5 h-5 ml-1 bg-cyber-cyan animate-typing-cursor border-l-2"></span>
            </p>
          </div>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
            {portfolioData.personalInfo.objective}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => handleActionClick("projects")}
              onMouseEnter={playHoverSound}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:cyber-glow-border-cyan text-black font-semibold text-sm font-mono-tech transition-all flex items-center gap-2 clickable"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>


            <button
              onClick={() => handleActionClick("contact")}
              onMouseEnter={playHoverSound}
              className="px-6 py-3 rounded-lg border border-white/20 hover:border-cyber-cyan bg-white/5 hover:bg-cyber-cyan/15 text-white font-semibold text-sm font-mono-tech transition-all flex items-center gap-2 clickable"
            >
              <span>Contact Me</span>
            </button>
          </div>

          {/* Social Icons with hover glow */}
          <div className="flex items-center gap-6 pt-6">
            <span className="text-xs font-mono-tech text-white/40 uppercase tracking-widest">Connect:</span>
            <div className="flex gap-4">
              {socials.map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClickSound()}
                    onMouseEnter={playHoverSound}
                    className={`p-2 rounded-lg bg-white/5 border border-white/10 ${soc.color} transition-all duration-300 hover:scale-110 hover:border-current clickable`}
                    aria-label={soc.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right 3D Object Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:col-span-5 h-[350px] lg:h-[500px] w-full relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 to-cyber-pink/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
          <ThreeCanvas />
        </motion.div>
      </div>

      {/* Down arrow link */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono-tech uppercase tracking-widest text-white/50">Scroll Down</span>
        <div className="w-1.5 h-6 rounded-full border border-white/30 relative flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 bg-cyber-cyan rounded-full absolute top-1"
          />
        </div>
      </div>
    </section>
  );
}
