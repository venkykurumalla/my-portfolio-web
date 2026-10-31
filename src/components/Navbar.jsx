import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState(null);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" }
  ];

  // Track scrolling to add background blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href.replace("#", ""));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/50 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            className="font-display font-bold text-lg tracking-tight hover:text-accent transition-colors duration-200"
          >
            {portfolioData.personalInfo.name}
            <span className="text-accent">.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 p-1.5 bg-zinc-900/40 border border-zinc-800/40 rounded-full backdrop-blur-xl shadow-lg shadow-black/20">
            {navItems.map((item) => {
              const itemKey = item.href.replace("#", "");
              const isActive = activeSection === itemKey;
              
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full z-10 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span className="relative z-10 drop-shadow-sm">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-white/5 border border-white/5 rounded-full z-0 shadow-[0_4px_16px_rgba(255,255,255,0.02)] backdrop-blur-2xl"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                        mass: 0.8
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA Link to GitHub / Mobile Menu Trigger */}
          <div className="flex items-center space-x-3">
            <a
              href={portfolioData.personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white border border-white/10 hover:border-white/25 bg-zinc-900/60 backdrop-blur-md rounded-full px-4 py-2 transition-all duration-200 active:scale-[0.97] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
            >
              <span>GitHub</span>
              <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3 h-3 text-accent" />
              </span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-full border border-white/10 bg-zinc-900/60 backdrop-blur-md text-zinc-300 hover:text-white transition-all duration-200 active:scale-[0.95] focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation — Taste Skill Staggered Mask Reveal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 lg:hidden bg-[#09090b]/98 backdrop-blur-2xl pt-24 px-8 pb-12 flex flex-col justify-between"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 + 0.1, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold tracking-tight py-2.5 border-b border-zinc-800/50 flex items-center justify-between active:scale-[0.98] transition-transform ${
                    activeSection === item.href.replace("#", "")
                      ? "text-accent"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.href.replace("#", "") && (
                    <span className="w-2 h-2 rounded-full bg-accent" />
                  )}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col space-y-4 pt-6 border-t border-zinc-800/50">
              <a
                href={portfolioData.personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center border border-white/10 hover:border-accent/40 bg-zinc-900/80 rounded-full py-3.5 text-zinc-200 font-semibold tracking-wider text-sm transition-all duration-200 active:scale-[0.98]"
              >
                GitHub Profile ↗
              </a>
              <p className="text-center text-xs text-zinc-500 font-medium">
                &copy; {new Date().getFullYear()} {portfolioData.personalInfo.name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
