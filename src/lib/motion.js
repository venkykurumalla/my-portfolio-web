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

// Preloader handshake: hero animations wait until the curtain lifts.
let ready = false;
const subscribers = new Set();
export const isReady = () => ready;
export const onReady = (cb) => {
  if (ready) {
    cb();
    return () => {};
  }
  subscribers.add(cb);
  return () => subscribers.delete(cb);
};
export const setReady = () => {
  ready = true;
  subscribers.forEach((cb) => cb());
  subscribers.clear();
};

export function scrollToTarget(target, options = {}) {
  const { lenis } = scrollState;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, ...options });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "auto" });
}

// Velocity-based skew: tilts a large element while the page scrolls fast.
export function useSkew(max = 5) {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
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
