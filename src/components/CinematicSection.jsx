import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CinematicSection — GSAP ScrollTrigger + Lenis powered
 * 
 * This replaces the old Framer Motion useSpring approach with
 * GSAP's ScrollTrigger `scrub`, which is the industry standard
 * for premium scroll-linked animations (used by iQOO, Apple, etc.)
 * 
 * KEY DIFFERENCE: `scrub: 1` means the animation is directly tied
 * to the scroll position with a 1-second smoothing lag. This creates
 * the "buttery" feel — the animation continues to glide for a moment
 * after you stop scrolling, rather than stopping abruptly.
 * 
 * Combined with Lenis smooth scrolling, this gives the exact same
 * premium feel as the iQOO Neo 10 product page.
 */
export default function CinematicSection({
  id,
  label,
  children,
  isLast = false,
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const labelRef = useRef(null);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const labelEl = labelRef.current;
    const bgEl = bgRef.current;
    if (!section || !content) return;

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // ─── ENTER ANIMATION ─────────────────────────────────────
      // Content slides up from below and fades in as section enters viewport
      gsap.fromTo(
        content,
        {
          y: prefersReduced ? 0 : 100, // Fixed pixels instead of yPercent to prevent tall sections from creating massive gaps
          opacity: 0,
          scale: prefersReduced ? 1 : 0.92,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",      // Start when section top hits 85% of viewport
            end: "top 20%",        // End when section top hits 20% of viewport
            scrub: 1.2,            // 1.2s smooth lag — the magic butter
            invalidateOnRefresh: true,
          },
        }
      );

      // ─── EXIT ANIMATION ──────────────────────────────────────
      // Content slides up and fades out as section leaves viewport
      if (!isLast) {
        gsap.fromTo(
          content,
          {
            y: 0,
            opacity: 1,
            scale: 1,
          },
          {
            y: prefersReduced ? 0 : -100, // Fixed pixels instead of yPercent
            opacity: 0,
            scale: prefersReduced ? 1 : 0.96,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "bottom 80%",   // Start exit when section bottom hits 80%
              end: "bottom 10%",     // Complete exit when section bottom leaves
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // ─── GHOST LABEL ANIMATION ───────────────────────────────
      // The label starts large and zooms down to normal size,
      // creating the effect of coming from the display towards the back.
      if (labelEl && !prefersReduced) {
        // 1. Enter/Exit (Scale & Opacity)
        const labelTL = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            end: "bottom 5%",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        labelTL
          // ENTER: zoom from large to normal, fade in
          .fromTo(
            labelEl,
            { scale: 1.8, opacity: 0, yPercent: 20 },
            { scale: 1, opacity: 1, yPercent: 0, duration: 0.35, ease: "none" }
          )
          // HOLD: stay visible while content is being read
          .to(labelEl, { scale: 1, opacity: 1, duration: 0.3, ease: "none" })
          // EXIT: scale down slightly and fade out
          .to(labelEl, {
            scale: 0.8,
            opacity: 0,
            yPercent: -15,
            duration: 0.35,
            ease: "none",
          });

        // 2. Continuous Horizontal Parallax (Right to Left sweep)
        // This runs independently over the entire scroll duration of the section
        gsap.fromTo(
          labelEl.querySelector('.cinematic-label'),
          { x: "15vw" }, // Start pushed to the right
          {
            x: "-15vw",  // Sweep to the left
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // ─── BACKGROUND PARALLAX GLOW ────────────────────────────
      // Subtle parallax on the background glow element
      if (bgEl && !prefersReduced) {
        gsap.fromTo(
          bgEl,
          { yPercent: 20, opacity: 0 },
          {
            yPercent: -20,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,  // Extra smooth parallax
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert(); // Clean up GSAP animations
  }, [isLast]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="cinematic-section relative"
    >
      {/* Background parallax glow */}
      <div
        ref={bgRef}
        className="absolute top-0 w-full h-screen pointer-events-none overflow-hidden z-0"
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px]" />
      </div>

      {/* Ghost label — visible behind content with zoom-from-front effect */}
      <div
        ref={labelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 w-full h-screen flex items-center justify-center z-[1] select-none overflow-hidden"
        style={{ willChange: "transform, opacity", opacity: 0 }}
      >
        <span className="font-display font-black uppercase tracking-[0.12em] text-white/15 cinematic-label drop-shadow-2xl">
          {label}
        </span>
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10"
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </div>
    </section>
  );
}
