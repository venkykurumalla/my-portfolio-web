import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/motion";
import { portfolioData } from "../../data/portfolioData";
import GlassCard from "../GlassCard";
import Section from "../Section";

export default function Experience() {
  const list = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The rail "draws" as you scroll. Cards reveal separately (one-shot), so nothing stays half-done.
        gsap.fromTo(".timeline-fill", { scaleY: 0 }, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: list.current, start: "top 65%", end: "bottom 65%", scrub: 0.6 },
        });
      });
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray(".exp-item").forEach((item, i) => {
          gsap.from(item.querySelector(".exp-card"), {
            x: i % 2 === 0 ? -90 : 90, opacity: 0, duration: 1, ease: "expo.out", clearProps: "transform,opacity",
            scrollTrigger: { trigger: item, start: "top 82%", once: true },
          });
        });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray(".exp-item").forEach((item) => {
          const dot = item.querySelector(".timeline-dot");
          ScrollTrigger.create({
            trigger: item, start: "top 60%",
            onEnter: () => dot.classList.add("is-lit"),
            onLeaveBack: () => dot.classList.remove("is-lit"),
          });
        });
      });
      return () => mm.revert();
    },
    { scope: list },
  );

  return (
    <Section id="experience" eyebrow="Experience" title="Where I've shipped.">
      <ol ref={list} className="relative mx-auto max-w-5xl">
        <span aria-hidden="true" className="timeline-rail absolute bottom-0 left-[7px] top-0 w-[2px] rounded md:left-1/2 md:-ml-px" />
        <span aria-hidden="true" className="timeline-fill absolute bottom-0 left-[7px] top-0 w-[2px] rounded md:left-1/2 md:-ml-px" />

        {portfolioData.experience.map((job, i) => (
          <li key={job.company} className={`exp-item relative pb-12 pl-10 last:pb-0 md:flex md:pl-0 ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
            <span className="timeline-dot absolute left-0 top-8 md:left-1/2 md:-ml-2" aria-hidden="true" />
            <GlassCard flat large data-reveal className="exp-card p-5 md:w-[calc(50%-2.5rem)] md:p-8">
              <p className="chip mb-4 !text-xs" style={{ color: "var(--cyan)" }}>{job.duration}</p>
              <h3 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]" style={{ lineHeight: 1.1 }}>{job.role}</h3>
              <p className="mt-1.5 flex items-center gap-2 text-sm font-medium muted">
                <Briefcase className="h-4 w-4" aria-hidden="true" /> {job.company}{job.type && <span className="dim">· {job.type}</span>}
              </p>
              <p className="mt-4 text-base leading-relaxed muted" style={{ color: "color-mix(in srgb, var(--fg) 88%, transparent)" }}>{job.description}</p>
            </GlassCard>
          </li>
        ))}
      </ol>
    </Section>
  );
}
