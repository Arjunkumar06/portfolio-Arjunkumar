"use client";

import { useEffect, useState } from "react";
import { X, Eye, FileText, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/config/portfolioData";
import { playClickSound, playHoverSound, playSuccessSound, playFizzySound } from "@/utils/audio";

export default function ResumeViewer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#resume-viewer") {
        setIsOpen(true);
        playFizzySound(true);
      } else {
        setIsOpen(false);
      }
    };

    // Run on initial load in case the hash is already present
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleClose = () => {
    playClickSound();
    setIsOpen(false);
    playFizzySound(false);
    // Clear hash without trigger scroll
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl glass-card rounded-2xl border border-cyber-cyan/30 shadow-cyan-glow/20 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 bg-cyber-dark/95 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-cyber-cyan" />
                <div>
                  <h3 className="text-lg font-bold font-orbitron text-white">SYSTEM::RESUME_VIEWER</h3>
                  <span className="text-[10px] text-white/40 font-mono-tech uppercase">ARJUNKUMAR_R_CV.PDF</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-white/15 rounded text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Frame Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-white text-slate-800 font-sans leading-relaxed text-xs sm:text-sm select-text">
              <div className="max-w-2xl mx-auto space-y-6">
                {/* CV Title Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-5 border-b-2 border-slate-200">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">{portfolioData.personalInfo.name}</h1>
                    <p className="text-xs text-sky-600 font-semibold uppercase mt-0.5">{portfolioData.personalInfo.title}</p>
                  </div>
                  <div className="text-right text-slate-500 text-[11px] font-mono">
                    <p><a href={`mailto:${portfolioData.personalInfo.email}`} className="hover:text-sky-600 transition-colors">{portfolioData.personalInfo.email}</a></p>
                    <p><a href="https://wa.me/919342368139" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">{portfolioData.personalInfo.phone}</a></p>
                  </div>
                </div>

                {/* Objective */}
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">Objective</h2>
                  <p className="text-slate-600 leading-relaxed font-light text-[13px]">{portfolioData.personalInfo.objective}</p>
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">Education</h2>
                  <div className="space-y-4">
                    {portfolioData.education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between items-start text-[13px]">
                        <div>
                          <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                          <p className="text-slate-500 text-[12px]">{edu.institution} | {edu.location}</p>
                          <p className="text-sky-600 font-semibold text-[11px] mt-0.5">{edu.details}</p>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono flex-shrink-0">{edu.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">Technical Skills</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                    {portfolioData.skills.map((cat, idx) => (
                      <div key={idx} className="space-y-1">
                        <span className="font-bold text-slate-900 text-xs">{cat.title}:</span>
                        <p className="text-slate-600 text-xs">{cat.skills.map((s) => s.name).join(", ")}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">Professional Experience</h2>
                  <div className="space-y-4">
                    {portfolioData.experiences.map((exp, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-start text-[13px]">
                          <div>
                            <h3 className="font-bold text-slate-900">{exp.role}</h3>
                            <p className="text-slate-500 text-[12px]">{exp.company} | {exp.location}</p>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono flex-shrink-0">{exp.date}</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs leading-relaxed">
                          {exp.points.map((pt, pIdx) => (
                            <li key={pIdx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">Projects</h2>
                  <div className="space-y-3">
                    {portfolioData.projects.slice(0, 1).map((p) => (
                      <div key={p.id} className="space-y-1 text-[13px]">
                        <h3 className="font-bold text-slate-900">{p.title}</h3>
                        <p className="text-slate-600 text-xs font-light">{p.description}</p>
                        <p className="text-slate-500 text-[11px]">Tech stack: {p.tech.join(", ")}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>


          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
