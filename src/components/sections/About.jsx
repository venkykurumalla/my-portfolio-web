import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Globe, Award, Sparkles } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

const ObjectiveCard = ({ pt, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="double-bezel group cursor-default transition-all duration-300"
  >
    <div className="double-bezel-inner p-5 flex items-start space-x-4 h-full group-hover:border-accent/30 group-hover:bg-zinc-900/60 transition-colors duration-300">
      <div className="p-2.5 border border-white/10 bg-zinc-900/80 rounded-xl shrink-0 group-hover:border-accent/40 group-hover:scale-105 transition-all duration-300">
        {pt.icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5 group-hover:text-accent transition-colors duration-300">
          {pt.title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
          {pt.desc}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function About() {
  const objectivePoints = [
    {
      icon: <Cpu className="w-5 h-5 text-accent" />,
      title: "AI & Large Language Models",
      desc: "Deep interest in modern AI technologies, prompt engineering, and building chatbot or educational platforms powered by LLMs."
    },
    {
      icon: <Globe className="w-5 h-5 text-accent" />,
      title: "Full-Stack Development",
      desc: "Building complete web applications using modern web technologies: HTML, CSS, JavaScript, React.js, Node.js, and Express.js."
    },
    {
      icon: <Award className="w-5 h-5 text-accent" />,
      title: "Internship Objective",
      desc: "Focused on applying technical skills, gaining industry experience, and contributing to innovative software solutions."
    }
  ];

  return (
    <section
      id="about-inner"
      className="relative min-h-screen flex items-center bg-[#09090b] py-24"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Heading */}
        <div className="mb-16" data-reveal>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2.5 inline-block px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            About Me
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-1">
            Professional Objective
          </h2>
          <div className="h-[2px] w-14 bg-accent mt-4 strike strike-active" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Main Statement */}
          <div className="lg:col-span-3 space-y-6">
            {portfolioData.about.description.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="text-zinc-400 font-medium text-base sm:text-lg leading-relaxed"
              >
                {para}
              </motion.p>
            ))}

            <div className="pt-4 grid grid-cols-2 gap-4" data-reveal>
              {portfolioData.about.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2.5 text-sm text-zinc-300 group cursor-default transition-transform duration-200 hover:translate-x-1"
                >
                  <Sparkles className="w-4 h-4 text-accent/80 shrink-0 group-hover:text-accent transition-colors" />
                  <span className="font-semibold group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cards Panel */}
          <div className="lg:col-span-2 space-y-5">
            {objectivePoints.map((pt, idx) => (
              <ObjectiveCard key={idx} pt={pt} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
