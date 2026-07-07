export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  architecture: string;
  results: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  image: string;
  github: string;
  live: string;
  caseStudy: ProjectCaseStudy;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  date: string;
  points: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; icon: string }[];
}

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  date: string;
  location: string;
  details: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    subtitles: string[];
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    leetcode: string;
    objective: string;
    profileImage: string;
    resumeUrl: string;
  };
  education: Education[];
  skills: SkillCategory[];
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
  achievements: string[];
  testimonials: { quote: string; author: string; role: string; company: string }[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Arjunkumar R",
    title: "Frontend Developer & UI/UX Designer",
    subtitles: [
      "Frontend Developer",
      "UI/UX Designer",
      "Problem Solver"
    ],
    email: "arjunkumararjunkumar2604@gmail.com",
    phone: "+91 9342368139",
    github: "https://github.com/Arjunkumar06",
    linkedin: "https://www.linkedin.com/in/arjunkumar-r-0b35873a6/",
    leetcode: "https://leetcode.com/u/lsunH4a36N/",
    objective: "Creative and passionate Frontend Developer and UI/UX Designer seeking an opportunity to apply my skills in frontend design and user-centered interfaces to create modern, responsive, and engaging digital experiences. Eager to continuously learn new technologies, improve my skills, and contribute effectively to innovative projects while growing professionally.",
    profileImage: "/Arjun.png",
    resumeUrl: "#resume-viewer"
  },
  education: [
    {
      degree: "B.E. Computer Science and Engineering",
      institution: "K.S.R Institute for Engineering and Technology",
      date: "2023 - Present",
      location: "Tiruchengode",
      details: "Current CGPA – 8.24"
    },
    {
      degree: "12th Grade (Higher Secondary)",
      institution: "Sengunthar Higher Secondary School",
      date: "2022 - 2023",
      location: "Erode",
      details: "Percentage – 89.16%"
    },
    {
      degree: "10th Grade (Secondary)",
      institution: "Sengunthar Higher Secondary School",
      date: "2020 - 2021",
      location: "Erode",
      details: "Completed successfully"
    }
  ],
  skills: [
    {
      title: "Frontend & Design",
      skills: [
        { name: "React JS", level: 85, icon: "React" },
        { name: "HTML5 / CSS3", level: 95, icon: "Html" },
        { name: "UI/UX Design", level: 85, icon: "Figma" },
        { name: "JavaScript", level: 80, icon: "Javascript" }
      ]
    },
    {
      title: "Backend & Databases",
      skills: [
        { name: "JAVA (Core)", level: 80, icon: "Java" },
        { name: "MySQL", level: 75, icon: "Database" },
        { name: "DBMS", level: 80, icon: "Database" },
        { name: "SAP (Basics)", level: 60, icon: "Sap" }
      ]
    },
    {
      title: "Cloud & Dev Tools",
      skills: [
        { name: "Git & GitHub", level: 85, icon: "Git" },
        { name: "VS Code", level: 90, icon: "Code" },
        { name: "Figma", level: 85, icon: "Figma" },
        { name: "Cloud Computing", level: 70, icon: "Cloud" }
      ]
    }
  ],
  experiences: [
    {
      role: "Embedded System & IoT Intern",
      company: "Azhizen Solutions",
      location: "Tiruchengode",
      date: "June 2025",
      points: [
        "Worked on technology-based projects and gained practical experience in software and system development.",
        "Participated in developing IoT-based applications and understanding real-world implementation processes.",
        "Improved problem-solving, teamwork, and project development skills through hands-on experience."
      ]
    },
    {
      role: "Full Stack Development Intern",
      company: "Ascent Techno Soft",
      location: "Coimbatore",
      date: "August 2024",
      points: [
        "Developed responsive frontend web pages using HTML and CSS with focus on clean design and user experience.",
        "Worked with team members to improve website functionality and optimize application performance.",
        "Assisted in designing and developing internal software features to support business operations.",
        "Gained hands-on experience in frontend development, teamwork, and real-world project implementation."
      ]
    }
  ],
  projects: [
    {
      id: "headcount-ai",
      title: "HeadCount AI",
      description: "A computer vision web application to count and track human occupancy from uploaded files and real-time feeds.",
      tech: ["React JS", "HTML5", "CSS3", "JavaScript", "MySQL"],
      features: [
        "Real-time video frame object recognition",
        "Image uploads with instant occupancy stats",
        "MySQL integration for historical log data",
        "Modern clean UI/UX showing analytics dashboard"
      ],
      image: "/projects/headcount-ai.jpg",
      github: "https://github.com/Arjunkumar06",
      live: "https://face-count-hub-1.onrender.com/",
      caseStudy: {
        problem: "Manual count of people in high-traffic commercial or event layouts is error-prone, inefficient, and slow, complicating security and capacity controls.",
        solution: "Built a sleek, real-time computer vision interface that links back to a secure local database, automating count processes and showcasing current statistics.",
        architecture: "React frontend displaying charts and responsive dashboards. A custom inference service handles visual object recognition, backed by a MySQL database for temporal data storage.",
        results: "Enhanced detection speeds to sub-100ms per frame, ensuring smooth UI display and automated logging for security reporting."
      }
    },
    {
      id: "portfolio-forge",
      title: "Portfolio Forge",
      description: "An online custom portfolio builder tool that takes configurations and generates styled developer portfolios instantly.",
      tech: ["React JS", "HTML5", "CSS3", "JavaScript"],
      features: [
        "Custom layout configurations",
        "Interactive form builder",
        "Instant design previews",
        "One-click theme exports"
      ],
      image: "/projects/portfolio-forge.jpg",
      github: "https://github.com/Arjunkumar06",
      live: "https://portfolio-forge-1.onrender.com/",
      caseStudy: {
        problem: "Developers spend excessive time coding portfolios from scratch instead of refining core engineering projects.",
        solution: "Created an online custom designer tool that takes configurations and outputs ready portfolios instantly.",
        architecture: "React frontend displaying previews. Custom CSS layouts loaded dynamically inside components.",
        results: "Enables instant layout exports and customizable designs with zero custom styling code required."
      }
    }
  ],
  certifications: [
    {
      title: "NPTEL: Cloud Computing (Elite / Course Completed)",
      issuer: "IIT Kharagpur",
      date: "2024"
    },
    {
      title: "Certified in Full Stack Development",
      issuer: "Ascent Techno Soft",
      date: "2024"
    },
    {
      title: "NPTEL: Sustainable Happiness",
      issuer: "IIT Kharagpur",
      date: "2024"
    },
    {
      title: "Type writing (English-Junior & Senior, Tamil - Junior)",
      issuer: "Government Technical Examinations"
    }
  ],
  achievements: [
    "LeetCode active coder: Solved 50+ SQL problems with official badges",
    "Developed HeadCount AI, integrating React JS with intelligent vision algorithms",
    "Participated in multiple hands-on technical workshops in CSE department",
    "Maintains 8.24 CGPA in Computer Science Engineering at KSRIET"
  ],
  testimonials: [
    {
      quote: "Arjun is a highly proactive developer. During his internship, he demonstrated excellent design skills and quickly grasped full-stack methodologies.",
      author: "Senior Developer",
      role: "Intern Mentor",
      company: "Ascent Techno Soft"
    },
    {
      quote: "Demonstrated strong logic formulation and interest in IoT hardware interface. Arjun was eager to take on challenging problem statements.",
      author: "Lead Architect",
      role: "Engineering Supervisor",
      company: "Azhizen Solutions"
    }
  ]
};
