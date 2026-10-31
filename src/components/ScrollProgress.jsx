import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/motion";

export default function ScrollProgress() {
  const bar = useRef(null);
  useGSAP(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: 0, end: "max", scrub: prefersReducedMotion() ? true : 0.3 },
    });
  });
  return <div ref={bar} className="scroll-progress" aria-hidden="true" />;
}
