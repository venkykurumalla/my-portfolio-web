import { useRef } from "react";
import { gsap, useGSAP, useSkew, prefersReducedMotion } from "../lib/motion";
import RevealText from "./RevealText";

export function SectionHeader({ eyebrow, title, align = "left", className = "" }) {
  const skew = useSkew(3);
  return (
    <header className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""} ${className}`}>
      <span className="eyebrow chip mb-5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 10px var(--cyan)" }} />
        {eyebrow}
      </span>
      <h2 ref={skew} className="display text-[clamp(2.2rem,6vw,4.5rem)]">
        <RevealText as="span" className="block">{title}</RevealText>
      </h2>
    </header>
  );
}

/**
 * Page section. `reveal` adds a clip-path mask reveal on enter — leave it off for sections
 * that pin their own content, since clip-path ancestors would clip a fixed pin.
 */
export default function Section({ id, eyebrow, title, reveal = true, align, className = "", children }) {
  const root = useRef(null);
  const body = useRef(null);

  useGSAP(
    () => {
      if (!reveal || !body.current) return;
      if (prefersReducedMotion()) {
        gsap.from(body.current, { opacity: 0, duration: 0.7, scrollTrigger: { trigger: body.current, start: "top 85%", once: true } });
        return;
      }
      gsap.from(body.current, {
        clipPath: "inset(7% 3% 0% 3% round 48px)", y: 60, opacity: 0, duration: 1.3, ease: "expo.out",
        clearProps: "clipPath,transform,opacity",
        scrollTrigger: { trigger: body.current, start: "top 88%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id={id} className={`section ${className}`} aria-label={eyebrow}>
      <div className="container-x">
        {eyebrow && title && <SectionHeader eyebrow={eyebrow} title={title} align={align} />}
        <div ref={body}>{children}</div>
      </div>
    </section>
  );
}
