"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { playHoverSound, playClickSound, playSuccessSound } from "@/utils/audio";
import { portfolioData } from "@/config/portfolioData";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function GithubDashboard() {
  const [loading, setLoading] = useState(true);
  const [contributionData, setContributionData] = useState<{ intensity: number; count: number }[]>([]);
  const [latestUpdate, setLatestUpdate] = useState("Sync status: Up-to-date");

  // Simulate loading GitHub stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Generate 53 weeks * 7 days = 371 grid cells of contribution activity
      const cells = Array.from({ length: 210 }, () => {
        const count = Math.random() < 0.15 ? Math.floor(Math.random() * 3) + 1 : 0;
        let intensity = 0;
        if (count > 0 && count <= 1) intensity = 1;
        else if (count > 1 && count <= 2) intensity = 2;
        else if (count > 2 && count <= 3) intensity = 3;
        else if (count > 3) intensity = 4;
        return { intensity, count };
      });
      setContributionData(cells);
      playSuccessSound();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Live Sync hook to track GitHub updations
  useEffect(() => {
    fetch("https://api.github.com/users/Arjunkumar06/events")
      .then((res) => res.json())
      .then((events) => {
        const pushEvent = events.find((e: any) => e.type === "PushEvent");
        if (pushEvent) {
          const commitMsg = pushEvent.payload.commits[0]?.message || "Sync assets";
          const repoName = pushEvent.repo.name.split("/")[1];
          setLatestUpdate(`Latest push: "${commitMsg}" on repo [${repoName}]`);
        }
      })
      .catch(() => {});
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    playClickSound();
    setTimeout(() => {
      setLoading(false);
      playSuccessSound();
    }, 1000);
  };

  const repoStats = [
    { name: "HeadCount-AI", desc: "Occupancy tracking application with computer vision backend", stars: 1, forks: 0, lang: "JavaScript" },
    { name: "portfolio", desc: "Futuristic dark-mode developer portfolio with 3D elements", stars: 2, forks: 1, lang: "React / CSS" },
  ];

  const languages = [
    { name: "Java", pct: 45, color: "bg-amber-600" },
    { name: "React / JavaScript", pct: 35, color: "bg-cyan-400" },
    { name: "HTML & CSS", pct: 15, color: "bg-pink-500" },
    { name: "MySQL", pct: 5, color: "bg-purple-500" },
  ];

  // Grid color mappings
  const getIntensityClass = (intensity: number) => {
    switch (intensity) {
      case 0:
        return "bg-white/5";
      case 1:
        return "bg-emerald-950";
      case 2:
        return "bg-emerald-800";
      case 3:
        return "bg-emerald-600";
      case 4:
        return "bg-emerald-400 cyber-glow-cyan shadow-[0_0_4px_#34d399]";
      default:
        return "bg-white/5";
    }
  };

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-cyber-dark/20 border-t border-white/5">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono-tech text-cyber-cyan uppercase tracking-widest mb-2">Systems.getGitHubAnalytics()</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight">
            GitHub <span className="bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent">Metrics</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        </div>

        {/* HUD Frame */}
        <div className="max-w-5xl mx-auto glass-card rounded-2xl border border-white/10 p-6 relative">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <GithubIcon className="w-6 h-6 text-cyber-cyan" />
              <div>
                <h3 className="text-lg font-bold font-orbitron text-white">USER::ARJUNKUMAR06</h3>
                <p className="text-[10px] text-white/40 font-mono-tech uppercase">Connection: ONLINE | {latestUpdate}</p>
              </div>
            </div>
            <div className="flex gap-2 font-mono-tech text-xs">
              <button
                onClick={handleRefresh}
                className="px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:border-cyber-cyan text-white/60 hover:text-cyber-cyan transition-all duration-300 flex items-center gap-1.5 clickable animate-pulse"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Hub</span>
              </button>
              <a
                href={portfolioData.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                onMouseEnter={playHoverSound}
                className="px-3 py-1.5 rounded bg-cyber-cyan text-black font-bold transition-all duration-300 clickable"
              >
                Follow Profile
              </a>
            </div>
          </div>

          {loading ? (
            /* Loading skeletons */
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-cyber-cyan animate-spin" />
              <span className="text-xs font-mono-tech text-cyber-cyan tracking-wider uppercase animate-pulse">Syncing git repositories...</span>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Contribution Grid */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono-tech text-white/60">
                  <span>54 contributions in the last year</span>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 bg-white/5 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-950 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-800 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-600 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" />
                    <span>More</span>
                  </div>
                </div>

                <div className="p-4 bg-cyber-dark/80 border border-white/5 rounded-xl overflow-x-auto hide-scrollbar">
                  {/* Grid wrapper */}
                  <div className="min-w-[640px] grid grid-flow-col grid-rows-7 gap-1.5 justify-between">
                    {contributionData.map((cell, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.002 }}
                        onMouseEnter={playHoverSound}
                        className={`w-3.5 h-3.5 rounded-sm transition-colors duration-200 cursor-crosshair ${getIntensityClass(
                          cell.intensity
                        )}`}
                        title={`Activity: ${cell.count} commits`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Lower details segment */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Languages breakdown */}
                <div className="md:col-span-4 p-5 rounded-xl border border-white/5 bg-cyber-dark/50 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold font-orbitron text-white uppercase tracking-wider">Languages Used</h4>
                    <div className="space-y-3 font-mono-tech text-xs">
                      {languages.map((lang) => (
                        <div key={lang.name} className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-white/80">{lang.name}</span>
                            <span className="text-cyber-cyan">{lang.pct}%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${lang.pct}%` }}
                              transition={{ duration: 1 }}
                              className={`h-full ${lang.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pin repos */}
                <div className="md:col-span-8 p-5 rounded-xl border border-white/5 bg-cyber-dark/50 space-y-4">
                  <h4 className="text-xs font-bold font-orbitron text-white uppercase tracking-wider">Active Repositories</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {repoStats.map((repo, idx) => (
                      <div
                        key={idx}
                        onMouseEnter={playHoverSound}
                        className="p-4 rounded-lg bg-[#08080f] border border-white/5 hover:border-cyber-cyan/30 transition-all duration-300 group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-sm font-bold font-orbitron text-white group-hover:text-cyber-cyan transition-colors flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-cyber-cyan" />
                            <span>{repo.name}</span>
                          </h5>
                          <div className="flex gap-2 text-[10px] text-white/40 font-mono-tech">
                            <span className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 text-amber-500" /> {repo.stars}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <GitFork className="w-3 h-3 text-cyan-400" /> {repo.forks}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-white/50 leading-relaxed mb-4">
                          {repo.desc}
                        </p>
                        <span className="inline-block px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono-tech text-cyber-pink">
                          {repo.lang}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
