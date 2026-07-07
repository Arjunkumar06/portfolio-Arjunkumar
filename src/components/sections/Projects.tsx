"use client";

import { useState } from "react";
import { Search, FolderGit2, ExternalLink, ShieldCheck, Terminal, X, Workflow } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, Project } from "@/config/portfolioData";
import { playHoverSound, playClickSound, playSuccessSound } from "@/utils/audio";

export default function Projects() {
  const projectsList = portfolioData.projects;
  const [filterQuery, setFilterQuery] = useState("");
  const [activeTechFilter, setActiveTechFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Compile all unique tech tags for filter tabs
  const allTechTags = ["ALL", ...Array.from(new Set(projectsList.flatMap((p) => p.tech)))];

  const filteredProjects = projectsList.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesTech = activeTechFilter === "ALL" || p.tech.includes(activeTechFilter);
    return matchesQuery && matchesTech;
  });

  const handleOpenCaseStudy = (project: Project) => {
    playSuccessSound();
    setSelectedProject(project);
  };

  const handleCloseCaseStudy = () => {
    playClickSound();
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-cyber-dark/20 border-t border-white/5">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-xs font-mono-tech text-cyber-pink uppercase tracking-widest mb-2">Systems.getRepositories()</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight">
            Featured <span className="bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        </div>

        {/* Search and Tag Filtering Controls */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          {/* Search bar */}
          <div className="relative w-full md:w-80 flex items-center bg-white/5 border border-white/10 focus-within:border-cyber-cyan/50 rounded-xl px-3 py-2.5 transition-colors">
            <Search className="w-4 h-4 text-white/40 mr-2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-sm text-foreground font-mono-tech placeholder-white/35"
            />
          </div>

          {/* Quick Filter chips */}
          <div className="flex gap-2 overflow-x-auto max-w-full hide-scrollbar py-2 whitespace-nowrap">
            {allTechTags.map((tech) => (
              <button
                key={tech}
                onClick={() => {
                  setActiveTechFilter(tech);
                  playClickSound();
                }}
                onMouseEnter={playHoverSound}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono-tech transition-all clickable ${
                  activeTechFilter === tech
                    ? "bg-cyber-cyan/25 border-cyber-cyan text-cyber-cyan"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-white/60"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                id={`project-${proj.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-card flex flex-col rounded-2xl border border-white/10 hover:border-cyber-cyan/30 overflow-hidden group relative transition-all duration-300 hover:shadow-cyan-glow/10"
              >
                {/* Visual Scanner line inside cards on hover */}
                <div className="absolute inset-x-0 h-[2px] bg-cyber-cyan top-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Tech image mock container */}
                <div className="relative h-48 w-full bg-[#080812] flex items-center justify-center border-b border-white/5 overflow-hidden">
                  {/* Cyber grid background */}
                  <div className="absolute inset-0 bg-cyber-grid-fine opacity-10" />

                  {/* SVG Tech visualization background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-25 group-hover:opacity-45 transition-opacity duration-300">
                    <Workflow className="w-32 h-32 text-cyber-cyan animate-pulse" />
                  </div>

                  {/* Icon representation */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <FolderGit2 className="w-12 h-12 text-cyber-cyan group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-[10px] font-mono-tech text-white/40 tracking-wider">PROJECT_SYS::{proj.id.toUpperCase()}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-orbitron text-white group-hover:text-cyber-cyan transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono-tech text-white/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
                    <button
                      onClick={() => handleOpenCaseStudy(proj)}
                      onMouseEnter={playHoverSound}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyber-pink/20 hover:bg-cyber-pink/35 border border-cyber-pink/40 text-cyber-pink font-mono-tech transition-all flex-1 clickable"
                    >
                      Case Study
                    </button>

                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClickSound()}
                      onMouseEnter={playHoverSound}
                      className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center clickable"
                      aria-label="GitHub Repository"
                    >
                      <FolderGit2 className="w-4 h-4" />
                    </a>

                    <a
                      href={proj.live}
                      onClick={() => playClickSound()}
                      onMouseEnter={playHoverSound}
                      className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center clickable"
                      aria-label="Live Demo Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-3xl glass-card rounded-2xl border border-cyber-pink/30 shadow-pink-glow/20 overflow-hidden flex flex-col max-h-[85vh]"
              >
                {/* Header */}
                <div className="p-5 bg-cyber-dark/95 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-cyber-pink" />
                    <div>
                      <h3 className="text-lg font-bold font-orbitron text-white">CASE_STUDY::{selectedProject.title.toUpperCase()}</h3>
                      <span className="text-[10px] text-white/40 font-mono-tech">Security Audit Verified</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseCaseStudy}
                    className="p-1 hover:bg-white/15 rounded text-white/50 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-cyber-dark/40 font-sans">
                  {/* Problem Block */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold font-orbitron text-cyber-pink flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> PROBLEM STATEMENT
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed pl-6 border-l-2 border-cyber-pink/30">
                      {selectedProject.caseStudy.problem}
                    </p>
                  </div>

                  {/* Solution Block */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold font-orbitron text-cyber-cyan flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> PROPOSED SOLUTION
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed pl-6 border-l-2 border-cyber-cyan/30">
                      {selectedProject.caseStudy.solution}
                    </p>
                  </div>

                  {/* Architecture Diagram Mock */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold font-orbitron text-cyber-purple flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> SYSTEM ARCHITECTURE
                    </h4>
                    <div className="p-4 bg-[#05050d] rounded-xl border border-white/5 text-[10px] sm:text-xs text-cyber-cyan font-mono-tech overflow-x-auto whitespace-pre leading-5">
                      {selectedProject.id === "headcount-ai" ? (
`[ CLIENT FEED ] --> ( React JS App ) --[ API Request ]--> ( Python OpenCV Node )
                                                                 |
                                                          [ Frame Inference ]
                                                                 v
[ TEMP STATS ] <--- [ MySQL Log ] <---- [ occupancy count ] <-- ( YOLO Detection )`
                      ) : (
`[ USER ACTION ] ---> ( Canvas WebGL ) ---> ( Three.js Mesh Coordinates )
                                                            |
                                                   [ GSAP ScrollTrigger ]
                                                            v
[ LOCAL HUD ] <---- [ Ctrl+K Panel ] <--- [ responsive hooks ] <-- ( Framer Motion )`
                      )}
                    </div>
                  </div>

                  {/* Results Block */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold font-orbitron text-amber-400 flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> PERFORMANCE & METRICS
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed pl-6 border-l-2 border-amber-400/30">
                      {selectedProject.caseStudy.results}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-cyber-dark/95 border-t border-white/10 flex justify-end">
                  <button
                    onClick={handleCloseCaseStudy}
                    className="px-5 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-mono-tech transition-colors clickable"
                  >
                    Close Log
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
