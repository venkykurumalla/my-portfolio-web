import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                  activeSection === item.href.replace("#", "")
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA Link to GitHub / Mobile Menu Trigger */}
          <div className="flex items-center space-x-4">
            <a
              href={portfolioData.personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white border border-zinc-700/80 hover:border-zinc-500 rounded px-4 py-2 transition-all duration-300"
            >
              GitHub <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors duration-250 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#09090b]/98 backdrop-blur-lg pt-24 px-8 pb-12 flex flex-col justify-between"
          >
            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold tracking-tight py-2 border-b border-zinc-800/60 ${
                    activeSection === item.href.replace("#", "")
                      ? "text-accent"
                      : "text-zinc-300"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col space-y-4">
              <a
                href={portfolioData.personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center border border-zinc-700 hover:border-zinc-500 rounded-md py-3 text-zinc-300 font-semibold tracking-wider transition-colors duration-300"
              >
                GitHub Profile
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
