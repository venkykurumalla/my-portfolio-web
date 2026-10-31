import { useEffect, useState } from "react";

export const sections = [
  { id: "home", label: "Home", short: "Home" },
  { id: "about", label: "About", short: "About" },
  { id: "skills", label: "Skills", short: "Skills" },
  { id: "projects", label: "Projects", short: "Work" },
  { id: "experience", label: "Experience", short: "Experience" },
  { id: "education", label: "Education", short: "Education" },
  { id: "certifications", label: "Certifications", short: "Certs" },
  { id: "contact", label: "Contact", short: "Contact" },
];

// The section crossing the vertical middle of the viewport is the active one.
export function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const seen = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const current = sections.find((s) => seen.get(s.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    const observeAll = () => {
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
      });
    };
    observeAll();
    // Sections are lazy-loaded; observe again once they exist.
    const retry = window.setTimeout(observeAll, 2500);
    const late = window.setInterval(observeAll, 1000);
    const stop = window.setTimeout(() => window.clearInterval(late), 6000);

    return () => {
      observer.disconnect();
      window.clearTimeout(retry);
      window.clearTimeout(stop);
      window.clearInterval(late);
    };
  }, []);

  return active;
}
