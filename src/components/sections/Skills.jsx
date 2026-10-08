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
 * Individual skill card — name prominently, description below, subtle hover lift.
 */
const SkillCard = ({ skill, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -3, scale: 1.015 }}
    className="p-4 bg-zinc-900/50 border border-zinc-800/70 rounded hover:border-accent/30 hover:bg-zinc-900/80 transition-colors duration-300 cursor-default group"
  >
    <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-accent transition-colors duration-250 tracking-wide">
      {skill.name}
    </h4>
    <p className="text-xs text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">
      {skill.desc}
    </p>
  </motion.div>
);

/**
 * Category group — heading, then a grid of skill cards.
 */
const CategoryGroup = ({ group, categoryDelay = 0 }) => (
  <div className="mb-12 last:mb-0">
    {/* Category heading */}
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: categoryDelay, ease: "easeOut" }}
      className="mb-5 flex items-center gap-3"
    >
      <h3 className="text-xs font-extrabold text-accent uppercase tracking-[0.15em]">
        {group.category}
      </h3>
      <div className="flex-1 h-px bg-zinc-800/60" />
    </motion.div>

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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Skills
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
            Technical Expertise
          </h2>
          <p className="text-sm text-zinc-500 font-medium mt-3 max-w-xl">
            Not just buzzwords — here's what I can build with each technology.
          </p>
          <div className="h-[2px] w-12 bg-accent mt-4" />
        </motion.div>

        {/* Grouped skill categories */}
        {skillCategories.map((group, idx) => (
          <CategoryGroup
            key={group.category}
            group={group}
            categoryDelay={idx * 0.06}
          />
        ))}
      </div>
    </section>
  );
}
