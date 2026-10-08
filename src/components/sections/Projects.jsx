import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ShieldCheck, MapPin, Database, BookOpen, Smartphone, Trees } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

const getProjectVisual = (id) => {
  const base = "relative w-full h-44 bg-zinc-950 border-b border-zinc-800 flex items-center justify-center overflow-hidden group-hover:bg-zinc-900 transition-colors duration-500";
  const grid = "absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20";

  switch (id) {
    case "smart-ambulance":
      return (
        <div className={base}>
          <div className={grid} />
          <svg className="w-4/5 h-2/3 text-accent/20 z-0 group-hover:scale-105 transition-transform duration-700" viewBox="0 0 200 100">
            <path d="M 20 80 Q 80 20 120 70 T 180 30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="20" cy="80" r="4" className="text-zinc-600" fill="currentColor" />
            <circle cx="180" cy="30" r="4" className="text-accent" fill="currentColor" />
          </svg>
          <div className="absolute flex flex-col items-center z-10 text-center">
            <MapPin className="w-7 h-7 text-accent animate-bounce mb-2" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Real-Time Geolocation</span>
          </div>
        </div>
      );
    case "student-api":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:scale-110 transition-transform duration-700">
            <Database className="w-7 h-7 text-accent mb-2" />
            <code className="text-xs text-zinc-400 font-mono bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">GET /api/v1/students</code>
          </div>
          <div className="absolute bottom-4 left-4 text-[9px] font-mono text-zinc-600">Mongoose Schema active</div>
        </div>
      );
    case "ai-tutor-web":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:-translate-y-2 transition-transform duration-700">
            <BookOpen className="w-7 h-7 text-accent mb-2" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Web LLM Integration</span>
          </div>
          <div className="absolute top-4 right-4 flex space-x-1">
            <span className="w-2 h-2 rounded-full bg-red-500/40" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
            <span className="w-2 h-2 rounded-full bg-green-500/40" />
          </div>
        </div>
      );
    case "ai-tutor-app":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:rotate-2 transition-transform duration-700">
            <Smartphone className="w-7 h-7 text-accent mb-2" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">K-10 Interactive App</span>
          </div>
          <div className="absolute bottom-2 right-4 text-[9px] font-mono text-zinc-600">Prompt Engineered</div>
        </div>
      );
    case "ap-forest":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:scale-105 transition-transform duration-700">
            <Trees className="w-7 h-7 text-accent mb-2" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">APSFA Training Syllabus Hub</span>
          </div>
          <div className="absolute bottom-2 right-4 text-[9px] font-mono text-zinc-600">AI Chatbot & RAG Integration</div>
        </div>
      );
    case "smart-exam-portal":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:scale-105 transition-transform duration-700">
            <ShieldCheck className="w-7 h-7 text-accent mb-2" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Anti-Cheating Secure Portal</span>
          </div>
          <div className="absolute bottom-2 right-4 text-[9px] font-mono text-zinc-600">Real-time WebRTC Proctoring</div>
        </div>
      );
    case "riet-crt":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:scale-110 transition-transform duration-700">
            <BookOpen className="w-7 h-7 text-accent mb-2" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">CRT Learning Hub</span>
          </div>
          <div className="absolute bottom-2 right-4 text-[9px] font-mono text-zinc-600">Campus Recruitment Platform</div>
        </div>
      );
    default:
      return null;
  }
};

const ProjectCard = ({ project, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 36, scale: 0.92 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className="group bg-zinc-900/25 border border-zinc-800/80 rounded overflow-hidden hover:border-zinc-700/80 hover:bg-zinc-900/50 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-accent/5"
  >
    <div>
      {getProjectVisual(project.id)}
      <div className="p-6">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-zinc-950 border border-zinc-850 text-[10px] sm:text-xs text-zinc-400 font-semibold tracking-wide uppercase rounded group-hover:border-accent/30 group-hover:text-zinc-300 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-zinc-400 font-medium text-xs sm:text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
          {project.description}
        </p>
      </div>
    </div>

    <div className="px-6 pb-6 pt-2 border-t border-zinc-800/40 flex justify-between items-center bg-zinc-900/10 group-hover:bg-zinc-900/40 transition-colors duration-300">
      <span className="text-[10px] text-zinc-600 font-semibold uppercase tracking-wider group-hover:text-zinc-400 transition-colors">
        {project.link === "#" ? "Link Placeholder Active" : "Active Demo"}
      </span>
      <a
        href={project.link}
        className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors duration-200 group/link"
        target={project.link.startsWith("http") ? "_blank" : "_self"}
        rel="noopener noreferrer"
        onClick={(e) => {
          if (project.link === "#") {
            e.preventDefault();
            alert("Note: This project link is currently a placeholder.");
          }
        }}
      >
        {project.link.startsWith("http") ? "Live Demo" : "Source Code"}
        <ArrowUpRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
      </a>
    </div>
  </motion.div>
);

export default function Projects() {
  return (
    <section
      id="projects-inner"
      className="relative min-h-screen flex items-start bg-[#09090b] py-24"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Heading */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
              Projects
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              Selected Work
            </h2>
            <div className="h-[2px] w-12 bg-accent mt-4" />
          </div>
          <p className="text-zinc-500 text-xs font-semibold mt-4 md:mt-0 max-w-sm">
            All code repositories and project builds feature standard link placeholders for quick verification updates.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} delay={idx * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
