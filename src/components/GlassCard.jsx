import { useEffect, useRef } from "react";
import { gsap, isTouch, prefersReducedMotion } from "../lib/motion";

/**
 * Liquid-glass surface. Pointer position feeds --mx/--my for the specular sheen;
 * `tilt` adds a subtle 3D tilt. Both are disabled on touch and reduced motion.
 */
export default function GlassCard({
  as: Tag = "div",
  className = "",
  tilt = false,
  large = false,
  liquid = false,
  tint = false,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch() || prefersReducedMotion()) return;

    const rx = tilt ? gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" }) : null;
    const ry = tilt ? gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" }) : null;
    if (tilt) gsap.set(el, { transformPerspective: 1000 });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      if (tilt) { ry((x / r.width - 0.5) * 9); rx((0.5 - y / r.height) * 9); }
    };
    const leave = () => { if (tilt) { rx(0); ry(0); } };

    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [tilt]);

  return (
    <Tag
      ref={ref}
      className={`glass ${large ? "glass--lg" : ""} ${liquid ? "glass--liquid" : ""} ${tint ? "glass--tint" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
