import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, ShieldCheck, MapPin, Database, BookOpen, Smartphone, Trees } from "lucide-react";
import { Github } from "../Icons";
import { portfolioData } from "../../data/portfolioData";

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Helper to render abstract technical illustrations per project
  const getProjectVisual = (id) => {
    switch (id) {
      case "smart-ambulance":
        return (
          <div className="relative w-full h-48 bg-zinc-950 border-b border-zinc-800 flex items-center justify-center overflow-hidden">
            {/* Minimal Grid & Path line */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
            <svg className="w-4/5 h-2/3 text-accent/20 z-0" viewBox="0 0 200 100">
              <path d="M 20 80 Q 80 20 120 70 T 180 30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="20" cy="80" r="4" className="text-zinc-600" fill="currentColor" />
              <circle cx="180" cy="30" r="4" className="text-accent" fill="currentColor" />
            </svg>
            <div className="absolute flex flex-col items-center z-10 text-center">
              <MapPin className="w-8 h-8 text-accent animate-bounce mb-2" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Real-Time Geolocation</span>
            </div>
          </div>
        );
      case "student-api":
        return (
          <div className="relative w-full h-48 bg-zinc-950 border-b border-zinc-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
            <div className="absolute z-10 flex flex-col items-center text-center">
              <Database className="w-8 h-8 text-accent mb-2" />
              <code className="text-xs text-zinc-400 font-mono bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                GET /api/v1/students
              </code>
            </div>
            <div className="absolute bottom-4 left-4 text-[9px] font-mono text-zinc-600">
              Mongoose Schema active
            </div>
          </div>
        );
      case "ai-tutor-web":
        return (
          <div className="relative w-full h-48 bg-zinc-950 border-b border-zinc-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
            <div className="absolute z-10 flex flex-col items-center text-center">
              <BookOpen className="w-8 h-8 text-accent mb-2" />
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
          <div className="relative w-full h-48 bg-zinc-950 border-b border-zinc-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
            <div className="absolute z-10 flex flex-col items-center text-center">
              <Smartphone className="w-8 h-8 text-accent mb-2" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">K-10 Interactive App</span>
            </div>
            <div className="absolute bottom-2 right-4 text-[9px] font-mono text-zinc-600">
              Prompt Engineered
            </div>
          </div>
        );
      case "ap-forest":
        return (
          <div className="relative w-full h-48 bg-zinc-950 border-b border-zinc-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
            <div className="absolute z-10 flex flex-col items-center text-center">
              <Trees className="w-8 h-8 text-accent mb-2" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">APSFA Training Syllabus Hub</span>
            </div>
            <div className="absolute bottom-2 right-4 text-[9px] font-mono text-zinc-600">
              AI Chatbot & RAG Integration
            </div>
          </div>
        );
      case "smart-exam-portal":
        return (
          <div className="relative w-full h-48 bg-zinc-950 border-b border-zinc-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
            <div className="absolute z-10 flex flex-col items-center text-center">
              <ShieldCheck className="w-8 h-8 text-accent mb-2" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Anti-Cheating Secure Portal</span>
            </div>
            <div className="absolute bottom-2 right-4 text-[9px] font-mono text-zinc-600">
              Real-time WebRTC Proctoring
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-24 border-t border-zinc-900/50 bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
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

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {portfolioData.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group bg-zinc-900/25 border border-zinc-800/80 rounded overflow-hidden hover:border-zinc-700/80 hover:bg-zinc-900/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Abstract Visual */}
                {getProjectVisual(project.id)}

                {/* Info Container */}
                <div className="p-6">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-zinc-950 border border-zinc-850 text-[10px] sm:text-xs text-zinc-400 font-semibold tracking-wide uppercase rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-250">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 font-medium text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 pt-2 border-t border-zinc-800/40 flex justify-between items-center bg-zinc-900/10">
                <span className="text-[10px] text-zinc-600 font-semibold uppercase tracking-wider">
                  {project.link === "#" ? "Link Placeholder Active" : "Active Demo"}
                </span>

                <div className="flex items-center space-x-4">
                  <a
                    href={project.link}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors duration-200 group/link"
                    target={project.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (project.link === "#") {
                        e.preventDefault();
                        alert("Note: This project link is currently a placeholder. It can be customized in portfolioData.js.");
                      }
                    }}
                  >
                    {project.link.startsWith("http") ? "Live Demo" : "Source Code"}
                    <ArrowUpRight className="ml-1 w-3.5 h-3.5 transition-transform duration-250 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
