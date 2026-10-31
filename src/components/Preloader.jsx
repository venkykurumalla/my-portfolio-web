import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, setReady, prefersReducedMotion } from "../lib/motion";

const NAME = "Venkatesh Kurumalla";

// `boot` resolves once fonts, hero image and lazy section chunks are ready.
export default function Preloader({ boot }) {
  const root = useRef(null);
  const counter = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const html = document.documentElement;

      if (prefersReducedMotion()) {
        setReady();
        ScrollTrigger.refresh();
        setDone(true);
        return;
      }

      html.classList.add("is-loading");
      window.scrollTo(0, 0);

      const progress = { v: 0 };
      const paint = () => { if (counter.current) counter.current.textContent = String(Math.round(progress.v)).padStart(3, "0"); };

      gsap.from(".pl-char", {
        yPercent: 115, rotate: 7, opacity: 0, filter: "blur(14px)",
        duration: 1, stagger: 0.045, ease: "expo.out",
      });
      // Climb to 90% on a timer, then finish the last stretch once everything is really loaded.
      const climb = gsap.to(progress, { v: 90, duration: 1.8, ease: "power2.out", onUpdate: paint });

      let cancelled = false;
      boot.then(() => {
        if (cancelled) return;
        climb.kill();
        gsap.to(progress, {
          v: 100, duration: 0.45, ease: "power1.out", onUpdate: paint,
          onComplete: () => {
            const tl = gsap.timeline({
              onComplete: () => { html.classList.remove("is-loading"); setDone(true); ScrollTrigger.refresh(); },
            });
            tl.to(".pl-meta", { opacity: 0, y: -10, duration: 0.35, ease: "power2.in" })
              .to(".pl-char", { yPercent: -110, opacity: 0, filter: "blur(10px)", duration: 0.6, stagger: 0.02, ease: "expo.in" }, "<0.05")
              .to(".pl-glass", { yPercent: -101, duration: 1.15, ease: "expo.inOut" }, "-=0.25")
              .to(".pl-solid", { yPercent: -101, duration: 1.15, ease: "expo.inOut" }, "<0.08")
              .add(setReady, "<0.35");
          },
        });
      });

      return () => { cancelled = true; html.classList.remove("is-loading"); };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[1000]" role="status" aria-label="Loading">
      <div className="pl-solid absolute inset-0" style={{ background: "var(--bg)" }} />
      <div
        className="pl-glass absolute inset-0"
        style={{ background: "rgba(139,92,246,0.14)", backdropFilter: "blur(30px) saturate(180%)", WebkitBackdropFilter: "blur(30px) saturate(180%)", borderRadius: "0 0 56px 56px", boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.35)" }}
      />
      <div className="relative z-10 grid h-full place-items-center px-6">
        <div className="text-center">
          <p className="display flex flex-wrap justify-center text-[clamp(2.2rem,8vw,5.5rem)]" aria-hidden="true">
            {NAME.split("").map((c, i) => (
              <span key={i} className="overflow-hidden pb-[0.1em]">
                <span className="pl-char inline-block">{c === " " ? " " : c}</span>
              </span>
            ))}
          </p>
          <p className="pl-meta mt-8 text-sm tabular-nums tracking-[0.3em] dim">
            <span ref={counter}>000</span> %
          </p>
        </div>
      </div>
    </div>
  );
}
