import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Landmark } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

const EducationCard = ({ edu, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="double-bezel group cursor-default transition-all duration-300"
  >
    <div className="double-bezel-inner p-6 h-full flex flex-col justify-between group-hover:border-accent/30 group-hover:bg-zinc-900/60 transition-colors duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 border border-white/10 bg-zinc-900/80 rounded-xl text-accent group-hover:scale-105 group-hover:border-accent/40 transition-all duration-300">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-zinc-300 bg-zinc-900/90 border border-white/10 px-3 py-1 rounded-full group-hover:border-accent/30 transition-colors duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
            {edu.duration}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 leading-snug group-hover:text-accent transition-colors duration-250">
          {edu.degree}
        </h3>
      </div>
      <p className="flex items-center text-sm font-semibold text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors pt-2 border-t border-zinc-800/40">
        <Landmark className="w-4 h-4 mr-2 text-zinc-500 shrink-0 group-hover:text-accent transition-colors" />
        {edu.institution}
      </p>
    </div>
  </motion.div>
);

export default function Education() {
  return (
    <section
      id="education-inner"
      className="relative min-h-screen flex items-center bg-[#09090b] py-24"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-1/4 -left-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Heading */}
        <div className="mb-16" data-reveal>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2.5 inline-block px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            Education
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-1">
            Academic Background
          </h2>
          <div className="h-[2px] w-14 bg-accent mt-4 strike strike-active" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.education.map((edu, idx) => (
            <EducationCard key={idx} edu={edu} delay={idx * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
