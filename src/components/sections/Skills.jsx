import React from "react";
import { motion } from "framer-motion";

/**
 * Enhanced skills data with practical descriptions.
 * Each skill now communicates what I can *do* with it,
 * not just that I know the word.
 */
const skillCategories = [
  {
    category: "Frontend",
    skills: [
      {
        name: "HTML",
        desc: "Structure semantic, accessible web content with modern HTML5 elements and best practices.",
      },
      {
        name: "CSS",
        desc: "Style responsive layouts using Flexbox, Grid, animations, and modern CSS features.",
      },
      {
        name: "JavaScript",
        desc: "Build interactive web applications with modern ES6+ patterns, async logic, and DOM manipulation.",
      },
      {
        name: "React.js",
        desc: "Create dynamic user interfaces using reusable components, hooks, context, and modern React patterns.",
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        desc: "Develop backend services, REST APIs, authentication systems, and server-side applications.",
      },

      {
        name: "REST APIs",
        desc: "Design and integrate APIs for frontend-backend and third-party service communication.",
      },
    ],
  },
  {
    category: "Database",
    skills: [
      {
        name: "MongoDB",
        desc: "Design NoSQL databases, schemas, queries, and work with MongoDB Atlas for cloud data.",
      },
      {
        name: "SQL",
        desc: "Write structured queries for relational database management and data retrieval.",
      },
    ],
  },
  {
    category: "Mobile",
    skills: [
      {
        name: "Flutter",
        desc: "Develop cross-platform mobile apps with responsive UI, navigation, APIs, and real-time features.",
      },
      {
        name: "Firebase",
        desc: "Integrate authentication, cloud storage, real-time databases, and serverless functions.",
      },
    ],
  },
  {
    category: "AI / LLM",
    skills: [
      {
        name: "Prompt Engineering",
        desc: "Craft effective prompts to optimize LLM output for specific applications and use cases.",
      },
      {
        name: "LLM APIs",
        desc: "Integrate OpenAI, Gemini, and Ollama APIs into production applications.",
      },
      {
        name: "RAG",
        desc: "Build retrieval-augmented generation pipelines for context-aware AI systems.",
      },
      {
        name: "AI Chatbots",
        desc: "Design and deploy conversational AI for education, support, and domain-specific interactions.",
      },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      {
        name: "Git & GitHub",
        desc: "Manage source code, branches, pull requests, collaboration, and deployment workflows.",
      },
      {
        name: "Postman",
        desc: "Test, debug, and document REST APIs across development and staging environments.",
      },
      {
        name: "Vite",
        desc: "Configure fast build tooling and dev servers for modern frontend projects.",
      },

    ],
  },
  {
    category: "Networking & Cloud",
    skills: [

      {
        name: "Oracle Cloud (OCI)",
        desc: "Deploy and manage infrastructure on Oracle Cloud with certified foundational knowledge.",
      },
    ],
  },
];

/**
 * Individual skill card — Taste Skill Double-Bezel (Doppelrand) architecture.
 * Outer shell with subtle border & highlight + Inner core with distinct background & padding.
 */
const SkillCard = ({ skill, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="double-bezel group cursor-default transition-all duration-300"
  >
    <div className="double-bezel-inner p-4 h-full flex flex-col justify-between group-hover:border-accent/30 group-hover:bg-zinc-900/60 transition-colors duration-300">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-white group-hover:text-accent transition-colors duration-250 tracking-wide">
            {skill.name}
          </h4>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-accent transition-colors duration-300" />
        </div>
        <p className="text-xs text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
          {skill.desc}
        </p>
      </div>
    </div>
  </motion.div>
);

/**
 * Category group — heading with animated strike line, then a grid of Double-Bezel skill cards.
 */
const CategoryGroup = ({ group, categoryDelay = 0 }) => (
  <div className="mb-12 last:mb-0" data-reveal>
    {/* Category heading with Taste Skill strike animation */}
    <div className="mb-5 flex items-center gap-3">
      <h3 className="text-xs font-extrabold text-accent uppercase tracking-[0.18em]">
        {group.category}
      </h3>
      <div className="flex-1 h-px bg-zinc-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/50 to-transparent strike" />
      </div>
    </div>

    {/* Skill cards grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {group.skills.map((skill, sIdx) => (
        <SkillCard
          key={skill.name}
          skill={skill}
          delay={categoryDelay + sIdx * 0.04}
        />
      ))}
    </div>
  </div>
);

export default function Skills() {
  return (
    <section
      id="skills-inner"
      className="relative min-h-screen flex items-start bg-[#09090b] py-24"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section heading */}
        <div className="mb-16" data-reveal>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2.5 inline-block px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            Skills
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-1">
            Technical Expertise
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-medium mt-3 max-w-xl leading-relaxed">
            Not just buzzwords — here's what I can architect and build with each technology.
          </p>
          <div className="h-[2px] w-14 bg-accent mt-4 strike strike-active" />
        </div>

        {/* Grouped skill categories */}
        {skillCategories.map((group, idx) => (
          <CategoryGroup
            key={group.category}
            group={group}
            categoryDelay={idx * 0.05}
          />
        ))}
      </div>
    </section>
  );
}
