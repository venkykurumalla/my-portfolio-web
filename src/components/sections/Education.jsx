import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Landmark, Calendar } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

export default function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="education" className="py-24 border-t border-zinc-900/50 bg-[#09090b]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Education
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
            Academic Background
          </h2>
          <div className="h-[2px] w-12 bg-accent mt-4" />
        </div>

        {/* Education Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {portfolioData.education.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-6 bg-zinc-900/25 border border-zinc-800/80 rounded hover:border-zinc-700/80 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 border border-zinc-850 bg-zinc-900 rounded-lg text-accent">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                    {edu.duration}
                  </span>
                </div>

                {/* Degree title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                  {edu.degree}
                </h3>

                {/* Institution */}
                <p className="flex items-center text-sm font-semibold text-zinc-400 leading-relaxed">
                  <Landmark className="w-4 h-4 mr-2 text-zinc-650 shrink-0" />
                  {edu.institution}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
