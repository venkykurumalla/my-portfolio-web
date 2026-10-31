import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, scrollState, prefersReducedMotion } from "../lib/motion";

/** Infinite row whose speed reacts to scroll velocity. direction: 1 = left, -1 = right. */
export default function Marquee({ children, direction = 1, speed = 55 }) {
  const root = useRef(null);
  const track = useRef(null);
  const group = useRef(null);
  const reduced = typeof window !== "undefined" && prefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const setX = gsap.quickSetter(track.current, "x", "px");
      let width = group.current.offsetWidth;
      let x = direction > 0 ? 0 : -width;
      const phone = window.matchMedia("(max-width: 767px)").matches;
      const base = phone ? speed * 0.6 : speed;
      let boost = 1;
      let visible = false;

      const measure = () => { width = group.current.offsetWidth; };
      const ro = new ResizeObserver(measure);
      ro.observe(group.current);

      const st = ScrollTrigger.create({
        trigger: root.current, start: "top bottom", end: "bottom top",
        onToggle: (self) => {
          visible = self.isActive;
          track.current.style.willChange = visible ? "transform" : "auto";
        },
      });

      const tick = (_t, delta) => {
        if (!visible) return;
        const targetBoost = 1 + Math.min(Math.abs(scrollState.velocity) * (phone ? 0.25 : 0.4), phone ? 5 : 9);
        boost += (targetBoost - boost) * 0.08;
        x -= direction * base * (delta / 1000) * boost;
        if (direction > 0 && x <= -width) x += width;
        if (direction < 0 && x >= 0) x -= width;
        setX(x);
      };
      gsap.ticker.add(tick);
      return () => { gsap.ticker.remove(tick); ro.disconnect(); st.kill(); };
    },
    { scope: root },
  );

  if (reduced) {
    return <div className="flex flex-wrap justify-center gap-3">{children}</div>;
  }

  return (
    <div ref={root} className="marquee" aria-hidden="false">
      <div ref={track} className="marquee-track">
        <div ref={group} className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">{children}</div>
        <div className="marquee-group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
