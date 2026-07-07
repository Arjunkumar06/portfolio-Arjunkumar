"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Terminal, ArrowRight, Volume2, Moon, Sun, Award, FolderGit2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioData } from "@/config/portfolioData";
import { playClickSound, playHoverSound, playSuccessSound } from "@/utils/audio";
import confetti from "canvas-confetti";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Toggle Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        playClickSound();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Command palette actions
  const navigateTo = (id: string) => {
    setIsOpen(false);
    playSuccessSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    setIsOpen(false);
    playSuccessSound();
    const isLight = document.documentElement.classList.toggle("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  };

  const toggleSound = () => {
    setIsOpen(false);
    playSuccessSound();
    const button = document.querySelector("button[aria-label='Toggle Sound Effects']");
    if (button) (button as HTMLButtonElement).click();
  };

  const triggerEasterEgg = () => {
    setIsOpen(false);
    playSuccessSound();
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#00f0ff", "#ff007f", "#9d4edd"],
    });
    alert("🤖 [SYSTEM OVERRIDE SUCCESSFUL]: Confetti protocol initiated!");
  };

  // Compile list of options based on query
  const staticItems = [
    { id: "hero", label: "Jump to Hero", category: "Navigation", action: () => navigateTo("hero"), icon: Terminal },
    { id: "about", label: "Jump to About Me", category: "Navigation", action: () => navigateTo("about"), icon: Terminal },
    { id: "skills", label: "Jump to Skills", category: "Navigation", action: () => navigateTo("skills"), icon: Terminal },
    { id: "projects", label: "Jump to Projects", category: "Navigation", action: () => navigateTo("projects"), icon: FolderGit2 },
    { id: "experience", label: "Jump to Experience", category: "Navigation", action: () => navigateTo("experience"), icon: Terminal },
    { id: "achievements", label: "Jump to Achievements & Certificates", category: "Navigation", action: () => navigateTo("achievements"), icon: Award },
    { id: "contact", label: "Jump to Contact Me", category: "Navigation", action: () => navigateTo("contact"), icon: Terminal },
    { id: "theme", label: "Toggle Theme (Light/Dark)", category: "System", action: toggleTheme, icon: Moon },
    { id: "audio", label: "Toggle Sound Effects", category: "System", action: toggleSound, icon: Volume2 },
    { id: "easter-egg", label: "Run Konami Protocol (Easter Egg)", category: "Fun", action: triggerEasterEgg, icon: Terminal },
  ];

  // Dynamic projects search list
  const projectItems = portfolioData.projects.map((p) => ({
    id: p.id,
    label: `Project: ${p.title} (${p.tech.slice(0, 2).join(", ")})`,
    category: "Projects",
    action: () => navigateTo(`project-${p.id}`),
    icon: FolderGit2,
  }));

  const allItems = [...staticItems, ...projectItems];

  const filteredItems = allItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!filteredItems.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      playHoverSound();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      playHoverSound();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Search HUD Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          playClickSound();
        }}
        className="fixed bottom-5 right-5 z-[999] flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:cyber-glow-border-cyan text-cyber-cyan border border-cyber-cyan/30 text-sm font-mono-tech transition-all duration-300 shadow-cyan-glow/20"
      >
        <Search className="w-4 h-4 animate-pulse" />
        <span>HUD Terminal</span>
        <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] hidden md:inline">Ctrl+K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl overflow-hidden glass-card rounded-2xl border border-cyber-cyan/40 shadow-cyan-glow/30"
              onKeyDown={handleKeyDown}
            >
              {/* Header Input */}
              <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-cyber-dark/80">
                <Search className="w-5 h-5 text-cyber-cyan" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search systems, projects, commands..."
                  className="flex-1 bg-transparent text-foreground placeholder-white/40 focus:outline-none font-mono-tech"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                />
                <button
                  onClick={() => {
                    setIsOpen(false);
                    playClickSound();
                  }}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="max-h-[300px] overflow-y-auto p-2 space-y-1 bg-cyber-dark/40 font-mono-tech">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={item.id + "-" + index}
                        onClick={() => item.action()}
                        onMouseEnter={() => {
                          setSelectedIndex(index);
                          playHoverSound();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-150 ${
                          isSelected
                            ? "bg-gradient-to-r from-cyber-cyan/20 to-cyber-pink/10 border-l-4 border-cyber-cyan text-cyber-cyan pl-4"
                            : "text-foreground/75 border-l-4 border-transparent hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isSelected ? "text-cyber-cyan" : "text-white/40"}`} />
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <span className="text-[10px] text-white/30 uppercase tracking-wider">{item.category}</span>
                          </div>
                        </div>
                        {isSelected && <ArrowRight className="w-4 h-4 animate-pulse text-cyber-cyan" />}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-white/40 space-y-2">
                    <p>No results found for &quot;{query}&quot;</p>
                    <p className="text-xs">Try searching &quot;project&quot;, &quot;theme&quot;, or a section name.</p>
                  </div>
                )}
              </div>

              {/* Footer Guide */}
              <div className="flex justify-between items-center px-4 py-3 bg-cyber-dark/80 border-t border-white/10 text-[11px] text-white/40 font-mono-tech">
                <div className="flex items-center gap-3">
                  <span>↑↓ Navigate</span>
                  <span>[Enter] Select</span>
                </div>
                <span>[ESC] Close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
