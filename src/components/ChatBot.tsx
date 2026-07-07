"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Bot, User, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound, playHoverSound, playSuccessSound, playFizzySound } from "@/utils/audio";
import { portfolioData } from "@/config/portfolioData";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  actions?: { label: string; action: () => void }[];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize chatbot conversation
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: `Greeting human! I am INFO-BOT v1.0.0. I run on quantum heuristics to help you navigate Arjun's developer portfolio. What would you like to query?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    playClickSound();

    const newMsg: Message = {
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking and typing response
    setTimeout(() => {
      const response = generateBotResponse(text);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
      playSuccessSound();
    }, 1200);
  };

  const jumpTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Chatbot logic based on keyword matching
  const generateBotResponse = (input: string): Message => {
    const text = input.toLowerCase();
    const now = new Date();

    // 1. Projects
    if (text.includes("project") || text.includes("work") || text.includes("portfolio")) {
      return {
        sender: "bot",
        text: `Arjun has engineered high-tier products. His flagship project is "HeadCount AI", an intelligent computer vision web application to count and track occupancy using React and Python. He also built this futuristic "Sci-Fi Cyber Portfolio".`,
        timestamp: now,
        actions: [
          { label: "View Projects Section", action: () => jumpTo("projects") },
          { label: "Check GitHub Profile", action: () => window.open(portfolioData.personalInfo.github, "_blank") },
        ],
      };
    }

    // 2. Skills
    if (text.includes("skill") || text.includes("languages") || text.includes("tech")) {
      const allSkills = portfolioData.skills
        .flatMap((cat) => cat.skills.map((s) => s.name))
        .join(", ");
      return {
        sender: "bot",
        text: `Arjun is highly proficient in modern frameworks. His stack includes: ${allSkills}. His core strengths lie in React JS, Java, Tailwind CSS, and UI/UX design.`,
        timestamp: now,
        actions: [{ label: "View Skills Metrics", action: () => jumpTo("skills") }],
      };
    }

    // 3. Contact / Hire
    if (text.includes("contact") || text.includes("email") || text.includes("hire") || text.includes("phone")) {
      return {
        sender: "bot",
        text: `You can reach Arjun directly at ${portfolioData.personalInfo.email} or call him at ${portfolioData.personalInfo.phone}. Let's build something exceptional!`,
        timestamp: now,
        actions: [
          { label: "Go to Contact Form", action: () => jumpTo("contact") },
          { label: "Connect on LinkedIn", action: () => window.open(portfolioData.personalInfo.linkedin, "_blank") },
        ],
      };
    }

    // 4. Experience / Internship
    if (text.includes("experience") || text.includes("intern") || text.includes("job")) {
      return {
        sender: "bot",
        text: `Arjun has completed two professional internships:
1. Full Stack Development Intern at Ascent Techno Soft (Aug 2024) - React, HTML/CSS.
2. Embedded System & IoT Intern at Azhizen Solutions (June 2025) - IoT firmware and hardware.`,
        timestamp: now,
        actions: [{ label: "View Experience Timeline", action: () => jumpTo("experience") }],
      };
    }

    // 5. Education
    if (text.includes("education") || text.includes("college") || text.includes("study") || text.includes("cgpa")) {
      return {
        sender: "bot",
        text: `Arjun is pursuing his B.E. in Computer Science and Engineering at K.S.R Institute for Engineering and Technology (2023 - Present) with a current CGPA of 8.24.`,
        timestamp: now,
        actions: [{ label: "View Achievements", action: () => jumpTo("achievements") }],
      };
    }

    // 6. Certifications / Achievements
    if (text.includes("cert") || text.includes("achieve") || text.includes("leetcode")) {
      return {
        sender: "bot",
        text: `Arjun holds certifications from Ascent Techno Soft in Full Stack Development, and Elite NPTEL certifications from IIT Kharagpur in Cloud Computing. He has also solved 50+ SQL coding challenges on LeetCode.`,
        timestamp: now,
        actions: [
          { label: "View Certificates Gallery", action: () => jumpTo("achievements") },
          { label: "Open LeetCode Profile", action: () => window.open(portfolioData.personalInfo.leetcode, "_blank") },
        ],
      };
    }

    // Default Fallback
    return {
      sender: "bot",
      text: `Command not fully recognized in core matrix. Would you like me to guide you to one of the main database archives?`,
      timestamp: now,
      actions: [
        { label: "Explore Projects", action: () => jumpTo("projects") },
        { label: "View Core Skills", action: () => jumpTo("skills") },
        { label: "Connect with Arjun", action: () => jumpTo("contact") },
      ],
    };
  };

  const suggestions = [
    "Tell me about Arjun's projects",
    "What are Arjun's skills?",
    "How can I contact Arjun?",
    "Show his internships",
  ];

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        dragConstraints={{ left: -600, right: 100, top: -600, bottom: 100 }}
        className="fixed bottom-5 right-24 md:right-36 z-[999] cursor-grab active:cursor-grabbing"
      >
        <button
          onClick={() => {
            setIsOpen((prev) => {
              const next = !prev;
              playFizzySound(next);
              return next;
            });
          }}
          className="flex items-center gap-2 p-3 rounded-full glass-card hover:cyber-glow-border-pink text-cyber-pink border border-cyber-pink/30 transition-all duration-300 shadow-pink-glow/20"
          aria-label="Ask AI Assistant"
        >
          <MessageSquare className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-mono-tech hidden md:inline">Info Bot</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-[9999] w-[340px] md:w-[400px] h-[500px] flex flex-col rounded-2xl glass-card border border-cyber-pink/40 shadow-pink-glow/30 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-cyber-dark/95 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyber-pink to-cyber-cyan flex items-center justify-center">
                    <Bot className="w-5 h-5 text-black" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-cyber-dark animate-pulse"></span>
                </div>
                <div>
                  <h3 className="text-sm font-bold font-orbitron tracking-wider text-cyber-pink">INFO-BOT</h3>
                  <span className="text-[10px] text-white/50 font-mono-tech">System Info Subroutine</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  playFizzySound(false);
                }}
                className="p-1 hover:bg-white/15 rounded text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cyber-dark/40">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === "user" ? "bg-cyber-cyan" : "bg-cyber-pink"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-4 h-4 text-black" />
                    ) : (
                      <Bot className="w-4 h-4 text-black" />
                    )}
                  </div>
                  <div className="max-w-[75%] space-y-2">
                    <div
                      className={`text-xs p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-cyber-cyan/15 border border-cyber-cyan/30 text-cyber-cyan rounded-tr-none"
                          : "bg-white/5 border border-white/10 text-foreground/90 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Actions / Buttons inside chat */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-col gap-1.5 pt-1">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              playClickSound();
                              act.action();
                            }}
                            onMouseEnter={playHoverSound}
                            className="text-left text-[11px] px-3 py-1.5 rounded-lg bg-cyber-pink/15 hover:bg-cyber-pink/25 border border-cyber-pink/30 hover:border-cyber-pink/55 text-cyber-pink transition-all font-mono-tech duration-200"
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-cyber-pink flex items-center justify-center">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-white/5 border border-white/10 text-white/50 text-xs p-3 rounded-2xl rounded-tl-none font-mono-tech flex items-center gap-1.5">
                    <span>Compiling node</span>
                    <span className="flex gap-0.5">
                      <span className="w-1.5 h-1.5 bg-cyber-pink rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-cyber-pink rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-cyber-pink rounded-full animate-bounce delay-200"></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Suggestions Quick Chips */}
            <div className="px-4 py-2 bg-cyber-dark/80 border-t border-white/5 flex gap-1.5 overflow-x-auto hide-scrollbar whitespace-nowrap">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(s)}
                  onMouseEnter={playHoverSound}
                  className="text-[10px] px-2.5 py-1 rounded-full border border-white/15 hover:border-cyber-cyan bg-white/5 hover:bg-cyber-cyan/10 text-white/60 hover:text-cyber-cyan transition-all duration-200 font-mono-tech"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-cyber-dark border-t border-white/10 flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Query agent..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyber-pink text-foreground font-mono-tech"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-gradient-to-r from-cyber-pink to-cyber-purple hover:cyber-glow-border-pink text-black transition-all flex items-center justify-center clickable"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
