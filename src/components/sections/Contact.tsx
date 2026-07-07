"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Mail, Phone, MapPin } from "lucide-react";
import { portfolioData } from "@/config/portfolioData";
import { playClickSound } from "@/utils/audio";

const Globe = dynamic(() => import("../Globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-dashed border-cyber-cyan animate-spin"></div>
    </div>
  ),
});

export default function Contact() {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const handleEmailClick = (e: React.MouseEvent) => {
    playClickSound();
    try {
      navigator.clipboard.writeText(portfolioData.personalInfo.email);
      setTerminalLogs((prev) => [
        "SMTP::LINK: Mail client launched. Address copied to clipboard.",
        ...prev
      ]);
    } catch (err) {
      // Fallback
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-cyber-dark/40 border-t border-white/5">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[500px] h-[500px] bg-cyber-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono-tech text-cyber-cyan uppercase tracking-widest mb-2">Systems.getLink()</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight">
            Contact <span className="bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          {/* Left Column: Interactive Globe */}
          <div className="lg:col-span-6 relative w-full h-[360px] md:h-[420px] glass-card rounded-2xl border border-white/10 overflow-hidden bg-black/25 flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full">
              <Globe />
            </div>
            <div className="absolute bottom-4 left-4 font-mono-tech text-[10px] text-white/40 uppercase tracking-widest z-10">
              LOC::11.2986° N, 77.9628° E
            </div>
          </div>

          {/* Right Column: Node Address Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-card p-8 rounded-2xl border border-white/10 relative">
              <div className="absolute top-0 right-4 -translate-y-1/2 px-3 py-0.5 bg-cyber-cyan/20 border border-cyber-cyan/40 text-cyber-cyan text-[10px] font-mono-tech rounded">
                SECURE_NODE
              </div>
              <h3 className="text-xl font-bold font-orbitron text-white uppercase tracking-wider mb-4">Node Address</h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6">
                Connect with my central processor directly. Access WhatsApp link channels or launch the mail routing subroutine.
              </p>

              {/* Info chips */}
              <div className="space-y-4 font-mono-tech text-xs sm:text-sm">
                <a
                  href={`mailto:${portfolioData.personalInfo.email}`}
                  onClick={handleEmailClick}
                  className="flex items-center gap-3.5 p-4 rounded-xl border border-white/5 bg-white/5 hover:border-cyber-cyan hover:bg-cyber-cyan/5 text-white/80 hover:text-cyber-cyan transition-all clickable"
                >
                  <Mail className="w-5 h-5 text-cyber-pink" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 uppercase">Email Routing</span>
                    <span className="font-bold text-white group-hover:text-cyber-cyan transition-colors">{portfolioData.personalInfo.email}</span>
                  </div>
                </a>
                <a
                  href="https://wa.me/919342368139"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  className="flex items-center gap-3.5 p-4 rounded-xl border border-white/5 bg-white/5 hover:border-cyber-cyan hover:bg-cyber-cyan/5 text-white/80 hover:text-cyber-cyan transition-all clickable"
                >
                  <Phone className="w-5 h-5 text-cyber-cyan" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 uppercase">WhatsApp Node</span>
                    <span className="font-bold text-white group-hover:text-cyber-cyan transition-colors">{portfolioData.personalInfo.phone}</span>
                  </div>
                </a>
                <div className="flex items-center gap-3.5 p-4 rounded-xl border border-white/5 bg-white/5 text-white/80">
                  <MapPin className="w-5 h-5 text-cyber-purple" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 uppercase">Location Coordinates</span>
                    <span className="font-bold text-white">Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

              {/* Simple terminal console log */}
              {terminalLogs.length > 0 && (
                <div className="mt-6 p-4 rounded-xl bg-[#04040a] border border-white/5 font-mono-tech text-[10px] space-y-1 text-cyber-cyan">
                  {terminalLogs.slice(0, 2).map((log, idx) => (
                    <div key={idx} className="flex gap-1.5 leading-4">
                      <span className="text-white/30">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
