import React from "react";
import { motion } from "framer-motion";
import { Award, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

const CertCard = ({ cert, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="double-bezel group cursor-default transition-all duration-300"
  >
    <div className="double-bezel-inner p-5 h-full flex flex-col justify-between group-hover:border-accent/30 group-hover:bg-zinc-900/60 transition-colors duration-300">
      <div>
        <div className="p-2.5 border border-white/10 bg-zinc-900/80 rounded-xl w-fit text-accent mb-4 group-hover:scale-105 group-hover:border-accent/40 transition-all duration-300">
          <Award className="w-5 h-5" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-accent transition-colors duration-250 leading-snug mb-1">
          {cert.name}
        </h3>
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider group-hover:text-zinc-300 transition-colors">
          {cert.issuer}
        </p>
      </div>

      <div className="mt-6 pt-3 border-t border-zinc-800/50 flex justify-between items-center text-[11px] text-zinc-500 font-semibold tracking-wider group-hover:border-zinc-700/60 transition-colors">
        <span className="group-hover:text-zinc-400 transition-colors">Verified Credential</span>
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-[11px] text-zinc-300 hover:text-white hover:border-accent/40 transition-all duration-200 active:scale-[0.96]"
          onClick={(e) => {
            if (cert.link === "#") {
              e.preventDefault();
              alert("Note: This certificate link is a placeholder.");
            }
          }}
        >
          <span>View</span>
          <ArrowUpRight className="w-3 h-3 text-accent" />
        </a>
      </div>
    </div>
  </motion.div>
);

export default function Certifications() {
  return (
    <section
      id="certifications-inner"
      className="relative min-h-screen flex items-center bg-[#09090b] py-24"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 -right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Heading */}
        <div className="mb-16" data-reveal>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2.5 inline-block px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            Certifications
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-1">
            Professional Credentials
          </h2>
          <div className="h-[2px] w-14 bg-accent mt-4 strike strike-active" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.certifications.map((cert, idx) => (
            <CertCard key={idx} cert={cert} delay={idx * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
