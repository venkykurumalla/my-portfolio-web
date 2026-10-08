import React from "react";
import { motion } from "framer-motion";
import { Award, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

const CertCard = ({ cert, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 28, scale: 0.94 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    className="group p-5 bg-zinc-900/25 border border-zinc-800/80 rounded hover:border-zinc-700/80 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between hover:shadow-lg hover:shadow-accent/5"
  >
    <div>
      <div className="p-2 border border-zinc-850 bg-zinc-900 rounded-lg w-fit text-accent mb-4 group-hover:scale-110 group-hover:border-accent/40 transition-all duration-300">
        <Award className="w-5 h-5" />
      </div>
      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-accent transition-colors duration-300 leading-snug mb-1">
        {cert.name}
      </h3>
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider group-hover:text-zinc-400 transition-colors">
        {cert.issuer}
      </p>
    </div>

    <div className="mt-6 pt-3 border-t border-zinc-850 flex justify-between items-center text-[10px] text-zinc-500 font-semibold uppercase tracking-wider group-hover:border-zinc-700 transition-colors">
      <span className="group-hover:text-zinc-400 transition-colors">Verified Status</span>
      <a
        href={cert.link}
        className="inline-flex items-center text-[10px] text-zinc-400 hover:text-white transition-colors"
        onClick={(e) => {
          if (cert.link === "#") {
            e.preventDefault();
            alert("Note: This certificate link is a placeholder.");
          }
        }}
      >
        View <ArrowUpRight className="ml-1 w-3 h-3" />
      </a>
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
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Certifications
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
            Professional Credentials
          </h2>
          <div className="h-[2px] w-12 bg-accent mt-4" />
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
