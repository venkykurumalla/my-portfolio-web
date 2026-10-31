import { useEffect, useRef } from "react";
import { gsap, isTouch, prefersReducedMotion } from "../lib/motion";

/** Button/link that leans toward the cursor. Falls back to a plain element on touch. */
export default function MagneticButton({
  as: Tag = "a",
  variant = "glass",
  strength = 0.35,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const inner = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch() || prefersReducedMotion()) return;
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const ix = gsap.quickTo(inner.current, "x", { duration: 0.5, ease: "power3" });
    const iy = gsap.quickTo(inner.current, "y", { duration: 0.5, ease: "power3" });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x(dx * strength); y(dy * strength); ix(dx * strength * 0.5); iy(dy * strength * 0.5);
    };
    const leave = () => { x(0); y(0); ix(0); iy(0); };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [strength]);

  const cls = variant === "icon" ? "btn btn-glass btn-icon" : `btn btn-${variant}`;
  return (
    <Tag ref={ref} className={`${cls} ${className}`} {...rest}>
      <span ref={inner} className="inline-flex items-center gap-2.5">{children}</span>
    </Tag>
  );
}
