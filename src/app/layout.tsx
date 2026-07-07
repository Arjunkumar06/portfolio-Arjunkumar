import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SoundToggle from "@/components/SoundToggle";
import ChatBot from "@/components/ChatBot";
import ResumeViewer from "@/components/ResumeViewer";

export const metadata: Metadata = {
  title: "Arjunkumar R | Frontend Developer & UI/UX Designer Portfolio",
  description: "Explore the futuristic, cyber-tech developer portfolio of Arjunkumar R. Interactive 3D elements, computer vision projects (HeadCount AI), technical skills, work experience, and diagnostics HUD.",
  keywords: [
    "Arjunkumar R",
    "Arjunkumar06",
    "Frontend Developer",
    "UI/UX Designer",
    "Portfolio",
    "Next.js Portfolio",
    "Three.js",
    "React Three Fiber",
    "HeadCount AI"
  ],
  authors: [{ name: "Arjunkumar R" }],
  openGraph: {
    title: "Arjunkumar R | Frontend Developer & UI/UX Designer Portfolio",
    description: "Explore the futuristic, cyber-tech developer portfolio of Arjunkumar R. Interactive 3D elements, computer vision projects (HeadCount AI), and diagnostics HUD.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjunkumar R | Frontend Developer Portfolio",
    description: "Futuristic dark-mode developer portfolio of Arjunkumar R.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased selection:bg-cyber-pink selection:text-black">
        {/* Global HUD Interfaces */}
        <CustomCursor />
        <SoundToggle />
        <ChatBot />
        <ResumeViewer />

        {/* Core content */}
        {children}
      </body>
    </html>
  );
}
