"use client";

import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound, playHoverSound } from "@/utils/audio";
import { portfolioData } from "@/config/portfolioData";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState("dark");

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Achievements", id: "achievements" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.add("light-theme");
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    playClickSound();
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("light-theme");
  };

  const handleNavClick = (id: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-cyber-dark/85 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
        }`}
      >
        {/* Scroll Progress Bar at very top of header */}
        <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-pink to-cyber-purple transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Title */}
          <button
            onClick={() => handleNavClick("hero")}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 text-white hover:text-cyber-cyan transition-colors clickable"
            aria-label="Back to top"
          >
            <Terminal className="w-5 h-5 text-cyber-cyan animate-pulse" />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 font-mono-tech text-xs uppercase tracking-wider">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onMouseEnter={playHoverSound}
                className="text-white/60 hover:text-cyber-cyan transition-colors py-2 relative group clickable"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-cyber-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}

          </nav>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                playClickSound();
              }}
              className="p-1.5 rounded bg-white/5 text-white/80 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Full Screen Menu Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-cyber-dark/95 border-b border-white/10 overflow-hidden font-mono-tech text-xs tracking-wider"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col gap-3 pb-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="text-left py-2.5 text-white/70 hover:text-cyber-cyan transition-all border-b border-white/5 clickable"
                  >
                    {link.label.toUpperCase()}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
