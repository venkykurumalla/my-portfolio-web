import React from "react";
import { motion } from "framer-motion";
import { Cpu, Globe, Award, Sparkles } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

export default function About() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

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
    <section id="about" className="py-24 border-t border-zinc-900/50 bg-[#09090b]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            About Me
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
            Professional Objective
          </h2>
          <div className="h-[2px] w-12 bg-accent mt-4" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Main Statement */}
          <div className="lg:col-span-3 space-y-6">
            {portfolioData.about.description.map((para, idx) => (
              <p key={idx} className="text-zinc-400 font-medium text-base sm:text-lg leading-relaxed">
                {para}
              </p>
            ))}
            
            <div className="pt-4 grid grid-cols-2 gap-4">
              {portfolioData.about.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm text-zinc-300">
                  <Sparkles className="w-4 h-4 text-accent/80 shrink-0" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cards Panel */}
          <div className="lg:col-span-2 space-y-6">
            {objectivePoints.map((pt, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="p-5 bg-zinc-900/40 border border-zinc-800/80 rounded hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 border border-zinc-850 bg-zinc-900 rounded shrink-0">
                    {pt.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
