"use client";

import { useState } from "react";
import { BookOpen, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { playHoverSound, playClickSound } from "@/utils/audio";

interface BlogPost {
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  slug: string;
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const posts: BlogPost[] = [
    {
      title: "Building HeadCount AI: Occupancy Tracking with Computer Vision",
      category: "AI / ML",
      date: "June 24, 2026",
      readTime: "5 min read",
      summary: "Exploring how OpenCV, YOLO, and Python can count venue density, output metrics to MySQL, and sync with clean React dashboards in under 100ms.",
      slug: "building-headcount-ai",
    },
    {
      title: "Improving Web UX with Synthesized Web Audio API",
      category: "Frontend",
      date: "May 18, 2026",
      readTime: "4 min read",
      summary: "How to program custom oscillators to synthesize futuristic interface hums and button click sounds locally in the browser, bypassing heavy audio assets.",
      slug: "web-ux-synthesized-audio",
    },
    {
      title: "Virtualization & Clusters: My NPTEL Cloud Journey with IIT",
      category: "Cloud",
      date: "April 05, 2026",
      readTime: "6 min read",
      summary: "A deep dive into distributed systems, hyperscaling, and virtual resource sizing constraints studied during the IIT Kharagpur Elite cloud curriculum.",
      slug: "nptel-cloud-virtualization",
    },
  ];

  const categories = ["ALL", "AI / ML", "Frontend", "Cloud"];

  const filteredPosts = posts.filter(
    (post) => activeCategory === "ALL" || post.category === activeCategory
  );

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-cyber-dark/20 border-t border-white/5">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />
      <div className="absolute right-10 top-20 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-xs font-mono-tech text-cyber-cyan uppercase tracking-widest mb-2">Systems.getArticles()</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight">
            Developer <span className="bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent">Blog</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        </div>

        {/* Categories Tab bar */}
        <div className="flex justify-center gap-2 mb-12 overflow-x-auto hide-scrollbar font-mono-tech text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                playClickSound();
              }}
              onMouseEnter={playHoverSound}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 clickable ${
                activeCategory === cat
                  ? "bg-cyber-pink/20 border-cyber-pink text-cyber-pink shadow-pink-glow/20"
                  : "bg-white/5 border-white/10 hover:border-white/20 text-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                alert(`📖 Opening Article: "${post.title}" (Mock View)`);
              }}
              className="glass-card p-6 rounded-2xl border border-white/5 hover:border-cyber-cyan/30 flex flex-col justify-between transition-all duration-300 group hover:scale-[1.02] relative cursor-pointer clickable"
            >
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cyber-cyan opacity-40 group-hover:opacity-100" />
              <div className="space-y-4">
                <span className="inline-block px-2 py-0.5 rounded bg-cyber-cyan/15 border border-cyber-cyan/30 text-[10px] font-mono-tech text-cyber-cyan uppercase">
                  {post.category}
                </span>

                <div className="space-y-2">
                  <h3 className="text-base font-bold font-orbitron text-white group-hover:text-cyber-cyan transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 text-[10px] text-white/40 font-mono-tech">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyber-pink" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyber-cyan" /> {post.readTime}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-cyber-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
