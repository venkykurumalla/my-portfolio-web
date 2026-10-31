import { gsap, useMotionSafe } from "../lib/motion";

/**
 * Shared section transitions (phones): label pill slides in with a glass shine, the title scales up
 * from small with a one-off blur, and the content wrapper is revealed by a curved clip-path wipe.
 * All are time-based one-shots, so they always finish fully visible.
 */
export function useSectionIntro(scope, { wipe = true } = {}) {
  useMotionSafe(
    () => {
      const root = scope.current;
      if (!root) return;
      const label = root.querySelector(".m-label");
      const title = root.querySelector(".m-title");
      const body = root.querySelector(".m-wipe");

      if (label) {
        gsap.from(label, {
          x: -28, opacity: 0, duration: 0.7, ease: "expo.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: label, start: "top 90%", once: true, onEnter: () => label.classList.add("is-shining") },
        });
      }
      if (title) {
        gsap.from(title, {
          scale: 0.82, y: 18, opacity: 0, filter: "blur(10px)", transformOrigin: "0% 50%",
          duration: 0.85, ease: "expo.out", clearProps: "transform,opacity,filter",
          scrollTrigger: { trigger: title, start: "top 90%", once: true },
        });
      }
      if (wipe && body) {
        gsap.fromTo(body, { clipPath: "circle(0% at 50% 0%)" }, {
          clipPath: "circle(200% at 50% 0%)", duration: 1.1, ease: "power3.out", clearProps: "clipPath",
          scrollTrigger: { trigger: body, start: "top 92%", once: true },
        });
      }
    },
    { scope },
  );
}
