import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * Restoring the full-screen sticky Cinematic transition that you liked,
 * but significantly tuning the keyframes so it doesn't feel "stuck".
 * 
 * The issue before was that sections paused for too long (large dead zone)
 * while scrolling. We've tightened the enter/exit ranges so the page feels
 * constantly in motion and responsive to your scroll wheel.
 */
export default function CinematicSection({
  id,
  label,
  children,
  scrollMultiplier = 1.5,
  isLast = false,
}) {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef(null);

  // Track scroll progress across the whole tall div
  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  // 🧈 EXTRA BUTTER SMOOTHNESS: physics-based scroll damping
  // This makes the transition glide to a halt instead of stopping rigidly.
  const scrollYProgress = useSpring(rawScrollProgress, {
    stiffness: 80,    // Soft tension for a relaxed pull
    damping: 25,      // Smooth glide, no bounciness
    mass: 0.5,        // Feels lightweight and responsive
    restDelta: 0.0001
  });

  // ─── ENTER PHASE  (progress 0 → 0.45) 
  // Increased from 0.35 so it takes more of the scroll track, reducing the "stuck" time
  const enterY = useTransform(
    scrollYProgress,
    [0, 0.45],
    prefersReduced ? ["0vh", "0vh"] : ["60vh", "0vh"]
  );
  const enterScale = useTransform(
    scrollYProgress,
    [0, 0.45],
    prefersReduced ? [1, 1] : [1.08, 1]
  );
  const enterOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  // ─── EXIT PHASE  (progress 0.55 → 1.0)
  // Starts earlier (0.55 instead of 0.65). This leaves only a 10% "pause" 
  // in the middle where it's fully active, making the scroll feel continuous.
  const exitY = useTransform(
    scrollYProgress,
    [0.55, 1],
    isLast || prefersReduced ? ["0vh", "0vh"] : ["0vh", "-40vh"]
  );
  const exitScale = useTransform(
    scrollYProgress,
    [0.55, 1],
    isLast || prefersReduced ? [1, 1] : [1, 0.92]
  );
  const exitOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.9],
    isLast || prefersReduced ? [1, 1] : [1, 0]
  );

  // ─── CINEMATIC LABEL overlay
  const labelY = useTransform(
    scrollYProgress,
    [0, 0.45],
    prefersReduced ? ["0vh", "0vh"] : ["25vh", "0vh"]
  );
  const labelScale = useTransform(
    scrollYProgress,
    [0, 0.4],
    prefersReduced ? [1, 1] : [1.4, 1]
  );
  const labelOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.65], [
    0, 1, 1, 0,
  ]);

  const contentOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.45],
    [0, 1]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0.25, 0.45],
    prefersReduced ? ["0px", "0px"] : ["24px", "0px"]
  );

  return (
    <div
      ref={trackRef}
      id={id}
      style={{ height: `${scrollMultiplier * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* EXIT Wrapper */}
        <motion.div
          style={{
            y: exitY,
            scale: exitScale,
            opacity: exitOpacity,
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* ENTER Wrapper */}
          <motion.div
            style={{
              y: enterY,
              scale: enterScale,
              opacity: enterOpacity,
              width: "100%",
              height: "100%",
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* The actual content container. Restored overflow-y-auto so tall content doesn't break, 
                but since the dead-zone is small, it won't feel globally stuck. */}
            <div className="w-full h-full overflow-y-auto cinematic-scroll-inner">
              <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="w-full min-h-full flex flex-col justify-center"
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Big Ghost Label */}
        <motion.div
          aria-hidden="true"
          style={{
            y: labelY,
            scale: labelScale,
            opacity: labelOpacity,
          }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-20 select-none"
        >
          <span className="font-display font-black uppercase tracking-[0.12em] text-white/[0.06] cinematic-label">
            {label}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
