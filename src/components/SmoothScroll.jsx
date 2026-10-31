import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, isTouch, prefersReducedMotion, scrollState } from "../lib/motion";

/**
 * Lenis smooth scroll driven by GSAP's ticker (the only rAF loop) and synced with ScrollTrigger.
 * Phones and tablets skip Lenis entirely and use native scrolling.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    // Touch devices keep native scrolling (fast, natural swipes); Lenis is desktop-only.
    if (prefersReducedMotion() || isTouch()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      syncTouch: false,
    });
    scrollState.lenis = lenis;

    lenis.on("scroll", (e) => {
      scrollState.velocity = e.velocity;
      ScrollTrigger.update();
    });

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]');
      const id = link?.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      scrollState.lenis = null;
    };
  }, []);

  return children;
}
