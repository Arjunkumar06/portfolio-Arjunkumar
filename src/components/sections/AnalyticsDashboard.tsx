"use client";

import { useEffect, useState } from "react";
import { Activity, Shield, Users, Radio, Cpu, Database } from "lucide-react";
import { motion } from "framer-motion";
import { playHoverSound, playClickSound } from "@/utils/audio";

export default function AnalyticsDashboard() {
  const [sessionDuration, setSessionDuration] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(12.5);
  const [logs, setLogs] = useState<string[]>([]);

  // Start duration counter and metrics simulation
  useEffect(() => {
    const durationInterval = setInterval(() => {
      setSessionDuration((prev) => prev + 1);
    }, 1000);

    const cpuInterval = setInterval(() => {
      // Simulate micro-fluctuations in CPU rendering tasks
      setCpuUsage((prev) => {
        const offset = (Math.random() - 0.5) * 4;
        const nextVal = prev + offset;
        return Math.max(5, Math.min(nextVal, 30));
      });
    }, 2000);

    const logGenerator = setInterval(() => {
      const systemMessages = [
        "METRIC::RENDER_CANVAS_FPS_OK: 60FPS",
        "METRIC::AUDIO_SYNTH_ACTIVE_NODES: 2",
        "AUDIT::CURSOR_SPRING_LERP: COMPLETED",
        "METRIC::THEME_CACHE_HIT: TRUE",
        "SECURITY::INBOUND_SOCKET_VERIFIED: OK",
        "SYSTEM::CONFIRM_UPTIME: 100%",
      ];
      const randomMsg = systemMessages[Math.floor(Math.random() * systemMessages.length)];
      setLogs((prev) => [randomMsg, ...prev.slice(0, 4)]);
    }, 5000);

    // Initial logs
    setLogs([
      "SYSTEM::HUD_INITIALIZED: ACTIVE",
      "SECURITY::HANDSHAKE: STABLE",
      "METRIC::WEBGL_CONTEXT_READY: OK"
    ]);

    // Track global mouse clicks to populate live clicks count
    const trackClicks = () => {
      setClickCount((prev) => {
        const nextVal = prev + 1;
        setLogs((currentLogs) => [
          `USER::INTERACTION_CLICK_TRIGGERED: count_${nextVal}`,
          ...currentLogs.slice(0, 4),
        ]);
        return nextVal;
      });
    };

    document.addEventListener("click", trackClicks);

    return () => {
      clearInterval(durationInterval);
      clearInterval(cpuInterval);
      clearInterval(logGenerator);
      document.removeEventListener("click", trackClicks);
    };
  }, []);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const metrics = [
    { label: "Active Session", value: formatDuration(sessionDuration), icon: Radio, color: "text-cyber-cyan" },
    { label: "HUD Interactions", value: clickCount, icon: Users, color: "text-cyber-pink" },
    { label: "GPU Load (WebGL)", value: `${cpuUsage.toFixed(1)}%`, icon: Cpu, color: "text-cyber-purple" },
    { label: "System Firewall", value: "SECURE", icon: Shield, color: "text-green-400" },
  ];

  return (
    <section id="analytics" className="py-24 relative overflow-hidden bg-cyber-dark/40 border-t border-white/5">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />
      <div className="absolute left-10 top-20 w-80 h-80 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono-tech text-cyber-cyan uppercase tracking-widest mb-2">Systems.getDiagnostics()</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight">
            Diagnostics <span className="bg-gradient-to-r from-cyber-cyan via-cyber-pink to-cyber-purple bg-clip-text text-transparent">HUD</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        </div>

        {/* Dashboard Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Left panel: Core metrics */}
          <div className="md:col-span-8 grid grid-cols-2 gap-4">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="glass-card p-6 rounded-2xl border border-white/5 hover:border-cyber-cyan/35 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] clickable"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] text-white/40 font-mono-tech tracking-wider uppercase">{m.label}</span>
                    <Icon className={`w-5 h-5 ${m.color}`} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-orbitron text-white mt-2">
                    {m.value}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Right panel: System event logs terminal */}
          <div className="md:col-span-4 glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between relative bg-[#04040a]/80">
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cyber-cyan" />
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <Activity className="w-4 h-4 text-cyber-pink animate-pulse" />
                <h4 className="text-xs font-bold font-orbitron text-white uppercase tracking-wider">Console Triggers</h4>
              </div>

              {/* Logs output */}
              <div className="space-y-2 font-mono-tech text-[10px] text-cyber-cyan/80 leading-relaxed overflow-hidden h-40">
                {logs.map((log, i) => (
                  <motion.div
                    key={i + "-" + log}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-1.5"
                  >
                    <span className="text-cyber-pink">&gt;</span>
                    <span className="truncate">{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-white/5 text-[9px] text-white/35 font-mono-tech">
              <Database className="w-3.5 h-3.5" />
              <span>DIAG_LINK: SECURE_SOCKET_VER_3.4.1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
