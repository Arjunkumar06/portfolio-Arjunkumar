"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import { Terminal } from "lucide-react";
import { playClickSound } from "@/utils/audio";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleActionClick = (targetId: string) => {
    playClickSound();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
          {/* Noise + Glow overlays */}
          <div className="fixed inset-0 pointer-events-none z-[1] bg-cyber-grid opacity-5" />
          <div className="fixed inset-0 pointer-events-none z-[2] cyber-noise" />

          {/* Navigation Header */}
          <Header />

          {/* Main Sections */}
          <main className="flex-1 w-full">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Achievements />
            <Contact />
          </main>

          {/* Footer */}
          <footer className="py-10 border-t border-white/5 bg-cyber-dark/95 z-10 font-mono-tech text-[10px] sm:text-xs text-white/40 tracking-wider">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyber-pink" />
                <span>NODE_ESTABLISHED::0x{new Date().getFullYear().toString(16).toUpperCase()}</span>
              </div>
              <p className="text-center md:text-right">
                © {new Date().getFullYear()} ARJUNKUMAR R. SECURE INTERFACE. ALL RIGHTS RESERVED.
              </p>
              <div className="flex gap-4">
                <button onClick={() => handleNavClick("about")} className="hover:text-cyber-cyan transition-colors clickable">SYS_INFO</button>
                <button onClick={() => handleNavClick("projects")} className="hover:text-cyber-pink transition-colors clickable">REPOS</button>
                <button onClick={() => handleNavClick("contact")} className="hover:text-cyber-cyan transition-colors clickable">SMTP_LINK</button>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

// Quick helper inside file
function handleNavClick(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
