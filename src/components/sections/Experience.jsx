import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="experience" className="py-24 border-t border-zinc-900/50 bg-[#09090b]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Experience
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
            Internship History
          </h2>
          <div className="h-[2px] w-12 bg-accent mt-4" />
        </div>

        {/* Timeline Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l-2 border-zinc-800/80 pl-6 md:pl-10 space-y-12 ml-4"
        >
          {portfolioData.experience.map((job, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative group"
            >
              {/* Timeline Bullet */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-accent transition-transform duration-250 group-hover:scale-125" />

              {/* Job Details Card */}
              <div className="p-6 bg-zinc-900/25 border border-zinc-800/80 rounded hover:border-zinc-700/80 hover:bg-zinc-900/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    {/* Role Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-accent transition-colors duration-250">
                      {job.role}
                    </h3>
                    {/* Company Info */}
                    <p className="text-sm font-semibold text-zinc-300">
                      {job.company} {job.type && <span className="text-xs font-medium text-zinc-500">({job.type})</span>}
                    </p>
                  </div>

                  {/* Dates & Duration */}
                  <div className="flex items-center text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded shrink-0 w-fit">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-accent" />
                    {job.duration}
                  </div>
                </div>

                {/* Role Description - Only rendered if description exists in data */}
                {job.description ? (
                  <p className="text-zinc-400 font-medium text-xs sm:text-sm leading-relaxed mt-2">
                    {job.description}
                  </p>
                ) : (
                  <p className="text-zinc-500 font-medium text-xs italic mt-2">
                    Internship details completed successfully.
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
