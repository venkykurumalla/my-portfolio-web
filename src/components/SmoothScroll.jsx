import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll Provider
 * 
 * Uses Lenis to create momentum-based, buttery smooth scrolling —
 * the same technique used by iQOO, Apple, Samsung product pages.
 * 
 * Lenis interpolates between the user's scroll position and where
 * the page actually is, creating a silky glide effect. It then
 * syncs with GSAP's ScrollTrigger so all animations respond to
 * the smooth scroll position rather than the raw jerky browser scroll.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Create the Lenis smooth scroller
    const lenis = new Lenis({
      lerp: 0.08,            // Lower = smoother/slower glide (0.08 is very buttery)
      duration: 1.4,         // Base duration for scroll animations
      smoothWheel: true,     // Smooth mouse wheel
      smoothTouch: false,    // Keep native touch on mobile for best UX
      wheelMultiplier: 0.9,  // Slightly reduce wheel speed for elegance
      touchMultiplier: 1.5,  // Touch feels natural
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP's ScrollTrigger so all GSAP animations
    // respond to the Lenis-smoothed scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP's ticker to drive Lenis (60fps+ sync)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing for consistent frame rate

    // Handle anchor link clicks for smooth navigation
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        const targetId = link.getAttribute("href");
        if (targetId && targetId !== "#") {
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: 0, duration: 1.6 });
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return children;
}
