import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sections, useActiveSection } from "../lib/useActiveSection";
import { scrollState, scrollToTarget } from "../lib/motion";
import ThemeToggle from "./ThemeToggle";

const menuVariants = {
  hidden: { opacity: 0, transition: { duration: 0.3 } },
  show: { opacity: 1, transition: { duration: 0.35, staggerChildren: 0.06, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Navbar() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const menu = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Full-screen menu: lock scroll, Escape closes, Tab stays inside, focus returns to the button.
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("menu-open");
    scrollState.lenis?.stop();
    const links = () => Array.from(menu.current?.querySelectorAll("a, button") ?? []);
    links()[0]?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab") return;
      const items = links();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const button = toggle.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
      scrollState.lenis?.start();
      button?.focus();
    };
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    // Wait a beat so the menu's scroll lock releases before Lenis scrolls.
    window.setTimeout(() => scrollToTarget(`#${id}`), open ? 80 : 0);
  };

  return (
    <>
      <a href="#main" className="sr-only-focusable glass glass--flat glass--pill fixed left-4 top-4 z-[70] px-4 py-2 text-sm">
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-4 pointer-events-none">
        <nav
          aria-label="Primary"
          className={`nav glass glass--pill pointer-events-auto flex items-center gap-1.5 py-2 pl-2.5 pr-2.5 ${scrolled ? "is-scrolled" : ""}`}
        >
          <a href="#home" onClick={go("home")} aria-label="Venkatesh Kurumalla — home"
             className="display grid h-9 w-9 place-items-center rounded-full text-sm text-white"
             style={{ background: "linear-gradient(135deg, var(--blue), var(--violet))", letterSpacing: "-0.04em" }}>
            VK
          </a>

          <ul className="hidden items-center lg:flex">
            {sections.map((s) => (
              <li key={s.id} className="relative">
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--glass-fill-strong)", boxShadow: "inset 0 1px 0 var(--glass-border-hi), inset 0 0 0 1px var(--glass-border-lo)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.9 }}
                  />
                )}
                <a href={`#${s.id}`} onClick={go(s.id)} className="nav-link relative block" aria-current={active === s.id}>
                  {s.short}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle className="ml-1" />

          <button
            ref={toggle}
            type="button"
            className="chip relative grid h-9 w-9 cursor-pointer place-items-center border-0 !p-0 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            style={{ zIndex: 70 }}
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span className="absolute left-0 h-[2px] w-4 rounded bg-current transition-all duration-300" style={{ top: open ? 5 : 0, transform: open ? "rotate(45deg)" : "none" }} />
              <span className="absolute left-0 top-[5px] h-[2px] w-4 rounded bg-current transition-opacity duration-200" style={{ opacity: open ? 0 : 1 }} />
              <span className="absolute left-0 h-[2px] w-4 rounded bg-current transition-all duration-300" style={{ top: open ? 5 : 10, transform: open ? "rotate(-45deg)" : "none" }} />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menu}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[55] flex flex-col justify-center px-8 lg:hidden"
            style={{ background: "color-mix(in srgb, var(--bg) 62%, transparent)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <ul className="flex flex-col gap-1">
              {sections.map((s, i) => (
                <motion.li key={s.id} variants={itemVariants}>
                  <a href={`#${s.id}`} onClick={go(s.id)}
                     className="display flex items-baseline gap-4 py-2 text-[clamp(2rem,9vw,3.4rem)]"
                     style={{ color: active === s.id ? "var(--cyan)" : "var(--fg)", textDecoration: "none" }}>
                    <span className="text-xs font-medium tabular-nums dim">{String(i + 1).padStart(2, "0")}</span>
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a variants={itemVariants} href="/resume.pdf" download="Venkatesh_Kurumalla_Resume.pdf"
              className="btn btn-primary mt-8 self-start">
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
