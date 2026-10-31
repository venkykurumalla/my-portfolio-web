import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Home, Layers, Mail, User } from "lucide-react";
import { sections } from "../lib/useActiveSection";
import { scrollToTarget } from "../lib/motion";
import ThemeToggle from "../components/ThemeToggle";
import ScrollProgress from "../components/ScrollProgress";

const tabs = [
  { id: "home", label: "Home", icon: Home, target: "home", covers: ["home"] },
  { id: "about", label: "About", icon: User, target: "about", covers: ["about", "skills"] },
  { id: "work", label: "Work", icon: Layers, target: "projects", covers: ["projects"] },
  { id: "experience", label: "Journey", icon: Briefcase, target: "experience", covers: ["experience", "education", "certifications"] },
  { id: "contact", label: "Contact", icon: Mail, target: "contact", covers: ["contact"] },
];

export function TopBar({ active }) {
  const label = sections.find((s) => s.id === active)?.label ?? "";
  return (
    <header className="m-topbar">
      <a href="#home" className="m-logo" aria-label="VK, Venkatesh Kurumalla, back to top">VK</a>
      <span className="m-toplabel" aria-hidden="true">{label}</span>
      <ThemeToggle />
      <ScrollProgress />
    </header>
  );
}

export function TabBar({ active }) {
  const [hidden, setHidden] = useState(false);

  // Hides while scrolling down, springs back on scroll up (and at the very top).
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - last;
        if (Math.abs(dy) > 6) { setHidden(dy > 0 && y > 140); last = y; }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="m-tabbar"
      aria-label="Sections"
      animate={{ y: hidden ? 120 : 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <ul role="tablist">
        {tabs.map(({ id, label, icon: Icon, target, covers }) => {
          const isActive = covers.includes(active);
          return (
            <li key={id} role="presentation">
              <motion.a
                role="tab"
                href={`#${target}`}
                aria-selected={isActive}
                aria-current={isActive ? "true" : undefined}
                className="m-tab"
                whileTap={{ scale: 0.86 }}
                onClick={(e) => { e.preventDefault(); setHidden(false); scrollToTarget(`#${target}`); }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-blob"
                    className="m-tab-blob"
                    transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.8 }}
                  />
                )}
                <Icon className="m-tab-icon" aria-hidden="true" strokeWidth={2} />
                <span className="m-tab-label">{label}</span>
              </motion.a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
