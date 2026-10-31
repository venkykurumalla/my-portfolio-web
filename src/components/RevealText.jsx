import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "../lib/motion";

/**
 * Splits text and reveals it rising into place (opacity + transform only).
 * Keep children a plain string: gradient text must not be split (background-clip breaks).
 */
export default function RevealText({
  as: Tag = "div",
  children,
  type = "words",
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
        gsap.from(el, { opacity: 0, duration: 0.5, scrollTrigger: { trigger: el, start, once: true } });
        return;
      }

      SplitText.create(el, {
        type: type === "chars" ? "words,chars" : "words",
        autoSplit: true,
        onSplit(self) {
          const targets = type === "chars" ? self.chars : self.words;
          return gsap.from(targets, {
            yPercent: 60, opacity: 0, duration: 0.9,
            stagger: stagger ?? (type === "chars" ? 0.03 : 0.06),
            ease: "expo.out", delay,
            onComplete: () => gsap.set(targets, { clearProps: "willChange" }),
            scrollTrigger: { trigger: el, start, once: true },
          });
        },
      });
    },
    { scope: ref },
  );

  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>;
}
