import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, onReady, isReady, prefersReducedMotion, scrollState } from "../lib/motion";

/**
 * Lenis smooth scroll driven by GSAP's ticker and synced with ScrollTrigger.
 * Touch devices keep native momentum scrolling (syncTouch off) — it feels
 * better on phones and avoids fighting the browser's URL-bar behaviour.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.08,
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
    gsap.ticker.lagSmoothing(0);

    // Hold scrolling until the preloader curtain has lifted.
    if (!isReady()) lenis.stop();
    const unsub = onReady(() => lenis.start());

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
      unsub();
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      scrollState.lenis = null;
    };
  }, []);

  return children;
}
