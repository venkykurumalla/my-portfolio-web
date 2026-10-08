import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

const TimelineItem = ({ job, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -32, scale: 0.96 }}
    whileInView={{ opacity: 1, x: 0, scale: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className="relative group"
  >
    {/* Timeline Bullet */}
    <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-accent transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_14px_rgba(16,185,129,0.5)]" />

    <div className="p-6 bg-zinc-900/25 border border-zinc-800/80 rounded hover:border-zinc-700/80 hover:bg-zinc-900/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">
            {job.role}
          </h3>
          <p className="text-sm font-semibold text-zinc-300">
            {job.company} {job.type && <span className="text-xs font-medium text-zinc-500">({job.type})</span>}
          </p>
        </div>
        <div className="flex items-center text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded shrink-0 w-fit group-hover:border-accent/40 group-hover:text-zinc-200 transition-colors duration-300">
          <Calendar className="w-3.5 h-3.5 mr-1.5 text-accent" />
          {job.duration}
        </div>
      </div>

      {job.description ? (
        <p className="text-zinc-400 font-medium text-xs sm:text-sm leading-relaxed mt-2 group-hover:text-zinc-300 transition-colors">
          {job.description}
        </p>
      ) : (
        <p className="text-zinc-500 font-medium text-xs italic mt-2">
          Internship details completed successfully.
        </p>
      )}
    </div>
  </motion.div>
);

export default function Experience() {
  return (
    <section
      id="experience-inner"
      className="relative min-h-screen flex items-center bg-[#09090b] py-24"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 -right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Heading */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Experience
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
            Internship History
          </h2>
          <div className="h-[2px] w-12 bg-accent mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-zinc-800/80 pl-6 md:pl-10 space-y-12 ml-4">
          {portfolioData.experience.map((job, idx) => (
            <TimelineItem key={idx} job={job} delay={idx * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
