import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Landmark } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

const EducationCard = ({ edu, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 28, scale: 0.94 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    className="p-6 bg-zinc-900/25 border border-zinc-800/80 rounded hover:border-zinc-700/80 hover:bg-zinc-900/40 transition-all duration-300 group hover:shadow-lg hover:shadow-accent/5"
  >
    <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 border border-zinc-850 bg-zinc-900 rounded-lg text-accent group-hover:scale-110 group-hover:border-accent/40 transition-all duration-300">
        <GraduationCap className="w-5 h-5" />
      </div>
      <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded group-hover:text-zinc-200 group-hover:border-zinc-700 transition-colors duration-300">
        {edu.duration}
      </span>
    </div>
    <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-accent transition-colors duration-300">
      {edu.degree}
    </h3>
    <p className="flex items-center text-sm font-semibold text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
      <Landmark className="w-4 h-4 mr-2 text-zinc-600 shrink-0 group-hover:text-accent transition-colors" />
      {edu.institution}
    </p>
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
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Education
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
            Academic Background
          </h2>
          <div className="h-[2px] w-12 bg-accent mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.education.map((edu, idx) => (
            <EducationCard key={idx} edu={edu} delay={idx * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
