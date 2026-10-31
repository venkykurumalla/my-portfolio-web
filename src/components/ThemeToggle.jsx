import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { prefersReducedMotion } from "../lib/motion";

const STORAGE_KEY = "theme";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#05060A" : "#EDF0FA");
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* storage blocked */ }
  }, [theme]);

  const isLight = theme === "light";

  // Circular reveal spreading from the button (View Transitions API); plain switch elsewhere.
  const toggle = (e) => {
    const next = isLight ? "dark" : "light";
    const apply = () => { document.documentElement.dataset.theme = next; setTheme(next); };
    if (!document.startViewTransition || prefersReducedMotion()) { apply(); return; }

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready
      .then(() => document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      ))
      .catch(() => {});
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label="Light theme"
      onClick={toggle}
      className={`chip relative h-11 w-[80px] shrink-0 cursor-pointer border-0 p-0 ${className}`}
    >
      <Moon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70" aria-hidden="true" />
      <Sun className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70" aria-hidden="true" />
      <span
        className="absolute left-1 top-1 h-9 w-9 rounded-full bg-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(${isLight ? 36 : 0}px)`, zIndex: 4 }}
      />
    </button>
  );
}
