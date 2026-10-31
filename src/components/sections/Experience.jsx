import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

const TimelineItem = ({ job, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ x: 4 }}
    className="relative group double-bezel transition-all duration-300"
  >
    {/* Timeline Bullet */}
    <div className="absolute -left-[35px] md:-left-[51px] top-6 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-accent transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.6)]" />

    <div className="double-bezel-inner p-6 group-hover:border-accent/30 group-hover:bg-zinc-900/60 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-accent transition-colors duration-250">
            {job.role}
          </h3>
          <p className="text-sm font-semibold text-zinc-300 mt-0.5">
            {job.company} {job.type && <span className="text-xs font-medium text-zinc-500">({job.type})</span>}
          </p>
        </div>
        <div className="flex items-center text-xs font-semibold text-zinc-300 bg-zinc-900/90 border border-white/10 px-3 py-1.5 rounded-full shrink-0 w-fit group-hover:border-accent/40 transition-colors duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
          <Calendar className="w-3.5 h-3.5 mr-1.5 text-accent" />
          {job.duration}
        </div>
      </div>

      {job.description ? (
        <p className="text-zinc-400 font-medium text-xs sm:text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
          {job.description}
        </p>
      ) : (
        <p className="text-zinc-500 font-medium text-xs italic">
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
        <div className="mb-16" data-reveal>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2.5 inline-block px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            Experience
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-1">
            Internship History
          </h2>
          <div className="h-[2px] w-14 bg-accent mt-4 strike strike-active" />
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-zinc-800/80 pl-6 md:pl-10 space-y-8 ml-4">
          {portfolioData.experience.map((job, idx) => (
            <TimelineItem key={idx} job={job} delay={idx * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
