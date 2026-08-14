import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../../data/portfolioData";

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="skills" className="py-24 border-t border-zinc-900/50 bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Skills
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
            Technical Expertise
          </h2>
          <div className="h-[2px] w-12 bg-accent mt-4" />
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioData.skills.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded hover:border-zinc-700/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-4 pb-2 border-b border-zinc-800/60">
                  {skillGroup.category}
                </h3>

                {/* Skill Items */}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-accent/40 text-xs sm:text-sm text-zinc-400 hover:text-white font-medium rounded transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
