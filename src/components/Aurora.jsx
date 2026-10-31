import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/motion";

// Each blob drifts on its own (CSS) and moves at a different parallax speed on scroll.
const blobs = [
  { color: "--aurora-blue", top: "-12%", left: "-14%", speed: 0.5, dur: "34s" },
  { color: "--aurora-violet", top: "18%", left: "52%", speed: 1.1, dur: "28s" },
  { color: "--aurora-cyan", top: "58%", left: "-10%", speed: 0.8, dur: "38s", extra: true },
  { color: "--aurora-pink", top: "70%", left: "58%", speed: 1.4, dur: "32s", extra: true },
];

export default function Aurora() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Parallax blobs are desktop-only; phones get static blobs.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (hover: hover)", () => {
        gsap.utils.toArray(".aurora-blob").forEach((blob) => {
          gsap.to(blob, {
            y: () => -Number(blob.dataset.speed) * 520,
            ease: "none",
            scrollTrigger: { trigger: document.documentElement, start: 0, end: "max", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <>
      <div ref={root} className="aurora" aria-hidden="true">
        {blobs.map((b) => (
          <div
            key={b.color}
            className={`aurora-blob ${b.extra ? "aurora-blob--extra" : ""}`}
            data-speed={b.speed}
            style={{ top: b.top, left: b.left }}
          >
            <span style={{ "--dur": b.dur, background: `radial-gradient(circle, var(${b.color}) 0%, transparent 62%)` }} />
          </div>
        ))}
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
