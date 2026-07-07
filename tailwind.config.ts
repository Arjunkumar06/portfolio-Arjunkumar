import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cyber: {
          cyan: "var(--cyber-cyan)",
          pink: "var(--cyber-pink)",
          purple: "var(--cyber-purple)",
          blue: "var(--cyber-blue)",
          dark: "var(--cyber-dark)",
        }
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "Orbitron", "sans-serif"],
        outfit: ["var(--font-outfit)", "Outfit", "sans-serif"],
        mono: ["var(--font-mono-tech)", "Share Tech Mono", "monospace"]
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "typing-cursor": "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "var(--cyber-cyan)" },
        }
      },
      boxShadow: {
        "cyan-glow": "var(--glow-cyan)",
        "pink-glow": "var(--glow-pink)",
      }
    },
  },
  plugins: [],
} satisfies Config;
