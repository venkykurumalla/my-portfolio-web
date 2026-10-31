import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#05060A" : "#EDF0FA");
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* storage blocked */ }
  }, [theme]);

  const isLight = theme === "light";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label="Light theme"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={`glass glass--pill relative h-9 w-[68px] shrink-0 cursor-pointer border-0 p-0 ${className}`}
    >
      <Moon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70" aria-hidden="true" />
      <Sun className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70" aria-hidden="true" />
      <span
        className="absolute left-1 top-1 h-7 w-7 rounded-full bg-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(${isLight ? 32 : 0}px)`, zIndex: 4 }}
      />
    </button>
  );
}
