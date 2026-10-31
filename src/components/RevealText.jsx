import { useRef } from "react";
import { gsap, SplitText, useGSAP, onReady, isReady, prefersReducedMotion } from "../lib/motion";

/**
 * Splits text and reveals it blur-to-sharp while rising.
 * when="scroll" plays on entering the viewport; when="ready" waits for the preloader.
 * Keep children a plain string: gradient text must not be split (background-clip breaks).
 */
export default function RevealText({
  as: Tag = "div",
  children,
  type = "words",
  when = "scroll",
  delay = 0,
  stagger,
  start = "top 88%",
  className = "",
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.from(el, { opacity: 0, duration: 0.6, scrollTrigger: { trigger: el, start, once: true } });
        return;
      }

      const wait = when === "ready" && !isReady();
      let unsub;
      SplitText.create(el, {
        type: type === "chars" ? "words,chars" : "words",
        autoSplit: true,
        onSplit(self) {
          const targets = type === "chars" ? self.chars : self.words;
          const tween = gsap.from(targets, {
            yPercent: 55, opacity: 0, filter: "blur(12px)",
            duration: type === "chars" ? 0.9 : 1.1,
            stagger: stagger ?? (type === "chars" ? 0.035 : 0.07),
            ease: "expo.out", delay, paused: wait,
            scrollTrigger: when === "scroll" ? { trigger: el, start, once: true } : undefined,
          });
          if (wait) unsub = onReady(() => tween.play());
          return tween;
        },
      });
      return () => unsub?.();
    },
    { scope: ref },
  );

  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>;
}
