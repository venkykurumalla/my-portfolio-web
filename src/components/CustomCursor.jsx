import { useEffect, useRef } from "react";
import { gsap, isTouch, prefersReducedMotion } from "../lib/motion";

// Small dot + lagging glass ring. Disabled on touch devices and for reduced motion.
export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (isTouch() || prefersReducedMotion()) return;
    const root = document.documentElement;
    document.body.classList.add("has-cursor");

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });

    const move = (e) => {
      root.classList.add("cursor-ready");
      dotX(e.clientX); dotY(e.clientY); ringX(e.clientX); ringY(e.clientY);
    };
    const over = (e) => {
      const hot = e.target.closest?.("a, button, [role='button'], input, textarea, label, [data-cursor]");
      ring.current?.classList.toggle("is-hover", !!hot);
    };
    const down = () => ring.current?.classList.add("is-down");
    const up = () => ring.current?.classList.remove("is-down");
    const leave = () => root.classList.remove("cursor-ready");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      document.body.classList.remove("has-cursor");
      root.classList.remove("cursor-ready");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
