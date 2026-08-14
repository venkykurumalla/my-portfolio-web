import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

export default function Certifications() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="certifications" className="py-24 border-t border-zinc-900/50 bg-[#09090b]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Certifications
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
            Professional Credentials
          </h2>
          <div className="h-[2px] w-12 bg-accent mt-4" />
        </div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {portfolioData.certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group p-5 bg-zinc-900/25 border border-zinc-800/80 rounded hover:border-zinc-700/80 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="p-2 border border-zinc-850 bg-zinc-900 rounded-lg w-fit text-accent mb-4">
                  <Award className="w-5 h-5" />
                </div>

                {/* Certification Name */}
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-accent transition-colors duration-250 leading-snug mb-1">
                  {cert.name}
                </h3>

                {/* Issuer */}
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {cert.issuer}
                </p>
              </div>

              {/* Link Placeholder */}
              <div className="mt-6 pt-3 border-t border-zinc-850 flex justify-between items-center text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                <span>Verified Status</span>
                <a
                  href={cert.link}
                  className="inline-flex items-center text-[10px] text-zinc-400 hover:text-white transition-colors duration-200"
                  onClick={(e) => {
                    if (cert.link === "#") {
                      e.preventDefault();
                      alert("Note: This certificate link is a placeholder. It can be updated in portfolioData.js.");
                    }
                  }}
                >
                  View <ArrowUpRight className="ml-1 w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
