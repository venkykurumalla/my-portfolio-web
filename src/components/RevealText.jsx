import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "../lib/motion";

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
      const mm = gsap.matchMedia();

      // Desktop: split-text reveal. Phones use the CSS one-shot reveal (data-reveal) instead.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        SplitText.create(el, {
          type: type === "chars" ? "words,chars" : "words",
          autoSplit: true,
          onSplit(self) {
            const targets = type === "chars" ? self.chars : self.words;
            return gsap.from(targets, {
              yPercent: 60, opacity: 0, duration: 0.9,
              stagger: stagger ?? (type === "chars" ? 0.03 : 0.06),
              ease: "expo.out", delay,
              scrollTrigger: { trigger: el, start, once: true },
            });
          },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(el, { opacity: 0, duration: 0.5, scrollTrigger: { trigger: el, start, once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <Tag ref={ref} data-reveal="blur" className={className} {...rest}>{children}</Tag>;
}
