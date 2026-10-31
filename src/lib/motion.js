import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

// Shared scroll state, written by SmoothScroll and read by marquee / skew effects.
export const scrollState = { velocity: 0, lenis: null };

export function scrollToTarget(target, options = {}) {
  const { lenis } = scrollState;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, ...options });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

// Velocity-based skew: tilts a large element while the page scrolls fast.
export function useSkew(max = 5) {
  const ref = useRef(null);
  useGSAP(
    () => {
      // Desktop only: skewing large text on phones costs frames for little payoff.
      if (prefersReducedMotion() || isTouch() || window.innerWidth < 1024 || !ref.current) return;
      const setSkew = gsap.quickSetter(ref.current, "skewY", "deg");
      let current = 0;
      const tick = () => {
        const target = gsap.utils.clamp(-max, max, scrollState.velocity * 0.2);
        const next = current + (target - current) * 0.12;
        if (Math.abs(next - current) < 0.005 && Math.abs(next) < 0.01) return;
        current = next;
        setSkew(current);
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: ref },
  );
  return ref;
}

// Runs `callback` only when the user hasn't asked for reduced motion. Without it, content just
// stays in its normal, fully visible state (no hidden start states are ever applied).
export function useMotionSafe(callback, config) {
  return useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => callback());
    return () => mm.revert();
  }, config);
}
