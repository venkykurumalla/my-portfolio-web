import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="home-inner"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 bg-[#09090b]"
    >
      {/* Background layer — parallax handled by CinematicSection's GSAP */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.25]" />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[300px] md:h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-3 py-1.5 border border-zinc-800 bg-zinc-900/60 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider text-accent uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span>AI & Full-Stack Development</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-4 drop-shadow-2xl"
          >
            {portfolioData.personalInfo.name}
          </motion.h1>

          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-300 tracking-normal max-w-2xl mb-6"
          >
            {portfolioData.hero.supportingHeadline}
          </motion.h2>

          {/* Objective */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-zinc-400 font-medium leading-relaxed max-w-2xl mb-10"
          >
            {portfolioData.hero.objective}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="group flex items-center justify-center w-full sm:w-auto bg-accent hover:bg-accent/90 text-zinc-950 font-bold px-6 py-3.5 rounded text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
            >
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center w-full sm:w-auto border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 text-zinc-300 hover:text-white font-semibold px-6 py-3.5 rounded text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Contact Me
              <Mail className="ml-2 w-4 h-4" />
            </a>
            <a
              href="/VenkateshKurumalla.pdf?v=2"
              download="Venkatesh_Kurumalla_Resume.pdf"
              className="flex items-center justify-center w-full sm:w-auto text-zinc-400 hover:text-zinc-200 font-semibold px-6 py-3.5 rounded text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              Download Resume
              <Download className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
